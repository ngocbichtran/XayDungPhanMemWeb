<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\OrderController;

Route::prefix('admin')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);


    Route::get('/orders/stats', [OrderController::class, 'stats']);

    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
});
