import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
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

const testimonials = [
  {
    quote: 'Clicksemurs transformed our digital presence completely. Within 6 months, our organic traffic tripled and our leads doubled. They are a true growth partner.',
    name: 'Rahul Sharma',
    company: 'TechSpark Solutions',
    role: 'CEO',
    rating: 5,
  },
  {
    quote: 'The difference between Clicksemurs and every other agency we\'d tried is night and day. They actually understand business. Our ROI went up by 400% in 8 months.',
    name: 'Priya Mehta',
    company: 'StyleHouse Fashion',
    role: 'Founder',
    rating: 5,
  },
  {
    quote: 'Their 360° approach meant we didn\'t have to manage multiple vendors. Everything — website, social, ads — handled perfectly. Highly recommend.',
    name: 'Amit Khanna',
    company: 'GreenBuild Infrastructure',
    role: 'Director',
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

  const handleAuditSubmit = (e) => {
    e.preventDefault()
    if (email) { setEmailSent(true); setEmail('') }
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
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="section-label">Why Clicksemurs</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              7 Reasons Businesses Choose Us
            </h2>
            <p className="text-[#777777] mt-3 max-w-xl">And why they stay — 98% client retention rate speaks for itself.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.slice(0, 6).map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="bg-[#1E1E1E] border border-[#2E2E2E] p-7 hover:border-[#555] transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 border border-[#2E2E2E] flex items-center justify-center">
                      <Icon size={14} color="white" />
                    </div>
                    <span className="text-[#777777] text-xs font-mono">0{i + 1}</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-[#777777] text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
          {/* 7th reason — wide */}
          <div className="mt-5 bg-[#1E1E1E] border border-[#2E2E2E] p-7 flex flex-col md:flex-row items-center gap-6 hover:border-[#555] transition-all duration-200">
            <div className="w-8 h-8 border border-[#2E2E2E] flex items-center justify-center flex-shrink-0">
              <FaHeart size={14} color="white" />
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">{whyUs[6].title}</h3>
              <p className="text-[#777777] text-sm">{whyUs[6].desc}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 flex flex-col">
                <FaQuoteLeft size={24} color="#E5E5E5" className="mb-5" />
                <p className="text-[#4A4A4A] text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#111111] font-bold text-sm">{t.name}</div>
                    <div className="text-[#777777] text-xs">{t.role}, {t.company}</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <FaStar key={j} size={12} color="#111111" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          <p className="text-[#555] text-xs mt-4">hello@clicksemurs.com · www.clicksemurs.com</p>
        </div>
      </section>
    </div>
  )
}
