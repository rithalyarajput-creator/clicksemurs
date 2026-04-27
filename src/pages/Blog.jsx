import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { supabase } from '../admin/supabase'

const PLACEHOLDER_IMAGES = [
  '/blog1.png',
  '/blog2.png',
  '/blog3.png',
  '/blog1.png',
  '/blog2.png',
  '/blog3.png',
]

const staticBlogs = [
  { id:1, slug:'seo-tips-2024', title:'10 Proven SEO Strategies That Will Dominate Google in 2025', category:'SEO', created_at:'2025-01-15', thumbnail:'/blog2.png' },
  { id:2, slug:'meta-ads-guide', title:'The Complete Guide to Meta Ads for Indian Businesses in 2025', category:'Paid Ads', created_at:'2025-01-08', thumbnail:'/blog1.png' },
  { id:3, slug:'reach-right-audience-digital-age', title:'How to Reach the Right Audience in the Digital Age', category:'Social Media', created_at:'2025-01-22', thumbnail:'/blog3.png' },
]

const categories = ['All', 'SEO', 'Paid Ads', 'Social Media', 'Website', 'Email Marketing', 'Influencer Marketing']

export default function Blog() {
  const [blogs, setBlogs] = useState(staticBlogs)
  const [active, setActive] = useState('All')

  useEffect(() => {
    // Fetch only non-static blogs from Supabase and append them
    const staticSlugs = staticBlogs.map(b => b.slug)
    supabase.from('blogs').select('id, slug, title, category, thumbnail, created_at')
      .eq('is_published', true).order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length) {
          const imgs = ['/blog1.png', '/blog2.png', '/blog3.png']
          // Only add blogs from Supabase that are NOT already in staticBlogs
          const extraBlogs = data
            .filter(b => !staticSlugs.includes(b.slug))
            .map((b, i) => ({ ...b, thumbnail: b.thumbnail || imgs[i % imgs.length] }))
          if (extraBlogs.length > 0) {
            setBlogs([...staticBlogs, ...extraBlogs])
          }
        }
      })
      .catch(() => {})
  }, [])

  const filtered = active === 'All' ? blogs : blogs.filter(b => b.category === active)

  return (
    <div>
      <PageHero
        label="Insights & Strategies"
        title="Our Blog"
        subtitle="Stay updated with the latest trends, tips, and strategy design"
      />

      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? 'bg-[#111111] text-white'
                    : 'bg-white border border-gray-200 text-[#777777] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((blog, i) => {
              const img = blog.thumbnail || PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]
              const date = new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              return (
                <Link
                  key={blog.id || blog.slug}
                  to={`/blog/${blog.slug}`}
                  className="group block"
                >
                  {/* Image — full width, rounded top corners */}
                  <div className="rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300" style={{ height: 180 }}>
                    <img
                      src={img}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Detail box — left aligned, right side shorter, overlaps image by ~20px */}
                  <div
                    className="relative z-10 rounded-xl shadow-xl"
                    style={{
                      background: '#111111',
                      marginTop: -24,
                      marginLeft: 0,
                      marginRight: 32,
                      padding: '16px 20px',
                    }}
                  >
                    {/* Category */}
                    <span style={{ color: '#F4A100', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      {blog.category}
                    </span>
                    {/* Title */}
                    <h3 className="text-white font-black text-sm leading-snug mt-1 mb-3 line-clamp-2 group-hover:text-[#F4A100] transition-colors duration-200">
                      {blog.title}
                    </h3>
                    {/* Date + Read More */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#777', fontSize: 11 }}>{date}</span>
                      <span style={{ color: '#F4A100', fontSize: 11, fontWeight: 700 }}>Read More →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
