import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaCalendar } from 'react-icons/fa'
import { supabase } from '../admin/supabase'

const staticPosts = [
  {
    slug: 'seo-tips-2024',
    title: '10 Proven SEO Strategies That Will Dominate Google in 2025',
    category: 'SEO',
    created_at: '2025-01-15',
    thumbnail: '/blog1.png',
    content: [
      { type: 'intro', text: "In today's hyper-competitive digital landscape, ranking on the first page of Google is no longer optional -- it's survival. With over 8.5 billion searches happening every single day, businesses that master SEO enjoy a steady stream of high-intent, free traffic while competitors pay heavily for every click. This guide breaks down 10 proven strategies our team at Clicksemurs has used to help brands across India achieve top rankings, drive qualified traffic, and grow revenue organically." },

      { type: 'h3', text: '1. Prioritize Core Web Vitals -- Speed Is a Ranking Factor' },
      { type: 'p', text: "Google's Core Web Vitals -- Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) -- are direct ranking signals. LCP measures how fast your main content loads (target: under 2.5 seconds). FID measures how quickly your page responds to user interaction (target: under 100ms). CLS measures visual stability -- how much elements jump around as the page loads (target: under 0.1)." },
      { type: 'p', text: "Use Google PageSpeed Insights and Search Console's Core Web Vitals report to identify issues. Common fixes include compressing images, using next-gen formats like WebP, deferring non-critical JavaScript, and upgrading your hosting." },

      { type: 'h3', text: '2. Master Search Intent -- The Foundation of Modern SEO' },
      { type: 'p', text: "Understanding WHY someone is searching is more important than knowing WHAT they search. Every keyword has a dominant intent: informational (learning), navigational (finding a site), commercial (researching before buying), or transactional (ready to buy). Matching your content format to user intent is the single biggest lever for ranking improvement." },
      { type: 'p', text: 'For example, "how to improve website speed" has informational intent -- a blog post works best. "Best digital marketing agency in Mumbai" has commercial intent -- a comparison or service page performs better.' },

      { type: 'h3', text: '3. Build Topical Authority With Content Clusters' },
      { type: 'p', text: "Google rewards websites that demonstrate deep expertise in a specific niche. Instead of publishing random blog posts, build interconnected content clusters. Create one comprehensive pillar page on a broad topic, then support it with multiple detailed articles on subtopics -- all internally linked together. This signals to Google that your website is an authoritative source on that subject." },

      { type: 'h3', text: '4. Capture Featured Snippets for Instant Visibility' },
      { type: 'p', text: 'Featured snippets appear above all organic results -- often called "position zero." They generate massive click-through rates and establish immediate authority. To win snippets: structure your content with clear question-and-answer formats, use numbered lists for step-by-step processes, include concise definitions (40-60 words), and use table formats for comparisons.' },

      { type: 'h3', text: '5. Technical SEO -- The Foundation No One Sees But Google Does' },
      { type: 'p', text: "Even the best content fails without a technically sound website. Critical technical SEO elements include: a clean XML sitemap submitted to Google Search Console, proper canonical tags to prevent duplicate content, schema markup (structured data) for rich results, a mobile-first responsive design, HTTPS security, and a logical internal linking structure that distributes page authority throughout your site." },

      { type: 'h3', text: '6. Build High-Authority Backlinks Through Digital PR' },
      { type: 'p', text: "Backlinks remain one of the top 3 Google ranking factors. But not all links are equal -- one link from a DA 70+ news site or industry publication is worth more than 100 links from low-quality directories. Focus on digital PR (getting mentioned in news articles), creating linkable assets like original research or data studies, resource link building, and guest posting on authoritative industry blogs." },

      { type: 'h3', text: '7. Optimize for Local SEO -- Dominate Your City' },
      { type: 'p', text: "For businesses serving specific locations, local SEO is non-negotiable. Fully optimize your Google Business Profile with accurate NAP (Name, Address, Phone), business hours, photos, and regular posts. Build local citations on directories like Justdial, Sulekha, and IndiaMart. Consistently generate genuine customer reviews. Create location-specific landing pages for each city or area you serve." },

      { type: 'h3', text: '8. E-E-A-T -- Show Google You Are the Real Expert' },
      { type: 'p', text: "Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines are more important than ever, especially for YMYL (Your Money, Your Life) topics. Demonstrate E-E-A-T by: publishing content authored by real experts with bylines, citing credible sources and data, showcasing client results and case studies, maintaining a professional About page, and earning mentions and links from authoritative sources." },

      { type: 'h3', text: '9. Refresh and Update Existing Content Regularly' },
      { type: 'p', text: "One of the most underrated SEO strategies is updating your existing content. Google favors fresh, up-to-date information. Audit your content every 6 months. Update statistics, add new sections, improve readability, add relevant internal links, and update the publication date. Many websites see 30-50% traffic increases simply by refreshing articles that were previously ranking on page 2." },

      { type: 'h3', text: '10. Track Everything -- SEO Without Data Is Just Guessing' },
      { type: 'p', text: "Set up Google Search Console to monitor impressions, clicks, and ranking positions. Use Google Analytics 4 to track organic traffic, conversions, and revenue. Monitor keyword rankings weekly with tools like SEMrush or Ahrefs. Track Core Web Vitals monthly. Review backlink profiles quarterly. Create a simple monthly SEO report to measure progress against your goals and identify new opportunities." },

      { type: 'closing', text: "SEO is not a one-time task -- it's an ongoing investment that compounds over time. The brands that commit to consistent SEO efforts are the ones that enjoy sustainable, long-term growth without dependence on paid advertising. At Clicksemurs, we've helped businesses across industries achieve top rankings and multiply their organic revenue. If you want a free SEO audit of your website, reach out to our team today." },
    ]
  },
  {
    slug: 'meta-ads-guide',
    title: 'The Complete Guide to Meta Ads for Indian Businesses in 2025',
    category: 'Paid Ads',
    created_at: '2025-01-08',
    thumbnail: '/blog2.png',
    content: [
      { type: 'intro', text: "Meta Ads -- spanning Facebook and Instagram -- remain the most powerful paid advertising platform for reaching Indian consumers. With over 500 million active Facebook users and 230 million Instagram users in India, no other platform offers the same combination of scale, targeting precision, and creative flexibility. Whether you run a local business, an e-commerce brand, or a B2B company, Meta Ads can drive measurable growth when done right. This comprehensive guide walks you through everything -- from campaign structure to scaling strategies -- based on our experience managing crores in ad spend for Indian businesses." },

      { type: 'h3', text: 'Understanding the Meta Ads Campaign Structure' },
      { type: 'p', text: "Meta Ads are organized in three levels: Campaign > Ad Set > Ad. At the Campaign level, you choose your objective -- Awareness, Traffic, Engagement, Leads, or Conversions. The objective determines how Meta's algorithm optimizes your delivery. At the Ad Set level, you define your audience, placements, schedule, and budget. At the Ad level, you create your actual creative -- image, video, carousel, or collection." },
      { type: 'p', text: "The most common mistake Indian businesses make is choosing the wrong campaign objective. If you want sales, choose Conversions -- not Traffic. If you want form fills, choose Leads. Mismatched objectives burn budget without results." },

      { type: 'h3', text: 'Building a Winning Audience Strategy' },
      { type: 'p', text: "Meta's targeting power is unmatched. For Indian businesses, the most effective approach starts with Custom Audiences -- uploading your existing customer list, website visitors (via Pixel), or app users. From these, create Lookalike Audiences (1-3% for highest quality) that find new users similar to your best customers. For cold audiences, layer interests, behaviors, and demographics strategically. Avoid hyper-narrow targeting -- with costs-per-result rising, broader audiences often outperform narrow ones as Meta's AI optimizes delivery." },

      { type: 'h3', text: 'Creative Strategy -- What Actually Stops the Scroll' },
      { type: 'p', text: "In an era of infinite scroll, your creative has 1-2 seconds to stop someone mid-swipe. What works for Indian audiences: video creatives outperform static images (especially Reels-style vertical videos), Hindi and regional language copy dramatically improves CTR in Tier 2-3 cities, UGC (User Generated Content) and testimonial videos build trust faster than polished brand films, and before-and-after formats work exceptionally well for service businesses." },
      { type: 'p', text: "Always test 3-5 creative variants per ad set. Never assume -- let data decide the winner. The creative that performs best in your mind is rarely the one that performs best in the market." },

      { type: 'h3', text: 'Retargeting -- Convert the Visitors Who Almost Bought' },
      { type: 'p', text: "80% of your sales come from retargeted audiences. Segment your retargeting carefully: website visitors (last 30 days) who haven't purchased need awareness-building ads. Add-to-cart abandoners need urgency-driven ads with offers or testimonials. Past purchasers need upsell or cross-sell campaigns. Each segment deserves different messaging -- one size absolutely does not fit all in retargeting." },

      { type: 'h3', text: 'Budget Management and Bidding Strategy' },
      { type: 'p', text: "For new campaigns, start with Rs 500-1,000 per day per ad set. Give each ad set at least 7 days and 50+ conversions before making optimization decisions -- this is Meta's learning phase. Use Advantage Campaign Budget (formerly CBO) once you have winning ad sets, allowing Meta to automatically distribute budget to the best performers. Avoid manual bidding until you have strong conversion data." },

      { type: 'h3', text: 'Scaling Meta Ads Without Killing Performance' },
      { type: 'p', text: "Scaling is where most advertisers go wrong. Never increase ad set budgets by more than 20-30% every 3-4 days -- larger jumps reset the learning phase. Instead of editing winning ad sets, duplicate them at higher budgets. Expand to new audiences (broader demographics, new lookalikes, new geographies) rather than just increasing budgets. Horizontal scaling (more audiences) is often more sustainable than vertical scaling (higher budgets on same audience)." },

      { type: 'h3', text: 'Measuring What Actually Matters' },
      { type: 'p', text: "Stop obsessing over CPM and CPC. The metrics that matter for business results: Cost Per Lead (CPL), Cost Per Acquisition (CPA), Return on Ad Spend (ROAS), and ultimately Revenue Generated. Set up Meta Pixel correctly on your website. Use Conversions API alongside Pixel for accurate tracking (iOS 14+ made Pixel-only tracking unreliable). Create custom events for key actions -- form submissions, add-to-cart, purchases, phone calls." },

      { type: 'h3', text: 'Common Meta Ads Mistakes Indian Businesses Make' },
      { type: 'p', text: "1. Running ads without a clear landing page -- sending traffic to a homepage kills conversions. 2. Stopping campaigns too early before learning phase completes. 3. Using the same creative for cold and warm audiences. 4. Not testing enough creative variants. 5. Ignoring comment sections -- negative comments hurt ad performance significantly. 6. No retargeting strategy -- leaving 80% of potential revenue on the table." },

      { type: 'closing', text: "Meta Ads are not a magic button -- they require strategic thinking, creative experimentation, and data-driven optimization. But when done right, they can deliver extraordinary results. At Clicksemurs, our certified Meta Ads specialists have managed campaigns across 50+ industries and delivered consistent ROAS improvements for our clients. Ready to scale your business with Meta Ads? Get a free campaign audit from our team." },
    ]
  },
  {
    slug: 'reach-right-audience-digital-age',
    title: 'How to Reach the Right Audience in the Digital Age',
    category: 'Social Media',
    created_at: '2025-01-22',
    thumbnail: '/blog3.png',
    content: [
      { type: 'intro', text: "The digital world moves faster than ever. Every day, millions of posts, videos, ads, and campaigns compete for attention across platforms like Instagram, Facebook, LinkedIn, and X (formerly Twitter). In this crowded space, reaching people is no longer the challenge. Reaching the right people is. Brands often focus on numbers like views, followers, and clicks, but real growth does not come from attention alone. Growth comes from connection. And connection begins when your message reaches the people who truly need what you offer. The real power of digital marketing is not visibility. It is relevance." },

      { type: 'h3', text: 'Understanding Who You Want to Reach' },
      { type: 'p', text: "Before reaching people, you need to define who they are. Many businesses struggle because their message reaches the wrong audience. Even the best product can fail if it is shown to people who are not interested. Start by asking important questions: Who needs your product? What problem are they facing? What platforms do they use? What motivates their buying decisions? The clearer your audience profile becomes, the easier it becomes to reach them." },

      { type: 'h3', text: 'Choosing the Right Platform Matters' },
      { type: 'p', text: "Every platform has a different audience behavior. Using the same strategy everywhere rarely works. Instagram is ideal for visual storytelling, lifestyle branding, and younger audiences. Facebook remains powerful for community building, local targeting, and paid campaigns. LinkedIn works best for professional networking and B2B marketing. X (formerly Twitter) helps brands join conversations and trends quickly. Choosing the right platform increases the chance of reaching the right people." },

      { type: 'h3', text: 'Content is the Bridge Between You and Your Audience' },
      { type: 'p', text: "Content is how people discover you. But content without value gets ignored. The strongest content solves problems, answers questions, and builds trust. Educational posts, short-form videos, blogs, and case studies help brands build stronger connections with their audience. People connect with value before they connect with products. That is how reach becomes trust." },

      { type: 'h3', text: 'Consistency Creates Recognition' },
      { type: 'p', text: "One post rarely changes everything. Consistency does. People trust what they see repeatedly. Regular posting creates familiarity. Familiarity creates trust. And trust creates action. Brands that stay active remain visible. Brands that remain visible stay relevant." },

      { type: 'h3', text: 'Paid Advertising Accelerates Reach' },
      { type: 'p', text: "Organic growth takes time. Paid advertising helps brands scale faster. Platforms like Google Ads and Facebook Ads Manager allow businesses to target audiences based on interests, location, behavior, and demographics. This level of targeting makes paid advertising highly effective. Instead of reaching everyone, you reach the people most likely to convert." },

      { type: 'h3', text: 'Engagement Builds Real Relationships' },
      { type: 'p', text: "Reaching people is only the beginning. Keeping them engaged is what matters. Replying to comments, answering messages, and starting conversations builds stronger audience relationships. Engagement tells the platform that your content matters. And platforms reward valuable content with more visibility. The brands that listen grow faster." },

      { type: 'h3', text: 'SEO Helps People Find You' },
      { type: 'p', text: "Not all audience discovery happens on social media. Search engines still play a major role. Google remains one of the strongest discovery tools for businesses. Search Engine Optimization helps your content appear when people search for solutions related to your business. Strong SEO includes quality content, proper keywords, fast website speed, and a clear website structure. SEO builds long-term visibility." },

      { type: 'h3', text: 'Data Shows What Works' },
      { type: 'p', text: "Growth without tracking becomes guesswork. Digital marketing gives brands access to important insights. Track what content performs best, where traffic comes from, and which audience converts. Data helps improve strategy. It removes assumptions and shows what actually works." },

      { type: 'h3', text: 'Trust Converts Reach into Results' },
      { type: 'p', text: "People may discover your brand quickly. But trust takes time. Trust comes from consistency, honesty, and proof. Customer reviews, testimonials, and success stories help build confidence. People trust real experiences more than advertisements. Trust is what turns attention into action." },

      { type: 'h3', text: 'The Real Secret to Digital Reach' },
      { type: 'p', text: "The biggest mistake brands make is trying to reach everyone. Trying to connect with everyone often means connecting with no one. The goal is not maximum reach. The goal is meaningful reach. The right audience, the right message, and the right timing create real growth." },

      { type: 'closing', text: "In digital marketing, reaching the right audience is more important than reaching a large audience. Strategy matters more than noise. Brands that understand their audience, create valuable content, stay consistent, and build trust are the ones that grow. Because being seen is important. But being remembered is everything." },
    ]
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
      <div style={{ background: '#F4A100', padding: '16px 20px' }}>
        <div style={{ color: '#111', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Apply for Instant Consultation</div>
        <div style={{ color: '#111', fontSize: 11, opacity: 0.7, marginTop: 2 }}>Get faster. No paperwork needed.</div>
      </div>
      <div style={{ padding: '20px' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ color: '#22c55e', fontSize: 36, marginBottom: 8 }}>&#10003;</div>
            <div style={{ color: '#111', fontWeight: 700, fontSize: 14 }}>{"We'll contact you soon!"}</div>
            <div style={{ color: '#777', fontSize: 12, marginTop: 4 }}>Our team will reach out within 24 hours.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {[
              { ph: 'Full Name', key: 'name', type: 'text' },
              { ph: 'Mobile Number', key: 'phone', type: 'tel' },
              { ph: 'Email Address', key: 'email', type: 'email' },
            ].map(f => (
              <input key={f.key} type={f.type} placeholder={f.ph} required
                value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ display: 'block', width: '100%', border: '1px solid #e5e5e5', borderRadius: 6, padding: '10px 14px', fontSize: 13, outline: 'none', marginBottom: 10, boxSizing: 'border-box', color: '#111' }}
              />
            ))}
            <button type="submit" disabled={loading} style={{
              display: 'block', width: '100%', background: '#F4A100', color: '#111',
              padding: '12px', fontWeight: 900, fontSize: 13, border: 'none',
              borderRadius: 6, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14
            }}>
              {loading ? 'Sending...' : 'Get Free Report'}
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
  // HTML string from rich editor -- render as HTML
  if (typeof content === 'string') {
    if (content.trim().startsWith('<') || content.includes('<p>') || content.includes('<h')) {
      return (
        <div
          className="blog-content"
          style={{ color: '#444', fontSize: 15, lineHeight: 1.85 }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
    }
    // Plain text fallback
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} style={{ color: '#111', fontWeight: 900, fontSize: 22, marginTop: 40, marginBottom: 14, lineHeight: 1.3, borderLeft: '4px solid #F4A100', paddingLeft: 16 }}><strong>{line.slice(3)}</strong></h3>
      if (line.trim() === '') return <div key={i} style={{ height: 6 }} />
      return <p key={i} style={{ color: '#444', fontSize: 15, lineHeight: 1.85, marginBottom: 12 }}>{line}</p>
    })
  }
  // Static array format
  return content.map((block, i) => {
    if (block.type === 'h3') return (
      <h3 key={i} style={{ color: '#111', fontWeight: 900, fontSize: 22, marginTop: 40, marginBottom: 14, lineHeight: 1.3, borderLeft: '4px solid #F4A100', paddingLeft: 16 }}><strong>{block.text}</strong></h3>
    )
    if (block.type === 'intro') return (
      <p key={i} style={{ color: '#333', fontSize: 16, lineHeight: 1.9, marginBottom: 24, fontWeight: 500, borderLeft: '3px solid #e5e5e5', paddingLeft: 16, fontStyle: 'italic' }}>{block.text}</p>
    )
    if (block.type === 'closing') return (
      <div key={i} style={{ background: '#F4A100', borderRadius: 8, padding: '20px 24px', marginTop: 40 }}>
        <p style={{ color: '#111', fontSize: 15, lineHeight: 1.8, margin: 0, fontWeight: 600 }}>{block.text}</p>
      </div>
    )
    return <p key={i} style={{ color: '#444', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }}>{block.text}</p>
  })
}

function renderFaqs(faqs) {
  if (!faqs || !faqs.length) return null
  return (
    <div style={{ marginTop: 48 }}>
      <h3 style={{ color: '#111', fontWeight: 900, fontSize: 20, marginBottom: 20, borderLeft: '4px solid #F4A100', paddingLeft: 16 }}>Frequently Asked Questions</h3>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1px solid #eee', paddingBottom: 16, marginBottom: 16 }}>
          <div style={{ color: '#111', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{faq.q}</div>
          <div style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>
        </div>
      ))}
    </div>
  )
}

const similarImgs = ['/blog1.png', '/blog2.png', '/blog3.png']

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [similarBlogs, setSimilarBlogs] = useState([])

  useEffect(() => {
    const staticMatch = staticPosts.find(p => p.slug === slug)

    supabase.from('blogs').select('*').eq('slug', slug).single()
      .then(({ data }) => {
        if (data && staticMatch) {
          // Known static blog -- use Supabase for title/thumbnail/meta only
          // but keep static structured content (Supabase may have garbage HTML)
          const hasRichContent = data.content && data.content.length > 500 && !Array.isArray(data.content)
          setPost({
            ...staticMatch,
            title: data.title || staticMatch.title,
            thumbnail: data.thumbnail || staticMatch.thumbnail,
            category: data.category || staticMatch.category,
            meta_title: data.meta_title || '',
            meta_description: data.meta_description || '',
            content: hasRichContent ? data.content : staticMatch.content,
          })
        } else if (data && !staticMatch) {
          // Admin-created blog not in static list -- use Supabase fully
          const imgs = ['/blog1.png', '/blog2.png', '/blog3.png']
          setPost({ ...data, thumbnail: data.thumbnail || imgs[0] })
        } else if (staticMatch) {
          setPost(staticMatch)
        }
      })
      .catch(() => {
        if (staticMatch) setPost(staticMatch)
      })

    supabase.from('blogs').select('id, slug, title, category, thumbnail, created_at').eq('is_published', true).neq('slug', slug).limit(3)
      .then(({ data }) => {
        if (data && data.length) {
          setSimilarBlogs(data.map((b) => ({
            ...b,
            // Always use static thumbnail if slug matches -- Supabase may have wrong URL
            thumbnail: staticPosts.find(s => s.slug === b.slug)?.thumbnail || b.thumbnail || '/blog1.png'
          })))
        } else {
          setSimilarBlogs(staticPosts.filter(p => p.slug !== slug))
        }
      })
      .catch(() => {
        setSimilarBlogs(staticPosts.filter(p => p.slug !== slug))
      })
  }, [slug])

  if (!post) return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
      <div style={{ color: '#777', fontSize: 16 }}>Loading...</div>
    </div>
  )

  const date = new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ background: '#F4F4F4', minHeight: '100vh' }}>
      <div style={{ background: '#fff', paddingTop: 80, borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#777', fontSize: 13, textDecoration: 'none', marginBottom: 16 }}>
            <FaArrowLeft size={11} /> Back to Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ background: '#F4A100', color: '#111', fontSize: 10, fontWeight: 700, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: 3 }}>{post.category}</span>
            <span style={{ color: '#777', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><FaCalendar size={10} /> {date}</span>
          </div>
          <h1 style={{ color: '#111', fontWeight: 900, fontSize: 32, lineHeight: 1.3, maxWidth: 720, marginBottom: 16, fontFamily: 'inherit', letterSpacing: '-0.01em' }}><strong>{post.title}</strong></h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 24 }}>
            <img src="/logo.png" alt="Clicksemurs" style={{ height: 22, width: 'auto' }} />
            <span style={{ color: '#777', fontSize: 12 }}>Clicksemurs Team</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>
          <div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '36px 40px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #ebebeb' }}>
              <img src={post.thumbnail || '/blog1.png'} alt={post.title} style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 8, display: 'block', marginBottom: 32 }} />
              {renderContent(post.content)}
              {renderFaqs(post.faqs)}
            </div>
          </div>
          <div style={{ position: 'sticky', top: 80 }}>
            <LeadForm />
          </div>
        </div>

        {similarBlogs.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h2 style={{ color: '#111', fontWeight: 900, fontSize: 22, marginBottom: 24, borderBottom: '3px solid #F4A100', paddingBottom: 10, display: 'inline-block' }}>Similar Articles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 8 }}>
              {similarBlogs.map((blog, i) => {
                const img = blog.thumbnail || similarImgs[i % similarImgs.length]
                const bdate = new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                return (
                  <Link key={blog.slug} to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ borderRadius: 16, overflow: 'hidden', height: 160 }}>
                      <img src={img} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ background: '#111', borderRadius: 12, marginTop: -20, marginRight: 28, padding: '14px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', position: 'relative', zIndex: 1 }}>
                      <div style={{ color: '#F4A100', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>{blog.category}</div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.4, marginBottom: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{blog.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#777', fontSize: 11 }}>{bdate}</span>
                        <span style={{ color: '#F4A100', fontSize: 11, fontWeight: 700 }}>Read More</span>
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
