import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './useAdminAuth'

const nav = [
  {
    label: 'Dashboard', icon: '⊞', path: '/admin'
  },
  {
    label: 'Content', icon: '📝', children: [
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
    label: 'Jobs', icon: '💼', children: [
      { label: 'Job Postings', path: '/admin/jobs' },
      { label: 'Applications', path: '/admin/applications' },
    ]
  },
  {
    label: 'Leads', icon: '👥', children: [
      { label: 'Form Leads', path: '/admin/leads' },
      { label: 'Newsletter', path: '/admin/newsletter' },
      { label: 'Chatbot Leads', path: '/admin/chatbot-leads' },
    ]
  },
  { label: 'Home Content', icon: '🏠', path: '/admin/home-content' },
  { label: 'Stats', icon: '📊', path: '/admin/stats' },
  { label: 'Footer Settings', icon: '⚙', path: '/admin/footer' },
  {
    label: 'SEO', icon: '🔍', children: [
      { label: 'Meta Tags', path: '/admin/seo/meta' },
      { label: 'Keyword Rankings', path: '/admin/seo/keywords' },
      { label: 'Site Health', path: '/admin/seo/health' },
    ]
  },
  { label: 'Settings', icon: '🔧', path: '/admin/settings' },
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
      <aside style={{ width: 230, background: '#0f172a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', overflowY: 'auto', zIndex: 100 }}>
        {/* Logo */}
        <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #1e293b' }}>
          <img src="/logo.png" alt="Clicksemurs" style={{ height: 32, width: 'auto' }} />
          <div style={{ color: '#475569', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 5 }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 0' }}>
          {nav.map(item => {
            if (!item.children) {
              const active = isActive(item.path)
              return (
                <Link key={item.path} to={item.path} style={{
                  display: 'flex', alignItems: 'center', gap: 9, padding: '9px 20px',
                  color: active ? '#fff' : '#94a3b8', background: active ? '#1e3a5f' : 'transparent',
                  textDecoration: 'none', fontSize: 13, fontWeight: active ? 600 : 400,
                  borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
                  transition: 'all 0.1s'
                }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span> {item.label}
                </Link>
              )
            }
            const open = openMenus[item.label]
            const anyActive = item.children.some(c => isActive(c.path))
            return (
              <div key={item.label}>
                <button onClick={() => toggle(item.label)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '9px 20px', background: 'transparent', border: 'none',
                  color: anyActive ? '#fff' : '#94a3b8', fontSize: 13, fontWeight: anyActive ? 600 : 400,
                  cursor: 'pointer', textAlign: 'left'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ fontSize: 14 }}>{item.icon}</span> {item.label}
                  </span>
                  <span style={{ fontSize: 10, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'none' }}>▶</span>
                </button>
                {open && (
                  <div style={{ paddingLeft: 0 }}>
                    {item.children.map(child => {
                      const active = isActive(child.path)
                      return (
                        <Link key={child.path} to={child.path} style={{
                          display: 'block', padding: '7px 20px 7px 44px',
                          color: active ? '#60a5fa' : '#64748b',
                          textDecoration: 'none', fontSize: 12.5,
                          fontWeight: active ? 600 : 400,
                          background: active ? '#0f2744' : 'transparent',
                          borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
                        }}>
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
          display: 'flex', alignItems: 'center', gap: 9, padding: '14px 20px',
          background: 'none', border: 'none', borderTop: '1px solid #1e293b',
          color: '#64748b', cursor: 'pointer', fontSize: 13, width: '100%', textAlign: 'left'
        }}>
          ↩ Logout
        </button>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 230, flex: 1, minHeight: '100vh', background: '#f1f5f9', padding: 32 }}>
        {children}
      </main>
    </div>
  )
}
