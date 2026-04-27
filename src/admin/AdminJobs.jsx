import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const DEPTS = ['Engineering', 'Marketing', 'Sales', 'Design', 'Operations', 'Finance', 'HR', 'Other']
const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
const blank = { title: '', department: 'Marketing', location: '', salary: '', type: 'Full-time', description: '', requirements: '', is_active: true }

export default function AdminJobs() {
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
    setJobs(data || []); setLoading(false)
  }

  useEffect(() => { load() }, [])

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title) return flash('Title required.')
    if (editId) {
      await supabase.from('jobs').update(form).eq('id', editId); flash('Updated!')
    } else {
      await supabase.from('jobs').insert([form]); flash('Job posted!')
    }
    setForm(blank); setEditId(null); load()
  }

  const del = async (id) => {
    if (!confirm('Delete?')) return
    await supabase.from('jobs').delete().eq('id', id); load()
  }

  const toggleActive = async (j) => {
    await supabase.from('jobs').update({ is_active: !j.is_active }).eq('id', j.id); load()
  }

  const inp = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: '#fff', marginBottom: 12 }
  const lbl = { display: 'block', color: '#374151', fontSize: 12, fontWeight: 600, marginBottom: 6 }

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Job Postings</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Create and manage career opportunities</p>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#0f172a', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{editId ? 'Edit Job' : 'Post New Job'}</h2>
          <form onSubmit={submit}>
            <label style={lbl}>Job Title *</label>
            <input style={inp} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. SEO Executive" required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={lbl}>Department</label>
                <select style={inp} value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))}>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Type</label>
                <select style={inp} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <label style={lbl}>Location</label>
            <input style={inp} value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="Mumbai / Remote" />
            <label style={lbl}>Salary Range</label>
            <input style={inp} value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} placeholder="e.g. ₹3–5 LPA" />
            <label style={lbl}>Job Description</label>
            <textarea style={{ ...inp, height: 100, resize: 'vertical' }} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Role overview, responsibilities..." />
            <label style={lbl}>Requirements</label>
            <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} placeholder="Skills, experience needed..." />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16, fontSize: 13, color: '#374151', fontWeight: 500 }}>
              <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} />
              Active (visible on website)
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={{ flex: 1, background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{editId ? 'Update' : 'Post Job'}</button>
              {editId && <button type="button" onClick={() => { setForm(blank); setEditId(null) }} style={{ background: '#f1f5f9', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 700, fontSize: 15, color: '#0f172a' }}>All Jobs ({jobs.length})</div>
          {loading ? <div style={{ padding: 24, color: '#94a3b8' }}>Loading...</div> : jobs.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No jobs posted yet.</div>
          ) : jobs.map(j => (
            <div key={j.id} style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{j.title}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>
                  {j.department} · {j.type} · {j.location || 'Location TBD'} · {j.salary || 'Salary TBD'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ background: j.is_active ? '#dcfce7' : '#f1f5f9', color: j.is_active ? '#16a34a' : '#64748b', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{j.is_active ? 'Active' : 'Inactive'}</span>
                <button onClick={() => toggleActive(j)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', color: '#64748b' }}>Toggle</button>
                <button onClick={() => { setForm({ title: j.title, department: j.department, location: j.location || '', salary: j.salary || '', type: j.type, description: j.description || '', requirements: j.requirements || '', is_active: j.is_active }); setEditId(j.id) }}
                  style={{ background: '#eff6ff', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#2563eb', display: 'flex', alignItems: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={() => del(j.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
