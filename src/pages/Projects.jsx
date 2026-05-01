import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { supabase } from '../admin/supabase'

const CATEGORIES = ['All', 'Website', 'Social Media', 'E-Commerce', 'Brand Logo', 'Product Photography', 'Other']

const SAMPLE = [
  { id: 's1', title: 'TechSpark Website Redesign', description: 'Full website redesign with modern UI, fast load times and conversion-focused layout.', category: 'Website', brand_logo_url: '', image1: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80', image2: '', image3: '', image4: '', image5: '', is_active: true },
  { id: 's2', title: 'StyleHouse Social Campaign', description: 'Instagram & Facebook content strategy with branded posts driving 3x engagement.', category: 'Social Media', brand_logo_url: '', image1: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', image2: '', image3: '', image4: '', image5: '', is_active: true },
  { id: 's3', title: 'FoodieHub E-Commerce Store', description: 'Shopify store with custom design, product pages and checkout optimization.', category: 'E-Commerce', brand_logo_url: '', image1: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', image2: '', image3: '', image4: '', image5: '', is_active: true },
  { id: 's4', title: 'GreenBuild Brand Identity', description: 'Complete brand identity including logo, color palette, typography and brand guidelines.', category: 'Brand Logo', brand_logo_url: '', image1: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80', image2: '', image3: '', image4: '', image5: '', is_active: true },
]

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(28px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const images = [project.image1, project.image2, project.image3, project.image4, project.image5].filter(Boolean)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }} />
      <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', maxWidth: 860, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', zIndex: 1 }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {project.brand_logo_url && (
              <img src={project.brand_logo_url} alt="logo" style={{ height: 36, width: 'auto', objectFit: 'contain', borderRadius: 6 }} />
            )}
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>{project.title}</h2>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#c8892a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{project.category}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div style={{ padding: 28 }}>
          {/* Main image */}
          {images.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ borderRadius: 12, overflow: 'hidden', background: '#f8fafc', marginBottom: 10 }}>
                <img src={images[activeImg]} alt="" style={{ width: '100%', maxHeight: 420, objectFit: 'contain', display: 'block' }} />
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 52, borderRadius: 8, overflow: 'hidden', border: activeImg === i ? '2px solid #0f172a' : '2px solid transparent', cursor: 'pointer', padding: 0, background: 'none' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {project.description && (
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>{project.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    supabase.from('projects').select('*').eq('is_active', true).order('created_at', { ascending: false })
      .then(({ data }) => {
        setProjects(data && data.length > 0 ? data : SAMPLE)
        setLoading(false)
      })
      .catch(() => { setProjects(SAMPLE); setLoading(false) })
  }, [])

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)

  const catCounts = {}
  CATEGORIES.forEach(c => {
    catCounts[c] = c === 'All' ? projects.length : projects.filter(p => p.category === c).length
  })

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #0a0a0a 100%)', padding: 'clamp(96px,12vw,140px) 0 clamp(56px,6vw,72px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(244,161,0,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,161,0,0.1)', border: '1px solid rgba(244,161,0,0.25)', borderRadius: 100, padding: '5px 16px', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8892a', display: 'inline-block' }} />
            <span style={{ color: '#c8892a', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Portfolio</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Creative Work That<br /><span style={{ color: '#c8892a' }}>Drives Real Results</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 'clamp(14px, 2.5vw, 17px)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Websites, social media, e-commerce, branding — see our best work across every digital discipline.
          </p>

          {/* Category count pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {CATEGORIES.filter(c => catCounts[c] > 0).map(c => (
              <div key={c} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '6px 16px', fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                {c} <span style={{ color: '#c8892a', marginLeft: 4 }}>{catCounts[c]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ background: '#f8fafc', padding: 'clamp(48px,6vw,72px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Filter bar */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{
                padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', borderRadius: 100,
                border: activeCategory === c ? '1px solid #0f172a' : '1px solid #e2e8f0',
                background: activeCategory === c ? '#0f172a' : '#fff',
                color: activeCategory === c ? '#fff' : '#64748b',
                transition: 'all 0.15s'
              }}>
                {c}
                {catCounts[c] > 0 && <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>{catCounts[c]}</span>}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading projects...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block' }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <p style={{ fontWeight: 600 }}>No projects in this category yet</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {filtered.map((p, i) => {
                const images = [p.image1, p.image2, p.image3, p.image4, p.image5].filter(Boolean)
                return (
                  <FadeIn key={p.id} delay={i * 60}>
                    <div
                      style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
                      onClick={() => setSelected(p)}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
                    >
                      {/* Image area */}
                      <div style={{ height: 220, background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
                        {p.image1 ? (
                          <img src={p.image1} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        ) : (
                          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <span style={{ color: '#cbd5e1', fontSize: 12 }}>No image</span>
                          </div>
                        )}

                        {/* Overlay badges */}
                        <div style={{ position: 'absolute', top: 12, left: 12 }}>
                          <span style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{p.category}</span>
                        </div>
                        {images.length > 1 && (
                          <div style={{ position: 'absolute', top: 12, right: 12 }}>
                            <span style={{ background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 8px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                              {images.length}
                            </span>
                          </div>
                        )}

                        {/* View overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.35)'; e.currentTarget.querySelector('span').style.opacity = '1' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.querySelector('span').style.opacity = '0' }}>
                          <span style={{ background: '#fff', color: '#0f172a', fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 100, opacity: 0, transition: 'opacity 0.2s', pointerEvents: 'none' }}>
                            View Project
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '18px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          {p.brand_logo_url && (
                            <img src={p.brand_logo_url} alt="logo" style={{ height: 28, width: 'auto', maxWidth: 64, objectFit: 'contain', borderRadius: 4, flexShrink: 0 }} />
                          )}
                          <h3 style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', lineHeight: 1.3, flex: 1 }}>{p.title}</h3>
                        </div>
                        {p.description && (
                          <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                            {p.description.length > 90 ? p.description.slice(0, 90) + '...' : p.description}
                          </p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#0f172a', fontSize: 13, fontWeight: 700 }}>
                          View Project <FaArrowRight size={10} />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0f172a', padding: 'clamp(56px,6vw,80px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(244,161,0,0.1) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto px-6 lg:px-8" style={{ textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em' }}>
            Want a Project Like This?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>Let's build something remarkable together.</p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#c8892a', color: '#111', padding: '14px 32px', fontWeight: 800, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 8 }}>
            Start Your Project <FaArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
