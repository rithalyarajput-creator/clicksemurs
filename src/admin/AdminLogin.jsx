import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from './useAdminAuth'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = login(username, password)
    if (ok) {
      navigate('/admin')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: 48, width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase' }}>CLICK⚡SEMURS</h1>
          <p style={{ color: '#777', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 4 }}>Admin Panel</p>
        </div>
        <div style={{ background: '#111', border: '1px solid #2E2E2E', color: '#aaa', fontSize: 11, textAlign: 'center', padding: 6, marginBottom: 24 }}>Secure Admin Access</div>
        {error && (
          <div style={{ background: '#2a1010', border: '1px solid #5a1a1a', color: '#ff6b6b', padding: '12px 16px', fontSize: 13, marginBottom: 20 }}>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', color: '#aaa', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>Username</label>
          <input
            type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="admin"
            style={{ display: 'block', width: '100%', background: '#111', border: '1px solid #2E2E2E', color: '#fff', padding: '12px 16px', fontSize: 14, outline: 'none', marginBottom: 16, boxSizing: 'border-box' }}
          />
          <label style={{ display: 'block', color: '#aaa', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>Password</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
            style={{ display: 'block', width: '100%', background: '#111', border: '1px solid #2E2E2E', color: '#fff', padding: '12px 16px', fontSize: 14, outline: 'none', marginBottom: 24, boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ display: 'block', width: '100%', background: '#fff', color: '#111', padding: 14, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
            Login →
          </button>
        </form>
      </div>
    </div>
  )
}
