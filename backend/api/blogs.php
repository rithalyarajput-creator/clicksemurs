<?php
require_once __DIR__ . '/../db/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

$db = getDB();

if (isset($_GET['slug'])) {
    $slug = trim($_GET['slug']);
    $stmt = $db->prepare('SELECT * FROM blogs WHERE slug = ? AND is_published = 1');
    $stmt->execute([$slug]);
    $post = $stmt->fetch();
    if ($post) {
        jsonResponse($post);
    } else {
        jsonResponse(['error' => 'Not found'], 404);
    }
} else {
    $stmt = $db->query('SELECT id, title, slug, category, thumbnail, created_at FROM blogs WHERE is_published = 1 ORDER BY created_at DESC');
    $posts = $stmt->fetchAll();
    $formatted = array_map(fn($p) => [
        'id'       => $p['id'],
        'slug'     => $p['slug'],
        'title'    => $p['title'],
        'category' => $p['category'],
        'date'     => substr($p['created_at'], 0, 10),
        'excerpt'  => '',
    ], $posts);
    jsonResponse($formatted);
}
