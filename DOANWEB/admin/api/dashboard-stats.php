<?php
header('Content-Type: application/json');
try {
    require_once '../db.php';
    // 2.2 total revenue (excluding cancelled)
    $stmt = $pdo->query("SELECT SUM(total_amount) as total_revenue FROM orders WHERE status != 'cancelled'");
    $revenueResult = $stmt->fetch();
    $totalRevenue = $revenueResult['total_revenue'] ?? 0;

    // 2.3 total orders
    $stmt = $pdo->query("SELECT COUNT(id) as total_orders FROM orders");
    $ordersResult = $stmt->fetch();
    $totalOrders = $ordersResult['total_orders'] ?? 0;

    // 2.4 total users
    $stmt = $pdo->query("SELECT COUNT(id) as total_users FROM users");
    $usersResult = $stmt->fetch();
    $totalUsers = $usersResult['total_users'] ?? 0;

    // 2.5 total products
    $stmt = $pdo->query("SELECT COUNT(id) as total_products FROM products");
    $productsResult = $stmt->fetch();
    $totalProducts = $productsResult['total_products'] ?? 0;

    // 2.6 order status distribution
    $stmt = $pdo->query("SELECT status, COUNT(id) as status_count FROM orders GROUP BY status");
    $statusDistribution = $stmt->fetchAll();

    // Daily Revenue (extra for bar chart visualization)
    $stmt = $pdo->query("SELECT DATE(created_at) as order_date, SUM(total_amount) as daily_revenue FROM orders WHERE status != 'cancelled' GROUP BY DATE(created_at) ORDER BY order_date ASC LIMIT 7");
    $dailyRevenue = $stmt->fetchAll();

    // 2.7 return JSON
    $response = [
        'success' => true,
        'data' => [
            'totalRevenue' => $totalRevenue,
            'totalOrders' => $totalOrders,
            'totalUsers' => $totalUsers,
            'totalProducts' => $totalProducts,
            'statusDistribution' => $statusDistribution,
            'dailyRevenue' => $dailyRevenue
        ]
    ];

    echo json_encode($response);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
