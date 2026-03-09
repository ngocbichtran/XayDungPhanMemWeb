<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductsController;
use App\Http\Controllers\admin\PageController;
use App\Http\Controllers\admin\UserTestController;
Route::prefix('admin')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductsController::class);
    Route::apiResource('pages', PageController::class);
    Route::apiResource('users', UserTestController::class);
});

Route::prefix('BASE_API')->group(function () {
    Route::apiResource('users', UserTestController::class);
});