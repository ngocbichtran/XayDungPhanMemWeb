<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    /**
     * Hiển thị danh sách category
     */
    public function index()
    {
        $categories = Category::orderBy('id', 'desc')->get();
        return view('admin.categories.index', compact('categories'));
    }

    /**
     * Form thêm category
     */
    public function create()
    {
        return view('admin.categories.create');
    }

    /**
     * Lưu category mới
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100|unique:category,name',
            'status' => 'required|boolean',
            'description' => 'required|string',
        ]);

        Category::create([
            'name' => $request->name,
            'status' => $request->status,
            'description' => $request->description,
        ]);

        return redirect()->route('categories.index')
            ->with('success', 'Thêm loại sản phẩm thành công');
    }

    /**
     * Form sửa category
     */
    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return view('admin.categories.edit', compact('category'));
    }

    /**
     * Cập nhật category
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|max:100|unique:category,name,' . $category->id,
            'status' => 'required|boolean',
        ]);

        $category->update([
            'name' => $request->name,
            'status' => $request->status,
        ]);

        return redirect()->route('categories.index')
            ->with('success', 'Cập nhật loại sản phẩm thành công');
    }

    /**
     * Xóa category
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        // Nếu có sản phẩm thì không cho xóa
        if ($category->products()->count() > 0) {
            return redirect()->back()
                ->with('error', 'Không thể xóa vì loại này đang có sản phẩm');
        }

        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Xóa loại sản phẩm thành công');
    }
}