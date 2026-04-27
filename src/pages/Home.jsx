import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { supabase } from '../admin/supabase'
import {
  FaArrowRight, FaCheckCircle, FaQuoteLeft,
  FaStar, FaTrophy, FaLightbulb, FaHandshake,
  FaChartLine, FaHeart, FaGlobe
} from 'react-icons/fa'

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '50+', label: 'Industries Served' },
  { value: '98%', label: 'Client Retention' },
  { value: '5X', label: 'Average ROI' },
]

const whyUs = [
  { icon: FaTrophy, title: 'True 360° Coverage', desc: 'Every digital marketing service under one roof. No need to juggle multiple agencies.' },
  { icon: FaGlobe, title: 'Multi-Industry Expertise', desc: '50+ industries served. We bring cross-industry ideas your competitors simply don\'t have.' },
  { icon: FaChartLine, title: 'Data-Driven Always', desc: 'Every decision backed by deep analytics. Real-time tracking, clear ROI — always.' },
  { icon: FaLightbulb, title: 'Custom Strategies', desc: 'No copy-paste plans. 100% tailored strategy built for your goals, audience, and budget.' },
  { icon: FaCheckCircle, title: 'Creative + Technical', desc: 'Top designers, developers, writers & strategists working together under one roof.' },
  { icon: FaHandshake, title: 'Full Transparency', desc: 'Regular detailed reports. No jargon. No hidden numbers. Just clear, honest results.' },
  { icon: FaHeart, title: '500+ Proven Projects', desc: '98% client retention rate. Brands that choose us don\'t just grow — they dominate.' },
]

const STATIC_TESTIMONIALS = [
  {
    quote: 'Clicksemurs transformed our digital presence completely. Within 6 months, our organic traffic tripled and our leads doubled. They are a true growth partner.',
    client_name: 'Rahul Sharma',
    company: 'CEO, TechSpark Solutions',
    rating: 5,
  },
  {
    quote: 'The difference between Clicksemurs and every other agency we\'d tried is night and day. They actually understand business. Our ROI went up by 400% in 8 months.',
    client_name: 'Priya Mehta',
    company: 'Founder, StyleHouse Fashion',
    rating: 5,
  },
  {
    quote: 'Their 360° approach meant we didn\'t have to manage multiple vendors. Everything — website, social, ads — handled perfectly. Highly recommend.',
    client_name: 'Amit Khanna',
    company: 'Director, GreenBuild Infrastructure',
    rating: 5,
  },
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
    <div ref={ref} className="text-center px-6 py-8 border-r border-[#2E2E2E] last:border-r-0">
      <div className="text-4xl md:text-5xl font-black text-white mb-2">{animated}</div>
      <div className="text-[#777777] text-sm tracking-wide">{label}</div>
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
    <div>
      {/* ── Hero ── */}
      <section className="min-h-screen bg-[#0A0A0A] flex items-center relative overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="max-w-4xl">
            <span className="section-label">360° Digital Marketing Agency</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              We Don't Just<br />
              <span className="text-white">Market.</span>{' '}
              <span className="relative inline-block">
                We Dominate.
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white" />
              </span>
            </h1>
            <p className="text-[#AAAAAA] text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
              Full 360° digital marketing for brands that mean business. From SEO and paid ads to website development and social media — we handle everything.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Get Free Audit <FaArrowRight size={12} />
              </Link>
              <Link to="/portfolio" className="btn-outline">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[#111111] border-y border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map(s => <StatCard key={s.label} value={s.value} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* ── Services Overview ── */}
      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="section-label text-[#777777]">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#111111]">
              Full-Service Digital Marketing
            </h2>
            <p className="text-[#777777] mt-3 max-w-xl">Every service you need under one roof — no coordination headaches, no gaps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map(svc => {
              const Icon = svc.icon
              return (
                <Link
                  key={svc.id}
                  to={`/services/${svc.slug}`}
                  className="bg-white border border-gray-200 p-8 group hover:border-[#111111] transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-[#111111] flex items-center justify-center mb-5 group-hover:bg-[#333] transition-colors">
                    <Icon size={18} color="white" />
                  </div>
                  <h3 className="text-[#111111] font-bold text-lg mb-2">{svc.title}</h3>
                  <p className="text-[#777777] text-sm leading-relaxed line-clamp-3">{svc.short}</p>
                  <div className="flex items-center gap-2 mt-4 text-[#111111] text-sm font-semibold">
                    Learn More <FaArrowRight size={10} />
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-dark">
              View All 10 Services <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background elements */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,161,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 3, background: '#F4A100', borderRadius: 2 }} />
              <span style={{ color: '#F4A100', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Why Clicksemurs</span>
            </div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
              7 Reasons Businesses<br />
              <span style={{ color: '#F4A100' }}>Choose Us</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 480 }}>And why they stay — 98% client retention rate speaks for itself.</p>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {whyUs.slice(0, 6).map((item, i) => {
              const Icon = item.icon
              const accent = i % 3 === 0 ? '#F4A100' : i % 3 === 1 ? '#3b82f6' : '#10b981'
              return (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'background 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  {/* Number watermark */}
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 52, fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, fontFamily: 'monospace', userSelect: 'none' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {/* Top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent, opacity: 0.7 }} />
                  {/* Icon */}
                  <div style={{ width: 46, height: 46, background: `${accent}18`, border: `1px solid ${accent}30`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: accent }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ color: '#ffffff', fontWeight: 800, fontSize: 16, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: 13.5, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* 7th reason — full width highlight */}
          <div style={{
            marginTop: 2,
            background: 'linear-gradient(90deg, rgba(244,161,0,0.12) 0%, rgba(244,161,0,0.04) 100%)',
            border: '1px solid rgba(244,161,0,0.25)',
            padding: '28px 32px',
            display: 'flex', alignItems: 'center', gap: 24
          }}>
            <div style={{ width: 52, height: 52, background: 'rgba(244,161,0,0.15)', border: '1px solid rgba(244,161,0,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#F4A100' }}>
              <FaHeart size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#ffffff', fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{whyUs[6].title}</h3>
              <p style={{ color: '#9ca3af', fontSize: 14 }}>{whyUs[6].desc}</p>
            </div>
            <div style={{ flexShrink: 0, background: '#F4A100', color: '#111', fontSize: 12, fontWeight: 800, padding: '8px 18px', borderRadius: 6, letterSpacing: '0.05em' }}>
              #7 REASON
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="section-label text-[#777777]">Client Stories</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#111111]">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {tVisible.map((t, i) => (
              <div key={t.id || i} className="bg-white border border-gray-200 p-8 flex flex-col">
                <FaQuoteLeft size={24} color="#E5E5E5" className="mb-5" />
                <p className="text-[#4A4A4A] text-sm leading-relaxed flex-1 mb-6">"{t.quote || t.review}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#111111] font-bold text-sm">{t.client_name || t.name}</div>
                    <div className="text-[#777777] text-xs">{t.company}</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <FaStar key={j} size={12} color="#111111" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {tPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setTSlide(p => Math.max(0, p - 1))}
                disabled={tSlide === 0}
                style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #111', background: tSlide === 0 ? '#e5e5e5' : '#111', color: tSlide === 0 ? '#999' : '#fff', fontSize: 18, cursor: tSlide === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >‹</button>
              <div className="flex gap-2">
                {Array.from({ length: tPages }).map((_, p) => (
                  <button key={p} onClick={() => setTSlide(p)}
                    style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', background: tSlide === p ? '#111' : '#ccc', cursor: 'pointer', padding: 0 }} />
                ))}
              </div>
              <button
                onClick={() => setTSlide(p => Math.min(tPages - 1, p + 1))}
                disabled={tSlide === tPages - 1}
                style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #111', background: tSlide === tPages - 1 ? '#e5e5e5' : '#111', color: tSlide === tPages - 1 ? '#999' : '#fff', fontSize: 18, cursor: tSlide === tPages - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >›</button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#0A0A0A] py-20 border-t border-[#2E2E2E]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="section-label">Limited Spots Available</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Get Your FREE Digital<br />Marketing Audit Today
          </h2>
          <p className="text-[#AAAAAA] mb-10 max-w-xl mx-auto">
            Let our experts analyze your current digital presence and show you exactly how to grow — no commitment, no cost.
          </p>
          {emailSent ? (
            <div className="bg-[#1E1E1E] border border-[#2E2E2E] px-8 py-5 inline-block">
              <p className="text-white font-semibold">Thank you! We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleAuditSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 bg-[#1E1E1E] border border-[#2E2E2E] text-white px-4 py-3 text-sm outline-none focus:border-white transition-colors placeholder:text-[#555]"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Start Growing →
              </button>
            </form>
          )}
          <p className="text-[#555] text-xs mt-4">clicksemurs@gmail.com · www.clicksemurs.com</p>
        </div>
      </section>
    </div>
  )
}
