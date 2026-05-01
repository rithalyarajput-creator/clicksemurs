import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const blank = { name: '', bio: '', avatar: '' }

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([])
  const [postCounts, setPostCounts] = useState({})
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')

  const load = async () => {
    const { data } = await supabase.from('authors').select('*').order('created_at', { ascending: false })
    setAuthors(data || [])
    // Count posts per author
    const { data: blogs } = await supabase.from('blogs').select('author').eq('is_published', true)
    const counts = {}
    ;(blogs || []).forEach(b => {
      if (b.author) counts[b.author] = (counts[b.author] || 0) + 1
    })
    setPostCounts(counts)
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    if (editId) { await supabase.from('authors').update(form).eq('id', editId) }
    else { await supabase.from('authors').insert([form]) }
    setMsg('Saved!'); setTimeout(() => setMsg(''), 3000)
    setForm(blank); setEditId(null); load()
  }

  const del = async (id) => {
    if (!confirm('Delete author?')) return
    await supabase.from('authors').delete().eq('id', id); load()
  }

  const inp = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: '#fff', marginBottom: 12 }
  const lbl = { display: 'block', color: '#374151', fontSize: 12, fontWeight: 600, marginBottom: 6 }

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Authors</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Manage blog author profiles</p>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#0f172a', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{editId ? 'Edit Author' : 'Add Author'}</h2>
          <form onSubmit={submit}>
            <label style={lbl}>Name *</label>
            <input style={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Author name" required />
            <label style={lbl}>Bio</label>
            <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Short bio..." />
            <label style={lbl}>Avatar URL</label>
            <input style={inp} value={form.avatar} onChange={e => setForm(p => ({ ...p, avatar: e.target.value }))} placeholder="https://..." />
            {form.avatar && <img src={form.avatar} alt="" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />}
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={{ flex: 1, background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{editId ? 'Update' : 'Add Author'}</button>
              {editId && <button type="button" onClick={() => { setForm(blank); setEditId(null) }} style={{ background: '#f1f5f9', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {authors.length === 0 ? (
            <div style={{ gridColumn: 'span 2', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 40, textAlign: 'center', color: '#94a3b8' }}>No authors yet.</div>
          ) : authors.map(a => (
            <div key={a.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                <img src={a.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=c8892a&color=fff&bold=true`} alt={a.name}
                  style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #e2e8f0' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 3, lineHeight: 1.4 }}>{a.bio?.slice(0, 80) || 'No bio'}</div>
                </div>
              </div>
              {/* Stats */}
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#6366f1', display: 'flex' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{postCounts[a.name] || 0}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>Published Posts</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => { setForm({ name: a.name, bio: a.bio || '', avatar: a.avatar || '' }); setEditId(a.id) }}
                  style={{ flex: 1, background: '#eff6ff', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: 12, cursor: 'pointer', color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit
                </button>
                <button onClick={() => del(a.id)} style={{ flex: 1, background: '#fef2f2', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: 12, cursor: 'pointer', color: '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
