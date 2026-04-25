<?php
require_once __DIR__ . '/auth.php';
requireLogin();
$db = getDB();

// Handle actions
$msg = '';
$msgType = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $id = (int)($_POST['id'] ?? 0);
    if ($action === 'delete' && $id) {
        $db->prepare('DELETE FROM leads WHERE id = ?')->execute([$id]);
        $msg = 'Lead deleted.'; $msgType = 'success';
    } elseif ($action === 'mark_read' && $id) {
        $db->prepare('UPDATE leads SET is_read = 1 WHERE id = ?')->execute([$id]);
        $msg = 'Marked as read.'; $msgType = 'success';
    } elseif ($action === 'export') {
        $stmt = $db->query('SELECT * FROM leads ORDER BY created_at DESC');
        $rows = $stmt->fetchAll();
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="leads_' . date('Ymd') . '.csv"');
        $out = fopen('php://output', 'w');
        fputcsv($out, ['ID','Name','Email','Phone','Service','Message','Read','Date']);
        foreach ($rows as $r) {
            fputcsv($out, [$r['id'],$r['name'],$r['email'],$r['phone'],$r['service'],$r['message'],$r['is_read'],$r['created_at']]);
        }
        fclose($out);
        exit;
    }
}

$leads = $db->query('SELECT * FROM leads ORDER BY created_at DESC')->fetchAll();

$pageTitle = 'Leads / Inquiries';
$page = 'leads';
require_once __DIR__ . '/_layout.php';
?>

<?php if ($msg): ?>
  <div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($msg) ?></div>
<?php endif; ?>

<div class="section-header">
  <h2>All Inquiries (<?= count($leads) ?>)</h2>
  <form method="POST" style="display:inline">
    <input type="hidden" name="action" value="export">
    <button type="submit" class="btn btn-outline btn-sm">Export CSV</button>
  </form>
</div>

<div class="card" style="padding:0;overflow:hidden">
  <table>
    <thead>
      <tr>
        <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Message</th><th>Date</th><th>Status</th><th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <?php if (empty($leads)): ?>
        <tr><td colspan="9" style="text-align:center;padding:48px;color:#555">No inquiries yet.</td></tr>
      <?php else: ?>
        <?php foreach ($leads as $lead): ?>
          <tr>
            <td><?= $lead['id'] ?></td>
            <td style="color:#fff;font-weight:600;white-space:nowrap"><?= htmlspecialchars($lead['name']) ?></td>
            <td><a href="mailto:<?= htmlspecialchars($lead['email']) ?>" style="color:#AAAAAA;hover:color:#fff"><?= htmlspecialchars($lead['email']) ?></a></td>
            <td><?= htmlspecialchars($lead['phone'] ?: '—') ?></td>
            <td><?= htmlspecialchars($lead['service'] ?: '—') ?></td>
            <td style="max-width:200px"><?= htmlspecialchars(substr($lead['message'], 0, 80)) ?><?= strlen($lead['message']) > 80 ? '…' : '' ?></td>
            <td style="white-space:nowrap"><?= date('d M Y', strtotime($lead['created_at'])) ?></td>
            <td>
              <?php if ($lead['is_read']): ?>
                <span class="badge badge-gray">Read</span>
              <?php else: ?>
                <span class="badge badge-red">New</span>
              <?php endif; ?>
            </td>
            <td style="white-space:nowrap">
              <?php if (!$lead['is_read']): ?>
                <form method="POST" style="display:inline">
                  <input type="hidden" name="action" value="mark_read">
                  <input type="hidden" name="id" value="<?= $lead['id'] ?>">
                  <button type="submit" class="btn btn-outline btn-sm" style="margin-right:4px">Mark Read</button>
                </form>
              <?php endif; ?>
              <form method="POST" style="display:inline" onsubmit="return confirm('Delete this lead?')">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="id" value="<?= $lead['id'] ?>">
                <button type="submit" class="btn btn-danger btn-sm">Delete</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
      <?php endif; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/_layout_end.php'; ?>
