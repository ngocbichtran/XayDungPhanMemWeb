<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController; // Đảm bảo gọi đúng Controller
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
});