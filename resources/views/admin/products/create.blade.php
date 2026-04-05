@extends('layout.admin')

@section('content')
<div class="bg-white rounded-xl shadow-2xl p-6">

    <h3 class="text-xl font-bold mb-4">Add New Product</h3>

    <form
        action="{{ route('products.store') }}"
        method="POST"
        enctype="multipart/form-data"
        class="flex flex-col gap-4"
    >
        @csrf

        {{-- Product Name --}}
        <div>
            <label class="font-bold">Product Name</label>
            <input
                name="name"
                type="text"
                value="{{ old('name') }}"
                required
                minlength="3"
                class="w-full border rounded-lg p-2
                    @error('name') border-red-500 @enderror"
            >
            @error('name')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Price & Quantity --}}
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="font-bold">Price</label>
                <input
                    name="price"
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value="{{ old('price') }}"
                    class="w-full border rounded-lg p-2
                        @error('price') border-red-500 @enderror"
                >
                @error('price')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label class="font-bold">Quantity</label>
                <input
                    name="quantity"
                    type="number"
                    min="0"
                    required
                    value="{{ old('quantity') }}"
                    class="w-full border rounded-lg p-2
                        @error('quantity') border-red-500 @enderror"
                >
                @error('quantity')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
        </div>

        {{-- Description --}}
        <div>
            <label class="font-bold">Description</label>
            <textarea
                name="description"
                maxlength="1000"
                class="w-full border rounded-lg p-2
                    @error('description') border-red-500 @enderror"
            >{{ old('description') }}</textarea>

            @error('description')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Image --}}
        <div>
            <label class="font-bold">Product Image</label>
            <input
                type="file"
                name="image"
                accept="image/*"
                class="@error('image') border-red-500 @enderror"
            >

            @error('image')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Buttons --}}
        <div class="flex justify-end gap-2">
            <a href="{{ route('products.index') }}"
               class="px-5 py-2 bg-gray-300 rounded-lg">
                Cancel
            </a>

            <button
                type="submit"
                class="px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
                Lưu
            </button>
        </div>
    </form>
</div>
@endsection
