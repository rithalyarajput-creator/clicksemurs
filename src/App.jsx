import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Portfolio from './pages/Portfolio'
import Industries from './pages/Industries'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'

import AdminLogin from './admin/AdminLogin'
import AdminGuard from './admin/AdminGuard'
import AdminDashboard from './admin/AdminDashboard'
import AdminLeads from './admin/AdminLeads'
import AdminBlogs from './admin/AdminBlogs'
import AdminTestimonials from './admin/AdminTestimonials'
import AdminPortfolio from './admin/AdminPortfolio'
import AdminSettings from './admin/AdminSettings'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
        <Route path="/admin/leads" element={<AdminGuard><AdminLeads /></AdminGuard>} />
        <Route path="/admin/blogs" element={<AdminGuard><AdminBlogs /></AdminGuard>} />
        <Route path="/admin/testimonials" element={<AdminGuard><AdminTestimonials /></AdminGuard>} />
        <Route path="/admin/portfolio" element={<AdminGuard><AdminPortfolio /></AdminGuard>} />
        <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
        <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
        <Route path="/industries" element={<PublicLayout><Industries /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      </Routes>
    </Router>
  )
}
