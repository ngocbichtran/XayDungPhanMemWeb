<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'Admin')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Tailwind --}}
    <script src="https://cdn.tailwindcss.com?plugins=forms"></script>

    {{-- Font --}}
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap" rel="stylesheet">

    {{-- Icons --}}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">

    {{-- jQuery --}}
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    {{-- DataTables core --}}
    <link rel="stylesheet"
      href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
    <script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>

    {{-- DataTables Tailwind --}}
    <link rel="stylesheet"
        href="https://cdn.datatables.net/1.13.8/css/dataTables.tailwindcss.min.css">
    <script src="https://cdn.datatables.net/1.13.8/js/dataTables.tailwindcss.min.js"></script>

    <style>
        /* Ẩn dropdown số dòng */
        .dataTables_length {
            display: none;
        }

        /* Search sang phải */
        .dataTables_filter {
            float: right;
            margin-bottom: 1rem;
        }

        /* Input search đẹp hơn */
        .dataTables_filter input {
            border-radius: 0.5rem;
            border: 1px solid #d1d5db;
            padding: 6px 10px;
        }

        /* Table */
        table.dataTable {
            border-radius: 0.75rem;
            overflow: hidden;
        }

        /* Header */
        table.dataTable thead th {
            background: #f9fafb;
            font-weight: 600;
        }

    </style>

    @stack('css')
</head>

<body class="bg-gray-100">
<div class="flex min-h-screen">

    {{-- SIDEBAR --}}
    <aside class="w-64 bg-white border-r p-4">
        <h2 class="font-bold text-blue-600 mb-4">Shop Admin</h2>

        <nav class="space-y-1">
            <a href="{{ route('products.index') }}"
               class="block px-3 py-2 rounded
               {{ request()->routeIs('products.*') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100' }}">
                Products
            </a>

            <a href="{{ route('categories.index') }}"
               class="block px-3 py-2 rounded
               {{ request()->routeIs('categories.*') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100' }}">
                Categories
            </a>
        </nav>
    </aside>

    {{-- MAIN --}}
    <main class="flex-1 p-6">
        @yield('content')
    </main>

</div>

<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
@stack('js')
</body>
</html>