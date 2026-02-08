<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductsController;
use App\Http\Controllers\admin\PageController;


Route::prefix('admin')->group(function () {
    Route::resource('categories', CategoryController::class);

    Route::get('products-data', [ProductsController::class, 'data'])
    ->name('products.data');
    Route::resource('products', ProductsController::class);
    
    Route::resource('pages', PageController::class);
});
