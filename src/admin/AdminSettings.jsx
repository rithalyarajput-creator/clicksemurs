import { useState } from 'react'
import { useAdminAuth } from './useAdminAuth'

export default function AdminSettings() {
  const { logout } = useAdminAuth()
  const [profile, setProfile] = useState({ name: 'Admin', email: 'admin@clicksemurs.com' })
  const [pwd, setPwd] = useState({ current: '', newPwd: '', confirm: '' })
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const flash = (m, t = 'success') => { setMsg(m); setMsgType(t); setTimeout(() => setMsg(''), 3000) }

  const saveProfile = (e) => {
    e.preventDefault()
    flash('Profile updated!')
  }

  const changePassword = (e) => {
    e.preventDefault()
    if (pwd.current !== 'Admin@123') return flash('Current password incorrect.', 'error')
    if (pwd.newPwd !== pwd.confirm) return flash('New passwords do not match.', 'error')
    if (pwd.newPwd.length < 6) return flash('Password must be at least 6 characters.', 'error')
    flash('Password changed successfully!')
    setPwd({ current: '', newPwd: '', confirm: '' })
  }

  const inp = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: '#fff', marginBottom: 12 }
  const lbl = { display: 'block', color: '#374151', fontSize: 12, fontWeight: 600, marginBottom: 6 }

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Settings</h1>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Manage your admin account and preferences</p>
      {msg && <div style={{ background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Profile */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#0f172a', fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Admin Profile</h2>
          <form onSubmit={saveProfile}>
            <label style={lbl}>Display Name</label>
            <input style={inp} value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
            <label style={lbl}>Email Address</label>
            <input type="email" style={inp} value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
            <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Update Profile</button>
          </form>
        </div>

        {/* Password */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#0f172a', fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Change Password</h2>
          <form onSubmit={changePassword}>
            <label style={lbl}>Current Password</label>
            <input type="password" style={inp} value={pwd.current} onChange={e => setPwd(p => ({ ...p, current: e.target.value }))} />
            <label style={lbl}>New Password</label>
            <input type="password" style={inp} value={pwd.newPwd} onChange={e => setPwd(p => ({ ...p, newPwd: e.target.value }))} />
            <label style={lbl}>Confirm New Password</label>
            <input type="password" style={inp} value={pwd.confirm} onChange={e => setPwd(p => ({ ...p, confirm: e.target.value }))} />
            <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Change Password</button>
          </form>
        </div>

        {/* Quick Links */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, gridColumn: 'span 2' }}>
          <h2 style={{ color: '#0f172a', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Quick Workflow</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Home page text', path: '/admin/home-content', icon: '🏠' },
              { label: 'Website stats', path: '/admin/stats', icon: '📊' },
              { label: 'Footer info', path: '/admin/footer', icon: '⚙' },
              { label: 'New blog post', path: '/admin/blogs/new', icon: '📝' },
              { label: 'Job posting', path: '/admin/jobs', icon: '💼' },
              { label: 'View applications', path: '/admin/applications', icon: '👔' },
              { label: 'Contact leads', path: '/admin/leads', icon: '📬' },
              { label: 'Chatbot inquiries', path: '/admin/chatbot-leads', icon: '🤖' },
              { label: 'FAQ management', path: '/admin/faqs', icon: '❓' },
            ].map(item => (
              <a key={item.path} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, textDecoration: 'none', color: '#374151', fontSize: 13, fontWeight: 500, border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span> {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{ background: '#fff', border: '1px solid #fca5a5', borderRadius: 12, padding: 24, gridColumn: 'span 2' }}>
          <h2 style={{ color: '#dc2626', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Danger Zone</h2>
          <button onClick={() => { if (confirm('Logout?')) logout() }} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 8, padding: '10px 20px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Logout from Admin</button>
        </div>
      </div>
    </div>
  )
}
