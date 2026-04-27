import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { Link } from 'react-router-dom'

const StatCard = ({ value, label, badge, badgeColor, icon }) => (
  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, background: badgeColor === 'red' ? '#fee2e2' : badgeColor === 'green' ? '#dcfce7' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
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
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Welcome back! Here's what's happening.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard value={stats.totalLeads} label="Total Leads" badge={`${stats.unreadLeads} unread`} badgeColor="red" icon="👥" />
        <StatCard value={stats.totalBlogs} label="Blog Posts" badge={`${stats.publishedBlogs} published`} badgeColor="green" icon="📝" />
        <StatCard value={stats.totalTestimonials} label="Testimonials" icon="⭐" />
        <StatCard value={stats.totalPortfolio} label="Case Studies" icon="💼" />
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
