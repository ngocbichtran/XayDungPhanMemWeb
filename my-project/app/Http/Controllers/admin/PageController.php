<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /** 📄 Danh sách page */
    public function index()
    {
        $pages = Page::orderBy('id', 'desc')->get();
        return view('admin.pages.index', compact('pages'));
    }

    /** ➕ Form tạo page */
    public function create()
    {
        return view('admin.pages.create');
    }

    /** 💾 Lưu page */
    public function store(Request $request)
    {
        $request->validate([
            'title'   => 'required|min:3|max:255',
            'link'    => 'required|unique:pages,link',
            'content' => 'nullable',
            'status'  => 'required|boolean',
        ]);

        Page::create($request->all());

        return redirect()
            ->route('pages.index')
            ->with('success', 'Thêm trang thành công');
    }

    /** ✏️ Form sửa page */
    public function edit($id)
    {
        $page = Page::findOrFail($id);
        return view('admin.pages.edit', compact('page'));
    }

    /** 🔄 Cập nhật page */
    public function update(Request $request, $id)
    {
        $page = Page::findOrFail($id);

        $request->validate([
            'title'   => 'required|min:3|max:255',
            'link'    => 'required|unique:pages,link,' . $page->id,
            'content' => 'nullable',
            'status'  => 'required|boolean',
        ]);

        $page->update($request->all());

        return redirect()
            ->route('pages.index')
            ->with('success', 'Cập nhật trang thành công');
    }
}
