import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter } from 'react-icons/fa'
import { supabase } from '../admin/supabase'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Projects', to: '/projects' },
  { label: 'Industries', to: '/industries' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

const services = [
  { label: 'Social Media Marketing', to: '/services/social-media-marketing' },
  { label: 'SEO & Content', to: '/services/seo' },
  { label: 'PPC / Google Ads', to: '/services/ppc-paid-ads' },
  { label: 'Website Design', to: '/services/website-design-development' },
  { label: 'Content Marketing', to: '/services/content-marketing' },
  { label: 'Email Marketing', to: '/services/email-marketing' },
  { label: 'Video Marketing', to: '/services/video-marketing' },
  { label: 'Influencer Marketing', to: '/services/influencer-marketing' },
]

const DEFAULTS = {
  email: 'clicksemurs@gmail.com',
  phone: '+91 96503 03312 / +91 92175 94664',
  whatsapp: '919650303312',
  address: 'India',
  company_description: "We don't just run campaigns — we build digital ecosystems. From strategy to execution, we deliver measurable growth.",
  copyright_text: '© 2025 Clicksemurs. All Rights Reserved.',
  tagline: 'Grow. Dominate. Lead.',
  instagram: '#',
  facebook: '#',
  linkedin: '#',
  youtube: '#',
  twitter: '#',
}

function AccordionSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid #1a1a1a' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', color: '#fff',
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 16, height: 2, background: '#c8892a', display: 'inline-block', borderRadius: 2 }} />
          {title}
        </span>
        <span style={{ color: '#c8892a', fontSize: 18, fontWeight: 300, transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'none', lineHeight: 1 }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 16 }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  const [s, setS] = useState(DEFAULTS)
  const [nEmail, setNEmail] = useState('')
  const [nStatus, setNStatus] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      if (!rows) return
      const obj = { ...DEFAULTS }
      rows.forEach(r => { if (r.value && r.value.trim() !== '') obj[r.key] = r.value })
      setS(obj)
    })
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const goTo = useCallback((to) => {
    navigate(to)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }, [navigate])

  const handleNewsletter = async (e) => {
    e.preventDefault()
    if (!nEmail) return
    const { error } = await supabase.from('newsletter').insert([{ email: nEmail }])
    if (error && error.code === '23505') setNStatus('already')
    else if (error) setNStatus('error')
    else { setNStatus('success'); setNEmail('') }
    setTimeout(() => setNStatus(null), 4000)
  }

  const socials = [
    { icon: FaInstagram, href: s.instagram, label: 'Instagram', color: '#E1306C' },
    { icon: FaFacebookF, href: s.facebook, label: 'Facebook', color: '#1877F2' },
    { icon: FaLinkedinIn, href: s.linkedin, label: 'LinkedIn', color: '#0A66C2' },
    { icon: FaYoutube, href: s.youtube, label: 'YouTube', color: '#FF0000' },
    { icon: FaTwitter, href: s.twitter, label: 'Twitter', color: '#1DA1F2' },
  ]

  const phones = s.phone ? s.phone.split('/').map(n => n.trim()).filter(Boolean) : []

  const linkStyle = {
    color: '#666', fontSize: 13, textDecoration: 'none', display: 'flex',
    alignItems: 'center', gap: 8, padding: '5px 0', transition: 'color 0.2s',
    cursor: 'pointer', background: 'none', border: 'none',
  }

  return (
    <footer style={{ background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button onClick={scrollTop} style={{
          position: 'fixed', bottom: 90, right: 20, zIndex: 999,
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(180deg, #c8892a, #b07520)',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(244,161,0,0.4), 0 -2px 0 rgba(0,0,0,0.3) inset',
          transition: 'transform 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          aria-label="Scroll to top">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(244,161,0,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.04) 0%, transparent 50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(244,161,0,0.4), transparent)' }} />

      {/* Top CTA strip */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '48px 0', position: 'relative' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,161,0,0.08)', border: '1px solid rgba(244,161,0,0.2)', borderRadius: 100, padding: '4px 14px', marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8892a', display: 'inline-block' }} />
                <span style={{ color: '#c8892a', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Ready to Grow?</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Let's Build Something <span style={{ color: '#c8892a' }}>Remarkable</span>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => goTo('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#c8892a', color: '#fff', padding: '13px 28px', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                Get Free Audit →
              </button>
              <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '13px 28px', fontWeight: 700, fontSize: 13, textDecoration: 'none', borderRadius: 8, border: '1px solid #2E2E2E', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2E2E2E'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L0 24l6.29-1.516A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.379l-.372-.22-3.735.9.939-3.628-.241-.389A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop footer content */}
      <div className="footer-desktop" style={{ padding: '60px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 40 }}>

            {/* Brand */}
            <div>
              <img src="/logo.png" alt="Clicksemurs" style={{ height: 42, width: 'auto', marginBottom: 20 }} />
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.8, marginBottom: 24, maxWidth: 280 }}>{s.company_description}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a key={label} href={href !== '#' ? href : undefined} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', textDecoration: 'none', transition: 'all 0.2s', background: '#0d0d0d' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; e.currentTarget.style.background = `${color}15` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#555'; e.currentTarget.style.background = '#0d0d0d' }}>
                    <Icon size={14} />
                  </a>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`mailto:${s.email}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#888', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(244,161,0,0.08)', border: '1px solid rgba(244,161,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  {s.email}
                </a>
                {phones.map((num, i) => (
                  <a key={i} href={`tel:${num.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#888', fontSize: 13, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                    <span style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(244,161,0,0.08)', border: '1px solid rgba(244,161,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    {num}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 2, background: '#c8892a', display: 'inline-block', borderRadius: 2 }} />Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {quickLinks.map(link => (
                  <li key={link.to}>
                    <button onClick={() => goTo(link.to)} style={{ ...linkStyle, width: '100%', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 2, background: '#c8892a', display: 'inline-block', borderRadius: 2 }} />Our Services
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {services.map(sv => (
                  <li key={sv.to}>
                    <button onClick={() => goTo(sv.to)} style={{ ...linkStyle, width: '100%', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      {sv.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 2, background: '#c8892a', display: 'inline-block', borderRadius: 2 }} />Newsletter
              </h4>
              <p style={{ color: '#555', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>Get weekly digital marketing tips, trends & case studies — straight to your inbox.</p>
              <form onSubmit={handleNewsletter}>
                <input type="email" value={nEmail} onChange={e => setNEmail(e.target.value)} placeholder="your@email.com" required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '12px 16px', fontSize: 13, outline: 'none', borderRadius: 8, boxSizing: 'border-box', marginBottom: 8 }}
                  onFocus={e => e.target.style.borderColor = '#c8892a'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                <button type="submit" style={{ width: '100%', background: '#c8892a', color: '#fff', border: 'none', padding: '12px', fontWeight: 600, fontSize: 13, cursor: 'pointer', borderRadius: 8, letterSpacing: '0.04em', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Subscribe →
                </button>
                {nStatus === 'success' && <p style={{ color: '#4ade80', fontSize: 12, marginTop: 8 }}>Subscribed successfully!</p>}
                {nStatus === 'already' && <p style={{ color: '#aaa', fontSize: 12, marginTop: 8 }}>Already subscribed.</p>}
                {nStatus === 'error' && <p style={{ color: '#f87171', fontSize: 12, marginTop: 8 }}>Something went wrong.</p>}
              </form>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { num: '500+', text: 'Projects Delivered' },
                  { num: '50+',  text: 'Industries Served' },
                  { num: '5x',   text: 'Average ROI' },
                ].map(b => (
                  <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#c8892a', fontSize: 13, fontWeight: 700, minWidth: 36 }}>{b.num}</span>
                    <span style={{ color: '#555', fontSize: 12 }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile footer — accordion */}
      <div className="footer-mobile" style={{ display: 'none', padding: '32px 20px' }}>
        {/* Brand */}
        <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #1a1a1a' }}>
          <img src="/logo.png" alt="Clicksemurs" style={{ height: 38, width: 'auto', marginBottom: 16 }} />
          <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>{s.company_description}</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {socials.map(({ icon: Icon, href, label, color }) => (
              <a key={label} href={href !== '#' ? href : undefined} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', textDecoration: 'none', background: '#0d0d0d' }}>
                <Icon size={13} />
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href={`mailto:${s.email}`} style={{ color: '#888', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {s.email}
            </a>
            {phones.map((num, i) => (
              <a key={i} href={`tel:${num.replace(/\s/g, '')}`} style={{ color: '#888', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {num}
              </a>
            ))}
          </div>
        </div>

        {/* Accordion sections */}
        <AccordionSection title="Quick Links">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {quickLinks.map(link => (
              <button key={link.to} onClick={() => goTo(link.to)} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 14, padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                {link.label}
              </button>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Our Services">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {services.map(sv => (
              <button key={sv.to} onClick={() => goTo(sv.to)} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 14, padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                {sv.label}
              </button>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Newsletter">
          <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>Get weekly marketing tips straight to your inbox.</p>
          <form onSubmit={handleNewsletter}>
            <input type="email" value={nEmail} onChange={e => setNEmail(e.target.value)} placeholder="your@email.com" required
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '12px 14px', fontSize: 13, outline: 'none', borderRadius: 8, boxSizing: 'border-box', marginBottom: 8 }} />
            <button type="submit" style={{ width: '100%', background: '#c8892a', color: '#fff', border: 'none', padding: '12px', fontWeight: 600, fontSize: 13, cursor: 'pointer', borderRadius: 8, letterSpacing: '0.04em' }}>
              Subscribe →
            </button>
            {nStatus === 'success' && <p style={{ color: '#4ade80', fontSize: 12, marginTop: 8 }}>Subscribed successfully!</p>}
            {nStatus === 'already' && <p style={{ color: '#aaa', fontSize: 12, marginTop: 8 }}>Already subscribed.</p>}
          </form>
        </AccordionSection>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #111', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(244,161,0,0.2), transparent)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#444', fontSize: 12 }}>
            {s.copyright_text}{s.tagline ? <span style={{ color: '#c8892a', marginLeft: 8, fontWeight: 700 }}>| {s.tagline}</span> : ''}
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => goTo('/contact')} style={{ color: '#444', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#444'}>Privacy Policy</button>
            <button onClick={() => goTo('/contact')} style={{ color: '#444', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#444'}>Terms of Service</button>
            <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: 20, padding: '5px 12px', color: '#25D366', fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L0 24l6.29-1.516A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.379l-.372-.22-3.735.9.939-3.628-.241-.389A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Chat Now
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-desktop { display: none !important; }
          .footer-mobile { display: block !important; }
        }
      `}</style>
    </footer>
  )
}
