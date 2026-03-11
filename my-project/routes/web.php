<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductsController;
use App\Http\Controllers\admin\PageController;



Route::prefix('admin')->group(function () {

    Route::resource('products', ProductsController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('pages', PageController::class);

    Route::get('settings', [SettingController::class, 'index']);
    Route::post('settings/update', [SettingController::class, 'update']);
});
