import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LogoHero from '../assets/logo1.png';
import LogoOther from '../assets/logo2.png';
import { projects } from '../data/projects';

export default function ProjectNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [isIdle, setIsIdle] = useState(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      if (window.scrollY < 40 && !isHoveredRef.current && location.pathname.startsWith('/projects/')) {
        timeout = setTimeout(() => {
          setIsIdle(true);
        }, 5000);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      isHoveredRef.current = e.clientY < 100;
      resetTimer();
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      resetTimer();
    };

    resetTimer();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleEnquireClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      navigate('/customer-registration');
    }
  };

  const isFaqPage = location.pathname.endsWith('/faqs');
  const forceScrolledStyle = scrolled || isFaqPage;

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: scrolled ? 'rgba(255,255,255,.9)' : (isFaqPage ? 'transparent' : 'rgba(0, 0, 0, 0.15)'),
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    transition: 'transform 0.5s ease, background .5s, box-shadow .5s, padding .5s, top .45s cubic-bezier(.22,.61,.36,1)',
    padding: scrolled ? '13px 0' : '20px 0',
    boxShadow: scrolled ? '0 10px 40px -24px rgba(0,0,0,.22)' : 'none',
    borderBottom: forceScrolledStyle ? '1px solid rgba(20,20,18,.14)' : '1px solid rgba(255, 255, 255, 0.1)',
    transform: isIdle && !scrolled && location.pathname.startsWith('/projects/') ? 'translateY(-100%)' : 'translateY(0)',
  };

  const brandColor = forceScrolledStyle ? 'var(--ink)' : 'var(--paper)';
  const ctaBorder = forceScrolledStyle ? 'var(--ink)' : 'var(--brass)';
  const ctaColor = forceScrolledStyle ? 'var(--ink)' : 'var(--paper)';
  const burgerColor = forceScrolledStyle ? 'var(--ink)' : 'var(--paper)';

  const navLinks = [
    { label: 'Overview', id: 'overview' },
    { label: 'Amenities', id: 'amenities' },
    { label: 'Floor Plans', id: 'configurations' },
    { label: 'Location Advantages', id: 'location' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'FAQs', id: 'faq' },
    // { label: 'Highlights', id: 'highlights' },
  ];

  return (
    <>
      <nav style={navStyle} id="nav" className={forceScrolledStyle ? 'nav scrolled' : 'nav'}>
        <div className="wrap-widescreen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(12px, 2vw, 24px)', flexWrap: 'nowrap' }}>
          {/* Brand */}
          <Link to="/" style={{ textDecoration: 'none', color: brandColor, lineHeight: 1, flexShrink: 0 }}>
            <img src={forceScrolledStyle ? LogoOther : LogoHero} alt="Agarwal Group" style={{ height: '60px', width: 'auto', display: 'block', borderRadius: '6px', transition: 'filter 0.3s ease' }} />
          </Link>

          {/* Right Side Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 24px)' }}>
            {/* Desktop Nav Links */}
            <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 1.8vw, 26px)', whiteSpace: 'nowrap' }}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (isFaqPage) {
                    navigate(`/projects/${location.pathname.split('/')[2]}#${link.id}`);
                  } else {
                    handleNavClick(link.id); 
                  }
                }}
                className="lk"
              >
                {link.label}
              </a>
            ))}
            </div>

            {/* Projects Dropdown & Mobile Burger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Projects Dropdown */}
              <div 
                ref={dropdownRef}
                style={{ position: 'relative' }}
              >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  border: `1px solid ${ctaBorder}`,
                  color: ctaColor,
                  background: 'transparent',
                  padding: 'clamp(8px, 1vw, 11px) clamp(12px, 1.5vw, 22px)',
                  borderRadius: '50px',
                  fontSize: 'clamp(0.7rem, 0.8vw, 0.76rem)',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: '.35s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = scrolled ? 'var(--ink)' : 'var(--brass)';
                  el.style.color = scrolled ? '#fff' : 'var(--pine)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = 'transparent';
                  el.style.color = ctaColor;
                }}
              >
                Our Ongoing Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '12px',
                      background: scrolled ? 'var(--color-paper, #fdfcfa)' : 'rgba(30, 31, 26, 0.4)',
                      backdropFilter: scrolled ? 'none' : 'blur(16px)',
                      WebkitBackdropFilter: scrolled ? 'none' : 'blur(16px)',
                      border: scrolled ? '1px solid var(--color-line-light, #eaeaea)' : '1px solid rgba(220, 188, 124, 0.25)',
                      borderRadius: '16px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      minWidth: '220px',
                      boxShadow: scrolled ? '0 20px 40px -10px rgba(0,0,0,0.1)' : '0 20px 40px -10px rgba(0,0,0,0.3)',
                      zIndex: 101,
                    }}
                  >
                    {projects.filter(p => !location.pathname.includes(p.slug)).map(p => (
                      <Link
                        key={p.slug}
                        to={`/projects/${p.slug}`}
                        style={{
                          padding: '12px 16px',
                          color: scrolled ? 'var(--color-brass-deep, #94762f)' : 'var(--color-brass-bright, #d4bc7c)',
                          textDecoration: 'none',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          borderRadius: '8px',
                          transition: 'background 0.2s, color 0.2s',
                          display: 'block',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = scrolled ? 'var(--color-brass, #d4af37)' : 'rgba(220, 188, 124, 0.15)';
                          e.currentTarget.style.color = scrolled ? 'var(--color-pine, #26302b)' : '#fff';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = scrolled ? 'var(--color-brass-deep, #94762f)' : 'var(--color-brass-bright, #d4bc7c)';
                        }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              background: scrolled ? 'rgba(30, 31, 26, 0.04)' : 'rgba(255, 255, 255, 0.08)',
              border: scrolled ? '1px solid rgba(30, 31, 26, 0.1)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              cursor: 'pointer',
              padding: '0',
              outline: 'none',
              transition: 'background 0.3s, border-color 0.3s'
            }}
            className="burger-btn"
            aria-label="Open menu"
          >
              <span style={{ width: '18px', height: '1.6px', background: burgerColor, display: 'block', transition: '.3s' }} />
              <span style={{ width: '18px', height: '1.6px', background: burgerColor, display: 'block', transition: '.3s' }} />
              <span style={{ width: '18px', height: '1.6px', background: burgerColor, display: 'block', transition: '.3s' }} />
            </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          width: 'min(420px, 100vw)',
          zIndex: 1000,
          background: 'rgba(30, 31, 26, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderLeft: '1px solid rgba(220, 188, 124, 0.15)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 32px 40px',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img src={LogoHero} alt="Agarwal Group" style={{ height: '60px', width: 'auto', display: 'block', borderRadius: '4px' }} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(220, 188, 124, 0.2)',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              fontSize: '1.4rem',
              lineHeight: 1,
              outline: 'none',
              transition: 'background 0.3s, transform 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220, 188, 124, 0.2)'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
          >
            ×
          </button>
        </div>

        {/* Drawer Scrollable Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                fontFamily: '"Fraunces", serif',
                fontSize: '1.5rem',
                fontWeight: 300,
                color: 'rgba(244, 240, 231, 0.9)',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'color .3s, transform 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass-bright)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244, 240, 231, 0.9)'; e.currentTarget.style.transform = 'none'; }}
            >
              <span style={{ fontSize: '0.75rem', fontFamily: '"Inter", sans-serif', color: 'var(--brass)', fontWeight: 600, letterSpacing: '0.1em' }}>0{i + 1}</span>
              {link.label}
            </button>
          ))}
        </div>

        {/* Drawer Footer / CTA */}
        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(220, 188, 124, 0.15)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button
            onClick={handleEnquireClick}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, var(--color-brass-bright), var(--color-brass))',
              color: 'var(--color-pine)',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '50px',
              fontSize: '.78rem',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 20px -8px rgba(182, 142, 63, 0.4)',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(182, 142, 63, 0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(182, 142, 63, 0.4)'; }}
          >
            Enquire Now
          </button>
        </div>
      </div>

      <style>{`
        .nav-links-desktop { display: flex !important; }
        .burger-btn { display: none !important; }
        .burger-btn:focus { outline: none; }
        @media (max-width: 1080px) {
          .nav-links-desktop { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
