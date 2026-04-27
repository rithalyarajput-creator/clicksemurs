import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const GROUPS = ['General', 'Eligibility', 'Repayment', 'Documents', 'Services', 'Other']
const blank = { question: '', answer: '', group_name: 'General', show_on_home: false, sort_order: 0 }

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const { data } = await supabase.from('faqs').select('*').order('sort_order').order('created_at')
    setFaqs(data || []); setLoading(false)
  }

  useEffect(() => { load() }, [])

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.question || !form.answer) return flash('Question and answer required.')
    if (editId) {
      await supabase.from('faqs').update(form).eq('id', editId)
      flash('Updated!')
    } else {
      await supabase.from('faqs').insert([form])
      flash('Added!')
    }
    setForm(blank); setEditId(null); load()
  }

  const del = async (id) => {
    if (!confirm('Delete?')) return
    await supabase.from('faqs').delete().eq('id', id); load()
  }

  const toggleHome = async (f) => {
    await supabase.from('faqs').update({ show_on_home: !f.show_on_home }).eq('id', f.id); load()
  }

  const inp = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: '#fff', marginBottom: 12 }
  const lbl = { display: 'block', color: '#374151', fontSize: 12, fontWeight: 600, marginBottom: 6 }

  const grouped = GROUPS.reduce((acc, g) => { acc[g] = faqs.filter(f => f.group_name === g); return acc }, {})

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>FAQs</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Manage frequently asked questions shown on the website</p>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24, alignItems: 'start' }}>
        {/* Form */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#0f172a', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{editId ? 'Edit FAQ' : 'Add FAQ'}</h2>
          <form onSubmit={submit}>
            <label style={lbl}>Question *</label>
            <input style={inp} value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} placeholder="Enter question..." required />
            <label style={lbl}>Answer *</label>
            <textarea style={{ ...inp, height: 100, resize: 'vertical' }} value={form.answer} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))} placeholder="Enter answer..." required />
            <label style={lbl}>Group</label>
            <select style={{ ...inp }} value={form.group_name} onChange={e => setForm(p => ({ ...p, group_name: e.target.value }))}>
              {GROUPS.map(g => <option key={g}>{g}</option>)}
            </select>
            <label style={lbl}>Sort Order</label>
            <input type="number" style={inp} value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: +e.target.value }))} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16, fontSize: 13, color: '#374151', fontWeight: 500 }}>
              <input type="checkbox" checked={form.show_on_home} onChange={e => setForm(p => ({ ...p, show_on_home: e.target.checked }))} />
              Show on Homepage
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={{ flex: 1, background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                {editId ? 'Update' : 'Add FAQ'}
              </button>
              {editId && <button type="button" onClick={() => { setForm(blank); setEditId(null) }} style={{ background: '#f1f5f9', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Cancel</button>}
            </div>
          </form>
        </div>

        {/* List grouped */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {GROUPS.map(g => grouped[g]?.length > 0 && (
            <div key={g} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: '#f8fafc', padding: '10px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 700, fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{g} ({grouped[g].length})</div>
              {grouped[g].map(f => (
                <div key={f.id} style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a', marginBottom: 4 }}>{f.question}</div>
                    <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{f.answer.slice(0, 100)}{f.answer.length > 100 ? '...' : ''}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
                    <button onClick={() => toggleHome(f)} style={{ background: f.show_on_home ? '#dcfce7' : '#f1f5f9', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', color: f.show_on_home ? '#16a34a' : '#64748b', fontWeight: 600 }}>
                      {f.show_on_home ? 'On Home' : 'Hidden'}
                    </button>
                    <button onClick={() => { setForm({ question: f.question, answer: f.answer, group_name: f.group_name, show_on_home: f.show_on_home, sort_order: f.sort_order }); setEditId(f.id) }}
                      style={{ background: '#eff6ff', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#2563eb' }}>✏️</button>
                    <button onClick={() => del(f.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#dc2626' }}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {faqs.length === 0 && !loading && <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 40, textAlign: 'center', color: '#94a3b8' }}>No FAQs yet. Add your first FAQ.</div>}
        </div>
      </div>
    </div>
  )
}
