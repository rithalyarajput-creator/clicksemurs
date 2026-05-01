import { useState, useEffect } from 'react'
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { supabase } from '../admin/supabase'

const serviceOptions = [
  'Social Media Marketing',
  'SEO (Search Engine Optimization)',
  'PPC / Paid Ads',
  'Website Design & Development',
  'Content Marketing',
  'Video Marketing & Production',
  'Email Marketing & Automation',
  'Online Reputation Management',
  'Influencer Marketing',
  'Analytics & Performance Marketing',
  'Full 360° Package',
  'Not Sure — Need Consultation',
]

const DEFAULTS = {
  email: 'clicksemurs@gmail.com',
  phone: '+91 96503 03312 / +91 92175 94664',
  whatsapp: '919650303312',
  address: '',
  support_hours: 'Monday - Saturday, 10 AM to 7 PM',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState(DEFAULTS)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      if (!rows) return
      const obj = { ...DEFAULTS }
      rows.forEach(r => { if (r.value) obj[r.key] = r.value })
      setInfo(obj)
    })
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('leads').insert([{
      name: form.name, email: form.email, phone: form.phone,
      service: form.service, message: form.message, is_read: false
    }])
    if (error) setStatus('error')
    else { setStatus('success'); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }
    setLoading(false)
  }

  const fieldStyle = {
    width: '100%',
    background: '#fff',
    border: '1.5px solid #e8ecf0',
    borderRadius: 10,
    padding: '11px 14px 11px 40px',
    fontSize: 14,
    color: '#1a1a1a',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: "'DM Sans', sans-serif",
  }

  const fieldNoIconStyle = {
    ...fieldStyle,
    paddingLeft: 14,
  }

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#1a1a1a',
    marginBottom: 6,
  }

  const iconWrap = {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#aab',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <div style={{ background: '#f5f6fa', minHeight: '100vh' }}>
      <style>{`
        .cf:focus { border-color: #c8892a !important; box-shadow: 0 0 0 3px rgba(200,137,42,0.1) !important; }
        .cf::placeholder { color: #bbbcc8; }
        .cf option { background: #fff; color: #1a1a1a; }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .contact-name-row { grid-template-columns: 1fr !important; }
          .contact-wrap { padding: 100px 16px 48px !important; }
        }
      `}</style>

      <div className="contact-wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 24px 72px' }}>

        {/* Page title */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, color: '#1a1a1a', marginBottom: 10, letterSpacing: '-0.02em' }}>
            Contact Us
          </h1>
          <p style={{ color: '#888', fontSize: 15, maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
            We're here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>

          {/* ── LEFT: Form card ── */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '36px 40px', boxShadow: '0 2px 24px rgba(0,0,0,0.07)', border: '1px solid #ececec' }}>

            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff8ee', border: '1px solid #f5e0b8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </div>
              <div>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>Send us a message</h2>
                <p style={{ color: '#999', fontSize: 13, lineHeight: 1.5, maxWidth: 380 }}>
                  Do you have a question? A complaint? Or need any help to choose the right product from Clicksemurs. Feel free to contact us
                </p>
              </div>
            </div>

            {status === 'success' && (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#15803d', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14, fontWeight: 500 }}>
                Thank you! We've received your message and will be in touch shortly.
              </div>
            )}
            {status === 'error' && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
                Something went wrong. Please email us at {info.email}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Name + Email row */}
              <div className="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <div style={{ position: 'relative' }}>
                    <span style={iconWrap}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input className="cf" style={fieldStyle} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your first name" required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <div style={{ position: 'relative' }}>
                    <span style={iconWrap}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input className="cf" style={fieldStyle} type="text" placeholder="Enter your last name" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email</label>
                <div style={{ position: 'relative' }}>
                  <span style={iconWrap}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <input className="cf" style={fieldStyle} type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
              </div>

              {/* Phone + Service row */}
              <div className="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Contact Details</label>
                  <div style={{ position: 'relative' }}>
                    <span style={iconWrap}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <input className="cf" style={fieldStyle} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your contact number" required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Service Interested In</label>
                  <select className="cf" style={fieldNoIconStyle} name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea className="cf" style={{ ...fieldNoIconStyle, height: 120, resize: 'vertical' }} name="message" value={form.message} onChange={handleChange} placeholder="Enter your message" required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" disabled={loading} style={{
                  background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 10,
                  padding: '13px 28px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                  fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = loading ? '0.7' : '1' }}>
                  {loading ? 'Sending...' : 'Send a Message'} →
                </button>
              </div>
            </form>
          </div>

          {/* ── RIGHT: Info panel ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* "Hi! We are always here" card */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '28px 28px', boxShadow: '0 2px 24px rgba(0,0,0,0.07)', border: '1px solid #ececec' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 24 }}>
                Hi! We are always{' '}
                <span style={{ color: '#c8892a' }}>here</span>
                <br />to help you.
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Hotline */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#f8f9fb', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: '1px solid #ece8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <FaPhone size={14} color="#7c6af7" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>Hotline:</div>
                    {info.phone.split('/').map((num, i) => (
                      <a key={i} href={`tel:${num.trim().replace(/\s/g, '')}`}
                        style={{ fontSize: 13, color: '#555', textDecoration: 'none', display: 'block', lineHeight: 1.5 }}
                        onMouseEnter={e => e.currentTarget.style.color = '#c8892a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                        {num.trim()}
                      </a>
                    ))}
                  </div>
                </div>

                {/* SMS / WhatsApp */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#f8f9fb', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: '1px solid #d4f5e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <FaWhatsapp size={16} color="#25D366" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>SMS / Whatsapp</div>
                    <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                      onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                      {info.phone.split('/')[0].trim()}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#f8f9fb', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: '1px solid #fde8c8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <FaEnvelope size={14} color="#c8892a" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>Email:</div>
                    <a href={`mailto:${info.email}`}
                      style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#c8892a'}
                      onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                      {info.email}
                    </a>
                  </div>
                </div>

                {info.address && info.address.trim() !== '' && info.address !== 'India' && (
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#f8f9fb', borderRadius: 12, padding: '14px 16px' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: '1px solid #fde8c8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <FaMapMarkerAlt size={14} color="#c8892a" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>Address:</div>
                      <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{info.address}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Connect with us */}
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Connect with us</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { href: 'https://facebook.com', color: '#1877F2', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                    { href: 'https://instagram.com', color: '#E1306C', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                    { href: `https://wa.me/${info.whatsapp}`, color: '#25D366', icon: <FaWhatsapp size={14} /> },
                    { href: 'https://youtube.com', color: '#FF0000', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg> },
                    { href: 'https://twitter.com', color: '#1DA1F2', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ width: 34, height: 34, borderRadius: 8, background: '#f0f1f5', border: '1px solid #e8eaee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', textDecoration: 'none', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = s.color }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#f0f1f5'; e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#e8eaee' }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Why work with us stats */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #ececec' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Why work with us</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { num: '500+', label: 'Projects delivered' },
                  { num: '98%', label: 'Client retention rate' },
                  { num: '5x', label: 'Average client ROI' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <span style={{ fontSize: 13, color: '#777' }}>{item.label}</span>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 800, color: '#c8892a' }}>{item.num}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
