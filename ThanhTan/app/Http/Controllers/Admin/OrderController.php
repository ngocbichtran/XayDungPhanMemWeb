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

        if ($request->has('status') && $request->status != '') {
            $query->where('status', $request->status);
        }

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
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            $orderCode = 'ORD-' . time();
            $totalAmount = 0;
            $orderItems = [];

            foreach ($request->items as $item) {
                $product = Product::where('id', $item['product_id'])->lockForUpdate()->first();

                if ($product->quantity < $item['quantity']) {
                    throw new \Exception("Sản phẩm '{$product->name}' chỉ còn {$product->quantity} sản phẩm.");
                }

                $totalAmount += $item['quantity'] * $product->price;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $product->price,
                ];

                $product->decrement('quantity', $item['quantity']);
            }

            $order = Order::create([
                'order_code'       => $orderCode,
                'user_id'          => $request->user_id,
                'shipping_address' => $request->shipping_address,
                'total_amount'     => $totalAmount,
                'status'           => 'pending',
                'payment_method'   => 'cod',
            ]);

            foreach ($orderItems as &$orderItem) {
                $orderItem['order_id'] = $order->id;
            }
            DB::table('order_items')->insert($orderItems);

            DB::commit();
            return response()->json(['message' => 'Tạo đơn hàng thành công!'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi: ' . $e->getMessage()], 400);
        }
    }

    // 3. XEM CHI TIẾT
    public function show($id)
    {
        $order = Order::with(['items.product', 'user'])->findOrFail($id);
        return response()->json($order);
    }

    // 4. CẬP NHẬT TRẠNG THÁI (Đã thêm Ràng buộc State Machine)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order = Order::with('items')->findOrFail($id);

        $oldStatus = $order->status;
        $newStatus = $request->status;

        // Bỏ qua nếu không có sự thay đổi
        if ($oldStatus === $newStatus) {
            return response()->json(['message' => 'Trạng thái không thay đổi!'], 200);
        }

        // Định nghĩa luồng trạng thái hợp lệ (State Machine)
        $allowedTransitions = [
            'pending'    => ['processing', 'cancelled'],
            'processing' => ['shipped', 'cancelled'],
            'shipped'    => ['delivered', 'cancelled'],
            'delivered'  => [], // Chốt đơn, không cho sửa
            'cancelled'  => [], // Đã hủy, không cho đổi lại
        ];

        // Kiểm tra ràng buộc
        if (!in_array($newStatus, $allowedTransitions[$oldStatus])) {
            return response()->json([
                'message' => "Lỗi nghiệp vụ: Không thể chuyển đơn hàng từ [" . strtoupper($oldStatus) . "] sang [" . strtoupper($newStatus) . "]."
            ], 400);
        }

        // Xử lý nghiệp vụ kho khi HỦY ĐƠN
        if ($newStatus === 'cancelled') {
            $this->restoreStock($order);
        }

        $order->status = $newStatus;
        $order->save();

        return response()->json(['message' => 'Cập nhật trạng thái thành công!']);
    }

    // 5. "XÓA" ĐƠN HÀNG (Hủy đơn mềm)
    public function destroy($id)
    {
        $order = Order::with('items')->findOrFail($id);

        if (in_array($order->status, ['shipped', 'delivered'])) {
            return response()->json(['message' => 'Không thể can thiệp đơn hàng đang/đã giao!'], 403);
        }

        if ($order->status != 'cancelled') {
            $this->restoreStock($order);

            $order->status = 'cancelled';
            $order->save();
            return response()->json(['message' => 'Đã chuyển đơn hàng sang trạng thái Hủy!']);
        }

        return response()->json(['message' => 'Đơn hàng này đã bị hủy từ trước!'], 400);
    }

    // 6. THỐNG KÊ
    public function stats()
    {
        return response()->json([
            'total_orders'     => Order::count(),
            'total_revenue'    => Order::where('status', 'delivered')->sum('total_amount'),
            'pending_orders'   => Order::where('status', 'pending')->count(),
            'cancelled_orders' => Order::where('status', 'cancelled')->count(),
        ]);
    }

    // ==========================================
    // CÁC HÀM PRIVATE HỖ TRỢ DÙNG CHUNG
    // ==========================================

    /**
     * Hoàn lại số lượng sản phẩm vào kho khi đơn hàng bị hủy
     */
    private function restoreStock($order)
    {
        foreach ($order->items as $item) {
            Product::where('id', $item->product_id)->increment('quantity', $item->quantity);
        }
    }
}
