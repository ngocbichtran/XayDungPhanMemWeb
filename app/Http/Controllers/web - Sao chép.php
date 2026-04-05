<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductsController;
use App\Http\Controllers\admin\PageController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

// ── ADMIN ROUTES ─────────────────────────────────────────────
Route::prefix('admin')->group(function () {
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductsController::class);
    Route::resource('pages', PageController::class);
});

// ── CART & ORDER ROUTES (yêu cầu đăng nhập) ─────────────────
Route::middleware('auth')->group(function () {

    // Giỏ hàng
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::put('/cart/update', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

    // Đơn hàng
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');

    // API
    Route::get('/api/cart', [CartController::class, 'apiGet'])->name('api.cart.get');
});