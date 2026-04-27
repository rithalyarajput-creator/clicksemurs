import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { supabase } from '../admin/supabase'
import { FaArrowRight, FaQuoteLeft, FaStar } from 'react-icons/fa'

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '50+', label: 'Industries Served' },
  { value: '98%', label: 'Client Retention' },
  { value: '5X', label: 'Average ROI' },
]

const whyUs = [
  { title: 'True 360° Coverage', desc: 'Every digital marketing service under one roof. No need to juggle multiple agencies.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { title: 'Multi-Industry Expertise', desc: '50+ industries served. We bring cross-industry ideas your competitors simply don\'t have.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { title: 'Data-Driven Always', desc: 'Every decision backed by deep analytics. Real-time tracking, clear ROI — always.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { title: 'Custom Strategies', desc: 'No copy-paste plans. 100% tailored strategy built for your goals, audience, and budget.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg> },
  { title: 'Creative + Technical', desc: 'Top designers, developers, writers & strategists working together under one roof.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { title: 'Full Transparency', desc: 'Regular detailed reports. No jargon. No hidden numbers. Just clear, honest results.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: '500+ Proven Projects', desc: '98% client retention rate. Brands that choose us don\'t just grow — they dominate.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
]

const STATIC_TESTIMONIALS = [
  { quote: 'Clicksemurs transformed our digital presence completely. Within 6 months, our organic traffic tripled and our leads doubled. They are a true growth partner.', client_name: 'Rahul Sharma', company: 'CEO, TechSpark Solutions', rating: 5 },
  { quote: "The difference between Clicksemurs and every other agency we'd tried is night and day. They actually understand business. Our ROI went up by 400% in 8 months.", client_name: 'Priya Mehta', company: 'Founder, StyleHouse Fashion', rating: 5 },
  { quote: "Their 360° approach meant we didn't have to manage multiple vendors. Everything — website, social, ads — handled perfectly. Highly recommend.", client_name: 'Amit Khanna', company: 'Director, GreenBuild Infrastructure', rating: 5 },
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const num = parseInt(target.replace(/\D/g, ''))
    if (!num) return
    const step = Math.ceil(num / (duration / 16))
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, num)
      setCount(current)
      if (current >= num) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [start, target, duration])
  const suffix = target.replace(/[0-9]/g, '')
  return count + suffix
}

function StatCard({ value, label }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const animated = useCountUp(value, 1800, visible)
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 16px', borderRight: '1px solid #2E2E2E' }} className="last:border-r-0">
      <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: 6 }}>{animated}</div>
      <div style={{ color: '#777777', fontSize: 13, letterSpacing: '0.04em' }}>{label}</div>
    </div>
  )
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS)
  const [tSlide, setTSlide] = useState(0)

  useEffect(() => {
    supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const active = data.filter(t => t.is_active !== false)
          setTestimonials(active.length > 0 ? active : STATIC_TESTIMONIALS)
        }
      })
  }, [])

  const tTotal = testimonials.length
  const tPages = Math.ceil(tTotal / 3)
  const tVisible = testimonials.slice(tSlide * 3, tSlide * 3 + 3)

  const handleAuditSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    await supabase.from('newsletter').insert([{ email }])
    setEmailSent(true)
    setEmail('')
  }

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '15%', right: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,161,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingTop: 112, paddingBottom: 80, width: '100%', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>

            {/* Left — text */}
            <div style={{ maxWidth: 620 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,161,0,0.1)', border: '1px solid rgba(244,161,0,0.25)', borderRadius: 100, padding: '5px 16px', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F4A100', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ color: '#F4A100', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>360° Digital Marketing Agency</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
                We Don't Just<br />
                <span style={{ color: '#fff' }}>Market. </span>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  We Dominate.
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 3, background: '#F4A100' }} />
                </span>
              </h1>
              <p style={{ color: '#AAAAAA', fontSize: 'clamp(15px, 2.5vw, 18px)', marginBottom: 36, maxWidth: 540, lineHeight: 1.7 }}>
                Full 360° digital marketing for brands that mean business. From SEO and paid ads to website development and social media — we handle everything.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link to="/contact" className="btn-primary" style={{ fontSize: 13, letterSpacing: '0.06em' }}>
                  Get Free Audit <FaArrowRight size={12} />
                </Link>
                <Link to="/portfolio" className="btn-outline" style={{ fontSize: 13, letterSpacing: '0.06em' }}>
                  See Our Work
                </Link>
              </div>
            </div>

            {/* Right — 3D floating pills */}
            <div className="hero-pills-col" style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              {[
                { label: 'SEO', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, active: true },
                { label: 'Google Ads', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, active: false },
                { label: 'Social Media', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, active: false },
                { label: 'Web Design', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>, active: false },
                { label: 'Branding', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, active: false },
                { label: 'Influencer', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, active: false },
              ].map((pill, i) => (
                <div key={pill.label} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 24px',
                  borderRadius: 100,
                  background: pill.active
                    ? 'linear-gradient(135deg, #F4A100 0%, #d48e00 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  border: pill.active
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: pill.active
                    ? '0 1px 0 rgba(255,255,255,0.3) inset, 0 -3px 0 rgba(0,0,0,0.4) inset, 0 8px 24px rgba(244,161,0,0.3)'
                    : '0 1px 0 rgba(255,255,255,0.06) inset, 0 -2px 0 rgba(0,0,0,0.4) inset, 0 4px 16px rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(12px)',
                  minWidth: 220,
                  transform: `translateX(${i % 2 === 0 ? '0px' : '16px'})`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                  animation: `floatPill${i} ${3 + i * 0.4}s ease-in-out infinite alternate`,
                }}>
                  <span style={{ color: pill.active ? '#111' : '#F4A100', opacity: pill.active ? 1 : 0.9, flexShrink: 0 }}>{pill.icon}</span>
                  <span style={{ color: pill.active ? '#111' : '#fff', fontWeight: 700, fontSize: 15, letterSpacing: '0.01em' }}>{pill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .hero-pills-col { display: flex !important; }
          @media (max-width: 900px) { .hero-pills-col { display: none !important; } }
          @keyframes floatPill0 { from { transform: translateX(0px) translateY(0px); } to { transform: translateX(0px) translateY(-8px); } }
          @keyframes floatPill1 { from { transform: translateX(16px) translateY(0px); } to { transform: translateX(16px) translateY(-6px); } }
          @keyframes floatPill2 { from { transform: translateX(0px) translateY(0px); } to { transform: translateX(0px) translateY(-10px); } }
          @keyframes floatPill3 { from { transform: translateX(16px) translateY(0px); } to { transform: translateX(16px) translateY(-7px); } }
          @keyframes floatPill4 { from { transform: translateX(0px) translateY(0px); } to { transform: translateX(0px) translateY(-9px); } }
          @keyframes floatPill5 { from { transform: translateX(16px) translateY(0px); } to { transform: translateX(16px) translateY(-5px); } }
        `}</style>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: '#111111', borderTop: '1px solid #2E2E2E', borderBottom: '1px solid #2E2E2E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid-resp">
            {stats.map(s => <StatCard key={s.label} value={s.value} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ background: '#F4F4F4', padding: 'clamp(48px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ marginBottom: 48 }}>
            <span style={{ display: 'block', color: '#777', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>What We Do</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#111', marginBottom: 12 }}>Full-Service Digital Marketing</h2>
            <p style={{ color: '#777', maxWidth: 480, fontSize: 15, lineHeight: 1.6 }}>Every service you need under one roof — no coordination headaches, no gaps.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {services.slice(0, 6).map(svc => {
              const Icon = svc.icon
              return (
                <Link key={svc.id} to={`/services/${svc.slug}`} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: 32, display: 'block', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s', borderRadius: 4 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ width: 42, height: 42, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, borderRadius: 8 }}>
                    <Icon size={18} color="white" />
                  </div>
                  <h3 style={{ color: '#111', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{svc.title}</h3>
                  <p style={{ color: '#777', fontSize: 13.5, lineHeight: 1.65 }}>{svc.short}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, color: '#111', fontSize: 13, fontWeight: 700 }}>
                    Learn More <FaArrowRight size={10} />
                  </div>
                </Link>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/services" className="btn-dark">View All 10 Services <FaArrowRight size={12} /></Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)', padding: 'clamp(56px, 8vw, 96px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,161,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 3, background: '#F4A100', borderRadius: 2, flexShrink: 0 }} />
              <span style={{ color: '#F4A100', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Why Clicksemurs</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
              7 Reasons Businesses<br /><span style={{ color: '#F4A100' }}>Choose Us</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 420 }}>And why they stay — 98% client retention rate speaks for itself.</p>
          </div>

          {/* 6 cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {whyUs.slice(0, 6).map((item, i) => {
              const accent = i % 3 === 0 ? '#F4A100' : i % 3 === 1 ? '#3b82f6' : '#10b981'
              return (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(20px,3vw,32px)', position: 'relative', overflow: 'hidden', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                  <div style={{ position: 'absolute', top: 14, right: 16, fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent, opacity: 0.7 }} />
                  <div style={{ width: 44, height: 44, background: `${accent}18`, border: `1px solid ${accent}30`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: accent }}>
                    {item.icon}
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: 13.5, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* 7th reason full-width */}
          <div style={{ marginTop: 2, background: 'linear-gradient(90deg, rgba(244,161,0,0.12) 0%, rgba(244,161,0,0.04) 100%)', border: '1px solid rgba(244,161,0,0.25)', padding: 'clamp(18px, 3vw, 28px) clamp(18px, 3vw, 32px)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ width: 50, height: 50, background: 'rgba(244,161,0,0.15)', border: '1px solid rgba(244,161,0,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#F4A100' }}>
              {whyUs[6].icon}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{whyUs[6].title}</h3>
              <p style={{ color: '#9ca3af', fontSize: 14 }}>{whyUs[6].desc}</p>
            </div>
            <div style={{ flexShrink: 0, background: '#F4A100', color: '#111', fontSize: 12, fontWeight: 800, padding: '8px 18px', borderRadius: 6, letterSpacing: '0.05em' }}>
              #7 REASON
            </div>
          </div>
        </div>
      </section>

      {/* ── Orbit / Integrations ── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(56px,8vw,96px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,161,0,0.08)', border: '1px solid rgba(244,161,0,0.2)', borderRadius: 100, padding: '4px 14px', marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F4A100', display: 'inline-block' }} />
            <span style={{ color: '#F4A100', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Platforms We Work With</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 8, letterSpacing: '-0.02em' }}>
            One Agency. <span style={{ color: '#F4A100' }}>Every Platform.</span>
          </h2>
          <p style={{ color: '#555', fontSize: 14, textAlign: 'center', marginBottom: 56, maxWidth: 400 }}>We connect your brand across all major digital platforms — seamlessly.</p>

          {/* Orbit animation */}
          <div style={{ position: 'relative', width: 420, height: 420, maxWidth: '90vw' }}>
            <style>{`
              @keyframes orbit1 { from { transform: rotate(0deg) translateX(140px) rotate(0deg); } to { transform: rotate(360deg) translateX(140px) rotate(-360deg); } }
              @keyframes orbit2 { from { transform: rotate(45deg) translateX(140px) rotate(-45deg); } to { transform: rotate(405deg) translateX(140px) rotate(-405deg); } }
              @keyframes orbit3 { from { transform: rotate(90deg) translateX(195px) rotate(-90deg); } to { transform: rotate(450deg) translateX(195px) rotate(-450deg); } }
              @keyframes orbit4 { from { transform: rotate(180deg) translateX(195px) rotate(-180deg); } to { transform: rotate(540deg) translateX(195px) rotate(-540deg); } }
              @keyframes orbit5 { from { transform: rotate(270deg) translateX(195px) rotate(-270deg); } to { transform: rotate(630deg) translateX(195px) rotate(-630deg); } }
              @keyframes orbit6 { from { transform: rotate(135deg) translateX(195px) rotate(-135deg); } to { transform: rotate(495deg) translateX(195px) rotate(-495deg); } }
              @keyframes orbit7 { from { transform: rotate(315deg) translateX(140px) rotate(-315deg); } to { transform: rotate(675deg) translateX(140px) rotate(-675deg); } }
              @keyframes orbit8 { from { transform: rotate(225deg) translateX(140px) rotate(-225deg); } to { transform: rotate(585deg) translateX(140px) rotate(-585deg); } }
              @keyframes pulseCenter { 0%,100%{box-shadow:0 0 0 0 rgba(244,161,0,0.3),0 0 40px rgba(244,161,0,0.1)} 50%{box-shadow:0 0 0 20px rgba(244,161,0,0),0 0 60px rgba(244,161,0,0.2)} }
            `}</style>

            {/* Orbit rings */}
            <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', border: '1px dashed rgba(244,161,0,0.15)' }} />
              <div style={{ position: 'absolute', width: 390, height: 390, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(244,161,0,0.1)' }} />
            </div>

            {/* Center */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg, #1a1a1a, #111)', border: '1px solid rgba(244,161,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, animation: 'pulseCenter 3s ease-in-out infinite', zIndex: 10 }}>
              <span style={{ fontSize: 24 }}>🚀</span>
              <span style={{ color: '#F4A100', fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2 }}>Digital<br/>Marketing</span>
            </div>

            {/* Inner orbit icons — 4 icons */}
            {[
              { icon: '📘', label: 'Facebook', color: '#1877F2', anim: 'orbit1', dur: '8s' },
              { icon: '📸', label: 'Instagram', color: '#E1306C', anim: 'orbit2', dur: '8s' },
              { icon: '💼', label: 'LinkedIn', color: '#0A66C2', anim: 'orbit7', dur: '8s' },
              { icon: '▶️', label: 'YouTube', color: '#FF0000', anim: 'orbit8', dur: '8s' },
            ].map(({ icon, label, color, anim, dur }) => (
              <div key={label} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
                <div style={{ animation: `${anim} ${dur} linear infinite`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${color}22`, border: `1.5px solid ${color}55`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', boxShadow: `0 4px 16px ${color}33`, cursor: 'default' }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Outer orbit icons — 4 icons */}
            {[
              { icon: '🔍', label: 'Google Ads', color: '#F4A100', anim: 'orbit3', dur: '12s' },
              { icon: '🌐', label: 'WordPress', color: '#21759b', anim: 'orbit4', dur: '12s' },
              { icon: '🛒', label: 'Shopify', color: '#96bf48', anim: 'orbit5', dur: '12s' },
              { icon: '✉️', label: 'Email', color: '#a855f7', anim: 'orbit6', dur: '12s' },
            ].map(({ icon, label, color, anim, dur }) => (
              <div key={label} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
                <div style={{ animation: `${anim} ${dur} linear infinite`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${color}18`, border: `1.5px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', boxShadow: `0 4px 20px ${color}30` }}>
                    <span style={{ fontSize: 22 }}>{icon}</span>
                  </div>
                  <span style={{ color: '#555', fontSize: 9, fontWeight: 600, whiteSpace: 'nowrap', marginTop: 2 }}>{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Platform tags below */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 48 }}>
            {['Instagram','Facebook','LinkedIn','YouTube','Google Ads','WordPress','Shopify','Email Marketing','SEO','Analytics'].map(p => (
              <span key={p} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '6px 16px', color: '#666', fontSize: 12, fontWeight: 600 }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Preview ── */}
      <section style={{ background: '#fff', padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ display: 'block', color: '#F4A100', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Our Work</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Results That Speak</h2>
              <p style={{ color: '#64748b', fontSize: 15 }}>Real clients. Real numbers. Zero fluff.</p>
            </div>
            <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0f172a', fontWeight: 700, fontSize: 13, textDecoration: 'none', borderBottom: '2px solid #0f172a', paddingBottom: 2, whiteSpace: 'nowrap' }}>
              View All Work <FaArrowRight size={10} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { client: 'TechSpark Solutions', industry: 'Technology', metric: '300%', metricLabel: 'Organic Traffic Growth', detail: '6 months · SEO + Content', accent: '#6366f1' },
              { client: 'StyleHouse Fashion', industry: 'Fashion & Retail', metric: '400%', metricLabel: 'ROI Improvement', detail: '8 months · Meta Ads', accent: '#ec4899' },
              { client: 'GreenBuild Infra', industry: 'Real Estate', metric: '120+', metricLabel: 'Leads Per Month', detail: 'Google Ads + Website', accent: '#10b981' },
            ].map((cs, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
                <div style={{ height: 6, background: cs.accent }} />
                <div style={{ padding: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>{cs.client}</div>
                      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cs.industry}</div>
                    </div>
                    <div style={{ background: `${cs.accent}15`, border: `1px solid ${cs.accent}30`, borderRadius: 8, padding: '4px 10px' }}>
                      <span style={{ color: cs.accent, fontSize: 11, fontWeight: 700 }}>Case Study</span>
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
                    <div style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: 900, color: cs.accent, lineHeight: 1 }}>{cs.metric}</div>
                    <div style={{ fontSize: 13, color: '#475569', fontWeight: 600, marginTop: 4 }}>{cs.metricLabel}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                    <span style={{ color: '#64748b', fontSize: 13 }}>{cs.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: '#f8fafc', padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ marginBottom: 48 }}>
            <span style={{ display: 'block', color: '#777', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Client Stories</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#111' }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 28 }}>
            {tVisible.map((t, i) => (
              <div key={t.id || i} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column', borderRadius: 12 }}>
                <FaQuoteLeft size={22} color="#e2e8f0" style={{ marginBottom: 18, flexShrink: 0 }} />
                <p style={{ color: '#4A4A4A', fontSize: 14, lineHeight: 1.75, flex: 1, marginBottom: 24 }}>"{t.quote || t.review}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#111', fontWeight: 700, fontSize: 14 }}>{t.client_name || t.name}</div>
                    <div style={{ color: '#777', fontSize: 12, marginTop: 2 }}>{t.company}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[...Array(t.rating || 5)].map((_, j) => <FaStar key={j} size={12} color="#F4A100" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {tPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <button onClick={() => setTSlide(p => Math.max(0, p - 1))} disabled={tSlide === 0}
                style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid #111', background: tSlide === 0 ? '#e5e5e5' : '#111', color: tSlide === 0 ? '#999' : '#fff', cursor: tSlide === 0 ? 'default' : 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
              {Array.from({ length: tPages }).map((_, p) => (
                <button key={p} onClick={() => setTSlide(p)}
                  style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', background: tSlide === p ? '#111' : '#ccc', cursor: 'pointer', padding: 0 }} />
              ))}
              <button onClick={() => setTSlide(p => Math.min(tPages - 1, p + 1))} disabled={tSlide === tPages - 1}
                style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid #111', background: tSlide === tPages - 1 ? '#e5e5e5' : '#111', color: tSlide === tPages - 1 ? '#999' : '#fff', cursor: tSlide === tPages - 1 ? 'default' : 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(56px, 8vw, 96px) 0', borderTop: '1px solid #2E2E2E' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8" style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', color: '#F4A100', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>Limited Spots Available</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>
            Get Your FREE Digital<br />Marketing Audit Today
          </h2>
          <p style={{ color: '#AAAAAA', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7, fontSize: 15 }}>
            Let our experts analyze your current digital presence and show you exactly how to grow — no commitment, no cost.
          </p>
          {emailSent ? (
            <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: '20px 32px', display: 'inline-block', borderRadius: 8 }}>
              <p style={{ color: '#fff', fontWeight: 600 }}>Thank you! We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleAuditSubmit} style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap' }}>
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ flex: 1, minWidth: 200, background: '#1E1E1E', border: '1px solid #2E2E2E', color: '#fff', padding: '12px 16px', fontSize: 14, outline: 'none', borderRadius: 6 }} />
              <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', borderRadius: 6 }}>
                Start Growing →
              </button>
            </form>
          )}
          <p style={{ color: '#555', fontSize: 12, marginTop: 16 }}>clicksemurs@gmail.com · www.clicksemurs.com</p>
        </div>
      </section>
    </div>
  )
}
