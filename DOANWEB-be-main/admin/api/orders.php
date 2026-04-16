<?php
header('Content-Type: application/json');

try {
    require_once '../db.php';
    require_once '../services/UserService.php';
    require_once '../services/AuthService.php';

    $userService = new UserService($pdo);
    $authService = new AuthService($pdo, $userService);
    $authService->requireAuthentication();
    
    $stmt = $pdo->query("SELECT o.id, u.name as customer_name, o.total_amount, o.status, o.created_at 
                         FROM orders o 
                         JOIN users u ON o.user_id = u.id 
                         ORDER BY o.created_at DESC");
    $orders = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $orders]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
