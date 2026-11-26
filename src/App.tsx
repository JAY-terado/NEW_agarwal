import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import { BlogProvider } from './context/BlogContext';

const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const BlogList = lazy(() => import('./pages/admin/BlogList'));
const AddBlog = lazy(() => import('./pages/admin/AddBlog'));
const EditBlog = lazy(() => import('./pages/admin/EditBlog'));
const NewsletterList = lazy(() => import('./pages/admin/NewsletterList'));
const NewsletterForm = lazy(() => import('./pages/admin/NewsletterForm'));
const SubscriberList = lazy(() => import('./pages/admin/SubscriberList'));
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));
const ChannelPartner = lazy(() => import('./pages/ChannelPartner'));
const CustomerRegistration = lazy(() => import('./pages/CustomerRegistration'));
const SupplierRegistration = lazy(() => import('./pages/SupplierRegistration'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Careers = lazy(() => import('./pages/Careers'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const CompletedProjects = lazy(() => import('./pages/CompletedProjects'));
const FaqPage = lazy(() => import('./pages/FaqPage'));

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
        initial={false}
        animate={{ opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' } }}
        exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.15, ease: 'easeInOut' } }}
      >
        <Suspense fallback={null}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/channel-partner" element={<ChannelPartner />} />
          <Route path="/channel-partner-registration" element={<ChannelPartner />} />
          <Route path="/channel-partner-faqs" element={<ChannelPartner />} />
          <Route path="/customer-registration" element={<CustomerRegistration />} />
          <Route path="/supplier-registration" element={<SupplierRegistration />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/completed-projects" element={<CompletedProjects />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/projects/:slug/faqs" element={<FaqPage />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<BlogList />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/new" element={<AddBlog />} />
            <Route path="blogs/edit/:id" element={<EditBlog />} />
            <Route path="newsletters" element={<NewsletterList />} />
            <Route path="newsletters/new" element={<NewsletterForm />} />
            <Route path="newsletters/edit/:id" element={<NewsletterForm />} />
            <Route path="subscribers" element={<SubscriberList />} />
          </Route>
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    // Disable right-click context menu on images and media
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isMedia =
        target.tagName === 'IMG' ||
        target.tagName === 'VIDEO' ||
        target.tagName === 'PICTURE' ||
        Boolean(target.closest('img, picture, video'));

      if (isMedia) {
        e.preventDefault();
      }
    };

    // Disable dragging images to save or open in new tab
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.tagName === 'IMG' ||
        target.tagName === 'VIDEO' ||
        target.tagName === 'PICTURE' ||
        Boolean(target.closest('img, picture, video'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <BlogProvider>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </BlogProvider>
  );
}
