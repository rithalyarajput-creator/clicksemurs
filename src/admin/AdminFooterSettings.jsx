import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const SECTIONS = [
  {
    title: 'Company Info',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    fields: [
      { key: 'company_description', label: 'Company Description (below logo)', textarea: true },
      { key: 'copyright_text', label: 'Copyright Text (bottom bar)', placeholder: '© 2025 Clicksemurs. All Rights Reserved.' },
      { key: 'tagline', label: 'Tagline (bottom bar after |)', placeholder: 'Grow. Dominate. Lead.' },
    ]
  },
  {
    title: 'Contact Details',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    fields: [
      { key: 'email', label: 'Email Address', placeholder: 'hello@clicksemurs.com' },
      { key: 'phone', label: 'Phone / Customer Support Number', placeholder: '+91 XXXXX XXXXX' },
      { key: 'whatsapp', label: 'WhatsApp Number (with country code, no +)', placeholder: '919XXXXXXXXX' },
      { key: 'address', label: 'Full Office Address', placeholder: 'B-76, 2nd Floor, Wazirpur Industrial Area, Delhi 110052' },
      { key: 'support_hours', label: 'Support Hours', placeholder: 'Monday - Saturday, 10 AM to 7 PM' },
      { key: 'maps_link', label: 'Google Maps Link (View on Maps button)', placeholder: 'https://maps.google.com/?q=...' },
      { key: 'maps_embed', label: 'Google Maps Embed Code (paste full <iframe> tag)', textarea: true, placeholder: '<iframe src="https://www.google.com/maps/embed?..." ...></iframe>' },
    ]
  },
  {
    title: 'Social Media Links',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    fields: [
      { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/yourpage' },
      { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/yourpage' },
      { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/yourpage' },
      { key: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/@yourchannel' },
      { key: 'twitter', label: 'Twitter / X URL', placeholder: 'https://twitter.com/yourhandle' },
    ]
  },
]

export default function AdminFooterSettings() {
  const [data, setData] = useState({})
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      const obj = {}
      rows?.forEach(r => { obj[r.key] = r.value })
      setData(obj)
      setLoading(false)
    })
  }, [])

  const save = async () => {
    const upserts = Object.entries(data).map(([key, value]) => ({ key, value: value || '' }))
    const { error } = await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' })
    if (error) {
      setMsg('Error: ' + error.message); setMsgType('error')
    } else {
      setMsg('Saved successfully!'); setMsgType('success')
    }
    setTimeout(() => setMsg(''), 3000)
  }

  const inp = {
    width: '100%', border: '1px solid #e2e8f0', borderRadius: 8,
    padding: '9px 14px', fontSize: 14, outline: 'none',
    boxSizing: 'border-box', color: '#0f172a', background: '#fff'
  }
  const lbl = { display: 'block', color: '#374151', fontSize: 12, fontWeight: 600, marginBottom: 6 }

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Footer Settings</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>All changes reflect live on the website footer</p>
        </div>
        <button onClick={save} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 28px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          Save Changes
        </button>
      </div>

      {msg && (
        <div style={{
          background: msgType === 'error' ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`,
          color: msgType === 'error' ? '#dc2626' : '#16a34a',
          padding: '10px 16px', borderRadius: 8, marginBottom: 20, fontSize: 13
        }}>{msg}</div>
      )}

      {/* Preview banner */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '12px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span style={{ color: '#1d4ed8', fontSize: 13 }}>Fill in your details below and click <strong>Save Changes</strong> — updates appear instantly on your website footer.</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {SECTIONS.map(section => (
          <div key={section.title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
            {/* Section header */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc' }}>
              <span style={{ color: '#475569' }}>{section.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{section.title}</span>
            </div>
            {/* Fields */}
            <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {section.fields.map(f => (
                <div key={f.key} style={{ gridColumn: f.textarea ? 'span 2' : 'span 1' }}>
                  <label style={lbl}>{f.label}</label>
                  {f.textarea
                    ? <textarea style={{ ...inp, height: 80, resize: 'vertical' }}
                        value={data[f.key] || ''}
                        onChange={e => setData(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder || ''} />
                    : <input style={inp}
                        value={data[f.key] || ''}
                        onChange={e => setData(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder || ''} />
                  }
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={save} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          Save All Changes
        </button>
      </div>
    </div>
  )
}
