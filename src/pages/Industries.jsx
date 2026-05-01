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

      <section style={{ background: '#fefaef', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon
              return (
                <div key={i} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: 32, transition: 'border-color 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ width: 48, height: 48, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={20} color="white" />
                  </div>
                  <h3 style={{ color: '#1a1a1a', fontWeight: 900, fontSize: 17, marginBottom: 12 }}>{ind.name}</h3>
                  <p style={{ color: '#777', fontSize: 14, lineHeight: 1.7 }}>{ind.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ background: '#1a1a1a', padding: '64px 0', borderTop: '1px solid #2E2E2E' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 style={{ color: '#fefaef', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16 }}>Don't See Your Industry?</h2>
          <p style={{ color: '#aaaaaa', marginBottom: 32 }}>We work with businesses across all sectors. Get in touch and let's talk about your specific needs.</p>
          <Link to="/contact" className="btn-primary">
            Talk to Us <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  )
}
