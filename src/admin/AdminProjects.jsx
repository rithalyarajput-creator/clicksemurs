import { useEffect, useState, useRef } from 'react'
import { supabase } from './supabase'

const CATEGORIES = ['Website', 'Social Media', 'E-Commerce', 'Brand Logo', 'Product Photography', 'Other']

const blank = {
  title: '', description: '', category: 'Website',
  brand_logo_url: '', is_active: true,
  image1: '', image2: '', image3: '', image4: '', image5: '',
}

const SQL_CODE = `CREATE TABLE IF NOT EXISTS projects (
  id bigserial primary key,
  title text,
  description text,
  category text default 'Website',
  brand_logo_url text,
  image1 text, image2 text, image3 text, image4 text, image5 text,
  is_active boolean default true,
  created_at timestamptz default now()
);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Auth all" ON projects FOR ALL USING (auth.role() = 'authenticated');`

function UploadField({ label, value, onChange, isMain }) {
  const [uploading, setUploading] = useState(false)
  const ref = useRef()

  const upload = async (file) => {
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `projects/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('media').getPublicUrl(path)
      onChange(data.publicUrl)
    } else {
      alert('Upload failed: ' + error.message)
    }
    setUploading(false)
  }

  return (
    <div style={{ background: value ? '#f0fdf4' : '#f8fafc', border: `1.5px dashed ${value ? '#86efac' : '#e2e8f0'}`, borderRadius: 10, padding: '12px 14px', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Thumb */}
        <div style={{ width: 52, height: 40, borderRadius: 6, overflow: 'hidden', background: '#e2e8f0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {value
            ? <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
            {label} {isMain && <span style={{ background: '#F4A100', color: '#111', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 3, marginLeft: 4 }}>MAIN</span>}
          </div>
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Paste URL or upload →"
            style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 8px', fontSize: 12, outline: 'none', color: '#0f172a', background: '#fff', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button type="button" onClick={() => ref.current?.click()}
            style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {uploading ? '...' : 'Upload'}
          </button>
          {value && (
            <button type="button" onClick={() => onChange('')}
              style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, padding: '6px 8px', fontSize: 11, fontWeight: 700, cursor: 'pointer', color: '#dc2626' }}>✕</button>
          )}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => upload(e.target.files[0])} />
    </div>
  )
}

const CAT_COLORS = {
  'Website': '#6366f1', 'Social Media': '#ec4899', 'E-Commerce': '#f59e0b',
  'Brand Logo': '#10b981', 'Product Photography': '#3b82f6', 'Other': '#64748b'
}

export default function AdminProjects() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')
  const [loading, setLoading] = useState(true)
  const [tableError, setTableError] = useState(false)
  const [view, setView] = useState('list') // 'list' | 'form'
  const [sqlCopied, setSqlCopied] = useState(false)

  const load = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (error) { setTableError(true); setLoading(false); return }
    setTableError(false)
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3500) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return flash('Project title is required.', 'error')
    if (editId) {
      const { error } = await supabase.from('projects').update(form).eq('id', editId)
      if (error) return flash('Error: ' + error.message, 'error')
      flash('Project updated!')
    } else {
      const { error } = await supabase.from('projects').insert([form])
      if (error) return flash('Error: ' + error.message, 'error')
      flash('Project added!')
    }
    setForm(blank); setEditId(null); setView('list'); load()
  }

  const startEdit = (p) => {
    setForm({
      title: p.title || '', description: p.description || '',
      category: p.category || 'Website', brand_logo_url: p.brand_logo_url || '',
      is_active: p.is_active !== false,
      image1: p.image1 || '', image2: p.image2 || '', image3: p.image3 || '',
      image4: p.image4 || '', image5: p.image5 || '',
    })
    setEditId(p.id)
    setView('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteItem = async (id) => {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    flash('Deleted.')
    load()
  }

  const toggleActive = async (p) => {
    await supabase.from('projects').update({ is_active: !p.is_active }).eq('id', p.id)
    load()
  }

  const copySQL = () => {
    navigator.clipboard.writeText(SQL_CODE)
    setSqlCopied(true)
    setTimeout(() => setSqlCopied(false), 2000)
  }

  const inp = { width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#0f172a', background: '#fff', transition: 'border 0.2s' }
  const lbl = { display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }

  // ── TABLE NOT FOUND ──
  if (tableError) {
    return (
      <div>
        <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Projects Gallery</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>One-time setup needed to activate this feature.</p>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', maxWidth: 680 }}>
          <div style={{ background: '#0f172a', padding: '20px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, background: '#F4A100', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>Setup Required — 2 Minutes</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Run this SQL once in Supabase to create the projects table</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '24px 28px' }}>
            <div style={{ fontSize: 13, color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
              <strong>Steps:</strong><br />
              1. Go to <strong>supabase.com</strong> → your project<br />
              2. Click <strong>SQL Editor</strong> in the left menu<br />
              3. Click <strong>New Query</strong><br />
              4. Paste the code below and click <strong>Run</strong>
            </div>

            <div style={{ background: '#0f172a', borderRadius: 10, padding: '16px 18px', marginBottom: 16, position: 'relative' }}>
              <pre style={{ color: '#e2e8f0', fontSize: 12, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{SQL_CODE}</pre>
              <button onClick={copySQL} style={{
                position: 'absolute', top: 12, right: 12,
                background: sqlCopied ? '#10b981' : 'rgba(255,255,255,0.1)',
                border: 'none', borderRadius: 6, padding: '5px 12px',
                color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer'
              }}>
                {sqlCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <button onClick={() => { setTableError(false); setLoading(true); load() }}
              style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 24px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              I ran the SQL — Check Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── FORM VIEW ──
  if (view === 'form') {
    return (
      <div>
        {/* Form header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button onClick={() => { setView('list'); setForm(blank); setEditId(null) }}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#475569' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </button>
          <div>
            <h1 style={{ color: '#0f172a', fontSize: 20, fontWeight: 800, marginBottom: 0 }}>{editId ? 'Edit Project' : 'Add New Project'}</h1>
          </div>
        </div>

        {msg && <div style={{ background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>

            {/* Left col — basic info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#0f172a', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 4, height: 18, background: '#F4A100', borderRadius: 2 }} />
                  Project Details
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={lbl}>Project Title *</label>
                  <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. TechSpark Website Redesign" required />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={lbl}>Category</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {CATEGORIES.map(c => (
                      <button key={c} type="button" onClick={() => setForm(f => ({ ...f, category: c }))}
                        style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: form.category === c ? `2px solid ${CAT_COLORS[c]}` : '1.5px solid #e2e8f0', background: form.category === c ? `${CAT_COLORS[c]}15` : '#f8fafc', color: form.category === c ? CAT_COLORS[c] : '#64748b', transition: 'all 0.15s' }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={lbl}>Description</label>
                  <textarea style={{ ...inp, height: 90, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description of this project..." />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={lbl}>Brand Logo URL <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label>
                  <input style={inp} value={form.brand_logo_url} onChange={e => setForm(f => ({ ...f, brand_logo_url: e.target.value }))} placeholder="https://... paste logo image URL" />
                  {form.brand_logo_url && <img src={form.brand_logo_url} alt="" style={{ height: 36, marginTop: 8, borderRadius: 4, objectFit: 'contain', background: '#f1f5f9', padding: 4 }} />}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: form.is_active ? '#f0fdf4' : '#f8fafc', borderRadius: 8, border: `1px solid ${form.is_active ? '#86efac' : '#e2e8f0'}`, cursor: 'pointer' }} onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}>
                  <div style={{ width: 38, height: 22, borderRadius: 11, background: form.is_active ? '#16a34a' : '#cbd5e1', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', top: 3, left: form.is_active ? 18 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: form.is_active ? '#16a34a' : '#64748b' }}>
                    {form.is_active ? 'Active — Visible on website' : 'Hidden — Not shown on website'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right col — images */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: '#0f172a', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: '#6366f1', borderRadius: 2 }} />
                Project Images
              </div>
              <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 18 }}>Upload up to 5 images. Any size / ratio. First image is the thumbnail.</p>

              {[['image1','Image 1',true],['image2','Image 2',false],['image3','Image 3',false],['image4','Image 4',false],['image5','Image 5',false]].map(([key,label,isMain]) => (
                <UploadField key={key} label={label} isMain={isMain} value={form[key]} onChange={val => setForm(f => ({ ...f, [key]: val }))} />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              {editId ? 'Update Project' : 'Add Project'}
            </button>
            <button type="button" onClick={() => { setView('list'); setForm(blank); setEditId(null) }}
              style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: 8, padding: '12px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  // ── LIST VIEW ──
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Projects Gallery</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Add websites, social posts, brand logos & more — shown on your Projects page</p>
        </div>
        <button onClick={() => { setForm(blank); setEditId(null); setView('form') }}
          style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New Project
        </button>
      </div>

      {msg && <div style={{ background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Projects', value: items.length, color: '#6366f1', bg: '#eff6ff' },
          { label: 'Active', value: items.filter(i => i.is_active !== false).length, color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Hidden', value: items.filter(i => i.is_active === false).length, color: '#64748b', bg: '#f8fafc' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}20`, borderRadius: 12, padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 12, minWidth: 140 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading...</div>
      ) : items.length === 0 ? (
        <div style={{ background: '#fff', border: '2px dashed #e2e8f0', borderRadius: 16, padding: 64, textAlign: 'center' }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block' }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          <p style={{ color: '#64748b', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>No projects yet</p>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>Add your first project to showcase on the website</p>
          <button onClick={() => setView('form')} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 24px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Add First Project
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {items.map(p => {
            const imgCount = [p.image1,p.image2,p.image3,p.image4,p.image5].filter(Boolean).length
            const catColor = CAT_COLORS[p.category] || '#64748b'
            return (
              <div key={p.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>

                {/* Thumbnail */}
                <div style={{ height: 150, background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
                  {p.image1
                    ? <img src={p.image1} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        <span style={{ color: '#cbd5e1', fontSize: 11 }}>No image</span>
                      </div>
                  }
                  {/* Badges */}
                  <div style={{ position: 'absolute', top: 8, left: 8 }}>
                    <span style={{ background: catColor, color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>{p.category}</span>
                  </div>
                  <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
                    {imgCount > 0 && <span style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20 }}>{imgCount} img{imgCount > 1 ? 's' : ''}</span>}
                    <span style={{ background: p.is_active !== false ? '#dcfce7' : '#f1f5f9', color: p.is_active !== false ? '#16a34a' : '#94a3b8', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>
                      {p.is_active !== false ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {p.brand_logo_url && <img src={p.brand_logo_url} alt="" style={{ height: 20, maxWidth: 48, objectFit: 'contain', borderRadius: 3 }} />}
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#0f172a', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                  </div>
                  {p.description && <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                    <button onClick={() => startEdit(p)}
                      style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, padding: '7px 0', fontSize: 12, fontWeight: 700, color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Edit
                    </button>
                    <button onClick={() => toggleActive(p)}
                      style={{ flex: 1, background: p.is_active !== false ? '#fff9e6' : '#f0fdf4', border: `1px solid ${p.is_active !== false ? '#fde68a' : '#86efac'}`, borderRadius: 7, padding: '7px 0', fontSize: 12, fontWeight: 700, color: p.is_active !== false ? '#92400e' : '#16a34a', cursor: 'pointer' }}>
                      {p.is_active !== false ? 'Hide' : 'Show'}
                    </button>
                    <button onClick={() => deleteItem(p.id)}
                      style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 7, padding: '7px 12px', fontSize: 12, fontWeight: 700, color: '#dc2626', cursor: 'pointer' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
