<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Products;
class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'status',
        'description'
        
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    /**
     * Quan hệ: Category có nhiều Product
     */
    public function products()
    {
        return $this->hasMany(Products::class, 'category_id');
    }
}
