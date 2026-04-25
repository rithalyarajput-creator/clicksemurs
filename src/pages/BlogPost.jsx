import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaCalendar, FaTag } from 'react-icons/fa'
import { supabase } from '../admin/supabase'

const staticPosts = {
  'seo-tips-2024': {
    title: '10 SEO Tips That Will Dominate Google in 2024',
    category: 'SEO',
    created_at: '2024-11-15',
    content: `Search engine optimization continues to evolve at a rapid pace. In 2024, the businesses that will dominate search results are those that adapt quickly to Google's evolving algorithm and user behavior shifts.

## 1. Prioritize Core Web Vitals

Google's Core Web Vitals — Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) — are now direct ranking factors. Ensure your website loads in under 2.5 seconds, responds to user interactions immediately, and maintains visual stability.

## 2. Focus on Search Intent Above All Else

Understanding why someone is searching — not just what they're searching for — is the single most important SEO skill. Match your content format to the dominant intent behind each keyword.

## 3. Build Topical Authority

Google rewards websites that demonstrate deep expertise in a specific subject area. Instead of creating isolated blog posts, build interconnected content clusters around your core topics.

## 4. Optimize for Featured Snippets

Featured snippets now appear for approximately 12% of all searches. Structure your content with clear question-and-answer formats, concise definitions, and numbered lists to win position zero.

## 5. Leverage AI-Assisted Content Creation (Responsibly)

AI tools can dramatically speed up content creation, but always add human expertise, original insights, and first-hand experience. Google's E-E-A-T guidelines reward authentic expertise.

## 6. Master Local SEO

For businesses with physical locations or service areas, local SEO is non-negotiable. Optimize your Google My Business profile, build local citations, and generate authentic customer reviews consistently.

## 7. Build High-Authority Backlinks

A single link from a DA 70+ domain is worth more than 100 links from low-quality sites. Focus on digital PR, resource link building, and creating genuinely linkable content assets.

## 8. Optimize for Voice Search

With over 50% of searches being voice-based, optimizing for conversational, long-tail keywords and FAQ-style content is increasingly important.

## 9. Technical SEO Fundamentals

Ensure your website has a clean URL structure, proper canonicalization, an XML sitemap, structured data markup, and mobile-first design.

## 10. Track and Iterate with Data

SEO without measurement is guesswork. Set up Google Search Console, Google Analytics 4, and a rank tracking tool. Review performance monthly and adjust your strategy based on real data.`,
  },
  'meta-ads-guide': {
    title: 'The Complete Guide to Meta Ads for E-Commerce in 2024',
    category: 'Paid Ads',
    created_at: '2024-11-08',
    content: `Meta Ads remain one of the most powerful tools for e-commerce businesses. Here is how to structure your campaigns for maximum ROAS.

## Understanding Campaign Structure

Organize by awareness, consideration, and conversion objectives. Each stage requires different creative and targeting approaches.

## Audience Strategy

Build custom audiences from your customer list, then create lookalikes. Layer interests and behaviors for prospecting campaigns.

## Creative Testing

Test 3-5 creative variants per ad set. Let data decide the winner. Never kill an ad set before 7 days and 1000 impressions.

## Retargeting

Target website visitors, add-to-cart abandoners, and past purchasers separately. Each segment needs different messaging.

## Scaling

Once you find a winning combination, scale budgets by 20% every 3 days. Avoid drastic budget changes that reset the learning phase.`,
  },
}

const allStaticBlogs = [
  { id:1, slug:'seo-tips-2024', title:'10 SEO Tips That Will Dominate Google in 2024', category:'SEO', created_at:'2024-11-15', thumbnail:'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80' },
  { id:2, slug:'meta-ads-guide', title:'The Complete Guide to Meta Ads for E-Commerce in 2024', category:'Paid Ads', created_at:'2024-11-08', thumbnail:'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&q=80' },
  { id:3, slug:'social-media-trends', title:'Social Media Trends Every Brand Must Know in 2024', category:'Social Media', created_at:'2024-10-30', thumbnail:'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&q=80' },
  { id:4, slug:'website-conversion', title:"Why Your Website Isn't Converting (And How to Fix It)", category:'Website', created_at:'2024-10-22', thumbnail:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
]

function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('leads').insert([{
      name: form.name, email: form.email, phone: form.phone,
      service: 'Blog Lead', message: 'Lead from blog post sidebar form'
    }])
    setLoading(false)
    setSent(true)
  }

  const inp = {
    display: 'block', width: '100%', background: '#fff', border: '1px solid #e5e5e5',
    color: '#111', padding: '10px 14px', fontSize: 13, outline: 'none',
    boxSizing: 'border-box', marginBottom: 10, borderRadius: 4
  }

  return (
    <div style={{ background: '#111111', borderRadius: 8, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
      {/* Header */}
      <div style={{ background: '#F4A100', borderRadius: '6px 6px 0 0', margin: '-24px -24px 20px', padding: '14px 20px' }}>
        <div style={{ color: '#111', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Apply for Instant Consultation</div>
        <div style={{ color: '#111', fontSize: 11, opacity: 0.7, marginTop: 2 }}>Get faster. No paperwork needed.</div>
      </div>

      {sent ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ color: '#4ade80', fontSize: 32, marginBottom: 8 }}>✓</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>We'll contact you soon!</div>
          <div style={{ color: '#777', fontSize: 12, marginTop: 4 }}>Our team will reach out within 24 hours.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input style={inp} placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          <input style={inp} placeholder="Mobile Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
          <input style={{ ...inp, marginBottom: 16 }} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          <button type="submit" disabled={loading} style={{
            display: 'block', width: '100%', background: '#F4A100', color: '#111',
            padding: '12px', fontWeight: 900, fontSize: 13, border: 'none',
            borderRadius: 4, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            {loading ? 'Sending...' : 'Get Free Report →'}
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
            {['Instant Approval', 'No Collateral', '100% Digital'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #F4A100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F4A100' }} />
                </div>
                <span style={{ color: '#aaa', fontSize: 12 }}>{t}</span>
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  )
}

function renderContent(content) {
  if (!content) return null
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} style={{ color: '#111', fontWeight: 900, fontSize: 20, marginTop: 32, marginBottom: 12 }}>{line.slice(3)}</h2>
    if (line.startsWith('# ')) return <h1 key={i} style={{ color: '#111', fontWeight: 900, fontSize: 26, marginTop: 32, marginBottom: 12 }}>{line.slice(2)}</h1>
    if (line.startsWith('---')) return <hr key={i} style={{ margin: '24px 0', borderColor: '#e5e5e5' }} />
    if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
    return <p key={i} style={{ color: '#444', fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>{line}</p>
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(staticPosts[slug] || null)
  const [similarBlogs, setSimilarBlogs] = useState([])
  const [loading, setLoading] = useState(!staticPosts[slug])

  useEffect(() => {
    // Load from Supabase
    supabase.from('blogs').select('*').eq('slug', slug).single()
      .then(({ data }) => { if (data) setPost(data); setLoading(false) })
      .catch(() => setLoading(false))

    // Load similar blogs
    supabase.from('blogs').select('*').eq('is_published', true).neq('slug', slug).limit(3)
      .then(({ data }) => {
        if (data && data.length) setSimilarBlogs(data)
        else setSimilarBlogs(allStaticBlogs.filter(b => b.slug !== slug).slice(0, 3))
      })
      .catch(() => setSimilarBlogs(allStaticBlogs.filter(b => b.slug !== slug).slice(0, 3)))
  }, [slug])

  if (loading) return <div style={{ minHeight: '100vh', background: '#F4F4F4', paddingTop: 100, textAlign: 'center', color: '#777' }}>Loading...</div>

  if (!post) return (
    <div style={{ minHeight: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Post Not Found</h1>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    </div>
  )

  const date = new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ background: '#F4F4F4', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: '#0A0A0A', paddingTop: 96, paddingBottom: 40, borderBottom: '1px solid #2E2E2E' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#777', fontSize: 13, textDecoration: 'none', marginBottom: 20 }}>
            <FaArrowLeft size={11} /> Back to Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
            <span style={{ background: '#F4A100', color: '#111', fontSize: 10, fontWeight: 700, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{post.category}</span>
            <span style={{ color: '#777', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><FaCalendar size={10} /> {date}</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 32, lineHeight: 1.3, maxWidth: 700 }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
            <img src="/logo.png" alt="Clicksemurs" style={{ height: 24, width: 'auto' }} />
            <span style={{ color: '#777', fontSize: 12 }}>Clicksemurs Team</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>

          {/* Left — Blog Content */}
          <div>
            <div style={{ background: '#fff', borderRadius: 8, padding: '36px 40px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              {renderContent(post.content)}
            </div>
          </div>

          {/* Right — Sticky Lead Form */}
          <div style={{ position: 'sticky', top: 88 }}>
            <LeadForm />
          </div>
        </div>

        {/* Similar Blogs */}
        {similarBlogs.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <h2 style={{ color: '#111', fontWeight: 900, fontSize: 22, marginBottom: 24 }}>Similar Articles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {similarBlogs.map((blog, i) => {
                const imgs = ['https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80','https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&q=80','https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80']
                const img = blog.thumbnail || imgs[i % imgs.length]
                const bdate = new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                return (
                  <Link key={blog.id || blog.slug} to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }} className="group block">
                    <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', height: 160 }}>
                      <img src={img} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ background: '#111', borderRadius: 12, marginTop: -20, marginRight: 24, padding: '14px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', position: 'relative', zIndex: 1 }}>
                      <div style={{ color: '#F4A100', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{blog.category}</div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.4, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#777', fontSize: 11 }}>{bdate}</span>
                        <span style={{ color: '#F4A100', fontSize: 11, fontWeight: 700 }}>Read More →</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
