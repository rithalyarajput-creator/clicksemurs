import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { supabase } from '../admin/supabase'
import { FaArrowRight, FaQuoteLeft, FaStar } from 'react-icons/fa'

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '50+', label: 'Industries Served' },
  { value: '98%', label: 'Client Retention' },
  { value: '5X', label: 'Average ROI' },
]

const whyUs = [
  { title: 'True 360° Coverage', desc: 'Every digital marketing service under one roof. No need to juggle multiple agencies.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { title: 'Multi-Industry Expertise', desc: '50+ industries served. We bring cross-industry ideas your competitors simply don\'t have.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { title: 'Data-Driven Always', desc: 'Every decision backed by deep analytics. Real-time tracking, clear ROI — always.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { title: 'Custom Strategies', desc: 'No copy-paste plans. 100% tailored strategy built for your goals, audience, and budget.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg> },
  { title: 'Creative + Technical', desc: 'Top designers, developers, writers & strategists working together under one roof.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { title: 'Full Transparency', desc: 'Regular detailed reports. No jargon. No hidden numbers. Just clear, honest results.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: '500+ Proven Projects', desc: '98% client retention rate. Brands that choose us don\'t just grow — they dominate.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
]

const STATIC_TESTIMONIALS = [
  { quote: 'Clicksemurs transformed our digital presence completely. Within 6 months, our organic traffic tripled and our leads doubled. They are a true growth partner.', client_name: 'Rahul Sharma', company: 'CEO, TechSpark Solutions', rating: 5 },
  { quote: "The difference between Clicksemurs and every other agency we'd tried is night and day. They actually understand business. Our ROI went up by 400% in 8 months.", client_name: 'Priya Mehta', company: 'Founder, StyleHouse Fashion', rating: 5 },
  { quote: "Their 360° approach meant we didn't have to manage multiple vendors. Everything — website, social, ads — handled perfectly. Highly recommend.", client_name: 'Amit Khanna', company: 'Director, GreenBuild Infrastructure', rating: 5 },
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const num = parseInt(target.replace(/\D/g, ''))
    if (!num) return
    const step = Math.ceil(num / (duration / 16))
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, num)
      setCount(current)
      if (current >= num) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [start, target, duration])
  const suffix = target.replace(/[0-9]/g, '')
  return count + suffix
}

function StatCard({ value, label }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const animated = useCountUp(value, 1800, visible)
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 16px', borderRight: '1px solid #2E2E2E' }} className="last:border-r-0">
      <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: 6 }}>{animated}</div>
      <div style={{ color: '#777777', fontSize: 13, letterSpacing: '0.04em' }}>{label}</div>
    </div>
  )
}

function HeroPhone() {
  const [slide, setSlide] = useState(0)
  const [notif, setNotif] = useState(true)
  const [notif2, setNotif2] = useState(false)
  const [likes, setLikes] = useState(2847)
  const [followers, setFollowers] = useState(12400)

  useEffect(() => {
    const t = setInterval(() => {
      setSlide(s => (s + 1) % 4)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setNotif(true)
      setNotif2(false)
      setTimeout(() => { setNotif(false); setNotif2(true) }, 1600)
      setTimeout(() => { setNotif2(false) }, 3200)
    }, 4800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setLikes(l => l + Math.floor(Math.random() * 12 + 3))
      setFollowers(f => f + Math.floor(Math.random() * 5 + 1))
    }, 2200)
    return () => clearInterval(t)
  }, [])

  const screens = [
    /* 0 — Instagram post */
    <div key="ig" style={{width:'100%',height:'100%',background:'#fff',display:'flex',flexDirection:'column'}}>
      {/* IG top bar */}
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 12px',borderBottom:'1px solid #f0f0f0'}}>
        <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:10,fontWeight:700,color:'#111'}}>clicksemurs</div>
          <div style={{fontSize:8,color:'#888'}}>Digital Marketing Agency</div>
        </div>
        <div style={{fontSize:18,color:'#111',fontWeight:700,lineHeight:1}}>···</div>
      </div>
      {/* Post image */}
      <div style={{width:'100%',aspectRatio:'1',background:'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#F4A100 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:6,padding:16,boxSizing:'border-box'}}>
        <div style={{color:'#fff',fontSize:9,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',opacity:0.8}}>Social Media Growth</div>
        <div style={{color:'#FFD700',fontSize:22,fontWeight:900,textAlign:'center',lineHeight:1.2}}>500%<br/><span style={{fontSize:12,color:'#fff',fontWeight:600}}>More Reach</span></div>
        <div style={{display:'flex',gap:4,marginTop:4}}>
          {['#SEO','#Growth','#Ads'].map(t=><span key={t} style={{background:'rgba(255,255,255,0.2)',color:'#fff',fontSize:7,padding:'2px 6px',borderRadius:4}}>{t}</span>)}
        </div>
      </div>
      {/* Actions */}
      <div style={{padding:'8px 12px',display:'flex',gap:12,alignItems:'center'}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        <div style={{marginLeft:'auto'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
      </div>
      <div style={{padding:'0 12px 6px',fontSize:9,fontWeight:700,color:'#111'}}>{likes.toLocaleString()} likes</div>
      <div style={{padding:'0 12px',fontSize:8,color:'#888'}}>+{(followers-12400).toLocaleString()} new followers today</div>
    </div>,

    /* 1 — Google Ads dashboard */
    <div key="ads" style={{width:'100%',height:'100%',background:'#f8f9fa',display:'flex',flexDirection:'column',gap:0}}>
      <div style={{background:'#fff',padding:'10px 12px',borderBottom:'1px solid #e8eaed',display:'flex',alignItems:'center',gap:6}}>
        <div style={{width:14,height:14,borderRadius:3,background:'linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)'}}/>
        <span style={{fontSize:10,fontWeight:700,color:'#202124'}}>Google Ads</span>
        <span style={{marginLeft:'auto',background:'#e8f5e9',color:'#1e8e3e',fontSize:8,fontWeight:700,padding:'2px 6px',borderRadius:4}}>● LIVE</span>
      </div>
      <div style={{padding:'8px 10px',display:'flex',flexDirection:'column',gap:6,flex:1,overflowY:'hidden'}}>
        {[
          {label:'Impressions',val:'84,291',trend:'+12%',color:'#4285F4'},
          {label:'Clicks',val:'6,847',trend:'+28%',color:'#34A853'},
          {label:'Conversions',val:'412',trend:'+41%',color:'#FBBC05'},
          {label:'ROAS',val:'4.8x',trend:'+19%',color:'#EA4335'},
        ].map(m=>(
          <div key={m.label} style={{background:'#fff',borderRadius:8,padding:'7px 10px',display:'flex',alignItems:'center',gap:8,boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
            <div style={{width:3,height:28,borderRadius:2,background:m.color,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:8,color:'#5f6368',fontWeight:600}}>{m.label}</div>
              <div style={{fontSize:13,fontWeight:800,color:'#202124',lineHeight:1.2}}>{m.val}</div>
            </div>
            <div style={{background:`${m.color}18`,color:m.color,fontSize:8,fontWeight:700,padding:'2px 5px',borderRadius:4}}>{m.trend}</div>
          </div>
        ))}
        {/* mini bar chart */}
        <div style={{background:'#fff',borderRadius:8,padding:'7px 10px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:8,color:'#5f6368',fontWeight:600,marginBottom:5}}>This Week Performance</div>
          <div style={{display:'flex',alignItems:'flex-end',gap:3,height:28}}>
            {[40,65,45,80,55,90,72].map((h,i)=>(
              <div key={i} style={{flex:1,height:`${h}%`,background:i===5?'#4285F4':'#e8eaed',borderRadius:'2px 2px 0 0',transition:'height 0.3s'}}/>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:3}}>
            {['M','T','W','T','F','S','S'].map((d,i)=><span key={i} style={{fontSize:7,color:'#9aa0a6'}}>{d}</span>)}
          </div>
        </div>
      </div>
    </div>,

    /* 2 — Website mockup */
    <div key="web" style={{width:'100%',height:'100%',background:'#fff',display:'flex',flexDirection:'column',overflowY:'hidden'}}>
      {/* Browser bar */}
      <div style={{background:'#f1f3f4',padding:'6px 10px',display:'flex',alignItems:'center',gap:4,borderBottom:'1px solid #e0e0e0'}}>
        <div style={{display:'flex',gap:3}}><div style={{width:5,height:5,borderRadius:'50%',background:'#ff5f57'}}/><div style={{width:5,height:5,borderRadius:'50%',background:'#febc2e'}}/><div style={{width:5,height:5,borderRadius:'50%',background:'#28c840'}}/></div>
        <div style={{flex:1,background:'#fff',borderRadius:4,padding:'3px 6px',fontSize:7,color:'#5f6368',border:'1px solid #e0e0e0'}}>www.yourwebsite.com</div>
      </div>
      {/* Scrolling content */}
      <div style={{flex:1,overflowY:'hidden',position:'relative'}}>
        <div style={{animation:'webScroll 6s linear infinite'}}>
          <style>{`@keyframes webScroll { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }`}</style>
          {[1,2].map(rep=>(
            <div key={rep}>
              {/* Hero */}
              <div style={{background:'linear-gradient(135deg,#0a0a0a,#1a1a2e)',padding:'14px 12px'}}>
                <div style={{fontSize:14,fontWeight:900,color:'#fff',lineHeight:1.2}}>We Don't<br/>Just Market.<br/><span style={{color:'#F4A100'}}>We Dominate.</span></div>
                <div style={{marginTop:8,background:'#F4A100',color:'#111',fontSize:8,fontWeight:800,padding:'4px 10px',borderRadius:4,display:'inline-block'}}>Get Free Audit →</div>
              </div>
              {/* Stats */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',background:'#111',borderTop:'1px solid #222'}}>
                {[{v:'500+',l:'Projects'},{v:'50+',l:'Industries'},{v:'98%',l:'Retention'},{v:'5X',l:'ROI'}].map(s=>(
                  <div key={s.l} style={{padding:'8px 4px',textAlign:'center',borderRight:'1px solid #222'}}>
                    <div style={{color:'#F4A100',fontSize:11,fontWeight:900}}>{s.v}</div>
                    <div style={{color:'#666',fontSize:6}}>{s.l}</div>
                  </div>
                ))}
              </div>
              {/* Services */}
              <div style={{padding:'10px 10px',background:'#f8f9fa'}}>
                <div style={{fontSize:8,fontWeight:800,color:'#111',marginBottom:6}}>Our Services</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
                  {['SEO','Google Ads','Social Media','Web Design'].map(s=>(
                    <div key={s} style={{background:'#fff',borderRadius:6,padding:'6px 8px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
                      <div style={{width:12,height:12,background:'#111',borderRadius:3,marginBottom:3}}/>
                      <div style={{fontSize:7,fontWeight:700,color:'#111'}}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    /* 3 — SEO analytics */
    <div key="seo" style={{width:'100%',height:'100%',background:'#0f172a',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'10px 12px',borderBottom:'1px solid #1e293b',display:'flex',alignItems:'center',gap:6}}>
        <div style={{width:14,height:14,borderRadius:3,background:'#10b981',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <span style={{fontSize:10,fontWeight:700,color:'#f1f5f9'}}>SEO Dashboard</span>
        <span style={{marginLeft:'auto',color:'#10b981',fontSize:8,fontWeight:700}}>↑ Ranking</span>
      </div>
      <div style={{padding:'8px 10px',flex:1,display:'flex',flexDirection:'column',gap:5}}>
        <div style={{color:'#64748b',fontSize:8,fontWeight:600}}>TOP KEYWORDS RANKING</div>
        {[
          {kw:'digital marketing agency',pos:1,chg:'+3'},
          {kw:'seo services india',pos:2,chg:'+5'},
          {kw:'google ads expert',pos:4,chg:'+8'},
          {kw:'social media marketing',pos:3,chg:'+2'},
        ].map(k=>(
          <div key={k.kw} style={{background:'#1e293b',borderRadius:8,padding:'7px 9px',display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:22,height:22,borderRadius:6,background:k.pos===1?'linear-gradient(135deg,#F4A100,#d48e00)':k.pos<=3?'#1e40af':'#374151',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span style={{fontSize:10,fontWeight:900,color:'#fff'}}>#{k.pos}</span>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:8,color:'#e2e8f0',fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{k.kw}</div>
            </div>
            <div style={{color:'#10b981',fontSize:9,fontWeight:700,flexShrink:0}}>{k.chg}</div>
          </div>
        ))}
        {/* Traffic graph */}
        <div style={{background:'#1e293b',borderRadius:8,padding:'7px 9px',marginTop:2}}>
          <div style={{fontSize:8,color:'#64748b',fontWeight:600,marginBottom:5}}>Organic Traffic Growth</div>
          <svg width="100%" height="36" viewBox="0 0 200 36">
            <defs><linearGradient id="tg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.4"/><stop offset="100%" stopColor="#10b981" stopOpacity="0"/></linearGradient></defs>
            <path d="M0,32 C20,28 40,24 60,18 C80,12 100,20 120,10 C140,2 160,8 180,4 L200,2 L200,36 L0,36 Z" fill="url(#tg)"/>
            <path d="M0,32 C20,28 40,24 60,18 C80,12 100,20 120,10 C140,2 160,8 180,4 L200,2" fill="none" stroke="#10b981" strokeWidth="2"/>
          </svg>
          <div style={{color:'#10b981',fontSize:8,fontWeight:700,textAlign:'right'}}>+247% this month</div>
        </div>
      </div>
    </div>,
  ]

  const labels = ['Instagram', 'Google Ads', 'Website', 'SEO']
  const labelColors = ['#E1306C','#4285F4','#F4A100','#10b981']

  return (
    <div className="hero-phone-col" style={{ position:'relative', flexShrink:0 }}>
      <style>{`
        .hero-phone-col { display:flex !important; align-items:center; justify-content:center; }
        @media (max-width:960px) { .hero-phone-col { display:none !important; } }
        @keyframes floatPhone { 0%,100%{transform:translateY(0px) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(-2deg)} }
        @keyframes notifSlideIn { 0%{transform:translateX(120%);opacity:0} 15%,85%{transform:translateX(0);opacity:1} 100%{transform:translateX(120%);opacity:0} }
        @keyframes notif2SlideIn { 0%{transform:translateX(-120%);opacity:0} 15%,85%{transform:translateX(0);opacity:1} 100%{transform:translateX(-120%);opacity:0} }
        @keyframes badgePop { 0%{transform:scale(0.7);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes dotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
      `}</style>

      {/* Floating notification — Instagram */}
      {notif && (
        <div style={{position:'absolute',top:20,right:-10,zIndex:20,background:'#fff',borderRadius:12,padding:'7px 10px',boxShadow:'0 8px 30px rgba(0,0,0,0.18)',display:'flex',alignItems:'center',gap:7,minWidth:160,animation:'notifSlideIn 4.8s ease forwards'}}>
          <div style={{width:24,height:24,borderRadius:'50%',background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg>
          </div>
          <div>
            <div style={{fontSize:9,fontWeight:700,color:'#111'}}>+1,240 New Followers</div>
            <div style={{fontSize:8,color:'#888'}}>❤️ 847 likes on your post</div>
          </div>
        </div>
      )}

      {/* Floating notification — Google */}
      {notif2 && (
        <div style={{position:'absolute',bottom:80,left:-20,zIndex:20,background:'#fff',borderRadius:12,padding:'7px 10px',boxShadow:'0 8px 30px rgba(0,0,0,0.18)',display:'flex',alignItems:'center',gap:7,minWidth:155,animation:'notif2SlideIn 3.2s ease forwards'}}>
          <div style={{width:24,height:24,borderRadius:6,background:'#fff',border:'1px solid #e0e0e0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          </div>
          <div>
            <div style={{fontSize:9,fontWeight:700,color:'#111'}}>Ad Campaign Live!</div>
            <div style={{fontSize:8,color:'#888'}}>📈 ROAS 4.8x · 412 leads</div>
          </div>
        </div>
      )}

      {/* Floating badge */}
      <div style={{position:'absolute',top:'50%',left:-28,transform:'translateY(-50%)',zIndex:20,background:'linear-gradient(135deg,#F4A100,#d48e00)',borderRadius:12,padding:'8px 10px',boxShadow:'0 6px 20px rgba(244,161,0,0.4)',animation:'badgePop 0.5s ease both',textAlign:'center',minWidth:56}}>
        <div style={{fontSize:16,fontWeight:900,color:'#111',lineHeight:1}}>5X</div>
        <div style={{fontSize:7,fontWeight:700,color:'#111',opacity:0.8}}>ROI</div>
      </div>

      {/* Phone */}
      <div style={{width:220,height:440,borderRadius:36,background:'#0a0a0a',padding:3,boxShadow:'0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',animation:'floatPhone 4s ease-in-out infinite',position:'relative',overflow:'visible'}}>
        <div style={{width:'100%',height:'100%',borderRadius:33,overflow:'hidden',background:'#fff',position:'relative'}}>
          {/* Status bar */}
          <div style={{background:'#000',height:24,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px 0 20px',flexShrink:0}}>
            <span style={{color:'#fff',fontSize:8,fontWeight:600}}>9:41</span>
            <div style={{width:60,height:14,background:'#000',borderRadius:7,border:'2px solid #222',position:'absolute',left:'50%',transform:'translateX(-50%)'}}/>
            <div style={{display:'flex',gap:3,alignItems:'center'}}>
              <div style={{width:10,height:7,border:'1.5px solid #fff',borderRadius:1,position:'relative'}}><div style={{position:'absolute',inset:1,background:'#fff',borderRadius:0,width:`${Math.min(100,(followers-12400)*2)}%`,maxWidth:'100%'}}/></div>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
            </div>
          </div>
          {/* Screen content */}
          <div style={{flex:1,height:'calc(100% - 24px - 36px)',overflow:'hidden'}}>
            {screens[slide]}
          </div>
          {/* Bottom nav */}
          <div style={{height:36,background:'#fff',borderTop:'1px solid #f0f0f0',display:'flex',alignItems:'center',justifyContent:'center',gap:14,padding:'0 8px'}}>
            {labels.map((l,i)=>(
              <button key={l} onClick={()=>setSlide(i)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,background:'none',border:'none',cursor:'pointer',padding:'2px 4px'}}>
                <div style={{width:4,height:4,borderRadius:'50%',background:slide===i?labelColors[i]:'transparent',animation:slide===i?'dotPulse 1s ease-in-out infinite':'none'}}/>
                <span style={{fontSize:6.5,fontWeight:slide===i?800:500,color:slide===i?labelColors[i]:'#aaa'}}>{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS)
  const [tSlide, setTSlide] = useState(0)

  useEffect(() => {
    supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const active = data.filter(t => t.is_active !== false)
          setTestimonials(active.length > 0 ? active : STATIC_TESTIMONIALS)
        }
      })
  }, [])

  const tTotal = testimonials.length
  const tPages = Math.ceil(tTotal / 3)
  const tVisible = testimonials.slice(tSlide * 3, tSlide * 3 + 3)

  const handleAuditSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    await supabase.from('newsletter').insert([{ email }])
    setEmailSent(true)
    setEmail('')
  }

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '15%', right: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,161,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingTop: 112, paddingBottom: 80, width: '100%', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>

            {/* Left — text */}
            <div style={{ maxWidth: 620 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,161,0,0.1)', border: '1px solid rgba(244,161,0,0.25)', borderRadius: 100, padding: '5px 16px', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F4A100', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ color: '#F4A100', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>360° Digital Marketing Agency</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
                We Don't Just<br />
                <span style={{ color: '#fff' }}>Market. </span>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  We Dominate.
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 3, background: '#F4A100' }} />
                </span>
              </h1>
              <p style={{ color: '#AAAAAA', fontSize: 'clamp(15px, 2.5vw, 18px)', marginBottom: 36, maxWidth: 540, lineHeight: 1.7 }}>
                Full 360° digital marketing for brands that mean business. From SEO and paid ads to website development and social media — we handle everything.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link to="/contact" className="btn-primary" style={{ fontSize: 13, letterSpacing: '0.06em' }}>
                  Get Free Audit <FaArrowRight size={12} />
                </Link>
                <Link to="/portfolio" className="btn-outline" style={{ fontSize: 13, letterSpacing: '0.06em' }}>
                  See Our Work
                </Link>
              </div>
            </div>

            {/* Right — animated phone mockup */}
            <HeroPhone />
          </div>
        </div>
      </section>

      {/* ── Logo Marquee ── */}
      <div style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 0', overflow: 'hidden', position: 'relative' }}>
        <style>{`
          @keyframes marqueeScroll {
            0%   { transform: translateX(0) }
            100% { transform: translateX(-50%) }
          }
          .marquee-track {
            display: flex;
            align-items: center;
            gap: 0;
            width: max-content;
            animation: marqueeScroll 22s linear infinite;
          }
          .marquee-track:hover { animation-play-state: paused; }
          .marquee-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 36px;
            border-right: 1px solid rgba(255,255,255,0.07);
            white-space: nowrap;
          }
        `}</style>
        {/* Left fade */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:80, background:'linear-gradient(90deg,#0A0A0A,transparent)', zIndex:2, pointerEvents:'none' }}/>
        {/* Right fade */}
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:80, background:'linear-gradient(270deg,#0A0A0A,transparent)', zIndex:2, pointerEvents:'none' }}/>

        <div className="marquee-track">
          {/* First copy */}
          {[
            { img: '/instagram.png',    label: 'Instagram',   blend: false },
            { img: '/google ads.png',   label: 'Google Ads',  blend: true  },
            { img: '/wordpress.png',    label: 'WordPress',   blend: true  },
            { img: '/Shopify_logo.svg', label: 'Shopify',     blend: false },
            { img: null, label: 'Facebook',   emoji: '📘' },
            { img: null, label: 'LinkedIn',   emoji: '💼' },
            { img: null, label: 'YouTube',    emoji: '▶️' },
            { img: null, label: 'SEO',        emoji: '🔍' },
            { img: null, label: 'Meta Ads',   emoji: '📊' },
            { img: null, label: 'WhatsApp',   emoji: '💬' },
            { img: null, label: 'Canva',      emoji: '🎨' },
            { img: null, label: 'HubSpot',    emoji: '🧲' },
          ].map((item, i) => (
            <div key={i} className="marquee-item">
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.label}
                  height="22"
                  style={{
                    height: 22,
                    width: 'auto',
                    maxWidth: 90,
                    objectFit: 'contain',
                    mixBlendMode: item.blend ? 'screen' : 'normal',
                    filter: item.blend ? 'brightness(1.8) contrast(0.9)' : 'none',
                    opacity: 0.9,
                  }}
                />
              ) : (
                <span style={{ fontSize: 16 }}>{item.emoji}</span>
              )}
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>{item.label}</span>
            </div>
          ))}
          {/* Duplicate copy for seamless loop */}
          {[
            { img: '/instagram.png',    label: 'Instagram',   blend: false },
            { img: '/google ads.png',   label: 'Google Ads',  blend: true  },
            { img: '/wordpress.png',    label: 'WordPress',   blend: true  },
            { img: '/Shopify_logo.svg', label: 'Shopify',     blend: false },
            { img: null, label: 'Facebook',   emoji: '📘' },
            { img: null, label: 'LinkedIn',   emoji: '💼' },
            { img: null, label: 'YouTube',    emoji: '▶️' },
            { img: null, label: 'SEO',        emoji: '🔍' },
            { img: null, label: 'Meta Ads',   emoji: '📊' },
            { img: null, label: 'WhatsApp',   emoji: '💬' },
            { img: null, label: 'Canva',      emoji: '🎨' },
            { img: null, label: 'HubSpot',    emoji: '🧲' },
          ].map((item, i) => (
            <div key={`d${i}`} className="marquee-item">
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.label}
                  height="22"
                  style={{
                    height: 22,
                    width: 'auto',
                    maxWidth: 90,
                    objectFit: 'contain',
                    mixBlendMode: item.blend ? 'screen' : 'normal',
                    filter: item.blend ? 'brightness(1.8) contrast(0.9)' : 'none',
                    opacity: 0.9,
                  }}
                />
              ) : (
                <span style={{ fontSize: 16 }}>{item.emoji}</span>
              )}
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <section style={{ background: '#0A0A0A', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid-resp">
            {stats.map(s => <StatCard key={s.label} value={s.value} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* ── Services — light grey bg, horizontal scroll cards with left big text ── */}
      <section style={{ background: '#F2F2F2', padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'start' }} className="services-two-col">
            <style>{`.services-two-col { grid-template-columns: 1fr 2fr !important; } @media(max-width:860px){.services-two-col{grid-template-columns:1fr !important;}}`}</style>
            {/* Left sticky label */}
            <div style={{ position: 'sticky', top: 120 }}>
              <span style={{ display: 'block', fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 14 }}>What We Do</span>
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: '#111', lineHeight: 1.1, marginBottom: 16 }}>Full-Service<br/>Digital<br/>Marketing</h2>
              <div style={{ width: 40, height: 3, background: '#111', marginBottom: 18 }}/>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>Every service under one roof. No gaps, no juggling vendors.</p>
              <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 28, background: '#111', color: '#fff', padding: '12px 22px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textDecoration: 'none', borderRadius: 2 }}>
                All Services <FaArrowRight size={10}/>
              </Link>
            </div>
            {/* Right — services list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {services.slice(0, 6).map((svc, i) => {
                const Icon = svc.icon
                return (
                  <Link key={svc.id} to={`/services/${svc.slug}`} style={{ background: '#fff', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 20, textDecoration: 'none', borderLeft: '3px solid transparent', transition: 'border-color 0.2s, background 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderLeftColor = '#F4A100'; e.currentTarget.style.background = '#fafafa' }}
                    onMouseLeave={e => { e.currentTarget.style.borderLeftColor = 'transparent'; e.currentTarget.style.background = '#fff' }}>
                    <div style={{ width: 40, height: 40, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, flexShrink: 0 }}>
                      <Icon size={17} color="white"/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#111', fontWeight: 800, fontSize: 15, marginBottom: 3 }}>{svc.title}</div>
                      <div style={{ color: '#888', fontSize: 13, lineHeight: 1.5 }}>{svc.short}</div>
                    </div>
                    <span style={{ color: '#ccc', fontSize: 18, flexShrink: 0 }}>→</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us — pure black, numbered list layout ── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F4A100', display: 'block', marginBottom: 14 }}>Why Clicksemurs</span>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1 }}>
                7 Reasons Brands<br/>Never Leave Us
              </h2>
            </div>
            <p style={{ color: '#555', fontSize: 14, maxWidth: 280, lineHeight: 1.65 }}>98% client retention. Not a coincidence — it's a system.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: '#1a1a1a' }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{ background: '#0A0A0A', padding: 'clamp(24px,3vw,36px)', display: 'flex', gap: 20, transition: 'background 0.2s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = '#111'}
                onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}>
                <div style={{ fontSize: 11, fontWeight: 900, color: '#F4A100', letterSpacing: '0.05em', flexShrink: 0, paddingTop: 2, minWidth: 28 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ color: '#555', fontSize: 13.5, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Orbit / Integrations — white bg, centered ── */}
      <section style={{ background: '#fff', padding: 'clamp(56px,8vw,96px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 40%, rgba(244,161,0,0.05) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: 14 }}>Platforms We Work With</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, color: '#111', textAlign: 'center', marginBottom: 8, letterSpacing: '-0.02em' }}>
            One Agency. <span style={{ color: '#F4A100' }}>Every Platform.</span>
          </h2>
          <p style={{ color: '#888', fontSize: 15, textAlign: 'center', marginBottom: 56, maxWidth: 400 }}>We connect your brand across all major digital platforms — seamlessly.</p>

          {/* Orbit */}
          <div style={{ position:'relative', width:560, height:560, maxWidth:'96vw' }}>
            <style>{`
              @keyframes sCW14  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
              @keyframes sCCW20 { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
              @keyframes sCW28  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
              @keyframes rCW14  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
              @keyframes rCCW20 { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
              @keyframes rCW28  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
              @keyframes pulseCtr { 0%,100%{box-shadow:0 0 0 0 rgba(244,161,0,0.35),0 0 40px rgba(244,161,0,0.12)} 50%{box-shadow:0 0 0 18px rgba(244,161,0,0),0 0 60px rgba(244,161,0,0.25)} }
              .orb-ring { position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center; }
              .orb-icon-sq { display:flex;align-items:center;justify-content:center;border-radius:14px;box-shadow:0 4px 18px rgba(0,0,0,0.13);background:#fff; }
            `}</style>

            {/* Static rings */}
            <div className="orb-ring">
              <div style={{position:'absolute',width:200,height:200,borderRadius:'50%',border:'1.5px dashed rgba(244,161,0,0.4)'}}/>
              <div style={{position:'absolute',width:340,height:340,borderRadius:'50%',border:'1.5px dashed rgba(100,116,139,0.25)'}}/>
              <div style={{position:'absolute',width:490,height:490,borderRadius:'50%',border:'1.5px dashed rgba(100,116,139,0.15)'}}/>
            </div>

            {/* Center */}
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:118,height:118,borderRadius:'50%',background:'linear-gradient(135deg,#fff 0%,#f0f4ff 100%)',border:'2.5px solid rgba(244,161,0,0.45)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:5,animation:'pulseCtr 3s ease-in-out infinite',zIndex:10,boxShadow:'0 8px 40px rgba(0,0,0,0.1)'}}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#F4A100" strokeWidth="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke="#F4A100" strokeWidth="1.5"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#F4A100" strokeWidth="1.5"/></svg>
              <span style={{color:'#F4A100',fontSize:7.5,fontWeight:900,letterSpacing:'0.08em',textTransform:'uppercase',textAlign:'center',lineHeight:1.45}}>Digital<br/>Marketing</span>
            </div>

            {/* Inner ring — 5 icons CW 14s */}
            <div className="orb-ring" style={{animation:'sCW14 14s linear infinite'}}>
              {[
                { name:'Instagram', bg:'#E1306C', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg> },
                { name:'Facebook', bg:'#1877F2', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { name:'LinkedIn', bg:'#0A66C2', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                { name:'YouTube', bg:'#FF0000', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000"/></svg> },
                { name:'WhatsApp', bg:'#25D366', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
              ].map((ic,idx) => (
                <div key={ic.name} style={{position:'absolute',transform:`rotate(${idx*72}deg) translateY(-100px)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div className="orb-icon-sq" style={{width:52,height:52,background:ic.bg,animation:'rCW14 14s linear infinite'}}>
                    {ic.svg}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle ring — 6 icons CCW 20s */}
            <div className="orb-ring" style={{animation:'sCCW20 20s linear infinite'}}>
              {[
                { name:'Google', bg:'#fff', border:true, svg:<svg viewBox="0 0 24 24" width="28" height="28"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
                { name:'Shopify', bg:'#96BF48', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M15.337 23.979l4.862-1.052s-1.742-11.781-1.754-11.848c-.012-.068-.068-.112-.124-.112s-1.428-.1-1.428-.1-.95-.938-.95-.938v13.05zM13.61 7.989s-.63-.168-1.316-.168c-2.1 0-3.107 1.316-3.107 2.576 0 1.428 1.022 2.17 1.966 2.8.882.602 1.19.994 1.19 1.54 0 .602-.49 1.008-1.26 1.008-.854 0-1.68-.476-1.68-.476l-.28 1.736s.714.406 1.96.406c2.24 0 3.71-1.1 3.71-3.024 0-1.316-.938-2.17-1.932-2.8-.938-.602-1.12-.882-1.12-1.428 0-.476.336-.952 1.232-.952.728 0 1.288.308 1.288.308l.35-1.526z"/><path d="M9.898 3.64S9.506 3.5 8.96 3.5c-2.436 0-3.612 1.82-3.612 1.82L4.6 23h.812l9.254-1.988-2.94-17.498s-.898-.14-1.148-.14c-.14 0-.28.028-.28.028L9.9 3.64z" opacity=".5"/><path d="M13.89 2.268s-.63-.168-1.316-.168c-.588 0-1.078.14-1.078.14L10.7 5.684s.406-.14.882-.14c.882 0 1.4.35 1.4.35l.91-3.626z"/></svg> },
                { name:'WordPress', bg:'#21759B', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5"/><path d="M2 12h20M12 2c-2.8 3.5-4.5 6.5-4.5 10s1.7 6.5 4.5 10M12 2c2.8 3.5 4.5 6.5 4.5 10s-1.7 6.5-4.5 10" fill="none" stroke="white" strokeWidth="1.5"/></svg> },
                { name:'Canva', bg:'#00C4CC', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="white"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
                { name:'Twitter/X', bg:'#000000', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg> },
                { name:'Figma', bg:'#F24E1E', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg> },
              ].map((ic,idx) => (
                <div key={ic.name} style={{position:'absolute',transform:`rotate(${idx*60}deg) translateY(-170px)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div className="orb-icon-sq" style={{width:56,height:56,background:ic.bg,border:ic.border?'1px solid #e2e8f0':'none',animation:'rCCW20 20s linear infinite'}}>
                    {ic.svg}
                  </div>
                </div>
              ))}
            </div>

            {/* Outer ring — 8 icons CW 28s */}
            <div className="orb-ring" style={{animation:'sCW28 28s linear infinite'}}>
              {[
                { name:'Google Ads', bg:'#4285F4', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M3.5 19h3v-8h-3zm9-14L8 13h3v6h3v-6h3z"/><circle cx="18.5" cy="16.5" r="2.5"/></svg> },
                { name:'Mailchimp', bg:'#FFE01B', svg:<svg viewBox="0 0 24 24" width="26" height="26"><path d="M20 8c0-4.4-3.6-8-8-8S4 3.6 4 8c0 2.8 1.4 5.3 3.6 6.8-.1.4-.2.8-.2 1.2 0 2.2 1.8 4 4 4h1.2c2 0 3.8-1.5 3.8-3.5 0-.5-.1-1-.3-1.4C18.5 13.4 20 10.8 20 8z" fill="#1F1F1F"/><path d="M12 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="#FFE01B"/><circle cx="9.5" cy="8.5" r="1" fill="#1F1F1F"/><circle cx="14.5" cy="8.5" r="1" fill="#1F1F1F"/><path d="M9.5 11s.8 1.5 2.5 1.5 2.5-1.5 2.5-1.5" fill="none" stroke="#1F1F1F" strokeWidth="1.2" strokeLinecap="round"/></svg> },
                { name:'Photoshop', bg:'#31A8FF', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><rect x="2" y="2" width="20" height="20" rx="3" fill="#001E36"/><text x="5" y="17" fontSize="10" fontWeight="900" fill="#31A8FF" fontFamily="sans-serif">Ps</text></svg> },
                { name:'HubSpot', bg:'#FF7A59', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><circle cx="12" cy="8" r="3"/><path d="M9 8H5a2 2 0 0 0 0 4h4"/><path d="M15 8h4a2 2 0 0 1 0 4h-4"/><circle cx="12" cy="18" r="2"/><path d="M12 11v5"/></svg> },
                { name:'Pinterest', bg:'#E60023', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg> },
                { name:'Analytics', bg:'#E37400', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2v-5h2v5z"/></svg> },
                { name:'Discord', bg:'#5865F2', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/><circle cx="9" cy="13" r="1.5"/><circle cx="15" cy="13" r="1.5"/></svg> },
                { name:'SEMrush', bg:'#FF642D', svg:<svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M6.5 17.5l3-3 2 2 4-4 2 2"/></svg> },
              ].map((ic,idx) => (
                <div key={ic.name} style={{position:'absolute',transform:`rotate(${idx*45}deg) translateY(-245px)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div className="orb-icon-sq" style={{width:50,height:50,background:ic.bg,animation:'rCW28 28s linear infinite'}}>
                    {ic.svg}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform tags */}
          <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginTop:48,maxWidth:700}}>
            {['Instagram','Facebook','LinkedIn','YouTube','WhatsApp','Google Ads','WordPress','Shopify','Figma','Canva','HubSpot','Mailchimp','Pinterest','Analytics','SEMrush'].map(p=>(
              <span key={p} style={{background:'#f5f5f5',border:'1px solid #e5e5e5',borderRadius:2,padding:'5px 14px',color:'#444',fontSize:11,fontWeight:600}}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Preview — charcoal bg, big number layout ── */}
      <section style={{ background: '#161616', padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F4A100', display: 'block', marginBottom: 14 }}>Results</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>Numbers That<br/>Prove It</h2>
            </div>
            <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #333', padding: '10px 20px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
              View All Work <FaArrowRight size={10}/>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: '#222' }}>
            {[
              { client: 'TechSpark Solutions', industry: 'Technology · SEO + Content', metric: '300%', metricLabel: 'Organic Traffic Growth', detail: '6 months' },
              { client: 'StyleHouse Fashion', industry: 'Fashion & Retail · Meta Ads', metric: '400%', metricLabel: 'ROI Improvement', detail: '8 months' },
              { client: 'GreenBuild Infra', industry: 'Real Estate · Google Ads', metric: '120+', metricLabel: 'Leads Per Month', detail: 'Ongoing' },
            ].map((cs, i) => (
              <div key={i} style={{ background: '#161616', padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 16, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
                onMouseLeave={e => e.currentTarget.style.background = '#161616'}>
                <div style={{ fontSize: 'clamp(3rem,8vw,5rem)', fontWeight: 900, color: '#F4A100', lineHeight: 1, letterSpacing: '-0.03em' }}>{cs.metric}</div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{cs.metricLabel}</div>
                <div style={{ width: 32, height: 2, background: '#333' }}/>
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{cs.client}</div>
                  <div style={{ color: '#555', fontSize: 12 }}>{cs.industry} · {cs.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — black bg, glossy glass cards ── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(56px, 8vw, 96px) 0', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '30%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,161,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <style>{`
          .glass-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .glass-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(244,161,0,0.2);
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F4A100', display: 'block', marginBottom: 14 }}>Client Stories</span>
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>What Clients<br/>Say About Us</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {[...Array(5)].map((_,j) => <FaStar key={j} size={15} color="#F4A100"/>)}
              <span style={{ color: '#555', fontSize: 12, marginLeft: 6 }}>5.0 average</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32, alignItems: 'stretch' }}>
            {tVisible.map((t, i) => (
              <div key={t.id || i} className="glass-card" style={{ padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                {/* Quote mark */}
                <div style={{ fontSize: 52, color: '#F4A100', lineHeight: 0.8, marginBottom: 20, fontFamily: 'Georgia, serif', opacity: 0.9 }}>"</div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14.5, lineHeight: 1.8, flex: 1, marginBottom: 24 }}>{t.quote || t.review}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #F4A100, #d48e00)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#111', fontSize: 13, fontWeight: 900 }}>{(t.client_name || t.name || 'U')[0]}</span>
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>{t.client_name || t.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, marginTop: 1 }}>{t.company}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[...Array(t.rating || 5)].map((_, j) => <FaStar key={j} size={10} color="#F4A100"/>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {tPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <button onClick={() => setTSlide(p => Math.max(0, p - 1))} disabled={tSlide === 0}
                style={{ width: 38, height: 38, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: tSlide === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: tSlide === 0 ? '#444' : '#fff', cursor: tSlide === 0 ? 'default' : 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
              {Array.from({ length: tPages }).map((_, p) => (
                <button key={p} onClick={() => setTSlide(p)}
                  style={{ width: 8, height: 8, border: 'none', borderRadius: '50%', background: tSlide === p ? '#F4A100' : 'rgba(255,255,255,0.15)', cursor: 'pointer', padding: 0, transition: 'background 0.2s' }} />
              ))}
              <button onClick={() => setTSlide(p => Math.min(tPages - 1, p + 1))} disabled={tSlide === tPages - 1}
                style={{ width: 38, height: 38, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: tSlide === tPages - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: tSlide === tPages - 1 ? '#444' : '#fff', cursor: tSlide === tPages - 1 ? 'default' : 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner — full black, split layout ── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="cta-two-col">
            <style>{`@media(max-width:768px){.cta-two-col{grid-template-columns:1fr !important;}}`}</style>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F4A100', display: 'block', marginBottom: 14 }}>Limited Spots Available</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                Get Your FREE<br/>Marketing Audit<br/>Today
              </h2>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, maxWidth: 400 }}>
                Let our experts analyze your digital presence and show you exactly where the growth is hiding.
              </p>
            </div>
            <div>
              {emailSent ? (
                <div style={{ background: '#111', border: '1px solid #222', padding: '32px', borderRadius: 0 }}>
                  <p style={{ color: '#F4A100', fontWeight: 700, fontSize: 16 }}>✓ We'll be in touch shortly.</p>
                  <p style={{ color: '#666', fontSize: 13, marginTop: 8 }}>Check your inbox within 24 hours.</p>
                </div>
              ) : (
                <div style={{ background: '#111', padding: 'clamp(24px,4vw,40px)', borderLeft: '3px solid #F4A100' }}>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Start with a free audit</div>
                  <div style={{ color: '#555', fontSize: 13, marginBottom: 24 }}>No commitment. No cost. Real insights.</div>
                  <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required
                      style={{ background: '#0A0A0A', border: '1px solid #2a2a2a', color: '#fff', padding: '14px 16px', fontSize: 14, outline: 'none', borderRadius: 0, width: '100%', boxSizing: 'border-box' }}/>
                    <button type="submit" style={{ background: '#F4A100', color: '#111', padding: '14px 24px', fontSize: 13, fontWeight: 800, border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Get My Free Audit →
                    </button>
                  </form>
                  <p style={{ color: '#333', fontSize: 11, marginTop: 12 }}>clicksemurs@gmail.com · www.clicksemurs.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
