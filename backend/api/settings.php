<?php
require_once __DIR__ . '/../db/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

$db = getDB();
$stmt = $db->query('SELECT setting_key, setting_value FROM settings');
$rows = $stmt->fetchAll();
$settings = [];
foreach ($rows as $row) {
    $settings[$row['setting_key']] = $row['setting_value'];
}
jsonResponse($settings);
