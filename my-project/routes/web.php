<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductsController;
use App\Http\Controllers\admin\UserTestController;


Route::prefix('admin')->group(function () {

    Route::resource('products', ProductsController::class);
    Route::resource('categories', CategoryController::class);
});

Route::prefix('BASE_API')->group(function () {
    Route::apiResource('users', UserTestController::class);
});