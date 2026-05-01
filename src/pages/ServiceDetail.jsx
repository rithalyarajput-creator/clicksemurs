import { useParams, Link } from 'react-router-dom'
import { services } from '../data/services'
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function ServiceDetail() {
  const { slug } = useParams()
  const svc = services.find(s => s.slug === slug)

  if (!svc) {
    return (
      <div style={{ minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fefaef', fontSize: '2rem', fontWeight: 900, marginBottom: 16 }}>Service Not Found</h1>
          <Link to="/services" className="btn-primary">Back to Services</Link>
        </div>
      </div>
    )
  }

  const Icon = svc.icon

  return (
    <div>
      {/* Hero */}
      <section style={{ background: '#1a1a1a', paddingTop: 128, paddingBottom: 80, borderBottom: '1px solid #2E2E2E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#aaaaaa', fontSize: 13, textDecoration: 'none', marginBottom: 32, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fefaef'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaaaaa'}>
            <FaArrowLeft size={12} /> Back to Services
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
            <div style={{ width: 64, height: 64, background: '#fefaef', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={28} color="#1a1a1a" />
            </div>
            <div>
              <span className="section-label" style={{ color: '#c8892a' }}>Service {String(svc.id).padStart(2,'0')}</span>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fefaef', lineHeight: 1.1 }}>
                {svc.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section style={{ background: '#fefaef', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64 }}>
            <div style={{ gridColumn: 'span 2' }}>
              <span className="section-label" style={{ color: '#777' }}>Overview</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: '#1a1a1a', marginBottom: 24 }}>
                What is {svc.title}?
              </h2>
              <p style={{ color: '#555', lineHeight: 1.8, fontSize: 17 }}>{svc.description}</p>
            </div>
            <div style={{ background: '#1a1a1a', padding: 32 }}>
              <h3 style={{ color: '#fefaef', fontWeight: 900, marginBottom: 16 }}>Quick Facts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['Service', svc.title], ['Coverage', '360° Full Service'], ['Reporting', 'Monthly + Real-time']].map(([k, v]) => (
                  <div key={k} style={{ borderBottom: '1px solid #2E2E2E', paddingBottom: 12 }}>
                    <div style={{ color: '#777', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{k}</div>
                    <div style={{ color: '#fefaef', fontSize: 14, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
                <Link to="/contact" className="btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
                  Get a Free Quote <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section style={{ background: '#1a1a1a', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64, alignItems: 'start' }}>
            <div>
              <span className="section-label" style={{ color: '#c8892a' }}>Our Deliverables</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: '#fefaef', marginBottom: 32 }}>What We Offer</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {svc.offerings.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <FaCheckCircle size={16} color="#c8892a" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ color: '#aaaaaa', fontSize: 14, lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="section-label" style={{ color: '#c8892a' }}>Our Advantage</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: '#fefaef', marginBottom: 24 }}>Why Choose Clicksemurs?</h2>
              <p style={{ color: '#aaaaaa', lineHeight: 1.8, marginBottom: 32 }}>{svc.whyUs}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['500+','Projects Delivered'],['98%','Client Retention'],['50+','Industries'],['5X','Average ROI']].map(([v,l]) => (
                  <div key={l} style={{ background: '#222', border: '1px solid #2E2E2E', padding: 20, textAlign: 'center' }}>
                    <div style={{ color: '#c8892a', fontWeight: 900, fontSize: 24 }}>{v}</div>
                    <div style={{ color: '#aaaaaa', fontSize: 12, marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fefaef', padding: '64px 0' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1a1a1a', marginBottom: 16 }}>
            Ready to Get Started with {svc.title}?
          </h2>
          <p style={{ color: '#777', marginBottom: 32 }}>Get a custom quote tailored to your business goals and budget.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <Link to="/contact" className="btn-dark">
              Get a Free Quote <FaArrowRight size={12} />
            </Link>
            <Link to="/services" className="btn-dark">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section style={{ background: '#1a1a1a', padding: '64px 0', borderTop: '1px solid #2E2E2E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 style={{ color: '#fefaef', fontWeight: 900, fontSize: 20, marginBottom: 32 }}>Other Services You Might Need</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {services.filter(s => s.id !== svc.id).slice(0, 4).map(s => {
              const SI = s.icon
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  style={{ background: '#222', border: '1px solid #2E2E2E', padding: 20, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#555'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#2E2E2E'}
                >
                  <SI size={14} color="#c8892a" />
                  <span style={{ color: '#fefaef', fontSize: 14, fontWeight: 500 }}>{s.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
