<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Lấy danh sách category
    public function index()
    {
        $categories = Category::orderBy('id','desc')->get();

        return response()->json([
            'status' => true,
            'data' => $categories
        ]);
    }

    // Lấy chi tiết category
    public function show($id)
    {
        $category = Category::find($id);

        if(!$category){
            return response()->json([
                'status'=>false,
                'message'=>'Không tìm thấy'
            ]);
        }

        return response()->json([
            'status'=>true,
            'data'=>$category
        ]);
    }
}