<?php
session_start();

require_once __DIR__ . '/../db/config.php';

function requireLogin(): void {
    if (empty($_SESSION['admin_id'])) {
        header('Location: /admin/login.php');
        exit;
    }
}

function isLoggedIn(): bool {
    return !empty($_SESSION['admin_id']);
}
