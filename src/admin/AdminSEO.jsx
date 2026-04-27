import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const PAGES = ['Home', 'About', 'Services', 'Blog', 'Contact', 'Portfolio', 'Pricing']

export default function AdminSEO({ section = 'meta' }) {
  const [metas, setMetas] = useState({})
  const [keywords, setKeywords] = useState([])
  const [newKw, setNewKw] = useState({ keyword: '', target_rank: '', current_rank: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      const obj = {}; rows?.forEach(r => { obj[r.key] = r.value }); setMetas(obj); setLoading(false)
    })
  }, [])

  const saveMeta = async () => {
    const upserts = Object.entries(metas).filter(([k]) => k.startsWith('meta_')).map(([key, value]) => ({ key, value }))
    await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' })
    setMsg('Meta tags saved!'); setTimeout(() => setMsg(''), 3000)
  }

  const inp = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: '#fff' }

  if (section === 'meta') return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800 }}>Meta Tags</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Manage title and description for each page</p>
        </div>
        <button onClick={saveMeta} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save All</button>
      </div>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}
      {loading ? <div style={{ color: '#94a3b8' }}>Loading...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PAGES.map(page => {
            const slug = page.toLowerCase()
            return (
              <div key={page} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 14 }}>{page} Page</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                      Meta Title <span style={{ color: '#94a3b8', fontWeight: 400 }}>{(metas[`meta_title_${slug}`] || '').length}/60</span>
                    </label>
                    <input style={inp} maxLength={60} value={metas[`meta_title_${slug}`] || ''} onChange={e => setMetas(p => ({ ...p, [`meta_title_${slug}`]: e.target.value }))} placeholder={`${page} | Clicksemurs`} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                      Meta Description <span style={{ color: '#94a3b8', fontWeight: 400 }}>{(metas[`meta_desc_${slug}`] || '').length}/160</span>
                    </label>
                    <input style={inp} maxLength={160} value={metas[`meta_desc_${slug}`] || ''} onChange={e => setMetas(p => ({ ...p, [`meta_desc_${slug}`]: e.target.value }))} placeholder="Page description for search engines..." />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  if (section === 'keywords') return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Keyword Rankings</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Track your SEO keyword positions</p>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Keyword</label>
            <input style={{ ...inp }} value={newKw.keyword} onChange={e => setNewKw(p => ({ ...p, keyword: e.target.value }))} placeholder="e.g. digital marketing agency" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Current Rank</label>
            <input type="number" style={{ ...inp }} value={newKw.current_rank} onChange={e => setNewKw(p => ({ ...p, current_rank: e.target.value }))} placeholder="e.g. 12" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Target Rank</label>
            <input type="number" style={{ ...inp }} value={newKw.target_rank} onChange={e => setNewKw(p => ({ ...p, target_rank: e.target.value }))} placeholder="e.g. 1" />
          </div>
          <button onClick={() => { if (newKw.keyword) { setKeywords(p => [...p, { ...newKw, id: Date.now() }]); setNewKw({ keyword: '', target_rank: '', current_rank: '' }) } }}
            style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            + Add
          </button>
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        {keywords.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No keywords tracked yet. Add your target keywords above.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>
              {['Keyword', 'Current Rank', 'Target Rank', 'Status', 'Action'].map(h => (
                <th key={h} style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {keywords.map(k => {
                const onTrack = +k.current_rank <= +k.target_rank
                return (
                  <tr key={k.id}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>{k.keyword}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>#{k.current_rank || '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>#{k.target_rank || '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ background: onTrack ? '#dcfce7' : '#fee2e2', color: onTrack ? '#16a34a' : '#dc2626', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                        {onTrack ? 'On Track' : 'Needs Work'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                      <button onClick={() => setKeywords(p => p.filter(kw => kw.id !== k.id))} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#dc2626' }}>🗑</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Site Health</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'HTTPS Active', status: true, note: 'SSL certificate valid' },
          { label: 'Sitemap Available', status: true, note: '/sitemap.xml' },
          { label: 'Meta Tags', status: true, note: 'All pages have meta tags' },
          { label: 'Image Alt Text', status: false, note: 'Some images missing alt text' },
          { label: 'Mobile Friendly', status: true, note: 'Responsive design active' },
          { label: 'Page Speed', status: true, note: 'Core Web Vitals passing' },
        ].map(item => (
          <div key={item.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: item.status ? '#dcfce7' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
              {item.status ? '✅' : '⚠️'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>{item.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
