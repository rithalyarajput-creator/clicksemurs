import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { services } from '../data/services'
import { FaArrowRight } from 'react-icons/fa'

export default function Services() {
  return (
    <div>
      <PageHero
        label="What We Do"
        title="Full 360° Digital Marketing Services"
        subtitle="Every digital marketing service your brand needs — under one roof. From SEO to video, from ads to analytics."
      />

      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(svc => {
              const Icon = svc.icon
              return (
                <div key={svc.id} className="bg-white border border-gray-200 p-8 flex flex-col group hover:border-[#111111] transition-all duration-200">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 bg-[#111111] flex items-center justify-center">
                      <Icon size={20} color="white" />
                    </div>
                    <span className="text-[#E5E5E5] font-black text-3xl">
                      {String(svc.id).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-[#111111] font-black text-xl mb-3">{svc.title}</h3>
                  <p className="text-[#777777] text-sm leading-relaxed flex-1 mb-6">{svc.short}</p>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="flex items-center gap-2 text-[#111111] text-sm font-semibold group-hover:gap-3 transition-all duration-200"
                  >
                    Learn More <FaArrowRight size={10} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#111111] py-16 border-t border-[#2E2E2E]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-[#AAAAAA] mb-8">Get a free digital audit and our experts will recommend the right strategy for your business.</p>
          <Link to="/contact" className="btn-primary">
            Get Free Consultation <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  )
}
