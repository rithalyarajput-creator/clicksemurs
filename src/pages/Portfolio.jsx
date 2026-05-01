import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const caseStudies = [
  { id:1, client:'TechSpark Solutions', industry:'Technology', challenge:'Low organic traffic and poor search visibility', solution:'Full SEO overhaul + content strategy', result:'300%', resultLabel:'Organic Traffic Growth', period:'6 months', service:'SEO + Content', before:'1,200 visits/mo', after:'4,800 visits/mo', accent:'#6366f1' },
  { id:2, client:'StyleHouse Fashion', industry:'Fashion', challenge:'High ad spend with low ROAS on Meta Ads', solution:'Audience restructure + creative A/B testing', result:'400%', resultLabel:'ROI Improvement', period:'8 months', service:'Meta Ads', before:'1.2x ROAS', after:'5.8x ROAS', accent:'#ec4899' },
  { id:3, client:'GreenBuild Infrastructure', industry:'Real Estate', challenge:'No digital presence, zero online leads', solution:'Full website + SEO + Google Ads', result:'120+', resultLabel:'Leads Per Month', period:'4 months', service:'Google Ads + SEO', before:'0 online leads', after:'120+ leads/mo', accent:'#10b981' },
  { id:4, client:'HealthFirst Clinic', industry:'Healthcare', challenge:'Negative reviews damaging reputation', solution:'ORM + review generation strategy', result:'4.7★', resultLabel:'Star Rating Achieved', period:'3 months', service:'ORM', before:'3.1★ rating', after:'4.7★ rating', accent:'#f59e0b' },
  { id:5, client:'EduLearn Platform', industry:'Education', challenge:'Low app downloads and course enrollment', solution:'Social media marketing + influencer campaigns', result:'5X', resultLabel:'Monthly Enrollments', period:'5 months', service:'Social Media', before:'200 enrollments/mo', after:'1,000+ enrollments/mo', accent:'#3b82f6' },
  { id:6, client:'FoodieHub Restaurant Chain', industry:'Food & Beverage', challenge:'No social presence and declining footfall', solution:'Instagram marketing + local SEO', result:'40%', resultLabel:'Footfall Increase', period:'3 months', service:'Instagram + Local SEO', before:'800 monthly footfall', after:'1,120 footfall/mo', accent:'#f97316' },
  { id:7, client:'AutoMax Dealership', industry:'Automobile', challenge:'High cost per lead on paid ads', solution:'Google Ads restructure + landing pages', result:'65%', resultLabel:'CPL Reduction', period:'2 months', service:'Google Ads', before:'₹4,500 CPL', after:'₹1,575 CPL', accent:'#14b8a6' },
  { id:8, client:'FinGrow Wealth Mgmt', industry:'Finance', challenge:'No thought leadership content', solution:'Content marketing + LinkedIn strategy', result:'800%', resultLabel:'LinkedIn Engagement', period:'6 months', service:'LinkedIn + Content', before:'200 impressions/post', after:'1,800+ impressions', accent:'#8b5cf6' },
]

const industries = ['All', 'Technology', 'Fashion', 'Real Estate', 'Healthcare', 'Education', 'Food & Beverage', 'Automobile', 'Finance']

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? caseStudies : caseStudies.filter(c => c.industry === active)

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #0a0a0a 100%)', padding: 'clamp(96px,12vw,140px) 0 clamp(56px,8vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40vw', maxWidth: 400, height: '100%', backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(244,161,0,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,161,0,0.1)', border: '1px solid rgba(244,161,0,0.25)', borderRadius: 100, padding: '5px 16px', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8892a', display: 'inline-block' }} />
            <span style={{ color: '#c8892a', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Work</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Results That<br /><span style={{ color: '#c8892a' }}>Speak for Themselves</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 'clamp(14px, 2.5vw, 17px)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Real clients. Real numbers. Zero fluff. Explore our case studies across 50+ industries.
          </p>
          {/* Stats strip */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0, borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', marginTop: 40 }}>
            {[['500+','Projects'],['50+','Industries'],['98%','Retention'],['5X','Avg. ROI']].map(([v, l], i) => (
              <div key={i} style={{ padding: 'clamp(16px,3vw,28px) clamp(20px,4vw,48px)', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', minWidth: 100 }}>
                <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#c8892a', lineHeight: 1 }}>{v}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4, letterSpacing: '0.05em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Cards */}
      <section style={{ background: '#f8fafc', padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Filter chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
            {industries.map(ind => (
              <button key={ind} onClick={() => setActive(ind)} style={{
                padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', borderRadius: 100,
                border: active === ind ? '1px solid #0f172a' : '1px solid #e2e8f0',
                background: active === ind ? '#0f172a' : '#fff',
                color: active === ind ? '#fff' : '#64748b',
                transition: 'all 0.15s'
              }}>
                {ind}
              </button>
            ))}
          </div>

          {/* Case study cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map((cs, i) => (
              <FadeIn key={cs.id} delay={i * 60}>
                <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s, transform 0.2s', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>

                  {/* Card header */}
                  <div style={{ background: '#0f172a', padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: cs.accent }} />
                    <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: `${cs.accent}15` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{cs.client}</div>
                        <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cs.industry}</div>
                      </div>
                      <div style={{ background: `${cs.accent}20`, border: `1px solid ${cs.accent}40`, borderRadius: 8, padding: '4px 10px', flexShrink: 0 }}>
                        <span style={{ color: cs.accent, fontSize: 11, fontWeight: 700 }}>{cs.service}</span>
                      </div>
                    </div>
                    {/* Big metric */}
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                      <div style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: cs.accent, lineHeight: 1 }}>{cs.result}</div>
                      <div style={{ paddingBottom: 4 }}>
                        <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{cs.resultLabel}</div>
                        <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{cs.period}</div>
                      </div>
                    </div>
                  </div>

                  {/* Before / After */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ padding: '16px 20px', borderRight: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Before</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>{cs.before}</div>
                    </div>
                    <div style={{ padding: '16px 20px', background: '#f0fdf4' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>After</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#16a34a' }}>{cs.after}</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Challenge: </span>
                      <span style={{ fontSize: 13.5, color: '#475569' }}>{cs.challenge}</span>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Solution: </span>
                      <span style={{ fontSize: 13.5, color: '#475569' }}>{cs.solution}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: cs.accent, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{cs.result} {cs.resultLabel}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <div style={{ fontWeight: 600 }}>No case studies in this category yet</div>
            </div>
          )}
        </div>
      </section>

      {/* Process Strip */}
      <section style={{ background: '#0f172a', padding: 'clamp(48px,6vw,72px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: '#c8892a', fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>How We Work</span>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Our Proven Process</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
            {[
              { step: '01', label: 'Discovery', desc: 'Deep dive into your brand, goals & competitors' },
              { step: '02', label: 'Strategy', desc: 'Custom data-backed plan for your market' },
              { step: '03', label: 'Execution', desc: 'Creative campaigns built by specialists' },
              { step: '04', label: 'Optimize', desc: 'Continuous testing and performance tuning' },
              { step: '05', label: 'Scale', desc: 'Double down on what drives best results' },
            ].map((p, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: 'rgba(255,255,255,0.04)', position: 'absolute', top: 8, right: 12, lineHeight: 1 }}>{p.step}</div>
                <div style={{ color: '#c8892a', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>{p.step}</div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{p.label}</div>
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 100%)', padding: 'clamp(56px,8vw,96px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(244,161,0,0.1) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto px-6 lg:px-8" style={{ textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>
            Want Results Like These?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
            Get a free digital audit and see exactly how we can transform your business metrics.
          </p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#c8892a', color: '#111', padding: '15px 36px', fontWeight: 800, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 8 }}>
            Get Your Free Audit <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  )
}
