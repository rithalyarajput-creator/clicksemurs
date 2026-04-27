import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './useAdminAuth'

// SVG Icons
const Icons = {
  dashboard: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  content:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  jobs:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  leads:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  home:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  stats:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  footer:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  seo:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  settings:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  logout:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  chevron:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  dot:       <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>,
}

const nav = [
  { label: 'Dashboard', icon: 'dashboard', path: '/admin' },
  {
    label: 'Content', icon: 'content', children: [
      { label: 'All Posts', path: '/admin/blogs' },
      { label: 'Add New Blog', path: '/admin/blogs/new' },
      { label: 'Categories', path: '/admin/categories' },
      { label: 'Authors', path: '/admin/authors' },
      { label: 'Media Library', path: '/admin/media' },
      { label: 'CMS Pages', path: '/admin/cms-pages' },
      { label: 'FAQs', path: '/admin/faqs' },
      { label: 'Testimonials', path: '/admin/testimonials' },
    ]
  },
  {
    label: 'Jobs', icon: 'jobs', children: [
      { label: 'Job Postings', path: '/admin/jobs' },
      { label: 'Applications', path: '/admin/applications' },
    ]
  },
  {
    label: 'Leads', icon: 'leads', children: [
      { label: 'Form Leads', path: '/admin/leads' },
      { label: 'Newsletter', path: '/admin/newsletter' },
    ]
  },
  { label: 'Home Content', icon: 'home', path: '/admin/home-content' },
  { label: 'Stats', icon: 'stats', path: '/admin/stats' },
  { label: 'Footer Settings', icon: 'footer', path: '/admin/footer' },
  {
    label: 'SEO', icon: 'seo', children: [
      { label: 'Meta Tags', path: '/admin/seo/meta' },
      { label: 'Keyword Rankings', path: '/admin/seo/keywords' },
      { label: 'Site Health', path: '/admin/seo/health' },
    ]
  },
  { label: 'Settings', icon: 'settings', path: '/admin/settings' },
]

export default function AdminLayout({ children }) {
  const { logout } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [openMenus, setOpenMenus] = useState({ Content: true, Leads: true, Jobs: false, SEO: false })

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  const toggle = (label) => setOpenMenus(p => ({ ...p, [label]: !p[label] }))

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 232, background: '#0f172a', display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, height: '100vh', overflowY: 'auto', zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <img src="/logo.png" alt="Clicksemurs" style={{ height: 30, width: 'auto' }} />
          <div style={{ color: '#334155', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 6, fontWeight: 600 }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 0 16px' }}>
          {nav.map(item => {
            if (!item.children) {
              const active = isActive(item.path)
              return (
                <Link key={item.path} to={item.path} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px 9px 20px',
                  color: active ? '#fff' : '#64748b',
                  background: active ? 'rgba(59,130,246,0.12)' : 'transparent',
                  textDecoration: 'none', fontSize: 13, fontWeight: active ? 600 : 400,
                  borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
                  transition: 'all 0.15s', margin: '1px 0'
                }}>
                  <span style={{ color: active ? '#60a5fa' : '#475569', flexShrink: 0 }}>{Icons[item.icon]}</span>
                  {item.label}
                </Link>
              )
            }
            const open = openMenus[item.label]
            const anyActive = item.children.some(c => isActive(c.path))
            return (
              <div key={item.label}>
                <button onClick={() => toggle(item.label)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '9px 16px 9px 20px',
                  background: anyActive ? 'rgba(59,130,246,0.06)' : 'transparent',
                  border: 'none', borderLeft: anyActive ? '3px solid rgba(59,130,246,0.4)' : '3px solid transparent',
                  color: anyActive ? '#cbd5e1' : '#64748b', fontSize: 13,
                  fontWeight: anyActive ? 600 : 400, cursor: 'pointer', textAlign: 'left',
                  margin: '1px 0'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: anyActive ? '#60a5fa' : '#475569', flexShrink: 0 }}>{Icons[item.icon]}</span>
                    {item.label}
                  </span>
                  <span style={{
                    color: '#334155', transition: 'transform 0.2s',
                    transform: open ? 'rotate(90deg)' : 'none',
                    display: 'flex', alignItems: 'center'
                  }}>{Icons.chevron}</span>
                </button>

                {open && (
                  <div style={{ paddingBottom: 4 }}>
                    {item.children.map(child => {
                      const active = isActive(child.path)
                      return (
                        <Link key={child.path} to={child.path} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '7px 16px 7px 46px',
                          color: active ? '#60a5fa' : '#475569',
                          textDecoration: 'none', fontSize: 12.5,
                          fontWeight: active ? 600 : 400,
                          background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                          borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
                          transition: 'all 0.1s'
                        }}>
                          <span style={{ color: active ? '#60a5fa' : '#334155' }}>{Icons.dot}</span>
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Logout */}
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px',
          background: 'none', border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)',
          color: '#475569', cursor: 'pointer', fontSize: 13, width: '100%', textAlign: 'left',
          transition: 'color 0.15s'
        }}>
          <span style={{ color: '#475569' }}>{Icons.logout}</span>
          Logout
        </button>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 232, flex: 1, minHeight: '100vh', background: '#f1f5f9', padding: 32 }}>
        {children}
      </main>
    </div>
  )
}
