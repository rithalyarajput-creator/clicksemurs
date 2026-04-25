<?php
require_once __DIR__ . '/../db/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);

$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$phone   = trim($input['phone'] ?? '');
$service = trim($input['service'] ?? '');
$message = trim($input['message'] ?? '');

if (!$name || !$email || !$message) {
    jsonResponse(['success' => false, 'message' => 'Name, email and message are required'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['success' => false, 'message' => 'Invalid email address'], 400);
}

try {
    $db = getDB();
    $stmt = $db->prepare(
        'INSERT INTO leads (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([$name, $email, $phone, $service, $message]);
    jsonResponse(['success' => true, 'message' => 'Your message has been received. We will contact you shortly.']);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'message' => 'Server error. Please try again later.'], 500);
}
