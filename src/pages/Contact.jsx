import { useState, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
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
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
    padding: '12px 16px', fontSize: 14, color: '#fefaef',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
    fontFamily: "'DM Sans', sans-serif",
  }

  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 600,
    color: 'rgba(255,255,255,0.5)', marginBottom: 6,
    letterSpacing: '0.06em', textTransform: 'uppercase',
  }

  return (
    <div style={{ background: '#fefaef', minHeight: '100vh' }}>
      <style>{`
        .contact-field:focus { border-color: #c8892a !important; }
        .contact-field::placeholder { color: rgba(255,255,255,0.25); }
        .contact-field option { background: #1a1a1a; color: #fefaef; }
        @media (max-width: 860px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .contact-name-row { grid-template-columns: 1fr !important; }
          .contact-hero-pad { padding: 100px 20px 48px !important; }
          .contact-body-pad { padding: 32px 16px !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="contact-hero-pad" style={{ background: '#1a1a1a', padding: '120px 48px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,137,42,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,137,42,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,137,42,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c8892a', display: 'block', marginBottom: 14 }}>Get In Touch</span>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 800, color: '#fefaef', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 600 }}>
            Let's Build Something<br /><em style={{ fontStyle: 'normal', color: '#c8892a' }}>Remarkable.</em>
          </h1>
          <p style={{ color: '#aaaaaa', fontSize: 16, maxWidth: 480, lineHeight: 1.7 }}>
            Ready to grow your brand? Get your free digital marketing audit today — no commitment, just clarity.
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="contact-body-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 48px 80px' }}>
        <div className="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>

          {/* ── LEFT: Form ── */}
          <div style={{ background: '#1a1a1a', borderRadius: 20, padding: '40px 44px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 24, fontWeight: 700, color: '#fefaef', marginBottom: 6 }}>Send Us a Message</h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginBottom: 32 }}>We respond within 24 hours.</p>

            {status === 'success' && (
              <div style={{ background: 'rgba(74,158,133,0.12)', border: '1px solid rgba(74,158,133,0.3)', color: '#4a9e85', padding: '14px 18px', borderRadius: 10, marginBottom: 24, fontSize: 14, fontWeight: 500 }}>
                Thank you! We've received your message and will be in touch shortly.
              </div>
            )}
            {status === 'error' && (
              <div style={{ background: 'rgba(212,96,58,0.1)', border: '1px solid rgba(212,96,58,0.3)', color: '#d4603a', padding: '14px 18px', borderRadius: 10, marginBottom: 24, fontSize: 14 }}>
                Something went wrong. Please email us at {info.email}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Full Name <span style={{ color: '#c8892a' }}>*</span></label>
                  <input className="contact-field" style={fieldStyle} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                </div>
                <div>
                  <label style={labelStyle}>Email Address <span style={{ color: '#c8892a' }}>*</span></label>
                  <input className="contact-field" style={fieldStyle} type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Mobile Number <span style={{ color: '#c8892a' }}>*</span></label>
                <input className="contact-field" style={fieldStyle} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" required />
              </div>

              <div>
                <label style={labelStyle}>Service Interested In <span style={{ color: '#c8892a' }}>*</span></label>
                <select className="contact-field" style={fieldStyle} name="service" value={form.service} onChange={handleChange} required>
                  <option value="">Select a service</option>
                  {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Your Message <span style={{ color: '#c8892a' }}>*</span></label>
                <textarea className="contact-field" style={{ ...fieldStyle, height: 130, resize: 'vertical' }} name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project..." required />
              </div>

              <button type="submit" disabled={loading} style={{
                background: '#c8892a', color: '#fff', border: 'none', borderRadius: 10,
                padding: '14px 28px', fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = loading ? '0.7' : '1' }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>

          {/* ── RIGHT: Info card ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Info block */}
            <div style={{ background: '#1a1a1a', borderRadius: 20, padding: 32, border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 700, color: '#fefaef', marginBottom: 24 }}>Contact Info</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Email */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(200,137,42,0.12)', border: '1px solid rgba(200,137,42,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Email</div>
                    <a href={`mailto:${info.email}`} style={{ fontSize: 14, color: '#fefaef', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#c8892a'}
                      onMouseLeave={e => e.currentTarget.style.color = '#fefaef'}>
                      {info.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(200,137,42,0.12)', border: '1px solid rgba(200,137,42,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Phone</div>
                    {info.phone.split('/').map((num, i) => (
                      <a key={i} href={`tel:${num.trim().replace(/\s/g, '')}`} style={{ fontSize: 14, color: '#fefaef', textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#c8892a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#fefaef'}>
                        {num.trim()}
                      </a>
                    ))}
                    {info.support_hours && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>{info.support_hours}</div>}
                  </div>
                </div>

                {/* WhatsApp */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaWhatsapp size={16} color="#25D366" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>WhatsApp</div>
                    <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 14, color: '#fefaef', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                      onMouseLeave={e => e.currentTarget.style.color = '#fefaef'}>
                      Chat with us →
                    </a>
                  </div>
                </div>

                {info.address && info.address.trim() !== '' && info.address !== 'India' && (
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(200,137,42,0.12)', border: '1px solid rgba(200,137,42,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Address</div>
                      <div style={{ fontSize: 14, color: '#fefaef', lineHeight: 1.5 }}>{info.address}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick response badge */}
            <div style={{ background: 'rgba(200,137,42,0.08)', border: '1px solid rgba(200,137,42,0.2)', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#c8892a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 700, color: '#fefaef', marginBottom: 2 }}>We respond within 24 hours</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Free audit included with every inquiry</div>
              </div>
            </div>

            {/* Trusted by strip */}
            <div style={{ background: '#1a1a1a', borderRadius: 16, padding: '20px 24px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Why work with us</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { num: '500+', label: 'Projects delivered' },
                  { num: '98%',  label: 'Client retention rate' },
                  { num: '5x',   label: 'Average client ROI' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 700, color: '#c8892a' }}>{item.num}</span>
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
