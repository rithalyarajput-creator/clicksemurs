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

  const th = { color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #2E2E2E' }
  const td = { color: '#aaa', padding: '12px 14px', fontSize: 13, borderBottom: '1px solid #1a1a1a' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>Leads / Inquiries ({leads.length})</h1>
        <button onClick={exportCSV} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '8px 16px', cursor: 'pointer', fontSize: 12 }}>Export CSV</button>
      </div>
      {msg && <div style={{ background: '#0a1a0a', border: '1px solid #166534', color: '#4ade80', padding: '10px 16px', marginBottom: 16, fontSize: 13 }}>{msg}</div>}
      {loading ? <div style={{ color: '#777' }}>Loading...</div> : (
        <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['#', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Date', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr><td colSpan={9} style={{ ...td, textAlign: 'center', padding: 40 }}>No inquiries yet.</td></tr>
              ) : leads.map(l => (
                <tr key={l.id}>
                  <td style={td}>{l.id}</td>
                  <td style={{ ...td, color: '#fff', fontWeight: 600 }}>{l.name}</td>
                  <td style={td}>{l.email}</td>
                  <td style={td}>{l.phone || '—'}</td>
                  <td style={td}>{l.service || '—'}</td>
                  <td style={{ ...td, maxWidth: 180 }}>{(l.message || '').slice(0, 80)}{(l.message || '').length > 80 ? '…' : ''}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{new Date(l.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td style={td}>
                    <span style={{ background: l.is_read ? '#1a1a1a' : '#2a1010', color: l.is_read ? '#555' : '#ff6b6b', fontSize: 11, padding: '2px 8px', border: `1px solid ${l.is_read ? '#2E2E2E' : '#5a1a1a'}` }}>
                      {l.is_read ? 'Read' : 'New'}
                    </span>
                  </td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    {!l.is_read && <button onClick={() => markRead(l.id)} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '4px 10px', cursor: 'pointer', fontSize: 11, marginRight: 6 }}>Mark Read</button>}
                    <button onClick={() => deleteLead(l.id)} style={{ background: '#2a1010', border: '1px solid #5a1a1a', color: '#ff6b6b', padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>Delete</button>
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
