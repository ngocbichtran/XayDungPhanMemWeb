<?php

namespace App\Models;
use App\Models\User;
use App\Models\CartItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    protected $table = 'carts';

    protected $fillable = [
        'user_id'
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    // Tổng số lượng sản phẩm
    public function getTotalQuantityAttribute(): int
    {
        return $this->items->sum('quantity');
    }

    // Tổng tiền
    public function getTotalAmountAttribute(): float
    {
        return $this->items->sum(function ($item) {

            if (!$item->product) {
                return 0;
            }

            return $item->quantity * $item->product->sale_price;

        });
    }

    /*
    |--------------------------------------------------------------------------
    | Helper
    |--------------------------------------------------------------------------
    */

    // Lấy hoặc tạo cart cho user
    public static function getOrCreate(int $userId): self
    {
        return self::firstOrCreate([
            'user_id' => $userId
        ]);
    }
}