import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const CATEGORIES = ['SEO', 'Paid Ads', 'Social Media', 'Website', 'Email Marketing', 'Influencer Marketing', 'Strategy', 'Analytics']

const blank = { title: '', slug: '', category: 'SEO', thumbnail: '', content: '', is_published: false }

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
    setBlogs(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3000) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.slug) return flash('Title and slug are required.', 'error')
    if (editId) {
      const { error } = await supabase.from('blogs').update({ ...form }).eq('id', editId)
      if (error) return flash(error.message, 'error')
      flash('Blog post updated!')
    } else {
      const { error } = await supabase.from('blogs').insert([form])
      if (error) return flash('Slug already exists or error: ' + error.message, 'error')
      flash('Blog post created!')
    }
    setForm(blank); setEditId(null); load()
  }

  const startEdit = (b) => { setForm({ title: b.title, slug: b.slug, category: b.category, thumbnail: b.thumbnail || '', content: b.content || '', is_published: b.is_published }); setEditId(b.id) }
  const cancelEdit = () => { setForm(blank); setEditId(null) }

  const togglePublish = async (b) => {
    await supabase.from('blogs').update({ is_published: !b.is_published }).eq('id', b.id)
    load()
  }

  const deleteBlog = async (id) => {
    if (!confirm('Delete this post?')) return
    await supabase.from('blogs').delete().eq('id', id)
    flash('Deleted.'); load()
  }

  const inp = { display: 'block', width: '100%', background: '#111', border: '1px solid #2E2E2E', color: '#fff', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box', marginBottom: 14 }
  const lbl = { display: 'block', color: '#aaa', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }
  const th = { color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #2E2E2E' }
  const td = { color: '#aaa', padding: '12px 14px', fontSize: 13, borderBottom: '1px solid #1a1a1a' }

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Blog Manager</h1>
      {msg && <div style={{ background: msgType === 'error' ? '#2a1010' : '#0a1a0a', border: `1px solid ${msgType === 'error' ? '#5a1a1a' : '#166534'}`, color: msgType === 'error' ? '#ff6b6b' : '#4ade80', padding: '10px 16px', marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        {/* Form */}
        <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: 24 }}>
          <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>{editId ? 'Edit Post' : 'Add New Post'}</h2>
          <form onSubmit={handleSubmit}>
            <label style={lbl}>Title *</label>
            <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Blog post title" />
            <label style={lbl}>Slug * (URL-friendly)</label>
            <input style={inp} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} required placeholder="blog-post-title" />
            <label style={lbl}>Category</label>
            <select style={{ ...inp }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <label style={lbl}>Thumbnail URL</label>
            <input style={inp} value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))} placeholder="https://..." />
            <label style={lbl}>Content</label>
            <textarea style={{ ...inp, height: 180, resize: 'vertical' }} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 16 }}>
              <input type="checkbox" checked={form.is_published} onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))} />
              <span style={{ color: '#aaa', fontSize: 13 }}>Published</span>
            </label>
            <button type="submit" style={{ background: '#fff', color: '#111', padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, marginRight: 8 }}>{editId ? 'Update Post' : 'Create Post'} →</button>
            {editId && <button type="button" onClick={cancelEdit} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '10px 20px', cursor: 'pointer', fontSize: 13 }}>Cancel</button>}
          </form>
        </div>

        {/* List */}
        <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #2E2E2E' }}>
            <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>All Posts ({blogs.length})</h2>
          </div>
          {loading ? <div style={{ color: '#777', padding: 24 }}>Loading...</div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['Title', 'Category', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr><td colSpan={4} style={{ ...td, textAlign: 'center', padding: 32 }}>No posts yet.</td></tr>
                ) : blogs.map(b => (
                  <tr key={b.id}>
                    <td style={{ ...td, color: '#fff', fontWeight: 500 }}>{b.title}</td>
                    <td style={td}>{b.category}</td>
                    <td style={td}>
                      <span style={{ background: b.is_published ? '#0a1a0a' : '#1a1a1a', color: b.is_published ? '#4ade80' : '#555', fontSize: 11, padding: '2px 8px', border: `1px solid ${b.is_published ? '#166534' : '#2E2E2E'}` }}>
                        {b.is_published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ ...td, whiteSpace: 'nowrap' }}>
                      <button onClick={() => startEdit(b)} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '4px 10px', cursor: 'pointer', fontSize: 11, marginRight: 4 }}>Edit</button>
                      <button onClick={() => togglePublish(b)} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '4px 10px', cursor: 'pointer', fontSize: 11, marginRight: 4 }}>{b.is_published ? 'Unpublish' : 'Publish'}</button>
                      <button onClick={() => deleteBlog(b.id)} style={{ background: '#2a1010', border: '1px solid #5a1a1a', color: '#ff6b6b', padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
