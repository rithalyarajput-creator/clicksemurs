import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const DEFAULTS = {
  hero_label: 'Who We Are',
  hero_title: 'Built for Brands That Mean Business.',
  hero_subtitle: 'We are a full-service 360° Digital Marketing Agency combining cutting-edge technology, creative excellence, and data-driven intelligence.',
  story_heading: 'Where Strategy Meets Creativity',
  story_p1: 'Welcome to Clicksemurs — where strategy meets creativity and data drives every decision. We are a full-service 360° Digital Marketing Agency built for brands that are serious about growing in the digital world.',
  story_p2: 'At Clicksemurs, we do not just run campaigns — we build digital ecosystems. From the moment a potential customer first hears about your brand to the point they become a loyal advocate, we are with you at every step.',
  story_p3: 'Founded with a mission to make powerful digital marketing accessible to every business — whether you are a bold startup, a growing SME, or an established enterprise — we bring together cutting-edge technology, creative excellence, and data-driven intelligence to deliver measurable growth.',
  stat1_value: '500+', stat1_label: 'Projects',
  stat2_value: '50+', stat2_label: 'Industries',
  stat3_value: '98%', stat3_label: 'Retention',
  stat4_value: '5X', stat4_label: 'ROI',
  vision_text: 'To be the most trusted and results-driven digital marketing partner for businesses across every industry — helping brands not just compete, but lead in the digital age.',
  mission_text: 'To deliver 360° digital marketing solutions that drive real, measurable business growth — combining creativity, technology, and strategy to turn clicks into customers and brands into market leaders.',
  team_heading: 'The People Behind Your Growth',
  team_subheading: 'A diverse, passionate team of digital experts bringing together marketing, technology, design, and strategy.',
  team_member1_name: 'Aryan Mehta', team_member1_role: 'Founder & CEO', team_member1_exp: '12+ years in digital marketing',
  team_member2_name: 'Sneha Joshi', team_member2_role: 'Creative Director', team_member2_exp: 'Brand & visual storytelling',
  team_member3_name: 'Ravi Kumar', team_member3_role: 'Head of SEO & Content', team_member3_exp: 'Technical SEO expert',
  team_member4_name: 'Pooja Singh', team_member4_role: 'Performance Marketing Lead', team_member4_exp: 'Google & Meta Ads specialist',
  cta_heading: 'Ready to Work Together?',
  cta_subtext: "Let's build something remarkable. Get your free audit today.",
}

const SECTIONS = [
  {
    key: 'hero', title: 'Hero Section',
    fields: [
      { key: 'hero_label', label: 'Label (small text above heading)', placeholder: 'Who We Are' },
      { key: 'hero_title', label: 'Main Heading' },
      { key: 'hero_subtitle', label: 'Subtitle', textarea: true },
    ]
  },
  {
    key: 'story', title: 'Our Story Section',
    fields: [
      { key: 'story_heading', label: 'Section Heading' },
      { key: 'story_p1', label: 'Paragraph 1', textarea: true },
      { key: 'story_p2', label: 'Paragraph 2', textarea: true },
      { key: 'story_p3', label: 'Paragraph 3', textarea: true },
    ]
  },
  {
    key: 'stats', title: 'Stats (shown in logo section)',
    fields: [
      { key: 'stat1_value', label: 'Stat 1 Value', placeholder: '500+' },
      { key: 'stat1_label', label: 'Stat 1 Label', placeholder: 'Projects' },
      { key: 'stat2_value', label: 'Stat 2 Value', placeholder: '50+' },
      { key: 'stat2_label', label: 'Stat 2 Label', placeholder: 'Industries' },
      { key: 'stat3_value', label: 'Stat 3 Value', placeholder: '98%' },
      { key: 'stat3_label', label: 'Stat 3 Label', placeholder: 'Retention' },
      { key: 'stat4_value', label: 'Stat 4 Value', placeholder: '5X' },
      { key: 'stat4_label', label: 'Stat 4 Label', placeholder: 'ROI' },
    ]
  },
  {
    key: 'vision', title: 'Vision & Mission',
    fields: [
      { key: 'vision_text', label: 'Vision Text', textarea: true },
      { key: 'mission_text', label: 'Mission Text', textarea: true },
    ]
  },
  {
    key: 'team', title: 'Team Section',
    fields: [
      { key: 'team_heading', label: 'Section Heading' },
      { key: 'team_subheading', label: 'Section Subtext', textarea: true },
      { key: 'team_member1_name', label: 'Member 1 Name' }, { key: 'team_member1_role', label: 'Member 1 Role' }, { key: 'team_member1_exp', label: 'Member 1 Experience' },
      { key: 'team_member2_name', label: 'Member 2 Name' }, { key: 'team_member2_role', label: 'Member 2 Role' }, { key: 'team_member2_exp', label: 'Member 2 Experience' },
      { key: 'team_member3_name', label: 'Member 3 Name' }, { key: 'team_member3_role', label: 'Member 3 Role' }, { key: 'team_member3_exp', label: 'Member 3 Experience' },
      { key: 'team_member4_name', label: 'Member 4 Name' }, { key: 'team_member4_role', label: 'Member 4 Role' }, { key: 'team_member4_exp', label: 'Member 4 Experience' },
    ]
  },
  {
    key: 'cta', title: 'Bottom CTA',
    fields: [
      { key: 'cta_heading', label: 'CTA Heading' },
      { key: 'cta_subtext', label: 'CTA Subtext' },
    ]
  },
]

export default function AdminAbout() {
  const [data, setData] = useState(DEFAULTS)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data: rows }) => {
      const obj = { ...DEFAULTS }
      rows?.forEach(r => { if (r.value && r.key in DEFAULTS) obj[r.key] = r.value })
      setData(obj)
      setLoading(false)
    })
  }, [])

  const save = async () => {
    const upserts = Object.entries(data).map(([key, value]) => ({ key, value: value || '' }))
    const { error } = await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' })
    if (error) { setMsg('Error: ' + error.message); setMsgType('error') }
    else { setMsg('Saved! Changes are live on the About page.'); setMsgType('success') }
    setTimeout(() => setMsg(''), 3000)
  }

  const inp = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#0f172a', background: '#fff' }
  const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: 22, fontWeight: 800, marginBottom: 2 }}>About Page Content</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Edit all text content shown on the About page</p>
        </div>
        <button onClick={save} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 28px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          Save Changes
        </button>
      </div>

      {msg && (
        <div style={{ background: msgType === 'error' ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msgType === 'error' ? '#fca5a5' : '#86efac'}`, color: msgType === 'error' ? '#dc2626' : '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 20, fontSize: 13 }}>{msg}</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {SECTIONS.map(section => (
          <div key={section.key} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{section.title}</span>
            </div>
            <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {section.fields.map(f => (
                <div key={f.key} style={{ gridColumn: f.textarea ? 'span 2' : 'span 1' }}>
                  <label style={lbl}>{f.label}</label>
                  {f.textarea
                    ? <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={data[f.key] || ''} onChange={e => setData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder || ''} />
                    : <input style={inp} value={data[f.key] || ''} onChange={e => setData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder || ''} />
                  }
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={save} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Save All Changes</button>
      </div>
    </div>
  )
}
