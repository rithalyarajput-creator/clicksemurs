import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const STATUSES = ['New', 'Contacted', 'Qualified', 'Closed']

export default function AdminChatbotLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    supabase.from('chatbot_leads').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setLeads(data || []); setLoading(false) })
  }, [])

  const updateStatus = async (id, status) => {
    await supabase.from('chatbot_leads').update({ status }).eq('id', id)
    setLeads(p => p.map(l => l.id === id ? { ...l, status } : l))
  }

  const del = async (id) => {
    if (!confirm('Delete?')) return
    await supabase.from('chatbot_leads').delete().eq('id', id)
    setLeads(p => p.filter(l => l.id !== id))
  }

  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter)
  const th = { color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }
  const td = { color: '#64748b', padding: '12px 16px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800 }}>Chatbot Leads</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>{leads.length} chatbot inquiries</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ background: filter === s ? '#0f172a' : '#fff', color: filter === s ? '#fff' : '#64748b', border: '1px solid #e2e8f0', borderRadius: 8, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>{s}</button>
          ))}
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['#', 'Name', 'Mobile', 'Loan Amount', 'Monthly Salary', 'Date', 'Status', 'Action'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={8} style={{ ...td, textAlign: 'center' }}>Loading...</td></tr>
              : filtered.length === 0 ? <tr><td colSpan={8} style={{ ...td, textAlign: 'center', padding: 40, color: '#94a3b8' }}>No chatbot leads yet.</td></tr>
              : filtered.map((l, i) => (
                <tr key={l.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, color: '#0f172a', fontWeight: 600 }}>{l.name || '—'}</td>
                  <td style={td}>{l.mobile || '—'}</td>
                  <td style={{ ...td, color: '#0f172a', fontWeight: 500 }}>{l.loan_amount || '—'}</td>
                  <td style={td}>{l.salary || '—'}</td>
                  <td style={td}>{new Date(l.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td style={td}>
                    <select value={l.status} onChange={e => updateStatus(l.id, e.target.value)}
                      style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '3px 8px', fontSize: 12, outline: 'none', cursor: 'pointer' }}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={td}><button onClick={() => del(l.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#dc2626' }}>🗑</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
