import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const blank = { client_name: '', company: '', review: '', rating: 5, is_active: true }

function Avatar({ name }) {
  const letter = (name || '?')[0].toUpperCase()
  const colors = ['#0f172a', '#1d4ed8', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626']
  const color = colors[letter.charCodeAt(0) % colors.length]
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%', background: color,
      color: '#fff', fontWeight: 800, fontSize: 18, display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>{letter}</div>
  )
}

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const load = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3000) }

  const openAdd = () => { setForm(blank); setEditId(null); setShowModal(true) }
  const openEdit = (t) => {
    setForm({ client_name: t.client_name, company: t.company || '', review: t.review, rating: t.rating, is_active: t.is_active !== false })
    setEditId(t.id)
    setShowModal(true)
  }
  const closeModal = () => { setShowModal(false); setForm(blank); setEditId(null) }

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
    closeModal(); load()
  }

  const toggleActive = async (t) => {
    await supabase.from('testimonials').update({ is_active: !t.is_active }).eq('id', t.id)
    load()
  }

  const deleteItem = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    flash('Deleted.'); load()
  }

  const total = items.length
  const active = items.filter(i => i.is_active !== false).length
  const hidden = total - active

  const inp = {
    width: '100%', border: '1px solid #e2e8f0', borderRadius: 8,
    padding: '9px 14px', fontSize: 14, outline: 'none',
    boxSizing: 'border-box', color: '#0f172a', background: '#fff', marginBottom: 14
  }
  const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Testimonials</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Manage client reviews shown on the homepage</p>
        </div>
        <button onClick={openAdd} style={{
          background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8,
          padding: '11px 22px', fontWeight: 700, fontSize: 13, cursor: 'pointer'
        }}>+ Add Testimonial</button>
      </div>

      {msg && (
        <div style={{
          background: msgType === 'error' ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`,
          color: msgType === 'error' ? '#dc2626' : '#16a34a',
          padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13
        }}>{msg}</div>
      )}

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {[{ label: 'Total', val: total }, { label: 'Active', val: active }, { label: 'Hidden', val: hidden }].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 28px', minWidth: 100 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a' }}>{s.val}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      {items.length === 0 ? (
        <div style={{ background: '#fff', border: '2px dashed #e2e8f0', borderRadius: 12, padding: 60, textAlign: 'center', color: '#94a3b8' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: '#94a3b8' }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>No testimonials yet</div>
          <div style={{ fontSize: 13 }}>Click "+ Add Testimonial" to add your first one</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {items.map(t => (
            <div key={t.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column' }}>
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <Avatar name={t.client_name} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{t.client_name}</div>
                  {t.company && <div style={{ fontSize: 12, color: '#64748b', marginTop: 1 }}>{t.company}</div>}
                </div>
                <span
                  onClick={() => toggleActive(t)}
                  title="Click to toggle"
                  style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, cursor: 'pointer',
                    background: t.is_active !== false ? '#dcfce7' : '#f1f5f9',
                    color: t.is_active !== false ? '#16a34a' : '#94a3b8',
                    border: `1px solid ${t.is_active !== false ? '#86efac' : '#e2e8f0'}`
                  }}>
                  {t.is_active !== false ? 'Active' : 'Hidden'}
                </span>
              </div>

              {/* Review */}
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, flex: 1, marginBottom: 14 }}>
                "{t.review}"
              </p>

              {/* Bottom row: stars + actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: '#F4A100', fontSize: 18 }}>
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => openEdit(t)} title="Edit" style={{
                    width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0',
                    background: '#f8fafc', cursor: 'pointer', color: '#374151',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                  <button onClick={() => deleteItem(t.id)} title="Delete" style={{
                    width: 32, height: 32, borderRadius: 8, border: '1px solid #fecaca',
                    background: '#fef2f2', cursor: 'pointer', color: '#dc2626',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={e => e.target === e.currentTarget && closeModal()}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: 32, width: '100%',
            maxWidth: 500, maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ color: '#0f172a', fontSize: 18, fontWeight: 800 }}>
                {editId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button onClick={closeModal} style={{
                background: '#f1f5f9', border: 'none', borderRadius: 8,
                width: 32, height: 32, fontSize: 16, cursor: 'pointer', color: '#64748b'
              }}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <label style={lbl}>Client Name *</label>
              <input style={inp} value={form.client_name}
                onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
                placeholder="e.g. Rahul Sharma" required />

              <label style={lbl}>Company / Role</label>
              <input style={inp} value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                placeholder="e.g. CEO, TechSpark Solutions" />

              <label style={lbl}>Review *</label>
              <textarea style={{ ...inp, height: 120, resize: 'vertical' }}
                value={form.review}
                onChange={e => setForm(f => ({ ...f, review: e.target.value }))}
                placeholder="Write the client review here..." required />

              <label style={lbl}>Rating</label>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map(r => (
                  <button key={r} type="button"
                    onClick={() => setForm(f => ({ ...f, rating: r }))}
                    style={{
                      width: 42, height: 42, borderRadius: 8,
                      border: `2px solid ${form.rating >= r ? '#F4A100' : '#e2e8f0'}`,
                      background: form.rating >= r ? '#FFF9E6' : '#f8fafc',
                      fontSize: 22, cursor: 'pointer'
                    }}>
                    {form.rating >= r ? '★' : '☆'}
                  </button>
                ))}
              </div>

              <label style={{ ...lbl, marginBottom: 12 }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                  style={{ marginRight: 8 }} />
                Show on website (Active)
              </label>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button type="submit" style={{
                  flex: 1, background: '#0f172a', color: '#fff', border: 'none',
                  borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 14, cursor: 'pointer'
                }}>{editId ? 'Update' : 'Add Testimonial'}</button>
                <button type="button" onClick={closeModal} style={{
                  background: '#f1f5f9', color: '#374151', border: '1px solid #e2e8f0',
                  borderRadius: 8, padding: '12px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer'
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
