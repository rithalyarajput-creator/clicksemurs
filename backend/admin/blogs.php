<?php
require_once __DIR__ . '/auth.php';
requireLogin();
$db = getDB();

$msg = ''; $msgType = '';
$editBlog = null;

// Handle POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $id = (int)($_POST['id'] ?? 0);

    if ($action === 'delete' && $id) {
        $db->prepare('DELETE FROM blogs WHERE id = ?')->execute([$id]);
        $msg = 'Blog post deleted.'; $msgType = 'success';
    } elseif ($action === 'toggle_publish' && $id) {
        $db->prepare('UPDATE blogs SET is_published = 1 - is_published WHERE id = ?')->execute([$id]);
        $msg = 'Status updated.'; $msgType = 'success';
    } elseif (in_array($action, ['create', 'update'])) {
        $title     = trim($_POST['title'] ?? '');
        $slug      = trim($_POST['slug'] ?? '');
        $category  = trim($_POST['category'] ?? '');
        $thumbnail = trim($_POST['thumbnail'] ?? '');
        $content   = trim($_POST['content'] ?? '');
        $published = isset($_POST['is_published']) ? 1 : 0;

        if ($title && $slug) {
            if ($action === 'create') {
                try {
                    $db->prepare('INSERT INTO blogs (title, slug, category, thumbnail, content, is_published) VALUES (?, ?, ?, ?, ?, ?)')
                       ->execute([$title, $slug, $category, $thumbnail, $content, $published]);
                    $msg = 'Blog post created!'; $msgType = 'success';
                } catch (PDOException $e) {
                    $msg = 'Slug already exists.'; $msgType = 'error';
                }
            } else {
                $db->prepare('UPDATE blogs SET title=?, slug=?, category=?, thumbnail=?, content=?, is_published=? WHERE id=?')
                   ->execute([$title, $slug, $category, $thumbnail, $content, $published, $id]);
                $msg = 'Blog post updated!'; $msgType = 'success';
            }
        } else {
            $msg = 'Title and slug are required.'; $msgType = 'error';
        }
    }
}

// Load for edit
if (isset($_GET['edit'])) {
    $editBlog = $db->prepare('SELECT * FROM blogs WHERE id = ?');
    $editBlog->execute([(int)$_GET['edit']]);
    $editBlog = $editBlog->fetch();
}

$blogs = $db->query('SELECT * FROM blogs ORDER BY created_at DESC')->fetchAll();

$pageTitle = 'Blog Manager';
$page = 'blogs';
require_once __DIR__ . '/_layout.php';
?>

<?php if ($msg): ?>
  <div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($msg) ?></div>
<?php endif; ?>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">

  <!-- Form -->
  <div class="card">
    <h2 style="margin-bottom:20px;font-size:16px"><?= $editBlog ? 'Edit Post' : 'Add New Post' ?></h2>
    <form method="POST">
      <input type="hidden" name="action" value="<?= $editBlog ? 'update' : 'create' ?>">
      <?php if ($editBlog): ?><input type="hidden" name="id" value="<?= $editBlog['id'] ?>"><?php endif; ?>
      <div class="form-group">
        <label>Title *</label>
        <input type="text" name="title" value="<?= htmlspecialchars($editBlog['title'] ?? '') ?>" required>
      </div>
      <div class="form-group">
        <label>Slug * (URL-friendly)</label>
        <input type="text" name="slug" value="<?= htmlspecialchars($editBlog['slug'] ?? '') ?>" required placeholder="my-blog-post-title">
      </div>
      <div class="form-group">
        <label>Category</label>
        <select name="category">
          <?php foreach (['SEO','Paid Ads','Social Media','Website','Email Marketing','Influencer Marketing','Strategy','Analytics'] as $cat): ?>
            <option value="<?= $cat ?>" <?= ($editBlog['category'] ?? '') === $cat ? 'selected' : '' ?>><?= $cat ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div class="form-group">
        <label>Thumbnail URL</label>
        <input type="text" name="thumbnail" value="<?= htmlspecialchars($editBlog['thumbnail'] ?? '') ?>" placeholder="https://...">
      </div>
      <div class="form-group">
        <label>Content</label>
        <textarea name="content" rows="10"><?= htmlspecialchars($editBlog['content'] ?? '') ?></textarea>
      </div>
      <div class="form-group" style="display:flex;align-items:center;gap:10px">
        <input type="checkbox" name="is_published" id="pub" <?= ($editBlog['is_published'] ?? 0) ? 'checked' : '' ?> style="width:auto">
        <label for="pub" style="margin:0;text-transform:none;font-size:13px">Published</label>
      </div>
      <button type="submit" class="btn btn-white"><?= $editBlog ? 'Update Post' : 'Create Post' ?> →</button>
      <?php if ($editBlog): ?>
        <a href="/admin/blogs.php" class="btn btn-outline" style="margin-left:8px">Cancel</a>
      <?php endif; ?>
    </form>
  </div>

  <!-- List -->
  <div class="card" style="padding:0;overflow:hidden">
    <div style="padding:20px 24px;border-bottom:1px solid #2E2E2E">
      <h2 style="font-size:16px">All Posts (<?= count($blogs) ?>)</h2>
    </div>
    <table>
      <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        <?php if (empty($blogs)): ?>
          <tr><td colspan="4" style="text-align:center;padding:32px;color:#555">No posts yet.</td></tr>
        <?php else: ?>
          <?php foreach ($blogs as $b): ?>
            <tr>
              <td style="color:#fff;font-weight:500"><?= htmlspecialchars($b['title']) ?></td>
              <td><?= htmlspecialchars($b['category']) ?></td>
              <td><?= $b['is_published'] ? '<span class="badge badge-green">Live</span>' : '<span class="badge badge-gray">Draft</span>' ?></td>
              <td style="white-space:nowrap">
                <a href="/admin/blogs.php?edit=<?= $b['id'] ?>" class="btn btn-outline btn-sm" style="margin-right:4px">Edit</a>
                <form method="POST" style="display:inline">
                  <input type="hidden" name="action" value="toggle_publish">
                  <input type="hidden" name="id" value="<?= $b['id'] ?>">
                  <button type="submit" class="btn btn-outline btn-sm" style="margin-right:4px"><?= $b['is_published'] ? 'Unpublish' : 'Publish' ?></button>
                </form>
                <form method="POST" style="display:inline" onsubmit="return confirm('Delete?')">
                  <input type="hidden" name="action" value="delete">
                  <input type="hidden" name="id" value="<?= $b['id'] ?>">
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
