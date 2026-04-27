import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function AdminMediaLibrary() {
  const [media, setMedia] = useState([])
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    supabase.from('media').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setMedia(data || []); setLoading(false) })
  }, [])

  const add = async (e) => {
    e.preventDefault()
    if (!url) return
    await supabase.from('media').insert([{ url, alt_text: alt }])
    setMsg('Added!'); setTimeout(() => setMsg(''), 3000)
    setUrl(''); setAlt('')
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false })
    setMedia(data || [])
  }

  const del = async (id) => {
    if (!confirm('Remove from library?')) return
    await supabase.from('media').delete().eq('id', id)
    setMedia(p => p.filter(m => m.id !== id))
  }

  const copy = (url) => {
    navigator.clipboard.writeText(url)
    setCopied(url); setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Media Library</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Add image URLs, set alt text, copy links</p>
      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <form onSubmit={add} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Image URL *</label>
          <input style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            value={url} onChange={e => setUrl(e.target.value)} placeholder="https://... or /blog1.png" required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Alt Text (SEO)</label>
          <input style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            value={alt} onChange={e => setAlt(e.target.value)} placeholder="Describe the image..." />
        </div>
        <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>Add Image</button>
      </form>

      {loading ? <div style={{ color: '#94a3b8' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {media.length === 0 ? (
            <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: 40, color: '#94a3b8', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>No images yet.</div>
          ) : media.map(m => (
            <div key={m.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
              <img src={m.url} alt={m.alt_text || ''} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none' }} />
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.alt_text || 'No alt text'}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => copy(m.url)} style={{ flex: 1, background: copied === m.url ? '#dcfce7' : '#f1f5f9', border: 'none', borderRadius: 6, padding: '5px 8px', fontSize: 11, cursor: 'pointer', color: copied === m.url ? '#16a34a' : '#374151', fontWeight: 600 }}>
                    {copied === m.url ? 'Copied!' : 'Copy URL'}
                  </button>
                  <button onClick={() => del(m.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: 6, padding: '5px 8px', fontSize: 11, cursor: 'pointer', color: '#dc2626' }}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
