import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Building2, Award, TrendingUp, HandCoins, UserCheck, FileCheck, Star,
  Megaphone, Clock, Bell, Headphones, MapPin, Calendar, Smartphone, Banknote, Users
} from 'lucide-react';
import cpHero from '../assets/cpHero.png';
import cp2Image from '../assets/cp2.png';
import cp3Image from '../assets/cp3.png';
import heroImage from '../assets/agarwal-horizon-hero.jpg';
import { channelPartnerFaqs } from '../data/faqs';
import { projects } from '../data/projects';
import infinityHero from '../assets/agarwal-infinity-hero.jpg';
import skyriseHero from '../assets/agarwal-skyrise-hero.jpg';
import skyHeightsHero from '../assets/agarwal-sky-heights-hero.jpg';

const projectHeroMap: Record<string, string> = {
  infinity: infinityHero,
  skyrise: skyriseHero,
  'sky-heights': skyHeightsHero,
  horizon: heroImage
};

export default function ChannelPartner() {
  const location = useLocation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const registerRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll to the respective section based on pathname or hash
    setTimeout(() => {
      if (location.pathname === '/channel-partner-registration' || location.hash === '#register') {
        registerRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (location.pathname === '/channel-partner-faqs' || location.hash === '#faqs') {
        faqRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash) {
        const id = location.hash.substring(1);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
  }, [location]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const whyPartnerFeatures = [
    { icon: <Award />, title: "48+ Years of Legacy", desc: "Building trust since 1978." },
    { icon: <Building2 />, title: "50+ Successful Projects", desc: "A proven track record across MMR." },
    { icon: <TrendingUp />, title: "High Conversion Projects", desc: "Well-planned developments in growing locations." },
    { icon: <Banknote />, title: "Attractive Commission Structure", desc: "Competitive and timely payouts." },
    { icon: <UserCheck />, title: "Dedicated Relationship Manager", desc: "One point of contact for all your requirements." },
    { icon: <FileCheck />, title: "Transparent Documentation", desc: "Smooth booking and registration process." },
    { icon: <Star />, title: "Strong Brand Reputation", desc: "A trusted name among homebuyers." },
    { icon: <Megaphone />, title: "Marketing Support", desc: "Brochures, creatives, digital content and sales presentations." }
  ];

  const benefits = [
    { icon: <Clock />, title: "Priority Sales Assistance", desc: "Fast response to enquiries." },
    { icon: <Bell />, title: "Early Project Updates", desc: "Receive inventory and launch information before the public." },
    { icon: <Headphones />, title: "Dedicated Sales Support", desc: "Professional guidance throughout the sales cycle." },
    { icon: <MapPin />, title: "Site Visit Coordination", desc: "Quick scheduling for your clients." },
    { icon: <Calendar />, title: "Inventory Availability", desc: "Real-time unit availability." },
    { icon: <Smartphone />, title: "Digital Sales Kit", desc: "E-Brochures, Floor Plans, Price Lists, Payment Plans, Location Maps & Videos." },
    { icon: <HandCoins />, title: "Faster Commission Processing", desc: "Transparent and timely payment process." },
    { icon: <Users />, title: "Exclusive Events", desc: "Project launches, broker meets and appreciation events." }
  ];

  return (
    <div style={{ background: 'var(--color-ivory)', minHeight: '100vh' }}>
      {/* 1. Page Hero Banner */}
      <header className="page-hero" style={{ minHeight: '80vh' }}>
        <div className="page-hero-bg">
          <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 1 }}></div>
          <img src={cpHero} alt="Business handshake" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="wrap-widescreen relative" style={{ zIndex: 10 }}>
          <span className="eyebrow light">Channel Partners</span>
          <h1 className="serif text-white" style={{ maxWidth: '800px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '24px' }}>
            Partner With One of MMR's <em>Trusted</em> Real Estate Developers
          </h1>
          <p className="text-white" style={{ maxWidth: '600px', fontSize: '1.1rem', opacity: 0.9, marginBottom: '40px' }}>
            Join our growing network of Channel Partners and unlock rewarding opportunities with premium residential projects, transparent dealings, and dedicated relationship support.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => registerRef.current?.scrollIntoView({ behavior: 'smooth' })} className="pcta-btn btn-enquire" style={{ background: 'var(--brass)', color: '#fff', border: 'none' }}>
              <span>Register as a Channel Partner</span>
              <span className="arr">→</span>
            </button>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="pcta-btn btn-enquire" style={{ background: 'var(--brass)', color: '#fff', border: 'none' }}>
              <span>Contact CP Team</span>
              <span className="arr">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Why Partner With Agarwal Group */}
      <section id="why-partner" className="section py-24" style={{ backgroundColor: 'var(--color-paper)', padding: '100px 0' }}>
        <div className="wrap-widescreen">
          <div className="text-center mb-16" style={{ marginBottom: '64px' }}>
            <h2 className="serif text-4xl md:text-5xl" style={{ color: 'var(--color-pine)' }}>Why Leading Channel Partners Choose Us</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {whyPartnerFeatures.map((item, idx) => (
              <div key={idx} style={{ padding: '32px', background: 'var(--color-ivory)', borderRadius: '12px', transition: 'transform 0.3s ease', cursor: 'default', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ color: 'var(--brass-deep)', marginBottom: '20px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196, 164, 119, 0.1)', borderRadius: '50%' }}>
                  {item.icon}
                </div>
                <h4 className="serif" style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--ink)' }}>{item.title}</h4>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Current Projects */}
      <section id="portfolio" className="section py-24" style={{ backgroundColor: 'var(--color-ivory)', padding: '100px 0' }}>
        <div className="wrap-widescreen">
          <div className="mb-12" style={{ marginBottom: '48px' }}>
            <span className="eyebrow">Portfolio</span>
            <h2 className="serif text-4xl" style={{ color: 'var(--ink)' }}>Current Projects</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {projects.map((proj) => {
              const imageSrc = projectHeroMap[proj.slug] || infinityHero;

              // Extract a short location snippet if possible (e.g., "Virar (W)")
              const locationParts = proj.location.split(',');
              const shortLocation = locationParts.length > 2
                ? locationParts[locationParts.length - 2].trim()
                : locationParts[0].trim();

              return (
                <Link key={proj.slug} to={`/projects/${proj.slug}`} style={{ display: 'block', textDecoration: 'none', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: '240px', overflow: 'hidden' }}>
                    <img src={imageSrc} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <h3 className="serif" style={{ fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '8px' }}>{proj.name}</h3>
                    <p style={{ color: 'var(--ink-soft)', marginBottom: '16px', fontSize: '0.95rem' }}>
                      {shortLocation} | {proj.config}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div className="custom-read-more">
                        <span className="custom-read-more__label">Know More</span>
                        <span className="custom-read-more__icon">
                          <span className="custom-read-more__icon-small">
                            <svg viewBox="0 0 100 100">
                              <polygon points="33.7,95.8 27.8,90.5 63.9,50 27.8,9.5 33.7,4.2 74.6,50"></polygon>
                            </svg>
                          </span>
                          <span className="custom-read-more__icon-circle">
                            <svg viewBox="0 0 100 100">
                              <path className="bottomcircle" d="M18.2,18.2c17.6-17.6,46-17.6,63.6,0s17.6,46,0,63.6s-46,17.6-63.6,0"></path>
                              <path pathLength="100" className="topcircle" d="M18.2,18.2c17.6-17.6,46-17.6,63.6,0s17.6,46,0,63.6s-46,17.6-63.6,0"></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Benefits */}
      <section id="benefits" className="section py-24" style={{ padding: '100px 0', backgroundColor: 'var(--color-paper)' }}>
        <div className="wrap-widescreen">
          <div className="text-center mb-16" style={{ marginBottom: '64px' }}>
            <h2 className="serif text-4xl" style={{ color: 'var(--ink)' }}>Benefits of Becoming Our Channel Partner</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {benefits.map((item, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'var(--color-ivory)', border: '1px solid var(--color-line)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-pine)', marginBottom: '16px' }}>{item.icon}</div>
                <h5 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>{item.title}</h5>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Registration Form */}
      <section ref={registerRef} id="register" className="section py-24" style={{ backgroundColor: 'var(--color-ivory)', padding: '100px 0' }}>
        <div className="wrap-widescreen channel-grid">
          <div style={{ paddingRight: '40px' }}>
            <h2 className="serif text-4xl" style={{ color: 'var(--ink)', marginBottom: '24px' }}>Join the Network</h2>
            <p className="ch-lead" style={{ marginBottom: '32px' }}>
              Register today to access our full inventory, best-in-class brokerage, and dedicated sales support.
            </p>
            <div style={{ padding: '40px 32px', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundImage: `url(${cp3Image})`, backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', borderRadius: '12px' }}>
              <h4 className="serif" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Ready to Earn?</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: 'var(--brass)', borderRadius: '50%' }}></div> Simple Registration</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: 'var(--brass)', borderRadius: '50%' }}></div> Quick Onboarding</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: 'var(--brass)', borderRadius: '50%' }}></div> Dedicated Sourcing Manager</li>
              </ul>
            </div>
          </div>

          <div className="form" style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <div className="ft serif">Registration Form</div>
                <div className="fsub">Fill in your details below.</div>

                <div className="frow">
                  <div className="field">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" required placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="firmCompany">Firm / Company</label>
                    <input type="text" id="firmCompany" required placeholder="Company name" />
                  </div>
                </div>

                <div className="frow">
                  <div className="field">
                    <label htmlFor="reraNo">RERA Reg. No.</label>
                    <input type="text" id="reraNo" required placeholder="Agent RERA no." />
                  </div>
                  <div className="field">
                    <label htmlFor="mobile">Mobile</label>
                    <div style={{ display: 'flex', border: '1px solid var(--color-line)', borderRadius: '4px', overflow: 'hidden', background: '#ffffff' }}>
                      <span style={{ display: 'flex', alignItems: 'center', background: 'var(--color-ivory)', borderRight: '1px solid var(--color-line)', fontSize: '.95rem', fontWeight: 500, color: 'var(--color-ink)', padding: '0 13px', userSelect: 'none' }}>+91</span>
                      <input
                        type="tel" id="mobile" required maxLength={10} pattern="[0-9]{10}"
                        onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10); }}
                        placeholder="00000 00000"
                        style={{ width: '100%', flex: 1, border: 'none', padding: '13px 15px', fontSize: '.95rem', outline: 'none', background: 'transparent' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required placeholder="you@email.com" />
                </div>

                <div className="field">
                  <label htmlFor="city">City of Operation</label>
                  <input type="text" id="city" required placeholder="e.g. Mumbai, Thane, Palghar" />
                </div>

                <button type="submit" className="pcta-btn btn-enquire" style={{ width: '100%', background: 'var(--brass)', color: '#fff', border: 'none' }}>
                  <span>Become a Channel Partner</span>
                  <span className="arr">→</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(38, 59, 44, 0.1)', color: 'var(--color-pine)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px' }}>
                  <Award size={40} />
                </div>
                <div className="ft serif" style={{ color: 'var(--color-pine)', marginBottom: '16px', fontSize: '2rem' }}>Welcome Aboard!</div>
                <p style={{ color: 'var(--ink-soft)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Thank you for registering. Our dedicated sourcing manager will contact you shortly with your welcome kit and login details.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. FAQs */}
      <section ref={faqRef} id="faqs" className="section py-24" style={{ padding: '100px 0', backgroundColor: 'var(--color-paper)' }}>
        <div className="wrap-widescreen">
          <div className="section-head" style={{ marginBottom: '64px' }}>
            <span className="eyebrow">FAQ<span style={{ textTransform: 'lowercase', marginLeft: '-0.55em' }}>s</span></span>
            <h2 className="serif text-4xl" style={{ color: 'var(--ink)' }}>Frequently Asked Questions</h2>
          </div>

          <div className="faq-wrap">
            {channelPartnerFaqs.slice(0, showAllFaqs ? channelPartnerFaqs.length : 7).map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen ? "true" : "false"}
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-ic" aria-hidden="true"></span>
                  </button>
                  <div
                    className="faq-a"
                    style={{
                      maxHeight: isOpen ? '500px' : '0px',
                      overflowY: isOpen ? 'auto' : 'hidden',
                      transition: 'max-height .45s var(--ease)',
                    }}
                  >
                    <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: item.a }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            {!showAllFaqs && channelPartnerFaqs.length > 7 && (
              <button
                className="custom-read-more"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, font: 'inherit' }}
                onClick={() => setShowAllFaqs(true)}
              >
                <span className="custom-read-more__label">Read More FAQ's</span>
                <span className="custom-read-more__icon">
                  <span className="custom-read-more__icon-small">
                    <svg viewBox="0 0 100 100">
                      <polygon points="33.7,95.8 27.8,90.5 63.9,50 27.8,9.5 33.7,4.2 74.6,50"></polygon>
                    </svg>
                  </span>
                  <span className="custom-read-more__icon-circle">
                    <svg viewBox="0 0 100 100">
                      <path className="bottomcircle" d="M18.2,18.2c17.6-17.6,46-17.6,63.6,0s17.6,46,0,63.6s-46,17.6-63.6,0"></path>
                      <path pathLength="100" className="topcircle" d="M18.2,18.2c17.6-17.6,46-17.6,63.6,0s17.6,46,0,63.6s-46,17.6-63.6,0"></path>
                    </svg>
                  </span>
                </span>
              </button>
            )}
            {showAllFaqs && (
              <button
                className="custom-read-more"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, font: 'inherit' }}
                onClick={() => setShowAllFaqs(false)}
              >
                <span className="custom-read-more__label">Show Less FAQ's</span>
                <span className="custom-read-more__icon" style={{ transform: 'rotate(-90deg)' }}>
                  <span className="custom-read-more__icon-small">
                    <svg viewBox="0 0 100 100">
                      <polygon points="33.7,95.8 27.8,90.5 63.9,50 27.8,9.5 33.7,4.2 74.6,50"></polygon>
                    </svg>
                  </span>
                  <span className="custom-read-more__icon-circle">
                    <svg viewBox="0 0 100 100">
                      <path className="bottomcircle" d="M18.2,18.2c17.6-17.6,46-17.6,63.6,0s17.6,46,0,63.6s-46,17.6-63.6,0"></path>
                      <path pathLength="100" className="topcircle" d="M18.2,18.2c17.6-17.6,46-17.6,63.6,0s17.6,46,0,63.6s-46,17.6-63.6,0"></path>
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="section py-24" style={{ backgroundColor: 'var(--color-ivory)', padding: '100px 0' }}>
        <div className="wrap-widescreen text-center" style={{ maxWidth: '800px' }}>
          <div style={{ color: 'var(--brass-deep)', marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '4px' }}>
            <Star fill="currentColor" size={24} />
            <Star fill="currentColor" size={24} />
            <Star fill="currentColor" size={24} />
            <Star fill="currentColor" size={24} />
            <Star fill="currentColor" size={24} />
          </div>
          <h3 className="serif text-3xl" style={{ lineHeight: 1.4, color: 'var(--ink)', marginBottom: '32px' }}>
            "Working with Agarwal Group has always been smooth. Their support team and transparent processes make doing business easy."
          </h3>
          <p style={{ color: 'var(--ink-soft)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>— Vishal Salunkhe</p>
        </div>
      </section>

      {/* 8. Call-to-Action Banner */}
      <section className="section py-24" style={{
        backgroundImage: `url(${cp2Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '120px 0',
        textAlign: 'left',
        color: '#fff'
      }}>
        <div className="wrap-widescreen">
          <div style={{ maxWidth: '700px' }}>
            <h2 className="serif text-5xl" style={{ marginBottom: '24px' }}>Let's Grow Together</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '40px', lineHeight: 1.6 }}>
              Become a part of the Agarwal Group Channel Partner Network and build long-term success through trusted projects and dedicated support.
            </p>
            <button onClick={() => registerRef.current?.scrollIntoView({ behavior: 'smooth' })} className="pcta-btn btn-enquire" style={{ background: 'var(--brass)', color: '#fff', border: 'none' }}>
              <span>Register Now</span>
              <span className="arr">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
