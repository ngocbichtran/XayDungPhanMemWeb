<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'category_id', 'name', 'price', 'sale_price',
        'quantity', 'image', 'description', 'status',
    ];

    protected $casts = [
        'price'      => 'decimal:2',
        'sale_price' => 'decimal:2',
        'status'     => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // Kiểm tra còn hàng
    public function isInStock(int $qty = 1): bool
    {
        return $this->status && $this->quantity >= $qty;
    }

    // Format giá VND
    public function getFormattedPriceAttribute(): string
    {
        return number_format($this->sale_price, 0, ',', '.') . ' ₫';
    }

    // Phần trăm giảm giá
    public function getDiscountPercentAttribute(): int
    {
        if ($this->price <= 0) return 0;
        return (int)(($this->price - $this->sale_price) / $this->price * 100);
    }
}
