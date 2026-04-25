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
        $db->prepare('DELETE FROM portfolio WHERE id = ?')->execute([$id]);
        $msg = 'Case study deleted.'; $msgType = 'success';
    } elseif (in_array($action, ['create', 'update'])) {
        $client    = trim($_POST['client_name'] ?? '');
        $industry  = trim($_POST['industry'] ?? '');
        $challenge = trim($_POST['challenge'] ?? '');
        $solution  = trim($_POST['solution'] ?? '');
        $result    = trim($_POST['result'] ?? '');
        if ($client) {
            if ($action === 'create') {
                $db->prepare('INSERT INTO portfolio (client_name, industry, challenge, solution, result) VALUES (?, ?, ?, ?, ?)')
                   ->execute([$client, $industry, $challenge, $solution, $result]);
                $msg = 'Case study added!'; $msgType = 'success';
            } else {
                $db->prepare('UPDATE portfolio SET client_name=?, industry=?, challenge=?, solution=?, result=? WHERE id=?')
                   ->execute([$client, $industry, $challenge, $solution, $result, $id]);
                $msg = 'Updated!'; $msgType = 'success';
            }
        } else { $msg = 'Client name is required.'; $msgType = 'error'; }
    }
}

if (isset($_GET['edit'])) {
    $s = $db->prepare('SELECT * FROM portfolio WHERE id = ?');
    $s->execute([(int)$_GET['edit']]);
    $editItem = $s->fetch();
}

$items = $db->query('SELECT * FROM portfolio ORDER BY created_at DESC')->fetchAll();

$pageTitle = 'Portfolio / Case Studies';
$page = 'portfolio';
require_once __DIR__ . '/_layout.php';
?>

<?php if ($msg): ?><div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($msg) ?></div><?php endif; ?>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">
  <div class="card">
    <h2 style="margin-bottom:20px;font-size:16px"><?= $editItem ? 'Edit Case Study' : 'Add Case Study' ?></h2>
    <form method="POST">
      <input type="hidden" name="action" value="<?= $editItem ? 'update' : 'create' ?>">
      <?php if ($editItem): ?><input type="hidden" name="id" value="<?= $editItem['id'] ?>"><?php endif; ?>
      <div class="form-group">
        <label>Client Name *</label>
        <input type="text" name="client_name" value="<?= htmlspecialchars($editItem['client_name'] ?? '') ?>" required>
      </div>
      <div class="form-group">
        <label>Industry</label>
        <select name="industry">
          <?php foreach (['Technology','Fashion','Real Estate','Healthcare','Education','Food & Beverage','Automobile','Finance','E-Commerce','Retail','Manufacturing','Non-Profit','Other'] as $ind): ?>
            <option value="<?= $ind ?>" <?= ($editItem['industry'] ?? '') === $ind ? 'selected' : '' ?>><?= $ind ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div class="form-group">
        <label>Challenge</label>
        <textarea name="challenge" rows="3"><?= htmlspecialchars($editItem['challenge'] ?? '') ?></textarea>
      </div>
      <div class="form-group">
        <label>Solution</label>
        <textarea name="solution" rows="3"><?= htmlspecialchars($editItem['solution'] ?? '') ?></textarea>
      </div>
      <div class="form-group">
        <label>Result</label>
        <textarea name="result" rows="3"><?= htmlspecialchars($editItem['result'] ?? '') ?></textarea>
      </div>
      <button type="submit" class="btn btn-white"><?= $editItem ? 'Update' : 'Add Case Study' ?> →</button>
      <?php if ($editItem): ?><a href="/admin/portfolio.php" class="btn btn-outline" style="margin-left:8px">Cancel</a><?php endif; ?>
    </form>
  </div>

  <div class="card" style="padding:0;overflow:hidden">
    <div style="padding:20px 24px;border-bottom:1px solid #2E2E2E"><h2 style="font-size:16px">All Case Studies (<?= count($items) ?>)</h2></div>
    <table>
      <thead><tr><th>Client</th><th>Industry</th><th>Result</th><th>Actions</th></tr></thead>
      <tbody>
        <?php if (empty($items)): ?>
          <tr><td colspan="4" style="text-align:center;padding:32px;color:#555">No case studies yet.</td></tr>
        <?php else: ?>
          <?php foreach ($items as $p): ?>
            <tr>
              <td style="color:#fff;font-weight:500"><?= htmlspecialchars($p['client_name']) ?></td>
              <td><?= htmlspecialchars($p['industry']) ?></td>
              <td><?= htmlspecialchars(substr($p['result'] ?? '', 0, 60)) ?></td>
              <td style="white-space:nowrap">
                <a href="?edit=<?= $p['id'] ?>" class="btn btn-outline btn-sm" style="margin-right:4px">Edit</a>
                <form method="POST" style="display:inline" onsubmit="return confirm('Delete?')">
                  <input type="hidden" name="action" value="delete">
                  <input type="hidden" name="id" value="<?= $p['id'] ?>">
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
