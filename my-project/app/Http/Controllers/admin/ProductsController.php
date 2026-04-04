<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductsController extends Controller
{
    // Danh sách sản phẩm
    public function index()
    {
        $products = Products::all()->map(function ($product) {
            if ($product->image) {
                // KIỂM TRA: Nếu image bắt đầu bằng http thì giữ nguyên, ngược lại mới nối asset storage
                if (!Str::startsWith($product->image, ['http://', 'https://'])) {
                    $product->image = asset('storage/' . $product->image);
                }
            }
            return $product;
        });

        return response()->json($products);
    }

    // Thêm sản phẩm
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:3|max:255',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'description' => 'nullable|string|max:1000',
            // SỬA: Cho phép cả string (URL) hoặc file ảnh
            'image' => 'nullable', 
        ]);

        $data = $request->all();

        // Xử lý nếu là FILE upload từ máy
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        } 
        // Nếu không phải file, Laravel sẽ tự lấy chuỗi URL từ $request->all()

        $product = Products::create($data);

        return response()->json([
            'message' => 'Thêm sản phẩm thành công',
            'data' => $product
        ]);
    }

    // Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        $product = Products::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|min:3|max:255',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'description' => 'nullable|string|max:1000',
            'image' => 'nullable', // SỬA: Cho phép nhận URL
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu là ảnh nội bộ (không phải link http)
            if ($product->image && !Str::startsWith($product->image, ['http://', 'https://'])) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);
        
        return response()->json([
            'message' => 'Cập nhật thành công',
            'data' => $product
        ]);
    }

    // Các hàm khác giữ nguyên...
    public function edit($id) { $product = Products::findOrFail($id); return response()->json($product); }
    public function show($id) { $product = Products::findOrFail($id); return response()->json($product); }
    public function destroy($id)
    {
        $product = Products::findOrFail($id);
        if ($product->image && !Str::startsWith($product->image, ['http://', 'https://'])) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return response()->json(['message' => 'Xóa sản phẩm thành công']);
    }
}