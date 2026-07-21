import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import Logo from '../assets/Agarwal_Group_Logo.png';

import infinityHero from '../assets/agarwal-infinity-hero.jpg';
import skyriseHero from '../assets/agarwal-skyrise-hero.jpg';
import skyHeightsHero from '../assets/agarwal-sky-heights-hero.jpg';
import horizonHero from '../assets/agarwal-horizon-hero.jpg';

const projectImages: Record<string, string> = {
  infinity: infinityHero,
  skyrise: skyriseHero,
  'sky-heights': skyHeightsHero,
  horizon: horizonHero,
};

// Completed projects list from original site
const completedProjects = [
  { name: 'Agarwal Paramount', sub: 'Virar West', href: '/completed-projects' },
  { name: 'Agarwal Exotica', sub: 'Vasai East', href: '/completed-projects' },
  { name: 'Agarwal Lifestyle', sub: 'Virar West', href: '/completed-projects' },
  { name: 'Agarwal Yashwant Hts.', sub: 'Virar', href: '/completed-projects' },
  { name: 'Agarwal Meadows', sub: 'Virar West', href: '/completed-projects' },
  { name: 'Agarwal Nagri', sub: 'Vasai East', href: '/completed-projects' },
  { name: 'Viva Vrindavan', sub: 'Virar Township', href: '/completed-projects' },
  { name: 'Gokul Solitaire', sub: 'Virar', href: '/completed-projects' },
  { name: 'Gokul Sapphire', sub: 'Virar', href: '/completed-projects' },
  { name: 'Vrindavan Gardens', sub: 'Vasai', href: '/completed-projects' },
  { name: 'Agarwal Residency', sub: 'Vasai', href: '/completed-projects' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOngoingOpen, setMobileOngoingOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const megaTimer = useRef<number | null>(null);
  const ddTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileOngoingOpen(false);
    setMegaOpen(false);
    setDdOpen(false);
  }, [location]);

  // Scroll to section or scroll to top on path change (useful when navigating from other pages to home anchors)
  useEffect(() => {
    const paths = ['/story', '/projects', '/contact'];
    if (paths.includes(location.pathname)) {
      const id = location.pathname.replace('/', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const handleNavClick = (pathId: string) => {
    if (location.pathname === `/${pathId}`) {
      const el = document.getElementById(pathId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireClick = () => {
    if (location.pathname.startsWith('/projects/')) {
      const el = document.getElementById('project-enquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    if (location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/customer-registration');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    const paths = ['/story', '/projects', '/contact', '/'];
    if (paths.includes(location.pathname)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
    }
  };

  // Delay closing so user can move mouse from trigger to panel
  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  };
  const openDd = () => {
    if (ddTimer.current) clearTimeout(ddTimer.current);
    setDdOpen(true);
  };
  const closeDd = () => {
    ddTimer.current = window.setTimeout(() => setDdOpen(false), 120);
  };

  // Check if current page needs light navbar by default
  const isLightHero = location.pathname === '/completed-projects';
  const forceScrolledStyle = scrolled || isLightHero;

  // Nav base: transparent/blur; scrolled: white glass
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: forceScrolledStyle ? 'rgba(255,255,255,.9)' : 'rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    transition: 'background .5s, box-shadow .5s, padding .5s, top .45s cubic-bezier(.22,.61,.36,1)',
    padding: scrolled ? '13px 0' : '20px 0',
    boxShadow: scrolled ? '0 10px 40px -24px rgba(0,0,0,.22)' : 'none',
    borderBottom: forceScrolledStyle ? '1px solid rgba(20,20,18,.14)' : '1px solid rgba(255, 255, 255, 0.1)',
  };

  const brandColor = forceScrolledStyle ? 'var(--ink)' : 'var(--paper)';
  const ctaBorder = forceScrolledStyle ? 'var(--ink)' : 'var(--brass)';
  const ctaColor = forceScrolledStyle ? 'var(--ink)' : 'var(--paper)';
  const burgerColor = forceScrolledStyle ? 'var(--ink)' : 'var(--paper)';

  return (
    <>
      {/* NAV */}
      <nav style={navStyle} id="nav" className={forceScrolledStyle ? 'nav scrolled' : 'nav'}>
        <div className="wrap-widescreen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(12px, 2vw, 24px)' }}>
          {/* Brand */}
          <Link to="/" onClick={handleLogoClick} style={{ textDecoration: 'none', color: brandColor, lineHeight: 1 }}>
            <img src={Logo} alt="Agarwal Group" style={{ height: '42px', width: 'auto', display: 'block', borderRadius: '6px' }} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 1.8vw, 26px)' }}>
            <Link
              to="/about-us"
              onClick={() => handleNavClick('about-us')}
              className={`lk ${location.pathname === '/about-us' ? 'active' : ''}`}
            >
              About Us
            </Link>

            {/* Ongoing Projects - mega trigger */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <Link
                to="/projects"
                onClick={() => handleNavClick('projects')}
                className={`lk dd-toggle ${location.pathname === '/projects' ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                Ongoing Projects
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'transform .3s', transform: megaOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
            </div>

            {/* Completed Projects - dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={openDd}
              onMouseLeave={closeDd}
            >
              <Link
                to="/completed-projects"
                onClick={() => handleNavClick('completed-projects')}
                className={`lk dd-toggle ${location.pathname === '/completed-projects' ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                Completed Projects
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'transform .3s', transform: ddOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>

              {/* Dropdown Panel */}
              {ddOpen && (
                <div
                  onMouseEnter={openDd}
                  onMouseLeave={closeDd}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: 0,
                    width: 'min(600px, 80vw)',
                    background: 'var(--paper)',
                    border: '1px solid rgba(20,20,18,.14)',
                    borderRadius: '8px',
                    boxShadow: '0 30px 70px -26px rgba(20,20,18,.42)',
                    padding: '22px 22px 18px',
                    zIndex: 130,
                  }}
                >
                  {/* Arrow */}
                  <div style={{ position: 'absolute', top: '-7px', left: '42px', width: '13px', height: '13px', background: 'var(--paper)', borderLeft: '1px solid rgba(20,20,18,.14)', borderTop: '1px solid rgba(20,20,18,.14)', transform: 'rotate(45deg)' }} />
                  <div style={{ fontSize: '.66rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--brass-deep)', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    Delivered Landmarks · 26+ Projects
                    <div style={{ flex: 1, height: '1px', background: 'rgba(20,20,18,.14)' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px 14px' }}>
                    {completedProjects.map(p => (
                      <Link key={p.name} to={p.href}
                        style={{ display: 'block', padding: '8px 10px', borderRadius: '5px', textDecoration: 'none', transition: 'background .25s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--ivory)')}
                        onMouseLeave={e => (e.currentTarget.style.background = '')}>
                        <b style={{ display: 'block', fontFamily: '"Fraunces", serif', fontWeight: 500, fontSize: '.9rem', color: 'var(--ink)', lineHeight: 1.2 }}>{p.name}</b>
                        <span style={{ fontSize: '.7rem', color: 'var(--taupe)' }}>{p.sub}</span>
                      </Link>
                    ))}
                  </div>
                  <div style={{ marginTop: '14px', paddingTop: '13px', borderTop: '1px solid rgba(20,20,18,.14)', textAlign: 'right' }}>
                    <Link to="/completed-projects"
                      style={{ fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--brass-deep)', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--brass-deep)')}>
                      View all completed projects →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/blogs"
              className={`lk ${location.pathname === '/blogs' ? 'active' : ''}`}
            >
              Blogs
            </Link>

            <Link
              to="/channel-partner"
              className={`lk ${location.pathname === '/channel-partner' ? 'active' : ''}`}
            >
              Channel Partner
            </Link>

            <Link
              to="/contact"
              onClick={() => handleNavClick('contact')}
              className={`lk ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact Us
            </Link>

            {/* CTA Button */}
            <button
              onClick={handleEnquireClick}
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
              Enquire Now
            </button>
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

        {/* MEGA PANEL for Ongoing Projects */}
        <div
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--paper)',
            borderTop: '1px solid rgba(20,20,18,.14)',
            borderBottom: '1px solid rgba(20,20,18,.14)',
            boxShadow: '0 38px 60px -34px rgba(20,20,18,.42)',
            padding: '28px 0 32px',
            opacity: megaOpen ? 1 : 0,
            visibility: megaOpen ? 'visible' : 'hidden',
            transform: megaOpen ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity .35s, transform .35s, visibility .35s',
            zIndex: 90,
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
              <span style={{ fontSize: '.68rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--brass-deep)', fontWeight: 600 }}>Ongoing Projects</span>
              <Link to="/" onClick={() => handleNavClick('projects')}
                style={{ fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--pine)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--brass-deep)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--pine)')}>
                View all projects →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '22px' }}>
              {projects.map(proj => (
                <Link key={proj.slug} to={`/projects/${proj.slug}`} style={{ display: 'block', textDecoration: 'none' }}
                  onMouseEnter={e => {
                    const h4 = e.currentTarget.querySelector('h4') as HTMLElement;
                    if (h4) h4.style.color = 'var(--brass-deep)';
                    const img = e.currentTarget.querySelector('img') as HTMLElement;
                    if (img) img.style.transform = 'scale(1.07)';
                  }}
                  onMouseLeave={e => {
                    const h4 = e.currentTarget.querySelector('h4') as HTMLElement;
                    if (h4) h4.style.color = 'var(--ink)';
                    const img = e.currentTarget.querySelector('img') as HTMLElement;
                    if (img) img.style.transform = 'scale(1)';
                  }}>
                  {/* mc-img */}
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden', borderRadius: '6px', marginBottom: '12px', position: 'relative', background: '#e7e1d4' }}>
                    <img
                      src={projectImages[proj.slug]}
                      alt={proj.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .9s', display: 'block' }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <span style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(20,20,18,.66)', color: '#fff', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '3px' }}>
                      {proj.status}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: '"Fraunces", serif', fontWeight: 500, fontSize: '1.04rem', color: 'var(--ink)', lineHeight: 1.16, transition: 'color .3s' }}>{proj.name}</h4>
                  <div style={{ fontSize: '.74rem', color: 'var(--taupe)', marginTop: '2px' }}>{proj.location}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginTop: '7px', display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                    <span style={{ color: 'var(--brass-deep)', fontWeight: 600, fontFamily: '"Fraunces", serif', fontSize: '.92rem' }}>{proj.startingPrice}</span>
                    <span>{proj.config}</span>
                  </div>
                </Link>
              ))}
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
        className="mobile-drawer"
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img src={Logo} alt="Agarwal Group" style={{ height: '36px', width: 'auto', display: 'block', borderRadius: '4px' }} />
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
          {[
            { label: 'About Us', to: '/about-us', pathId: 'story', index: '01' },
            { label: 'Ongoing Projects', isAccordion: true, items: projects, index: '02' },
            { label: 'Completed Projects', to: '/completed-projects', index: '03' },
            { label: 'Blogs', to: '/blogs', index: '04' },
            { label: 'Channel Partner', to: '/channel-partner', index: '05' },
            { label: 'Contact Us', to: '/contact', pathId: 'contact', index: '06' },
          ].map(item => {
            if (item.isAccordion) {
              return (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={() => setMobileOngoingOpen(!mobileOngoingOpen)}
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
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'color .3s, transform 0.3s',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontFamily: '"Inter", sans-serif', color: 'var(--brass)', fontWeight: 600, letterSpacing: '0.1em' }}>{item.index}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform .3s', transform: mobileOngoingOpen ? 'rotate(180deg)' : 'none', opacity: 0.7 }}>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileOngoingOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '1px solid rgba(220, 188, 124, 0.2)', paddingLeft: '14px', marginLeft: '4px', marginTop: '16px', marginBottom: '8px' }}>
                          {item.items?.map(p => (
                            <Link
                              key={p.slug}
                              to={`/projects/${p.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              style={{
                                fontSize: '0.92rem',
                                color: 'rgba(244, 240, 231, 0.7)',
                                textDecoration: 'none',
                                transition: 'color 0.3s, transform 0.3s',
                                display: 'block'
                              }}
                              onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass-bright)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244, 240, 231, 0.7)'; e.currentTarget.style.transform = 'none'; }}
                            >
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.to as string}
                onClick={() => { setMobileMenuOpen(false); if (item.pathId) handleNavClick(item.pathId); }}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px',
                  fontFamily: '"Fraunces", serif',
                  fontSize: '1.5rem',
                  fontWeight: 300,
                  color: 'rgba(244, 240, 231, 0.9)',
                  textDecoration: 'none',
                  transition: 'color .3s, transform 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--brass-bright)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244, 240, 231, 0.9)'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ fontSize: '0.75rem', fontFamily: '"Inter", sans-serif', color: 'var(--brass)', fontWeight: 600, letterSpacing: '0.1em' }}>{item.index}</span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer / CTA */}
        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(220, 188, 124, 0.15)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button
            onClick={() => { setMobileMenuOpen(false); handleEnquireClick(); }}
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.74rem', color: 'rgba(244, 240, 231, 0.5)' }}>
            <span>Sales: <a href="tel:+918408008001" style={{ color: 'var(--brass-bright)', textDecoration: 'none' }}>+91 840 800 8001</a></span>
            <span>Email: <a href="mailto:sales@agarwalrealties.com" style={{ color: 'var(--brass-bright)', textDecoration: 'none' }}>sales@agarwalrealties.com</a></span>
          </div>
        </div>
      </div>

      {/* Responsive CSS for nav links and burger */}
      <style>{`
        .nav-links-desktop { display: flex !important; }
        .burger-btn { display: none !important; }
        .burger-btn:focus { outline: none; }
        @media (max-width: 1080px) {
          .nav-links-desktop { display: none !important; }
          .burger-btn { display: flex !important; }
        }
        @media (max-width: 1080px) {
          .mega-panel-inner { display: none !important; }
        }
      `}</style>
    </>
  );
}
