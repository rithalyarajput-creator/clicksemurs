import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { FaTrophy, FaLightbulb, FaHandshake, FaChartLine, FaHeart, FaGlobe, FaArrowRight } from 'react-icons/fa'

const values = [
  { icon: FaTrophy, title: 'Excellence', desc: 'We hold ourselves to the highest standards in every project, campaign, and deliverable. Good enough is never enough.' },
  { icon: FaLightbulb, title: 'Innovation', desc: 'We stay ahead of digital trends, constantly exploring new platforms, tools, and strategies to keep clients at the forefront.' },
  { icon: FaHandshake, title: 'Integrity', desc: 'We operate with complete honesty. Clients always know what we\'re doing, why, and what results it\'s producing.' },
  { icon: FaChartLine, title: 'Results-First', desc: 'Every strategy and creative piece is designed with one goal — delivering measurable, meaningful results.' },
  { icon: FaHeart, title: 'Client Partnership', desc: 'We don\'t see ourselves as a vendor. We are your growth partner. Your success is our success.' },
  { icon: FaGlobe, title: 'Diversity & Inclusion', desc: 'We celebrate diversity in our team and clients. Different perspectives make us stronger and more creative.' },
]

const team = [
  { name: 'Aryan Mehta', role: 'Founder & CEO', exp: '12+ years in digital marketing' },
  { name: 'Sneha Joshi', role: 'Creative Director', exp: 'Brand & visual storytelling' },
  { name: 'Ravi Kumar', role: 'Head of SEO & Content', exp: 'Technical SEO expert' },
  { name: 'Pooja Singh', role: 'Performance Marketing Lead', exp: 'Google & Meta Ads specialist' },
]

export default function About() {
  return (
    <div>
      <PageHero
        label="Who We Are"
        title="Built for Brands That Mean Business."
        subtitle="We are a full-service 360° Digital Marketing Agency combining cutting-edge technology, creative excellence, and data-driven intelligence."
      />

      {/* Our Story */}
      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label text-[#777777]">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#111111] mb-6">
                Where Strategy Meets Creativity
              </h2>
              <div className="space-y-4 text-[#4A4A4A] leading-relaxed">
                <p>
                  Welcome to Clicksemurs — where strategy meets creativity and data drives every decision. We are a full-service 360° Digital Marketing Agency built for brands that are serious about growing in the digital world.
                </p>
                <p>
                  At Clicksemurs, we do not just run campaigns — we build digital ecosystems. From the moment a potential customer first hears about your brand to the point they become a loyal advocate, we are with you at every step.
                </p>
                <p>
                  Founded with a mission to make powerful digital marketing accessible to every business — whether you are a bold startup, a growing SME, or an established enterprise — we bring together cutting-edge technology, creative excellence, and data-driven intelligence to deliver measurable growth.
                </p>
              </div>
              <Link to="/contact" className="btn-dark mt-8 inline-flex">
                Start Your Journey <FaArrowRight size={12} />
              </Link>
            </div>
            <div className="bg-[#111111] h-80 lg:h-96 flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <div className="text-white font-black text-3xl tracking-widest uppercase">CLICK⚡SEMURS</div>
                <div className="text-[#777777] text-xs tracking-[0.3em] uppercase mt-2">360° Digital Marketing Agency</div>
                <div className="grid grid-cols-2 gap-4 mt-8 text-center">
                  {[['500+','Projects'],['50+','Industries'],['98%','Retention'],['5X','ROI']].map(([v,l]) => (
                    <div key={l}>
                      <div className="text-white font-black text-2xl">{v}</div>
                      <div className="text-[#777777] text-xs">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="section-label">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E1E1E] border border-[#2E2E2E] p-10">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-white font-black text-xl mb-4">Our Vision</h3>
              <p className="text-[#AAAAAA] leading-relaxed">
                To be the most trusted and results-driven digital marketing partner for businesses across every industry — helping brands not just compete, but lead in the digital age.
              </p>
            </div>
            <div className="bg-[#1E1E1E] border border-[#2E2E2E] p-10">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-white font-black text-xl mb-4">Our Mission</h3>
              <p className="text-[#AAAAAA] leading-relaxed">
                To deliver 360° digital marketing solutions that drive real, measurable business growth — combining creativity, technology, and strategy to turn clicks into customers and brands into market leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="section-label text-[#777777]">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#111111]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="bg-white border border-gray-200 p-8">
                  <div className="w-10 h-10 bg-[#111111] flex items-center justify-center mb-5">
                    <Icon size={16} color="white" />
                  </div>
                  <h3 className="text-[#111111] font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-[#777777] text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="section-label">The People</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">The People Behind Your Growth</h2>
            <p className="text-[#777777] mt-3 max-w-xl">A diverse, passionate team of digital experts bringing together marketing, technology, design, and strategy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-[#1E1E1E] border border-[#2E2E2E] p-8 text-center">
                <div className="w-20 h-20 bg-[#2E2E2E] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[#777777] text-2xl font-black">{member.name[0]}</span>
                </div>
                <h3 className="text-white font-bold mb-1">{member.name}</h3>
                <p className="text-[#AAAAAA] text-sm mb-2">{member.role}</p>
                <p className="text-[#777777] text-xs">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F4F4F4] py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-[#111111] mb-4">Ready to Work Together?</h2>
          <p className="text-[#777777] mb-8">Let's build something remarkable. Get your free audit today.</p>
          <Link to="/contact" className="btn-dark">
            Get Your Free Audit <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  )
}
