import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const blank = { client_name: '', company: '', review: '', rating: 5 }

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const load = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3000) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.client_name || !form.review) return flash('Name and review are required.', 'error')
    if (editId) {
      await supabase.from('testimonials').update(form).eq('id', editId)
      flash('Updated!')
    } else {
      await supabase.from('testimonials').insert([form])
      flash('Testimonial added!')
    }
    setForm(blank); setEditId(null); load()
  }

  const startEdit = (t) => { setForm({ client_name: t.client_name, company: t.company || '', review: t.review, rating: t.rating }); setEditId(t.id) }
  const cancelEdit = () => { setForm(blank); setEditId(null) }

  const deleteItem = async (id) => {
    if (!confirm('Delete?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    flash('Deleted.'); load()
  }

  const inp = { display: 'block', width: '100%', background: '#111', border: '1px solid #2E2E2E', color: '#fff', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box', marginBottom: 14 }
  const lbl = { display: 'block', color: '#aaa', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }
  const th = { color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #2E2E2E' }
  const td = { color: '#aaa', padding: '12px 14px', fontSize: 13, borderBottom: '1px solid #1a1a1a' }

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Testimonials</h1>
      {msg && <div style={{ background: msgType === 'error' ? '#2a1010' : '#0a1a0a', border: `1px solid ${msgType === 'error' ? '#5a1a1a' : '#166534'}`, color: msgType === 'error' ? '#ff6b6b' : '#4ade80', padding: '10px 16px', marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: 24 }}>
          <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>{editId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <form onSubmit={handleSubmit}>
            <label style={lbl}>Client Name *</label>
            <input style={inp} value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} required />
            <label style={lbl}>Company / Role</label>
            <input style={inp} value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
            <label style={lbl}>Review *</label>
            <textarea style={{ ...inp, height: 120, resize: 'vertical' }} value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} required />
            <label style={lbl}>Rating (1–5)</label>
            <select style={{ ...inp }} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) }))}>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
            </select>
            <button type="submit" style={{ background: '#fff', color: '#111', padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, marginRight: 8 }}>{editId ? 'Update' : 'Add Testimonial'} →</button>
            {editId && <button type="button" onClick={cancelEdit} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '10px 20px', cursor: 'pointer', fontSize: 13 }}>Cancel</button>}
          </form>
        </div>

        <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #2E2E2E' }}>
            <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>All Testimonials ({items.length})</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Client', 'Company', 'Rating', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={4} style={{ ...td, textAlign: 'center', padding: 32 }}>No testimonials yet.</td></tr>
              ) : items.map(t => (
                <tr key={t.id}>
                  <td style={{ ...td, color: '#fff', fontWeight: 500 }}>{t.client_name}</td>
                  <td style={td}>{t.company}</td>
                  <td style={{ ...td, color: '#facc15' }}>{'★'.repeat(t.rating)}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    <button onClick={() => startEdit(t)} style={{ background: 'none', border: '1px solid #2E2E2E', color: '#aaa', padding: '4px 10px', cursor: 'pointer', fontSize: 11, marginRight: 4 }}>Edit</button>
                    <button onClick={() => deleteItem(t.id)} style={{ background: '#2a1010', border: '1px solid #5a1a1a', color: '#ff6b6b', padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>Del</button>
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
