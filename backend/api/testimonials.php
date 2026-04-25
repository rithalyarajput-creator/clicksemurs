<?php
require_once __DIR__ . '/../db/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

$db = getDB();
$stmt = $db->query('SELECT * FROM testimonials ORDER BY created_at DESC');
jsonResponse($stmt->fetchAll());
