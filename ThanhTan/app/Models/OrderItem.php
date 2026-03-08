<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // Các trường được phép thêm/sửa hàng loạt
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
    ];

    // Ép kiểu dữ liệu
    protected $casts = [
        'price' => 'decimal:2',
        'quantity' => 'integer',
    ];

    /**
     * Mối quan hệ: Chi tiết này thuộc về một đơn hàng cụ thể
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    /**
     * Mối quan hệ: Chi tiết này liên kết với một sản phẩm cụ thể
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
