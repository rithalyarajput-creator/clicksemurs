import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaArrowRight, FaTimes } from 'react-icons/fa'

const plans = [
  {
    name: 'Starter',
    tagline: 'For growing startups & SMEs',
    price: '₹25,000',
    period: '/month',
    highlight: false,
    features: [
      { text: 'Social Media Management (2 platforms)', included: true },
      { text: 'Basic SEO Optimization', included: true },
      { text: '8 Social Media Posts/Month', included: true },
      { text: 'Monthly Performance Report', included: true },
      { text: 'Google My Business Optimization', included: true },
      { text: 'Email Support', included: true },
      { text: 'Paid Ads Management', included: false },
      { text: 'Content Marketing', included: false },
      { text: 'Video Production', included: false },
      { text: 'Dedicated Account Manager', included: false },
    ],
  },
  {
    name: 'Growth',
    tagline: 'For scaling businesses',
    price: '₹55,000',
    period: '/month',
    highlight: true,
    badge: 'Most Popular',
    features: [
      { text: 'Social Media Management (4 platforms)', included: true },
      { text: 'Advanced SEO + Content Strategy', included: true },
      { text: '20 Social Media Posts/Month', included: true },
      { text: 'Weekly Performance Reports', included: true },
      { text: 'Google Ads + Meta Ads Management', included: true },
      { text: 'Email Marketing (2 campaigns/month)', included: true },
      { text: 'Blog Writing (4 articles/month)', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Video Production', included: false },
      { text: 'ORM (Reputation Management)', included: false },
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For market-leading brands',
    price: 'Custom',
    period: 'Tailored pricing',
    highlight: false,
    features: [
      { text: 'All platforms — full management', included: true },
      { text: 'Full 360° SEO + Technical Audit', included: true },
      { text: 'Unlimited Social Media Content', included: true },
      { text: 'Real-time Reporting Dashboard', included: true },
      { text: 'Full PPC Management (all platforms)', included: true },
      { text: 'Email Marketing Automation', included: true },
      { text: 'Blog + Long-form Content Writing', included: true },
      { text: 'Video Production & YouTube Mgmt', included: true },
      { text: 'ORM — Online Reputation Management', included: true },
      { text: 'Senior Strategy Team + Priority Support', included: true },
    ],
  },
]

export default function Pricing() {
  return (
    <div>
      <PageHero
        label="Transparent Pricing"
        title="Simple, Honest Pricing"
        subtitle="No hidden fees. No surprises. Choose a plan that fits your growth goals."
        center
      />

      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative ${
                  plan.highlight
                    ? 'bg-[#111111] border-2 border-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-[#111111] text-xs font-black px-4 py-1 uppercase tracking-widest">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className={`p-8 border-b ${plan.highlight ? 'border-[#2E2E2E]' : 'border-gray-200'}`}>
                  <h3 className={`font-black text-2xl mb-1 ${plan.highlight ? 'text-white' : 'text-[#111111]'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${plan.highlight ? 'text-[#777777]' : 'text-[#777777]'}`}>
                    {plan.tagline}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className={`font-black text-4xl ${plan.highlight ? 'text-white' : 'text-[#111111]'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm pb-1 ${plan.highlight ? 'text-[#777777]' : 'text-[#777777]'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        {f.included
                          ? <FaCheckCircle size={14} color={plan.highlight ? 'white' : '#111111'} className="flex-shrink-0" />
                          : <FaTimes size={14} color="#555555" className="flex-shrink-0" />
                        }
                        <span className={`text-sm ${
                          f.included
                            ? plan.highlight ? 'text-[#AAAAAA]' : 'text-[#4A4A4A]'
                            : 'text-[#777777] line-through'
                        }`}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={plan.highlight ? 'btn-primary w-full justify-center' : 'btn-dark w-full justify-center'}
                  >
                    {plan.name === 'Enterprise' ? 'Get Custom Quote' : 'Get Started'} <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Quote */}
          <div className="bg-[#111111] p-10 mt-12 text-center border border-[#2E2E2E]">
            <h3 className="text-white font-black text-2xl mb-3">Need a Custom Package?</h3>
            <p className="text-[#AAAAAA] text-sm mb-6 max-w-xl mx-auto">
              Every business is different. We'll build a tailored package around your specific goals, budget, and timeline.
            </p>
            <Link to="/contact" className="btn-primary">
              Request Custom Quote <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
