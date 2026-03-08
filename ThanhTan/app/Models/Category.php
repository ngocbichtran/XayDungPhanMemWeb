<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Khai báo tên bảng
    protected $table = 'categories';

    // Các trường được phép thêm/sửa hàng loạt (Mass Assignment)
    protected $fillable = [
        'name',
        'status',
        'description',
    ];

    // Ép kiểu dữ liệu
    protected $casts = [
        'status' => 'boolean', // Chuyển 0/1 thành false/true giúp dễ code logic hơn
    ];

    /**
     * Mối quan hệ: Một danh mục có nhiều sản phẩm
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
