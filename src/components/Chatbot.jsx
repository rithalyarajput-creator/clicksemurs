import { useState } from 'react'
import { supabase } from '../admin/supabase'

const BOT_NAME = 'Clicksemurs Bot'
const WELCOME = "Hi! Welcome to Clicksemurs. How can I help you today?"

const QUICK_REPLIES = [
  "Get a Free Audit",
  "View Our Services",
  "Pricing & Packages",
  "Talk to an Expert",
]

const BOT_RESPONSES = {
  "get a free audit": {
    text: "We'd love to audit your digital presence for free! Please share your name, email and website URL.",
    collect: true,
  },
  "view our services": {
    text: "We offer: Social Media Marketing, SEO, PPC/Paid Ads, Website Design, Content Marketing, Video Marketing & more. Which interests you?",
    followUp: ["Social Media", "SEO", "PPC / Ads", "Website Design"],
  },
  "pricing & packages": {
    text: "Our packages start from ₹15,000/month. We offer Starter, Growth, and Enterprise plans. Want details on a specific plan?",
    followUp: ["Starter Plan", "Growth Plan", "Enterprise Plan"],
  },
  "talk to an expert": {
    text: "Sure! Our experts are available Mon-Sat 10am-7pm IST. Leave your contact and we'll call you back within 2 hours.",
    collect: true,
  },
  "social media": {
    text: "Our Social Media Marketing service covers Instagram, Facebook, LinkedIn & YouTube — content creation, ads, and growth strategy. Want a free consultation?",
    followUp: ["Yes, Book Consultation", "What's the pricing?"],
  },
  "seo": {
    text: "Our SEO services include technical SEO, on-page optimization, link building & monthly reporting. Average client sees 3x traffic in 6 months.",
    followUp: ["Get Free SEO Audit", "What's the pricing?"],
  },
  "ppc / ads": {
    text: "We manage Google Ads, Meta Ads & more. Average ROI is 4x. We only charge management fee — no hidden costs.",
    followUp: ["Get Free Ad Audit", "What's the pricing?"],
  },
  "website design": {
    text: "We build fast, modern websites starting from ₹25,000. Includes design, development, SEO setup & 1 month support.",
    followUp: ["Get a Quote", "See Portfolio"],
  },
}

function getBotReply(msg) {
  const key = msg.toLowerCase().trim()
  for (const k of Object.keys(BOT_RESPONSES)) {
    if (key.includes(k)) return BOT_RESPONSES[k]
  }
  return {
    text: "Thanks for your message! Our team will get back to you shortly. You can also reach us at hello@clicksemurs.com or call +91 XXXXX XXXXX.",
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: WELCOME, followUp: QUICK_REPLIES }
  ])
  const [input, setInput] = useState('')
  const [collecting, setCollecting] = useState(false)
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '' })
  const [collectStep, setCollectStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [unread, setUnread] = useState(1)

  const addMsg = (from, text, extra = {}) => {
    setMessages(p => [...p, { from, text, ...extra }])
  }

  const handleOpen = () => { setOpen(true); setUnread(0) }

  const sendMessage = (text) => {
    if (!text.trim()) return
    addMsg('user', text)
    setInput('')

    if (collecting) {
      handleCollect(text)
      return
    }

    setTimeout(() => {
      const reply = getBotReply(text)
      addMsg('bot', reply.text, { followUp: reply.followUp })
      if (reply.collect) {
        setCollecting(true)
        setCollectStep(0)
        setTimeout(() => addMsg('bot', "Let's start — what's your name?"), 600)
      }
    }, 500)
  }

  const handleCollect = (val) => {
    if (collectStep === 0) {
      setLeadData(p => ({ ...p, name: val }))
      setCollectStep(1)
      setTimeout(() => addMsg('bot', `Nice to meet you, ${val}! What's your email address?`), 400)
    } else if (collectStep === 1) {
      setLeadData(p => ({ ...p, email: val }))
      setCollectStep(2)
      setTimeout(() => addMsg('bot', "And your phone number? (optional, press Enter to skip)"), 400)
    } else if (collectStep === 2) {
      const phone = val === '' ? '' : val
      const finalData = { ...leadData, phone }
      setLeadData(finalData)
      setCollecting(false)
      setCollectStep(0)
      supabase.from('leads').insert([{
        name: finalData.name,
        email: finalData.email,
        phone: finalData.phone,
        service: 'Chatbot Lead',
        message: 'Lead captured via chatbot',
        is_read: false
      }])
      setSubmitted(true)
      setTimeout(() => addMsg('bot', `Thank you ${finalData.name}! Our team will contact you at ${finalData.email} within 2 hours. Is there anything else I can help with?`, { followUp: QUICK_REPLIES }), 400)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      if (collecting && collectStep === 2 && input === '') {
        handleCollect('')
      } else {
        sendMessage(input)
      }
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => open ? setOpen(false) : handleOpen()}
        style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 999,
          width: 52, height: 52, borderRadius: '50%',
          background: open ? '#374151' : '#0f172a',
          border: '2px solid rgba(255,255,255,0.15)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        title="Chat with us"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4, width: 18, height: 18,
            background: '#ef4444', borderRadius: '50%', color: '#fff',
            fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #fff'
          }}>{unread}</span>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, left: 24, zIndex: 998,
          width: 340, height: 480, background: '#fff',
          borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          {/* Header */}
          <div style={{ background: '#0f172a', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F4A100', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{BOT_NAME}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                <span style={{ color: '#94a3b8', fontSize: 11 }}>Online · Usually replies instantly</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}
            ref={el => el && (el.scrollTop = el.scrollHeight)}>
            {messages.map((m, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%', padding: '9px 13px', borderRadius: m.from === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    background: m.from === 'user' ? '#0f172a' : '#f1f5f9',
                    color: m.from === 'user' ? '#fff' : '#1e293b',
                    fontSize: 13, lineHeight: 1.5
                  }}>{m.text}</div>
                </div>
                {m.followUp && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {m.followUp.map((q, j) => (
                      <button key={j} onClick={() => sendMessage(q)} style={{
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
                        padding: '5px 12px', fontSize: 12, cursor: 'pointer', color: '#0f172a',
                        fontWeight: 500, transition: 'all 0.15s'
                      }}>{q}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ borderTop: '1px solid #e2e8f0', padding: '10px 12px', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={collecting && collectStep === 2 ? "Phone (or press Enter to skip)" : "Type a message..."}
              style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: 20, padding: '8px 14px', fontSize: 13, outline: 'none', color: '#0f172a' }}
            />
            <button onClick={() => sendMessage(input)} style={{
              width: 36, height: 36, borderRadius: '50%', background: '#0f172a', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
