import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { supabase } from '../admin/supabase'

const staticBlogs = [
  { id: 1, slug: 'reach-right-audience-digital-age', title: 'How to Reach the Right Audience in the Digital Age', category: 'Social Media', created_at: '2025-01-22', thumbnail: '/blog3.png' },
  { id: 2, slug: 'seo-tips-2024', title: '10 Proven SEO Strategies That Will Dominate Google in 2025', category: 'SEO', created_at: '2025-01-15', thumbnail: '/blog1.png' },
  { id: 3, slug: 'meta-ads-guide', title: 'The Complete Guide to Meta Ads for Indian Businesses in 2025', category: 'Paid Ads', created_at: '2025-01-08', thumbnail: '/blog2.png' },
]

const categories = ['All', 'SEO', 'Paid Ads', 'Social Media', 'Website', 'Email Marketing', 'Influencer Marketing']

export default function Blog() {
  const [active, setActive] = useState('All')
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('blogs')
      .select('id, slug, title, category, created_at, thumbnail, is_published')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          // Use Supabase data -- admin controls what's shown
          setBlogs(data.map(b => ({
            ...b,
            thumbnail: b.thumbnail || staticBlogs.find(s => s.slug === b.slug)?.thumbnail || '/blog1.png'
          })))
        } else {
          // No published blogs in Supabase -- show static fallback
          setBlogs(staticBlogs)
        }
        setLoading(false)
      })
      .catch(() => {
        setBlogs(staticBlogs)
        setLoading(false)
      })
  }, [])

  const filtered = active === 'All' ? blogs : blogs.filter(b => b.category === active)

  return (
    <div>
      <PageHero
        label="Insights & Strategies"
        title="Our Blog"
        subtitle="Stay updated with the latest trends, tips, and strategy design"
      />

      <section style={{ background: '#fefaef', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  background: active === cat ? '#1a1a1a' : '#fff',
                  color: active === cat ? '#fefaef' : '#777',
                  border: active === cat ? '1px solid #1a1a1a' : '1px solid rgba(0,0,0,0.1)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (active !== cat) { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = '#1a1a1a' } }}
                onMouseLeave={e => { if (active !== cat) { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = '#777' } }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center py-20 text-[#777]">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#777]">No blogs found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((blog) => {
                const date = new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                return (
                  <Link
                    key={blog.id || blog.slug}
                    to={`/blog/${blog.slug}`}
                    className="group block"
                  >
                    <div className="rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300" style={{ height: 180 }}>
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div
                      className="relative z-10 rounded-xl shadow-xl"
                      style={{ background: '#111111', marginTop: -24, marginLeft: 0, marginRight: 32, padding: '16px 20px' }}
                    >
                      <span style={{ color: '#c8892a', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        {blog.category}
                      </span>
                      <h3 className="text-white font-black text-sm leading-snug mt-1 mb-3 line-clamp-2 group-hover:text-[#c8892a] transition-colors duration-200">
                        {blog.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span style={{ color: '#777', fontSize: 11 }}>{date}</span>
                        <span style={{ color: '#c8892a', fontSize: 11, fontWeight: 700 }}>Read More →</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
