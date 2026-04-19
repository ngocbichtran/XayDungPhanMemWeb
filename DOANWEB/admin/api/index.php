<?php
header('Content-Type: application/json');

// Directory containing the APIs
$api_dir = __DIR__;

// Get all PHP files in this directory except index.php
$files = scandir($api_dir);
$apis = [];

$base_url = "/admin/api/";

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'php' && $file !== 'index.php') {
        $endpoint_name = str_replace('.php', '', $file);
        $apis[] = [
            "name" => ucfirst($endpoint_name) . " API",
            "endpoint" => $base_url . $file,
            "description" => "Endpoint for " . $endpoint_name
        ];
    }
}

echo json_encode([
    "message" => "Welcome to the API",
    "status" => "success",
    "available_apis" => $apis
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
