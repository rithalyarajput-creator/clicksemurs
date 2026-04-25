import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaCalendar } from 'react-icons/fa'
import { supabase } from '../admin/supabase'

const IMGS = [
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
  'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
  'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&q=80',
]

const staticPosts = [
  {
    slug: 'seo-tips-2024',
    title: '10 SEO Tips That Will Dominate Google in 2024',
    category: 'SEO',
    created_at: '2024-11-15',
    thumbnail: IMGS[0],
    content: `Search engine optimization continues to evolve at a rapid pace. In 2024, the businesses that will dominate search results are those that adapt quickly to Google's evolving algorithm and user behavior shifts.

## 1. Prioritize Core Web Vitals

Google's Core Web Vitals — Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) — are now direct ranking factors. Ensure your website loads in under 2.5 seconds, responds to user interactions immediately, and maintains visual stability.

## 2. Focus on Search Intent Above All Else

Understanding why someone is searching — not just what they're searching for — is the single most important SEO skill. Match your content format to the dominant intent behind each keyword.

## 3. Build Topical Authority

Google rewards websites that demonstrate deep expertise in a specific subject area. Instead of creating isolated blog posts, build interconnected content clusters around your core topics.

## 4. Optimize for Featured Snippets

Featured snippets now appear for approximately 12% of all searches. Structure your content with clear question-and-answer formats, concise definitions, and numbered lists to win position zero.

## 5. Leverage AI-Assisted Content Creation Responsibly

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
  {
    slug: 'meta-ads-guide',
    title: 'The Complete Guide to Meta Ads for E-Commerce in 2024',
    category: 'Paid Ads',
    created_at: '2024-11-08',
    thumbnail: IMGS[1],
    content: `Meta Ads remain one of the most powerful tools for e-commerce businesses. Here is how to structure your campaigns for maximum ROAS.

## Understanding Campaign Structure

Organize by awareness, consideration, and conversion objectives. Each stage requires different creative and targeting approaches. Awareness campaigns should focus on broad audiences, while conversion campaigns target warm audiences who already know your brand.

## Audience Strategy

Build custom audiences from your customer list, then create lookalikes. Layer interests and behaviors for prospecting campaigns. The key is to start with what you know about your existing customers and expand from there.

## Creative Testing

Test 3-5 creative variants per ad set. Let data decide the winner. Never kill an ad set before 7 days and 1000 impressions. Test different formats — single image, carousel, video, and Reels to understand what resonates with your audience.

## Retargeting

Target website visitors, add-to-cart abandoners, and past purchasers separately. Each segment needs different messaging. Someone who abandoned their cart needs urgency, while a past customer needs a reason to come back.

## Budget Management

Start with a modest daily budget of Rs 500-1000 per ad set. Once you identify winners, scale gradually. Avoid making dramatic budget changes — increase by no more than 20-30% every 3-4 days to avoid disrupting the learning phase.

## Scaling

Once you find a winning combination, scale budgets by 20% every 3 days. Avoid drastic budget changes that reset the learning phase. Duplicate winning ad sets at higher budgets rather than editing existing ones.`,
  },
  {
    slug: 'social-media-trends',
    title: 'Social Media Trends Every Brand Must Know in 2024',
    category: 'Social Media',
    created_at: '2024-10-30',
    thumbnail: IMGS[2],
    content: `Social media is evolving faster than ever. Here are the trends that are reshaping digital marketing in 2024 and what your brand needs to do to stay ahead.

## Short-Form Video Dominates Everything

Reels, TikToks, and YouTube Shorts are now the highest-engagement content format on every platform. Brands that invest in short-form video see 2-3x more organic reach than those relying on static posts.

## AI-Powered Content Creation

AI tools are changing how brands create content at scale. From auto-generating captions to creating video scripts, AI is now an essential tool in every social media manager's toolkit.

## Community Building Over Broadcasting

The brands winning on social media in 2024 are those building genuine communities — not just broadcasting messages. Private groups, Discord servers, and close-friends lists are becoming key channels.

## Creator Collaborations

Micro-influencers with 10k-100k followers consistently outperform mega-influencers in engagement and conversion. Authentic partnerships with niche creators deliver better ROI than celebrity endorsements.

## Social Commerce

Instagram and Facebook Shops, Pinterest shopping, and TikTok Shop are turning social media into direct sales channels. Brands that integrate shopping into their social strategy see significant revenue uplift.`,
  },
  {
    slug: 'website-conversion',
    title: "Why Your Website Isn't Converting (And How to Fix It)",
    category: 'Website',
    created_at: '2024-10-22',
    thumbnail: IMGS[3],
    content: `Most websites lose 95% of visitors without converting them. Here are the exact fixes that turn browsers into buyers.

## The Conversion Problem

The average website conversion rate is just 2-3%. That means 97 out of every 100 visitors leave without taking action. But with the right optimizations, you can dramatically improve these numbers.

## Speed is Everything

A 1-second delay in page load time reduces conversions by 7%. Use Google PageSpeed Insights to identify and fix performance issues. Compress images, minify code, and use a CDN to serve content faster.

## Your Value Proposition Must Be Instantly Clear

Visitors decide within 5 seconds whether to stay or leave. Your headline must immediately answer: What do you do? Who is it for? Why should I care? Make it impossible to misunderstand your offering.

## Reduce Friction in Your Forms

Every field you add to a form reduces conversions. Ask only for what is absolutely necessary. Replace long forms with multi-step forms that feel less overwhelming.

## Add Social Proof Everywhere

Testimonials, case studies, client logos, and review scores build trust. Place social proof near your call-to-action buttons, not just on a dedicated testimonials page.

## Fix Your Call-to-Action

Vague CTAs like "Submit" or "Learn More" underperform. Use specific, benefit-driven CTAs like "Get My Free Audit" or "Start Growing My Business Today."`,
  },
  {
    slug: 'email-marketing-roi',
    title: "Email Marketing Still Delivers the Highest ROI — Here's Why",
    category: 'Email Marketing',
    created_at: '2024-10-15',
    thumbnail: IMGS[4],
    content: `With a 4,200% average ROI, email marketing remains the most powerful digital channel. Here is how to harness it effectively.

## Why Email Outperforms Every Other Channel

Unlike social media — where algorithms control your reach — email gives you direct access to your audience. Every subscriber has actively chosen to hear from you, making them far more valuable than a social media follower.

## Building a Quality List

Your email list is only as valuable as its quality. Focus on attracting subscribers who genuinely want your content. Use lead magnets — free guides, templates, or tools — to incentivize sign-ups from your target audience.

## Welcome Sequences That Convert

The first email a new subscriber receives has the highest open rate of any email you will ever send. Use it to set expectations, deliver on your promise, and begin building a relationship.

## Segmentation is Everything

Sending the same email to everyone is leaving money on the table. Segment your list by behavior, purchase history, and interests to send highly relevant messages that drive action.

## Automation That Works While You Sleep

Set up automated flows for: welcome sequences, abandoned cart recovery, post-purchase follow-ups, and re-engagement campaigns. These automated sequences can generate 30-50% of your total email revenue.`,
  },
  {
    slug: 'influencer-marketing-brands',
    title: 'How to Choose the Right Influencers for Your Brand',
    category: 'Influencer Marketing',
    created_at: '2024-10-05',
    thumbnail: IMGS[5],
    content: `Influencer marketing can be one of the highest-ROI channels — or a complete waste of budget. The difference is choosing the right partners.

## Micro vs Macro Influencers

Micro-influencers (10k-100k followers) consistently deliver higher engagement rates and more authentic recommendations than mega-influencers. Their audiences trust them more, and their rates are significantly lower.

## Engagement Rate is More Important Than Follower Count

A creator with 50,000 highly engaged followers is more valuable than one with 500,000 passive followers. Calculate engagement rate: (likes + comments) / followers x 100. Anything above 3% is solid.

## Audience Alignment

The influencer's audience must match your target customer. Ask for audience demographics before signing any agreement. A mismatch here will kill your campaign results regardless of how good the content is.

## Authenticity Over Polish

The best performing influencer content often looks casual and genuine, not highly produced. Give creators freedom to present your brand in their natural voice — it will perform better than scripted content.

## Measure Everything

Track: reach, impressions, engagement, link clicks, and conversions. Use unique discount codes or UTM links for each creator to accurately attribute sales and calculate true ROI.`,
  },
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

  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', border: '1px solid #e5e5e5' }}>
      {/* Orange Header */}
      <div style={{ background: '#F4A100', padding: '16px 20px' }}>
        <div style={{ color: '#111', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Apply for Instant Consultation</div>
        <div style={{ color: '#111', fontSize: 11, opacity: 0.7, marginTop: 2 }}>Get faster. No paperwork needed.</div>
      </div>

      <div style={{ padding: '20px' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ color: '#22c55e', fontSize: 36, marginBottom: 8 }}>✓</div>
            <div style={{ color: '#111', fontWeight: 700, fontSize: 14 }}>We'll contact you soon!</div>
            <div style={{ color: '#777', fontSize: 12, marginTop: 4 }}>Our team will reach out within 24 hours.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {[
              { ph: 'Full Name', key: 'name', type: 'text' },
              { ph: 'Mobile Number', key: 'phone', type: 'tel' },
              { ph: 'Email Address', key: 'email', type: 'email' },
            ].map(f => (
              <input
                key={f.key} type={f.type} placeholder={f.ph} required
                value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ display: 'block', width: '100%', border: '1px solid #e5e5e5', borderRadius: 6, padding: '10px 14px', fontSize: 13, outline: 'none', marginBottom: 10, boxSizing: 'border-box', color: '#111' }}
              />
            ))}
            <button type="submit" disabled={loading} style={{
              display: 'block', width: '100%', background: '#F4A100', color: '#111',
              padding: '12px', fontWeight: 900, fontSize: 13, border: 'none',
              borderRadius: 6, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14
            }}>
              {loading ? 'Sending...' : 'Get Free Report →'}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Instant Approval', 'No Collateral', '100% Digital'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #F4A100', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F4A100' }} />
                  </div>
                  <span style={{ color: '#555', fontSize: 12 }}>{t}</span>
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function renderContent(content) {
  if (!content) return null
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} style={{ color: '#111', fontWeight: 900, fontSize: 20, marginTop: 32, marginBottom: 12, lineHeight: 1.3 }}>{line.slice(3)}</h2>
    if (line.startsWith('# ')) return <h1 key={i} style={{ color: '#111', fontWeight: 900, fontSize: 26, marginTop: 32, marginBottom: 12 }}>{line.slice(2)}</h1>
    if (line.startsWith('---')) return <hr key={i} style={{ margin: '24px 0', borderColor: '#e5e5e5' }} />
    if (line.trim() === '') return <div key={i} style={{ height: 6 }} />
    return <p key={i} style={{ color: '#444', fontSize: 15, lineHeight: 1.85, marginBottom: 10 }}>{line}</p>
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [similarBlogs, setSimilarBlogs] = useState([])

  useEffect(() => {
    // First set static data immediately
    const found = staticPosts.find(p => p.slug === slug)
    if (found) setPost(found)

    // Then try Supabase
    supabase.from('blogs').select('*').eq('slug', slug).single()
      .then(({ data }) => { if (data && data.content) setPost({ ...data, thumbnail: data.thumbnail || found?.thumbnail || IMGS[0] }) })
      .catch(() => {})

    // Similar blogs
    const others = staticPosts.filter(p => p.slug !== slug).slice(0, 3)
    setSimilarBlogs(others)
    supabase.from('blogs').select('*').eq('is_published', true).neq('slug', slug).limit(3)
      .then(({ data }) => { if (data && data.length) setSimilarBlogs(data.map((b, i) => ({ ...b, thumbnail: b.thumbnail || IMGS[i % IMGS.length] }))) })
      .catch(() => {})
  }, [slug])

  if (!post) return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
      <div style={{ color: '#777', fontSize: 16 }}>Loading...</div>
    </div>
  )

  const date = new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const heroImg = post.thumbnail || IMGS[0]

  return (
    <div style={{ background: '#F4F4F4', minHeight: '100vh' }}>

      {/* Hero — light background, no black banner */}
      <div style={{ background: '#fff', paddingTop: 80, borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#777', fontSize: 13, textDecoration: 'none', marginBottom: 16 }}>
            <FaArrowLeft size={11} /> Back to Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ background: '#F4A100', color: '#111', fontSize: 10, fontWeight: 700, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: 3 }}>{post.category}</span>
            <span style={{ color: '#777', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><FaCalendar size={10} /> {date}</span>
          </div>
          <h1 style={{ color: '#111', fontWeight: 900, fontSize: 30, lineHeight: 1.3, maxWidth: 700, marginBottom: 16 }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 20 }}>
            <img src="/logo.png" alt="Clicksemurs" style={{ height: 22, width: 'auto' }} />
            <span style={{ color: '#777', fontSize: 12 }}>Clicksemurs Team</span>
          </div>
        </div>

        {/* Hero Image */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <img src={heroImg} alt={post.title} style={{ width: '100%', height: 340, objectFit: 'cover', borderRadius: '8px 8px 0 0', display: 'block' }} />
        </div>
      </div>

      {/* Main: Content + Sticky Form */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>

          {/* Left — Scrollable Content */}
          <div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '36px 40px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #ebebeb' }}>
              {renderContent(post.content)}
            </div>
          </div>

          {/* Right — Sticky Lead Form */}
          <div style={{ position: 'sticky', top: 80 }}>
            <LeadForm />
          </div>

        </div>

        {/* Similar Blogs */}
        {similarBlogs.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h2 style={{ color: '#111', fontWeight: 900, fontSize: 22, marginBottom: 24, borderBottom: '2px solid #F4A100', paddingBottom: 10, display: 'inline-block' }}>Similar Articles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 8 }}>
              {similarBlogs.map((blog, i) => {
                const img = blog.thumbnail || IMGS[i % IMGS.length]
                const bdate = new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                return (
                  <Link key={blog.slug} to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', display: 'block' }} className="group">
                    <div style={{ borderRadius: 16, overflow: 'hidden', height: 160 }}>
                      <img src={img} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                    </div>
                    <div style={{ background: '#111', borderRadius: 12, marginTop: -20, marginRight: 28, padding: '14px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', position: 'relative', zIndex: 1 }}>
                      <div style={{ color: '#F4A100', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>{blog.category}</div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.4, marginBottom: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{blog.title}</div>
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
