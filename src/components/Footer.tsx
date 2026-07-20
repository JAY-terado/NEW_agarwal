import { Link } from 'react-router-dom';
import Logo from '../assets/Agarwal_Group_Logo.png';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ivory)', color: 'var(--ink-soft)', borderTop: '1px solid var(--line)', padding: 'clamp(64px, 9vh, 100px) 0 30px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
        {/* foot-top: 1.6fr 1fr 1fr 1fr */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '40px', paddingBottom: '48px', borderBottom: '1px solid rgba(20,20,18,.12)' }} className="footer-top-grid">
          {/* Brand Column */}
          <div className="foot-brand">
            <img
              src={Logo}
              alt="Agarwal Group"
              style={{ height: '54px', width: 'auto', display: 'block', borderRadius: '8px', marginBottom: '2px' }}
            />
            <p style={{ marginTop: '18px', fontSize: '.92rem', fontWeight: 300, fontStyle: 'italic', fontFamily: '"Fraunces", serif', maxWidth: '36ch', color: 'var(--ink-soft)' }}>
              "Crafting homes where families flourish, legacies begin, and dreams find their address."
            </p>
            <address style={{ marginTop: '18px', fontStyle: 'normal', fontSize: '.86rem', fontWeight: 300, lineHeight: 1.7 }}>
              9, Gokul Annexe, Agarwal Gardens,<br />
              Opp. Muljibhai Mehta School,<br />
              Gokul Township, Virar (W),<br />
              Maharashtra — 401303
            </address>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <a href="tel:+918408008002" style={{ fontWeight: 300, color: 'var(--ink-soft)', transition: 'color .3s', fontFamily: '"Fraunces", serif', fontSize: '1.05rem' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--brass-deep)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>
                +91 84080 08002
              </a>
              <a href="tel:+918408008001" style={{ fontWeight: 300, color: 'var(--ink-soft)', transition: 'color .3s', fontFamily: '"Fraunces", serif', fontSize: '1.05rem' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--brass-deep)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>
                +91 84080 08001
              </a>
              <a href="mailto:sales@agarwalrealties.com" style={{ fontSize: '.9rem', fontWeight: 300, color: 'var(--ink-soft)', transition: 'color .3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--brass-deep)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>
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
                { to: '/projects/skyrise', label: 'Agarwal Skyrise' },
                { to: '/projects/infinity', label: 'Agarwal Infinity' },
                { to: '/projects/sky-heights', label: 'Agarwal Sky Heights' },
                { to: '/projects/horizon', label: 'Agarwal Horizon' },
              ].map(link => (
                <Link key={link.to} to={link.to}
                  style={{ display: 'block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'color .25s', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="foot-col">
            <h5 style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: '18px' }}>
              Quick Links
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { to: '/customer-registration', label: 'Customer Registration' },
                { to: '/about-us', label: 'About Us' },
                { to: '/projects', label: 'Ongoing Projects' },
                { to: '/projects', label: 'Completed Projects' },
                { to: '/blogs', label: 'Blogs' },
                { to: '/channel-partner', label: 'Channel Partner' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/careers', label: 'Careers' },
                { to: '/story', label: 'Our Vision' },
                // { to: '/projects', label: 'RERA Details' },
              ].map((link, i) => (
                <Link key={i} to={link.to}
                  style={{ display: 'block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'color .25s', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="foot-col">
            <h5 style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: '18px' }}>
              Legal
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Link to="/terms-conditions"
                style={{ display: 'block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'color .25s', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>
                Terms &amp; Conditions
              </Link>
              <Link to="/privacy-policy"
                style={{ display: 'block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'color .25s', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>
                Privacy Policy
              </Link>
              <a href="#"
                style={{ display: 'block', fontSize: '.9rem', fontWeight: 300, padding: '6px 0', color: 'var(--ink-soft)', transition: 'color .25s', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}>
                Sitemap
              </a>
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
    </footer>
  );
}
