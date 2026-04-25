export default function PageHero({ label, title, subtitle, center = false }) {
  return (
    <section className="bg-[#0A0A0A] pt-32 pb-20 border-b border-[#2E2E2E]">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${center ? 'text-center' : ''}`}>
        {label && <span className="section-label">{label}</span>}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#AAAAAA] text-lg md:text-xl max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
