<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Products extends Model
{
    use HasFactory;
    
    protected $table = 'products';

    // Các cột được phép gán dữ liệu
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'quantity',
        'image',
        'description',
        'status',
    ];

    // Ép kiểu dữ liệu
    protected $casts = [
        'price' => 'decimal:2',
        'quantity' => 'integer',
        'status' => 'boolean',
    ];

    /**
     * Quan hệ: Product thuộc về Category
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

        public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        if (Str::startsWith($this->image, ['http://', 'https://'])) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }
}