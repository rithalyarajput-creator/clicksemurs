import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter, FaArrowRight } from 'react-icons/fa'
import { supabase } from '../admin/supabase'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Industries', to: '/industries' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

const services = [
  { label: 'Social Media Marketing', to: '/services/social-media-marketing' },
  { label: 'SEO', to: '/services/seo' },
  { label: 'PPC / Paid Ads', to: '/services/ppc-paid-ads' },
  { label: 'Website Design', to: '/services/website-design-development' },
  { label: 'Content Marketing', to: '/services/content-marketing' },
  { label: 'Video Marketing', to: '/services/video-marketing' },
]

const DEFAULTS = {
  email: 'clicksemurs@gmail.com',
  phone: '+91 96503 03312 / +91 92175 94664',
  whatsapp: '919650303312',
  address: 'India',
  company_description: "We don't just run campaigns — we build digital ecosystems. From strategy to execution, we deliver measurable growth.",
  copyright_text: '© 2025 Clicksemurs. All Rights Reserved.',
  tagline: 'Grow. Dominate. Lead.',
  instagram: '#',
  facebook: '#',
  linkedin: '#',
  youtube: '#',
  twitter: '#',
}

export default function Footer() {
  const [s, setS] = useState(DEFAULTS)
  const [nEmail, setNEmail] = useState('')
  const [nStatus, setNStatus] = useState(null)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      if (!rows) return
      const obj = { ...DEFAULTS }
      rows.forEach(r => { if (r.value) obj[r.key] = r.value })
      setS(obj)
    })
  }, [])

  const handleNewsletter = async (e) => {
    e.preventDefault()
    if (!nEmail) return
    const { error } = await supabase.from('newsletter').insert([{ email: nEmail }])
    if (error && error.code === '23505') setNStatus('already')
    else if (error) setNStatus('error')
    else { setNStatus('success'); setNEmail('') }
    setTimeout(() => setNStatus(null), 4000)
  }

  const socials = [
    { icon: FaInstagram, href: s.instagram, label: 'Instagram' },
    { icon: FaFacebookF, href: s.facebook, label: 'Facebook' },
    { icon: FaLinkedinIn, href: s.linkedin, label: 'LinkedIn' },
    { icon: FaYoutube, href: s.youtube, label: 'YouTube' },
    { icon: FaTwitter, href: s.twitter, label: 'Twitter' },
  ]

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src="/logo.png" alt="Clicksemurs" className="h-10 w-auto" />
            </div>
            <p className="text-[#777777] text-sm leading-relaxed mb-6">{s.company_description}</p>
            <div className="flex gap-3 flex-wrap">
              {socials.filter(sc => sc.href && sc.href !== '#').map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 border border-[#2E2E2E] flex items-center justify-center text-[#777777] hover:text-white hover:border-white transition-all duration-200">
                  <Icon size={14} />
                </a>
              ))}
              {socials.every(sc => !sc.href || sc.href === '#') && socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 border border-[#2E2E2E] flex items-center justify-center text-[#777777] hover:text-white hover:border-white transition-all duration-200">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[#777777] text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <FaArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map(sv => (
                <li key={sv.to}>
                  <Link to={sv.to} className="text-[#777777] text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <FaArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {sv.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Get In Touch</h4>
            <div className="space-y-4 text-sm">
              {s.email && (
                <div>
                  <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Email</div>
                  <a href={`mailto:${s.email}`} className="text-white hover:text-gray-300 transition-colors">{s.email}</a>
                </div>
              )}
              {s.phone && (
                <div>
                  <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Phone</div>
                  <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="text-white hover:text-gray-300 transition-colors">{s.phone}</a>
                </div>
              )}
              {s.address && (
                <div>
                  <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Address</div>
                  <p className="text-white">{s.address}</p>
                </div>
              )}
              <div className="pt-1">
                <Link to="/contact" className="btn-primary text-xs tracking-widest uppercase">Free Audit →</Link>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-3">Newsletter</h4>
              <p className="text-[#777777] text-xs mb-3">Get marketing tips in your inbox.</p>
              <form onSubmit={handleNewsletter} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input type="email" value={nEmail} onChange={e => setNEmail(e.target.value)} placeholder="your@email.com" required
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2E2E2E', color: '#fff', padding: '9px 12px', fontSize: 13, outline: 'none', borderRadius: 6, boxSizing: 'border-box' }} />
                <button type="submit" style={{ background: '#F4A100', color: '#111', border: 'none', padding: '9px', fontWeight: 700, fontSize: 12, cursor: 'pointer', borderRadius: 6, letterSpacing: '0.05em' }}>
                  SUBSCRIBE →
                </button>
              </form>
              {nStatus === 'success' && <p style={{ color: '#4ade80', fontSize: 12, marginTop: 6 }}>Subscribed successfully!</p>}
              {nStatus === 'already' && <p style={{ color: '#facc15', fontSize: 12, marginTop: 6 }}>Already subscribed!</p>}
              {nStatus === 'error' && <p style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>Something went wrong.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#777777] text-xs">
            {s.copyright_text}{s.tagline ? ` | ${s.tagline}` : ''}
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-[#777777] text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-[#777777] text-xs hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
