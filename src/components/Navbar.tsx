import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  { name: 'Agarwal Skyrise', sub: 'Vasai East · 2022', href: '/projects/skyrise' },
  { name: 'Agarwal Infinity', sub: 'Virar West · 2023', href: '/projects/infinity' },
  { name: 'Agarwal Sky Heights', sub: 'Virar West · 2019', href: '/projects/sky-heights' },
  { name: 'Agarwal Yashwant Hts.', sub: 'Virar · 2018', href: '#projects' },
  { name: 'Agarwal Horizon', sub: 'Virar West · 2015', href: '/projects/horizon' },
  { name: 'Agarwal Nagri', sub: 'Vasai East · 2012', href: '#projects' },
  { name: 'Viva Vrindavan', sub: 'Virar Township', href: '#projects' },
  { name: 'Gokul Solitaire', sub: 'Virar', href: '#projects' },
  { name: 'Gokul Sapphire', sub: 'Virar', href: '#projects' },
  { name: 'Vrindavan Gardens', sub: 'Vasai', href: '#projects' },
  { name: 'Agarwal Residency', sub: 'Vasai', href: '#projects' },
  { name: 'Agarwal Sky Heights', sub: 'Vasai East', href: '#projects' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const location = useLocation();
  const megaTimer = useRef<number | null>(null);
  const ddTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
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

  // Nav base: transparent/blur; scrolled: white glass
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: scrolled ? 'rgba(255,255,255,.9)' : 'transparent',
    backdropFilter: scrolled ? 'blur(14px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
    transition: 'background .5s, box-shadow .5s, padding .5s, top .45s cubic-bezier(.22,.61,.36,1)',
    padding: scrolled ? '13px 0' : '20px 0',
    boxShadow: scrolled ? '0 10px 40px -24px rgba(0,0,0,.22)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(20,20,18,.14)' : 'none',
  };

  const brandColor = scrolled ? 'var(--ink)' : 'var(--paper)';
  const ctaBorder = scrolled ? 'var(--ink)' : 'var(--brass)';
  const ctaColor = scrolled ? 'var(--ink)' : 'var(--paper)';
  const burgerColor = scrolled ? 'var(--ink)' : 'var(--paper)';

  return (
    <>
      {/* NAV */}
      <nav style={navStyle} id="nav" className={scrolled ? 'nav scrolled' : 'nav'}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          {/* Brand */}
          <Link to="/" onClick={handleLogoClick} style={{ textDecoration: 'none', color: brandColor, lineHeight: 1 }}>
            <img src={Logo} alt="Agarwal Group" style={{ height: '42px', width: 'auto', display: 'block', borderRadius: '6px' }} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
            <Link
              to="/story"
              onClick={() => handleNavClick('story')}
              className={`lk ${location.pathname === '/story' ? 'active' : ''}`}
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
                to="/projects"
                onClick={() => handleNavClick('projects')}
                className={`lk dd-toggle ${location.pathname === '/projects' ? 'active' : ''}`}
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
                    <Link to="/projects"
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
              onClick={() => handleNavClick('contact')}
              style={{
                border: `1px solid ${ctaBorder}`,
                color: ctaColor,
                background: 'transparent',
                padding: '11px 22px',
                borderRadius: '50px',
                fontSize: '.76rem',
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
            style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 0, cursor: 'pointer', padding: '8px' }}
            className="burger-btn"
            aria-label="Open menu"
          >
            <span style={{ width: '26px', height: '2px', background: burgerColor, display: 'block', transition: '.3s' }} />
            <span style={{ width: '26px', height: '2px', background: burgerColor, display: 'block', transition: '.3s' }} />
            <span style={{ width: '26px', height: '2px', background: burgerColor, display: 'block', transition: '.3s' }} />
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
              <span style={{ fontSize: '.68rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--brass-deep)', fontWeight: 600 }}>Ongoing Residences · 4 Projects</span>
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

      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(30,31,26,.98)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform .5s cubic-bezier(.22,.61,.36,1)',
          willChange: 'transform',
        }}
        className="mobile-drawer"
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 0, color: 'rgba(244,240,231,.9)', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}
          aria-label="Close menu"
        >
          ×
        </button>

        {[
          { label: 'About Us', to: '/story', pathId: 'story' },
          { label: 'Blogs', to: '/blogs' },
          { label: 'Channel Partner', to: '/channel-partner' },
          { label: 'Contact Us', to: '/contact', pathId: 'contact' },
        ].map(item => (
          <Link key={item.label}
            to={item.to}
            onClick={() => { setMobileMenuOpen(false); if (item.pathId) handleNavClick(item.pathId); }}
            style={{ fontFamily: '"Fraunces", serif', fontSize: '1.6rem', color: 'rgba(244,240,231,.9)', textDecoration: 'none', transition: 'color .3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--brass-bright)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,240,231,.9)')}>
            {item.label}
          </Link>
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontFamily: '"Fraunces", serif', fontSize: '1.1rem', color: 'var(--brass)', marginBottom: '8px' }}>Projects</span>
          {projects.map(p => (
            <Link key={p.slug} to={`/projects/${p.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '.9rem', color: 'rgba(244,240,231,.7)', textDecoration: 'none', padding: '4px 0' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--brass-bright)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,240,231,.7)')}>
              {p.name}
            </Link>
          ))}
        </div>

        <Link to="/customer-registration"
          onClick={() => setMobileMenuOpen(false)}
          style={{ marginTop: '16px', border: '1px solid var(--brass)', color: 'var(--paper)', padding: '13px 28px', borderRadius: '50px', fontSize: '.82rem', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: '.35s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--brass)'; (e.currentTarget as HTMLElement).style.color = 'var(--pine)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--paper)'; }}>
          Enquire Now
        </Link>
      </div>

      {/* Responsive CSS for nav links and burger */}
      <style>{`
        .nav-links-desktop { display: flex !important; }
        .burger-btn { display: none !important; }
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
