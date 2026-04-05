<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
             <div class="p-6 text-gray-900">

    <p class="mb-4 font-semibold">
        {{ __("You're logged in!") }}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <a href="{{ route('products.index') }}" class="p-4 bg-blue-500 text-white rounded-lg shadow">
            🛒 Xem sản phẩm
        </a>

        <a href="{{ route('cart.index') }}" class="p-4 bg-green-500 text-white rounded-lg shadow">
            🧺 Giỏ hàng
        </a>

        <a href="{{ route('orders.index') }}" class="p-4 bg-purple-500 text-white rounded-lg shadow">
            📦 Đơn hàng
        </a>

    </div>

</div>