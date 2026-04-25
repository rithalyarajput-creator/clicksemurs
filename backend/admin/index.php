<?php
require_once __DIR__ . '/auth.php';
requireLogin();

$db = getDB();

$totalLeads = $db->query('SELECT COUNT(*) FROM leads')->fetchColumn();
$unreadLeads = $db->query('SELECT COUNT(*) FROM leads WHERE is_read = 0')->fetchColumn();
$totalBlogs = $db->query('SELECT COUNT(*) FROM blogs')->fetchColumn();
$publishedBlogs = $db->query('SELECT COUNT(*) FROM blogs WHERE is_published = 1')->fetchColumn();
$totalTestimonials = $db->query('SELECT COUNT(*) FROM testimonials')->fetchColumn();
$totalPortfolio = $db->query('SELECT COUNT(*) FROM portfolio')->fetchColumn();

$recentLeads = $db->query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 8')->fetchAll();

$pageTitle = 'Dashboard';
$page = 'dashboard';
require_once __DIR__ . '/_layout.php';
?>

<div class="grid grid-4" style="margin-bottom:32px">
  <div class="stat-card">
    <div class="value"><?= $totalLeads ?></div>
    <div class="label">Total Leads</div>
    <div style="margin-top:8px"><span class="badge badge-red"><?= $unreadLeads ?> unread</span></div>
  </div>
  <div class="stat-card">
    <div class="value"><?= $totalBlogs ?></div>
    <div class="label">Blog Posts</div>
    <div style="margin-top:8px"><span class="badge badge-green"><?= $publishedBlogs ?> published</span></div>
  </div>
  <div class="stat-card">
    <div class="value"><?= $totalTestimonials ?></div>
    <div class="label">Testimonials</div>
  </div>
  <div class="stat-card">
    <div class="value"><?= $totalPortfolio ?></div>
    <div class="label">Case Studies</div>
  </div>
</div>

<div class="card">
  <div class="section-header">
    <h2>Recent Inquiries</h2>
    <a href="/admin/leads.php" class="btn btn-outline btn-sm">View All</a>
  </div>
  <table>
    <thead>
      <tr>
        <th>#</th><th>Name</th><th>Email</th><th>Service</th><th>Date</th><th>Status</th>
      </tr>
    </thead>
    <tbody>
      <?php if (empty($recentLeads)): ?>
        <tr><td colspan="6" style="text-align:center;color:#555;padding:32px">No leads yet.</td></tr>
      <?php else: ?>
        <?php foreach ($recentLeads as $lead): ?>
          <tr>
            <td><?= $lead['id'] ?></td>
            <td style="color:#fff;font-weight:600"><?= htmlspecialchars($lead['name']) ?></td>
            <td><?= htmlspecialchars($lead['email']) ?></td>
            <td><?= htmlspecialchars($lead['service'] ?: '—') ?></td>
            <td><?= date('d M Y', strtotime($lead['created_at'])) ?></td>
            <td>
              <?php if ($lead['is_read']): ?>
                <span class="badge badge-gray">Read</span>
              <?php else: ?>
                <span class="badge badge-red">New</span>
              <?php endif; ?>
            </td>
          </tr>
        <?php endforeach; ?>
      <?php endif; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/_layout_end.php'; ?>
