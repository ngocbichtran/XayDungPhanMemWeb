<?php
// Try to fetch latest products for the homepage
$products = [];
try {
    require_once 'admin/db.php';
    $stmt = $pdo->query("SELECT id, name, price, image, description FROM products WHERE status = 1 ORDER BY created_at DESC LIMIT 4");
    $products = $stmt->fetchAll();
} catch (Exception $e) {
    // Silently ignore connection errors for the simple homepage
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Store - Modern E-Commerce</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
    </style>
</head>
<body class="bg-gray-50 flex flex-col min-h-screen">
    
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-layer-group text-indigo-600 text-2xl"></i>
                    <span class="font-bold text-xl text-gray-900 tracking-tight">TechStore</span>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#" class="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</a>
                    <a href="#" class="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Products</a>
                    <a href="#" class="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Categories</a>
                    <a href="#" class="text-gray-600 hover:text-indigo-600 font-medium transition-colors">About Us</a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="admin/index.php" class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Admin Login</a>
                    <a href="#" class="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                        <i class="fas fa-shopping-cart text-sm mr-1"></i> Cart (0)
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16 lg:pt-24 xl:pt-32">
                <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="sm:text-center lg:text-left">
                        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span class="block xl:inline">Next Generation</span>
                            <span class="block text-indigo-600 xl:inline">Tech Products</span>
                        </h1>
                        <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            Discover the latest smartphones, cutting-edge laptops, and premium accessories. Elevate your digital life with our curated selection of top-tier electronics.
                        </p>
                        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div class="rounded-md shadow">
                                <a href="#featured" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                                    Shop Now
                                </a>
                            </div>
                            <div class="mt-3 sm:mt-0 sm:ml-3">
                                <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                                    View Categories
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-indigo-50" src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80" alt="Tech workspace">
            <div class="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-20"></div>
        </div>
    </div>

    <!-- Featured Products -->
    <div id="featured" class="bg-gray-50 py-16 sm:py-24 flex-1">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="md:flex md:items-center md:justify-between mb-8">
                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Trending Products</h2>
                <a href="#" class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                    Shop the collection <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>

            <?php if (empty($products)): ?>
                <div class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <i class="fas fa-box-open text-gray-400 text-4xl mb-4"></i>
                    <p class="text-gray-500">No products available at the moment.</p>
                </div>
            <?php else: ?>
                <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    <?php foreach($products as $prod): ?>
                        <div class="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                            <div class="w-full min-h-60 bg-gray-100 aspect-w-1 aspect-h-1 rounded-xl overflow-hidden flex items-center justify-center relative">
                                <?php if ($prod['image']): ?>
                                    <img src="<?= htmlspecialchars($prod['image']) ?>" alt="<?= htmlspecialchars($prod['name']) ?>" class="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity">
                                <?php else: ?>
                                    <i class="fas fa-image text-4xl text-gray-300"></i>
                                <?php endif; ?>
                                
                                <div class="absolute top-2 right-2">
                                    <button class="bg-white/80 backdrop-blur pb-1 pt-1.5 px-2 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-4 flex-1 flex flex-col">
                                <h3 class="text-sm font-medium text-gray-900 flex-1">
                                    <a href="#">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        <?= htmlspecialchars($prod['name']) ?>
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-500 line-clamp-2"><?= htmlspecialchars($prod['description'] ?: 'High performance tech product.') ?></p>
                                
                                <div class="mt-4 flex items-center justify-between">
                                    <p class="text-lg font-bold text-indigo-600"><?= number_format($prod['price'], 0, ',', '.') ?> đ</p>
                                    <div class="flex items-center text-xs text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
            <div class="mt-8 text-center md:hidden">
                <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Shop all products <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-auto">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center space-x-2 mb-4">
                        <i class="fas fa-layer-group text-indigo-400 text-2xl"></i>
                        <span class="font-bold text-xl tracking-tight">TechStore</span>
                    </div>
                    <p class="text-gray-400 text-sm max-w-sm">
                        Providing the best tech gadgets and electronics with guaranteed quality and premium customer service.
                    </p>
                    <div class="flex space-x-4 mt-6">
                        <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 text-gray-200">Quick Links</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">About Us</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Shop</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Contact</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 text-gray-200">Legal</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Return Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                &copy; <?= date('Y') ?> TechStore. All rights reserved.
            </div>
        </div>
    </footer>
</body>
</html>
