import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './useAdminAuth'
import { MdDashboard, MdPeople, MdArticle, MdStar, MdWork, MdSettings, MdLogout } from 'react-icons/md'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: MdDashboard },
  { path: '/admin/leads', label: 'Leads', icon: MdPeople },
  { path: '/admin/blogs', label: 'Blogs', icon: MdArticle },
  { path: '/admin/testimonials', label: 'Testimonials', icon: MdStar },
  { path: '/admin/portfolio', label: 'Portfolio', icon: MdWork },
  { path: '/admin/settings', label: 'Settings', icon: MdSettings },
]

export default function AdminLayout({ children }) {
  const { logout } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: '#111111', borderRight: '1px solid #2E2E2E', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #2E2E2E' }}>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: 16, letterSpacing: '0.15em', textTransform: 'uppercase' }}>CLICK⚡SEMURS</div>
          <div style={{ color: '#555', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 4 }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path)
            return (
              <Link key={path} to={path} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px',
                color: active ? '#fff' : '#777', background: active ? '#1E1E1E' : 'transparent',
                textDecoration: 'none', fontSize: 13, fontWeight: active ? 600 : 400,
                borderLeft: active ? '2px solid #fff' : '2px solid transparent',
                transition: 'all 0.15s'
              }}>
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px',
          background: 'none', border: 'none', borderTop: '1px solid #2E2E2E',
          color: '#777', cursor: 'pointer', fontSize: 13, width: '100%', textAlign: 'left'
        }}>
          <MdLogout size={16} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 220, flex: 1, padding: '32px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
