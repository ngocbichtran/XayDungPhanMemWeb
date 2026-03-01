<?php
header('Content-Type: application/json');

try {
    require_once '../db.php';
    
    $stmt = $pdo->query("SELECT p.id, p.name, p.price, p.quantity, p.status, c.name as category_name 
                         FROM products p 
                         LEFT JOIN categories c ON p.category_id = c.id 
                         ORDER BY p.created_at DESC");
    $products = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $products]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
