import { useState } from 'react'

const defaultCategories = ['SEO', 'Paid Ads', 'Social Media', 'Website', 'Email Marketing', 'Influencer Marketing', 'Strategy', 'Analytics', 'Finance']

export default function AdminCategories() {
  const [cats, setCats] = useState(defaultCategories)
  const [newCat, setNewCat] = useState('')
  const [msg, setMsg] = useState('')

  const add = () => {
    if (!newCat.trim() || cats.includes(newCat.trim())) return
    setCats(p => [...p, newCat.trim()]); setNewCat('')
    setMsg('Category added!'); setTimeout(() => setMsg(''), 2000)
  }

  const del = (cat) => {
    if (!confirm(`Delete "${cat}"?`)) return
    setCats(p => p.filter(c => c !== cat))
  }

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Blog Categories</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Manage categories used in blog posts</p>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#0f172a', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Add New Category</h2>
          <input style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 12 }}
            value={newCat} onChange={e => setNewCat(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Category name..." />
          <button onClick={add} style={{ width: '100%', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Add Category</button>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 700, fontSize: 14, color: '#0f172a' }}>All Categories ({cats.length})</div>
          {cats.map(cat => (
            <div key={cat} style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
                <span style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>{cat}</span>
              </div>
              <button onClick={() => del(cat)} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#dc2626' }}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
