<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('user');

        // 1. Lọc theo trạng thái vận chuyển
        if ($request->has('status') && $request->status != '') {
            $query->where('status', $request->status);
        }

        // 2. Lọc theo trạng thái thanh toán (Mới)
        if ($request->has('payment_status') && $request->payment_status != '') {
            $query->where('payment_status', $request->payment_status);
        }

        // 3. TÌM KIẾM THEO MÃ ĐƠN HOẶC TÊN KHÁCH HÀNG
        if ($request->has('search') && $request->search != '') {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                // Tìm theo mã đơn hàng
                $q->where('order_code', 'like', '%' . $searchTerm . '%')
                  // Hoặc tìm theo tên khách hàng
                  ->orWhereHas('user', function($uQ) use ($searchTerm) {
                      $uQ->where('full_name', 'like', '%' . $searchTerm . '%');
                  });
            });
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($orders);
    }

    public function updateStatus(Request $request, $id)
    {
        // Cho phép cập nhật trạng thái đơn hàng HOẶC trạng thái thanh toán
        $request->validate([
            'status' => 'sometimes|in:pending,processing,shipped,delivered,cancelled',
            'payment_status' => 'sometimes|in:unpaid,paid,failed'
        ]);

        $order = Order::with('items')->findOrFail($id);

        // XỬ LÝ TRẠNG THÁI VẬN CHUYỂN & KHO HÀNG
        if ($request->has('status')) {
            // TRỪ TỒN KHO TỰ ĐỘNG khi duyệt đơn
            if ($request->status == 'processing' && $order->status == 'pending') {
                foreach ($order->items as $item) {
                    Product::where('id', $item->product_id)->decrement('quantity', $item->quantity);
                }
            }

            // CỘNG LẠI KHO NẾU HỦY ĐƠN (từ trạng thái đang xử lý hoặc đang giao)
            if ($request->status == 'cancelled' && in_array($order->status, ['processing', 'shipped'])) {
                foreach ($order->items as $item) {
                    Product::where('id', $item->product_id)->increment('quantity', $item->quantity);
                }
            }

            $order->status = $request->status;
        }

        // XỬ LÝ TRẠNG THÁI THANH TOÁN (Mới)
        if ($request->has('payment_status')) {
            $order->payment_status = $request->payment_status;
        }

        $order->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái thành công!',
            'order' => $order
        ]);
    }

    public function stats()
    {
        return response()->json([
            'total_orders' => Order::count(),
            // Cập nhật: Doanh thu chỉ tính những đơn ĐÃ THANH TOÁN
            'total_revenue' => Order::where('payment_status', 'paid')->sum('total_amount'),
            'pending_orders' => Order::where('status', 'pending')->count(),
            // Thêm thống kê số đơn chưa thanh toán
            'unpaid_orders' => Order::where('payment_status', 'unpaid')->count(),
        ]);
    }

    public function show($id) {
        $order = Order::with(['items.product', 'user'])->findOrFail($id);
        return response()->json($order);
    }
}
