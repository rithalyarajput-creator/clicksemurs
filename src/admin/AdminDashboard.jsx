import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { Link } from 'react-router-dom'

const StatCard = ({ value, label, badge, badgeColor }) => (
  <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: 24 }}>
    <div style={{ color: '#fff', fontSize: 36, fontWeight: 900 }}>{value}</div>
    <div style={{ color: '#777', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{label}</div>
    {badge !== undefined && (
      <div style={{ marginTop: 8 }}>
        <span style={{ background: badgeColor === 'red' ? '#2a1010' : '#0a1a0a', color: badgeColor === 'red' ? '#ff6b6b' : '#4ade80', fontSize: 11, padding: '2px 8px', border: `1px solid ${badgeColor === 'red' ? '#5a1a1a' : '#166534'}` }}>
          {badge}
        </span>
      </div>
    )}
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

  if (loading) return <div style={{ color: '#777', padding: 40 }}>Loading...</div>

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard value={stats.totalLeads} label="Total Leads" badge={`${stats.unreadLeads} unread`} badgeColor="red" />
        <StatCard value={stats.totalBlogs} label="Blog Posts" badge={`${stats.publishedBlogs} published`} badgeColor="green" />
        <StatCard value={stats.totalTestimonials} label="Testimonials" />
        <StatCard value={stats.totalPortfolio} label="Case Studies" />
      </div>

      <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #2E2E2E' }}>
          <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Recent Inquiries</h2>
          <Link to="/admin/leads" style={{ color: '#aaa', fontSize: 12, textDecoration: 'none', border: '1px solid #2E2E2E', padding: '4px 12px' }}>View All</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2E2E2E' }}>
              {['#', 'Name', 'Email', 'Service', 'Date', 'Status'].map(h => (
                <th key={h} style={{ color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 16px', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentLeads.length === 0 ? (
              <tr><td colSpan={6} style={{ color: '#555', padding: 32, textAlign: 'center' }}>No leads yet.</td></tr>
            ) : recentLeads.map(lead => (
              <tr key={lead.id} style={{ borderBottom: '1px solid #2E2E2E' }}>
                <td style={{ color: '#777', padding: '12px 16px', fontSize: 13 }}>{lead.id}</td>
                <td style={{ color: '#fff', padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{lead.name}</td>
                <td style={{ color: '#aaa', padding: '12px 16px', fontSize: 13 }}>{lead.email}</td>
                <td style={{ color: '#aaa', padding: '12px 16px', fontSize: 13 }}>{lead.service || '—'}</td>
                <td style={{ color: '#aaa', padding: '12px 16px', fontSize: 13 }}>{new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: lead.is_read ? '#1a1a1a' : '#2a1010', color: lead.is_read ? '#555' : '#ff6b6b', fontSize: 11, padding: '2px 8px', border: `1px solid ${lead.is_read ? '#2E2E2E' : '#5a1a1a'}` }}>
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
