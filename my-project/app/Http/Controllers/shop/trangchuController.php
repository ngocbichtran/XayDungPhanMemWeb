<?php

namespace App\Http\Controllers\shop;
use App\Models\Products;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class trangchuController extends Controller
{
      public function index()
    {
        $products   = Products::with('category')->get();
        $categories = Category::orderBy('id', 'desc')->get();

        return view('shop.trangchu', compact('products', 'categories'));
    }

    public function show($id)
        {
            $categories = Category::where('status', 1)->get();

            $category = Category::where('id', $id)
                ->where('status', 1)
                ->firstOrFail();

            $products = Products::where('category_id', $category->id)
                ->where('status', 1)
                ->get();

            return view('shop.category', compact('category', 'products', 'categories'));
        }
                public function detail($id)
        {
            $categories = Category::where('status', 1)->get();

            $product = Products::with('category')
                ->where('id', $id)
                ->where('status', 1)
                ->firstOrFail();

            return view('shop.chitietsanpham', compact('product', 'categories'));
        }
}