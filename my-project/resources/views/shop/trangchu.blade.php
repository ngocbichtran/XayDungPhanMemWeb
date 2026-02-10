@extends('layout.shop')
@section('content')

<div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
        <main class="flex-1 flex justify-center py-5">
            <div class="layout-content-container flex flex-col max-w-[1280px] w-full px-10 gap-6">
                <div class="@container w-full">
                    <div
                        class="flex flex-col gap-6 px-4 py-8 @[864px]:flex-row bg-white dark:bg-[#1a2632] rounded-xl shadow-sm overflow-hidden">
                        <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg @[480px]:h-64 @[864px]:h-auto @[864px]:w-1/2"
                            data-alt="High tech wireless headphones on sleek table"
                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC7dr2qMIUvNYUKDqDUs8cEUXzrMyB622HbjGHqP-VixzpbDyfAGMeoFd6GuFZ3jIogvvAvRXKX9F8n4-4BBZ0N-mdLnpaw3-EZKLFwqdI2SREFtaKrMfsPVFFvK-_WmzgwJs7U69bnwqtPhKEsTf8jbPuO35NYClbkvPKEJCvxdb017stNa4zQN-LwdWa8M2lV1j19xYk6tZco29WJLlsqWBpVcsgFGo6YN_sEguh9ldvx5FIzPEY3XsvERZGSU2Ts2CNBl7IBq1vJ");'>
                        </div>
                        <div class="flex flex-col gap-6 @[864px]:w-1/2 @[864px]:justify-center px-4 @[864px]:px-10">
                            <div class="flex flex-col gap-2 text-left">
                                <span class="text-primary font-bold tracking-widest text-sm uppercase">Limited Time
                                    Offer</span>
                                <h1
                                    class="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                                    Upgrade Your Lifestyle
                                </h1>
                                <p
                                    class="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal @[480px]:text-lg">
                                    Discover the latest trends in electronics, fashion, and home decor at unbeatable
                                    prices. Free shipping on orders over $50.
                                </p>
                            </div>
                            <div class="flex gap-4">
                                <button
                                    class="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                                    <span class="truncate">Shop Now</span>
                                </button>
                                <button
                                    class="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white text-base font-bold leading-normal border border-transparent hover:border-primary/50 transition-all">
                                    <span class="truncate">View Deals</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-8">
                    <aside class="w-full md:w-64 shrink-0">
                        <div
                            class="flex flex-col gap-6 bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm sticky top-24">
                            <div class="flex flex-col border-b border-gray-100 dark:border-gray-800 pb-4">
                                <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-normal">Filters</h2>
                                <p class="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal">Refine
                                    your search</p>
                            </div>
                            <div class="flex flex-col gap-3">
                                <p
                                    class="text-sm font-semibold text-[#111418] dark:text-white uppercase tracking-wider">
                                    Categories</p>
                                <div class="flex flex-col gap-1">
                                    <div
                                        class="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                                        <span class="material-symbols-outlined text-lg">grid_view</span>
                                        <p class="text-sm font-bold leading-normal">All Products</p>
                                    </div>
                                    <div
                                        class="flex items-center gap-3 px-3 py-2 text-[#111418] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                                        <span class="material-symbols-outlined text-lg">memory</span>
                                        <p class="text-sm font-medium leading-normal">Electronics</p>
                                    </div>
                                    <div
                                        class="flex items-center gap-3 px-3 py-2 text-[#111418] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                                        <span class="material-symbols-outlined text-lg">apparel</span>
                                        <p class="text-sm font-medium leading-normal">Fashion</p>
                                    </div>
                                    <div
                                        class="flex items-center gap-3 px-3 py-2 text-[#111418] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                                        <span class="material-symbols-outlined text-lg">home</span>
                                        <p class="text-sm font-medium leading-normal">Home &amp; Garden</p>
                                    </div>
                                    <div
                                        class="flex items-center gap-3 px-3 py-2 text-[#111418] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                                        <span class="material-symbols-outlined text-lg">fitness_center</span>
                                        <p class="text-sm font-medium leading-normal">Sports</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-4">
                                <p
                                    class="text-sm font-semibold text-[#111418] dark:text-white uppercase tracking-wider">
                                    Price Range</p>
                                <div class="flex flex-col gap-6">
                                    <div class="flex h-1 w-full rounded-sm bg-[#dbe0e6] dark:bg-gray-700 relative">
                                        <div class="absolute left-[10%] right-[30%] h-1 bg-primary"></div>
                                        <div class="absolute left-[10%] -top-1.5 flex flex-col items-center">
                                            <div
                                                class="size-4 rounded-full bg-primary ring-4 ring-white dark:ring-[#1a2632]">
                                            </div>
                                            <p class="text-[#111418] dark:text-gray-300 text-[10px] mt-2 font-bold">$20
                                            </p>
                                        </div>
                                        <div class="absolute right-[30%] -top-1.5 flex flex-col items-center">
                                            <div
                                                class="size-4 rounded-full bg-primary ring-4 ring-white dark:ring-[#1a2632]">
                                            </div>
                                            <p class="text-[#111418] dark:text-gray-300 text-[10px] mt-2 font-bold">$500
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                class="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold mt-4">
                                <span>Apply Filters</span>
                            </button>
                            <button
                                class="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-transparent text-[#617589] dark:text-gray-400 text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <span>Reset All</span>
                            </button>
                        </div>
                    </aside>
                    <!-- Product Grid -->
                    <div class="flex-1 flex flex-col gap-4">
                        <div class="flex items-center justify-between px-4 pb-3">
                            <h2
                                class="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
                                Featured Products</h2>
                            <div class="flex items-center gap-2 text-sm text-[#617589] dark:text-gray-400">
                                <span>Sort by:</span>
                                <select
                                    class="bg-transparent border-none focus:ring-0 font-bold text-[#111418] dark:text-white py-0">
                                    <option>Newest Arrivals</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Popularity</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            @foreach ($products as $product)
                            <div
                                class="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">

                                <div class="relative aspect-square bg-center bg-cover"
                                    style="background-image: url('{{ $product->image }}')">
                                </div>

                                <div class="flex flex-col p-4 gap-2">

                                    <p class="text-xs uppercase text-gray-400">
                                        {{ $product->category->name }}
                                    </p>

                                    <h3 class="font-bold truncate">
                                        {{ $product->name }}
                                    </h3>

                                    <div class="flex items-center justify-between mt-2">
                                        <span class="text-xl font-black text-slate-900 dark:text-white">
                                            {{ number_format($product->price) }} ₫
                                        </span>

                                        <a href="{{ route('shop.chitietsanpham', $product->id) }}" class="px-3 py-1.5 text-sm font-semibold rounded-lg
                                           bg-primary text-white hover:bg-primary/90 transition">
                                            Xem chi tiết
                                        </a>
                                    </div>
                                </div>
                            </div>
                            @endforeach

                        </div>
                        <div class="flex items-center justify-center gap-2 py-8 mt-4">
                            <button
                                class="size-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-[#617589] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <span class="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button
                                class="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                            <button
                                class="size-10 flex items-center justify-center rounded-lg text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">2</button>
                            <button
                                class="size-10 flex items-center justify-center rounded-lg text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">3</button>
                            <span class="px-2 text-gray-400">...</span>
                            <button
                                class="size-10 flex items-center justify-center rounded-lg text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">12</button>
                            <button
                                class="size-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-[#617589] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <span class="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

@endsection