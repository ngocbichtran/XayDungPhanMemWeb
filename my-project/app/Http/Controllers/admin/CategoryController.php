<?php


namespace App\Http\Controllers\admin;


use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;


class CategoryController extends Controller
{


    // Danh sách category
    public function index()
    {
        $categories = Category::orderBy('id','desc')->get();


        return response()->json($categories);
    }


    // Thêm category
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:categories,name',
            'status' => 'required|boolean',
            'description' => 'nullable|string|max:500',
        ]);


        $category = Category::create([
            'name' => $request->name,
            'status' => $request->status,
            'description' => $request->description,
        ]);


        return response()->json([
            'message' => 'Thêm category thành công',
            'data' => $category
        ]);
    }


    // Chi tiết category
    public function show($id)
    {
        $category = Category::find($id);


        if(!$category){
            return response()->json([
                'message' => 'Không tìm thấy category'
            ],404);
        }


        return response()->json([
            'message' => 'Chi tiết category',
            'data' => $category
        ]);
    }


    // Cập nhật category
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);


        $request->validate([
            'name' => 'required|string|max:100|unique:categories,name,' . $category->id,
            'status' => 'required|boolean',
            'description' => 'nullable|string|max:500',
        ]);


        $category->update([
            'name' => $request->name,
            'status' => $request->status,
            'description' => $request->description,
        ]);


        return response()->json([
            'message' => 'Cập nhật category thành công',
            'data' => $category
        ]);
    }


    // Xóa category
    public function destroy($id)
    {
        $category = Category::findOrFail($id);


        // Nếu category có sản phẩm thì không cho xóa
        if ($category->products()->count() > 0) {
            return response()->json([
                'message' => 'Không thể xóa vì category đang có sản phẩm'
            ],400);
        }


        $category->delete();


        return response()->json([
            'message' => 'Xóa category thành công'
        ]);
    }
}