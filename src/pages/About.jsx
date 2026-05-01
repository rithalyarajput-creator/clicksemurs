import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { supabase } from '../admin/supabase'

const DEFAULTS = {
  hero_label: 'Who We Are',
  hero_title: 'Built for Brands That Mean Business.',
  hero_subtitle: 'We are a full-service 360° Digital Marketing Agency combining cutting-edge technology, creative excellence, and data-driven intelligence.',
  story_heading: 'Where Strategy Meets Creativity',
  story_p1: 'Welcome to Clicksemurs — where strategy meets creativity and data drives every decision. We are a full-service 360° Digital Marketing Agency built for brands that are serious about growing in the digital world.',
  story_p2: 'At Clicksemurs, we do not just run campaigns — we build digital ecosystems. From the moment a potential customer first hears about your brand to the point they become a loyal advocate, we are with you at every step.',
  story_p3: 'Founded with a mission to make powerful digital marketing accessible to every business — whether you are a bold startup, a growing SME, or an established enterprise — we bring together cutting-edge technology, creative excellence, and data-driven intelligence to deliver measurable growth.',
  stat1_value: '500+', stat1_label: 'Projects',
  stat2_value: '50+', stat2_label: 'Industries',
  stat3_value: '98%', stat3_label: 'Retention',
  stat4_value: '5X', stat4_label: 'ROI',
  vision_text: 'To be the most trusted and results-driven digital marketing partner for businesses across every industry — helping brands not just compete, but lead in the digital age.',
  mission_text: 'To deliver 360° digital marketing solutions that drive real, measurable business growth — combining creativity, technology, and strategy to turn clicks into customers and brands into market leaders.',
  team_heading: 'The People Behind Your Growth',
  team_subheading: 'A diverse, passionate team of digital experts bringing together marketing, technology, design, and strategy.',
  team_member1_name: 'Aryan Mehta', team_member1_role: 'Founder & CEO', team_member1_exp: '12+ years in digital marketing',
  team_member2_name: 'Sneha Joshi', team_member2_role: 'Creative Director', team_member2_exp: 'Brand & visual storytelling',
  team_member3_name: 'Ravi Kumar', team_member3_role: 'Head of SEO & Content', team_member3_exp: 'Technical SEO expert',
  team_member4_name: 'Pooja Singh', team_member4_role: 'Performance Marketing Lead', team_member4_exp: 'Google & Meta Ads specialist',
  cta_heading: 'Ready to Work Together?',
  cta_subtext: "Let's build something remarkable. Get your free audit today.",
}

const values = [
  { title: 'Excellence', desc: 'We hold ourselves to the highest standards in every project, campaign, and deliverable. Good enough is never enough.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
  { title: 'Innovation', desc: 'We stay ahead of digital trends, constantly exploring new platforms, tools, and strategies to keep clients at the forefront.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg> },
  { title: 'Integrity', desc: "We operate with complete honesty. Clients always know what we're doing, why, and what results it's producing.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: 'Results-First', desc: 'Every strategy and creative piece is designed with one goal — delivering measurable, meaningful results.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { title: 'Client Partnership', desc: "We don't see ourselves as a vendor. We are your growth partner. Your success is our success.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { title: 'Diversity & Inclusion', desc: 'We celebrate diversity in our team and clients. Different perspectives make us stronger and more creative.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
]

const AVATAR_COLORS = ['#6366f1','#0ea5e9','#10b981','#f59e0b']

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, visible] = useInView(0.3)
  const num = parseInt(target)
  useEffect(() => {
    if (!visible || isNaN(num)) return
    let start = 0
    const step = Math.ceil(num / 40)
    const t = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(t) }
      else setCount(start)
    }, 30)
    return () => clearInterval(t)
  }, [visible, num])
  if (isNaN(num)) return <span ref={ref}>{target}</span>
  return <span ref={ref}>{count}{suffix}</span>
}

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView(0.1)
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`
    }}>
      {children}
    </div>
  )
}

export default function About() {
  const [d, setD] = useState(DEFAULTS)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      if (!rows) return
      const obj = { ...DEFAULTS }
      rows.forEach(r => { if (r.value && r.key in DEFAULTS) obj[r.key] = r.value })
      setD(obj)
    })
  }, [])

  const team = [
    { name: d.team_member1_name, role: d.team_member1_role, exp: d.team_member1_exp },
    { name: d.team_member2_name, role: d.team_member2_role, exp: d.team_member2_exp },
    { name: d.team_member3_name, role: d.team_member3_role, exp: d.team_member3_exp },
    { name: d.team_member4_name, role: d.team_member4_role, exp: d.team_member4_exp },
  ]

  const stats = [
    { value: d.stat1_value, label: d.stat1_label },
    { value: d.stat2_value, label: d.stat2_label },
    { value: d.stat3_value, label: d.stat3_label },
    { value: d.stat4_value, label: d.stat4_label },
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #111827 60%, #1a1a1a 100%)', position: 'relative', overflow: 'hidden', padding: '100px 0 80px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(200,137,42,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(200,137,42,0.04) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,42,0.12)', border: '1px solid rgba(200,137,42,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8892a', display: 'inline-block' }} />
              <span style={{ color: '#c8892a', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{d.hero_label}</span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fefaef', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
              {d.hero_title.split(' ').map((word, i) => (
                <span key={i}>{i === 3 ? <span style={{ color: '#c8892a' }}>{word} </span> : word + ' '}</span>
              ))}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ color: '#aaaaaa', fontSize: 18, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.7 }}>{d.hero_subtitle}</p>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#c8892a', color: '#fff', padding: '13px 28px', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 6, transition: 'opacity 0.2s' }}>
                Work With Us <FaArrowRight size={11} />
              </Link>
              <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fefaef', padding: '13px 28px', fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, transition: 'all 0.2s' }}>
                Our Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ background: '#fefaef', padding: '96px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
            <FadeIn>
              <div>
                <span style={{ display: 'inline-block', color: '#c8892a', fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>Our Story</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.15, marginBottom: 28, letterSpacing: '-0.02em' }}>{d.story_heading}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[d.story_p1, d.story_p2, d.story_p3].map((p, i) => (
                    <p key={i} style={{ color: '#555', lineHeight: 1.8, fontSize: 15 }}>{p}</p>
                  ))}
                </div>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32, background: '#1a1a1a', color: '#fefaef', padding: '12px 26px', fontWeight: 700, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 6 }}>
                  Start Your Journey <FaArrowRight size={11} />
                </Link>
              </div>
            </FadeIn>

            {/* Logo + Stats Panel */}
            <FadeIn delay={150}>
              <div style={{ background: '#1a1a1a', borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(200,137,42,0.12) 0%, transparent 60%)' }} />
                <div style={{ padding: '40px 32px', textAlign: 'center', position: 'relative' }}>
                  <div style={{ marginBottom: 32 }}>
                    <img src="/logo.png" alt="Clicksemurs" style={{ height: 56, width: 'auto', margin: '0 auto', display: 'block' }} />
                    <div style={{ color: '#aaaaaa', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 10, fontWeight: 600 }}>360° Digital Marketing Agency</div>
                  </div>
                  <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,137,42,0.4), transparent)', marginBottom: 32 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    {stats.map((s, i) => {
                      const numPart = s.value.replace(/[^0-9]/g, '')
                      const suffix = s.value.replace(/[0-9]/g, '')
                      return (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: '20px 16px', borderRadius: i === 0 ? '12px 0 0 0' : i === 1 ? '0 12px 0 0' : i === 2 ? '0 0 0 12px' : '0 0 12px 0' }}>
                          <div style={{ color: '#c8892a', fontWeight: 900, fontSize: 28, lineHeight: 1 }}>
                            <AnimatedCounter target={numPart} suffix={suffix} />
                          </div>
                          <div style={{ color: '#aaaaaa', fontSize: 12, marginTop: 4, fontWeight: 600, letterSpacing: '0.05em' }}>{s.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ background: '#1a1a1a', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(200,137,42,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(200,137,42,0.04) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span style={{ display: 'inline-block', color: '#c8892a', fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>Our Purpose</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#fefaef', letterSpacing: '-0.02em' }}>Vision & Mission</h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {[
              { label: 'Our Vision', text: d.vision_text, icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, accent: '#6366f1' },
              { label: 'Our Mission', text: d.mission_text, icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/></svg>, accent: '#c8892a' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '40px 36px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: `linear-gradient(180deg, ${item.accent}, transparent)` }} />
                  <div style={{ marginBottom: 20 }}>{item.icon}</div>
                  <h3 style={{ color: '#fefaef', fontWeight: 800, fontSize: 20, marginBottom: 16 }}>{item.label}</h3>
                  <p style={{ color: '#aaaaaa', lineHeight: 1.8, fontSize: 15 }}>{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Build Trust ── */}
      <section style={{ background: '#fefaef', padding: 'clamp(64px,8vw,96px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, rgba(200,137,42,0.07) 39px, rgba(200,137,42,0.07) 40px)', opacity: 0.5 }} />

        <div className="max-w-4xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{ display: 'inline-block', color: '#c8892a', fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>Our Approach</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                How We Build<br /><span style={{ color: '#c8892a' }}>Trust With You</span>
              </h2>
            </div>
          </FadeIn>

          {/* Cards zigzag */}
          {[
            { num: '01', title: 'Real Client Testimonials', desc: "We let our clients do the talking. Real names, real businesses, real results — not generic reviews. Every testimonial reflects a genuine growth story we're proud of.", bg: '#fff1eb', numColor: '#e8623a', pin: '#e8623a' },
            { num: '02', title: 'Awards & Certifications', desc: 'Google Partner, Meta Certified, industry awards — we display our credentials because your trust must be earned, not assumed.', bg: '#e8eeff', numColor: '#4f6ef7', pin: '#4f6ef7' },
            { num: '03', title: 'Always Reachable', desc: "We believe you should never feel alone. Direct phone, WhatsApp, email, and dedicated account managers — we're there when you need us, not just during business hours.", bg: '#ede8ff', numColor: '#7c3aed', pin: '#7c3aed' },
            { num: '04', title: 'Detailed Case Studies', desc: "Numbers don't lie. We document every campaign — before, after, and why. Our case studies show exactly what we did, how we did it, and the results it delivered.", bg: '#fff1eb', numColor: '#e8623a', pin: '#e8623a' },
            { num: '05', title: 'Transparent Reporting', desc: "No jargon, no hidden numbers. Every client gets clear monthly reports showing exactly where their budget went and what it achieved. Full transparency, always.", bg: '#e8eeff', numColor: '#4f6ef7', pin: '#4f6ef7' },
          ].map((card, i) => {
            const isRight = i % 2 === 1
            return (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ position: 'relative', marginBottom: i < 4 ? 0 : 0 }}>
                  {/* Dashed connector line (not on last) */}
                  {i < 4 && (
                    <div style={{
                      position: 'absolute',
                      bottom: -48,
                      left: isRight ? '25%' : '72%',
                      width: 2,
                      height: 56,
                      borderLeft: '2.5px dashed #b0b8c9',
                      zIndex: 0,
                      transform: `rotate(${isRight ? '15deg' : '-15deg'})`,
                    }} />
                  )}

                  <div style={{
                    display: 'flex',
                    justifyContent: isRight ? 'flex-end' : 'flex-start',
                    marginBottom: 56,
                  }}>
                    <div style={{
                      width: 'min(360px, 88vw)',
                      background: card.bg,
                      borderRadius: 18,
                      padding: '32px 32px 28px',
                      position: 'relative',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
                      transform: `rotate(${i % 2 === 0 ? '-1.2deg' : '1.2deg'})`,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? '-1.2deg' : '1.2deg'})`; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)' }}
                    >
                      {/* Pin */}
                      <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                        <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                          <ellipse cx="14" cy="14" rx="13" ry="13" fill={card.pin} />
                          <ellipse cx="10" cy="10" rx="4" ry="4" fill="rgba(255,255,255,0.3)" />
                          <rect x="13" y="25" width="2" height="11" rx="1" fill={card.pin} />
                        </svg>
                      </div>

                      {/* Number */}
                      <div style={{ color: card.numColor, fontSize: 15, fontWeight: 800, letterSpacing: '0.05em', marginBottom: 10, marginTop: 4, fontFamily: 'monospace' }}>{card.num}</div>

                      {/* Title */}
                      <h3 style={{ color: '#1a1a1a', fontWeight: 900, fontSize: 22, marginBottom: 14, lineHeight: 1.2 }}>{card.title}</h3>

                      {/* Desc */}
                      <p style={{ color: '#555', fontSize: 14, lineHeight: 1.75 }}>{card.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </section>

      {/* Core Values */}
      <section style={{ background: '#fefaef', padding: '96px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div style={{ marginBottom: 56 }}>
              <span style={{ display: 'inline-block', color: '#c8892a', fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>What Drives Us</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.02em' }}>Our Core Values</h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: '32px 28px', background: '#fff', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ width: 48, height: 48, background: '#1a1a1a', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: '#c8892a' }}>
                    {v.icon}
                  </div>
                  <h3 style={{ color: '#1a1a1a', fontWeight: 800, fontSize: 17, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: '#1a1a1a', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
          <FadeIn>
            <div style={{ marginBottom: 56 }}>
              <span style={{ display: 'inline-block', color: '#c8892a', fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>The People</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#fefaef', letterSpacing: '-0.02em', marginBottom: 12 }}>{d.team_heading}</h2>
              <p style={{ color: '#aaaaaa', fontSize: 15, maxWidth: 500 }}>{d.team_subheading}</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {team.map((member, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '36px 24px', textAlign: 'center', transition: 'border-color 0.2s, background 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(200,137,42,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: AVATAR_COLORS[i % AVATAR_COLORS.length], margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontSize: 26, fontWeight: 900 }}>{(member.name || '?')[0]}</span>
                  </div>
                  <h3 style={{ color: '#fefaef', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{member.name}</h3>
                  <p style={{ color: '#c8892a', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{member.role}</p>
                  <p style={{ color: '#aaaaaa', fontSize: 12 }}>{member.exp}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #111827 100%)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(200,137,42,0.12) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center" style={{ position: 'relative' }}>
          <FadeIn>
            <div style={{ width: 64, height: 64, background: 'rgba(200,137,42,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#fefaef', marginBottom: 16, letterSpacing: '-0.02em' }}>{d.cta_heading}</h2>
            <p style={{ color: '#aaaaaa', fontSize: 17, marginBottom: 36, lineHeight: 1.6 }}>{d.cta_subtext}</p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#c8892a', color: '#fff', padding: '15px 36px', fontWeight: 800, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 8, transition: 'opacity 0.2s' }}>
              Get Your Free Audit <FaArrowRight size={12} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
