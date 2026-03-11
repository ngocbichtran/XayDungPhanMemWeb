@extends('layout.admin')

@section('title', 'Quản lý Page')

@section('content')
<div class="flex justify-between mb-4">
    <h1 class="text-xl font-bold">Danh sách trang</h1>
    <a href="{{ route('pages.create') }}"
       class="px-4 py-2 bg-blue-600 text-white rounded">
        + Thêm trang
    </a>
</div>

<table class="w-full border text-sm">
    <thead class="bg-gray-100">
        <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Link</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
        </tr>
    </thead>
    <tbody>
        @foreach($pages as $page)
        <tr class="border-b text-center">
            <td>{{ $page->id }}</td>
            <td>{{ $page->title }}</td>
            <td>{{ $page->link }}</td>
            <td>
                @if($page->status)
                    <span class="text-green-600">Hiện</span>
                @else
                    <span class="text-red-600">Ẩn</span>
                @endif
            </td>
            <td>
                <a href="{{ route('pages.edit', $page->id) }}"
                   class="text-blue-600">Sửa</a>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection
