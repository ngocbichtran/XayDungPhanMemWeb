<!DOCTYPE html>

<html class="light" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>User Storefront - Home</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap"
        rel="stylesheet" />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101922",
                    },
                    fontFamily: {
                        "display": ["Manrope"]
                    },
                    borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                },
            },
        }
    </script>
    <style>
        body {
            font-family: 'Manrope', sans-serif;
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>

<body class="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white transition-colors duration-200">
    <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div class="layout-container flex h-full grow flex-col">
            <!-- Header -->
            <header
                class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] dark:border-b-gray-800 px-10 py-3 bg-white dark:bg-[#1a2632] sticky top-0 z-50">
                <div class="flex items-center gap-8">
                    <div class="flex items-center gap-4 text-[#111418] dark:text-white">
                        <div class="size-6 text-primary">
                            <span class="material-symbols-outlined text-3xl">shopping_bag</span>
                        </div>
                        <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                            UserStore</h2>
                    </div>
                    <label class="flex flex-col min-w-40 !h-10 max-w-64">
                        <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div
                                class="text-[#617589] dark:text-gray-400 flex border-none bg-[#f0f2f4] dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <span class="material-symbols-outlined">search</span>
                            </div>
                            <input
                                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] dark:bg-gray-800 focus:border-none h-full placeholder:text-[#617589] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal"
                                placeholder="Search products..." value="" />
                        </div>
                    </label>
                </div>
                <div class="flex flex-1 justify-end gap-8">
                    <div class="sptd.php">
                        <a class="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
                            href="#">Home</a>
                        <a class="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
                            href="#">Categories</a>
                        <a class="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
                            href="#">Deals</a>
                        <a class="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
                            href="#">Support</a>
                    </div>
                    <div class="flex gap-2">
                        <button
                            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
                            <span class="truncate">Login</span>
                        </button>
                        <button
                            class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white gap-2 text-sm font-bold leading-normal min-w-0 px-2.5">
                            <span class="material-symbols-outlined">shopping_cart</span>
                        </button>
                        <button
                            class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white gap-2 text-sm font-bold leading-normal min-w-0 px-2.5">
                            <span class="material-symbols-outlined">account_circle</span>
                        </button>
                    </div>
                </div>
            </header>
            <main class="flex-1 flex justify-center py-5">
                <div class="layout-content-container flex flex-col max-w-[1280px] w-full px-10 gap-6">
                    <!-- Hero Section -->
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
                        <!-- Sidebar Filters -->
                        <aside class="w-full md:w-64 shrink-0">
                            <div
                                class="flex flex-col gap-6 bg-white dark:bg-[#1a2632] p-6 rounded-xl shadow-sm sticky top-24">
                                <div class="flex flex-col border-b border-gray-100 dark:border-gray-800 pb-4">
                                    <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-normal">Filters
                                    </h2>
                                    <p class="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal">
                                        Refine your search</p>
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
                                                <p class="text-[#111418] dark:text-gray-300 text-[10px] mt-2 font-bold">
                                                    $20</p>
                                            </div>
                                            <div class="absolute right-[30%] -top-1.5 flex flex-col items-center">
                                                <div
                                                    class="size-4 rounded-full bg-primary ring-4 ring-white dark:ring-[#1a2632]">
                                                </div>
                                                <p class="text-[#111418] dark:text-gray-300 text-[10px] mt-2 font-bold">
                                                    $500</p>
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
                                <!-- Product Card 1 -->
                                <div
                                    class="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                    <div class="relative aspect-square bg-center bg-cover"
                                        data-alt="Modern smartphone with high-resolution display"
                                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyBhQUY53fIweznMlsNU_z8TmEYSP7rWH0S18slVfUIldv_EIAqz6IYFb_aOBg47HqQokJJQj_G2qSkXlCOq2yd6__H5u1Pl1uf9JVZMgXS5JSj2IZsZt2wybmw05xL99FjVxHd2iADN8uUJY9yeGIb2oi6lcW1JqyfA_UmMLG7cH7sJXmaddIVXnine_BvTDsDqFzOb8BmAfyc8jNx1ZVcei-0lQaA5KlexAQxqz6sJVTT3U-OAkTDgPcOmpg8_cWNKS68g-YjMRp");'>
                                        <div
                                            class="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                            New</div>
                                        <button
                                            class="absolute top-3 right-3 size-8 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-[#111418] dark:text-white hover:text-red-500 transition-colors">
                                            <span class="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                    </div>
                                    <div class="flex flex-col p-4 gap-2">
                                        <div class="flex flex-col">
                                            <p class="text-[#617589] dark:text-gray-400 text-xs font-medium uppercase">
                                                Electronics</p>
                                            <h3 class="text-[#111418] dark:text-white text-base font-bold truncate">
                                                Premium X-Phone Pro</h3>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span class="material-symbols-outlined text-gray-300 text-sm">star</span>
                                            <span class="text-xs text-[#617589] dark:text-gray-400 ml-1">(42)</span>
                                        </div>
                                        <div class="flex items-center justify-between mt-2">
                                            <span
                                                class="text-[#111418] dark:text-white text-xl font-black">$899.00</span>
                                            <button
                                                class="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                                                <span class="material-symbols-outlined">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- Product Card 2 -->
                                <div
                                    class="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                    <div class="relative aspect-square bg-center bg-cover"
                                        data-alt="Minimalist wooden desk clock"
                                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjGuNUFs9vKGPeQbhDBbQhFJQ7kS9kLgXRnXM4gSpAt17b4kZF4NvGVYYVOlbqDHAxfQTM-IVsjw1PjFFRyDOtuRhC-N2dmqcV0sRKx5_4nX7mH-1emDwG3aVTO8o7DhoHe_rsn8WGLmdU4AMxw35v_Tu6J0xanCRibQELJCWjTEpkLS90LxEWNzaDfQkggMz_sZMV8QpvybD1gbSl4jmok11JD9TEywzC9QN23ntLSEKUVgSZJ528-tooeSzgXMFCB8L0kb8RBkF6");'>
                                        <div
                                            class="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                            Sale</div>
                                        <button
                                            class="absolute top-3 right-3 size-8 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-[#111418] dark:text-white">
                                            <span class="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                    </div>
                                    <div class="flex flex-col p-4 gap-2">
                                        <div class="flex flex-col">
                                            <p class="text-[#617589] dark:text-gray-400 text-xs font-medium uppercase">
                                                Accessories</p>
                                            <h3 class="text-[#111418] dark:text-white text-base font-bold truncate">
                                                Minimalist Wood Clock</h3>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span class="text-xs text-[#617589] dark:text-gray-400 ml-1">(128)</span>
                                        </div>
                                        <div class="flex items-center justify-between mt-2">
                                            <div class="flex flex-col">
                                                <span
                                                    class="text-[#111418] dark:text-white text-xl font-black">$45.00</span>
                                                <span
                                                    class="text-[#617589] dark:text-gray-500 text-xs line-through">$60.00</span>
                                            </div>
                                            <button
                                                class="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                                                <span class="material-symbols-outlined">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- Product Card 3 -->
                                <div
                                    class="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                    <div class="relative aspect-square bg-center bg-cover"
                                        data-alt="Professional camera lens detail"
                                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwmT1NhGHN4bnEeCFVG49ybLiHPs3tMDb_qti5u-Erxz12l0K7RGdmu5qs0hlZZtC5lw3xNA4HVQHWVEX21COENm29GegkXGkJ6ljmyBH9HSfLR0b7_5cNQSEZU_wQFs16_p2hxgm_EeZZrcC6RJMXq0s_DQGrFdqmjD7d8Kvh7RgC5ejcEx6SoG7fbfxxDr9PfHxodGceXr-uv0SQ452KMKYfQa3M3lvXz7x_NnNMkmEhPKe6pVS7fzkvR3MYaUuiey2oP1EFAwjC");'>
                                        <button
                                            class="absolute top-3 right-3 size-8 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-[#111418] dark:text-white">
                                            <span class="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                    </div>
                                    <div class="flex flex-col p-4 gap-2">
                                        <div class="flex flex-col">
                                            <p class="text-[#617589] dark:text-gray-400 text-xs font-medium uppercase">
                                                Photography</p>
                                            <h3 class="text-[#111418] dark:text-white text-base font-bold truncate">
                                                Retro Cinema Camera</h3>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span class="material-symbols-outlined text-gray-300 text-sm">star</span>
                                            <span class="text-xs text-[#617589] dark:text-gray-400 ml-1">(15)</span>
                                        </div>
                                        <div class="flex items-center justify-between mt-2">
                                            <span
                                                class="text-[#111418] dark:text-white text-xl font-black">$320.00</span>
                                            <button
                                                class="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                                                <span class="material-symbols-outlined">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- Product Card 4 -->
                                <div
                                    class="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                    <div class="relative aspect-square bg-center bg-cover"
                                        data-alt="Ergonomic office chair"
                                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjUCdCXqBq7AmhN-vzesP0AXc6H6wQNfwKVNOf_jumLE4Ejt9KLdponKntfQJsgjbDHbh399AUZhiHx8NphpXkExa6LzRtq-Vf-70BZCk094SzfglnRsKyWm9-V_b-ewiDnHwl3Gd5DtyvdTuUj7VUYljCBkVNCXoWQtz8r326a4xkdxwgcd0VcljD-1EOJAgDruIpI3MmA3H-DKlFhgqajPP-9XXJ7SUX4Pbteu0wrAbg8v_5n4XWBcE-1rW4jKDAeGIcQgPNRSu6");'>
                                        <button
                                            class="absolute top-3 right-3 size-8 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-[#111418] dark:text-white">
                                            <span class="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                    </div>
                                    <div class="flex flex-col p-4 gap-2">
                                        <div class="flex flex-col">
                                            <p class="text-[#617589] dark:text-gray-400 text-xs font-medium uppercase">
                                                Furniture</p>
                                            <h3 class="text-[#111418] dark:text-white text-base font-bold truncate">
                                                Executive Comfort Chair</h3>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span class="text-xs text-[#617589] dark:text-gray-400 ml-1">(56)</span>
                                        </div>
                                        <div class="flex items-center justify-between mt-2">
                                            <span
                                                class="text-[#111418] dark:text-white text-xl font-black">$249.00</span>
                                            <button
                                                class="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                                                <span class="material-symbols-outlined">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- Product Card 5 -->
                                <div
                                    class="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                    <div class="relative aspect-square bg-center bg-cover"
                                        data-alt="High quality leather boots"
                                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqDizArZg6wq1ZaYXbcedHMEagfUpJnfYVlRyFQ4BfZEG6x6tozw9U1BWJFku9pz1LbHAwP6ygDdVLpolZkN3jrxhjDbMX5qEp96V8_jo87IWTBHx8GMk-z2wcpppUle8Qhr0Ln72LJx89KPjkFV_yXm68-aQz1KNhxgxeZSBoFsQzxxhUhDZ_P7w1MKu_8xJcajx7ZOdJWZ6UcX_BG62pdgfnIFbYoCjn-ica5iWTviFTGVEpE_RYftR_N9rO6_G838sp7jSDu2gC");'>
                                        <button
                                            class="absolute top-3 right-3 size-8 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-[#111418] dark:text-white">
                                            <span class="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                    </div>
                                    <div class="flex flex-col p-4 gap-2">
                                        <div class="flex flex-col">
                                            <p class="text-[#617589] dark:text-gray-400 text-xs font-medium uppercase">
                                                Fashion</p>
                                            <h3 class="text-[#111418] dark:text-white text-base font-bold truncate">
                                                Elite Leather Sneakers</h3>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span class="material-symbols-outlined text-gray-300 text-sm">star</span>
                                            <span class="material-symbols-outlined text-gray-300 text-sm">star</span>
                                            <span class="text-xs text-[#617589] dark:text-gray-400 ml-1">(89)</span>
                                        </div>
                                        <div class="flex items-center justify-between mt-2">
                                            <span
                                                class="text-[#111418] dark:text-white text-xl font-black">$120.00</span>
                                            <button
                                                class="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                                                <span class="material-symbols-outlined">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- Product Card 6 -->
                                <div
                                    class="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                    <div class="relative aspect-square bg-center bg-cover"
                                        data-alt="Smart home voice assistant speaker"
                                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuALYiMCtApaFrZXKPROhnXdyA5uSd2eh3x4PwMBHEdDTd1RIykWMSzv-f_EQQHJES4t7AUzqhDItYT3evo1J218hjxZkdV1jf0UKxEo31PuqMH4n_2xjNgEVyoYa5qNLhFl7aJ691A6SMBy-JGcEEO74NeOp8Yen2YRSz-0tos5UjF2WJCZhtqAGXsBGdVD277U58iGDPaLsVJ6035n_uidNHP7ofHma9q6xb6Ox3XWG5lkilbAhJ-_a_hbzw6hFbEsDnWRWotcufKf");'>
                                        <button
                                            class="absolute top-3 right-3 size-8 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-[#111418] dark:text-white">
                                            <span class="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                    </div>
                                    <div class="flex flex-col p-4 gap-2">
                                        <div class="flex flex-col">
                                            <p class="text-[#617589] dark:text-gray-400 text-xs font-medium uppercase">
                                                Smart Home</p>
                                            <h3 class="text-[#111418] dark:text-white text-base font-bold truncate">Aura
                                                Smart Speaker</h3>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span
                                                class="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                                            <span class="text-xs text-[#617589] dark:text-gray-400 ml-1">(210)</span>
                                        </div>
                                        <div class="flex items-center justify-between mt-2">
                                            <span
                                                class="text-[#111418] dark:text-white text-xl font-black">$79.99</span>
                                            <button
                                                class="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                                                <span class="material-symbols-outlined">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Pagination -->
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
            <!-- Footer -->
            <footer class="bg-white dark:bg-[#1a2632] border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 px-10">
                <div class="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-2 text-primary">
                            <span class="material-symbols-outlined text-3xl">shopping_bag</span>
                            <h2 class="text-[#111418] dark:text-white text-xl font-bold">UserStore</h2>
                        </div>
                        <p class="text-[#617589] dark:text-gray-400 text-sm">The world's fastest growing e-commerce
                            marketplace with thousands of high quality products.</p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="text-[#111418] dark:text-white font-bold">Shop</h4>
                        <ul class="flex flex-col gap-2 text-[#617589] dark:text-gray-400 text-sm">
                            <li><a class="hover:text-primary transition-colors" href="#">All Products</a></li>
                            <li><a class="hover:text-primary transition-colors" href="#">New Arrivals</a></li>
                            <li><a class="hover:text-primary transition-colors" href="#">Best Sellers</a></li>
                            <li><a class="hover:text-primary transition-colors" href="#">Sales &amp; Offers</a></li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="text-[#111418] dark:text-white font-bold">Company</h4>
                        <ul class="flex flex-col gap-2 text-[#617589] dark:text-gray-400 text-sm">
                            <li><a class="hover:text-primary transition-colors" href="#">About Us</a></li>
                            <li><a class="hover:text-primary transition-colors" href="#">Contact</a></li>
                            <li><a class="hover:text-primary transition-colors" href="#">Careers</a></li>
                            <li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="text-[#111418] dark:text-white font-bold">Newsletter</h4>
                        <p class="text-[#617589] dark:text-gray-400 text-sm">Subscribe to get updates on new products
                            and special offers.</p>
                        <div class="flex gap-2">
                            <input
                                class="flex-1 bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg px-4 h-10 text-sm focus:ring-primary"
                                placeholder="Your email" type="email" />
                            <button class="bg-primary text-white rounded-lg px-4 h-10 font-bold text-sm">Join</button>
                        </div>
                    </div>
                </div>
                <div
                    class="max-w-[1280px] mx-auto pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-[#617589] dark:text-gray-400 text-xs">© 2024 UserStore. All rights reserved.</p>
                    <div class="flex gap-6 text-[#617589] dark:text-gray-400">
                        <span
                            class="material-symbols-outlined cursor-pointer hover:text-primary">social_leaderboard</span>
                        <span class="material-symbols-outlined cursor-pointer hover:text-primary">camera</span>
                        <span class="material-symbols-outlined cursor-pointer hover:text-primary">brand_family</span>
                    </div>
                </div>
            </footer>
        </div>
    </div>

    ```
</body>

</html>