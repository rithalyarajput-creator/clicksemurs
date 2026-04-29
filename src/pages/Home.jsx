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
      <section style={{ background: '#111111', borderTop: '1px solid #2E2E2E', borderBottom: '1px solid #2E2E2E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid-resp">
            {stats.map(s => <StatCard key={s.label} value={s.value} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ background: '#F4F4F4', padding: 'clamp(48px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ marginBottom: 48 }}>
            <span style={{ display: 'block', color: '#777', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>What We Do</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#111', marginBottom: 12 }}>Full-Service Digital Marketing</h2>
            <p style={{ color: '#777', maxWidth: 480, fontSize: 15, lineHeight: 1.6 }}>Every service you need under one roof — no coordination headaches, no gaps.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {services.slice(0, 6).map(svc => {
              const Icon = svc.icon
              return (
                <Link key={svc.id} to={`/services/${svc.slug}`} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: 32, display: 'block', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s', borderRadius: 4 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ width: 42, height: 42, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, borderRadius: 8 }}>
                    <Icon size={18} color="white" />
                  </div>
                  <h3 style={{ color: '#111', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{svc.title}</h3>
                  <p style={{ color: '#777', fontSize: 13.5, lineHeight: 1.65 }}>{svc.short}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, color: '#111', fontSize: 13, fontWeight: 700 }}>
                    Learn More <FaArrowRight size={10} />
                  </div>
                </Link>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/services" className="btn-dark">View All 10 Services <FaArrowRight size={12} /></Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)', padding: 'clamp(56px, 8vw, 96px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,161,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 3, background: '#F4A100', borderRadius: 2, flexShrink: 0 }} />
              <span style={{ color: '#F4A100', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Why Clicksemurs</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
              7 Reasons Businesses<br /><span style={{ color: '#F4A100' }}>Choose Us</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 420 }}>And why they stay — 98% client retention rate speaks for itself.</p>
          </div>

          {/* 6 cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {whyUs.slice(0, 6).map((item, i) => {
              const accent = i % 3 === 0 ? '#F4A100' : i % 3 === 1 ? '#3b82f6' : '#10b981'
              return (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(20px,3vw,32px)', position: 'relative', overflow: 'hidden', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                  <div style={{ position: 'absolute', top: 14, right: 16, fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent, opacity: 0.7 }} />
                  <div style={{ width: 44, height: 44, background: `${accent}18`, border: `1px solid ${accent}30`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: accent }}>
                    {item.icon}
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: 13.5, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* 7th reason full-width */}
          <div style={{ marginTop: 2, background: 'linear-gradient(90deg, rgba(244,161,0,0.12) 0%, rgba(244,161,0,0.04) 100%)', border: '1px solid rgba(244,161,0,0.25)', padding: 'clamp(18px, 3vw, 28px) clamp(18px, 3vw, 32px)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ width: 50, height: 50, background: 'rgba(244,161,0,0.15)', border: '1px solid rgba(244,161,0,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#F4A100' }}>
              {whyUs[6].icon}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{whyUs[6].title}</h3>
              <p style={{ color: '#9ca3af', fontSize: 14 }}>{whyUs[6].desc}</p>
            </div>
            <div style={{ flexShrink: 0, background: '#F4A100', color: '#111', fontSize: 12, fontWeight: 800, padding: '8px 18px', borderRadius: 6, letterSpacing: '0.05em' }}>
              #7 REASON
            </div>
          </div>
        </div>
      </section>

      {/* ── Orbit / Integrations ── */}
      <section style={{ background: '#f8fafc', padding: 'clamp(56px,8vw,96px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(244,161,0,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,161,0,0.08)', border: '1px solid rgba(244,161,0,0.2)', borderRadius: 100, padding: '4px 16px', marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F4A100', display: 'inline-block' }} />
            <span style={{ color: '#F4A100', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Platforms We Work With</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, color: '#0f172a', textAlign: 'center', marginBottom: 8, letterSpacing: '-0.02em' }}>
            One Agency. <span style={{ color: '#F4A100' }}>Every Platform.</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 15, textAlign: 'center', marginBottom: 56, maxWidth: 420 }}>We connect your brand across all major digital platforms — seamlessly.</p>

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
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg', bg:'#E1306C', name:'Instagram'},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg', bg:'#1877F2', name:'Facebook'},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg', bg:'#0A66C2', name:'LinkedIn'},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg', bg:'#FF0000', name:'YouTube'},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg', bg:'#25D366', name:'WhatsApp'},
              ].map((ic,idx) => (
                <div key={ic.name} style={{position:'absolute',transform:`rotate(${idx*72}deg) translateY(-100px)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div className="orb-icon-sq" style={{width:52,height:52,background:ic.bg,animation:'rCW14 14s linear infinite'}}>
                    <img src={ic.src} width="26" height="26" alt={ic.name} style={{filter:'invert(1)',objectFit:'contain'}}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle ring — 6 icons CCW 20s */}
            <div className="orb-ring" style={{animation:'sCCW20 20s linear infinite'}}>
              {[
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg', bg:'#fff', name:'Google', invert:false},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg', bg:'#96BF48', name:'Shopify', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/wordpress.svg', bg:'#21759B', name:'WordPress', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/canva.svg', bg:'#00C4CC', name:'Canva', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg', bg:'#000', name:'X / Twitter', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg', bg:'#F24E1E', name:'Figma', invert:true},
              ].map((ic,idx) => (
                <div key={ic.name} style={{position:'absolute',transform:`rotate(${idx*60}deg) translateY(-170px)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div className="orb-icon-sq" style={{width:56,height:56,background:ic.bg,border:ic.bg==='#fff'?'1px solid #e2e8f0':'none',animation:'rCCW20 20s linear infinite'}}>
                    <img src={ic.src} width="30" height="30" alt={ic.name} style={{filter:ic.invert?'invert(1)':'none',objectFit:'contain'}}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Outer ring — 8 icons CW 28s */}
            <div className="orb-ring" style={{animation:'sCW28 28s linear infinite'}}>
              {[
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleads.svg', bg:'#4285F4', name:'Google Ads', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mailchimp.svg', bg:'#FFE01B', name:'Mailchimp', invert:false},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobephotoshop.svg', bg:'#31A8FF', name:'Photoshop', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hubspot.svg', bg:'#FF7A59', name:'HubSpot', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg', bg:'#E60023', name:'Pinterest', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleanalytics.svg', bg:'#E37400', name:'Analytics', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/discord.svg', bg:'#5865F2', name:'Discord', invert:true},
                {src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/semrush.svg', bg:'#FF642D', name:'SEMrush', invert:true},
              ].map((ic,idx) => (
                <div key={ic.name} style={{position:'absolute',transform:`rotate(${idx*45}deg) translateY(-245px)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div className="orb-icon-sq" style={{width:50,height:50,background:ic.bg,animation:'rCW28 28s linear infinite'}}>
                    <img src={ic.src} width="28" height="28" alt={ic.name} style={{filter:ic.invert?'invert(1)':'none',objectFit:'contain'}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform tags */}
          <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginTop:52,maxWidth:700}}>
            {['Instagram','Facebook','LinkedIn','YouTube','WhatsApp','Google Ads','WordPress','Shopify','Figma','Canva','HubSpot','Mailchimp','Pinterest','Analytics','SEMrush'].map(p=>(
              <span key={p} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:100,padding:'5px 14px',color:'#475569',fontSize:11,fontWeight:600,boxShadow:'0 1px 4px rgba(0,0,0,0.05)'}}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Preview ── */}
      <section style={{ background: '#fff', padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ display: 'block', color: '#F4A100', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Our Work</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Results That Speak</h2>
              <p style={{ color: '#64748b', fontSize: 15 }}>Real clients. Real numbers. Zero fluff.</p>
            </div>
            <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0f172a', fontWeight: 700, fontSize: 13, textDecoration: 'none', borderBottom: '2px solid #0f172a', paddingBottom: 2, whiteSpace: 'nowrap' }}>
              View All Work <FaArrowRight size={10} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { client: 'TechSpark Solutions', industry: 'Technology', metric: '300%', metricLabel: 'Organic Traffic Growth', detail: '6 months · SEO + Content', accent: '#6366f1' },
              { client: 'StyleHouse Fashion', industry: 'Fashion & Retail', metric: '400%', metricLabel: 'ROI Improvement', detail: '8 months · Meta Ads', accent: '#ec4899' },
              { client: 'GreenBuild Infra', industry: 'Real Estate', metric: '120+', metricLabel: 'Leads Per Month', detail: 'Google Ads + Website', accent: '#10b981' },
            ].map((cs, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
                <div style={{ height: 6, background: cs.accent }} />
                <div style={{ padding: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>{cs.client}</div>
                      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cs.industry}</div>
                    </div>
                    <div style={{ background: `${cs.accent}15`, border: `1px solid ${cs.accent}30`, borderRadius: 8, padding: '4px 10px' }}>
                      <span style={{ color: cs.accent, fontSize: 11, fontWeight: 700 }}>Case Study</span>
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
                    <div style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: 900, color: cs.accent, lineHeight: 1 }}>{cs.metric}</div>
                    <div style={{ fontSize: 13, color: '#475569', fontWeight: 600, marginTop: 4 }}>{cs.metricLabel}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                    <span style={{ color: '#64748b', fontSize: 13 }}>{cs.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: '#f8fafc', padding: 'clamp(56px, 8vw, 96px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div style={{ marginBottom: 48 }}>
            <span style={{ display: 'block', color: '#777', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Client Stories</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#111' }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 28, alignItems: 'stretch' }}>
            {tVisible.map((t, i) => (
              <div key={t.id || i} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column', borderRadius: 12, height: '100%', boxSizing: 'border-box' }}>
                <FaQuoteLeft size={22} color="#e2e8f0" style={{ marginBottom: 18, flexShrink: 0 }} />
                <p style={{ color: '#4A4A4A', fontSize: 14, lineHeight: 1.75, flex: 1, marginBottom: 24 }}>"{t.quote || t.review}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div>
                    <div style={{ color: '#111', fontWeight: 700, fontSize: 14 }}>{t.client_name || t.name}</div>
                    <div style={{ color: '#777', fontSize: 12, marginTop: 2 }}>{t.company}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[...Array(t.rating || 5)].map((_, j) => <FaStar key={j} size={12} color="#F4A100" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {tPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <button onClick={() => setTSlide(p => Math.max(0, p - 1))} disabled={tSlide === 0}
                style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid #111', background: tSlide === 0 ? '#e5e5e5' : '#111', color: tSlide === 0 ? '#999' : '#fff', cursor: tSlide === 0 ? 'default' : 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
              {Array.from({ length: tPages }).map((_, p) => (
                <button key={p} onClick={() => setTSlide(p)}
                  style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', background: tSlide === p ? '#111' : '#ccc', cursor: 'pointer', padding: 0 }} />
              ))}
              <button onClick={() => setTSlide(p => Math.min(tPages - 1, p + 1))} disabled={tSlide === tPages - 1}
                style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid #111', background: tSlide === tPages - 1 ? '#e5e5e5' : '#111', color: tSlide === tPages - 1 ? '#999' : '#fff', cursor: tSlide === tPages - 1 ? 'default' : 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(56px, 8vw, 96px) 0', borderTop: '1px solid #2E2E2E' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8" style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', color: '#F4A100', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>Limited Spots Available</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>
            Get Your FREE Digital<br />Marketing Audit Today
          </h2>
          <p style={{ color: '#AAAAAA', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7, fontSize: 15 }}>
            Let our experts analyze your current digital presence and show you exactly how to grow — no commitment, no cost.
          </p>
          {emailSent ? (
            <div style={{ background: '#1E1E1E', border: '1px solid #2E2E2E', padding: '20px 32px', display: 'inline-block', borderRadius: 8 }}>
              <p style={{ color: '#fff', fontWeight: 600 }}>Thank you! We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleAuditSubmit} style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap' }}>
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ flex: 1, minWidth: 200, background: '#1E1E1E', border: '1px solid #2E2E2E', color: '#fff', padding: '12px 16px', fontSize: 14, outline: 'none', borderRadius: 6 }} />
              <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', borderRadius: 6 }}>
                Start Growing →
              </button>
            </form>
          )}
          <p style={{ color: '#555', fontSize: 12, marginTop: 16 }}>clicksemurs@gmail.com · www.clicksemurs.com</p>
        </div>
      </section>
    </div>
  )
}
