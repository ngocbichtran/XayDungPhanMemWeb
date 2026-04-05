<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pages = Page::orderBy('id', 'desc')->get();
        return view('admin.pages.index', compact('pages'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.pages.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'   => 'required|string|max:150',
            'link'    => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'status'  => 'required|boolean',
        ]);

        Page::create($request->all());

        return redirect()
            ->route('pages.index')
            ->with('success', 'Thêm trang thành công');
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        return view('admin.pages.show', compact('page'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        return view('admin.pages.edit', compact('page'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        $request->validate([
            'title'   => 'required|string|max:150',
            'link'    => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'status'  => 'required|boolean',
        ]);

        $page->update($request->all());

        return redirect()
            ->route('pages.index')
            ->with('success', 'Cập nhật trang thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        $page->delete();

        return redirect()
            ->route('pages.index')
            ->with('success', 'Xóa trang thành công');
    }
}
