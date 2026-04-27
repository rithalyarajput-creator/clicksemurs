import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export default function AdminCategories() {
  const [cats, setCats] = useState([])
  const [newCat, setNewCat] = useState('')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const load = async () => {
    const { data } = await supabase.from('categories').select('*').order('name')
    setCats(data || [])
  }

  useEffect(() => { load() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 2500) }

  const add = async () => {
    const name = newCat.trim()
    if (!name) return
    if (cats.find(c => c.name.toLowerCase() === name.toLowerCase())) return flash('Category already exists.', 'error')
    const { error } = await supabase.from('categories').insert([{ name }])
    if (error) return flash('Error: ' + error.message, 'error')
    flash('Category added!')
    setNewCat('')
    load()
  }

  const del = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return
    await supabase.from('categories').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Blog Categories</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Manage categories used in blog posts</p>
      {msg && <div style={{ background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#0f172a', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Add New Category</h2>
          <input
            style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 12, color: '#0f172a', background: '#fff' }}
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="Category name..."
          />
          <button onClick={add} style={{ width: '100%', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Add Category
          </button>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 700, fontSize: 14, color: '#0f172a' }}>
            All Categories ({cats.length})
          </div>
          {cats.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No categories yet. Add one above.</div>
          ) : cats.map(cat => (
            <div key={cat.id} style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
                <span style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>{cat.name}</span>
              </div>
              <button onClick={() => del(cat.id, cat.name)} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#dc2626' }}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
