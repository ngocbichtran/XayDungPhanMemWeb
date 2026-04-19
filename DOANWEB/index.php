<?php
header('Content-Type: application/json');
echo json_encode(["message" => "move to /admin/api/"],JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
