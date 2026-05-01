import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../admin/supabase'
import { useInView } from '../hooks/useScrollAnimation'

/* ── data ── */
const STATIC_TESTIMONIALS = [
  { id: 1, initials: 'RS', name: 'Rahul Sharma', handle: '@rahulsharma_biz', color: '#c8892a', rating: 5,
    quote: 'Clicksemurs transformed our digital presence completely. Our organic traffic tripled in just 4 months. They\'re not just an agency — they\'re a growth partner!' },
  { id: 2, initials: 'PM', name: 'Priya Mehta', handle: '@priyastyle_official', color: '#4a9e85', rating: 5,
    quote: 'Best agency we\'ve ever worked with. Our ROI improved 4x within 6 months. The team is incredibly responsive and results-focused!' },
  { id: 3, initials: 'AK', name: 'Amit Khanna', handle: '@amitk_ventures', color: '#d4603a', rating: 5,
    quote: '120+ qualified leads per month — something we never imagined possible. The paid ads strategy completely changed our business!' },
  { id: 4, initials: 'NJ', name: 'Neha Joshi', handle: '@neha.builds', color: '#7C3AED', rating: 5,
    quote: 'Our Instagram went from 2K to 50K real followers in just 3 months. The content strategy and execution was flawless!' },
]

/* ── Brand SVG icons ── */
const BRAND_ICONS = {
  facebook: { bg: '#1877F2', svg: <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.883v2.258h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg> },
  instagram: { bg: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', svg: <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  whatsapp: { bg: '#25D366', svg: <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  google: { bg: '#fff', svg: <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
  youtube: { bg: '#FF0000', svg: <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
  linkedin: { bg: '#0A66C2', svg: <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  wordpress: { bg: '#21759B', svg: <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM1.139 12c0-1.696.37-3.308 1.028-4.758l5.657 15.495A10.868 10.868 0 011.14 12zm10.861 10.861a10.86 10.86 0 01-3.083-.445l3.274-9.508 3.353 9.185c.022.053.048.102.075.149a10.86 10.86 0 01-3.62.619zm1.502-16.089c.657-.034 1.249-.102 1.249-.102.588-.07.519-.934-.07-.9 0 0-1.767.139-2.907.139-1.072 0-2.874-.137-2.874-.137-.589-.034-.659.864-.07.898 0 0 .559.068 1.15.101l1.708 4.678-2.4 7.197-3.994-11.875c.656-.034 1.248-.102 1.248-.102.588-.07.519-.934-.07-.9 0 0-1.766.139-2.906.139-.205 0-.446-.005-.702-.014C4.856 2.674 8.24 1.139 12 1.139c2.815 0 5.381 1.074 7.302 2.832-.047-.003-.092-.008-.141-.008-1.072 0-1.833.934-1.833 1.935 0 .899.519 1.659 1.072 2.56.416.727.902 1.659.902 3.004 0 .934-.357 2.018-.831 3.526l-1.089 3.641-3.981-11.836zM19.5 19.035l3.337-9.645c.624-1.559.831-2.805.831-3.913 0-.402-.027-.774-.074-1.126A10.864 10.864 0 0122.861 12c0 2.674-.962 5.124-2.547 7.015l-.814.02z"/></svg> },
  /* Shopify — green shopping bag with S */
  shopify: { bg: '#5E8E3E', svg: (
    <svg viewBox="0 0 64 72" width="18" height="20" fill="white">
      {/* bag handles */}
      <path d="M42 18 C42 10 37 5 30 5 C23 5 18 10 18 18" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* bag body */}
      <rect x="10" y="18" width="44" height="46" rx="4" fill="white" fillOpacity="0.25"/>
      <rect x="10" y="18" width="44" height="46" rx="4" fill="none" stroke="white" strokeWidth="3"/>
      {/* S letter */}
      <text x="22" y="52" fontFamily="Georgia, serif" fontWeight="900" fontSize="30" fill="white">S</text>
    </svg>
  )},
  /* Wix — bold black WiX text with orange dot on i */
  wix: { bg: '#000', svg: (
    <svg viewBox="0 0 80 28" width="28" height="10">
      <text x="1" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="white" letterSpacing="-1">W</text>
      <text x="30" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="white">i</text>
      <circle cx="36" cy="5" r="3.5" fill="#F5A623"/>
      <text x="42" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="white">X</text>
    </svg>
  )},
  googleads: { bg: '#4285F4', svg: <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M2.084 17.5c1.155 2 3.303 3.25 5.498 3.25 1.043 0 2.087-.271 3.024-.812l7.5-4.33a6.123 6.123 0 002.25-8.374l-4.5 7.794a3.02 3.02 0 01-4.123 1.106l-3.897-2.25a3.02 3.02 0 01-1.106-4.124L8.25 3.04a6.126 6.126 0 00-6.166 8.46l4.5-7.793A3.02 3.02 0 0110.707 2.6l3.896 2.25a3.02 3.02 0 011.106 4.123L9.21 17.267a3.02 3.02 0 01-4.124 1.107L2.084 17.5z"/></svg> },
  canva: { bg: '#00C4CC', svg: <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c2.783 0 5.302 1.124 7.138 2.945L17.56 6.924A7.202 7.202 0 0012 4.8a7.2 7.2 0 00-7.2 7.2 7.2 7.2 0 007.2 7.2 7.202 7.202 0 005.56-2.124l1.578 1.579A9.562 9.562 0 0112 21.6C6.698 21.6 2.4 17.302 2.4 12S6.698 2.4 12 2.4zm2.16 5.76a3.84 3.84 0 013.84 3.84 3.84 3.84 0 01-3.84 3.84c-.825 0-1.587-.26-2.21-.7-.263 1.748-1.78 3.1-3.61 3.1A3.55 3.55 0 014.8 14.69a3.55 3.55 0 013.55-3.55c.447 0 .874.083 1.268.232A3.84 3.84 0 0114.16 8.16zm0 1.44a2.4 2.4 0 00-2.4 2.4 2.4 2.4 0 002.4 2.4 2.4 2.4 0 002.4-2.4 2.4 2.4 0 00-2.4-2.4zM8.35 12.58a2.11 2.11 0 00-2.11 2.11 2.11 2.11 0 002.11 2.11 2.11 2.11 0 002.11-2.11 2.11 2.11 0 00-2.11-2.11z"/></svg> },
  /* Google Search Console — magnifier + bar chart in Google colors */
  gsc: { bg: '#fff', svg: (
    <svg viewBox="0 0 48 48" width="22" height="22">
      <rect x="26" y="6" width="14" height="30" rx="7" fill="#4285F4"/>
      <rect x="14" y="16" width="13" height="20" rx="6.5" fill="#34A853"/>
      <circle cx="11" cy="36" r="7" fill="#FBBC05"/>
      <circle cx="11" cy="36" r="4" fill="#EA4335"/>
      <line x1="16" y1="41" x2="22" y2="47" stroke="#FBBC05" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )},
  /* SEMrush — orange comet/swirl */
  semrush: { bg: '#FF642D', svg: (
    <svg viewBox="0 0 100 65" width="22" height="14" fill="white">
      <path d="M72 5 C88 5 100 17 100 33 C100 49 88 61 72 61 C60 61 50 54 45 44 L20 44 C26 58 48 73 72 65 C94 57 108 35 100 13 C93 -5 72 -5 58 5 L72 5 Z M55 25 L30 25 C34 15 20 10 10 18 L5 23 L25 23 L25 28 L5 28 L10 33 C20 41 34 36 30 26 L55 26 Z"/>
    </svg>
  )},
  /* Ahrefs — blue rounded square with "a" + orange bar */
  ahrefs: { bg: '#1553F0', svg: (
    <svg viewBox="0 0 36 36" width="20" height="20">
      <text x="3" y="26" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" fill="white">a</text>
      <rect x="26" y="10" width="7" height="20" rx="3" fill="#FF8C00"/>
    </svg>
  )},
  /* Google Ads — A shape: blue right leg + yellow left leg + green circle */
  googleads: { bg: '#fff', svg: (
    <svg viewBox="0 0 64 64" width="22" height="22">
      <rect x="30" y="6" width="14" height="38" rx="7" fill="#4285F4" transform="rotate(20 37 25)"/>
      <rect x="20" y="6" width="14" height="38" rx="7" fill="#FBBC04" transform="rotate(-20 27 25)"/>
      <circle cx="16" cy="47" r="9" fill="#34A853"/>
    </svg>
  )},
  /* Meta — infinity loop in gradient blue */
  meta: { bg: '#0082FB', svg: (
    <svg viewBox="0 0 60 30" width="24" height="12" fill="none">
      <path d="M7 15 C7 8 11 4 16 4 C21 4 24 8 30 15 C36 22 39 26 44 26 C49 26 53 22 53 15 C53 8 49 4 44 4 C39 4 36 8 30 15 C24 22 21 26 16 26 C11 26 7 22 7 15 Z" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"/>
    </svg>
  )},
  /* Microsoft — 4 colored squares */
  microsoft: { bg: '#fff', svg: (
    <svg viewBox="0 0 21 21" width="20" height="20">
      <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
      <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
    </svg>
  )},
}

const SERVICE_CARDS = [
  {
    title: 'Social Media Marketing',
    desc: 'Build an audience that converts. We manage all major platforms and turn followers into paying customers.',
    bg: '#f5e8d0', titleColor: '#1a1a1a', descColor: '#666',
    icons: ['facebook', 'instagram', 'whatsapp'],
    slug: 'social-media-marketing',
  },
  {
    title: 'Search Engine Optimization',
    desc: 'Rank higher, get found. We create content that generates sustainable, compounding traffic.',
    bg: '#e8f0f5', titleColor: '#1a1a1a', descColor: '#666',
    icons: ['gsc', 'semrush', 'ahrefs'],
    slug: 'search-engine-optimization',
  },
  {
    title: 'PPC / Paid Ads',
    desc: 'We run targeted ad campaigns that deliver maximum ROI with your targeted budget.',
    bg: '#f0ede8', titleColor: '#1a1a1a', descColor: '#666',
    icons: ['googleads', 'meta', 'microsoft'],
    slug: 'ppc-paid-ads',
  },
  {
    title: 'Website Design & Dev',
    desc: 'Your website is your best salesperson. Fast, beautiful platforms that convert visitors.',
    bg: '#edf5f0', titleColor: '#1a1a1a', descColor: '#666',
    icons: ['wordpress', 'shopify', 'wix'],
    slug: 'website-design-development',
  },
  {
    title: 'Content Marketing',
    desc: 'Content is the backbone of digital marketing. We create content that engages, grows, and converts.',
    bg: '#f5edf0', titleColor: '#1a1a1a', descColor: '#666',
    icons: ['instagram', 'youtube', 'linkedin'],
    slug: 'content-marketing',
  },
  {
    title: 'Video Marketing',
    desc: 'Video is the most powerful medium. We help brands tell their story through compelling visual content.',
    bg: '#ede8f5', titleColor: '#1a1a1a', descColor: '#666',
    icons: ['youtube', 'instagram', 'facebook'],
    slug: 'video-marketing',
  },
]

const WHY_US = [
  { n: '01', title: 'True 360° Coverage', desc: 'From strategy to execution, every channel covered under one roof.' },
  { n: '02', title: 'Multi-Industry Expertise', desc: 'We\'ve worked across 50+ industries — we understand your market.' },
  { n: '03', title: 'Data-Driven Always', desc: 'Every decision backed by real data, real analytics, real ROI.' },
  { n: '04', title: 'Custom Strategies', desc: 'No templates. Every plan is built specifically for your brand.' },
  { n: '05', title: 'Creative & Technical', desc: 'Design, copy, code — we do it all with the same team.' },
  { n: '06', title: 'Full Transparency', desc: 'Live dashboards, monthly reports, zero hidden fees.' },
  { n: '07', title: '500+ Proven Projects', desc: 'A track record that speaks louder than any promise.' },
]

const PLATFORMS = [
  { label: 'Instagram', dot: '#E1306C' },
  { label: 'Facebook', dot: '#1877F2' },
  { label: 'YouTube', dot: '#FF0000' },
  { label: 'LinkedIn', dot: '#0A66C2' },
  { label: 'Google Ads', dot: '#4285F4' },
  { label: 'WordPress', dot: '#21759B' },
  { label: 'Shopify', dot: '#96BF48' },
  { label: 'Mailchimp', dot: '#FFE01B' },
  { label: 'Canva', dot: '#00C4CC' },
  { label: 'Analytics', dot: '#E37400' },
  { label: 'SEMrush', dot: '#FF642D' },
  { label: 'WhatsApp', dot: '#25D366' },
]

/* ── count-up ── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const num = parseInt(target.replace(/\D/g, ''))
    if (!num) return
    const step = Math.ceil(num / (duration / 16))
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + step, num)
      setCount(cur)
      if (cur >= num) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [start, target, duration])
  return count + target.replace(/[0-9]/g, '')
}

function StatItem({ value, label }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const animated = useCountUp(value, 1800, vis)
  const num = animated.replace(/[^0-9]/g, '')
  const suffix = animated.replace(/[0-9]/g, '')
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 16px', borderRight: '1px solid rgba(0,0,0,0.08)' }} className="stat-item-last">
      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.4rem,5vw,3.2rem)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-2px', lineHeight: 1, marginBottom: 6 }}>
        {num}<span style={{ color: '#c8892a' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 13, color: '#888' }}>{label}</div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS)
  const [activeT, setActiveT] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [sent, setSent] = useState(false)
  const [pillHover, setPillHover] = useState(null)
  const [likes, setLikes] = useState([12453, 9821, 15302, 8764])
  const [liked, setLiked] = useState([false, false, false, false])
  const [heartPop, setHeartPop] = useState(false)
  const lastTap = useRef(0)

  const handleLike = (i) => {
    setLikes(prev => { const a=[...prev]; a[i]=a[i]+(liked[i]?-1:1); return a })
    setLiked(prev => { const a=[...prev]; a[i]=!a[i]; return a })
    if (!liked[i]) { setHeartPop(true); setTimeout(()=>setHeartPop(false), 700) }
  }
  const handleDoubleTap = () => {
    const now = Date.now()
    if (now - lastTap.current < 350) { handleLike(activeT) }
    lastTap.current = now
  }

  // scroll animation refs
  const [heroRef, heroInView] = useInView()
  const [marqueeRef, marqueeInView] = useInView()
  const [statsRef, statsInView] = useInView()
  const [servicesRef, servicesInView] = useInView()
  const [whyRef, whyInView] = useInView()
  const [platformsRef, platformsInView] = useInView()
  const [resultsRef, resultsInView] = useInView()
  const [testiRef, testiInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  useEffect(() => {
    supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const active = data.filter(t => t.is_active !== false)
          if (active.length > 0) {
            const mapped = active.slice(0, 4).map((t, i) => ({
              id: t.id, initials: (t.client_name || t.name || 'U')[0],
              name: t.client_name || t.name, handle: '@' + (t.client_name || 'client').toLowerCase().replace(/\s/g, ''),
              color: ['#c8892a','#4a9e85','#d4603a','#7C3AED'][i % 4], rating: t.rating || 5,
              quote: t.quote || t.review,
            }))
            setTestimonials(mapped)
          }
        }
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    await supabase.from('newsletter').insert([{ email }])
    setSent(true)
    setEmail(''); setName(''); setWebsite('')
  }

  const t = testimonials[activeT] || testimonials[0]

  return (
    <div style={{ overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .syne { font-family: 'Poppins', sans-serif !important; }
        .stat-item-last:last-child { border-right: none !important; }
        .service-card-wrap { transition: transform 0.25s; cursor: pointer; }
        .service-card-wrap:hover { transform: translateY(-5px); }
        .reason-item-wrap { transition: background 0.2s, opacity 0.5s, transform 0.5s; }
        .reason-item-wrap:hover { background: rgba(255,255,255,0.04) !important; }
        @keyframes cardFoldIn { from { opacity:0; transform: translateY(32px) scale(0.94); } to { opacity:1; transform: translateY(0) scale(1); } }
        .why-card { opacity: 0; }
        .why-card.visible { animation: cardFoldIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .result-card-wrap { transition: transform 0.2s; }
        .result-card-wrap:hover { transform: translateY(-4px); }
        .testi-card-wrap { transition: all 0.2s; cursor: pointer; }
        .testi-card-wrap:hover { border-color: #c8892a !important; background: rgba(200,137,42,0.04) !important; }
        .testi-card-wrap.active-t { border-color: #c8892a !important; background: rgba(200,137,42,0.04) !important; }
        .footer-link-item { transition: color 0.2s; color: rgba(255,255,255,0.35); text-decoration: none; font-size: 13px; display: block; margin-bottom: 10px; }
        .footer-link-item:hover { color: #fefaef; }
        .social-btn-item { transition: background 0.2s; }
        .social-btn-item:hover { background: #c8892a !important; }
        @keyframes marqueeScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-row { display:flex; gap:40px; animation:marqueeScroll 22s linear infinite; width:max-content; }
        @keyframes barGrow { from{height:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hero-fade > * { animation: fadeUp 0.6s ease forwards; opacity: 0; }
        .hero-fade > *:nth-child(1) { animation-delay: 0s; }
        .hero-fade > *:nth-child(2) { animation-delay: 0.1s; }
        .hero-fade > *:nth-child(3) { animation-delay: 0.2s; }
        .hero-fade > *:nth-child(4) { animation-delay: 0.3s; }
        .ig-review-anim { transition: opacity 0.3s, transform 0.3s; }
        @keyframes igSlideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heartBoom { 0%{transform:translate(-50%,-50%) scale(0);opacity:1} 50%{transform:translate(-50%,-50%) scale(1.4);opacity:1} 100%{transform:translate(-50%,-50%) scale(1.8);opacity:0} }
        .heart-pop { animation: heartBoom 0.65s ease forwards; }
        @keyframes likeBounce { 0%{transform:scale(1)} 30%{transform:scale(1.5)} 60%{transform:scale(0.9)} 100%{transform:scale(1)} }
        .like-bounce { animation: likeBounce 0.4s ease; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-mockup-col { display: none !important; }
          .services-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .reasons-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .results-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .testi-grid-2 { grid-template-columns: 1fr !important; }
          .testi-phone-col { display: none !important; }
          .cta-grid-2 { grid-template-columns: 1fr !important; }
          .footer-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .stats-grid-4 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .services-grid-3 { grid-template-columns: 1fr !important; }
          .reasons-grid-4 { grid-template-columns: 1fr !important; }
          .results-grid-3 { grid-template-columns: 1fr !important; }
          .footer-grid-4 { grid-template-columns: 1fr !important; }
          .stats-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .hero-section-pad { padding: 60px 20px 48px !important; }
          .section-pad { padding: 56px 20px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section ref={heroRef} className={`hero-section-pad reveal${heroInView ? ' in-view' : ''}`} style={{ background: '#fefaef', padding: '80px 48px 60px', position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,137,42,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,158,133,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

            {/* Left */}
            <div className={`hero-fade reveal-left${heroInView ? ' in-view' : ''}`}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f5e6c8', color: '#7a5a1e', fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 20, marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, background: '#c8892a', borderRadius: '50%', flexShrink: 0 }} />
                360° Digital Marketing Agency
              </div>
              <h1 className="syne" style={{ fontSize: 'clamp(42px,5vw,68px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', color: '#1a1a1a', marginBottom: 20 }}>
                We Don't Just<br />Market.<br /><em style={{ fontStyle: 'normal', color: '#c8892a' }}>We Dominate.</em>
              </h1>
              <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
                Full-service digital marketing for brands that mean business. From SEO and paid ads to website development and social media — we handle everything.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/contact')} style={{ background: '#1a1a1a', color: '#fefaef', padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'transform 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  Get Free Audit →
                </button>
                <button onClick={() => navigate('/portfolio')} style={{ background: 'transparent', color: '#1a1a1a', padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, border: '1.5px solid #1a1a1a', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fefaef' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1a1a' }}>
                  View Our Work
                </button>
              </div>
            </div>

            {/* Right — dashboard mockup */}
            <div className={`hero-mockup-col reveal-right${heroInView ? ' in-view' : ''}`} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 460, background: '#1a1a1a', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -16, right: -16, background: '#c8892a', color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, padding: '10px 16px', borderRadius: 12, whiteSpace: 'nowrap', zIndex: 2 }}>
                  🔥 +340% ROI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Campaign Dashboard</span>
                  <span style={{ background: 'rgba(200,137,42,0.2)', color: '#c8892a', fontSize: 11, padding: '3px 10px', borderRadius: 20 }}>● Live</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  {[
                    { label: 'Organic Traffic', val: '+84%', color: '#4ade80' },
                    { label: 'Ad Revenue', val: '₹4.2L', color: '#c8892a' },
                    { label: 'Leads This Month', val: '1,240', color: '#60a5fa' },
                    { label: 'Bounce Rate', val: '-22%', color: '#f87171' },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{s.label}</div>
                      <div className="syne" style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
                  {[60,80,45,90,70,55,95].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: 48, background: 'rgba(255,255,255,0.08)', borderRadius: 4, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: `${h}%`, background: '#c8892a', opacity: 0.75, borderRadius: 4, animation: `barGrow 1s ease ${i * 0.1}s forwards` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFER IMAGE MARQUEE ── */}
      <div ref={marqueeRef} className={`reveal${marqueeInView ? ' in-view' : ''}`} style={{ background: '#111', padding: '10px 0', overflow: 'hidden', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg,#111,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(270deg,#111,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div className="marquee-row" style={{ gap: 24 }}>
          {[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8].map((n, i) => (
            <img key={i} src={`/offer-imgs/${n}.png`} alt={`offer-${n}`}
              style={{ height: 90, width: 'auto', flexShrink: 0, objectFit: 'contain', borderRadius: 6 }} />
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div ref={statsRef} className={`reveal${statsInView ? ' in-view' : ''}`} style={{ background: '#fefaef', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div className="stats-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '50+', label: 'Industries Served' },
              { value: '98%', label: 'Client Retention' },
              { value: '5X', label: 'Average ROI' },
            ].map((s, i) => (
              <div key={s.label} className={`reveal delay-${i + 1}${statsInView ? ' in-view' : ''}`}>
                <StatItem value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section ref={servicesRef} className="section-pad" style={{ background: '#fefaef', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className={`reveal${servicesInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>What We Do</div>
            <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16, color: '#1a1a1a' }}>
              Full-Service Digital<br />Marketing
            </h2>
            <p style={{ fontSize: 15, color: '#777', lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Every service under one roof. No gaps, no juggling vendors. Just results.</p>
          </div>

          <div className="services-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {SERVICE_CARDS.map((card, i) => (
              <div key={i} className={`reveal-scale delay-${i + 1}${servicesInView ? ' in-view' : ''} service-card-wrap`}
                onClick={() => navigate('/services')}
                style={{ position: 'relative', borderRadius: 24, padding: '32px 28px 24px', background: card.bg, overflow: 'hidden', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>

                {/* floating brand icons — top right, 3D cube style */}
                <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 7 }}>
                  {card.icons.map((key, j) => {
                    const ic = BRAND_ICONS[key]
                    if (!ic) return null
                    return (
                      <div key={j} style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: ic.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 0 rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.12)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        transform: 'translateY(0)',
                        flexShrink: 0,
                      }}>
                        {ic.svg}
                      </div>
                    )
                  })}
                </div>

                {/* content */}
                <div style={{ paddingRight: 120 }}>
                  <div className="syne" style={{ fontSize: 19, fontWeight: 700, color: card.titleColor, marginBottom: 10, lineHeight: 1.25 }}>{card.title}</div>
                  <p style={{ fontSize: 13.5, color: card.descColor, lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
                </div>

                {/* arrow button — bottom right */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section ref={whyRef} className="section-pad" style={{ background: '#1a1a1a', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className={`reveal-left${whyInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Why Choose Us</div>
            <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fefaef', marginBottom: 12 }}>
              7 Reasons Brands<br />Never Leave Us
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 420, marginBottom: 40 }}>We're not just an agency — we're a growth partner.</p>
          </div>

          <div className="reasons-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {WHY_US.map((item, i) => (
              <div key={i}
                className={`reason-item-wrap why-card${whyInView ? ' visible' : ''}`}
                style={{
                  background: '#1a1a1a', padding: '28px 24px',
                  animationDelay: whyInView ? `${i * 0.1}s` : '0s',
                }}>
                <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: '#c8892a', marginBottom: 12 }}>{item.n}</div>
                <div className="syne" style={{ fontSize: 16, fontWeight: 700, color: '#fefaef', marginBottom: 8, lineHeight: 1.3 }}>{item.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
            <div
              className={`reason-item-wrap why-card${whyInView ? ' visible' : ''}`}
              style={{
                background: 'rgba(200,137,42,0.08)', border: '1px solid rgba(200,137,42,0.2)', padding: '28px 24px',
                animationDelay: whyInView ? '0.7s' : '0s',
              }}>
              <div style={{ fontSize: 20, marginBottom: 12 }}>🏆</div>
              <div className="syne" style={{ fontSize: 16, fontWeight: 700, color: '#c8892a', marginBottom: 8, lineHeight: 1.3 }}>Award-Winning Agency</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>Recognized by top marketing bodies across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section ref={platformsRef} className="section-pad" style={{ background: '#fefaef', padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className={`reveal${platformsInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Platforms We Work On</div>
            <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#1a1a1a', marginBottom: 12 }}>
              One Agency.<br /><em style={{ fontStyle: 'normal', color: '#c8892a' }}>Every Platform.</em>
            </h2>
            <p style={{ fontSize: 15, color: '#777', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 40px' }}>We connect your brand across all major digital platforms, seamlessly.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, maxWidth: 640, margin: '0 auto' }}>
            {PLATFORMS.map((p, i) => (
              <div key={i} className={`${i < 8 ? `reveal-scale delay-${i + 1}` : 'reveal-scale'}${platformsInView ? ' in-view' : ''}`}
                onMouseEnter={() => setPillHover(i)} onMouseLeave={() => setPillHover(null)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: pillHover === i ? '#1a1a1a' : '#fff', border: `1px solid ${pillHover === i ? '#1a1a1a' : 'rgba(0,0,0,0.08)'}`, borderRadius: 40, padding: '10px 18px', fontSize: 13, fontWeight: 500, color: pillHover === i ? '#fefaef' : '#1a1a1a', transition: 'all 0.18s', cursor: 'pointer' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.dot, flexShrink: 0 }} />
                {p.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section ref={resultsRef} className="section-pad" style={{ background: '#f5e6c8', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className={`reveal-left${resultsInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Numbers That Prove It</div>
            <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#1a1a1a', marginBottom: 40 }}>
              Real Results,<br />Real Clients.
            </h2>
          </div>

          <div className="results-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { num: '300%', label: 'Organic Traffic Growth', client: 'TechSpark Solutions', industry: 'Technology · SEO + Content', time: '6 months' },
              { num: '400%', label: 'ROI Improvement', client: 'StyleHouse Fashion', industry: 'Fashion & Retail · Meta Ads', time: '8 months' },
              { num: '120+', label: 'Leads Per Month', client: 'GreenBuild Infra', industry: 'Real Estate · Google Ads', time: 'Ongoing' },
            ].map((r, i) => (
              <div key={i} className={`reveal-scale delay-${i + 1}${resultsInView ? ' in-view' : ''} result-card-wrap`} style={{ background: '#fefaef', borderRadius: 20, padding: 32, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="syne" style={{ fontSize: 'clamp(42px,6vw,56px)', fontWeight: 800, letterSpacing: '-2px', color: '#c8892a', lineHeight: 1, marginBottom: 8 }}>{r.num}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{r.label}</div>
                <div style={{ width: 32, height: 2, background: '#e0d0b8', margin: '12px 0' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{r.client}</div>
                <div style={{ fontSize: 12, color: '#999' }}>{r.industry} · {r.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section ref={testiRef} className="section-pad" style={{ background: '#f0f4f8', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="testi-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* LEFT — heading + features + button */}
          <div className={`reveal-left${testiInView ? ' in-view' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Client Stories</div>
            <h2 className="syne" style={{ fontSize: 'clamp(36px,4vw,58px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, color: '#1a1a1a', marginBottom: 20 }}>
              What Clients<br />
              <em style={{ fontStyle: 'normal', color: '#c8892a' }}>Say About Us</em>
            </h2>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
              Real reviews from real clients who grew their business with Clicksemurs. Tap a story on the phone to read their experience.
            </p>
            {/* feature rows */}
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2.2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, text: 'Real results from real campaigns' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: '100% transparent reporting' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8892a" strokeWidth="2.2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>, text: 'Average 5x ROI across clients' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fff', border: '1px solid #e8e0d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  {f.icon}
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>{f.text}</span>
              </div>
            ))}
            <button onClick={() => window.location.href='/contact'} style={{ marginTop: 8, background: '#1a1a1a', color: '#fefaef', padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              View All Reviews →
            </button>
          </div>

          {/* RIGHT — big phone */}
          <div className={`reveal-right${testiInView ? ' in-view' : ''}`} style={{ display: 'flex', justifyContent: 'center' }}>
            {/* ── EXACT iPhone mockup from HTML file ── */}
            <div style={{ perspective: 1200 }}>
              {/* scale wrapper: 500/680 ≈ 0.735 — all internal abs positions stay intact */}
              <div style={{
                display: 'inline-block',
                transform: 'rotateY(-4deg) rotateX(2deg)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'rotateY(-4deg) rotateX(2deg)'}
              >
              <div style={{ width: 235, height: 500, transformOrigin: 'top left' }}>
              <div style={{ transform: 'scale(0.735)', transformOrigin: 'top left', width: 320, height: 680 }}>
                <div style={{ position:'relative', width:320, height:680, borderRadius:50, background:'#1a1a1a', boxShadow:'0 0 0 2px #3a3a3a, 0 0 0 5px #222, 0 20px 60px rgba(0,0,0,0.4)', overflow:'hidden' }}>

                  {/* white screen bg */}
                  <div style={{ position:'absolute', inset:0, background:'#fff' }} />

                  {/* Dynamic Island */}
                  <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:110, height:33, background:'#000', borderRadius:20, zIndex:20 }} />

                  {/* Status bar */}
                  <div style={{ position:'absolute', top:18, left:0, right:0, display:'flex', justifyContent:'space-between', padding:'0 28px', zIndex:21, alignItems:'center' }}>
                    <span style={{ color:'#111', fontSize:12, fontWeight:600, fontFamily:'-apple-system,sans-serif' }}>9:41</span>
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <svg width="14" height="10" viewBox="0 0 16 12"><rect x="0" y="8" width="3" height="4" fill="#111" rx="1"/><rect x="4.5" y="5" width="3" height="7" fill="#111" rx="1"/><rect x="9" y="2" width="3" height="10" fill="#111" rx="1"/><rect x="13.5" y="0" width="2.5" height="12" fill="#111" rx="1" opacity="0.3"/></svg>
                      <svg width="13" height="10" viewBox="0 0 14 12"><path d="M7 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="#111"/><path d="M2.5 6C4 4.5 5.8 3.7 7 3.7s3 .8 4.5 2.3" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M0 3.5C1.8 1.5 4.3 0 7 0s5.2 1.5 7 3.5" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/></svg>
                      <div style={{ display:'flex', alignItems:'center', gap:1 }}>
                        <div style={{ width:20, height:10, border:'1.5px solid #111', borderRadius:3, padding:1, display:'flex', alignItems:'center' }}>
                          <div style={{ width:'75%', height:'100%', background:'#111', borderRadius:1 }} />
                        </div>
                        <div style={{ width:2, height:4, background:'#111', borderRadius:'0 1px 1px 0', opacity:0.5 }} />
                      </div>
                    </div>
                  </div>

                  {/* Instagram header */}
                  <div style={{ position:'absolute', top:50, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 14px', borderBottom:'0.5px solid #eee', zIndex:10, background:'#fff' }}>
                    <span style={{ fontSize:22, fontFamily:"'Billabong',cursive,serif", fontWeight:400, color:'#000', letterSpacing:'0.5px', fontStyle:'italic' }}>Instagram</span>
                    <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M16 12h-4m0 0H8m4 0V8m0 4v4"/></svg>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
                    </div>
                  </div>

                  {/* Stories row — scrollable + clickable */}
                  <div style={{ position:'absolute', top:103, left:0, right:0, display:'flex', gap:10, padding:'10px 12px', overflowX:'auto', overflowY:'hidden', borderBottom:'0.5px solid #eee', background:'#fff', zIndex:9, scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }}>
                    {/* Your story */}
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, flexShrink:0 }}>
                      <div style={{ position:'relative', width:56, height:56 }}>
                        <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#e0e0e0,#bbb)', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #fff' }}>
                          <svg width="32" height="32" viewBox="0 0 40 40" fill="#888"><circle cx="20" cy="14" r="8"/><path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16"/></svg>
                        </div>
                        <div style={{ position:'absolute', bottom:0, right:0, width:18, height:18, borderRadius:'50%', background:'#0095f6', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ color:'#fff', fontSize:13, fontWeight:700, lineHeight:1 }}>+</span>
                        </div>
                      </div>
                      <span style={{ fontSize:10, color:'#333', fontFamily:'-apple-system,sans-serif', textAlign:'center', maxWidth:56, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Your story</span>
                    </div>
                    {/* Testimonial story circles */}
                    {testimonials.map((item, i) => (
                      <div key={i} onClick={() => setActiveT(i)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, flexShrink:0, cursor:'pointer' }}>
                        <div style={{ width:60, height:60, borderRadius:'50%', background: activeT===i ? item.color : 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', padding:'2.5px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow: activeT===i ? `0 0 0 2px #fff, 0 0 0 3.5px ${item.color}` : 'none' }}>
                          <div style={{ width:'100%', height:'100%', borderRadius:'50%', background: item.color, border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:13, color:'#fff' }}>{item.initials}</div>
                        </div>
                        <span style={{ fontSize:10, color: activeT===i ? item.color : '#333', fontFamily:'-apple-system,sans-serif', fontWeight: activeT===i ? 600 : 400, textAlign:'center', maxWidth:56, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.name?.split(' ')[0].toLowerCase()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Post header */}
                  <div style={{ position:'absolute', top:233, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background:'#fff', zIndex:8 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:32, height:32, borderRadius:'50%', background: t.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:12, color:'#fff', border:'1.5px solid #eee' }}>{t.initials}</div>
                      <div>
                        <span style={{ fontSize:12, fontWeight:600, color:'#111', fontFamily:'-apple-system,sans-serif' }}>{t.name}</span>
                      </div>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#111"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                  </div>

                  {/* Review card area — double tap to like */}
                  <div key={activeT} onClick={handleDoubleTap}
                    style={{ position:'absolute', top:275, left:0, right:0, height:230, background:'linear-gradient(160deg,#fefaef,#f5e6c8)', zIndex:7, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 20px', animation:'igSlideIn 0.3s ease', cursor:'pointer', userSelect:'none', position:'absolute' }}>
                    <div style={{ fontSize:18, color:'#c8892a', marginBottom:10 }}>{'★'.repeat(t.rating || 5)}</div>
                    <div style={{ fontSize:13, color:'#444', lineHeight:1.65, fontStyle:'italic', marginBottom:14 }}>
                      "{t.quote?.slice(0,140)}{t.quote?.length > 140 ? '...' : ''}"
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:'50%', background: t.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:13, color:'#fff', flexShrink:0 }}>{t.initials}</div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#1a1a1a' }}>{t.name}</div>
                        <div style={{ fontSize:11, color:'#aaa' }}>{t.handle}</div>
                      </div>
                    </div>
                    {/* double-tap heart pop */}
                    {heartPop && (
                      <div className="heart-pop" style={{ position:'absolute', top:'50%', left:'50%', pointerEvents:'none', zIndex:99 }}>
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="#e0245e"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
                      </div>
                    )}
                  </div>

                  {/* Post actions */}
                  <div style={{ position:'absolute', top:505, left:0, right:0, background:'#fff', padding:'8px 14px', zIndex:8 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                      <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                        {/* like button */}
                        <div onClick={() => handleLike(activeT)} style={{ cursor:'pointer', display:'flex', alignItems:'center' }}
                          className={liked[activeT] ? 'like-bounce' : ''}>
                          <svg width="24" height="24" viewBox="0 0 24 24"
                            fill={liked[activeT] ? '#e0245e' : 'none'}
                            stroke={liked[activeT] ? '#e0245e' : '#111'}
                            strokeWidth="1.8"
                            style={{ transition:'fill 0.2s, transform 0.2s' }}>
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
                          </svg>
                        </div>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                      </div>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                    </div>
                    <div style={{ fontSize:12, fontWeight:600, color:'#111', fontFamily:'-apple-system,sans-serif', marginBottom:3 }}>
                      {likes[activeT]?.toLocaleString()} likes
                    </div>
                    <div style={{ fontSize:12, color:'#111', fontFamily:'-apple-system,sans-serif' }}><span style={{ fontWeight:600 }}>clicksemurs</span> ⭐ Verified Client Review</div>
                  </div>

                  {/* Bottom nav */}
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:70, background:'#fff', borderTop:'0.5px solid #eee', display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 10px 12px', zIndex:20 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#111"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M10 8l6 4-6 4V8z"/></svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                    <div style={{ width:26, height:26, borderRadius:'50%', background:'linear-gradient(45deg,#f09433,#dc2743,#bc1888)', padding:2 }}>
                      <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:'#c8892a', border:'1.5px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#fff' }}>C</div>
                    </div>
                  </div>

                  {/* Side buttons */}
                  <div style={{ position:'absolute', top:120, right:-4, width:4, height:60, background:'#555', borderRadius:'0 3px 3px 0' }} />
                  <div style={{ position:'absolute', top:100, left:-4, width:4, height:40, background:'#555', borderRadius:'3px 0 0 3px' }} />
                  <div style={{ position:'absolute', top:155, left:-4, width:4, height:60, background:'#555', borderRadius:'3px 0 0 3px' }} />
                  <div style={{ position:'absolute', top:228, left:-4, width:4, height:60, background:'#555', borderRadius:'3px 0 0 3px' }} />

                  {/* Home indicator */}
                  <div style={{ position:'absolute', bottom:6, left:'50%', transform:'translateX(-50%)', width:100, height:3, background:'#bbb', borderRadius:2, zIndex:30 }} />
                </div>
              </div>{/* end scale inner */}
              </div>{/* end scale container */}
              </div>
            </div>
          </div>{/* end right col */}
          </div>{/* end grid */}
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="section-pad" style={{ background: '#1a1a1a', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="cta-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div className={`reveal-left${ctaInView ? ' in-view' : ''}`}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#c8892a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Limited Spots Available</div>
              <h2 className="syne" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fefaef', marginBottom: 16 }}>
                Get Your FREE<br />Marketing Audit<br /><em style={{ fontStyle: 'normal', color: '#c8892a' }}>Today.</em>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 400 }}>No commitment. Just clarity on where your brand stands and exactly how to grow it.</p>
            </div>
            <div className={`reveal-right${ctaInView ? ' in-view' : ''}`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
              {sent ? (
                <div>
                  <p style={{ color: '#c8892a', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✓ We'll be in touch shortly.</p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Check your inbox within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="syne" style={{ fontSize: 18, fontWeight: 700, color: '#fefaef', marginBottom: 6 }}>Start with a Free Audit</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>We'll respond within 24 hours.</div>
                  {[
                    { placeholder: 'Your name', val: name, set: setName, type: 'text' },
                    { placeholder: 'Email address', val: email, set: setEmail, type: 'email' },
                    { placeholder: 'Website URL', val: website, set: setWebsite, type: 'text' },
                  ].map((f, i) => (
                    <input key={i} type={f.type} placeholder={f.placeholder} value={f.val} onChange={e => f.set(e.target.value)}
                      required={f.type === 'email'}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#fefaef', fontFamily: "'DM Sans',sans-serif", marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#c8892a'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  ))}
                  <button type="submit" style={{ width: '100%', background: '#c8892a', color: '#fff', padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", marginTop: 4, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    Get My Free Audit →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
