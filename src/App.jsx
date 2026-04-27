import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Chatbot from './components/Chatbot'

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
import AdminHomeContent from './admin/AdminHomeContent'
import AdminFooterSettings from './admin/AdminFooterSettings'
import AdminFAQs from './admin/AdminFAQs'
import AdminJobs from './admin/AdminJobs'
import AdminApplications from './admin/AdminApplications'
import AdminNewsletter from './admin/AdminNewsletter'
import AdminChatbotLeads from './admin/AdminChatbotLeads'
import AdminSEO from './admin/AdminSEO'
import AdminStats from './admin/AdminStats'
import AdminCMSPages from './admin/AdminCMSPages'
import AdminMediaLibrary from './admin/AdminMediaLibrary'
import AdminAuthors from './admin/AdminAuthors'
import AdminCategories from './admin/AdminCategories'
import AdminAbout from './admin/AdminAbout'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
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
        <Route path="/admin/blogs/new" element={<AdminGuard><AdminBlogs startNew /></AdminGuard>} />
        <Route path="/admin/testimonials" element={<AdminGuard><AdminTestimonials /></AdminGuard>} />
        <Route path="/admin/portfolio" element={<AdminGuard><AdminPortfolio /></AdminGuard>} />
        <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
        <Route path="/admin/home-content" element={<AdminGuard><AdminHomeContent /></AdminGuard>} />
        <Route path="/admin/footer" element={<AdminGuard><AdminFooterSettings /></AdminGuard>} />
        <Route path="/admin/faqs" element={<AdminGuard><AdminFAQs /></AdminGuard>} />
        <Route path="/admin/jobs" element={<AdminGuard><AdminJobs /></AdminGuard>} />
        <Route path="/admin/applications" element={<AdminGuard><AdminApplications /></AdminGuard>} />
        <Route path="/admin/newsletter" element={<AdminGuard><AdminNewsletter /></AdminGuard>} />
        <Route path="/admin/chatbot-leads" element={<AdminGuard><AdminChatbotLeads /></AdminGuard>} />
        <Route path="/admin/seo/meta" element={<AdminGuard><AdminSEO section="meta" /></AdminGuard>} />
        <Route path="/admin/seo/keywords" element={<AdminGuard><AdminSEO section="keywords" /></AdminGuard>} />
        <Route path="/admin/seo/health" element={<AdminGuard><AdminSEO section="health" /></AdminGuard>} />
        <Route path="/admin/stats" element={<AdminGuard><AdminStats /></AdminGuard>} />
        <Route path="/admin/cms-pages" element={<AdminGuard><AdminCMSPages /></AdminGuard>} />
        <Route path="/admin/media" element={<AdminGuard><AdminMediaLibrary /></AdminGuard>} />
        <Route path="/admin/authors" element={<AdminGuard><AdminAuthors /></AdminGuard>} />
        <Route path="/admin/categories" element={<AdminGuard><AdminCategories /></AdminGuard>} />
        <Route path="/admin/about" element={<AdminGuard><AdminAbout /></AdminGuard>} />

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
