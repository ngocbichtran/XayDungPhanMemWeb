<?php
header('Content-Type: application/json');
require_once '../db.php';
require_once '../services/ProductService.php';
require_once '../services/UserService.php';
require_once '../services/AuthService.php';
require_once '../services/CloudinaryService.php';

$userService = new UserService($pdo);
$authService = new AuthService($pdo, $userService);
$productService = new ProductService($pdo);
$cloudinaryService = new CloudinaryService();

$method = $_SERVER['REQUEST_METHOD'];
// Overriding method for PUT support via FormData (since multipart payload is not parsed for PUT natively in PHP)
if ($method === 'POST' && isset($_POST['_method']) && $_POST['_method'] === 'PUT') {
    $method = 'PUT';
}

$authService->requireAuthentication();

try {
    switch ($method) {
        case 'GET':
            // Both admin and user can READ
            if (isset($_GET['id'])) {
                $id = (int)$_GET['id'];
                $product = $productService->getProductById($id);
                if ($product) {
                    echo json_encode(['success' => true, 'data' => $product]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'error' => 'Product not found']);
                }
            } else {
                $products = $productService->getAllProducts();
                echo json_encode(['success' => true, 'data' => $products]);
            }
            break;

        case 'POST':
            // Only admin can CREATE
            if (!$authService->hasRole('admin')) {
                http_response_code(403);
                echo json_encode(['success' => false, 'error' => 'Access denied.']);
                exit();
            }

            $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
            
            // Handle File Upload to Cloudinary
            if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['image_file'];
                if ($file['size'] > 5 * 1024 * 1024) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'error' => 'Image exceeds 5MB limit']);
                    exit();
                }
                
                $secureUrl = $cloudinaryService->uploadImage($file['tmp_name']);
                if ($secureUrl) {
                    $input['image'] = $secureUrl;
                } else {
                    http_response_code(500);
                    echo json_encode(['success' => false, 'error' => 'Failed to upload image to Cloudinary']);
                    exit();
                }
            }

            if (!isset($input['name'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Name is required']);
                break;
            }
            $id = $productService->createProduct($input);
            http_response_code(201);
            echo json_encode(['success' => true, 'data' => ['id' => $id, 'message' => 'Product created successfully']]);
            break;

        case 'PUT':
            // Only admin can UPDATE
            if (!$authService->hasRole('admin')) {
                http_response_code(403);
                echo json_encode(['success' => false, 'error' => 'Access denied.']);
                exit();
            }
            $id = isset($_GET['id']) ? (int)$_GET['id'] : (isset($_POST['id']) ? (int)$_POST['id'] : null);
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'ID is required for update']);
                break;
            }
            $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

            // Handle File Upload to Cloudinary for PUT
            if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['image_file'];
                if ($file['size'] > 5 * 1024 * 1024) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'error' => 'Image exceeds 5MB limit']);
                    exit();
                }
                
                $secureUrl = $cloudinaryService->uploadImage($file['tmp_name']);
                if ($secureUrl) {
                    $input['image'] = $secureUrl;
                } else {
                    http_response_code(500);
                    echo json_encode(['success' => false, 'error' => 'Failed to upload image to Cloudinary']);
                    exit();
                }
            }

            if (!isset($input['name'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Name is required']);
                break;
            }
            $success = $productService->updateProduct($id, $input);
            if ($success) {
                echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to update product']);
            }
            break;

        case 'DELETE':
            // Only admin can DELETE
            if (!$authService->hasRole('admin')) {
                http_response_code(403);
                echo json_encode(['success' => false, 'error' => 'Access denied. Administrative privileges required.']);
                exit();
            }
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'ID is required for deletion']);
                break;
            }
            $success = $productService->deleteProduct($id);
            if ($success) {
                echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to delete product']);
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
