import { useEffect, useState, useRef } from 'react'
import { supabase } from './supabase'

export default function AdminMediaLibrary() {
  const [media, setMedia] = useState([])
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(null)
  const fileRef = useRef(null)

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3000) }

  const load = async () => {
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false })
    setMedia(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  // Upload file to Supabase Storage
  const uploadFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `blog-${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file, { upsert: true })
    if (error) {
      flash('Upload failed: ' + error.message, 'error')
      setUploading(false)
      return
    }
    const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName)
    // Auto save to media table
    await supabase.from('media').insert([{ url: publicUrl, alt_text: file.name.replace(/\.[^.]+$/, '') }])
    flash('Image uploaded!')
    setUploading(false)
    fileRef.current.value = ''
    load()
  }

  const addUrl = async (e) => {
    e.preventDefault()
    if (!url) return
    await supabase.from('media').insert([{ url, alt_text: alt }])
    flash('Added!')
    setUrl(''); setAlt('')
    load()
  }

  const del = async (id) => {
    if (!confirm('Remove from library?')) return
    await supabase.from('media').delete().eq('id', id)
    setMedia(p => p.filter(m => m.id !== id))
  }

  const copy = (imgUrl) => {
    navigator.clipboard.writeText(imgUrl)
    setCopied(imgUrl); setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Media Library</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Upload images from desktop or add by URL</p>
      {msg && <div style={{ background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      {/* Upload from Desktop */}
      <div style={{ background: '#fff', border: '2px dashed #e2e8f0', borderRadius: 12, padding: 28, marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🖼️</div>
        <div style={{ color: '#0f172a', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Upload from Desktop</div>
        <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 16 }}>JPG, PNG, WEBP supported -- auto saves to library</div>
        <input ref={fileRef} type="file" accept="image/*" onChange={uploadFile} style={{ display: 'none' }} id="file-upload" />
        <label htmlFor="file-upload" style={{ display: 'inline-block', background: '#0f172a', color: '#fff', padding: '10px 28px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1 }}>
          {uploading ? 'Uploading...' : 'Choose Image'}
        </label>
      </div>

      {/* Add by URL */}
      <form onSubmit={addUrl} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Or Add by URL</label>
          <input style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#0f172a' }}
            value={url} onChange={e => setUrl(e.target.value)} placeholder="https://... or /blog1.png" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Alt Text (SEO)</label>
          <input style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#0f172a' }}
            value={alt} onChange={e => setAlt(e.target.value)} placeholder="Describe the image..." />
        </div>
        <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>Add URL</button>
      </form>

      {/* Grid */}
      {loading ? <div style={{ color: '#94a3b8' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {media.length === 0 ? (
            <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: 40, color: '#94a3b8', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>No images yet. Upload one above.</div>
          ) : media.map(m => (
            <div key={m.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
              <img src={m.url} alt={m.alt_text || ''} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.background = '#f1f5f9'; e.target.style.display = 'none' }} />
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{m.alt_text || 'No alt text'}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => copy(m.url)} style={{ flex: 1, background: copied === m.url ? '#dcfce7' : '#f1f5f9', border: 'none', borderRadius: 6, padding: '5px 8px', fontSize: 11, cursor: 'pointer', color: copied === m.url ? '#16a34a' : '#374151', fontWeight: 600 }}>
                    {copied === m.url ? '✓ Copied!' : 'Copy URL'}
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
