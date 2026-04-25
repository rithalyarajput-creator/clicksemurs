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

const navLinks = [
  { to: '/portfolio', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const megaRef = useRef(null)
  const timeoutRef = useRef(null)

  const isLightPage = ['/about', '/services', '/portfolio', '/industries', '/blog', '/pricing', '/contact'].some(p =>
    location.pathname === p || location.pathname.startsWith(p + '/')
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setOpen(false); setMegaOpen(false) }, [location])

  const navBg = scrolled
    ? 'bg-[#0A0A0A]/95 backdrop-blur-sm shadow-lg shadow-black/50'
    : isLightPage
    ? 'bg-[#0A0A0A]'
    : 'bg-transparent'

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setMegaOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 150)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} border-b border-[#2E2E2E]`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Clicksemurs" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">

            {/* Services with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={megaRef}
            >
              <button className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200 ${megaOpen ? 'text-white' : 'text-[#AAAAAA] hover:text-white'}`}>
                Services <FaChevronDown size={10} className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {megaOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#111111] border border-[#2E2E2E] shadow-2xl"
                  style={{ width: 820, padding: '32px 32px' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-4 gap-8">
                    {megaMenu.map(col => (
                      <div key={col.heading}>
                        <h4 className="text-white font-black text-sm tracking-widest uppercase mb-4 pb-2 border-b border-[#2E2E2E]">
                          {col.heading}
                        </h4>
                        <ul className="space-y-2">
                          {col.items.map(item => (
                            <li key={item.label}>
                              <Link
                                to={`/services/${item.slug}`}
                                className="text-[#AAAAAA] text-sm hover:text-white transition-colors duration-150 block py-0.5"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#2E2E2E] flex items-center justify-between">
                    <span className="text-[#777] text-xs">360° Digital Marketing Agency</span>
                    <Link to="/services" className="text-white text-xs font-bold tracking-widest uppercase hover:text-[#aaa] transition-colors">
                      View All Services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#AAAAAA] hover:text-white'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/contact" className="btn-primary text-xs tracking-widest uppercase">
              Free Audit
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#2E2E2E] max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-4 flex flex-col gap-4">
            <div className="text-[#777] text-xs uppercase tracking-widest font-bold mb-1">Services</div>
            {megaMenu.map(col => (
              <div key={col.heading}>
                <div className="text-white text-xs font-black uppercase tracking-wider mb-2">{col.heading}</div>
                {col.items.map(item => (
                  <Link key={item.label} to={`/services/${item.slug}`} className="block text-[#AAAAAA] text-sm py-1 pl-3">
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-[#2E2E2E] pt-3 mt-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `block text-sm font-medium py-2 ${isActive ? 'text-white' : 'text-[#AAAAAA]'}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <Link to="/contact" className="btn-primary text-xs tracking-widest uppercase mt-2 w-fit">
              Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
