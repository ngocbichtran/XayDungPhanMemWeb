<?php
class CategoryService {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllCategories() {
        $stmt = $this->pdo->prepare("SELECT * FROM categories WHERE status = 1 ORDER BY name ASC");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getCategoryById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
}
?>
