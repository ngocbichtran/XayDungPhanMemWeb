<?php

namespace App\Http\Controllers\Admin;

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
        // Không cần query ở đây vì dùng DataTables serverSide
        return view('admin.products.index');
    }

    /**
     * Data cho DataTables
     */
    public function data()
    {
        $products = Products::select([
            'id',
            'name',
            'price',
            'quantity',
            'status'
        ]);

        return datatables()
            ->of($products)

            ->editColumn('price', function ($row) {
                return number_format($row->price) . ' ₫';
            })

            ->addColumn('status', function ($row) {
                if ($row->status) {
                    return '<span class="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                Active
                            </span>';
                }

                return '<span class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                            Hidden
                        </span>';
            })

            ->addColumn('action', function ($row) {
                $editUrl   = route('products.edit', $row->id);
                $deleteUrl = route('products.destroy', $row->id);

                return '
                    <div class="flex items-center justify-center gap-2">
                        <a href="'.$editUrl.'"
                           class="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded hover:bg-blue-200">
                            Sửa
                        </a>

                        <form action="'.$deleteUrl.'" method="POST"
                              onsubmit="return confirm(\'Bạn có chắc muốn xóa?\')">
                            '.csrf_field().method_field('DELETE').'
                            <button
                                class="px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded hover:bg-red-200">
                                Xóa
                            </button>
                        </form>
                    </div>
                ';
            })

            ->rawColumns(['status', 'action'])
            ->make(true);
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
        // validate + lưu (bạn làm sau)
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
