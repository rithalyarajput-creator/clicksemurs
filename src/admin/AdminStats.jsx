import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const statFields = [
  { key: 'stat1_number', label: 'Counter 1 Number', placeholder: '500+' },
  { key: 'stat1_label', label: 'Counter 1 Label', placeholder: 'Clients Served' },
  { key: 'stat2_number', label: 'Counter 2 Number', placeholder: '10Cr+' },
  { key: 'stat2_label', label: 'Counter 2 Label', placeholder: 'Ad Spend Managed' },
  { key: 'stat3_number', label: 'Counter 3 Number', placeholder: '98%' },
  { key: 'stat3_label', label: 'Counter 3 Label', placeholder: 'Client Retention' },
  { key: 'stat4_number', label: 'Counter 4 Number', placeholder: '50+' },
  { key: 'stat4_label', label: 'Counter 4 Label', placeholder: 'Industries Served' },
]

export default function AdminStats() {
  const [data, setData] = useState({})
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      const obj = {}; rows?.forEach(r => { obj[r.key] = r.value }); setData(obj); setLoading(false)
    })
  }, [])

  const save = async () => {
    const upserts = statFields.map(f => ({ key: f.key, value: data[f.key] || '' }))
    await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' })
    setMsg('Stats saved!'); setTimeout(() => setMsg(''), 3000)
  }

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800 }}>Website Stats / Counters</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Update the 4 counter numbers shown on homepage</p>
        </div>
        <button onClick={save} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save Stats</button>
      </div>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[1,2,3,4].map(n => (
          <div key={n} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', marginBottom: 16 }}>Counter {n}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Number</label>
                <input style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 20, fontWeight: 800, outline: 'none', boxSizing: 'border-box', color: '#0f172a', textAlign: 'center' }}
                  value={data[`stat${n}_number`] || ''} onChange={e => setData(p => ({ ...p, [`stat${n}_number`]: e.target.value }))}
                  placeholder={statFields[(n-1)*2].placeholder} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Label</label>
                <input style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#374151' }}
                  value={data[`stat${n}_label`] || ''} onChange={e => setData(p => ({ ...p, [`stat${n}_label`]: e.target.value }))}
                  placeholder={statFields[(n-1)*2+1].placeholder} />
              </div>
            </div>
            {/* Preview */}
            <div style={{ marginTop: 14, background: '#f8fafc', borderRadius: 8, padding: '12px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>{data[`stat${n}_number`] || '—'}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{data[`stat${n}_label`] || '—'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
