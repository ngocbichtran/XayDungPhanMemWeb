<?php
class ProductService {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllProducts() {
        $stmt = $this->pdo->prepare("
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            ORDER BY p.id DESC
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getProductById($id) {
        $stmt = $this->pdo->prepare("
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.id = ?
        ");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function createProduct($data) {
        $stmt = $this->pdo->prepare("INSERT INTO products (category_id, name, price, sale_price, quantity, image, description, status, created_at, updated_at) 
                                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([
            $data['category_id'] ?? 1,
            $data['name'],
            $data['price'] ?? 0,
            $data['sale_price'] ?? 0,
            $data['quantity'] ?? 0,
            $data['image'] ?? null,
            $data['description'] ?? null,
            $data['status'] ?? 1
        ]);
        return $this->pdo->lastInsertId();
    }

    public function updateProduct($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE products 
                                     SET category_id = ?, name = ?, price = ?, sale_price = ?, quantity = ?, image = ?, description = ?, status = ?, updated_at = NOW() 
                                     WHERE id = ?");
        $success = $stmt->execute([
            $data['category_id'] ?? 1,
            $data['name'],
            $data['price'] ?? 0,
            $data['sale_price'] ?? 0,
            $data['quantity'] ?? 0,
            $data['image'] ?? null,
            $data['description'] ?? null,
            $data['status'] ?? 1,
            $id
        ]);
        return $success;
    }

    public function deleteProduct($id) {
        $stmt = $this->pdo->prepare("DELETE FROM products WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
