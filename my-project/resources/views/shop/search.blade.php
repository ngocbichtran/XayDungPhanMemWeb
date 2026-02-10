@extends('layout.shop')

@section('content')
<div class="max-w-[1280px] mx-auto px-10 py-10">
    <h1 class="text-2xl font-bold mb-6">
        Kết quả tìm kiếm
    </h1>

    @if($products->isEmpty())
        <p class="text-gray-500">Không tìm thấy sản phẩm nào.</p>
    @else
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @foreach($products as $product)
                <a href="{{ route('shop.chitietsanpham', $product->id) }}"
                   class="border rounded-lg p-4 hover:shadow transition">
                    <img src="{{ $product->image }}"
                         class="w-full h-40 object-cover rounded mb-3">
                    <h3 class="font-medium truncate">{{ $product->name }}</h3>
                    <p class="text-primary font-bold mt-1">
                        {{ number_format($product->price) }} đ
                    </p>
                </a>
            @endforeach
        </div>
    @endif
</div>
@endsection
