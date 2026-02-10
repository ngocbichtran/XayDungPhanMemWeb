<?php
use App\Http\Controllers\shop\trangchuController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductsController;
use App\Http\Controllers\admin\PageController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;

Route::get('/', [trangchuController::class, 'index'])
    ->name('trangchu');

Route::get('/shop/category/{id}', [trangchuController::class, 'show'])
    ->name('shop.category');

Route::get('/shop/search/suggest', [trangchuController::class, 'searchSuggest'])
    ->name('shop.searchsuggest');

Route::get('/shop/chitietsanpham/{id}', [trangchuController::class, 'detail'])
    ->name('shop.chitietsanpham');

//route cua ngocbich
Route::prefix('admin')->group(function () {
    Route::resource('categories', CategoryController::class);

    Route::resource('products', ProductsController::class);
    
    Route::resource('pages', PageController::class);
});