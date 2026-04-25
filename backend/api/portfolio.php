<?php
require_once __DIR__ . '/../db/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

$db = getDB();

if (isset($_GET['id'])) {
    $stmt = $db->prepare('SELECT * FROM portfolio WHERE id = ?');
    $stmt->execute([(int)$_GET['id']]);
    $item = $stmt->fetch();
    jsonResponse($item ?: ['error' => 'Not found']);
} else {
    $industry = $_GET['industry'] ?? '';
    if ($industry) {
        $stmt = $db->prepare('SELECT * FROM portfolio WHERE industry = ? ORDER BY created_at DESC');
        $stmt->execute([$industry]);
    } else {
        $stmt = $db->query('SELECT * FROM portfolio ORDER BY created_at DESC');
    }
    jsonResponse($stmt->fetchAll());
}
