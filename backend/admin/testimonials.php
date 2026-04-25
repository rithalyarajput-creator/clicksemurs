<?php
require_once __DIR__ . '/auth.php';
requireLogin();
$db = getDB();

$msg = ''; $msgType = '';
$editItem = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $id = (int)($_POST['id'] ?? 0);

    if ($action === 'delete' && $id) {
        $db->prepare('DELETE FROM testimonials WHERE id = ?')->execute([$id]);
        $msg = 'Deleted.'; $msgType = 'success';
    } elseif (in_array($action, ['create', 'update'])) {
        $name    = trim($_POST['client_name'] ?? '');
        $company = trim($_POST['company'] ?? '');
        $review  = trim($_POST['review'] ?? '');
        $rating  = min(5, max(1, (int)($_POST['rating'] ?? 5)));
        if ($name && $review) {
            if ($action === 'create') {
                $db->prepare('INSERT INTO testimonials (client_name, company, review, rating) VALUES (?, ?, ?, ?)')
                   ->execute([$name, $company, $review, $rating]);
                $msg = 'Testimonial added!'; $msgType = 'success';
            } else {
                $db->prepare('UPDATE testimonials SET client_name=?, company=?, review=?, rating=? WHERE id=?')
                   ->execute([$name, $company, $review, $rating, $id]);
                $msg = 'Updated!'; $msgType = 'success';
            }
        } else { $msg = 'Name and review are required.'; $msgType = 'error'; }
    }
}

if (isset($_GET['edit'])) {
    $s = $db->prepare('SELECT * FROM testimonials WHERE id = ?');
    $s->execute([(int)$_GET['edit']]);
    $editItem = $s->fetch();
}

$items = $db->query('SELECT * FROM testimonials ORDER BY created_at DESC')->fetchAll();

$pageTitle = 'Testimonials';
$page = 'testimonials';
require_once __DIR__ . '/_layout.php';
?>

<?php if ($msg): ?><div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($msg) ?></div><?php endif; ?>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">
  <div class="card">
    <h2 style="margin-bottom:20px;font-size:16px"><?= $editItem ? 'Edit Testimonial' : 'Add Testimonial' ?></h2>
    <form method="POST">
      <input type="hidden" name="action" value="<?= $editItem ? 'update' : 'create' ?>">
      <?php if ($editItem): ?><input type="hidden" name="id" value="<?= $editItem['id'] ?>"><?php endif; ?>
      <div class="form-group">
        <label>Client Name *</label>
        <input type="text" name="client_name" value="<?= htmlspecialchars($editItem['client_name'] ?? '') ?>" required>
      </div>
      <div class="form-group">
        <label>Company / Role</label>
        <input type="text" name="company" value="<?= htmlspecialchars($editItem['company'] ?? '') ?>">
      </div>
      <div class="form-group">
        <label>Review *</label>
        <textarea name="review" rows="5" required><?= htmlspecialchars($editItem['review'] ?? '') ?></textarea>
      </div>
      <div class="form-group">
        <label>Rating (1–5)</label>
        <select name="rating">
          <?php for ($i=5;$i>=1;$i--): ?>
            <option value="<?= $i ?>" <?= ($editItem['rating'] ?? 5) == $i ? 'selected' : '' ?>><?= $i ?> Stars</option>
          <?php endfor; ?>
        </select>
      </div>
      <button type="submit" class="btn btn-white"><?= $editItem ? 'Update' : 'Add Testimonial' ?> →</button>
      <?php if ($editItem): ?><a href="/admin/testimonials.php" class="btn btn-outline" style="margin-left:8px">Cancel</a><?php endif; ?>
    </form>
  </div>

  <div class="card" style="padding:0;overflow:hidden">
    <div style="padding:20px 24px;border-bottom:1px solid #2E2E2E"><h2 style="font-size:16px">All Testimonials (<?= count($items) ?>)</h2></div>
    <table>
      <thead><tr><th>Client</th><th>Company</th><th>Rating</th><th>Actions</th></tr></thead>
      <tbody>
        <?php if (empty($items)): ?>
          <tr><td colspan="4" style="text-align:center;padding:32px;color:#555">No testimonials yet.</td></tr>
        <?php else: ?>
          <?php foreach ($items as $t): ?>
            <tr>
              <td style="color:#fff;font-weight:500"><?= htmlspecialchars($t['client_name']) ?></td>
              <td><?= htmlspecialchars($t['company']) ?></td>
              <td><?= str_repeat('★', $t['rating']) ?></td>
              <td style="white-space:nowrap">
                <a href="?edit=<?= $t['id'] ?>" class="btn btn-outline btn-sm" style="margin-right:4px">Edit</a>
                <form method="POST" style="display:inline" onsubmit="return confirm('Delete?')">
                  <input type="hidden" name="action" value="delete">
                  <input type="hidden" name="id" value="<?= $t['id'] ?>">
                  <button type="submit" class="btn btn-danger btn-sm">Del</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<?php require_once __DIR__ . '/_layout_end.php'; ?>
