import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { Link } from 'react-router-dom'

const ICONS = {
  leads:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  blogs:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  star:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  briefcase:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
}

const StatCard = ({ value, label, badge, badgeColor, iconKey }) => (
  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, background: badgeColor === 'red' ? '#fee2e2' : badgeColor === 'green' ? '#dcfce7' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: badgeColor === 'red' ? '#dc2626' : badgeColor === 'green' ? '#16a34a' : '#4f46e5' }}>{ICONS[iconKey]}</div>
    <div>
      <div style={{ color: '#0f172a', fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{label}</div>
      {badge !== undefined && <div style={{ marginTop: 6 }}><span style={{ background: badgeColor === 'red' ? '#fee2e2' : '#dcfce7', color: badgeColor === 'red' ? '#dc2626' : '#16a34a', fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{badge}</span></div>}
    </div>
  </div>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalLeads: 0, unreadLeads: 0, totalBlogs: 0, publishedBlogs: 0, totalTestimonials: 0, totalPortfolio: 0 })
  const [recentLeads, setRecentLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [fixMsg, setFixMsg] = useState('')

  const fixContactData = async () => {
    const correctData = [
      { key: 'email', value: 'clicksemurs@gmail.com' },
      { key: 'phone', value: '+91 96503 03312 / +91 92175 94664' },
      { key: 'whatsapp', value: '919650303312' },
      { key: 'address', value: '' },
      { key: 'copyright_text', value: '© 2025 Clicksemurs. All Rights Reserved.' },
      { key: 'tagline', value: 'Grow. Dominate. Lead.' },
    ]
    const { error } = await supabase.from('site_settings').upsert(correctData, { onConflict: 'key' })
    setFixMsg(error ? 'Error: ' + error.message : 'Contact data fixed! Refresh the website to see changes.')
    setTimeout(() => setFixMsg(''), 5000)
  }

  useEffect(() => {
    async function load() {
      const [leads, blogs, testimonials, portfolio] = await Promise.all([
        supabase.from('leads').select('id, is_read'),
        supabase.from('blogs').select('id, is_published'),
        supabase.from('testimonials').select('id'),
        supabase.from('portfolio').select('id'),
      ])
      const recent = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(8)
      setStats({
        totalLeads: leads.data?.length || 0,
        unreadLeads: leads.data?.filter(l => !l.is_read).length || 0,
        totalBlogs: blogs.data?.length || 0,
        publishedBlogs: blogs.data?.filter(b => b.is_published).length || 0,
        totalTestimonials: testimonials.data?.length || 0,
        totalPortfolio: portfolio.data?.length || 0,
      })
      setRecentLeads(recent.data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div style={{ color: '#94a3b8', padding: 40 }}>Loading...</div>

  return (
    <div>
      <h1 style={{ color: '#0f172a', fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>Welcome back! Here's what's happening.</p>

      {/* One-time fix banner */}
      <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 10, padding: '12px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span style={{ color: '#92400e', fontSize: 13, fontWeight: 600 }}>Footer/Contact showing wrong data? Click to fix it in the database.</span>
        </div>
        <button onClick={fixContactData} style={{ background: '#d97706', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Fix Contact Data Now
        </button>
      </div>
      {fixMsg && <div style={{ background: fixMsg.startsWith('Error') ? '#fef2f2' : '#f0fdf4', border: `1px solid ${fixMsg.startsWith('Error') ? '#fca5a5' : '#86efac'}`, color: fixMsg.startsWith('Error') ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{fixMsg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard value={stats.totalLeads} label="Total Leads" badge={`${stats.unreadLeads} unread`} badgeColor="red" iconKey="leads" />
        <StatCard value={stats.totalBlogs} label="Blog Posts" badge={`${stats.publishedBlogs} published`} badgeColor="green" iconKey="blogs" />
        <StatCard value={stats.totalTestimonials} label="Testimonials" iconKey="star" />
        <StatCard value={stats.totalPortfolio} label="Case Studies" iconKey="briefcase" />
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#0f172a', fontSize: 16, fontWeight: 700 }}>Recent Inquiries</h2>
          <Link to="/admin/leads" style={{ color: '#2563eb', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['#', 'Name', 'Email', 'Service', 'Date', 'Status'].map(h => (
                <th key={h} style={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentLeads.length === 0 ? (
              <tr><td colSpan={6} style={{ color: '#94a3b8', padding: 32, textAlign: 'center' }}>No leads yet.</td></tr>
            ) : recentLeads.map(lead => (
              <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ color: '#94a3b8', padding: '12px 16px', fontSize: 13 }}>{lead.id}</td>
                <td style={{ color: '#0f172a', padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{lead.name}</td>
                <td style={{ color: '#64748b', padding: '12px 16px', fontSize: 13 }}>{lead.email}</td>
                <td style={{ color: '#64748b', padding: '12px 16px', fontSize: 13 }}>{lead.service || '—'}</td>
                <td style={{ color: '#64748b', padding: '12px 16px', fontSize: 13 }}>{new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: lead.is_read ? '#f1f5f9' : '#fee2e2', color: lead.is_read ? '#64748b' : '#dc2626', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                    {lead.is_read ? 'Read' : 'New'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
