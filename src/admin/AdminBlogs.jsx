import { useEffect, useState, useRef } from 'react'
import { supabase } from './supabase'

const FALLBACK_CATEGORIES = ['SEO', 'Paid Ads', 'Social Media', 'Website', 'Email Marketing', 'Influencer Marketing', 'Strategy', 'Analytics', 'Finance']

const blank = {
  title: '', slug: '', category: 'SEO', thumbnail: '', author: '',
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
      <style>{`
        .rich-editor h1{font-size:26px;font-weight:900;color:#0f172a;margin:20px 0 10px;border-left:4px solid #F4A100;padding-left:12px}
        .rich-editor h2{font-size:22px;font-weight:800;color:#0f172a;margin:18px 0 8px;border-left:4px solid #F4A100;padding-left:12px}
        .rich-editor h3{font-size:18px;font-weight:700;color:#0f172a;margin:16px 0 8px;border-left:4px solid #F4A100;padding-left:12px}
        .rich-editor h4{font-size:15px;font-weight:700;color:#0f172a;margin:14px 0 6px}
        .rich-editor p{color:#334155;font-size:14px;line-height:1.75;margin-bottom:10px}
        .rich-editor ul,.rich-editor ol{padding-left:22px;color:#334155;font-size:14px;margin-bottom:10px}
        .rich-editor li{margin-bottom:4px}
        .rich-editor strong,.rich-editor b{font-weight:700;color:#0f172a}
        .rich-editor blockquote{border-left:3px solid #F4A100;padding-left:12px;color:#64748b;font-style:italic;margin:12px 0}
      `}</style>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="rich-editor"
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
  const [authors, setAuthors] = useState([])
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES)
  const [mediaImages, setMediaImages] = useState([])
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [view, setView] = useState(startNew ? 'new' : 'list')
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

  const loadAuthors = async () => {
    const { data } = await supabase.from('authors').select('id, name').order('name')
    setAuthors(data || [])
  }

  const loadCategories = async () => {
    const { data } = await supabase.from('categories').select('name').order('name')
    if (data && data.length > 0) setCategories(data.map(c => c.name))
  }

  const loadMedia = async () => {
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false })
    setMediaImages(data || [])
  }

  useEffect(() => { load(); loadAuthors(); loadCategories(); loadMedia() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3500) }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  const autoMetaTitle = () => f('meta_title', form.title)

  const handleSubmit = async (publish) => {
    if (!form.title || !form.slug) return flash('Title and slug are required.', 'error')

    // Base payload -- only columns guaranteed to exist
    const base = {
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

    // Try saving with extra columns first; fallback to base if schema error
    const withExtras = {
      ...base,
      author: form.author || 'Clicksemurs Team',
      faqs: form.faqs.length > 0 ? form.faqs : null,
    }

    const save = async (payload) => {
      if (editId) return supabase.from('blogs').update(payload).eq('id', editId)
      return supabase.from('blogs').insert([payload])
    }

    let { error } = await save(withExtras)
    if (error && (error.message.includes('author') || error.message.includes('faqs'))) {
      // Columns not yet added -- save without them
      const res = await save(base)
      error = res.error
    }
    if (error) return flash('Save failed: ' + error.message, 'error')

    flash(publish ? 'Blog published!' : 'Saved as draft!')
    setForm(blank); setEditId(null); setView('list'); load()
  }

  const startEdit = (b) => {
    setForm({
      title: b.title || '', slug: b.slug || '', category: b.category || 'SEO',
      thumbnail: b.thumbnail || '', author: b.author || 'Clicksemurs Team',
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
              <select style={{ ...inp, marginBottom: 14 }} value={form.category} onChange={e => f('category', e.target.value)}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <label style={{ ...lbl, fontSize: 12 }}>Author</label>
              <select style={{ ...inp, marginBottom: 16 }} value={form.author} onChange={e => f('author', e.target.value)}>
                <option value="">— Select Author —</option>
                {authors.map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
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
              {/* Preview */}
              {form.thumbnail ? (
                <div style={{ position: 'relative', marginBottom: 10 }}>
                  <img src={form.thumbnail} alt="preview" style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0', display: 'block' }} />
                  <button type="button" onClick={() => f('thumbnail', '')} style={{ position: 'absolute', top: 6, right: 6, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>×</button>
                </div>
              ) : (
                <div style={{ width: '100%', height: 90, background: '#f8fafc', borderRadius: 8, border: '2px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 12, marginBottom: 10 }}>
                  No image selected
                </div>
              )}
              <button type="button" onClick={() => { loadMedia(); setShowMediaPicker(true) }}
                style={{ width: '100%', background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                Pick from Media Library
              </button>
              {/* Media Picker Modal */}
              {showMediaPicker && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: 680, maxHeight: '80vh', overflow: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>Media Library</div>
                      <button type="button" onClick={() => setShowMediaPicker(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>✕ Close</button>
                    </div>
                    {mediaImages.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
                        No images in library yet.<br />
                        <span style={{ fontSize: 12 }}>Go to Media Library to upload images first.</span>
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                        {mediaImages.map(m => (
                          <div key={m.id} onClick={() => { f('thumbnail', m.url); setShowMediaPicker(false) }}
                            style={{ cursor: 'pointer', borderRadius: 8, overflow: 'hidden', border: form.thumbnail === m.url ? '3px solid #F4A100' : '2px solid #e2e8f0' }}>
                            <img src={m.url} alt={m.alt_text} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />
                            <div style={{ padding: '5px 8px', fontSize: 10, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.alt_text || 'No alt'}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
            { label: 'Total Posts', value: blogs.length, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, color: '#e0e7ff', iconColor: '#6366f1' },
            { label: 'Published', value: published, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, color: '#dcfce7', iconColor: '#16a34a' },
            { label: 'Draft', value: drafts, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, color: '#fef9c3', iconColor: '#ca8a04' },
            { label: 'Pages', value: pages, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, color: '#dbeafe', iconColor: '#2563eb' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.iconColor }}>{s.icon}</div>
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
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
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
            {categories.map(c => <option key={c}>{c}</option>)}
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
                      style={{ background: '#eff6ff', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', marginRight: 4, color: '#2563eb', display: 'flex', alignItems: 'center' }} title="Edit">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button onClick={() => togglePublish(b)}
                      style={{ background: '#f8fafc', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', marginRight: 4, color: '#64748b', display: 'flex', alignItems: 'center' }} title={b.is_published ? 'Unpublish' : 'Publish'}>
                      {b.is_published
                        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </button>
                    <button onClick={() => deleteBlog(b.id)}
                      style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center' }} title="Delete">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
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
