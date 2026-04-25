import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaCalendar, FaTag, FaArrowRight } from 'react-icons/fa'

const staticPosts = {
  'seo-tips-2024': {
    title: '10 SEO Tips That Will Dominate Google in 2024',
    category: 'SEO',
    date: '2024-11-15',
    content: `
Search engine optimization continues to evolve at a rapid pace. In 2024, the businesses that will dominate search results are those that adapt quickly to Google's evolving algorithm and user behavior shifts.

## 1. Prioritize Core Web Vitals

Google's Core Web Vitals — Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) — are now direct ranking factors. Ensure your website loads in under 2.5 seconds, responds to user interactions immediately, and maintains visual stability.

## 2. Focus on Search Intent Above All Else

Understanding why someone is searching — not just what they're searching for — is the single most important SEO skill. Match your content format (blog, landing page, product page) to the dominant intent behind each keyword.

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

SEO without measurement is guesswork. Set up Google Search Console, Google Analytics 4, and a rank tracking tool. Review performance monthly and adjust your strategy based on real data.

---

*Want to implement these strategies for your business? Get a free SEO audit from the Clicksemurs team today.*
    `,
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = staticPosts[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-white text-4xl font-black mb-4">Post Not Found</h1>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0A0A0A] pt-32 pb-20 border-b border-[#2E2E2E]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#777777] text-sm hover:text-white transition-colors mb-8">
            <FaArrowLeft size={12} /> Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-1 text-[#777777] text-xs">
              <FaTag size={10} /> {post.category}
            </span>
            <span className="flex items-center gap-1 text-[#777777] text-xs">
              <FaCalendar size={10} /> {new Date(post.date).toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'})}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F4F4F4] py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white border border-gray-200 p-10">
            <div
              className="prose prose-lg max-w-none text-[#4A4A4A]"
              style={{ lineHeight: '1.8' }}
            >
              {post.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-[#111111] font-black text-xl mt-8 mb-3">{line.slice(3)}</h2>
                if (line.startsWith('---')) return <hr key={i} className="my-8 border-gray-200" />
                if (line.trim() === '') return <br key={i} />
                return <p key={i} className="mb-4 text-[#4A4A4A] leading-relaxed">{line}</p>
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#111111] p-10 mt-8 text-center">
            <h3 className="text-white font-black text-2xl mb-3">Ready to Grow Your Business?</h3>
            <p className="text-[#AAAAAA] text-sm mb-6">Get a free digital marketing audit from our experts.</p>
            <Link to="/contact" className="btn-primary">
              Get Free Audit <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
