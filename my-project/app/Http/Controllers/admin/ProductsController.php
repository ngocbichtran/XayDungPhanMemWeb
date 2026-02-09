<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    /**
     * Trang danh sách sản phẩm
     */
    public function index()
    {
        $product = Products::all(); 
        return view('admin.products.index',compact('product'));
    }

    /**
     * Form tạo sản phẩm
     */
    public function create()
    {
        return view('admin.products.create');
    }

    public function store(Request $request)
    {
        // validate + lưu
    }

    public function edit($id)
    {
        $product = Products::findOrFail($id);
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, $id)
    {
        // validate + update
    }

    public function destroy($id)
    {
        Products::findOrFail($id)->delete();
        return redirect()->route('products.index')->with('success', 'Đã xóa sản phẩm');
    }
}
