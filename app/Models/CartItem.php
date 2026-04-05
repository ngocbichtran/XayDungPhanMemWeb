<?php

namespace App\Models;
use App\Models\Cart;
use App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $fillable = ['cart_id', 'product_id', 'quantity'];

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    // Thành tiền của dòng này
   public function getSubtotalAttribute(): float
{
    if (!$this->product) {
        return 0;
    }

    return $this->quantity * $this->product->sale_price;
}
}
