<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index()
    {
        $product = Products::all(); 
        return view('admin.products.index',compact('product'));
    }

    public function create()
    {
        return view('admin.products.create');
    }

    public function store(Request $request)
    {
    
    }

    public function edit($id)
    {
        $product = Products::findOrFail($id);
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, $id)
    {
    
    }

    public function destroy($id)
    {
        Products::findOrFail($id)->delete();
        return redirect()->route('products.index')->with('success', 'Đã xóa sản phẩm');
    }
}