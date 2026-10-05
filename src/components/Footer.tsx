import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { contactEmailAxios } from '../_api/user';
import Logo from '../assets/logo2.webp';
import SupplierRegistrationModal from './SupplierRegistrationModal';

export default function Footer() {
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [siteVisitSubmitted, setSiteVisitSubmitted] = useState(false);

  const handleSiteVisitSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      mobile_number: formData.get('mobile_number'),
      email: formData.get('email'),
      project: 'Global Footer Site Visit'
    };

    try {
      await contactEmailAxios(data as any);
      setSiteVisitSubmitted(true);
      setTimeout(() => {
        setIsSiteVisitModalOpen(false);
        setSiteVisitSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <footer style={{ background: 'var(--ivory)', color: 'var(--ink-soft)', borderTop: '1px solid var(--line)', padding: 'clamp(64px, 9vh, 100px) 0 30px' }}>
      <div className="wrap-widescreen">
        {/* foot-top: 1.6fr 1fr 1fr 1fr 1fr 1fr */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr 1fr', gap: '40px', paddingBottom: '48px', borderBottom: '1px solid rgba(20,20,18,.12)' }} className="footer-top-grid">
          {/* Brand Column */}
          <div className="foot-brand">
            <img
              src={Logo}
              alt="Agarwal Group"
              style={{ height: 'clamp(28px, 6vw, 40px)', width: 'auto', display: 'block', borderRadius: '6px', marginBottom: '2px' }}
            />
            <p style={{ marginTop: '18px', fontSize: '.92rem', fontWeight: 300, fontStyle: 'italic', fontFamily: '"Fraunces", serif', maxWidth: '36ch', color: 'var(--ink-soft)' }}>
              "Agarwal Group is a trusted real estate developer in Mumbai and Vasai-Virar MMR Mumbai Metropolitan Region with over 48+ years of experience delivering RERA-registered residential and commercial projects. Explore premium 1, 2, 3 & 4 BHK apartments in Virar, Vasai and Mumbai designed for modern families."
            </p>
            <address style={{ marginTop: '18px', fontStyle: 'normal', fontSize: '.86rem', fontWeight: 300, lineHeight: 1.7 }}>
              9, Gokul Annexe, Agarwal Gardens,<br />
              Opp. Muljibhai Mehta School,<br />
              Gokul Township, Virar (W),<br />
              Maharashtra - 401303, India
            </address>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
              <a href="tel:+918408008001" style={{ display: 'inline-block', fontWeight: 300, color: 'var(--ink-soft)', transition: 'all 0.3s ease', fontFamily: '"Fraunces", serif', fontSize: '1.05rem', transform: 'translateX(0)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass-deep)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                +91 84080 08001
              </a>

              <a href="tel:+918408008002" style={{ display: 'inline-block', fontWeight: 300, color: 'var(--ink-soft)', transition: 'all 0.3s ease', fontFamily: '"Fraunces", serif', fontSize: '1.05rem', transform: 'translateX(0)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass-deep)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                +91 84080 08002
              </a>

              <a href="tel:+918408008003" style={{ display: 'inline-block', fontWeight: 300, color: 'var(--ink-soft)', transition: 'all 0.3s ease', fontFamily: '"Fraunces", serif', fontSize: '1.05rem', transform: 'translateX(0)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass-deep)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                +91 84080 08003
              </a>

              <a href="mailto:sales@agarwalrealties.com" style={{ display: 'inline-block', fontSize: '.9rem', fontWeight: 300, color: 'var(--ink-soft)', transition: 'all 0.3s ease', transform: 'translateX(0)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass-deep)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                sales@agarwalrealties.com
              </a>
            </div>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {/* Instagram */}
              <a href="https://www.instagram.com/agarwalrealties" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={{ width: '38px', height: '38px', border: '1px solid rgba(20,20,18,.12)', borderRadius: '50%', display: 'grid', placeItems: 'center', transition: '.3s', color: 'var(--ink-soft)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brass)'; (e.currentTarget as HTMLElement).style.background = 'var(--brass)'; (e.currentTarget as HTMLElement).style.color = 'var(--pine)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,20,18,.12)'; (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--ink-soft)'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/agarwalbuilders" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                style={{ width: '38px', height: '38px', border: '1px solid rgba(20,20,18,.12)', borderRadius: '50%', display: 'grid', placeItems: 'center', transition: '.3s', color: 'var(--ink-soft)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brass)'; (e.currentTarget as HTMLElement).style.background = 'var(--brass)'; (e.currentTarget as HTMLElement).style.color = 'var(--pine)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,20,18,.12)'; (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--ink-soft)'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 13.5h2.5l1-4H14V7c0-1 .5-2 2-2h1.5V1.6S16 1.5 14.7 1.5C11.8 1.5 10 3.3 10 6.5v3H7v4h3V22h4z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="https://twitter.com/agarwalrealties" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"
                style={{ width: '38px', height: '38px', border: '1px solid rgba(20,20,18,.12)', borderRadius: '50%', display: 'grid', placeItems: 'center', transition: '.3s', color: 'var(--ink-soft)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brass)'; (e.currentTarget as HTMLElement).style.background = 'var(--brass)'; (e.currentTarget as HTMLElement).style.color = 'var(--pine)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,20,18,.12)'; (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--ink-soft)'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7.3 8.3L23 22h-6.4l-5-6.5L5.8 22H2.6l7.8-8.9L1.6 2H8l4.6 6zM17.8 20.1h1.7L7.3 3.8H5.5z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/channel/UCj-wEBAbQJfNRrpoSg7ESew" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                style={{ width: '38px', height: '38px', border: '1px solid rgba(20,20,18,.12)', borderRadius: '50%', display: 'grid', placeItems: 'center', transition: '.3s', color: 'var(--ink-soft)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brass)'; (e.currentTarget as HTMLElement).style.background = 'var(--brass)'; (e.currentTarget as HTMLElement).style.color = 'var(--pine)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,20,18,.12)'; (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--ink-soft)'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.8 15.3V8.7l5.7 3.3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Ongoing Projects */}
          <div className="foot-col">
            <h5 style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: '18px' }}>
              Ongoing Projects
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { to: '/projects/infinity', label: 'Agarwal Infinity' },
                { to: '/projects/sky-heights', label: 'Agarwal Sky Heights' },
                { to: '/projects/skyrise', label: 'Agarwal Skyrise' },
                { to: '/projects/horizon', label: 'Agarwal Horizon' },
              ].map(link => {
                const isHorizon = link.to === '/projects/horizon';
                const Wrapper = isHorizon ? 'span' : Link;
                const wrapperProps = isHorizon ? {} : { to: link.to, onClick: () => window.scrollTo(0, 0) };

                return (
                  <Wrapper key={link.to} {...(wrapperProps as any)}
                    style={{ display: 'inline-block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'all 0.3s ease', textDecoration: 'none', transform: 'translateX(0)', cursor: isHorizon ? 'default' : 'pointer' }}
                    onMouseEnter={e => { if (isHorizon) return; e.currentTarget.style.color = 'var(--brass)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                    onMouseLeave={e => { if (isHorizon) return; e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    {link.label}
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="foot-col">
            <h5 style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: '18px' }}>
              Quick Links
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/about-us', label: 'About Us' },
                { to: '/projects', label: 'Ongoing Projects' },
                { to: '/completed-projects', label: 'Completed Projects' },
                { to: '/blogs', label: 'Blogs' },
                { to: '/careers', label: 'Careers' },
                { to: '/supplier-registration', label: 'Supplier/Contractor Registration' },
              ].map((link, i) => (
                link.to === '/supplier-registration' ? (
                  <button key={i} onClick={() => setIsSupplierModalOpen(true)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'inline-block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'all 0.3s ease', textDecoration: 'none', transform: 'translateX(0)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    {link.label}
                  </button>
                ) : (
                  <Link key={i} to={link.to}
                    onClick={() => window.scrollTo(0, 0)}
                    style={{ display: 'inline-block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'all 0.3s ease', textDecoration: 'none', transform: 'translateX(0)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Column 4: Channel Partners */}
          <div className="foot-col">
            <h5 style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: '18px' }}>
              Channel Partners
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { to: '/channel-partner', label: 'Overview' },
                { to: '/channel-partner#why-partner', label: 'Why Partner with us' },
                { to: '/channel-partner#portfolio', label: 'Portfolio' },
                { to: '/channel-partner#benefits', label: 'Benefits' },
                { to: '/channel-partner#register', label: 'Register' },
                { to: '/channel-partner#faqs', label: 'FAQs' },
              ].map((link, i) => (
                <Link key={i} to={link.to}
                  onClick={() => {
                    if (!link.to.includes('#')) {
                      window.scrollTo(0, 0);
                    }
                  }}
                  style={{ display: 'inline-block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'all 0.3s ease', textDecoration: 'none', transform: 'translateX(0)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 5: Customer Care */}
          <div className="foot-col">
            <h5 style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: '18px' }}>
              Customer Care
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { to: '/faqs', label: 'FAQs' },
                { to: '#site-visit', label: 'Book Site Visit' },
                { to: '#enquire', label: 'Contact Us' },
              ].map((link, i) => (
                <Link key={i} to={link.to}
                  onClick={(e) => {
                    if (link.to === '#enquire') {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('openEnquireModal'));
                    } else if (link.to === '#site-visit') {
                      e.preventDefault();
                      setIsSiteVisitModalOpen(true);
                    } else {
                      window.scrollTo(0, 0);
                    }
                  }}
                  style={{ display: 'inline-block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'all 0.3s ease', textDecoration: 'none', transform: 'translateX(0)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 6: Legal */}
          <div className="foot-col">
            <h5 style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: '18px' }}>
              Legal
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms-conditions', label: 'Terms & Conditions' },
                { to: '/disclaimer', label: 'Disclaimer' },
                { to: '/sitemap', label: 'Sitemap' },
              ].map((link, i) => (
                <Link key={i} to={link.to}
                  onClick={() => window.scrollTo(0, 0)}
                  style={{ display: 'inline-block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'all 0.3s ease', textDecoration: 'none', transform: 'translateX(0)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '12px', paddingTop: '24px', fontSize: '.78rem', fontWeight: 300 }}>
          <span>© 2026 Agarwal Group. All rights reserved.</span>
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <SupplierRegistrationModal isOpen={isSupplierModalOpen} onClose={() => setIsSupplierModalOpen(false)} />
      
      {/* Book Site Visit Modal */}
      <AnimatePresence>
        {isSiteVisitModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="testimonial-modal-backdrop"
            onClick={() => setIsSiteVisitModalOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: '20px' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="form"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--color-ivory)', border: '1px solid var(--color-line)', borderRadius: '8px', padding: 'clamp(26px, 4vw, 42px)', paddingBottom: '24px', width: '100%', maxWidth: '500px', margin: 'auto', position: 'relative', top: 0, overflowY: 'auto', maxHeight: '90vh'
              }}
            >
              <button
                onClick={() => setIsSiteVisitModalOpen(false)}
                aria-label="Close modal"
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-ink)', padding: '4px' }}
              >
                <X size={24} />
              </button>

              <div className="ft serif" style={{ fontFamily: '"Fraunces", serif', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-ink)', paddingBottom: '4px', lineHeight: 1.4 }}>
                Request an <span className="text-brass">Immediate Callback</span> Pre Reserving Your Site Visit.
              </div>
              <div className="fsub" style={{ fontSize: '.86rem', color: 'var(--color-ink-soft)', paddingBottom: '20px', marginBottom: '20px', fontWeight: 300, borderBottom: '1px solid var(--color-line)' }}>
                Share your details and our relationship manager will contact you soon.
              </div>
              <AnimatePresence mode="wait">
                {!siteVisitSubmitted ? (
                  <form onSubmit={handleSiteVisitSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ display: 'block', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600 }}>Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Full Name"
                        style={{ width: '100%', border: '1px solid var(--color-line)', borderRadius: '4px', padding: '13px 15px', fontSize: '.95rem', fontFamily: 'inherit', color: 'var(--color-ink)', outline: 'none', background: '#ffffff' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ display: 'block', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600 }}>Mobile Number*</label>
                      <div style={{ display: 'flex', border: '1px solid var(--color-line)', borderRadius: '4px', overflow: 'hidden', background: '#ffffff' }}>
                        <span style={{ display: 'flex', alignItems: 'center', background: 'var(--color-ivory)', borderRight: '1px solid var(--color-line)', fontSize: '.95rem', fontWeight: 500, color: 'var(--color-ink)', padding: '0 13px', userSelect: 'none' }}>+91</span>
                        <input
                          type="tel"
                          name="mobile_number"
                          required
                          maxLength={10}
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit mobile number"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
                          }}
                          placeholder="00000 00000"
                          style={{ width: '100%', flex: 1, border: 'none', padding: '13px 15px', fontSize: '.95rem', fontFamily: 'inherit', color: 'var(--color-ink)', outline: 'none', background: 'transparent' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ display: 'block', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600 }}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address (e.g. name@example.com)"
                        placeholder="you@email.com"
                        style={{ width: '100%', border: '1px solid var(--color-line)', borderRadius: '4px', padding: '13px 15px', fontSize: '.95rem', fontFamily: 'inherit', color: 'var(--color-ink)', outline: 'none', background: '#ffffff' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="pcta-btn btn-enquire"
                      style={{ width: '100%' }}
                    >
                      <span>Book Site Visit</span>
                      <span className="arr">→</span>
                    </button>
                    <div style={{ fontSize: '.7rem', color: 'var(--color-taupe)', textAlign: 'center', lineHeight: 1.4, }}>
                      By Clicking Above Button, I Authorize Agarwal Group And Its Representatives To Call, SMS, Email Or Whatsapp Me About Its Products And Offers. This Consent Overrides Any Registration For DND NDNC.
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 0', gap: '16px' }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'rgb(16, 185, 129)', display: 'grid', placeItems: 'center', margin: '0 auto' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="serif" style={{ fontFamily: '"Fraunces", serif', fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-ink)' }}>Callback Requested!</h3>
                    <p style={{ fontSize: '.86rem', color: 'var(--color-ink-soft)', lineHeight: 1.6 }}>
                      Thank you! Your details have been submitted. Our relationship manager will reach out shortly to schedule your site visit.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
