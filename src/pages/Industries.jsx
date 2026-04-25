import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaShoppingCart, FaBuilding, FaHeartbeat, FaGraduationCap, FaPlane, FaDollarSign, FaLaptop, FaTshirt, FaCar, FaUtensils, FaIndustry, FaHandHoldingHeart } from 'react-icons/fa'

const industries = [
  { icon: FaShoppingCart, name: 'E-Commerce & Retail', desc: 'Drive product discovery, increase conversions, and reduce cart abandonment with data-driven digital strategies.' },
  { icon: FaBuilding, name: 'Real Estate & Property', desc: 'Generate qualified property leads through targeted digital campaigns and high-converting landing pages.' },
  { icon: FaHeartbeat, name: 'Healthcare & Wellness', desc: 'Build patient trust and grow your practice with compliant, effective digital marketing strategies.' },
  { icon: FaGraduationCap, name: 'Education & E-Learning', desc: 'Increase enrollments, boost course visibility, and build an engaged learning community online.' },
  { icon: FaPlane, name: 'Hospitality & Travel', desc: 'Fill bookings and drive direct reservations with compelling campaigns and social proof strategies.' },
  { icon: FaDollarSign, name: 'Finance & FinTech', desc: 'Build credibility and acquire qualified financial clients through trusted, compliance-aware marketing.' },
  { icon: FaLaptop, name: 'Technology & SaaS', desc: 'Accelerate user acquisition, reduce churn, and build product authority in competitive tech markets.' },
  { icon: FaTshirt, name: 'Fashion & Lifestyle', desc: 'Build aspirational brand presence and drive sales with scroll-stopping visual content and influencer campaigns.' },
  { icon: FaCar, name: 'Automobile & Auto', desc: 'Generate high-quality leads for dealerships and service centres with hyper-local digital campaigns.' },
  { icon: FaUtensils, name: 'Food & Beverage', desc: 'Drive footfall, increase delivery orders, and build loyal brand communities with vibrant social strategies.' },
  { icon: FaIndustry, name: 'Manufacturing & B2B', desc: 'Generate qualified B2B leads and build thought leadership through LinkedIn and content marketing.' },
  { icon: FaHandHoldingHeart, name: 'Non-Profit & NGOs', desc: 'Amplify your cause, increase donations, and grow volunteer engagement with purpose-driven campaigns.' },
]

export default function Industries() {
  return (
    <div>
      <PageHero
        label="Industries We Serve"
        title="50+ Industries. One Agency."
        subtitle="We bring cross-industry insights and proven strategies to every client — whatever your sector, we've delivered results in it."
      />

      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon
              return (
                <div key={i} className="bg-white border border-gray-200 p-8 group hover:border-[#111111] transition-all duration-200">
                  <div className="w-12 h-12 bg-[#111111] flex items-center justify-center mb-5">
                    <Icon size={20} color="white" />
                  </div>
                  <h3 className="text-[#111111] font-black text-lg mb-3">{ind.name}</h3>
                  <p className="text-[#777777] text-sm leading-relaxed">{ind.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-16 border-t border-[#2E2E2E]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Don't See Your Industry?</h2>
          <p className="text-[#AAAAAA] mb-8">We work with businesses across all sectors. Get in touch and let's talk about your specific needs.</p>
          <Link to="/contact" className="btn-primary">
            Talk to Us <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  )
}
