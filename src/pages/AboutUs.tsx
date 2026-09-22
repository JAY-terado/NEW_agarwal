import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Hammer, Map, Trophy,
  CalendarCheck, BadgeCheck, Users, Trees
} from 'lucide-react';
import ourLegacyAus from '../assets/ourLegacyAus.webp';
import ourMissionAus from '../assets/ourMissionAus.webp';
import ourVisionAus from '../assets/OurVisionAus.webp';
import ourPresenceAus from '../assets/ourPresenceAus.webp';
import aboutUsHero from '../assets/aboutUsHero.webp';
import { projects } from '../data/projects';
import infinityHero from '../assets/agarwal-infinity-hero.webp';
import skyriseHero from '../assets/skyrise elevations/elev6.webp';
import skyHeightsHero from '../assets/agarwalSkyheight.webp';
import heroImage from '../assets/agarwal-horizon-hero.webp';

const projectHeroMap: Record<string, string> = {
  infinity: infinityHero,
  skyrise: skyriseHero,
  'sky-heights': skyHeightsHero,
  horizon: heroImage
};

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-ivory text-ink min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutUsHero}
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/60 to-pine/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full text-ivory flex flex-col items-center text-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-4">
            About <span className="italic font-serif text-brass-bright font-normal">Agarwal Group</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-ivory/90 font-light leading-relaxed max-w-2xl">
            Trusted Real Estate Developer Since 1978
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="pt-24 pb-0">

        {/* Section 1: Intro (Story style) */}
        <section className="section story">
          <div className="wrap-widescreen story-grid">
            <div>
              <span className="eyebrow">Our Legacy</span>
              <h2 className="serif">A Legacy Built on <em>Trust, Quality &amp; Excellence</em></h2>
              <p>
                Established in <strong>1978</strong>, Agarwal Group has become one of the most respected real estate developers in <strong>Vasai–Virar, Mumbai and MMR Region</strong>, with a legacy of delivering thoughtfully planned residential communities.
              </p>
              <p>
                From affordable homes to premium apartments, every project reflects our commitment to exceptional construction quality, intelligent space planning, modern lifestyle amenities, and timely delivery.
              </p>
              <p>
                With <strong>30+</strong> completed residential projects, <strong>5,000+</strong> happy families and <strong>1Cr+</strong> square feet developed, we continue to create homes that offer comfort today and appreciation for the future.
              </p>
              <div className="quote">
                <p className="serif">"Every Agarwal development is designed to build not just homes, but thriving communities where families grow, memories are created, and investments gain lasting value."</p>
              </div>
            </div>
            <div className="story-media">
              <img
                src={ourLegacyAus}
                alt="Agarwal Group Heritage"
                style={{ width: '80%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' }}
              />
              <div className="story-badge">
                <b>48+</b>
                <small>Years of Trust</small>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why Choose Us (Folio style / Vcards) */}
        <section className="section folio pt-24" style={{ backgroundColor: '#F8F6F0' }}>
          <div className="wrap-widescreen">
            <div className="section-head" style={{ position: 'relative' }}>
              {/* <div className="folio-watermark" style={{ top: '-60px', whiteSpace: 'nowrap', left: 'auto', right: '-100%' }}>
                <div>choose agarwal</div>
              </div> */}
              <span className="eyebrow" style={{ position: 'relative', zIndex: 1 }}>Why Homebuyers Choose Agarwal Group</span>
              {/* <h2 className="serif" style={{ position: 'relative', zIndex: 1 }}>
                Uncompromising <br /><em>Quality & Trust</em>
              </h2> */}
            </div>
            <div className="values" style={{ marginTop: '4rem' }}>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Trophy className="w-9 h-9" strokeWidth={1.6} />
                </div>
                <div className="vcard-content">
                  <b>48+ Years of Trusted Experience</b>
                  <span>Over five decades of delivering residential projects with consistent quality, transparency, and customer satisfaction.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Map className="w-9 h-9" strokeWidth={1.6} />
                </div>
                <div className="vcard-content">
                  <b>Prime Locations Across Mumbai, Vasai & Virar</b>
                  <span>Our developments are strategically located near railway stations, highways, schools, hospitals, business hubs, and everyday conveniences.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Hammer className="w-9 h-9" strokeWidth={1.6} />
                </div>
                <div className="vcard-content">
                  <b>Superior Construction Quality</b>
                  <span>Every home is built using premium materials, advanced engineering practices, and strict quality control standards.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <CalendarCheck className="w-9 h-9" strokeWidth={1.6} />
                </div>
                <div className="vcard-content">
                  <b>Timely Project Delivery</b>
                  <span>We are committed to delivering homes within promised timelines while maintaining the highest construction standards.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <BadgeCheck className="w-9 h-9" strokeWidth={1.6} />
                </div>
                <div className="vcard-content">
                  <b>RERA Registered Projects</b>
                  <span>All ongoing developments comply with MahaRERA regulations, ensuring transparency, legal compliance, and buyer confidence. </span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Users className="w-9 h-9" strokeWidth={1.6} />
                </div>
                <div className="vcard-content">
                  <b>Customer-Centric Approach</b>
                  <span>From site visits to possession and after-sales support, we strive to make every home-buying journey smooth, transparent, and rewarding.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Trees className="w-9 h-9" strokeWidth={1.6} />
                </div>
                <div className="vcard-content">
                  <b>Modern Lifestyle Amenities</b>
                  <span>Our residential projects feature landscaped gardens, clubhouses, swimming pools, fitness centres, children's play areas, and thoughtfully designed community spaces.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Values & Vision (Story grid inverted) */}
        <section className="section story pt-24 pb-12">
          <div className="wrap-widescreen story-grid" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }}>
              <span className="eyebrow">Our Vision</span>
              <h2 className="serif">Shaping <em>Tomorrows.</em></h2>
              <p>
                To be one of India's most trusted real estate developers by creating sustainable residential communities that enrich lives through quality construction, innovative design, transparency, and long-term value.
              </p>
              <p>
                We aspire to build homes and integrated townships that enhance everyday living while contributing to the future growth of Mumbai, Vasai, Virar, and the Mumbai Metropolitan Region.
              </p>
            </div>
            <div className="story-media" style={{ direction: 'ltr' }}>
              <img
                src={ourVisionAus}
                alt="Agarwal Group Vision"
                style={{ width: '80%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Our Mission */}
        <section className="section story py-24" style={{ backgroundColor: '#F8F6F0' }}>
          <div className="wrap-widescreen story-grid">
            <div>
              <span className="eyebrow">Our Mission</span>
              <h2 className="serif">Delivering <em>Lasting Value</em></h2>
              <p>
                Our mission is to develop premium residential projects that combine thoughtful architecture, modern amenities, strategic connectivity, and exceptional quality while delivering lasting value to homeowners and investors.
              </p>
              <p>We remain committed to:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', marginBottom: '1.5rem', color: 'var(--color-ink-soft)', fontWeight: 300 }}>
                <li>Delivering quality homes on time</li>
                <li>Maintaining complete transparency in every transaction</li>
                <li>Creating sustainable communities</li>
                <li>Building long-term customer relationships</li>
                <li>Continuously improving through innovation and technology</li>
              </ul>
            </div>
            <div className="story-media">
              <img
                src={ourMissionAus}
                alt="Agarwal Group Mission"
                style={{ width: '80%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Section 5: Our Presence */}
        <section className="section story py-24">
          <div className="wrap-widescreen story-grid" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }}>
              <span className="eyebrow">Our Presence</span>
              <h2 className="serif">Building Across <em>The MMR</em></h2>
              <p>
                For nearly Five decades, Agarwal Group has developed commercial and residential communities across Mumbai and Vasai-Virar MMR Mumbai Metropolitan Region.
              </p>
              <p>
                Our portfolio includes premium apartments, integrated townships, and lifestyle-focused residential developments designed for modern families.
              </p>
            </div>
            <div className="story-media" style={{ direction: 'ltr' }}>
              <img
                src={ourPresenceAus}
                alt="Agarwal Group Presence"
                style={{ width: '80%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Section 6: Current Projects (Portfolio) */}
        <section id="portfolio" className="section py-24" style={{ backgroundColor: 'var(--color-ivory)', padding: '100px 0' }}>
          <div className="wrap-widescreen">
            <div className="mb-12" style={{ marginBottom: '48px' }}>
              <span className="eyebrow">Our Portfolio</span>
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

      </div>
    </div>
  );
}
