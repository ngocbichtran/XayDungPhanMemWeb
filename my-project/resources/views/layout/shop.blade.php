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
                        <span
                            class="material-symbols-outlined cursor-pointer hover:text-primary">social_leaderboard</span>
                        <span class="material-symbols-outlined cursor-pointer hover:text-primary">camera</span>
                        <span class="material-symbols-outlined cursor-pointer hover:text-primary">brand_family</span>
                    </div>
                </div>
            </footer>
</html>