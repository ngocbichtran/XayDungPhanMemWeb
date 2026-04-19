<?php
header('Content-Type: application/json');
require_once '../db.php';
require_once '../services/CategoryService.php';
require_once '../services/UserService.php';
require_once '../services/AuthService.php';

$categoryService = new CategoryService($pdo);
$userService = new UserService($pdo);
// $authService = new AuthService($pdo, $userService);
// $authService->requireAuthentication();

try {
    $categories = $categoryService->getAllCategories();
    echo json_encode(['success' => true, 'data' => $categories]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
