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
              { label: 'Home page text', path: '/admin/home-content', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { label: 'Website stats', path: '/admin/stats', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
              { label: 'Footer info', path: '/admin/footer', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
              { label: 'New blog post', path: '/admin/blogs/new', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
              { label: 'Job posting', path: '/admin/jobs', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
              { label: 'View applications', path: '/admin/applications', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
              { label: 'Contact leads', path: '/admin/leads', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              { label: 'FAQ management', path: '/admin/faqs', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
              { label: 'Testimonials', path: '/admin/testimonials', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
            ].map(item => (
              <a key={item.path} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, textDecoration: 'none', color: '#374151', fontSize: 13, fontWeight: 500, border: '1px solid #e2e8f0' }}>
                <span style={{ color: '#6366f1' }}>{item.icon}</span> {item.label}
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
