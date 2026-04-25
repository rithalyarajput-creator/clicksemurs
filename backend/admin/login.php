<?php
session_start();
require_once __DIR__ . '/../db/config.php';

if (!empty($_SESSION['admin_id'])) {
    header('Location: /admin/index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username && $password) {
        try {
            $db = getDB();
            $stmt = $db->prepare('SELECT * FROM admin_users WHERE username = ?');
            $stmt->execute([$username]);
            $user = $stmt->fetch();
            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['admin_id']       = $user['id'];
                $_SESSION['admin_username'] = $user['username'];
                header('Location: /admin/index.php');
                exit;
            } else {
                $error = 'Invalid username or password.';
            }
        } catch (PDOException $e) {
            $error = 'Database error. Please try again.';
        }
    } else {
        $error = 'Please enter both username and password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Login — Clicksemurs</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#0A0A0A; font-family:'Inter',system-ui,sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; }
.card { background:#1E1E1E; border:1px solid #2E2E2E; padding:48px; width:100%; max-width:420px; }
.logo { text-align:center; margin-bottom:32px; }
.logo h1 { color:#fff; font-size:22px; font-weight:900; letter-spacing:0.15em; text-transform:uppercase; }
.logo p { color:#777; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; margin-top:4px; }
.badge { background:#111; border:1px solid #2E2E2E; color:#AAAAAA; font-size:11px; text-align:center; padding:6px; margin-bottom:24px; }
label { display:block; color:#AAAAAA; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:8px; }
input { display:block; width:100%; background:#111; border:1px solid #2E2E2E; color:#fff; padding:12px 16px; font-size:14px; outline:none; margin-bottom:16px; }
input:focus { border-color:#555; }
button { display:block; width:100%; background:#fff; color:#111; padding:14px; font-size:14px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; border:none; cursor:pointer; }
button:hover { background:#e5e5e5; }
.error { background:#2a1010; border:1px solid #5a1a1a; color:#ff6b6b; padding:12px 16px; font-size:13px; margin-bottom:20px; }
</style>
</head>
<body>
<div class="card">
  <div class="logo">
    <h1>CLICK⚡SEMURS</h1>
    <p>Admin Panel</p>
  </div>
  <div class="badge">Secure Admin Access</div>
  <?php if ($error): ?>
    <div class="error"><?= htmlspecialchars($error) ?></div>
  <?php endif; ?>
  <form method="POST">
    <label>Username</label>
    <input type="text" name="username" autocomplete="username" required placeholder="admin">
    <label>Password</label>
    <input type="password" name="password" autocomplete="current-password" required placeholder="••••••••">
    <button type="submit">Login →</button>
  </form>
</div>
</body>
</html>
