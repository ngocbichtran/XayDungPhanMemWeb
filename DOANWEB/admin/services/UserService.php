<?php
class UserService {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllUsers() {
        $stmt = $this->pdo->prepare("SELECT id, full_name, email, phone, avatar, status, created_at FROM `user` ORDER BY id DESC");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getUserById($id) {
        $stmt = $this->pdo->prepare("SELECT id, full_name, email, phone, avatar, status, created_at FROM `user` WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function getUserByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM `user` WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    public function createUser($data) {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("INSERT INTO `user` (full_name, email, phone, password_hash, avatar, status) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['full_name'],
                $data['email'],
                $data['phone'] ?? null,
                password_hash($data['password'], PASSWORD_DEFAULT),
                $data['avatar'] ?? null,
                $data['status'] ?? 'active'
            ]);
            $userId = $this->pdo->lastInsertId();

            // Assign default role 'user' if not specified
            $roleName = $data['role'] ?? 'user';
            $stmtRole = $this->pdo->prepare("SELECT id FROM roles WHERE name = ?");
            $stmtRole->execute([$roleName]);
            $role = $stmtRole->fetch();

            if ($role) {
                $stmtUserRole = $this->pdo->prepare("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)");
                $stmtUserRole->execute([$userId, $role['id']]);
            }

            $this->pdo->commit();
            return $userId;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    public function updateUser($id, $data) {
        $fields = ["full_name = ?", "email = ?", "phone = ?", "status = ?", "avatar = ?"];
        $params = [$data['full_name'], $data['email'], $data['phone'] ?? null, $data['status'] ?? 'active', $data['avatar'] ?? null];

        if (isset($data['password']) && !empty($data['password'])) {
            $fields[] = "password_hash = ?";
            $params[] = password_hash($data['password'], PASSWORD_DEFAULT);
        }

        $params[] = $id;
        $sql = "UPDATE `user` SET " . implode(", ", $fields) . ", updated_at = NOW() WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function deleteUser($id) {
        $stmt = $this->pdo->prepare("DELETE FROM `user` WHERE id = ?");
        return $stmt->execute([$id]);
    }

    public function getUserRoles($userId) {
        $stmt = $this->pdo->prepare("
            SELECT r.name 
            FROM roles r 
            JOIN user_roles ur ON r.id = ur.role_id 
            WHERE ur.user_id = ?
        ");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}
?>
