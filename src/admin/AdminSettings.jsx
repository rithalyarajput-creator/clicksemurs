import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const FIELDS = [
  { key: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', group: 'contact' },
  { key: 'email', label: 'Email Address', placeholder: 'hello@clicksemurs.com', group: 'contact' },
  { key: 'address', label: 'Office Address', placeholder: 'India', group: 'contact', textarea: true },
  { key: 'whatsapp', label: 'WhatsApp Number (with country code)', placeholder: '91XXXXXXXXXX', group: 'contact' },
  { key: 'facebook', label: 'Facebook URL', placeholder: 'https://...', group: 'social' },
  { key: 'instagram', label: 'Instagram URL', placeholder: 'https://...', group: 'social' },
  { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://...', group: 'social' },
  { key: 'youtube', label: 'YouTube URL', placeholder: 'https://...', group: 'social' },
  { key: 'twitter', label: 'Twitter/X URL', placeholder: 'https://...', group: 'social' },
]

export default function AdminSettings() {
  const [settings, setSettings] = useState({})
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('settings').select('*').then(({ data }) => {
      const s = {}
      ;(data || []).forEach(r => { s[r.setting_key] = r.setting_value })
      setSettings(s)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const upserts = FIELDS.map(f => ({ setting_key: f.key, setting_value: settings[f.key] || '' }))
    await supabase.from('settings').upsert(upserts, { onConflict: 'setting_key' })
    setMsg('Settings saved!')
    setTimeout(() => setMsg(''), 3000)
  }

  const inp = { display: 'block', width: '100%', background: '#111', border: '1px solid #2E2E2E', color: '#fff', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box', marginBottom: 14 }
  const lbl = { display: 'block', color: '#aaa', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }

  if (loading) return <div style={{ color: '#777', padding: 40 }}>Loading...</div>

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Settings</h1>
      {msg && <div style={{ background: '#0a1a0a', border: '1px solid #166534', color: '#4ade80', padding: '10px 16px', marginBottom: 16, fontSize: 13 }}>{msg}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: 24 }}>
            <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Contact Information</h2>
            {FIELDS.filter(f => f.group === 'contact').map(f => (
              <div key={f.key}>
                <label style={lbl}>{f.label}</label>
                {f.textarea ? (
                  <textarea style={{ ...inp, height: 80 }} value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                ) : (
                  <input style={inp} value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                )}
              </div>
            ))}
          </div>
          <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: 24 }}>
            <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Social Media Links</h2>
            {FIELDS.filter(f => f.group === 'social').map(f => (
              <div key={f.key}>
                <label style={lbl}>{f.label}</label>
                <input style={inp} value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder} />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" style={{ background: '#fff', color: '#111', padding: '12px 28px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Save Settings →</button>
      </form>
    </div>
  )
}
