import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const load = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    setLeads(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const markRead = async (id) => {
    await supabase.from('leads').update({ is_read: true }).eq('id', id)
    setMsg('Marked as read.'); load()
  }

  const deleteLead = async (id) => {
    if (!confirm('Delete this lead?')) return
    await supabase.from('leads').delete().eq('id', id)
    setMsg('Lead deleted.'); load()
  }

  const exportCSV = () => {
    const header = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Read', 'Date']
    const rows = leads.map(l => [l.id, l.name, l.email, l.phone, l.service, l.message, l.is_read ? 'Yes' : 'No', l.created_at])
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `leads_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  const th = { color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }
  const td = { color: '#64748b', padding: '12px 16px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800 }}>Leads & Inquiries</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{leads.length} total leads</p>
        </div>
        <button onClick={exportCSV} style={{ background: '#0f172a', border: 'none', color: '#fff', padding: '9px 18px', cursor: 'pointer', fontSize: 13, borderRadius: 8, fontWeight: 600 }}>Export CSV</button>
      </div>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', marginBottom: 16, fontSize: 13, borderRadius: 8 }}>{msg}</div>}
      {loading ? <div style={{ color: '#94a3b8' }}>Loading...</div> : (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['#', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Date', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr><td colSpan={9} style={{ ...td, textAlign: 'center', padding: 40, color: '#94a3b8' }}>No inquiries yet.</td></tr>
              ) : leads.map(l => (
                <tr key={l.id}>
                  <td style={td}>{l.id}</td>
                  <td style={{ ...td, color: '#0f172a', fontWeight: 600 }}>{l.name}</td>
                  <td style={td}>{l.email}</td>
                  <td style={td}>{l.phone || '—'}</td>
                  <td style={td}>{l.service || '—'}</td>
                  <td style={{ ...td, maxWidth: 180 }}>{(l.message || '').slice(0, 80)}{(l.message || '').length > 80 ? '…' : ''}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{new Date(l.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td style={td}>
                    <span style={{ background: l.is_read ? '#f1f5f9' : '#fee2e2', color: l.is_read ? '#64748b' : '#dc2626', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                      {l.is_read ? 'Read' : 'New'}
                    </span>
                  </td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    {!l.is_read && <button onClick={() => markRead(l.id)} style={{ background: '#eff6ff', border: 'none', color: '#2563eb', padding: '4px 10px', cursor: 'pointer', fontSize: 11, borderRadius: 6, marginRight: 6, fontWeight: 600 }}>Mark Read</button>}
                    <button onClick={() => deleteLead(l.id)} style={{ background: '#fef2f2', border: 'none', color: '#dc2626', padding: '4px 10px', cursor: 'pointer', fontSize: 11, borderRadius: 6, fontWeight: 600 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
