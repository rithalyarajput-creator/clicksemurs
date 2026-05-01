import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../admin/supabase'
import { useInView } from '../hooks/useScrollAnimation'

/* ── data ── */
const STATIC_TESTIMONIALS = [
  { id: 1, initials: 'RS', name: 'Rahul Sharma', handle: '@rahulsharma_biz', color: '#c8892a', rating: 5,
    quote: 'Clicksemurs transformed our digital presence completely. Our organic traffic tripled in just 4 months. They\'re not just an agency — they\'re a growth partner!' },
  { id: 2, initials: 'PM', name: 'Priya Mehta', handle: '@priyastyle_official', color: '#4a9e85', rating: 5,
    quote: 'Best agency we\'ve ever worked with. Our ROI improved 4x within 6 months. The team is incredibly responsive and results-focused!' },
  { id: 3, initials: 'AK', name: 'Amit Khanna', handle: '@amitk_ventures', color: '#d4603a', rating: 5,
    quote: '120+ qualified leads per month — something we never imagined possible. The paid ads strategy completely changed our business!' },
  { id: 4, initials: 'NJ', name: 'Neha Joshi', handle: '@neha.builds', color: '#7C3AED', rating: 5,
    quote: 'Our Instagram went from 2K to 50K real followers in just 3 months. The content strategy and execution was flawless!' },
]

const SERVICE_CARDS = [
  { emoji: '📱', title: 'Social Media Marketing', desc: 'Build an audience that converts. We manage all major platforms and turn followers into paying customers.', bg: '#1a1a1a', color: '#fff' },
  { emoji: '🔍', title: 'Search Engine Optimization', desc: 'Rank higher, get found. We create content that generates sustainable, compounding traffic.', bg: '#c8892a', color: '#fff' },
  { emoji: '🎯', title: 'PPC / Paid Ads', desc: 'We run targeted ad campaigns that deliver maximum ROI with your targeted budget.', bg: '#f5e6c8', color: '#1a1a1a' },
  { emoji: '💻', title: 'Website Design & Dev', desc: 'Your website is your best salesperson. Fast, beautiful platforms that convert visitors.', bg: '#d4603a', color: '#fff' },
  { emoji: '✍️', title: 'Content Marketing', desc: 'Content is the backbone of digital marketing. We create content that engages, grows, and converts.', bg: '#e8f4f0', color: '#1a1a1a' },
  { emoji: '🎬', title: 'Video Marketing', desc: 'Video is the most powerful medium. We help brands tell their story through compelling visual content.', bg: '#4a9e85', color: '#fff' },
]

const WHY_US = [
  { n: '01', title: 'True 360° Coverage', desc: 'From strategy to execution, every channel covered under one roof.' },
  { n: '02', title: 'Multi-Industry Expertise', desc: 'We\'ve worked across 50+ industries — we understand your market.' },
  { n: '03', title: 'Data-Driven Always', desc: 'Every decision backed by real data, real analytics, real ROI.' },
  { n: '04', title: 'Custom Strategies', desc: 'No templates. Every plan is built specifically for your brand.' },
  { n: '05', title: 'Creative & Technical', desc: 'Design, copy, code — we do it all with the same team.' },
  { n: '06', title: 'Full Transparency', desc: 'Live dashboards, monthly reports, zero hidden fees.' },
  { n: '07', title: '500+ Proven Projects', desc: 'A track record that speaks louder than any promise.' },
]

const PLATFORMS = [
  { label: 'Instagram', dot: '#E1306C' },
  { label: 'Facebook', dot: '#1877F2' },
  { label: 'YouTube', dot: '#FF0000' },
  { label: 'LinkedIn', dot: '#0A66C2' },
  { label: 'Google Ads', dot: '#4285F4' },
  { label: 'WordPress', dot: '#21759B' },
  { label: 'Shopify', dot: '#96BF48' },
  { label: 'Mailchimp', dot: '#FFE01B' },
  { label: 'Canva', dot: '#00C4CC' },
  { label: 'Analytics', dot: '#E37400' },
  { label: 'SEMrush', dot: '#FF642D' },
  { label: 'WhatsApp', dot: '#25D366' },
]

/* ── count-up ── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const num = parseInt(target.replace(/\D/g, ''))
    if (!num) return
    const step = Math.ceil(num / (duration / 16))
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + step, num)
      setCount(cur)
      if (cur >= num) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [start, target, duration])
  return count + target.replace(/[0-9]/g, '')
}

function StatItem({ value, label }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const animated = useCountUp(value, 1800, vis)
  const num = animated.replace(/[^0-9]/g, '')
  const suffix = animated.replace(/[0-9]/g, '')
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 16px', borderRight: '1px solid rgba(0,0,0,0.08)' }} className="stat-item-last">
      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.4rem,5vw,3.2rem)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-2px', lineHeight: 1, marginBottom: 6 }}>
        {num}<span style={{ color: '#c8892a' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 13, color: '#888' }}>{label}</div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS)
  const [activeT, setActiveT] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [sent, setSent] = useState(false)
  const [pillHover, setPillHover] = useState(null)

  // scroll animation refs
  const [heroRef, heroInView] = useInView()
  const [marqueeRef, marqueeInView] = useInView()
  const [statsRef, statsInView] = useInView()
  const [servicesRef, servicesInView] = useInView()
  const [whyRef, whyInView] = useInView()
  const [platformsRef, platformsInView] = useInView()
  const [resultsRef, resultsInView] = useInView()
  const [testiRef, testiInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  useEffect(() => {
    supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const active = data.filter(t => t.is_active !== false)
          if (active.length > 0) {
            const mapped = active.slice(0, 4).map((t, i) => ({
              id: t.id, initials: (t.client_name || t.name || 'U')[0],
              name: t.client_name || t.name, handle: '@' + (t.client_name || 'client').toLowerCase().replace(/\s/g, ''),
              color: ['#c8892a','#4a9e85','#d4603a','#7C3AED'][i % 4], rating: t.rating || 5,
              quote: t.quote || t.review,
            }))
            setTestimonials(mapped)
          }
        }
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    await supabase.from('newsletter').insert([{ email }])
    setSent(true)
    setEmail(''); setName(''); setWebsite('')
  }

  const t = testimonials[activeT] || testimonials[0]

  return (
    <div style={{ overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .syne { font-family: 'Poppins', sans-serif !important; }
        .stat-item-last:last-child { border-right: none !important; }
        .service-card-wrap { transition: transform 0.25s; cursor: pointer; }
        .service-card-wrap:hover { transform: translateY(-5px); }
        .reason-item-wrap { transition: background 0.2s; }
        .reason-item-wrap:hover { background: rgba(255,255,255,0.04) !important; }
        .result-card-wrap { transition: transform 0.2s; }
        .result-card-wrap:hover { transform: translateY(-4px); }
        .testi-card-wrap { transition: all 0.2s; cursor: pointer; }
        .testi-card-wrap:hover { border-color: #c8892a !important; background: rgba(200,137,42,0.04) !important; }
        .testi-card-wrap.active-t { border-color: #c8892a !important; background: rgba(200,137,42,0.04) !important; }
        .footer-link-item { transition: color 0.2s; color: rgba(255,255,255,0.35); text-decoration: none; font-size: 13px; display: block; margin-bottom: 10px; }
        .footer-link-item:hover { color: #fefaef; }
        .social-btn-item { transition: background 0.2s; }
        .social-btn-item:hover { background: #c8892a !important; }
        @keyframes marqueeScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-row { display:flex; gap:40px; animation:marqueeScroll 22s linear infinite; width:max-content; }
        @keyframes barGrow { from{height:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hero-fade > * { animation: fadeUp 0.6s ease forwards; opacity: 0; }
        .hero-fade > *:nth-child(1) { animation-delay: 0s; }
        .hero-fade > *:nth-child(2) { animation-delay: 0.1s; }
        .hero-fade > *:nth-child(3) { animation-delay: 0.2s; }
        .hero-fade > *:nth-child(4) { animation-delay: 0.3s; }
        .ig-review-anim { transition: opacity 0.3s, transform 0.3s; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-mockup-col { display: none !important; }
          .services-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .reasons-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .results-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .testi-grid-2 { grid-template-columns: 1fr !important; }
          .testi-phone-col { display: none !important; }
          .cta-grid-2 { grid-template-columns: 1fr !important; }
          .footer-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .stats-grid-4 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .services-grid-3 { grid-template-columns: 1fr !important; }
          .reasons-grid-4 { grid-template-columns: 1fr !important; }
          .results-grid-3 { grid-template-columns: 1fr !important; }
          .footer-grid-4 { grid-template-columns: 1fr !important; }
          .stats-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .hero-section-pad { padding: 60px 20px 48px !important; }
          .section-pad { padding: 56px 20px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section ref={heroRef} className={`hero-section-pad reveal${heroInView ? ' in-view' : ''}`} style={{ background: '#fefaef', padding: '80px 48px 60px', position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,137,42,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,158,133,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

            {/* Left */}
            <div className={`hero-fade reveal-left${heroInView ? ' in-view' : ''}`}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f5e6c8', color: '#7a5a1e', fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 20, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: '#c8892a', borderRadius: '50%', flexShrink: 0 }} />
                360° Digital Marketing Agency
              </div>
              <h1 className="syne" style={{ fontSize: 'clamp(42px,5vw,68px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', color: '#1a1a1a', marginBottom: 20 }}>
                We Don't Just<br />Market.<br /><em style={{ fontStyle: 'normal', color: '#c8892a' }}>We Dominate.</em>
              </h1>
              <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
                Full-service digital marketing for brands that mean business. From SEO and paid ads to website development and social media — we handle everything.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/contact')} style={{ background: '#1a1a1a', color: '#fefaef', padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'transform 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  Get Free Audit →
                </button>
                <button onClick={() => navigate('/portfolio')} style={{ background: 'transparent', color: '#1a1a1a', padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, border: '1.5px solid #1a1a1a', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fefaef' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1a1a' }}>
                  View Our Work
                </button>
              </div>
            </div>

            {/* Right — dashboard mockup */}
            <div className={`hero-mockup-col reveal-right${heroInView ? ' in-view' : ''}`} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 460, background: '#1a1a1a', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -16, right: -16, background: '#c8892a', color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, padding: '10px 16px', borderRadius: 12, whiteSpace: 'nowrap', zIndex: 2 }}>
                  🔥 +340% ROI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Campaign Dashboard</span>
                  <span style={{ background: 'rgba(200,137,42,0.2)', color: '#c8892a', fontSize: 11, padding: '3px 10px', borderRadius: 20 }}>● Live</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  {[
                    { label: 'Organic Traffic', val: '+84%', color: '#4ade80' },
                    { label: 'Ad Revenue', val: '₹4.2L', color: '#c8892a' },
                    { label: 'Leads This Month', val: '1,240', color: '#60a5fa' },
                    { label: 'Bounce Rate', val: '-22%', color: '#f87171' },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{s.label}</div>
                      <div className="syne" style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
                  {[60,80,45,90,70,55,95].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: 48, background: 'rgba(255,255,255,0.08)', borderRadius: 4, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: `${h}%`, background: '#c8892a', opacity: 0.75, borderRadius: 4, animation: `barGrow 1s ease ${i * 0.1}s forwards` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFER IMAGE MARQUEE ── */}
      <div ref={marqueeRef} className={`reveal${marqueeInView ? ' in-view' : ''}`} style={{ background: '#111', padding: '10px 0', overflow: 'hidden', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg,#111,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(270deg,#111,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div className="marquee-row" style={{ gap: 24 }}>
          {[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8].map((n, i) => (
            <img key={i} src={`/offer-imgs/${n}.png`} alt={`offer-${n}`}
              style={{ height: 90, width: 'auto', flexShrink: 0, objectFit: 'contain', borderRadius: 6 }} />
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div ref={statsRef} className={`reveal${statsInView ? ' in-view' : ''}`} style={{ background: '#fefaef', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div className="stats-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '50+', label: 'Industries Served' },
              { value: '98%', label: 'Client Retention' },
              { value: '5X', label: 'Average ROI' },
            ].map((s, i) => (
              <div key={s.label} className={`reveal delay-${i + 1}${statsInView ? ' in-view' : ''}`}>
                <StatItem value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section ref={servicesRef} className="section-pad" style={{ background: '#fefaef', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className={`reveal${servicesInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>What We Do</div>
            <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16, color: '#1a1a1a' }}>
              Full-Service Digital<br />Marketing
            </h2>
            <p style={{ fontSize: 15, color: '#777', lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Every service under one roof. No gaps, no juggling vendors. Just results.</p>
          </div>

          <div className="services-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {SERVICE_CARDS.map((card, i) => (
              <div key={i} className={`reveal-scale delay-${i + 1}${servicesInView ? ' in-view' : ''} service-card-wrap`} onClick={() => navigate('/services')}
                style={{ position: 'relative', borderRadius: 20, padding: 28, background: card.bg, color: card.color, overflow: 'hidden', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* gloss top line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)', zIndex: 2 }} />
                {/* gloss overlay */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'linear-gradient(135deg,rgba(255,255,255,0.13) 0%,rgba(255,255,255,0.03) 100%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontSize: 20 }}>
                    {card.emoji}
                  </div>
                  <div className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>{card.title}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.75 }}>{card.desc}</p>
                </div>
                <div style={{ alignSelf: 'flex-end', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, position: 'relative', zIndex: 3 }}>↗</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section ref={whyRef} className="section-pad" style={{ background: '#1a1a1a', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className={`reveal-left${whyInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Why Choose Us</div>
            <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fefaef', marginBottom: 12 }}>
              7 Reasons Brands<br />Never Leave Us
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 420, marginBottom: 40 }}>We're not just an agency — we're a growth partner.</p>
          </div>

          <div className="reasons-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {WHY_US.map((item, i) => (
              <div key={i} className={`reveal delay-${i + 1}${whyInView ? ' in-view' : ''} reason-item-wrap`} style={{ background: '#1a1a1a', padding: '28px 24px' }}>
                <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: '#c8892a', marginBottom: 12 }}>{item.n}</div>
                <div className="syne" style={{ fontSize: 16, fontWeight: 700, color: '#fefaef', marginBottom: 8, lineHeight: 1.3 }}>{item.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
            <div className={`reveal delay-8${whyInView ? ' in-view' : ''} reason-item-wrap`} style={{ background: 'rgba(200,137,42,0.08)', border: '1px solid rgba(200,137,42,0.2)', padding: '28px 24px' }}>
              <div style={{ fontSize: 20, marginBottom: 12 }}>🏆</div>
              <div className="syne" style={{ fontSize: 16, fontWeight: 700, color: '#c8892a', marginBottom: 8, lineHeight: 1.3 }}>Award-Winning Agency</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>Recognized by top marketing bodies across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section ref={platformsRef} className="section-pad" style={{ background: '#fefaef', padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className={`reveal${platformsInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Platforms We Work On</div>
            <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#1a1a1a', marginBottom: 12 }}>
              One Agency.<br /><em style={{ fontStyle: 'normal', color: '#c8892a' }}>Every Platform.</em>
            </h2>
            <p style={{ fontSize: 15, color: '#777', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 40px' }}>We connect your brand across all major digital platforms, seamlessly.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, maxWidth: 640, margin: '0 auto' }}>
            {PLATFORMS.map((p, i) => (
              <div key={i} className={`${i < 8 ? `reveal-scale delay-${i + 1}` : 'reveal-scale'}${platformsInView ? ' in-view' : ''}`}
                onMouseEnter={() => setPillHover(i)} onMouseLeave={() => setPillHover(null)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: pillHover === i ? '#1a1a1a' : '#fff', border: `1px solid ${pillHover === i ? '#1a1a1a' : 'rgba(0,0,0,0.08)'}`, borderRadius: 40, padding: '10px 18px', fontSize: 13, fontWeight: 500, color: pillHover === i ? '#fefaef' : '#1a1a1a', transition: 'all 0.18s', cursor: 'pointer' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.dot, flexShrink: 0 }} />
                {p.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section ref={resultsRef} className="section-pad" style={{ background: '#f5e6c8', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className={`reveal-left${resultsInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Numbers That Prove It</div>
            <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#1a1a1a', marginBottom: 40 }}>
              Real Results,<br />Real Clients.
            </h2>
          </div>

          <div className="results-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { num: '300%', label: 'Organic Traffic Growth', client: 'TechSpark Solutions', industry: 'Technology · SEO + Content', time: '6 months' },
              { num: '400%', label: 'ROI Improvement', client: 'StyleHouse Fashion', industry: 'Fashion & Retail · Meta Ads', time: '8 months' },
              { num: '120+', label: 'Leads Per Month', client: 'GreenBuild Infra', industry: 'Real Estate · Google Ads', time: 'Ongoing' },
            ].map((r, i) => (
              <div key={i} className={`reveal-scale delay-${i + 1}${resultsInView ? ' in-view' : ''} result-card-wrap`} style={{ background: '#fefaef', borderRadius: 20, padding: 32, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="syne" style={{ fontSize: 'clamp(42px,6vw,56px)', fontWeight: 800, letterSpacing: '-2px', color: '#c8892a', lineHeight: 1, marginBottom: 8 }}>{r.num}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{r.label}</div>
                <div style={{ width: 32, height: 2, background: '#e0d0b8', margin: '12px 0' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{r.client}</div>
                <div style={{ fontSize: 12, color: '#999' }}>{r.industry} · {r.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section ref={testiRef} className="section-pad" style={{ background: '#fefaef', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="testi-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>

            {/* Left */}
            <div className={`reveal-left${testiInView ? ' in-view' : ''}`}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Client Stories</div>
              <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#1a1a1a', marginBottom: 12 }}>
                What Clients<br />Say About Us
              </h2>
              <p style={{ fontSize: 15, color: '#777', lineHeight: 1.7, marginBottom: 32 }}>Real reviews from real clients.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {testimonials.map((item, i) => (
                  <div key={item.id || i} className={`testi-card-wrap${activeT === i ? ' active-t' : ''}`}
                    onClick={() => setActiveT(i)}
                    style={{ background: '#fff', borderRadius: 16, padding: '18px 20px', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f5e6c8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: item.color, flexShrink: 0, border: `2px solid ${activeT === i ? item.color : 'transparent'}`, transition: 'border-color 0.2s' }}>
                      {item.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#c8892a', fontSize: 12, marginBottom: 3 }}>{'★'.repeat(item.rating || 5)}</div>
                      <div style={{ fontWeight: 500, fontSize: 14, color: '#1a1a1a', marginBottom: 2 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: '#aaa', marginBottom: 5 }}>{item.handle}</div>
                      <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>"{item.quote?.slice(0, 90)}{item.quote?.length > 90 ? '...' : ''}"</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — iPhone mockup */}
            <div className={`testi-phone-col reveal-right${testiInView ? ' in-view' : ''}`} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 260, position: 'relative' }}>
                <div style={{ background: '#1a1a1a', borderRadius: 44, padding: 12, border: '2px solid #333', boxShadow: '0 32px 80px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
                  {/* Notch */}
                  <div style={{ width: 90, height: 28, background: '#1a1a1a', borderRadius: '0 0 20px 20px', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 10, height: 10, background: '#222', borderRadius: '50%', border: '1px solid #444' }} />
                  </div>
                  {/* Screen */}
                  <div style={{ background: '#f9f9f9', borderRadius: 34, overflow: 'hidden' }}>
                    {/* Status */}
                    <div style={{ background: '#fff', padding: '10px 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#000' }}>9:41</span>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 10 }}>
                        {[4,6,8,10].map((h,i) => <div key={i} style={{ width: 3, height: h, background: '#000', borderRadius: 1 }} />)}
                      </div>
                    </div>
                    {/* IG topbar */}
                    <div style={{ background: '#fff', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '0.5px solid #eee' }}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 16, color: '#000' }}>Instagram</span>
                      <div style={{ display: 'flex', gap: 12, fontSize: 17 }}>
                        <span>♡</span><span>✉</span>
                      </div>
                    </div>
                    {/* Stories */}
                    <div style={{ background: '#fff', padding: '10px 12px', display: 'flex', gap: 10, overflow: 'hidden', borderBottom: '0.5px solid #eee' }}>
                      {[{init:'+',color:'#c8892a'},{init:'RS',color:'#c8892a'},{init:'PM',color:'#4a9e85'},{init:'AK',color:'#d4603a'}].map((s,i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                          <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: s.color, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13, color: '#fff' }}>{s.init}</div>
                          </div>
                          <span style={{ fontSize: 9, color: '#333' }}>{i === 0 ? 'Your story' : ['rahul...','priya...','amit...'][i-1]}</span>
                        </div>
                      ))}
                    </div>
                    {/* Post */}
                    <div style={{ background: '#fff' }}>
                      <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>C</div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#000' }}>clicksemurs</div>
                            <div style={{ fontSize: 10, color: '#999' }}>Client Review</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 18, color: '#999' }}>···</span>
                      </div>
                      {/* Review card */}
                      <div className="ig-review-anim" style={{ background: 'linear-gradient(135deg,#fefaef,#f5e6c8)', margin: '0 12px 10px', borderRadius: 12, padding: 14, border: '1px solid rgba(200,137,42,0.2)', minHeight: 140 }}>
                        <div style={{ color: '#c8892a', fontSize: 12, marginBottom: 6 }}>★★★★★</div>
                        <div style={{ fontSize: 11, color: '#444', lineHeight: 1.5, marginBottom: 10 }}>"{t.quote?.slice(0, 100)}..."</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 26, height: 26, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{t.initials}</div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: '#333' }}>{t.name}</div>
                            <div style={{ fontSize: 10, color: '#aaa' }}>{t.handle}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '4px 12px 10px', display: 'flex', gap: 14, fontSize: 16 }}>
                        <span>♡</span><span>💬</span><span>↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="section-pad" style={{ background: '#1a1a1a', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="cta-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div className={`reveal-left${ctaInView ? ' in-view' : ''}`}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Limited Spots Available</div>
              <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fefaef', marginBottom: 16 }}>
                Get Your FREE<br />Marketing Audit<br /><em style={{ fontStyle: 'normal', color: '#c8892a' }}>Today.</em>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 400 }}>No commitment. Just clarity on where your brand stands and exactly how to grow it.</p>
            </div>
            <div className={`reveal-right${ctaInView ? ' in-view' : ''}`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
              {sent ? (
                <div>
                  <p style={{ color: '#c8892a', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✓ We'll be in touch shortly.</p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Check your inbox within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="syne" style={{ fontSize: 18, fontWeight: 700, color: '#fefaef', marginBottom: 6 }}>Start with a Free Audit</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>We'll respond within 24 hours.</div>
                  {[
                    { placeholder: 'Your name', val: name, set: setName, type: 'text' },
                    { placeholder: 'Email address', val: email, set: setEmail, type: 'email' },
                    { placeholder: 'Website URL', val: website, set: setWebsite, type: 'text' },
                  ].map((f, i) => (
                    <input key={i} type={f.type} placeholder={f.placeholder} value={f.val} onChange={e => f.set(e.target.value)}
                      required={f.type === 'email'}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#fefaef', fontFamily: "'DM Sans',sans-serif", marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#c8892a'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  ))}
                  <button type="submit" style={{ width: '100%', background: '#c8892a', color: '#fff', padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", marginTop: 4, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    Get My Free Audit →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
