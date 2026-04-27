import { useEffect, useState, useRef } from 'react'
import { supabase } from './supabase'

const CATEGORIES = ['Website', 'Social Media', 'E-Commerce', 'Brand Logo', 'Product Photography', 'Other']

const blank = {
  title: '', description: '', category: 'Website',
  brand_logo_url: '', is_active: true,
  image1: '', image2: '', image3: '', image4: '', image5: '',
}

function ImageUploader({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  const upload = async (file) => {
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `projects/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('media').getPublicUrl(path)
      onChange(data.publicUrl)
    }
    setUploading(false)
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {value && (
          <img src={value} alt="" style={{ width: 64, height: 44, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0', flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Paste image URL or upload below"
            style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 6, padding: '7px 10px', fontSize: 12, outline: 'none', color: '#0f172a', background: '#fff', boxSizing: 'border-box', marginBottom: 4 }}
          />
          <div style={{ display: 'flex', gap: 6 }}>
            <button type="button" onClick={() => inputRef.current?.click()}
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', color: '#475569' }}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {value && (
              <button type="button" onClick={() => onChange('')}
                style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', color: '#dc2626' }}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => upload(e.target.files[0])} />
    </div>
  )
}

export default function AdminProjects() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3500) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return flash('Project title is required.', 'error')
    const payload = { ...form }
    if (editId) {
      const { error } = await supabase.from('projects').update(payload).eq('id', editId)
      if (error) return flash('Error: ' + error.message, 'error')
      flash('Project updated!')
    } else {
      const { error } = await supabase.from('projects').insert([payload])
      if (error) {
        if (error.message.includes('column') || error.message.includes('relation')) {
          flash('Table not found. Please run the SQL to create the projects table first.', 'error')
        } else {
          flash('Error: ' + error.message, 'error')
        }
        return
      }
      flash('Project added!')
    }
    setForm(blank); setEditId(null); setShowForm(false); load()
  }

  const startEdit = (p) => {
    setForm({
      title: p.title || '', description: p.description || '', category: p.category || 'Website',
      brand_logo_url: p.brand_logo_url || '', is_active: p.is_active !== false,
      image1: p.image1 || '', image2: p.image2 || '', image3: p.image3 || '',
      image4: p.image4 || '', image5: p.image5 || '',
    })
    setEditId(p.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelForm = () => { setForm(blank); setEditId(null); setShowForm(false) }

  const deleteItem = async (id) => {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    flash('Deleted.'); load()
  }

  const toggleActive = async (p) => {
    await supabase.from('projects').update({ is_active: !p.is_active }).eq('id', p.id)
    load()
  }

  const inp = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#0f172a', background: '#fff' }
  const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }

  const stats = [
    { label: 'Total Projects', value: items.length, color: '#6366f1' },
    { label: 'Active', value: items.filter(i => i.is_active !== false).length, color: '#10b981' },
    { label: 'Hidden', value: items.filter(i => i.is_active === false).length, color: '#64748b' },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Projects Portfolio</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Add website mockups, social media posts, brand logos & more</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setForm(blank); setEditId(null) }}
          style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          {showForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {/* SQL hint */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '12px 18px', marginBottom: 20, fontSize: 13, color: '#1d4ed8' }}>
        <strong>Setup required:</strong> Run this SQL in Supabase → SQL Editor once:
        <code style={{ display: 'block', background: '#dbeafe', padding: '8px 12px', borderRadius: 6, marginTop: 8, fontSize: 12, color: '#1e40af', wordBreak: 'break-all' }}>
          CREATE TABLE IF NOT EXISTS projects (id bigserial primary key, title text, description text, category text default 'Website', brand_logo_url text, image1 text, image2 text, image3 text, image4 text, image5 text, is_active boolean default true, created_at timestamptz default now());
          ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
          CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
          CREATE POLICY "Auth all" ON projects FOR ALL USING (auth.role() = 'authenticated');
        </code>
      </div>

      {msg && (
        <div style={{ background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>
      )}

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
            <span style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{s.value}</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{editId ? 'Edit Project' : 'Add New Project'}</span>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={lbl}>Project Title *</label>
                <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. TechSpark Website Redesign" required />
              </div>
              <div>
                <label style={lbl}>Category</label>
                <select style={{ ...inp }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Description</label>
              <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description of this project..." />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Brand Logo URL (optional)</label>
              <input style={inp} value={form.brand_logo_url} onChange={e => setForm(f => ({ ...f, brand_logo_url: e.target.value }))} placeholder="https://... (paste direct image URL)" />
              {form.brand_logo_url && <img src={form.brand_logo_url} alt="logo preview" style={{ height: 40, marginTop: 8, borderRadius: 4, objectFit: 'contain' }} />}
            </div>

            {/* Image uploaders */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', marginBottom: 16 }}>Project Images (up to 5)</div>
              {['image1','image2','image3','image4','image5'].map((key, i) => (
                <ImageUploader
                  key={key}
                  label={`Image ${i + 1}${i === 0 ? ' (Main / Thumbnail)' : ''}`}
                  value={form[key]}
                  onChange={val => setForm(f => ({ ...f, [key]: val }))}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} style={{ width: 16, height: 16, cursor: 'pointer' }} />
              <label htmlFor="is_active" style={{ fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Active (visible on website)</label>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 28px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                {editId ? 'Update Project' : 'Add Project'}
              </button>
              <button type="button" onClick={cancelForm} style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 8, padding: '11px 20px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div style={{ color: '#94a3b8', padding: 40, textAlign: 'center' }}>Loading...</div>
      ) : items.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 48, textAlign: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px' }}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          <p style={{ color: '#94a3b8', fontWeight: 600 }}>No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {items.map(p => (
            <div key={p.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              {/* Thumbnail */}
              <div style={{ height: 160, background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
                {p.image1 ? (
                  <img src={p.image1} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                )}
                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                  <span style={{ background: p.is_active !== false ? '#dcfce7' : '#f1f5f9', color: p.is_active !== false ? '#16a34a' : '#94a3b8', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>
                    {p.is_active !== false ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>{p.category}</span>
                </div>
              </div>

              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  {p.brand_logo_url && (
                    <img src={p.brand_logo_url} alt="logo" style={{ height: 24, width: 'auto', objectFit: 'contain', borderRadius: 4 }} />
                  )}
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', flex: 1 }}>{p.title}</div>
                </div>
                {p.description && <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>{p.description.slice(0, 80)}{p.description.length > 80 ? '...' : ''}</p>}

                {/* Image count */}
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12 }}>
                  {[p.image1,p.image2,p.image3,p.image4,p.image5].filter(Boolean).length} image(s)
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => startEdit(p)} style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '7px 12px', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => toggleActive(p)} style={{ flex: 1, background: p.is_active !== false ? '#fef9c3' : '#f0fdf4', border: `1px solid ${p.is_active !== false ? '#fde047' : '#86efac'}`, borderRadius: 6, padding: '7px 12px', fontSize: 12, fontWeight: 600, color: p.is_active !== false ? '#92400e' : '#16a34a', cursor: 'pointer' }}>
                    {p.is_active !== false ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => deleteItem(p.id)} style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, padding: '7px 12px', fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Del</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
