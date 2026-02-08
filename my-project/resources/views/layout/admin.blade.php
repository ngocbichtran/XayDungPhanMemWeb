<!DOCTYPE html>

<html class="light" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Admin Statistics Dashboard</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;display=swap"
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

<body class="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
     @yield('content')
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar Navigation -->
        <aside
            class="w-64 flex flex-col bg-white dark:bg-slate-900 border-r border-[#dbe0e6] dark:border-slate-800 shrink-0">
            <div class="flex flex-col h-full p-4">
                <div class="flex items-center gap-3 mb-8 px-2">
                    <div class="bg-primary rounded-lg p-2 text-white flex items-center justify-center">
                        <span class="material-symbols-outlined">storefront</span>
                    </div>
                    <div class="flex flex-col">
                        <h1 class="text-[#111418] dark:text-white text-base font-bold leading-normal">ShopAdmin</h1>
                        <p class="text-[#617589] dark:text-slate-400 text-xs font-normal">Super Admin</p>
                    </div>
                </div>
                <nav class="flex flex-col gap-1 grow">
                    <div class="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                        <span class="material-symbols-outlined text-[24px]">dashboard</span>
                        <p class="text-sm font-semibold leading-normal">Dashboard</p>
                    </div>
                    <div
                        class="flex items-center gap-3 px-3 py-2 text-[#617589] dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer rounded-lg">
                        <span class="material-symbols-outlined text-[24px]">package</span>
                        <p class="text-sm font-medium leading-normal">Products</p>
                    </div>
                    <div
                        class="flex items-center gap-3 px-3 py-2 text-[#617589] dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer rounded-lg">
                        <span class="material-symbols-outlined text-[24px]">shopping_cart</span>
                        <p class="text-sm font-medium leading-normal">Orders</p>
                    </div>
                    <div
                        class="flex items-center gap-3 px-3 py-2 text-[#617589] dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer rounded-lg">
                        <span class="material-symbols-outlined text-[24px]">group</span>
                        <p class="text-sm font-medium leading-normal">Users</p>
                    </div>
                </nav>
                <div class="flex flex-col gap-1 border-t border-[#dbe0e6] dark:border-slate-800 pt-4">
                    <div
                        class="flex items-center gap-3 px-3 py-2 text-[#617589] dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer rounded-lg">
                        <span class="material-symbols-outlined text-[24px]">settings</span>
                        <p class="text-sm font-medium leading-normal">Settings</p>
                    </div>
                    <div
                        class="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors cursor-pointer rounded-lg">
                        <span class="material-symbols-outlined text-[24px]">logout</span>
                        <p class="text-sm font-medium leading-normal">Logout</p>
                    </div>
                </div>
            </div>
        </aside>
        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <div class="max-w-[1200px] mx-auto py-8 px-6 lg:px-10">
                <!-- Page Heading -->
                <div class="flex flex-wrap justify-between items-end gap-3 mb-6">
                    <div class="flex flex-col gap-1">
                        <p class="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                            Dashboard Overview</p>
                        <p class="text-[#617589] dark:text-slate-400 text-base font-normal leading-normal">Real-time
                            performance metrics and sales data</p>
                    </div>
                    <div class="flex gap-3">
                        <button
                            class="flex items-center gap-2 px-4 py-2 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-sm font-bold text-[#111418] dark:text-white">
                            <span class="material-symbols-outlined text-[20px]">calendar_today</span>
                            Last 30 Days
                        </button>
                        <button
                            class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm shadow-primary/20">
                            <span class="material-symbols-outlined text-[20px]">download</span>
                            Export Report
                        </button>
                    </div>
                </div>
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div
                        class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#dbe0e6] dark:border-slate-800 shadow-sm">
                        <div class="flex items-center justify-between mb-1">
                            <p class="text-[#617589] dark:text-slate-400 text-sm font-medium">Total Revenue</p>
                            <span class="material-symbols-outlined text-primary">payments</span>
                        </div>
                        <p class="text-[#111418] dark:text-white tracking-tight text-3xl font-bold">$128,430.00</p>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="material-symbols-outlined text-[#078838] text-[18px]">trending_up</span>
                            <p class="text-[#078838] text-sm font-bold">+12.5%</p>
                            <span class="text-[#617589] text-xs font-normal ml-1">vs last month</span>
                        </div>
                    </div>
                    <div
                        class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#dbe0e6] dark:border-slate-800 shadow-sm">
                        <div class="flex items-center justify-between mb-1">
                            <p class="text-[#617589] dark:text-slate-400 text-sm font-medium">Total Orders</p>
                            <span class="material-symbols-outlined text-primary">shopping_bag</span>
                        </div>
                        <p class="text-[#111418] dark:text-white tracking-tight text-3xl font-bold">1,240</p>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="material-symbols-outlined text-[#078838] text-[18px]">trending_up</span>
                            <p class="text-[#078838] text-sm font-bold">+8.2%</p>
                            <span class="text-[#617589] text-xs font-normal ml-1">vs last month</span>
                        </div>
                    </div>
                    <div
                        class="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#dbe0e6] dark:border-slate-800 shadow-sm">
                        <div class="flex items-center justify-between mb-1">
                            <p class="text-[#617589] dark:text-slate-400 text-sm font-medium">Total Users</p>
                            <span class="material-symbols-outlined text-primary">person_add</span>
                        </div>
                        <p class="text-[#111418] dark:text-white tracking-tight text-3xl font-bold">45,210</p>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="material-symbols-outlined text-[#078838] text-[18px]">trending_up</span>
                            <p class="text-[#078838] text-sm font-bold">+5.1%</p>
                            <span class="text-[#617589] text-xs font-normal ml-1">vs last month</span>
                        </div>
                    </div>
                </div>
                <!-- Revenue Chart Section -->
                <div
                    class="bg-white dark:bg-slate-900 border border-[#dbe0e6] dark:border-slate-800 rounded-xl p-6 mb-8 shadow-sm">
                    <div class="flex justify-between items-start mb-6">
                        <div class="flex flex-col gap-1">
                            <p class="text-[#111418] dark:text-white text-lg font-bold">Revenue Trends</p>
                            <p class="text-[#617589] dark:text-slate-400 text-sm font-normal">Monthly growth analysis
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-[#111418] dark:text-white tracking-tight text-2xl font-bold">$128,430</p>
                            <p class="text-[#078838] text-sm font-bold">+15.3% since January</p>
                        </div>
                    </div>
                    <div class="flex min-h-[240px] flex-1 flex-col gap-4">
                        <svg fill="none" height="200" preserveaspectratio="none" viewbox="0 0 478 150" width="100%"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                                fill="url(#paint0_linear)"></path>
                            <path
                                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                                stroke="#137fec" stroke-linecap="round" stroke-width="3"></path>
                            <defs>
                                <lineargradient gradientunits="userSpaceOnUse" id="paint0_linear" x1="236" x2="236"
                                    y1="1" y2="149">
                                    <stop stop-color="#137fec" stop-opacity="0.2"></stop>
                                    <stop offset="1" stop-color="#137fec" stop-opacity="0"></stop>
                                </lineargradient>
                            </defs>
                        </svg>
                        <div
                            class="flex justify-around text-[#617589] dark:text-slate-400 text-[13px] font-bold tracking-[0.015em]">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                        </div>
                    </div>
                </div>
                <!-- Recent Orders Table -->
                <div
                    class="bg-white dark:bg-slate-900 border border-[#dbe0e6] dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div class="flex items-center justify-between px-6 py-5">
                        <h2 class="text-[#111418] dark:text-white text-lg font-bold">Recent Orders</h2>
                        <button class="text-primary text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr
                                    class="bg-slate-50 dark:bg-slate-800/50 border-y border-[#dbe0e6] dark:border-slate-800">
                                    <th
                                        class="px-6 py-3 text-[#617589] dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        Order ID</th>
                                    <th
                                        class="px-6 py-3 text-[#617589] dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        Customer</th>
                                    <th
                                        class="px-6 py-3 text-[#617589] dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        Date</th>
                                    <th
                                        class="px-6 py-3 text-[#617589] dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        Status</th>
                                    <th
                                        class="px-6 py-3 text-[#617589] dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">
                                        Amount</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#dbe0e6] dark:divide-slate-800">
                                <tr class="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td class="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white">#ORD-7721
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-8 w-8 rounded-full bg-slate-200"
                                                data-alt="Profile picture of a customer"
                                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9Iy_Nh3ttQa3-3PLm50yf8CbfFbmPaAhuFvlFvlRla72i5izCWGffvI9IH8-ORxq0ZAlPgVY9UuEQFRMNPNE00ZxfQ34es0ngsCAdiZx13Bv_SbP8RIqvPTv6_ggMsglzU20zpkk-BNdim3mx4qElVXeidBm4N1J7UcRrXz_EmNqdTQynLZ-XJvDnzX-q49_XXLXO9TWaka_BzVvcQG-Th2Le5hmqtgISGUt-FrZxajsPHGrvAZUvVyTfUCfq9BLLckeodKJRyj5w");'>
                                            </div>
                                            <span class="text-sm font-medium text-[#111418] dark:text-white">Alex
                                                Johnson</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-[#617589] dark:text-slate-400">Oct 24, 2023</td>
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Delivered</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-bold text-[#111418] dark:text-white text-right">
                                        $450.00</td>
                                </tr>
                                <tr class="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td class="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white">#ORD-7719
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-8 w-8 rounded-full bg-slate-200"
                                                data-alt="Profile picture of a customer"
                                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOgI3yTHq2fVaI0CK4s_22yD4Ajrp5zhAgCtAlXxud9pK0kSHsLbJUq-hLhhdC9RcaAld9KeC5dkWTc7QPS1GaSAdX9PifkVVmSPWUjohrs2XhyCFitkcA1v5DimvbuO4e8bOCN1fnaUV3K7jXBiKNuaoLjYtnnBPitx0n35yt9D5eGWSrOLHPErVRZEiLAe4EqcfNsmjOdpeD_CbqI1iuyATnBQZ91DXDewLgpHUBwEbyhP85wKgOtfea3IcAU5yFCEMd58njlmtq");'>
                                            </div>
                                            <span class="text-sm font-medium text-[#111418] dark:text-white">Sarah
                                                Williams</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-[#617589] dark:text-slate-400">Oct 23, 2023</td>
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Processing</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-bold text-[#111418] dark:text-white text-right">
                                        $125.50</td>
                                </tr>
                                <tr class="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td class="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white">#ORD-7718
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-8 w-8 rounded-full bg-slate-200"
                                                data-alt="Profile picture of a customer"
                                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFFy6JjVBDMBcDPfC-alcq40qLBKXUipqW6Yf3Lu8dx9TKGmMpOgBbsBBl0UJ6CX2KUAW4HsXhs-I9YfgvcNiPf2_X3rx-_BcD8NWNn6tVpiLfwV05rc2MD8tno4enkmJnmJEZWI2pEJ9-nDNX4oK9K4umpbs5ym-j7zBuNlMcrTHUGa3N3cWpWbU9tPU84FC_LMaWE9WoiNHOTDA1JilSwjvXlFf6mBgChLJ5se1Dal-5dj7S4pGkzNRwDwe8XAJCPmwZH6nLqDmy");'>
                                            </div>
                                            <span class="text-sm font-medium text-[#111418] dark:text-white">Michael
                                                Chen</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-[#617589] dark:text-slate-400">Oct 22, 2023</td>
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-bold text-[#111418] dark:text-white text-right">
                                        $2,100.00</td>
                                </tr>
                                <tr class="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td class="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white">#ORD-7715
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-8 w-8 rounded-full bg-slate-200"
                                                data-alt="Profile picture of a customer"
                                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaVsRGysL_6uABbtnqsmoqy-ZZgj9WP7R6eRZzeaea8s9-AwlTCWKYLMv3spS1xMbbSk2AXRBb2fo8Bu1jbyNzvERKmnqHI1hLfxAqqiULEWIuvaoiz3ltPWQpD83Z_LL1_pBHsXCYU_Yo98RyGfY3m6-8ob68YYQmaQQnODxRuHXRtHyWu_xEa4JTqUSPVcXZWtpTOyA6QjrpegwsghywfUKpyZt6t9J9CF30YbhXwyue7VZxQ7PpflspZELRlKefrFYyzr7JNqEX");'>
                                            </div>
                                            <span class="text-sm font-medium text-[#111418] dark:text-white">Elena
                                                Rodriguez</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-[#617589] dark:text-slate-400">Oct 21, 2023</td>
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Delivered</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-bold text-[#111418] dark:text-white text-right">
                                        $89.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>

</html>