<?php
header('Content-Type: application/json');
require_once '../db.php';
require_once '../services/UserService.php';
require_once '../services/AuthService.php';

$userService = new UserService($pdo);
$authService = new AuthService($pdo, $userService);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

try {
    switch ($method) {
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            if ($action === 'login') {
                if (isset($input['email']) && isset($input['password'])) {
                    $loginResult = $authService->login($input['email'], $input['password']);
                    if ($loginResult) {
                        echo json_encode(['success' => true, 'data' => $loginResult]);
                    } else {
                        http_response_code(401);
                        echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'error' => 'Email and password are required']);
                }
            } elseif ($action === 'register') {
                if (isset($input['email']) && isset($input['password']) && isset($input['full_name']) && isset($input['phone'])) {
                    $userId = $authService->register($input);
                    if ($userId) {
                        echo json_encode(['success' => true, 'message' => 'User registered successfully']);
                    } else {
                        http_response_code(500);
                        echo json_encode(['success' => false, 'error' => 'Failed to register user']);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'error' => 'Full name, email, phone, and password are required']);
                }
            } elseif ($action === 'logout') {
                $authService->logout();
                echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Action not found']);
            }
            break;

        case 'GET':
            if ($action === 'me') {
                if ($authService->isAuthenticated()) {
                    echo json_encode(['success' => true, 'data' => $authService->getCurrentUser()]);
                } else {
                    http_response_code(401);
                    echo json_encode(['success' => false, 'error' => 'Not authenticated']);
                }
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Action not found']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
