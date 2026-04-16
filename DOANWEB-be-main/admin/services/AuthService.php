<?php
require_once 'JwtService.php';

class AuthService {
    private $pdo;
    private $userService;
    private $jwtService;
    private $currentUser = null;

    public function __construct($pdo, $userService) {
        $this->pdo = $pdo;
        $this->userService = $userService;
        // Using a predefined secret or generating one.
        $this->jwtService = new JwtService('super_secret_jwt_key_123'); 
        $this->authenticateFromHeader();
    }

    private function authenticateFromHeader() {
        $headers = function_exists('apache_request_headers') ? apache_request_headers() : $_SERVER;
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? $headers['HTTP_AUTHORIZATION'] ?? null;
        
        if ($authHeader && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
            $payload = $this->jwtService->decode($token);
            if ($payload && isset($payload['id'], $payload['email'], $payload['roles'])) {
                $this->currentUser = [
                    'id' => $payload['id'],
                    'email' => $payload['email'],
                    'full_name' => $payload['full_name'],
                    'roles' => $payload['roles']
                ];
            }
        }
    }

    public function register($data) {
        try {
            $userId = $this->userService->createUser($data);
            return $userId;
        } catch (Exception $e) {
            return false;
        }
    }

    public function login($email, $password) {
        $user = $this->userService->getUserByEmail($email);
        if ($user && password_verify($password, $user['password_hash'])) {
            $roles = $this->userService->getUserRoles($user['id']);
            
            $payload = [
                'id' => $user['id'],
                'email' => $user['email'],
                'full_name' => $user['full_name'],
                'roles' => $roles,
                'iat' => time(),
                'exp' => time() + (86400 * 7), // 7 days expiration
            ];
            
            $token = $this->jwtService->encode($payload);
            
            $this->currentUser = [
                'id' => $user['id'],
                'email' => $user['email'],
                'full_name' => $user['full_name'],
                'roles' => $roles
            ];
            
            return [
                'token' => $token,
                'user' => $this->currentUser
            ];
        }
        return false;
    }

    public function logout() {
        // With JWT, logout is typically handled client-side by deleting the token.
        $this->currentUser = null;
    }

    public function isAuthenticated() {
        return $this->currentUser !== null;
    }

    public function requireAuthentication() {
        if (!$this->isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Unauthenticated or token expired']);
            exit();
        }
    }

    public function hasRole($roleName) {
        if (!$this->isAuthenticated()) return false;
        return in_array($roleName, $this->currentUser['roles'] ?? []);
    }

    public function getCurrentUser() {
        return $this->currentUser;
    }
}
?>
