import { useState } from 'react'
import PageHero from '../components/PageHero'
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'

const serviceOptions = [
  'Social Media Marketing',
  'SEO (Search Engine Optimization)',
  'PPC / Paid Ads',
  'Website Design & Development',
  'Content Marketing',
  'Video Marketing & Production',
  'Email Marketing & Automation',
  'Online Reputation Management',
  'Influencer Marketing',
  'Analytics & Performance Marketing',
  'Full 360° Package',
  'Not Sure — Need Consultation',
]

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', message:'' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name:'', email:'', phone:'', service:'', message:'' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHero
        label="Let's Connect"
        title="Get in Touch with Our Team"
        subtitle="Ready to grow your brand? Let's talk. Get your free digital marketing audit today."
      />

      <section className="bg-[#F4F4F4] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 p-10">
                <h2 className="text-[#111111] font-black text-2xl mb-2">Send Us a Message</h2>
                <p className="text-[#777777] text-sm mb-8">We'll get back to you within 24 hours.</p>

                {status === 'success' && (
                  <div className="bg-[#111111] text-white p-5 mb-6">
                    <p className="font-semibold">Thank you! We've received your message and will be in touch shortly.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-5 mb-6">
                    <p>Something went wrong. Please try again or email us directly at hello@clicksemurs.com</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#111111] text-xs font-semibold uppercase tracking-widest block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full border border-gray-200 px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#111111] transition-colors placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-[#111111] text-xs font-semibold uppercase tracking-widest block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#111111] transition-colors placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#111111] text-xs font-semibold uppercase tracking-widest block mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-gray-200 px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#111111] transition-colors placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-[#111111] text-xs font-semibold uppercase tracking-widest block mb-2">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full border border-gray-200 px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#111111] transition-colors bg-white"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[#111111] text-xs font-semibold uppercase tracking-widest block mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your business and goals..."
                      className="w-full border border-gray-200 px-4 py-3 text-sm text-[#111111] outline-none focus:border-[#111111] transition-colors resize-none placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-dark w-full justify-center disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send Message'} <FaArrowRight size={12} />
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-[#111111] p-8">
                <h3 className="text-white font-black text-xl mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-[#2E2E2E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaEnvelope size={12} color="white" />
                    </div>
                    <div>
                      <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Email</div>
                      <a href="mailto:hello@clicksemurs.com" className="text-white text-sm hover:text-gray-300 transition-colors">
                        hello@clicksemurs.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-[#2E2E2E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaPhone size={12} color="white" />
                    </div>
                    <div>
                      <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Phone</div>
                      <a href="tel:+91XXXXXXXXXX" className="text-white text-sm hover:text-gray-300 transition-colors">
                        +91 XXXXX XXXXX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-[#2E2E2E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaMapMarkerAlt size={12} color="white" />
                    </div>
                    <div>
                      <div className="text-[#777777] text-xs uppercase tracking-widest mb-1">Address</div>
                      <p className="text-white text-sm">India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] p-6 hover:bg-[#1ebe5a] transition-colors"
              >
                <FaWhatsapp size={28} color="white" />
                <div>
                  <div className="text-white font-black">Chat on WhatsApp</div>
                  <div className="text-green-100 text-xs">Quick response guaranteed</div>
                </div>
              </a>

              {/* Map placeholder */}
              <div className="bg-[#1E1E1E] border border-[#2E2E2E] h-48 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt size={32} color="#777777" className="mx-auto mb-2" />
                  <p className="text-[#777777] text-sm">Google Maps embed</p>
                  <p className="text-[#555] text-xs">Configure in production</p>
                </div>
              </div>

              {/* Free Audit CTA */}
              <div className="bg-[#F4F4F4] border border-gray-200 p-6 text-center">
                <h4 className="text-[#111111] font-black mb-2">Free Digital Audit</h4>
                <p className="text-[#777777] text-xs mb-4">Get a comprehensive analysis of your current digital presence — free, no commitment.</p>
                <span className="text-[#111111] text-sm font-bold">Already included when you submit the form →</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
