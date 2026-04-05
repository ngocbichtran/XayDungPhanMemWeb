<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;

class CartController extends Controller
{
    // 👉 FIX CỨNG USER (KHÔNG LOGIN)
    private function getUserId(): int
    {
        return 1;
    }

    // GET /cart (view)
    public function index(): View
    {
        $cart = Cart::getOrCreate($this->getUserId());
        $cart->load(['items.product.category']);

        return view('cart.index', compact('cart'));
    }

    // GET API /api/cart
    public function apiGet(): JsonResponse
    {
        $cart = Cart::getOrCreate($this->getUserId());
        $cart->load(['items.product']);

        return response()->json([
            'success' => true,
            'data'    => $cart
        ]);
    }

    // (optional) STORE nếu bạn có dùng
    public function store(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true
        ]);
    }

    // POST /cart/add
    public function add(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1|max:100',
        ]);

        $product = Product::findOrFail($request->product_id);

        if (!$product->isInStock($request->quantity)) {
            return response()->json([
                'success' => false,
                'message' => "Không đủ hàng trong kho",
            ], 422);
        }

        $cart = Cart::getOrCreate($this->getUserId());

        $item = $cart->items()->where('product_id', $product->id)->first();

        if ($item) {
            $newQty = $item->quantity + $request->quantity;

            if (!$product->isInStock($newQty)) {
                return response()->json([
                    'success' => false,
                    'message' => "Chỉ còn {$product->quantity} sản phẩm",
                ], 422);
            }

            $item->update(['quantity' => $newQty]);
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity'   => $request->quantity,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Đã thêm vào giỏ hàng',
            'cart_count' => $cart->fresh()->total_quantity,
        ]);
    }

    // PUT /cart/update
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:0',
        ]);

        $cart = Cart::getOrCreate($this->getUserId());

        $item = $cart->items()
            ->where('product_id', $request->product_id)
            ->firstOrFail();

        if ($request->quantity == 0) {
            $item->delete();
        } else {
            $product = $item->product;

            if (!$product->isInStock($request->quantity)) {
                return response()->json([
                    'success' => false,
                    'message' => "Không đủ hàng",
                ], 422);
            }

            $item->update(['quantity' => $request->quantity]);
        }

        $cart = $cart->fresh();

        return response()->json([
            'success'    => true,
            'cart_total' => $cart->total_amount,
            'cart_count' => $cart->total_quantity,
        ]);
    }

    // DELETE /cart/remove
    public function remove(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::getOrCreate($this->getUserId());

        $cart->items()->where('product_id', $request->product_id)->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    // DELETE /cart/clear
    public function clear(): JsonResponse
    {
        $cart = Cart::getOrCreate($this->getUserId());
        $cart->items()->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}