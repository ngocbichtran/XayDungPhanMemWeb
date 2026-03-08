<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Khai báo tên bảng nếu cần thiết (Laravel tự động nhận diện là 'products' nhưng khai báo cho rõ ràng)
    protected $table = 'products';

    // Các trường được phép thêm/sửa hàng loạt (Mass Assignment)
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'sale_price',
        'quantity',
        'image',
        'description',
        'status',
    ];

    // Ép kiểu dữ liệu để dễ dàng thao tác tính toán trong Laravel
    protected $casts = [
        'price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'quantity' => 'integer',
        'status' => 'boolean', // Chuyển tinyint (0,1) thành true/false
    ];

    /**
     * Mối quan hệ: Một sản phẩm thuộc về một danh mục
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    /**
     * Mối quan hệ: Một sản phẩm có thể nằm trong nhiều chi tiết đơn hàng
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id', 'id');
    }
}
