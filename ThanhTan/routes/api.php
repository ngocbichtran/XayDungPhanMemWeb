<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\OrderController;
use App\Models\Product;
use App\Models\User; // Thêm dòng này để gọi Model User

Route::prefix('admin')->group(function () {

    // 0. Lấy dữ liệu cho Dropdown (MỚI CẬP NHẬT)
    Route::get('/products/list', function() {
        return Product::where('status', 1)->select('id', 'name', 'price', 'sale_price')->get();
    });

    Route::get('/users/list', function() {
        // Chỉ lấy ID và Tên để làm dropdown cho nhẹ máy
        return User::select('id', 'name')->get();
    });


    // 1. Thống kê
    Route::get('/orders/stats', [OrderController::class, 'stats']);

    // 2. Quản lý đơn hàng
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);

    // 3. Chi tiết đơn hàng
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
});
