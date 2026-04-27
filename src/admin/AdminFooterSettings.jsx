import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const fields = [
  { key: 'site_name', label: 'Site Name' },
  { key: 'site_logo', label: 'Logo URL' },
  { key: 'site_description', label: 'Company Description', textarea: true },
  { key: 'phone', label: 'Phone Number' },
  { key: 'whatsapp', label: 'WhatsApp Number' },
  { key: 'email', label: 'Email Address' },
  { key: 'address', label: 'Address' },
  { key: 'rbi_text', label: 'RBI / Registration Text' },
  { key: 'facebook', label: 'Facebook URL' },
  { key: 'instagram', label: 'Instagram URL' },
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'twitter', label: 'Twitter / X URL' },
  { key: 'playstore', label: 'Google Play Store URL' },
]

export default function AdminFooterSettings() {
  const [data, setData] = useState({})
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      const obj = {}; rows?.forEach(r => { obj[r.key] = r.value }); setData(obj); setLoading(false)
    })
  }, [])

  const save = async () => {
    const upserts = Object.entries(data).map(([key, value]) => ({ key, value }))
    await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' })
    setMsg('Saved!'); setTimeout(() => setMsg(''), 3000)
  }

  const inp = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: '#fff' }

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800 }}>Footer Settings</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Update contact info, social links, and footer content</p>
        </div>
        <button onClick={save} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save Changes</button>
      </div>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {fields.map(f => (
          <div key={f.key} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18, gridColumn: f.textarea ? 'span 2' : 'span 1' }}>
            <label style={{ display: 'block', color: '#374151', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{f.label}</label>
            {f.textarea
              ? <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={data[f.key] || ''} onChange={e => setData(p => ({ ...p, [f.key]: e.target.value }))} />
              : <input style={inp} value={data[f.key] || ''} onChange={e => setData(p => ({ ...p, [f.key]: e.target.value }))} />
            }
          </div>
        ))}
      </div>
    </div>
  )
}
