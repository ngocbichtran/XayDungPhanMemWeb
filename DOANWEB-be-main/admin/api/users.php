<?php
header('Content-Type: application/json');

try {
    require_once '../db.php';
    require_once '../services/UserService.php';
    require_once '../services/AuthService.php';

    $userService = new UserService($pdo);
    $authService = new AuthService($pdo, $userService);
    $authService->requireAuthentication();
    
    $stmt = $pdo->query("SELECT id, name FROM users ORDER BY id DESC");
    $users = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $users]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
