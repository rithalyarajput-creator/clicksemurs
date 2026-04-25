<?php
/* Include this at the top of every admin page:
   require_once __DIR__ . '/auth.php';
   requireLogin();
   $page = 'dashboard'; // set the active page key
   require_once __DIR__ . '/_layout.php';
*/

$nav = [
    'dashboard'    => ['label' => 'Dashboard',    'icon' => '◉', 'href' => '/admin/index.php'],
    'leads'        => ['label' => 'Leads',         'icon' => '✉', 'href' => '/admin/leads.php'],
    'blogs'        => ['label' => 'Blog Posts',    'icon' => '✍', 'href' => '/admin/blogs.php'],
    'testimonials' => ['label' => 'Testimonials',  'icon' => '★', 'href' => '/admin/testimonials.php'],
    'portfolio'    => ['label' => 'Portfolio',     'icon' => '◈', 'href' => '/admin/portfolio.php'],
    'settings'     => ['label' => 'Settings',      'icon' => '⚙', 'href' => '/admin/settings.php'],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($pageTitle ?? 'Admin') ?> — Clicksemurs Admin</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0A0A0A;color:#fff;font-family:'Inter',system-ui,sans-serif;display:flex;min-height:100vh}
a{text-decoration:none;color:inherit}
/* Sidebar */
.sidebar{width:240px;background:#111;border-right:1px solid #2E2E2E;display:flex;flex-direction:column;flex-shrink:0;position:fixed;top:0;left:0;bottom:0;overflow-y:auto}
.sidebar-logo{padding:24px 20px;border-bottom:1px solid #2E2E2E}
.sidebar-logo h2{font-size:16px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase}
.sidebar-logo span{font-size:10px;color:#777;letter-spacing:0.3em;text-transform:uppercase;display:block;margin-top:4px}
.nav-item{display:flex;align-items:center;gap:10px;padding:12px 20px;font-size:13px;font-weight:500;color:#777;transition:all .15s}
.nav-item:hover,.nav-item.active{color:#fff;background:#1E1E1E;border-left:2px solid #fff}
.nav-item .icon{width:20px;text-align:center;font-size:14px}
.sidebar-footer{padding:20px;border-top:1px solid #2E2E2E;margin-top:auto}
.sidebar-footer a{font-size:12px;color:#777;hover:color:#fff}
/* Main */
.main{margin-left:240px;flex:1;display:flex;flex-direction:column;min-height:100vh}
.topbar{background:#111;border-bottom:1px solid #2E2E2E;padding:0 32px;height:56px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10}
.topbar h1{font-size:16px;font-weight:700}
.topbar-user{font-size:13px;color:#777}
.content{padding:32px;flex:1}
/* Components */
.card{background:#1E1E1E;border:1px solid #2E2E2E;padding:24px}
.stat-card{background:#1E1E1E;border:1px solid #2E2E2E;padding:24px;text-align:center}
.stat-card .value{font-size:36px;font-weight:900;color:#fff}
.stat-card .label{font-size:12px;color:#777;text-transform:uppercase;letter-spacing:0.15em;margin-top:4px}
.grid{display:grid;gap:16px}
.grid-4{grid-template-columns:repeat(4,1fr)}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-2{grid-template-columns:repeat(2,1fr)}
@media(max-width:1100px){.grid-4{grid-template-columns:repeat(2,1fr)}}
/* Table */
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#111;padding:10px 14px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#777;border-bottom:1px solid #2E2E2E}
td{padding:12px 14px;border-bottom:1px solid #1E1E1E;color:#AAAAAA;vertical-align:top}
tr:hover td{background:#151515}
/* Badges */
.badge{display:inline-block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;padding:3px 8px}
.badge-green{background:#0d2e1a;color:#4ade80;border:1px solid #166534}
.badge-red{background:#2a1010;color:#f87171;border:1px solid #7f1d1d}
.badge-gray{background:#1E1E1E;color:#777;border:1px solid #2E2E2E}
/* Forms */
.form-group{margin-bottom:20px}
.form-group label{display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:#AAAAAA;margin-bottom:8px}
.form-group input,.form-group textarea,.form-group select{width:100%;background:#111;border:1px solid #2E2E2E;color:#fff;padding:10px 14px;font-size:13px;outline:none;font-family:inherit}
.form-group input:focus,.form-group textarea:focus,.form-group select:focus{border-color:#555}
.form-group textarea{resize:vertical;min-height:120px}
.form-group select option{background:#111}
/* Buttons */
.btn{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;border:none;transition:all .15s}
.btn-white{background:#fff;color:#111}
.btn-white:hover{background:#e5e5e5}
.btn-outline{background:transparent;color:#fff;border:1px solid #2E2E2E}
.btn-outline:hover{border-color:#fff}
.btn-danger{background:#7f1d1d;color:#fca5a5}
.btn-danger:hover{background:#991b1b}
.btn-sm{padding:6px 14px;font-size:11px}
/* Alert */
.alert{padding:12px 16px;font-size:13px;margin-bottom:20px}
.alert-success{background:#0d2e1a;border:1px solid #166534;color:#4ade80}
.alert-error{background:#2a1010;border:1px solid #7f1d1d;color:#f87171}
/* Section heading */
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
.section-header h2{font-size:18px;font-weight:900}
</style>
</head>
<body>

<aside class="sidebar">
  <div class="sidebar-logo">
    <h2>CLICK⚡SEMURS</h2>
    <span>Admin Panel</span>
  </div>
  <nav>
    <?php foreach ($nav as $key => $item): ?>
      <a href="<?= $item['href'] ?>" class="nav-item <?= ($page ?? '') === $key ? 'active' : '' ?>">
        <span class="icon"><?= $item['icon'] ?></span>
        <?= $item['label'] ?>
      </a>
    <?php endforeach; ?>
  </nav>
  <div class="sidebar-footer">
    <a href="/admin/logout.php">Logout →</a>
  </div>
</aside>

<div class="main">
  <div class="topbar">
    <h1><?= htmlspecialchars($pageTitle ?? 'Dashboard') ?></h1>
    <span class="topbar-user">👤 <?= htmlspecialchars($_SESSION['admin_username'] ?? 'Admin') ?></span>
  </div>
  <div class="content">
