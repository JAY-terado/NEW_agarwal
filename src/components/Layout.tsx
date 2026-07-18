import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* Navigation */}
      <Navbar />

      {/* Main content — 0 padding to allow page heroes to slide under fixed navbar and ticker */}
      <main style={{ flexGrow: 1, paddingTop: 0 }}>
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* FLOATING BUTTONS */}
      <div style={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* WhatsApp */}
        <a
          href="https://api.whatsapp.com/send?phone=918530081105&text=Hello%2C%20I%27m%20interested%20in%20Agarwal%20Group%20projects"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          style={{ width: '54px', height: '54px', borderRadius: '50%', display: 'grid', placeItems: 'center', boxShadow: '0 10px 26px -8px rgba(0,0,0,.5)', transition: 'transform .3s cubic-bezier(.22,.61,.36,1)', background: '#25D366', color: '#fff', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.06 24l1.69-6.16a11.86 11.86 0 1 1 4.43 4.36L.06 24zM6.6 20.1l.37.22a9.86 9.86 0 1 0-3.34-3.3l.24.38-1 3.65 3.73-.95zM17.5 14.3c-.15-.25-.55-.4-1.15-.7s-1.36-.67-1.57-.75-.36-.12-.5.12-.58.74-.71.9-.26.18-.5.06a8.1 8.1 0 0 1-2.37-1.46 8.94 8.94 0 0 1-1.64-2.05c-.17-.3 0-.45.13-.6s.25-.26.37-.4a1.55 1.55 0 0 0 .25-.41.45.45 0 0 0 0-.42c-.06-.12-.5-1.22-.69-1.67s-.37-.38-.5-.38h-.43a.83.83 0 0 0-.6.28A2.52 2.52 0 0 0 5 8.99a4.38 4.38 0 0 0 .92 2.32 10 10 0 0 0 3.85 3.4 13 13 0 0 0 1.28.48 3.09 3.09 0 0 0 1.42.09 2.32 2.32 0 0 0 1.52-1.07 1.88 1.88 0 0 0 .13-1.07z" />
          </svg>
        </a>

        {/* Call */}
        <a
          href="tel:+918408008002"
          aria-label="Call Now"
          style={{ width: '54px', height: '54px', borderRadius: '50%', display: 'grid', placeItems: 'center', boxShadow: '0 10px 26px -8px rgba(0,0,0,.5)', transition: 'transform .3s cubic-bezier(.22,.61,.36,1)', background: 'var(--brass)', color: 'var(--pine)', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1z" />
          </svg>
        </a>
      </div>

      {/* ticker-track animation keyframe */}
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
