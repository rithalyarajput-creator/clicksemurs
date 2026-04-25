import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { supabase } from '../admin/supabase'

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80',
  'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
  'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&q=80',
]

const staticBlogs = [
  { id:1, slug:'seo-tips-2024', title:'10 SEO Tips That Will Dominate Google in 2024', category:'SEO', created_at:'2024-11-15' },
  { id:2, slug:'meta-ads-guide', title:'The Complete Guide to Meta Ads for E-Commerce in 2024', category:'Paid Ads', created_at:'2024-11-08' },
  { id:3, slug:'social-media-trends', title:'Social Media Trends Every Brand Must Know in 2024', category:'Social Media', created_at:'2024-10-30' },
  { id:4, slug:'website-conversion', title:"Why Your Website Isn't Converting (And How to Fix It)", category:'Website', created_at:'2024-10-22' },
  { id:5, slug:'email-marketing-roi', title:"Email Marketing Still Delivers the Highest ROI — Here's Why", category:'Email Marketing', created_at:'2024-10-15' },
  { id:6, slug:'influencer-marketing-brands', title:'How to Choose the Right Influencers for Your Brand', category:'Influencer Marketing', created_at:'2024-10-05' },
]

const categories = ['All', 'SEO', 'Paid Ads', 'Social Media', 'Website', 'Email Marketing', 'Influencer Marketing']

export default function Blog() {
  const [blogs, setBlogs] = useState(staticBlogs)
  const [active, setActive] = useState('All')

  useEffect(() => {
    supabase.from('blogs').select('*').eq('is_published', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data && data.length) setBlogs(data) })
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
                  <div className="rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300" style={{ height: 240 }}>
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
