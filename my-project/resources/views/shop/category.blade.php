@extends('layout.shop')

@section('content')
<div class="max-w-[1280px] mx-auto px-6 py-8">

    <h1 class="text-2xl font-bold mb-6">
        {{ $category->name }}
    </h1>

    @if ($products->count())
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach ($products as $product)
                <div class="bg-white rounded-xl shadow hover:shadow-md transition">
                    <div class="aspect-square bg-cover bg-center"
                         style="background-image: url('{{ $product->image }}')">
                    </div>

                    <div class="p-4">
                        <h3 class="font-semibold truncate">
                            {{ $product->name }}
                        </h3>

                        <p class="text-primary font-bold mt-2">
                            {{ number_format($product->price) }} ₫
                        </p>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <p class="text-gray-500">Không có sản phẩm nào trong danh mục này.</p>
    @endif

</div>
@endsection
