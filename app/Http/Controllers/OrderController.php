<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class OrderController extends Controller
{
    // 1. Danh sách đơn hàng
    public function index(): View
    {
        $orders = Order::where('user_id', auth()->id())
            ->with('items.product')
            ->latest()
            ->paginate(10);

        return view('orders.index', compact('orders'));
    }

    // 2. Chi tiết đơn hàng
    public function show(int $id): View
    {
        $order = Order::where('user_id', auth()->id())
            ->with('items.product')
            ->findOrFail($id);

        return view('orders.show', compact('order'));
    }

    // 3. Checkout (AJAX)
    public function store(Request $request)
    {
        // ✅ Validate
        $request->validate([
            'shipping_address' => 'required|string|max:500',
            'payment_method'   => 'required|in:cod,banking,momo,zalopay,vnpay',
            'note'             => 'nullable|string|max:1000',
        ]);

        $userId = auth()->id();

        // ✅ Lấy cart của user
        $cart = Cart::where('user_id', $userId)
            ->with('items.product')
            ->first();

        // ❌ Giỏ trống
        if (!$cart || $cart->items->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Giỏ hàng trống!'
            ], 422);
        }

        // ❌ Check tồn kho
        foreach ($cart->items as $item) {
            if (!$item->product || !$item->product->isInStock($item->quantity)) {
                return response()->json([
                    'success' => false,
                    'message' => "Sản phẩm \"{$item->product->name}\" không đủ hàng"
                ], 422);
            }
        }

        DB::beginTransaction();

        try {
            // ✅ Tạo order
            $order = Order::create([
                'user_id'          => $userId,
                'order_code'       => Order::generateCode(),
                'total_amount'     => $cart->total_amount,
                'status'           => 'pending',
                'payment_method'   => $request->payment_method,
                'payment_status'   => 'unpaid',
                'shipping_address' => $request->shipping_address,
                'note'             => $request->note,
            ]);

            // ✅ Tạo order items + trừ kho
            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $item->product_id,
                    'quantity'   => $item->quantity,
                    'price'      => $item->product->sale_price,
                ]);

                // Trừ tồn kho
                $item->product->decrement('quantity', $item->quantity);
            }

            // ✅ Xóa giỏ hàng
            $cart->items()->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => [
                    'order_code'    => $order->order_code,
                    'total_amount'  => $order->total_amount,
                    'payment_label' => strtoupper($order->payment_method),
                ]
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Đặt hàng thất bại!',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}