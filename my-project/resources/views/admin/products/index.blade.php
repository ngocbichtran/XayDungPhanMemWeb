@extends('layout.admin')

@section('title', 'Quản lý sản phẩm')

@section('content')
<div class="flex items-center justify-between mb-4">
    <h1 class="text-xl font-bold">Danh sách sản phẩm</h1>

    <a href="{{ route('products.create') }}" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        + Thêm sản phẩm
    </a>
</div>

<div class="bg-white p-4 rounded shadow">
        <table id="products" class="w-full text-sm border">
            <thead>
                <tr class="bg-gray-50">
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>

            <tbody>
                @foreach ($product as $product)
                <tr class="border-b">
                    <td>{{ $product->id }}</td>
                    <td>{{ $product->name }}</td>
                    <td>{{ number_format($product->price) }} đ</td>
                    <td>{{ $product->quantity }}</td>
                    <td>
                        @if ($product->status == 1)
                        <span class="text-green-600">Hoạt động</span>
                        @else
                        <span class="text-red-600">Ẩn</span>
                        @endif
                    </td>
                    <td>
                        <a href="#" class="text-blue-600">Sửa</a> |
                        <a href="#" class="text-red-600">Xóa</a>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>

</div>
@endsection