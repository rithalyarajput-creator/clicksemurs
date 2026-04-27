import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const PAGES = [
  { slug: 'about', title: 'About Us' },
  { slug: 'contact', title: 'Contact Page' },
  { slug: 'privacy-policy', title: 'Privacy Policy' },
  { slug: 'terms-conditions', title: 'Terms & Conditions' },
  { slug: 'rate-terms', title: 'Rate & Terms' },
]

export default function AdminCMSPages() {
  const [pages, setPages] = useState({})
  const [active, setActive] = useState('about')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('cms_pages').select('*').then(({ data }) => {
      const obj = {}; data?.forEach(p => { obj[p.page_slug] = p }); setPages(obj); setLoading(false)
    })
  }, [])

  const save = async () => {
    const current = pages[active] || {}
    await supabase.from('cms_pages').upsert({ page_slug: active, page_title: PAGES.find(p => p.slug === active)?.title, content: current.content || '', updated_at: new Date().toISOString() }, { onConflict: 'page_slug' })
    setMsg('Page saved!'); setTimeout(() => setMsg(''), 3000)
  }

  const currentPage = PAGES.find(p => p.slug === active)
  const content = pages[active]?.content || ''

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800 }}>CMS Pages</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Edit website page content directly</p>
        </div>
        <button onClick={save} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save Page</button>
      </div>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
          {PAGES.map(p => (
            <button key={p.slug} onClick={() => setActive(p.slug)} style={{
              display: 'block', width: '100%', padding: '12px 16px', textAlign: 'left', background: active === p.slug ? '#eff6ff' : 'transparent',
              border: 'none', borderLeft: active === p.slug ? '3px solid #3b82f6' : '3px solid transparent',
              color: active === p.slug ? '#1d4ed8' : '#374151', fontSize: 13, fontWeight: active === p.slug ? 600 : 400, cursor: 'pointer',
              borderBottom: '1px solid #f1f5f9'
            }}>
              {p.title}
            </button>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', marginBottom: 16 }}>{currentPage?.title}</div>
          {loading ? <div style={{ color: '#94a3b8' }}>Loading...</div> : (
            <textarea
              style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b', minHeight: 400, resize: 'vertical', lineHeight: 1.7, fontFamily: 'inherit' }}
              value={content}
              onChange={e => setPages(p => ({ ...p, [active]: { ...p[active], content: e.target.value } }))}
              placeholder="Enter page content here... You can use HTML tags for formatting."
            />
          )}
        </div>
      </div>
    </div>
  )
}
