@extends('layout.admin')

@section('title', 'Cập nhật sản phẩm')

@section('content')
<div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-3xl">

    <h1 class="text-xl font-bold mb-6">Cập nhật sản phẩm</h1>

    {{-- HIỂN THỊ LỖI --}}
    @if ($errors->any())
        <div class="mb-4 p-4 bg-red-100 text-red-700 rounded">
            <ul class="list-disc pl-5">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form
        action="{{ route('products.update', $product->id) }}"
        method="POST"
        enctype="multipart/form-data"
        class="flex flex-col gap-4"
    >
        @csrf
        @method('PUT')

        {{-- NAME --}}
        <div>
            <label class="font-semibold">Tên sản phẩm</label>
            <input
                type="text"
                name="name"
                value="{{ old('name', $product->name) }}"
                class="w-full border rounded-lg p-2"
            >
        </div>

        {{-- PRICE + QUANTITY --}}
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="font-semibold">Giá</label>
                <input
                    type="number"
                    step="0.1"
                    name="price"
                    value="{{ old('price', $product->price) }}"
                    class="w-full border rounded-lg p-2"
                >
            </div>

            <div>
                <label class="font-semibold">Số lượng</label>
                <input
                    type="number"
                    name="quantity"
                    value="{{ old('quantity', $product->quantity) }}"
                    class="w-full border rounded-lg p-2"
                >
            </div>
        </div>

        {{-- DESCRIPTION --}}
        <div>
            <label class="font-semibold">Mô tả</label>
            <textarea
                name="description"
                rows="4"
                class="w-full border rounded-lg p-2"
            >{{ old('description', $product->description) }}</textarea>
        </div>

        {{-- IMAGE --}}
<div class="space-y-2">
    <label class="font-semibold">Hình ảnh</label>

    {{-- Upload file --}}
    <input type="file" name="image" class="w-full border rounded p-2">

    {{-- OR --}}
    <div class="text-center text-gray-400 text-sm">— hoặc —</div>

    {{-- Nhập link / base64 --}}
    <input
        type="text"
        name="image_url"
        placeholder="Nhập link ảnh hoặc base64 (data:image/...)"
        value="{{ old('image_url', Str::startsWith($product->image, 'data:image') || Str::startsWith($product->image, 'http') ? $product->image : '') }}"
        class="w-full border rounded p-2"
    >

    {{-- Preview ảnh hiện tại --}}
    @if ($product->image_url)
        <div class="mt-3">
            <p class="text-sm text-gray-600 mb-1">Ảnh hiện tại:</p>
            <img
                src="{{ $product->image_url }}"
                class="w-24 h-24 object-cover rounded border"
            >
        </div>
    @endif
</div>


        {{-- STATUS --}}
        <div>
            <label class="font-semibold">Trạng thái</label>
            <select name="status" class="w-full border rounded-lg p-2">
                <option value="1" {{ $product->status ? 'selected' : '' }}>
                    Hoạt động
                </option>
                <option value="0" {{ !$product->status ? 'selected' : '' }}>
                    Ẩn
                </option>
            </select>
        </div>

        {{-- ACTION --}}
        <div class="flex justify-end gap-3 mt-4">
            <a
                href="{{ route('products.index') }}"
                class="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
                Hủy
            </a>

            <button
                type="submit"
                class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Cập nhật
            </button>
        </div>
    </form>
</div>
@endsection
