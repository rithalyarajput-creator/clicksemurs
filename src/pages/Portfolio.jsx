import { useState } from 'react'
import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const caseStudies = [
  { id:1, client:'TechSpark Solutions', industry:'Technology', challenge:'Low organic traffic and poor search visibility', solution:'Full SEO overhaul + content strategy', result:'300% organic traffic increase in 6 months', before:'1,200 monthly visits', after:'4,800 monthly visits' },
  { id:2, client:'StyleHouse Fashion', industry:'Fashion', challenge:'High ad spend with low ROAS on Meta Ads', solution:'Audience restructure + creative A/B testing', result:'400% ROI improvement in 8 months', before:'1.2x ROAS', after:'5.8x ROAS' },
  { id:3, client:'GreenBuild Infrastructure', industry:'Real Estate', challenge:'No digital presence, zero online leads', solution:'Full website + SEO + Google Ads', result:'120+ qualified leads per month', before:'0 online leads', after:'120+ leads/month' },
  { id:4, client:'HealthFirst Clinic', industry:'Healthcare', challenge:'Negative reviews damaging reputation', solution:'ORM + review generation strategy', result:'Star rating improved from 3.1 to 4.7', before:'3.1★ rating', after:'4.7★ rating' },
  { id:5, client:'EduLearn Platform', industry:'Education', challenge:'Low app downloads and course enrollment', solution:'Social media marketing + influencer campaigns', result:'5X increase in monthly enrollments', before:'200 enrollments/mo', after:'1,000+ enrollments/mo' },
  { id:6, client:'FoodieHub Restaurant Chain', industry:'Food & Beverage', challenge:'No social presence and declining footfall', solution:'Instagram marketing + local SEO', result:'40% increase in restaurant footfall', before:'800 monthly footfall', after:'1,120 monthly footfall' },
  { id:7, client:'AutoMax Dealership', industry:'Automobile', challenge:'High cost per lead on paid ads', solution:'Google Ads restructure + landing pages', result:'CPL reduced by 65%', before:'₹4,500 CPL', after:'₹1,575 CPL' },
  { id:8, client:'FinGrow Wealth Mgmt', industry:'Finance', challenge:'No thought leadership content', solution:'Content marketing + LinkedIn strategy', result:'800% LinkedIn engagement growth', before:'200 impressions/post', after:'1,800+ impressions/post' },
]

const industries = ['All', 'Technology', 'Fashion', 'Real Estate', 'Healthcare', 'Education', 'Food & Beverage', 'Automobile', 'Finance']

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? caseStudies : caseStudies.filter(c => c.industry === active)

  return (
    <div>
      <PageHero
        label="Our Work"
        title="Results That Speak for Themselves"
        subtitle="Real clients. Real results. Explore our case studies across 50+ industries."
      />

      {/* Stats */}
      <section className="bg-[#111111] border-b border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[['500+','Projects Delivered'],['50+','Industries Served'],['98%','Client Retention'],['5X','Average ROI']].map(([v,l],i) => (
              <div key={i} className="text-center px-6 py-8 border-r border-[#2E2E2E] last:border-r-0">
                <div className="text-3xl font-black text-white mb-1">{v}</div>
                <div className="text-[#777777] text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setActive(ind)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active === ind
                    ? 'bg-[#111111] text-white'
                    : 'bg-white border border-gray-200 text-[#777777] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(cs => (
              <div key={cs.id} className="bg-white border border-gray-200 overflow-hidden">
                <div className="bg-[#111111] px-8 py-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-black text-lg">{cs.client}</h3>
                    <span className="text-[#777777] text-xs uppercase tracking-widest">{cs.industry}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#F4F4F4] p-4">
                      <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Before</div>
                      <div className="text-[#111111] font-bold text-sm">{cs.before}</div>
                    </div>
                    <div className="bg-[#111111] p-4">
                      <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">After</div>
                      <div className="text-white font-bold text-sm">{cs.after}</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-[#777777] uppercase text-xs tracking-widest">Challenge: </span>
                      <span className="text-[#4A4A4A]">{cs.challenge}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] uppercase text-xs tracking-widest">Solution: </span>
                      <span className="text-[#4A4A4A]">{cs.solution}</span>
                    </div>
                    <div className="bg-[#F4F4F4] p-3 mt-3">
                      <span className="text-[#111111] font-black text-sm">Result: {cs.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] py-16 border-t border-[#2E2E2E]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Want Results Like These?</h2>
          <p className="text-[#AAAAAA] mb-8">Get a free digital audit and see how we can transform your business.</p>
          <Link to="/contact" className="btn-primary">
            Get Your Free Audit <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  )
}
