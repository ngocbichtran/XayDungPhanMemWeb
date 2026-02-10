<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    
    protected $table = 'products';
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'quantity',
        'image',
        'description',
        'status',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'quantity' => 'integer',
        'status' => 'boolean',
    ];

     public function category()
     {
         return $this->belongsTo(Category::class);
     }
}