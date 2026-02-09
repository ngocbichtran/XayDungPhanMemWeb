@extends('layout.admin')
@section('title', 'Quản lý sản phẩm')

@section('content')
<div class="flex items-center justify-between mb-4">
    <h1 class="text-xl font-bold">Danh sách loại sản phẩm</h1>

    <a href="{{ route('categories.create') }}"
       class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        + Thêm loại sản phẩm
    </a>
</div>

<div class="bg-white p-4 rounded shadow">
    <table id="categories" class="w-full text-sm border">
        <thead>
            <tr class="bg-gray-50">
                <th>ID</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($categories as $category)
                <tr class="border-b">
                    <td>{{ $category->id }}</td>
                    <td>{{ $category->name }}</td>
                    <td>{{ $category->description }}</td>
                    <td>
                        @if ($category->status == 1)
                            <span class="text-green-600">Hoạt động</span>
                        @else
                            <span class="text-red-600">Ẩn</span>
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('categories.edit', $category->id) }}" class="text-blue-600">Sửa</a> |
                        <form action="{{ route('categories.destroy', $category->id) }}"
                              method="POST" class="inline">
                            @csrf
                            @method('DELETE')
                            <button class="text-red-600"
                                onclick="return confirm('Xóa loại sản phẩm này?')">
                                Xóa
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
