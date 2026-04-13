<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // 1. DANH SÁCH & TÌM KIẾM
    public function index(Request $request)
    {
        $query = Order::with('user');

        // Lọc theo trạng thái vận chuyển
        if ($request->has('status') && $request->status != '') {
            $query->where('status', $request->status);
        }

        // ĐÃ BỎ: Lọc theo payment_status vì DB không có cột này

        if ($request->has('search') && $request->search != '') {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('order_code', 'like', '%' . $searchTerm . '%')
                  ->orWhereHas('user', function($uQ) use ($searchTerm) {
                      $uQ->where('name', 'like', '%' . $searchTerm . '%');
                  });
            });
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($orders);
    }

    // 2. THÊM MỚI ĐƠN HÀNG
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'shipping_address' => 'required|string',
            // ĐÃ BỎ: validate phone
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0'
        ]);

        DB::beginTransaction();
        try {
            $orderCode = 'ORD-' . time();
            $totalAmount = 0;

            foreach ($request->items as $item) {
                $totalAmount += $item['quantity'] * $item['price'];
            }

            // CHỈ LƯU: Những trường chắc chắn có trong DB của bạn
            $order = Order::create([
                'order_code'      => $orderCode,
                'user_id'         => $request->user_id,
                'shipping_address' => $request->shipping_address,
                'total_amount'    => $totalAmount,
                'status'          => 'pending',
                'payment_method'  => 'cod',
            ]);

            $orderItems = [];
            foreach ($request->items as $item) {
                $orderItems[] = [
                    'order_id'   => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity'   => $item['quantity'],
                    'price'      => $item['price'],

                ];
            }
            DB::table('order_items')->insert($orderItems);

            DB::commit();
            return response()->json(['message' => 'Tạo đơn hàng thành công!'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi: ' . $e->getMessage()], 500);
        }
    }

    // 3. XEM CHI TIẾT
    public function show($id)
    {
        $order = Order::with(['items.product', 'user'])->findOrFail($id);
        return response()->json($order);
    }

    // 4. CẬP NHẬT TRẠNG THÁI
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order = Order::with('items')->findOrFail($id);

        // Trừ kho khi chuyển sang processing
        if ($request->status == 'processing' && $order->status == 'pending') {
            foreach ($order->items as $item) {
                Product::where('id', $item->product_id)->decrement('quantity', $item->quantity);
            }
        }

        // Hoàn kho khi hủy
        if ($request->status == 'cancelled' && in_array($order->status, ['processing', 'shipped'])) {
            foreach ($order->items as $item) {
                Product::where('id', $item->product_id)->increment('quantity', $item->quantity);
            }
        }

        $order->status = $request->status;
        $order->save();

        return response()->json(['message' => 'Cập nhật thành công!']);
    }

    // 5. XÓA ĐƠN
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        if (in_array($order->status, ['processing', 'shipped'])) {
            return response()->json(['message' => 'Không thể xóa đơn đang giao!'], 403);
        }
        $order->items()->delete();
        $order->delete();
        return response()->json(['message' => 'Đã xóa đơn hàng!']);
    }

    // 6. THỐNG KÊ
    public function stats()
    {
        return response()->json([
            'total_orders'   => Order::count(),
            'total_revenue'  => Order::sum('total_amount'), // Tính tổng tất cả vì không có payment_status
            'pending_orders' => Order::where('status', 'pending')->count(),
            'unpaid_orders'  => 0, // Tạm thời để 0 vì DB không có cột check thanh toán
        ]);
    }
}
