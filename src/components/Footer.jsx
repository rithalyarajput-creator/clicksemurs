import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter, FaArrowRight } from 'react-icons/fa'

const services = [
  { label: 'Social Media Marketing', to: '/services/social-media-marketing' },
  { label: 'SEO', to: '/services/seo' },
  { label: 'PPC / Paid Ads', to: '/services/ppc-paid-ads' },
  { label: 'Website Design', to: '/services/website-design-development' },
  { label: 'Content Marketing', to: '/services/content-marketing' },
  { label: 'Video Marketing', to: '/services/video-marketing' },
]

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

const socials = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2E2E2E]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src="/logo.png" alt="Clicksemurs" className="h-10 w-auto" />
            </div>
            <p className="text-[#777777] text-sm leading-relaxed mb-6">
              We don't just run campaigns — we build digital ecosystems. From strategy to execution, we deliver measurable growth.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-[#2E2E2E] flex items-center justify-center text-[#777777] hover:text-white hover:border-white transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#777777] text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <FaArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-[#777777] text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <FaArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">
              Get In Touch
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Email</div>
                <a href="mailto:hello@clicksemurs.com" className="text-white hover:text-gray-300 transition-colors">
                  hello@clicksemurs.com
                </a>
              </div>
              <div>
                <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Phone</div>
                <a href="tel:+91XXXXXXXXXX" className="text-white hover:text-gray-300 transition-colors">
                  +91 XXXXX XXXXX
                </a>
              </div>
              <div>
                <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Website</div>
                <span className="text-white">www.clicksemurs.com</span>
              </div>
              <div className="pt-2">
                <Link to="/contact" className="btn-primary text-xs tracking-widest uppercase">
                  Free Audit →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#777777] text-xs">
            © 2024 Clicksemurs. All Rights Reserved. | Grow. Dominate. Lead.
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
