import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isLightPage = ['/about', '/services', '/portfolio', '/industries', '/blog', '/pricing', '/contact'].some(p =>
    location.pathname === p || location.pathname.startsWith(p + '/')
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const navBg = scrolled
    ? 'bg-[#0A0A0A]/95 backdrop-blur-sm shadow-lg shadow-black/50'
    : isLightPage
    ? 'bg-[#0A0A0A]'
    : 'bg-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} border-b border-[#2E2E2E]`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <LogoWhite />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-[#AAAAAA] hover:text-white'
                  }`
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
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#2E2E2E]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium py-1 ${isActive ? 'text-white' : 'text-[#AAAAAA]'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary text-xs tracking-widest uppercase mt-2 w-fit">
              Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function LogoWhite() {
  return (
    <div className="flex flex-col leading-none">
      <span className="text-white font-black text-xl tracking-[0.15em] uppercase">
        CLICK<span className="text-white">⚡</span>SEMURS
      </span>
      <span className="text-[#777777] text-[9px] tracking-[0.3em] uppercase font-medium">
        360° Digital Marketing
      </span>
    </div>
  )
}
