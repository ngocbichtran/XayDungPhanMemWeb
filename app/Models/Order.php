<?php

namespace App\Models;
use App\Models\User;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'order_code', 'total_amount',
        'status', 'payment_method', 'payment_status',
        'shipping_address', 'note',
    ];

    const STATUS_LABELS = [
        'pending'    => ['label' => 'Chờ xác nhận', 'color' => 'warning'],
        'processing' => ['label' => 'Đang xử lý',   'color' => 'info'],
        'shipped'    => ['label' => 'Đang giao',     'color' => 'primary'],
        'delivered'  => ['label' => 'Đã giao',       'color' => 'success'],
        'cancelled'  => ['label' => 'Đã hủy',        'color' => 'danger'],
    ];

    const PAYMENT_LABELS = [
        'cod'     => '💵 Thanh toán khi nhận hàng',
        'banking' => '🏦 Chuyển khoản ngân hàng',
        'momo'    => '💜 Ví MoMo',
        'zalopay' => '🟦 ZaloPay',
        'vnpay'   => '🔴 VNPay',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getStatusLabelAttribute(): string
    {
        return self::STATUS_LABELS[$this->status]['label'] ?? $this->status;
    }

    public function getStatusColorAttribute(): string
    {
        return self::STATUS_LABELS[$this->status]['color'] ?? 'secondary';
    }

    public function getPaymentLabelAttribute(): string
    {
        return self::PAYMENT_LABELS[$this->payment_method] ?? $this->payment_method;
    }

    // Tạo mã đơn hàng duy nhất
    public static function generateCode(): string
    {
        do {
            $code = 'ORD-' . strtoupper(Str::random(8));
        } while (self::where('order_code', $code)->exists());

        return $code;
    }
}
