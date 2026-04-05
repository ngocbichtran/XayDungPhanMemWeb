<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    /**
     * Danh sách sản phẩm
     */
    public function index()
    {
        $product = Products::all();
        return view('admin.products.index', compact('product'));
    }

    /**
     * Form thêm sản phẩm
     */
    public function create()
    {
        return view('admin.products.create');
    }

    /**
     * Lưu sản phẩm mới
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|string|min:3|max:255',
                'price' => 'required|numeric|min:0',
                'quantity' => 'required|integer|min:0',
                'description' => 'nullable|string|max:1000',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]
        );

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')
                ->store('products', 'public');
        }

        Products::create($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Thêm sản phẩm thành công');
    }

    /**
     * Form sửa sản phẩm
     */
    public function edit($id)
    {
        $product = Products::findOrFail($id);
        return view('admin.products.edit', compact('product'));
    }

    /**
     * Cập nhật sản phẩm
     */
    public function update(Request $request, $id)
    {
        $product = Products::findOrFail($id);

        $request->validate(
            [
                'name' => 'required|string|min:3|max:255',
                'price' => 'required|numeric|min:0',
                'quantity' => 'required|integer|min:0',
                'description' => 'nullable|string|max:1000',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]
        );

        $data = $request->except('image');

        // Nếu có upload ảnh mới
        if ($request->hasFile('image')) {

            // 🔥 Xóa ảnh cũ
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            // Lưu ảnh mới
            $data['image'] = $request->file('image')
                ->store('products', 'public');
        }

        $product->update($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Cập nhật sản phẩm thành công');
    }

    /**
     * Xóa sản phẩm
     */
    public function destroy($id)
    {
        $product = Products::findOrFail($id);

        // 🔥 Xóa ảnh khỏi storage
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()
            ->route('products.index')
            ->with('success', 'Đã xóa sản phẩm');
    }
}
