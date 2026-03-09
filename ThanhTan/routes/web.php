<?php

use Illuminate\Support\Facades\Route;
use App\Models\Users;

Route::get('/', function () {
    try {
        // Lệnh này sẽ kiểm tra: Nếu chưa có tên "Ha Vo Thanh Tan" trong DB thì nó sẽ tự thêm vào
        Users::firstOrCreate(['name' => 'Ha Vo Thanh Tan']);

        // Lấy tất cả người dùng ra (Lúc này Ha Vo Thanh Tan sẽ là một bản ghi trong Database)
        $users = Users::all();

        return response()->json([
            'status' => 'Backend is running',
            'database' => 'Connected',
            'data' => $users // Bây giờ tất cả nằm hết trong mảng data này
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'Error',
            'message' => $e->getMessage()
        ], 500);
    }
});
