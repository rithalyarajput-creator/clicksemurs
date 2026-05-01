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

      <section style={{ background: '#fefaef', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <div key={i} style={{
                position: 'relative',
                background: plan.highlight ? '#1a1a1a' : '#fff',
                border: plan.highlight ? '2px solid rgba(200,137,42,0.4)' : '1px solid rgba(0,0,0,0.1)',
                boxShadow: plan.highlight ? '0 16px 48px rgba(0,0,0,0.15)' : 'none',
              }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
                    <span style={{ background: '#c8892a', color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div style={{ padding: 32, borderBottom: `1px solid ${plan.highlight ? '#2E2E2E' : 'rgba(0,0,0,0.08)'}` }}>
                  <h3 style={{ fontWeight: 900, fontSize: 24, marginBottom: 4, color: plan.highlight ? '#fefaef' : '#1a1a1a' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: 14, marginBottom: 24, color: '#777' }}>
                    {plan.tagline}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{ fontWeight: 900, fontSize: 36, color: plan.highlight ? '#fefaef' : '#1a1a1a' }}>
                      {plan.price}
                    </span>
                    <span style={{ fontSize: 14, paddingBottom: 4, color: '#777' }}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <div style={{ padding: 32 }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {f.included
                          ? <FaCheckCircle size={14} color={plan.highlight ? '#c8892a' : '#1a1a1a'} style={{ flexShrink: 0 }} />
                          : <FaTimes size={14} color="#555" style={{ flexShrink: 0 }} />
                        }
                        <span style={{
                          fontSize: 14,
                          color: f.included ? (plan.highlight ? '#aaaaaa' : '#4a4a4a') : '#777',
                          textDecoration: f.included ? 'none' : 'line-through',
                        }}>
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
          <div style={{ background: '#1a1a1a', padding: 40, marginTop: 48, textAlign: 'center', border: '1px solid #2E2E2E' }}>
            <h3 style={{ color: '#fefaef', fontWeight: 900, fontSize: 24, marginBottom: 12 }}>Need a Custom Package?</h3>
            <p style={{ color: '#aaaaaa', fontSize: 14, marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
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
