<?php
$basePath = $basePath ?? '';
$currentPage = $currentPage ?? 'dashboard';

function isActive($page, $currentPage) {
    return $page === $currentPage
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600';
}
?>
<aside class="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300 z-20" id="sidebar">
    <div class="p-6 border-b border-gray-200 flex items-center justify-between">
        <h1 class="text-xl font-bold text-indigo-600">AdminPanel</h1>
        <button id="closeSidebar" class="md:hidden text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto" id="navSidebar">
        <a href="<?= $basePath ?>index.php" class="nav-link flex items-center space-x-3 px-4 py-3 rounded-lg <?= isActive('dashboard', $currentPage) ?> font-medium transition-colors">
            <i class="fas fa-tachometer-alt w-5 text-center"></i>
            <span>Dashboard</span>
        </a>
        <a href="<?= $basePath ?>orders/index.php" class="nav-link flex items-center space-x-3 px-4 py-3 rounded-lg <?= isActive('orders', $currentPage) ?> font-medium transition-colors">
            <i class="fas fa-shopping-cart w-5 text-center"></i>
            <span>Orders</span>
        </a>
        <a href="<?= $basePath ?>users/index.php" class="nav-link flex items-center space-x-3 px-4 py-3 rounded-lg <?= isActive('users', $currentPage) ?> font-medium transition-colors">
            <i class="fas fa-users w-5 text-center"></i>
            <span>Users</span>
        </a>
        <a href="<?= $basePath ?>products/index.php" class="nav-link flex items-center space-x-3 px-4 py-3 rounded-lg <?= isActive('products', $currentPage) ?> font-medium transition-colors">
            <i class="fas fa-box w-5 text-center"></i>
            <span>Products</span>
        </a>
    </nav>
    <div class="p-4 border-t border-gray-200">
        <a href="#" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors">
            <i class="fas fa-sign-out-alt w-5 text-center"></i>
            <span>Logout</span>
        </a>
    </div>
</aside>
