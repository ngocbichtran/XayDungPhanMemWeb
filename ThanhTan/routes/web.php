<?php

use Illuminate\Support\Facades\Route;
use App\Models\Users;

Route::get('/', function () {
    try {
        // Kiểm tra nếu chưa có dữ liệu thì tự động thêm "Ha Vo Thanh Tan"
        if (Users::count() === 0) {
            Users::create(['name' => 'Ha Vo Thanh Tan']);
        }

        // Lấy danh sách người dùng từ Database Railway
        $users = Users::all();

        return response()->json([
            'status' => 'Backend is running',
            'database' => 'Connected',
            'author' => 'Ha Vo Thanh Tan',
            'data' => $users
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'Error',
            'message' => 'Lỗi kết nối: ' . $e->getMessage()
        ], 500);
    }
});
