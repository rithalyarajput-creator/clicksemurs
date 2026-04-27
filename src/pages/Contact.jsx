import { useState, useEffect } from 'react'
import { FaWhatsapp, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
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
  email: 'hello@clicksemurs.com',
  phone: '+91 XXXXX XXXXX',
  whatsapp: '91XXXXXXXXXX',
  address: 'India',
  maps_embed: '',
  maps_link: '',
  support_hours: 'Monday - Saturday, 10 AM to 7 PM',
}

const inp = {
  width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8,
  padding: '11px 14px', fontSize: 14, outline: 'none', color: '#111',
  background: '#fff', boxSizing: 'border-box', transition: 'border 0.2s'
}
const lbl = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }

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

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Page Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: '#F4A100', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Contact Us</p>
          <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: 8 }}>Get in Touch with Our Team</h1>
          <p style={{ color: '#64748b', fontSize: 15 }}>Ready to grow your brand? Let's talk. Get your free digital marketing audit today.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 24, alignItems: 'start' }}>

          {/* LEFT - Form */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '36px 40px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>We're Here</h2>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>We'd love to hear from you — send us a message.</p>

            {status === 'success' && (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '14px 18px', borderRadius: 10, marginBottom: 20, fontSize: 14, fontWeight: 600 }}>
                Thank you! We've received your message and will be in touch shortly.
              </div>
            )}
            {status === 'error' && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '14px 18px', borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
                Something went wrong. Please try again or email us at {info.email}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={lbl}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={inp} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
                </div>
                <div>
                  <label style={lbl}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={inp} type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Mobile Number <span style={{ color: '#ef4444' }}>*</span></label>
                <input style={inp} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your Mobile No." required />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Inquiry Type <span style={{ color: '#ef4444' }}>*</span></label>
                <select style={{ ...inp, background: '#fff' }} name="service" value={form.service} onChange={handleChange} required>
                  <option value="">Select Inquiry Type</option>
                  {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={lbl}>Your Message <span style={{ color: '#ef4444' }}>*</span></label>
                <textarea style={{ ...inp, height: 120, resize: 'vertical' }} name="message" value={form.message} onChange={handleChange} placeholder="Type your message here..." required />
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', background: '#0f172a', color: '#fff', border: 'none',
                borderRadius: 8, padding: '14px', fontWeight: 700, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <FaArrowRight size={13} />}
              </button>
            </form>
          </div>

          {/* RIGHT - Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Map */}
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ padding: '18px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>Get in Touch</h3>
                <p style={{ color: '#64748b', fontSize: 13 }}>We'd love to hear from you — send us a message.</p>
              </div>
              {info.maps_embed ? (
                <div dangerouslySetInnerHTML={{ __html: info.maps_embed }} style={{ height: 180 }} />
              ) : (
                <div style={{ height: 180, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                  <FaMapMarkerAlt size={28} color="#94a3b8" />
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>Map will appear here</span>
                  <span style={{ color: '#cbd5e1', fontSize: 11 }}>Add Google Maps embed in Admin</span>
                </div>
              )}
              {info.maps_link && (
                <div style={{ padding: '12px 16px' }}>
                  <a href={info.maps_link} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 8, background: '#0f172a',
                    color: '#fff', padding: '10px 16px', borderRadius: 8, textDecoration: 'none',
                    fontSize: 13, fontWeight: 700, justifyContent: 'center'
                  }}>
                    <FaMapMarkerAlt size={13} /> View on Google Maps
                  </a>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 18 }}>Get in Touch</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                {/* Address */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F4A100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>Our Address</div>
                    <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{info.address || 'India'}</div>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>Customer Support</div>
                    <a href={`tel:${info.phone}`} style={{ fontSize: 12, color: '#64748b', textDecoration: 'none', display: 'block' }}>{info.phone}</a>
                    {info.support_hours && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{info.support_hours}</div>}
                  </div>
                </div>

                {/* WhatsApp */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaWhatsapp size={15} color="#16a34a" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>WhatsApp us</div>
                    <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#64748b', textDecoration: 'none' }}>
                      +{info.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>Email Support</div>
                    <a href={`mailto:${info.email}`} style={{ fontSize: 12, color: '#64748b', textDecoration: 'none' }}>{info.email}</a>
                  </div>
                </div>
              </div>

              {/* Social links */}
              {(info.instagram || info.facebook || info.twitter || info.linkedin) && (
                <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>Follow us</span>
                  {info.facebook && info.facebook !== '#' && (
                    <a href={info.facebook} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', textDecoration: 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                  )}
                  {info.twitter && info.twitter !== '#' && (
                    <a href={info.twitter} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', textDecoration: 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                  {info.instagram && info.instagram !== '#' && (
                    <a href={info.instagram} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', textDecoration: 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                  )}
                  {info.linkedin && info.linkedin !== '#' && (
                    <a href={info.linkedin} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', textDecoration: 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
