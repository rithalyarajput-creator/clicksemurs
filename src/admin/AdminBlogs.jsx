import { useEffect, useState, useRef } from 'react'
import { supabase } from './supabase'

const CATEGORIES = ['SEO', 'Paid Ads', 'Social Media', 'Website', 'Email Marketing', 'Influencer Marketing', 'Strategy', 'Analytics', 'Finance']

const blank = {
  title: '', slug: '', category: 'SEO', thumbnail: '',
  content: '', meta_title: '', meta_description: '', focus_keyword: '',
  tags: '', faqs: [], is_published: false
}

// Simple rich text toolbar
function RichEditor({ value, onChange }) {
  const ref = useRef(null)

  const exec = (cmd, val = null) => {
    ref.current.focus()
    document.execCommand(cmd, false, val)
    onChange(ref.current.innerHTML)
  }

  const insertHTML = (html) => {
    ref.current.focus()
    document.execCommand('insertHTML', false, html)
    onChange(ref.current.innerHTML)
  }

  const pasteHTML = () => {
    const html = prompt('Paste HTML content:')
    if (html) { ref.current.innerHTML = html; onChange(html) }
  }

  const btn = (label, action, title) => (
    <button type="button" title={title || label} onClick={action}
      style={{ padding: '4px 8px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, cursor: 'pointer', fontWeight: 600, color: '#333' }}>
      {label}
    </button>
  )

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 12px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        {btn('H1', () => exec('formatBlock', 'h1'))}
        {btn('H2', () => exec('formatBlock', 'h2'))}
        {btn('H3', () => exec('formatBlock', 'h3'))}
        {btn('H4', () => exec('formatBlock', 'h4'))}
        {btn('B', () => exec('bold'), 'Bold')}
        {btn('I', () => exec('italic'), 'Italic')}
        {btn('U', () => exec('underline'), 'Underline')}
        {btn('S', () => exec('strikeThrough'), 'Strikethrough')}
        {btn('• List', () => exec('insertUnorderedList'))}
        {btn('1. List', () => exec('insertOrderedList'))}
        {btn('Link', () => { const u = prompt('URL:'); if (u) exec('createLink', u) })}
        {btn('Image', () => { const u = prompt('Image URL:'); if (u) insertHTML(`<img src="${u}" style="max-width:100%" />`) })}
        {btn('Quote', () => exec('formatBlock', 'blockquote'))}
        {btn('Code', () => insertHTML('<pre><code>code here</code></pre>'))}
        {btn('Clear', () => { ref.current.innerHTML = ''; onChange('') })}
        <button type="button" onClick={pasteHTML}
          style={{ padding: '4px 10px', background: '#1e293b', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer', fontWeight: 600, color: '#fff', marginLeft: 4 }}>
          &lt;/&gt; Paste HTML
        </button>
      </div>
      {/* Editable area */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={e => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        style={{
          minHeight: 220, padding: '16px', outline: 'none', fontSize: 14,
          lineHeight: 1.7, color: '#1e293b', background: '#fff',
          fontFamily: 'inherit'
        }}
      />
      <div style={{ padding: '6px 12px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: 11, color: '#94a3b8' }}>
        {value.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length} words &nbsp;·&nbsp; ~{Math.max(1, Math.ceil(value.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200))} min read
      </div>
    </div>
  )
}

export default function AdminBlogs({ startNew = false }) {
  const [blogs, setBlogs] = useState([])
  const [view, setView] = useState(startNew ? 'new' : 'list') // 'list' | 'new' | 'edit'
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const load = async () => {
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
    setBlogs(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3500) }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  const autoMetaTitle = () => f('meta_title', form.title)

  const handleSubmit = async (publish) => {
    if (!form.title || !form.slug) return flash('Title and slug are required.', 'error')
    const payload = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      thumbnail: form.thumbnail,
      content: form.content,
      meta_title: form.meta_title,
      meta_description: form.meta_description,
      focus_keyword: form.focus_keyword,
      tags: form.tags,
      is_published: publish,
    }
    if (editId) {
      const { error } = await supabase.from('blogs').update(payload).eq('id', editId)
      if (error) return flash('Save failed: ' + error.message, 'error')
      flash(publish ? 'Blog published!' : 'Saved as draft!')
    } else {
      const { error } = await supabase.from('blogs').insert([payload])
      if (error) return flash('Create failed: ' + error.message, 'error')
      flash(publish ? 'Blog published!' : 'Saved as draft!')
    }
    setForm(blank); setEditId(null); setView('list'); load()
  }

  const startEdit = (b) => {
    setForm({
      title: b.title || '', slug: b.slug || '', category: b.category || 'SEO',
      thumbnail: b.thumbnail || '',
      content: b.content || '', meta_title: b.meta_title || '',
      meta_description: b.meta_description || '', focus_keyword: b.focus_keyword || '',
      tags: b.tags || '', faqs: b.faqs || [], is_published: b.is_published
    })
    setEditId(b.id)
    setView('edit')
  }

  const deleteBlog = async (id) => {
    if (!confirm('Delete this post?')) return
    await supabase.from('blogs').delete().eq('id', id)
    flash('Deleted.'); load()
  }

  const togglePublish = async (b) => {
    await supabase.from('blogs').update({ is_published: !b.is_published }).eq('id', b.id)
    load()
  }

  const addFaq = () => f('faqs', [...form.faqs, { q: '', a: '' }])
  const updateFaq = (i, k, v) => {
    const arr = [...form.faqs]; arr[i][k] = v; f('faqs', arr)
  }
  const removeFaq = (i) => f('faqs', form.faqs.filter((_, idx) => idx !== i))

  const filtered = blogs.filter(b => {
    const matchSearch = b.title?.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'All' || b.category === filterCat
    const matchStatus = filterStatus === 'All' || (filterStatus === 'Published' ? b.is_published : !b.is_published)
    return matchSearch && matchCat && matchStatus
  })

  const published = blogs.filter(b => b.is_published).length
  const drafts = blogs.filter(b => !b.is_published).length
  const pages = Math.ceil(filtered.length / 10)

  const inp = {
    width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px',
    fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b',
    background: '#fff', fontFamily: 'inherit'
  }
  const lbl = { display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }

  // ── FORM VIEW ──────────────────────────────────────────────
  if (view === 'new' || view === 'edit') {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 60px' }}>
        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#0f172a' }}>{view === 'edit' ? 'Edit Blog' : 'New Blog'}</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>{view === 'edit' ? 'Update and republish your blog post' : 'Create a new blog post'}</div>
          </div>
          <button onClick={() => { setView('list'); setForm(blank); setEditId(null) }}
            style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Back
          </button>
        </div>

        {msg && (
          <div style={{ margin: '16px 32px 0', background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, fontSize: 13 }}>{msg}</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, padding: '24px 32px', alignItems: 'start' }}>
          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Basic Info */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 11, color: '#64748b' }}>BASIC INFORMATION</div>
              <label style={lbl}>Title *</label>
              <input style={{ ...inp, marginBottom: 14, fontSize: 16, fontWeight: 600 }} value={form.title}
                onChange={e => { f('title', e.target.value); if (!editId) f('slug', autoSlug(e.target.value)) }}
                placeholder="Enter blog title..." />
              <label style={lbl}>URL Slug</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', marginBottom: 0 }}>
                <span style={{ background: '#f1f5f9', padding: '10px 12px', fontSize: 13, color: '#64748b', borderRight: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>/blog/</span>
                <input style={{ flex: 1, border: 'none', padding: '10px 14px', fontSize: 14, outline: 'none', color: '#1e293b' }}
                  value={form.slug} onChange={e => f('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                  placeholder="url-slug-here" />
              </div>
            </div>

            {/* Content */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <label style={{ ...lbl, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CONTENT *</label>
              <RichEditor value={form.content} onChange={v => f('content', v)} />
            </div>

            {/* SEO */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SEO SETTINGS</div>
                <button type="button" onClick={autoMetaTitle}
                  style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>
                  Auto Generate SEO
                </button>
              </div>
              <label style={lbl}>Meta Title <span style={{ color: '#94a3b8', fontWeight: 400 }}>{form.meta_title.length}/60</span></label>
              <input style={{ ...inp, marginBottom: 14 }} value={form.meta_title} onChange={e => f('meta_title', e.target.value)} maxLength={60}
                placeholder="Best Salary Loans in India 2026 | Salary Topup" />
              <label style={lbl}>Meta Description <span style={{ color: '#94a3b8', fontWeight: 400 }}>{form.meta_description.length}/160</span></label>
              <textarea style={{ ...inp, height: 80, resize: 'vertical', marginBottom: 14 }} value={form.meta_description}
                onChange={e => f('meta_description', e.target.value)} maxLength={160}
                placeholder="Click-worthy description that shows in Google search results..." />
              <label style={lbl}>Focus Keyword <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: 11 }}>(main keyword to rank for)</span></label>
              <input style={{ ...inp, marginBottom: 14 }} value={form.focus_keyword} onChange={e => f('focus_keyword', e.target.value)}
                placeholder="e.g. salary advance loan" />
              <label style={lbl}>Tags <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: 11 }}>(comma separated, 3–8 tags)</span></label>
              <input style={{ ...inp }} value={form.tags} onChange={e => f('tags', e.target.value)}
                placeholder="salary loan, instant loan, emergency fund, finance tips" />
            </div>

            {/* FAQs */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FAQs <span style={{ color: '#cbd5e1', fontWeight: 400 }}>— shown on blog page</span></div>
                <button type="button" onClick={addFaq}
                  style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                  + Add FAQ
                </button>
              </div>
              {form.faqs.length === 0 && <div style={{ color: '#cbd5e1', fontSize: 13, textAlign: 'center', padding: '16px 0' }}>No FAQs yet. Click "+ Add FAQ" to add one.</div>}
              {form.faqs.map((faq, i) => (
                <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 12, background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>FAQ #{i + 1}</span>
                    <button type="button" onClick={() => removeFaq(i)} style={{ background: '#fee2e2', border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 11, cursor: 'pointer', color: '#dc2626' }}>Remove</button>
                  </div>
                  <input style={{ ...inp, marginBottom: 8, fontSize: 13 }} value={faq.q} onChange={e => updateFaq(i, 'q', e.target.value)} placeholder="Question..." />
                  <textarea style={{ ...inp, height: 60, resize: 'vertical', fontSize: 13 }} value={faq.a} onChange={e => updateFaq(i, 'a', e.target.value)} placeholder="Answer..." />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>

            {/* Publish */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>PUBLISH</div>
              <label style={{ ...lbl, fontSize: 12 }}>Status</label>
              <select style={{ ...inp, marginBottom: 14 }} value={form.is_published ? 'Published' : 'Draft'} onChange={e => f('is_published', e.target.value === 'Published')}>
                <option>Draft</option>
                <option>Published</option>
              </select>
              <label style={{ ...lbl, fontSize: 12 }}>Category</label>
              <select style={{ ...inp, marginBottom: 16 }} value={form.category} onChange={e => f('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <button type="button" onClick={() => handleSubmit(true)}
                style={{ display: 'block', width: '100%', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontWeight: 700, fontSize: 13, cursor: 'pointer', marginBottom: 8 }}>
                Publish Blog
              </button>
              <button type="button" onClick={() => handleSubmit(false)}
                style={{ display: 'block', width: '100%', background: '#f1f5f9', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                Save as Draft
              </button>
            </div>

            {/* Featured Image */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>FEATURED IMAGE</div>
              <label style={{ ...lbl, fontSize: 12 }}>Choose Image</label>
              <select style={{ ...inp, marginBottom: 12 }} value={form.thumbnail} onChange={e => f('thumbnail', e.target.value)}>
                <option value="">— Select Image —</option>
                <option value="/blog1.png">Blog Image 1</option>
                <option value="/blog2.png">Blog Image 2</option>
                <option value="/blog3.png">Blog Image 3</option>
              </select>
              {form.thumbnail ? (
                <img src={form.thumbnail} alt="preview" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }} />
              ) : (
                <div style={{ width: '100%', height: 120, background: '#f1f5f9', borderRadius: 8, border: '2px dashed #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 12 }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>🖼️</div>
                  <div>Set Featured Image</div>
                  <div style={{ fontSize: 10 }}>1200 × 630px recommended</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── LIST VIEW ──────────────────────────────────────────────
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 60px' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#0f172a' }}>Blogs</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Manage all your blog posts</div>
        </div>
        <button onClick={() => { setForm(blank); setEditId(null); setView('new') }}
          style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          + New Blog
        </button>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {msg && <div style={{ background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{msg}</div>}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Total Posts', value: blogs.length, icon: '📄', color: '#e0e7ff', iconColor: '#6366f1' },
            { label: 'Published', value: published, icon: '👁', color: '#dcfce7', iconColor: '#16a34a' },
            { label: 'Draft', value: drafts, icon: '✏️', color: '#fef9c3', iconColor: '#ca8a04' },
            { label: 'Pages', value: pages, icon: '⊞', color: '#dbeafe', iconColor: '#2563eb' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 14 }}>🔍</span>
            <input style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px 9px 36px', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff' }}
              value={search} onChange={e => setSearch(e.target.value)} placeholder="Search blogs..." />
          </div>
          <select style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 13, outline: 'none', background: '#fff', color: '#374151' }}
            value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <select style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 13, outline: 'none', background: '#fff', color: '#374151' }}
            value={filterCat} onChange={e => setFilterCat(e.target.value)}>
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['#', 'IMAGE', 'TITLE', 'CATEGORY', 'AUTHOR', 'STATUS', 'DATE', 'ACTIONS'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 32, color: '#94a3b8' }}>Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#94a3b8', fontSize: 14 }}>No posts found.</td></tr>
              ) : filtered.map((b, idx) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{idx + 1}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <img src={b.thumbnail || '/blog1.png'} alt={b.title}
                      style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0', display: 'block' }}
                      onError={e => { e.target.src = '/blog1.png' }} />
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#0f172a', maxWidth: 280 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>/blog/{b.slug}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{b.category}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>Clicksemurs Team</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: b.is_published ? '#dcfce7' : '#fef9c3', color: b.is_published ? '#16a34a' : '#ca8a04', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>
                      {b.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>
                    {new Date(b.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                    <button onClick={() => startEdit(b)}
                      style={{ background: '#eff6ff', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', marginRight: 4, color: '#2563eb', fontSize: 14 }} title="Edit">✏️</button>
                    <button onClick={() => togglePublish(b)}
                      style={{ background: '#f8fafc', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', marginRight: 4, color: '#64748b', fontSize: 14 }} title={b.is_published ? 'Unpublish' : 'Publish'}>
                      {b.is_published ? '🙈' : '👁'}
                    </button>
                    <button onClick={() => deleteBlog(b.id)}
                      style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', color: '#dc2626', fontSize: 14 }} title="Delete">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
