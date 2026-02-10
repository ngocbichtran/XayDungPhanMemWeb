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
                borderRadius: {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
                },
            },
        },
    }
    </script>
    <style>
    body {
        font-family: 'Manrope', sans-serif;
    }

    .material-symbols-outlined {
        font-variation-settings: 'FILL'0, 'wght'400, 'GRAD'0, 'opsz'24;
    }
    </style>
</head>
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
        <div class="flex items-center gap-9">
            <a class="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors"
                href="{{route('trangchu')}}">Home</a>
            <div class="relative group">
                <a href="#" class="text-sm font-medium hover:text-primary">
                    Categories
                </a>

                <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-[#1a2632]
                rounded-lg shadow-lg opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all">

                    @foreach ($categories as $category)
                    <a href="{{ route('shop.category', $category->id) }}"
                        class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                        {{ $category->name }}
                    </a>
                    @endforeach

                </div>
            </div>
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

<body class="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white transition-colors duration-200">
    @yield('content')
</body>
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
            <span class="material-symbols-outlined cursor-pointer hover:text-primary">social_leaderboard</span>
            <span class="material-symbols-outlined cursor-pointer hover:text-primary">camera</span>
            <span class="material-symbols-outlined cursor-pointer hover:text-primary">brand_family</span>
        </div>
    </div>
</footer>

</html>