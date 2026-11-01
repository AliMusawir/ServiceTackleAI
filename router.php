<?php
// Simple router for PHP built-in server
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . $path;

// Log every request
error_log(sprintf("[%s] %s %s", date('Y-m-d H:i:s'), $_SERVER['REQUEST_METHOD'], $path));

// If file exists and is not a directory, serve it
if (file_exists($file) && !is_dir($file)) {
    return false; // Let PHP handle it
}

// Otherwise serve index.html for SPA routing
if (file_exists(__DIR__ . '/index.html')) {
    return false;
}

http_response_code(404);
echo "404 Not Found";
