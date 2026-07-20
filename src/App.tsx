import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Blog from './pages/Blog';
import ChannelPartner from './pages/ChannelPartner';
import CustomerRegistration from './pages/CustomerRegistration';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Careers from './pages/Careers';
import AboutUs from './pages/AboutUs';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/channel-partner" element={<ChannelPartner />} />
          <Route path="/customer-registration" element={<CustomerRegistration />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Layout>
    </Router>
  );
}
