@extends('layout.admin')

@section('title', 'Quản lý sản phẩm')

@section('content')
@php use Illuminate\Support\Str; @endphp

<div class="flex items-center justify-between mb-4">
    <h1 class="text-xl font-bold">Danh sách sản phẩm</h1>

    <a href="{{ route('products.create') }}"
       class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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
                <th>Hình ảnh</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($product as $product)
            <tr class="border-b text-center">
                <td>{{ $product->id }}</td>
                <td>{{ $product->name }}</td>
                <td>{{ number_format($product->price) }} đ</td>
                <td>{{ $product->quantity }}</td>

                <td class="text-center">
                    @if ($product->image_url)
                        <img
                            src="{{ $product->image_url }}"
                            class="w-16 h-16 object-cover rounded mx-auto"
                        >
                    @else
                        <span class="text-gray-400 italic">Không có ảnh</span>
                    @endif
                </td>


                {{-- STATUS --}}
                <td>
                    @if ($product->status == 1)
                        <span class="text-green-600 font-semibold">Hoạt động</span>
                    @else
                        <span class="text-red-600 font-semibold">Ẩn</span>
                    @endif
                </td>

                {{-- ACTION --}}
                <td>
                    <a
                        href="{{ route('products.edit', $product->id) }}"
                        class="text-blue-600 hover:underline"
                    >
                        Sửa
                    </a>

                   <form
                        action="{{ route('products.destroy', $product->id) }}"
                        method="POST"
                        class="inline"
                        onsubmit="return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')"
                    >
                        @csrf
                        @method('DELETE')

                        <button
                            type="submit"
                            class="text-red-600 hover:underline"
                        >
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
