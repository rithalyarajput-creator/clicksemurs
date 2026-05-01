import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { services } from '../data/services'
import { FaArrowRight } from 'react-icons/fa'

export default function Services() {
  return (
    <div>
      <PageHero
        label="What We Do"
        title="Full 360° Digital Marketing Services"
        subtitle="Every digital marketing service your brand needs — under one roof. From SEO to video, from ads to analytics."
      />

      <section style={{ background: '#fefaef', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(svc => {
              const Icon = svc.icon
              return (
                <div key={svc.id} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: 32, display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} color="white" />
                    </div>
                    <span style={{ color: '#e5e5e5', fontWeight: 900, fontSize: 28 }}>
                      {String(svc.id).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 style={{ color: '#1a1a1a', fontWeight: 900, fontSize: 19, marginBottom: 12 }}>{svc.title}</h3>
                  <p style={{ color: '#777', fontSize: 14, lineHeight: 1.7, flex: 1, marginBottom: 24 }}>{svc.short}</p>
                  <Link
                    to={`/services/${svc.slug}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1a1a1a', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c8892a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}
                  >
                    Learn More <FaArrowRight size={10} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: '#1a1a1a', padding: '64px 0', borderTop: '1px solid #2E2E2E' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 style={{ color: '#fefaef', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16 }}>Not Sure Which Service You Need?</h2>
          <p style={{ color: '#aaaaaa', marginBottom: 32 }}>Get a free digital audit and our experts will recommend the right strategy for your business.</p>
          <Link to="/contact" className="btn-primary">
            Get Free Consultation <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  )
}
