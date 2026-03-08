<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Các trường được phép thêm/sửa hàng loạt (Mass Assignment)
    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
        'payment_method',
        'shipping_address',
    ];

    // Ép kiểu dữ liệu (Casting) để đảm bảo dữ liệu chuẩn xác khi lấy ra
    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    /**
     * Mối quan hệ: Một đơn hàng có nhiều chi tiết đơn hàng (Order Items)
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    /**
     * Mối quan hệ: Một đơn hàng thuộc về một người dùng (Khách hàng)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
