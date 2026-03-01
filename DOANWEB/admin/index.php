<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <!-- TailwindCSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <?php 
        $basePath = '';
        $currentPage = 'dashboard';
        include 'components/sidebar.php'; 
    ?>

    <!-- Overlay for mobile sidebar -->
    <div id="sidebarOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-10 hidden md:hidden"></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col h-screen overflow-hidden">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
            <button id="openSidebar" class="md:hidden text-gray-500 hover:text-indigo-600">
                <i class="fas fa-bars text-xl"></i>
            </button>
            <div class="flex-1 flex justify-between items-center ml-4 md:ml-0">
                <h2 class="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
                <div class="flex items-center space-x-4">
                    <button class="text-gray-400 hover:text-indigo-600">
                        <i class="fas fa-bell"></i>
                    </button>
                    <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                        A
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Area -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            
            <!-- Loading Indicator -->
            <div id="loadingIndicator" class="flex justify-center items-center py-10">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span class="ml-2 text-gray-600">Loading data...</span>
            </div>

            <div id="dashboardContent" class="hidden view-section">
                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <!-- Revenue Card -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                        <div class="bg-green-100 p-3 rounded-lg text-green-600 flex-shrink-0">
                            <i class="fas fa-dollar-sign fa-fw text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Total Revenue</p>
                            <h3 class="text-2xl font-bold text-gray-800" id="cardRevenue">0 đ</h3>
                        </div>
                    </div>
                    
                    <!-- Orders Card -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                        <div class="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                            <i class="fas fa-shopping-bag fa-fw text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Total Orders</p>
                            <h3 class="text-2xl font-bold text-gray-800" id="cardOrders">0</h3>
                        </div>
                    </div>

                    <!-- Users Card -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                        <div class="bg-purple-100 p-3 rounded-lg text-purple-600 flex-shrink-0">
                            <i class="fas fa-users fa-fw text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Active Users</p>
                            <h3 class="text-2xl font-bold text-gray-800" id="cardUsers">0</h3>
                        </div>
                    </div>

                    <!-- Products Card -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                        <div class="bg-orange-100 p-3 rounded-lg text-orange-600 flex-shrink-0">
                            <i class="fas fa-box-open fa-fw text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Total Products</p>
                            <h3 class="text-2xl font-bold text-gray-800" id="cardProducts">0</h3>
                        </div>
                    </div>
                </div>

                <!-- Charts Section -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Revenue Chart -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
                        <div class="relative h-72 w-full">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Order Status Chart -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
                        <div class="relative h-72 w-full flex justify-center items-center">
                            <canvas id="orderStatusChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Error State -->
            <div id="errorState" class="hidden bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-circle text-red-500"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700" id="errorMessage">
                            Could not load dashboard data.
                        </p>
                    </div>
                </div>
            </div>

        </main>
    </div>

    <script>
        // Sidebar Mobile Toggle
        const sidebar = document.getElementById('sidebar');
        const openSidebarBtn = document.getElementById('openSidebar');
        const closeSidebarBtn = document.getElementById('closeSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        function toggleSidebar() {
            if (window.innerWidth < 768) {
                if (sidebar.classList.contains('-translate-x-full')) {
                    sidebar.classList.remove('-translate-x-full');
                    sidebarOverlay.classList.remove('hidden');
                } else {
                    sidebar.classList.add('-translate-x-full');
                    sidebarOverlay.classList.add('hidden');
                }
            }
        }

        openSidebarBtn.addEventListener('click', toggleSidebar);
        closeSidebarBtn.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);

        if (window.innerWidth < 768) {
            sidebar.classList.add('fixed', 'inset-y-0', 'left-0', 'transform', '-translate-x-full');
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                sidebar.classList.remove('fixed', 'inset-y-0', 'left-0', 'transform', '-translate-x-full');
                sidebarOverlay.classList.add('hidden');
            } else {
                sidebar.classList.add('fixed', 'inset-y-0', 'left-0', 'transform', '-translate-x-full');
            }
        });

        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        };

        document.addEventListener('DOMContentLoaded', async () => {
            try {
                const response = await fetch('api/dashboard-stats.php');
                const result = await response.json();

                document.getElementById('loadingIndicator').classList.add('hidden');

                if (result.success) {
                    document.getElementById('dashboardContent').classList.remove('hidden');
                    const data = result.data;

                    document.getElementById('cardRevenue').innerText = formatCurrency(data.totalRevenue);
                    document.getElementById('cardOrders').innerText = data.totalOrders;
                    document.getElementById('cardUsers').innerText = data.totalUsers;
                    document.getElementById('cardProducts').innerText = data.totalProducts;

                    const statusLabels = data.statusDistribution.map(item => item.status.toUpperCase());
                    const statusData = data.statusDistribution.map(item => item.status_count);
                    
                    const statusColors = data.statusDistribution.map(item => {
                        switch(item.status) {
                            case 'delivered': return 'rgba(34, 197, 94, 0.8)';
                            case 'pending': return 'rgba(234, 179, 8, 0.8)';
                            case 'processing': return 'rgba(59, 130, 246, 0.8)';
                            case 'cancelled': return 'rgba(239, 68, 68, 0.8)';
                            case 'shipped': return 'rgba(168, 85, 247, 0.8)';
                            default: return 'rgba(156, 163, 175, 0.8)';
                        }
                    });

                    const ctxOrder = document.getElementById('orderStatusChart').getContext('2d');
                    new Chart(ctxOrder, {
                        type: 'doughnut',
                        data: {
                            labels: statusLabels,
                            datasets: [{
                                data: statusData,
                                backgroundColor: statusColors,
                                borderWidth: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: 'bottom' }
                            },
                            cutout: '70%'
                        }
                    });

                    const rawDaily = data.dailyRevenue || [];
                    const revLabels = rawDaily.map(item => item.order_date);
                    const revData = rawDaily.map(item => item.daily_revenue);

                    const ctxRev = document.getElementById('revenueChart').getContext('2d');
                    
                    let gradient = ctxRev.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.5)');
                    gradient.addColorStop(1, 'rgba(79, 70, 229, 0.05)');

                    new Chart(ctxRev, {
                        type: 'line',
                        data: {
                            labels: revLabels.length ? revLabels : ['No Data'],
                            datasets: [{
                                label: 'Daily Revenue (VND)',
                                data: revData.length ? revData : [0],
                                borderColor: 'rgba(79, 70, 229, 1)',
                                backgroundColor: gradient,
                                borderWidth: 2,
                                pointBackgroundColor: 'rgba(79, 70, 229, 1)',
                                pointBorderColor: '#fff',
                                pointBorderWidth: 2,
                                pointRadius: 4,
                                pointHoverRadius: 6,
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            let label = context.dataset.label || '';
                                            if (label) { label += ': '; }
                                            if (context.parsed.y !== null) {
                                                label += formatCurrency(context.parsed.y);
                                            }
                                            return label;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: 'rgba(243, 244, 246, 1)',
                                        drawBorder: false,
                                    },
                                    ticks: {
                                        callback: function(value) {
                                            if (value >= 1000000) {
                                                return (value / 1000000) + 'M';
                                            }
                                            return value;
                                        }
                                    }
                                },
                                x: {
                                    grid: { display: false, drawBorder: false }
                                }
                            }
                        }
                    });

                } else {
                    document.getElementById('errorState').classList.remove('hidden');
                    if (result.error) {
                        document.getElementById('errorMessage').innerText = result.error;
                    }
                }
            } catch (error) {
                document.getElementById('loadingIndicator').classList.add('hidden');
                document.getElementById('errorState').classList.remove('hidden');
                document.getElementById('errorMessage').innerText = "Failed to connect to the server.";
                console.error("Dashboard error:", error);
            }
        });
    </script>
</body>
</html>
