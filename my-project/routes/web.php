<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/shop', function () {
    return view('shop.trangchu');
})->name('trangchu');

Route::get('/admin', function () {
    return view('layout.admin');
})->name('trangadmin');