<?php
require_once __DIR__ . '/auth.php';
requireLogin();
$db = getDB();

$msg = ''; $msgType = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fields = ['phone', 'email', 'address', 'whatsapp', 'facebook', 'instagram', 'linkedin', 'youtube', 'twitter'];
    foreach ($fields as $field) {
        $value = trim($_POST[$field] ?? '');
        $stmt = $db->prepare('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?');
        $stmt->execute([$field, $value, $value]);
    }
    $msg = 'Settings saved!'; $msgType = 'success';
}

$stmt = $db->query('SELECT setting_key, setting_value FROM settings');
$settings = [];
foreach ($stmt->fetchAll() as $r) {
    $settings[$r['setting_key']] = $r['setting_value'];
}

$pageTitle = 'Settings';
$page = 'settings';
require_once __DIR__ . '/_layout.php';
?>

<?php if ($msg): ?><div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($msg) ?></div><?php endif; ?>

<form method="POST">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
    <div class="card">
      <h2 style="margin-bottom:20px;font-size:16px">Contact Information</h2>
      <div class="form-group">
        <label>Phone Number</label>
        <input type="text" name="phone" value="<?= htmlspecialchars($settings['phone'] ?? '') ?>" placeholder="+91 XXXXX XXXXX">
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" name="email" value="<?= htmlspecialchars($settings['email'] ?? '') ?>" placeholder="hello@clicksemurs.com">
      </div>
      <div class="form-group">
        <label>Office Address</label>
        <textarea name="address" rows="3"><?= htmlspecialchars($settings['address'] ?? '') ?></textarea>
      </div>
      <div class="form-group">
        <label>WhatsApp Number (with country code)</label>
        <input type="text" name="whatsapp" value="<?= htmlspecialchars($settings['whatsapp'] ?? '') ?>" placeholder="91XXXXXXXXXX">
      </div>
    </div>
    <div class="card">
      <h2 style="margin-bottom:20px;font-size:16px">Social Media Links</h2>
      <?php foreach ([
        'facebook'  => 'Facebook URL',
        'instagram' => 'Instagram URL',
        'linkedin'  => 'LinkedIn URL',
        'youtube'   => 'YouTube URL',
        'twitter'   => 'Twitter/X URL',
      ] as $key => $label): ?>
        <div class="form-group">
          <label><?= $label ?></label>
          <input type="text" name="<?= $key ?>" value="<?= htmlspecialchars($settings[$key] ?? '') ?>" placeholder="https://...">
        </div>
      <?php endforeach; ?>
    </div>
  </div>
  <div style="margin-top:20px">
    <button type="submit" class="btn btn-white">Save Settings →</button>
  </div>
</form>

<?php require_once __DIR__ . '/_layout_end.php'; ?>
