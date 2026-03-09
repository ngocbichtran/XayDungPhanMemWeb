<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users'; //

    // BẮT BUỘC: Đổi filetable thành fillable để cho phép lưu dữ liệu
    protected $fillable = ['name'];
}
