import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'

const megaMenu = [
  {
    heading: 'Social Media',
    items: [
      { label: 'Social Media Marketing', slug: 'social-media-marketing' },
      { label: 'Instagram Marketing', slug: 'social-media-marketing' },
      { label: 'Facebook Marketing', slug: 'social-media-marketing' },
      { label: 'LinkedIn Marketing', slug: 'social-media-marketing' },
      { label: 'YouTube Marketing', slug: 'video-marketing' },
      { label: 'Influencer Marketing', slug: 'influencer-marketing' },
    ],
  },
  {
    heading: 'SEO & Content',
    items: [
      { label: 'Search Engine Optimization', slug: 'seo' },
      { label: 'Local SEO', slug: 'seo' },
      { label: 'Technical SEO', slug: 'seo' },
      { label: 'Content Marketing', slug: 'content-marketing' },
      { label: 'Blog Writing', slug: 'content-marketing' },
      { label: 'Online Reputation (ORM)', slug: 'online-reputation-management' },
    ],
  },
  {
    heading: 'Paid Ads',
    items: [
      { label: 'Google Ads / PPC', slug: 'ppc-paid-ads' },
      { label: 'Meta Ads (Facebook & Instagram)', slug: 'ppc-paid-ads' },
      { label: 'YouTube Advertising', slug: 'ppc-paid-ads' },
      { label: 'LinkedIn Ads', slug: 'ppc-paid-ads' },
      { label: 'Retargeting Campaigns', slug: 'ppc-paid-ads' },
      { label: 'Analytics & Performance', slug: 'analytics-performance-marketing' },
    ],
  },
  {
    heading: 'Website & Email',
    items: [
      { label: 'Website Design & Development', slug: 'website-design-development' },
      { label: 'WordPress Development', slug: 'website-design-development' },
      { label: 'Shopify Development', slug: 'website-design-development' },
      { label: 'E-Commerce Website', slug: 'website-design-development' },
      { label: 'Landing Page Design', slug: 'website-design-development' },
      { label: 'Email Marketing & Automation', slug: 'email-marketing' },
    ],
  },
]

const portfolioMenu = [
  { label: 'Case Studies', to: '/portfolio', desc: 'Real results across 50+ industries' },
  { label: 'Projects Gallery', to: '/projects', desc: 'Websites, social media, branding & more' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const megaRef = useRef(null)
  const portfolioRef = useRef(null)
  const timeoutRef = useRef(null)
  const portfolioTimeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setOpen(false); setMegaOpen(false); setPortfolioOpen(false) }, [location])

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setMegaOpen(true) }
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setMegaOpen(false), 150) }
  const handlePortfolioEnter = () => { clearTimeout(portfolioTimeoutRef.current); setPortfolioOpen(true) }
  const handlePortfolioLeave = () => { portfolioTimeoutRef.current = setTimeout(() => setPortfolioOpen(false), 150) }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')
  const isServicesActive = location.pathname.startsWith('/services')
  const isPortfolioActive = location.pathname.startsWith('/portfolio') || location.pathname.startsWith('/projects')

  // pill nav item style
  const pillStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '7px 16px',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.01em',
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none',
    transition: 'all 0.18s',
    background: active
      ? 'linear-gradient(180deg, #2a2a2a 0%, #111 100%)'
      : 'transparent',
    color: active ? '#fff' : '#999',
    boxShadow: active
      ? '0 1px 0 rgba(255,255,255,0.08) inset, 0 -2px 0 rgba(0,0,0,0.6) inset, 0 4px 12px rgba(0,0,0,0.5)'
      : 'none',
  })

  return (
    <>
      <style>{`
        .nav-pill:hover {
          color: #fff !important;
          background: rgba(255,255,255,0.06) !important;
        }
        .nav-pill-active:hover {
          opacity: 0.9;
        }
        @media (max-width: 768px) {
          .navbar-pill-wrapper { display: none !important; }
          .navbar-mobile-btn { display: flex !important; }
          .navbar-cta-desktop { display: none !important; }
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(5,5,5,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/logo.png" alt="Clicksemurs" style={{ height: 40, width: 'auto' }} />
          </Link>

          {/* Center pill nav */}
          <nav className="navbar-pill-wrapper" style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 100,
            padding: '5px 6px',
            gap: 2,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>

            {/* Services */}
            <div style={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={megaRef}>
              <button
                className={isServicesActive ? 'nav-pill-active' : 'nav-pill'}
                style={pillStyle(isServicesActive || megaOpen)}>
                Services
                <FaChevronDown size={9} style={{ transition: 'transform 0.2s', transform: megaOpen ? 'rotate(180deg)' : 'none', opacity: 0.6 }} />
              </button>

              {megaOpen && (
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                  style={{
                    position: 'absolute', top: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)',
                    width: 820, background: '#0d0d0d',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16, padding: '28px 28px',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
                    animation: 'fadeDown 0.15s ease',
                  }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28 }}>
                    {megaMenu.map(col => (
                      <div key={col.heading}>
                        <h4 style={{ color: '#fff', fontWeight: 800, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #1e1e1e' }}>
                          {col.heading}
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {col.items.map(item => (
                            <li key={item.label}>
                              <Link to={`/services/${item.slug}`}
                                style={{ color: '#777', fontSize: 13, textDecoration: 'none', display: 'block', transition: 'color 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#777'}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#444', fontSize: 12 }}>360° Digital Marketing Agency</span>
                    <Link to="/services" style={{ color: '#F4A100', fontSize: 12, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      View All Services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio */}
            <div style={{ position: 'relative' }} onMouseEnter={handlePortfolioEnter} onMouseLeave={handlePortfolioLeave} ref={portfolioRef}>
              <button
                className={isPortfolioActive ? 'nav-pill-active' : 'nav-pill'}
                style={pillStyle(isPortfolioActive || portfolioOpen)}>
                Portfolio
                <FaChevronDown size={9} style={{ transition: 'transform 0.2s', transform: portfolioOpen ? 'rotate(180deg)' : 'none', opacity: 0.6 }} />
              </button>
              {portfolioOpen && (
                <div onMouseEnter={handlePortfolioEnter} onMouseLeave={handlePortfolioLeave}
                  style={{
                    position: 'absolute', top: 'calc(100% + 14px)', left: 0,
                    minWidth: 240, background: '#0d0d0d',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 14, padding: '8px',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
                    animation: 'fadeDown 0.15s ease',
                  }}>
                  {portfolioMenu.map(item => (
                    <Link key={item.to} to={item.to}
                      style={{ display: 'block', padding: '10px 14px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                      <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About, Blog, Contact */}
            {[{ to: '/about', label: 'About' }, { to: '/blog', label: 'Blog' }, { to: '/contact', label: 'Contact' }].map(link => (
              <NavLink key={link.to} to={link.to} style={{ textDecoration: 'none' }}>
                {({ isActive: active }) => (
                  <span
                    className={active ? 'nav-pill-active' : 'nav-pill'}
                    style={pillStyle(active)}>
                    {link.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="navbar-cta-desktop" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'linear-gradient(180deg, #F4A100 0%, #d48e00 100%)',
              color: '#111', padding: '9px 20px', fontWeight: 800, fontSize: 12,
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
              borderRadius: 100,
              boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset, 0 -3px 0 rgba(0,0,0,0.3) inset, 0 6px 16px rgba(244,161,0,0.3)',
              transition: 'all 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.3) inset, 0 -3px 0 rgba(0,0,0,0.3) inset, 0 10px 24px rgba(244,161,0,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.3) inset, 0 -3px 0 rgba(0,0,0,0.3) inset, 0 6px 16px rgba(244,161,0,0.3)' }}>
              Free Audit ✦
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="navbar-mobile-btn" style={{ display: 'none', color: '#fff', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', alignItems: 'center' }}
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{ background: '#0a0a0a', borderTop: '1px solid #1e1e1e', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>

              {/* Services - direct link */}
              <Link to="/services" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', fontSize: 15, fontWeight: 700, padding: '14px 16px', textDecoration: 'none', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid #1e1e1e' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>⚡</span> Services
                </span>
                <span style={{ color: '#F4A100', fontSize: 12 }}>→</span>
              </Link>

              {/* Portfolio group */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden', marginTop: 4 }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e1e1e' }}>
                  <span style={{ color: '#777', fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>🗂 Portfolio</span>
                </div>
                {portfolioMenu.map(item => (
                  <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}
                    style={({ isActive }) => ({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: isActive ? '#F4A100' : '#ccc', fontSize: 14, padding: '12px 16px', textDecoration: 'none', fontWeight: isActive ? 700 : 500, borderBottom: '1px solid #1a1a1a' })}>
                    {item.label}
                    {<span style={{ fontSize: 10, opacity: 0.4 }}>›</span>}
                  </NavLink>
                ))}
              </div>

              {/* Main links */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden', marginTop: 4 }}>
                {[
                  { to: '/about', label: 'About Us', icon: '👋' },
                  { to: '/blog', label: 'Blog', icon: '📝' },
                  { to: '/contact', label: 'Contact', icon: '📞' },
                ].map((link, i, arr) => (
                  <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}
                    style={({ isActive }) => ({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: isActive ? '#F4A100' : '#ccc', fontSize: 14, padding: '13px 16px', textDecoration: 'none', fontWeight: isActive ? 700 : 500, borderBottom: i < arr.length - 1 ? '1px solid #1a1a1a' : 'none' })}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 16 }}>{link.icon}</span> {link.label}
                    </span>
                    <span style={{ fontSize: 10, opacity: 0.4 }}>›</span>
                  </NavLink>
                ))}
              </div>

              <Link to="/contact" onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'linear-gradient(180deg, #F4A100 0%, #d48e00 100%)',
                color: '#111', padding: '14px 24px', fontWeight: 800, fontSize: 13,
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                borderRadius: 12, marginTop: 8,
                boxShadow: '0 -3px 0 rgba(0,0,0,0.25) inset, 0 4px 16px rgba(244,161,0,0.3)',
              }}>
                ✦ Get Free Audit — It's Free!
              </Link>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        `}</style>
      </header>
    </>
  )
}
