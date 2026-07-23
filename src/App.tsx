import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLayout from './pages/admin/AdminLayout';
import BlogList from './pages/admin/BlogList';
import AddBlog from './pages/admin/AddBlog';
import { BlogProvider } from './context/BlogContext';
import ChannelPartner from './pages/ChannelPartner';
import CustomerRegistration from './pages/CustomerRegistration';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Careers from './pages/Careers';
import AboutUs from './pages/AboutUs';
import CompletedProjects from './pages/CompletedProjects';

function AnimatedRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' } }}
        exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.15, ease: 'easeInOut' } }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/channel-partner" element={<ChannelPartner />} />
          <Route path="/customer-registration" element={<CustomerRegistration />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/completed-projects" element={<CompletedProjects />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<BlogList />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/new" element={<AddBlog />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BlogProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </BlogProvider>
  );
}
