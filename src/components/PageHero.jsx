export default function PageHero({ label, title, subtitle, center = false }) {
  return (
    <section style={{ background: '#1a1a1a', paddingTop: 176, paddingBottom: 72, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ textAlign: center ? 'center' : 'left' }}>
        {label && (
          <span style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c8892a', marginBottom: 14 }}>
            {label}
          </span>
        )}
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#fefaef', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 16 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#aaaaaa', fontSize: 'clamp(15px, 2vw, 18px)', maxWidth: 600, lineHeight: 1.7 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
