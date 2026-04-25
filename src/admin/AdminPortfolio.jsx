import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const INDUSTRIES = ['Technology', 'Fashion', 'Real Estate', 'Healthcare', 'Education', 'Food & Beverage', 'Automobile', 'Finance', 'E-Commerce', 'Retail', 'Manufacturing', 'Non-Profit', 'Other']
const blank = { client_name: '', industry: 'Technology', challenge: '', solution: '', result: '' }

export default function AdminPortfolio() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const load = async () => {
    const { data } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3000) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.client_name) return flash('Client name is required.', 'error')
    if (editId) {
      await supabase.from('portfolio').update(form).eq('id', editId)
      flash('Updated!')
    } else {
      await supabase.from('portfolio').insert([form])
      flash('Case study added!')
    }
    setForm(blank); setEditId(null); load()
  }

  const startEdit = (p) => { setForm({ client_name: p.client_name, industry: p.industry, challenge: p.challenge || '', solution: p.solution || '', result: p.result || '' }); setEditId(p.id) }
  const cancelEdit = () => { setForm(blank); setEditId(null) }

  const deleteItem = async (id) => {
    if (!confirm('Delete?')) return
    await supabase.from('portfolio').delete().eq('id', id)
    flash('Deleted.'); load()
  }

  const inp = { display: 'block', width: '100%', background: '#111', border: '1px solid #2E2E2E', color: '#fff', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box', marginBottom: 14 }
  const lbl = { display: 'block', color: '#aaa', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }
  const th = { color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #2E2E2E' }
  const td = { color: '#aaa', padding: '12px 14px', fontSize: 13, borderBottom: '1px solid #1a1a1a' }

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Portfolio / Case Studies</h1>
      {msg && <div style={{ background: msgType === 'error' ? '#2a1010' : '#0a1a0a', border: `1px solid ${msgType === 'error' ? '#5a1a1a' : '#166534'}`, color: msgType === 'error' ? '#ff6b6b' : '#4ade80', padding: '10px 16px', marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: 24 }}>
          <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>{editId ? 'Edit Case Study' : 'Add Case Study'}</h2>
          <form onSubmit={handleSubmit}>
            <label style={lbl}>Client Name *</label>
            <input style={inp} value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} required />
            <label style={lbl}>Industry</label>
            <select style={{ ...inp }} value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}>
              {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
            </select>
            <label style={lbl}>Challenge</label>
            <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={form.challenge} onChange={e => setForm(f => ({ ...f, challenge: e.target.value }))} />
            <label style={lbl}>Solution</label>
            <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={form.solution} onChange={e => setForm(f => ({ ...f, solution: e.target.value }))} />
            <label style={lbl}>Result</label>
            <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value }))} />
            <button type="submit" style={{ background: '#fff', color: '#111', padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, marginRight: 8 }}>{editId ? 'Update' : 'Add Case Study'} →</button>
            {editId && <button type="button" onClick={cancelEdit} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '10px 20px', cursor: 'pointer', fontSize: 13 }}>Cancel</button>}
          </form>
        </div>

        <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #2E2E2E' }}>
            <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>All Case Studies ({items.length})</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Client', 'Industry', 'Result', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={4} style={{ ...td, textAlign: 'center', padding: 32 }}>No case studies yet.</td></tr>
              ) : items.map(p => (
                <tr key={p.id}>
                  <td style={{ ...td, color: '#fff', fontWeight: 500 }}>{p.client_name}</td>
                  <td style={td}>{p.industry}</td>
                  <td style={{ ...td, maxWidth: 160 }}>{(p.result || '').slice(0, 60)}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    <button onClick={() => startEdit(p)} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '4px 10px', cursor: 'pointer', fontSize: 11, marginRight: 4 }}>Edit</button>
                    <button onClick={() => deleteItem(p.id)} style={{ background: '#2a1010', border: '1px solid #5a1a1a', color: '#ff6b6b', padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
