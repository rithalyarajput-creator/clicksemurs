import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function AdminNewsletter() {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('newsletter').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setSubs(data || []); setLoading(false) })
  }, [])

  const del = async (id) => {
    if (!confirm('Remove subscriber?')) return
    await supabase.from('newsletter').delete().eq('id', id)
    setSubs(p => p.filter(s => s.id !== id))
  }

  const exportCSV = () => {
    const csv = ['Email,Date', ...subs.map(s => `${s.email},${s.created_at}`)].join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'newsletter_subscribers.csv'; a.click()
  }

  const th = { color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }
  const td = { color: '#64748b', padding: '12px 16px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800 }}>Newsletter Subscribers</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>{subs.length} subscribers</p>
        </div>
        <button onClick={exportCSV} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Export CSV</button>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th style={th}>#</th><th style={th}>Email</th><th style={th}>Date Subscribed</th><th style={th}>Action</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={4} style={{ ...td, textAlign: 'center' }}>Loading...</td></tr>
              : subs.length === 0 ? <tr><td colSpan={4} style={{ ...td, textAlign: 'center', padding: 40, color: '#94a3b8' }}>No subscribers yet.</td></tr>
              : subs.map((s, i) => (
                <tr key={s.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, color: '#0f172a', fontWeight: 500 }}>{s.email}</td>
                  <td style={td}>{new Date(s.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td style={td}><button onClick={() => del(s.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#dc2626' }}>Remove</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
