import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const STATUSES = ['New', 'Reviewed', 'Shortlisted', 'Rejected']
const statusColors = { New: ['#fee2e2', '#dc2626'], Reviewed: ['#fef9c3', '#ca8a04'], Shortlisted: ['#dcfce7', '#16a34a'], Rejected: ['#f1f5f9', '#64748b'] }

export default function AdminApplications() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [msg, setMsg] = useState('')

  const load = async () => {
    const { data } = await supabase.from('job_applications').select('*').order('created_at', { ascending: false })
    setApps(data || []); setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    await supabase.from('job_applications').update({ status }).eq('id', id)
    setMsg(`Status updated to ${status}`); setTimeout(() => setMsg(''), 3000); load()
  }

  const del = async (id) => {
    if (!confirm('Delete application?')) return
    await supabase.from('job_applications').delete().eq('id', id); load()
  }

  const filtered = filter === 'All' ? apps : apps.filter(a => a.status === filter)
  const th = { color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }
  const td = { color: '#64748b', padding: '12px 16px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800 }}>Job Applications</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>{apps.length} total applications</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ background: filter === s ? '#0f172a' : '#fff', color: filter === s ? '#fff' : '#64748b', border: '1px solid #e2e8f0', borderRadius: 8, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>{s}</button>
          ))}
        </div>
      </div>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{['#', 'Name', 'Email', 'Phone', 'Job Applied', 'CV', 'Date', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} style={{ ...td, textAlign: 'center', padding: 32 }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ ...td, textAlign: 'center', padding: 40, color: '#94a3b8' }}>No applications found.</td></tr>
            ) : filtered.map((a, i) => {
              const [bg, color] = statusColors[a.status] || ['#f1f5f9', '#64748b']
              return (
                <tr key={a.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, color: '#0f172a', fontWeight: 600 }}>{a.name}</td>
                  <td style={td}>{a.email}</td>
                  <td style={td}>{a.phone || '—'}</td>
                  <td style={{ ...td, color: '#0f172a' }}>{a.job_title || '—'}</td>
                  <td style={td}>{a.cv_url ? <a href={a.cv_url} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 600, fontSize: 12 }}>Download CV</a> : '—'}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{new Date(a.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td style={td}>
                    <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}
                      style={{ background: bg, color, border: 'none', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', outline: 'none' }}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={td}>
                    <button onClick={() => del(a.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', color: '#dc2626' }}>🗑</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
