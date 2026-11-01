<?php
/**
 * ServiceTackle AI — API Core Configuration & Security Layer
 * Built for Hostinger Shared Hosting (PHP 8.0+)
 */

// 1. Prevent direct execution output buffering issues
ob_start();

// 2. Set Security & CORS Headers
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://servicetackle.com',
    'https://www.servicetackle.com'
];

if (in_array($origin, $allowedOrigins) || $origin === '*') {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: SAMEORIGIN");
header("X-XSS-Protection: 1; mode=block");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3. Load Environment Variables from .env file if present
function loadEnv($filePath) {
    if (!file_exists($filePath)) {
        return;
    }
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || str_starts_with($line, '#')) {
            continue;
        }
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value, " \t\n\r\0\x0B\"'");
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

// Check local api/.env or parent ../.env
loadEnv(__DIR__ . '/.env');
loadEnv(dirname(__DIR__) . '/.env');

// Helper to get environment variable with fallback
function getEnvVar($key, $default = '') {
    return $_ENV[$key] ?? getenv($key) ?: $default;
}

// 4. Rate Limiter (IP-based lightweight file storage)
function checkRateLimit($action = 'default', $maxRequests = 20, $decaySeconds = 60) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $tmpDir = sys_get_temp_dir() . '/stai_rate_limits';
    if (!is_dir($tmpDir)) {
        @mkdir($tmpDir, 0755, true);
    }
    $rateFile = $tmpDir . '/' . md5($ip . '_' . $action) . '.json';
    
    $now = time();
    $data = ['count' => 0, 'first_request' => $now];
    
    if (file_exists($rateFile)) {
        $content = @file_get_contents($rateFile);
        $parsed = json_decode($content, true);
        if (is_array($parsed) && isset($parsed['first_request'])) {
            if ($now - $parsed['first_request'] < $decaySeconds) {
                $data = $parsed;
            }
        }
    }
    
    $data['count']++;
    @file_put_contents($rateFile, json_encode($data));
    
    if ($data['count'] > $maxRequests) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Too many requests. Please wait a moment before trying again.'
        ]);
        exit();
    }
}

// 5. CSRF Protection
function generateCSRFToken(): string {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function validateCSRFToken(?string $token): bool {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return !empty($token) && hash_equals($_SESSION['csrf_token'] ?? '', $token);
}

function requireCSRF(): void {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = getJsonInput();
        $token = $input['csrf_token'] ?? $_POST['csrf_token'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        if (!validateCSRFToken($token)) {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'message' => 'CSRF validation failed. Please refresh the page and try again.'
            ]);
            exit();
        }
    }
}

// Initialize CSRF token on first request
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
generateCSRFToken();


// 6. Standard JSON Response Helper
function sendJsonResponse($success, $message, $data = [], $statusCode = 200) {
    http_response_code($statusCode);
    $response = [
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => time()
    ];
    
    // Include CSRF token in response for next request
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (!empty($_SESSION['csrf_token'])) {
        $response['csrf_token'] = $_SESSION['csrf_token'];
    }
    
    echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit();
}

// 7. Request Body Parser
function getJsonInput() {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

// 8. Sanitizer
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    $sanitized = htmlspecialchars(trim((string)$data), ENT_QUOTES, 'UTF-8');
    // Additional XSS protection
    $sanitized = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $sanitized);
    return $sanitized;
}
