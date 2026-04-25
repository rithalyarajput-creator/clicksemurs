import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { FaArrowRight, FaCalendar, FaTag } from 'react-icons/fa'

const staticBlogs = [
  { id:1, slug:'seo-tips-2024', title:'10 SEO Tips That Will Dominate Google in 2024', category:'SEO', date:'2024-11-15', excerpt:'Discover the most effective SEO strategies that are driving organic traffic growth right now — from Core Web Vitals to AI-assisted content.' },
  { id:2, slug:'meta-ads-guide', title:'The Complete Guide to Meta Ads for E-Commerce in 2024', category:'Paid Ads', date:'2024-11-08', excerpt:'Learn how to structure your Meta Ads campaigns for maximum ROAS, from audience building to creative testing strategies.' },
  { id:3, slug:'social-media-trends', title:'Social Media Trends Every Brand Must Know in 2024', category:'Social Media', date:'2024-10-30', excerpt:'Short-form video, AI content, and community building are reshaping social media. Here\'s what your brand needs to do right now.' },
  { id:4, slug:'website-conversion', title:'Why Your Website Isn\'t Converting (And How to Fix It)', category:'Website', date:'2024-10-22', excerpt:'Most websites lose 95% of visitors without converting them. Here are the exact fixes that turn browsers into buyers.' },
  { id:5, slug:'email-marketing-roi', title:'Email Marketing Still Delivers the Highest ROI — Here\'s Why', category:'Email Marketing', date:'2024-10-15', excerpt:'With a 4,200% average ROI, email marketing remains the most powerful channel. Here\'s how to harness it in 2024.' },
  { id:6, slug:'influencer-marketing-brands', title:'How to Choose the Right Influencers for Your Brand', category:'Influencer Marketing', date:'2024-10-05', excerpt:'Micro vs macro influencers, engagement rates, and authenticity — the complete framework for influencer selection.' },
]

const categories = ['All', 'SEO', 'Paid Ads', 'Social Media', 'Website', 'Email Marketing', 'Influencer Marketing']

export default function Blog() {
  const [blogs, setBlogs] = useState(staticBlogs)
  const [active, setActive] = useState('All')

  useEffect(() => {
    fetch('/api/blogs.php')
      .then(r => r.json())
      .then(data => { if (data.length) setBlogs(data) })
      .catch(() => {})
  }, [])

  const filtered = active === 'All' ? blogs : blogs.filter(b => b.category === active)

  return (
    <div>
      <PageHero
        label="Insights & Strategies"
        title="Digital Marketing Blog"
        subtitle="Expert insights, data-driven strategies, and actionable tips from the Clicksemurs team."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(blog => (
              <Link key={blog.id} to={`/blog/${blog.slug}`} className="bg-white border border-gray-200 group hover:border-[#111111] transition-all duration-200">
                {/* Thumbnail */}
                <div className="bg-[#111111] h-48 flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="text-[#777777] text-xs uppercase tracking-widest mb-2">{blog.category}</div>
                    <div className="text-white font-bold text-sm leading-tight">{blog.title}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1 text-[#777777] text-xs">
                      <FaTag size={10} /> {blog.category}
                    </span>
                    <span className="flex items-center gap-1 text-[#777777] text-xs">
                      <FaCalendar size={10} /> {new Date(blog.date).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'})}
                    </span>
                  </div>
                  <h3 className="text-[#111111] font-black text-lg mb-3 leading-tight">{blog.title}</h3>
                  <p className="text-[#777777] text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4 text-[#111111] text-sm font-semibold">
                    Read More <FaArrowRight size={10} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
