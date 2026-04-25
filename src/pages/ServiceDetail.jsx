import { useParams, Link } from 'react-router-dom'
import { services } from '../data/services'
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function ServiceDetail() {
  const { slug } = useParams()
  const svc = services.find(s => s.slug === slug)

  if (!svc) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-white text-4xl font-black mb-4">Service Not Found</h1>
          <Link to="/services" className="btn-primary">Back to Services</Link>
        </div>
      </div>
    )
  }

  const Icon = svc.icon

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0A0A0A] pt-32 pb-20 border-b border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-[#777777] text-sm hover:text-white transition-colors mb-8">
            <FaArrowLeft size={12} /> Back to Services
          </Link>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-white flex items-center justify-center flex-shrink-0">
              <Icon size={28} color="#111111" />
            </div>
            <div>
              <span className="section-label">Service {String(svc.id).padStart(2,'0')}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                {svc.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <span className="section-label text-[#777777]">Overview</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#111111] mb-6">
                What is {svc.title}?
              </h2>
              <p className="text-[#4A4A4A] leading-relaxed text-lg">{svc.description}</p>
            </div>
            <div className="bg-[#111111] p-8 h-fit">
              <h3 className="text-white font-black mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="border-b border-[#2E2E2E] pb-3">
                  <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Service</div>
                  <div className="text-white text-sm font-medium">{svc.title}</div>
                </div>
                <div className="border-b border-[#2E2E2E] pb-3">
                  <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Coverage</div>
                  <div className="text-white text-sm font-medium">360° Full Service</div>
                </div>
                <div>
                  <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Reporting</div>
                  <div className="text-white text-sm font-medium">Monthly + Real-time</div>
                </div>
                <Link to="/contact" className="btn-primary mt-6 w-full justify-center">
                  Get a Free Quote <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label">Our Deliverables</span>
              <h2 className="text-3xl font-black text-white mb-8">What We Offer</h2>
              <div className="space-y-4">
                {svc.offerings.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <FaCheckCircle size={16} color="white" className="mt-0.5 flex-shrink-0" />
                    <span className="text-[#AAAAAA] text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="section-label">Our Advantage</span>
              <h2 className="text-3xl font-black text-white mb-6">Why Choose Clicksemurs?</h2>
              <p className="text-[#AAAAAA] leading-relaxed mb-8">{svc.whyUs}</p>
              <div className="grid grid-cols-2 gap-4">
                {[['500+','Projects Delivered'],['98%','Client Retention'],['50+','Industries'],['5X','Average ROI']].map(([v,l]) => (
                  <div key={l} className="bg-[#1E1E1E] border border-[#2E2E2E] p-5 text-center">
                    <div className="text-white font-black text-2xl">{v}</div>
                    <div className="text-[#777777] text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F4F4F4] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-[#111111] mb-4">
            Ready to Get Started with {svc.title}?
          </h2>
          <p className="text-[#777777] mb-8">Get a custom quote tailored to your business goals and budget.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-dark">
              Get a Free Quote <FaArrowRight size={12} />
            </Link>
            <Link to="/services" className="btn-dark">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="bg-[#111111] py-16 border-t border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-white font-black text-xl mb-8">Other Services You Might Need</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.filter(s => s.id !== svc.id).slice(0, 4).map(s => {
              const SI = s.icon
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className="bg-[#1E1E1E] border border-[#2E2E2E] p-5 hover:border-[#555] transition-all duration-200 flex items-center gap-3"
                >
                  <SI size={14} color="white" />
                  <span className="text-white text-sm font-medium">{s.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
