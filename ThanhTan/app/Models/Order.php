<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_code',       // Giữ lại vì DB báo cần field này
        'user_id',
        'total_amount',
        'status',
        'payment_method',
        'shipping_address',
        // 'phone', 'note', 'payment_status' -> XÓA BỎ vì DB không có cột này
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
