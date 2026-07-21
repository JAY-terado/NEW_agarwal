import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Clock, ShieldCheck, Users } from 'lucide-react';
import { projects } from '../data/projects';

// Asset Imports
import heroVideo from '../assets/hero.mp4';
import heroPoster from '../assets/hero-poster.jpg';
import storyImage from '../assets/blog-interiors.jpg';
import infinityHero from '../assets/agarwal-infinity-hero.jpg';
import skyriseHero from '../assets/agarwal-skyrise-hero.jpg';
import skyHeightsHero from '../assets/agarwal-sky-heights-hero.jpg';
import horizonHero from '../assets/agarwal-horizon-hero.jpg';

import test1 from '../assets/testimonial-1.jpg';
import test2 from '../assets/testimonial-2.jpg';
import test3 from '../assets/testimonial-3.jpg';
import test4 from '../assets/testimonial-4.jpg';
import test5 from '../assets/testimonial-5.jpg';
import test6 from '../assets/testimonial-6.jpg';

import galleryAerial from '../assets/gallery-aerial.jpg';
import galleryLiving from '../assets/gallery-living.jpg';
import galleryLobby from '../assets/gallery-lobby.jpg';
import galleryPool from '../assets/gallery-pool.jpg';
import galleryExterior from '../assets/gallery-exterior.jpg';
import galleryBedroom from '../assets/gallery-bedroom.jpg';

import blogGreen from '../assets/blog-green.jpg';
import blogClub from '../assets/blog-club.jpg';
import blogInteriors from '../assets/blog-interiors.jpg';
import blogInvest from '../assets/blog-invest.jpg';
import blogCraft from '../assets/blog-craft.jpg';
import blogFestival from '../assets/blog-festival.jpg';

// Map project slugs to imported hero images
const projectHeroMap: Record<string, string> = {
  infinity: infinityHero,
  skyrise: skyriseHero,
  'sky-heights': skyHeightsHero,
  horizon: horizonHero,
};

// Testimonials data matching the original reels
const testimonialsData = [
  { title: "A Home to Cherish", project: "Agarwal Infinity", image: test1 },
  { title: "Exactly as Promised", project: "Agarwal Skyrise", image: test2 },
  { title: "Delivered On Time", project: "Agarwal Sky Heights", image: test3 },
  { title: "World-Class Amenities", project: "Agarwal Horizon", image: test4 },
  { title: "A Trusted Name", project: "Vasai–Virar & Mumbai", image: test5 },
  { title: "Highly Recommended", project: "Agarwal Group", image: test6 },
];

// Insights blog data matching the original bposts
const blogPostsData = [
  {
    title: "The Green Advantage: Living Amid Landscaped Acres",
    category: "Lifestyle · Townships",
    date: "May 2026",
    excerpt: "How thoughtfully planned open spaces and mature landscaping quietly shape healthier, happier communities across our townships.",
    image: blogGreen
  },
  {
    title: "Inside Club One: A World of Leisure at Home",
    category: "Amenities · Club One",
    date: "Apr 2026",
    excerpt: "From the swimming pool to the banquet hall — the curated amenities that make every Agarwal address feel like a private retreat.",
    image: blogClub
  },
  {
    title: "Crafting Homes Where Families Flourish",
    category: "Design · Interiors",
    date: "Mar 2026",
    excerpt: "The design thinking behind our intelligent floor plans, abundant natural light and timeless finishes built to last a lifetime.",
    image: blogInteriors
  },
  {
    title: "Why Vasai–Virar Is Mumbai's Smartest Address",
    category: "Investment · Vasai–Virar",
    date: "Feb 2026",
    excerpt: "Connectivity, infrastructure and value — the case for why the region is one of the metro's most promising places to own a home.",
    image: blogInvest
  },
  {
    title: "From Blueprint to Belonging: Our Build Philosophy",
    category: "Craftsmanship · Legacy",
    date: "Jan 2026",
    excerpt: "Forty-seven years of meticulous planning, clear titles and on-time delivery — the principles that turn a structure into a home.",
    image: blogCraft
  },
  {
    title: "A Festival of Firsts: Celebrating New Beginnings",
    category: "Community · Celebrations",
    date: "Dec 2025",
    excerpt: "Diwali, housewarmings and milestones — a look at the moments that make our communities feel like one extended family.",
    image: blogFestival
  }
];

// Map Instagram posts to high-res assets
const instagramPosts = [
  { id: 1, image: galleryPool },
  { id: 2, image: galleryLiving },
  { id: 3, image: galleryBedroom },
  { id: 4, image: galleryAerial },
  { id: 5, image: galleryLobby },
  { id: 6, image: galleryExterior },
  { id: 7, image: test1 },
  { id: 8, image: test2 }
];

// Counting hook for stats animation
function useCountUp(target: number, duration: number = 2000, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = target;
    const range = end - start;
    let current = start;

    const timer = setInterval(() => {
      current += Math.ceil(range / (duration / 16)); // ~60fps
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

const searchItems: Array<{ name: string; status: string; sub: string; slug?: string; link?: string }> = [
  { name: 'Agarwal Infinity', status: 'Ongoing', sub: 'Virar West', slug: 'infinity' },
  { name: 'Agarwal Sky Heights', status: 'Ongoing', sub: 'Virar West', slug: 'sky-heights' },
  { name: 'Agarwal Skyrise', status: 'Ongoing', sub: 'Vasai East', slug: 'skyrise' },
  { name: 'Agarwal Horizon', status: 'Ongoing', sub: 'Virar West', slug: 'horizon' },
  // { name: 'Agarwal Yashwant Hts.', status: 'Completed', sub: 'Virar', link: '#projects' },
  // { name: 'Agarwal Nagri', status: 'Completed', sub: 'Vasai', link: '#projects' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const statsRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);
  const btrackRef = useRef<HTMLDivElement>(null);

  // Intersection observer to trigger stats counting
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll reveal Intersection Observer
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => io.observe(el));

    return () => {
      elements.forEach((el) => io.unobserve(el));
      io.disconnect();
    };
  }, []);

  // Scroll Spy to update URL pathname based on active section
  useEffect(() => {
    const sections = [
      { id: 'story', path: '/story' },
      { id: 'projects', path: '/projects' },
      { id: 'contact', path: '/contact' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Center-focused trigger area
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const path = '/' + entry.target.id;
          if (window.location.pathname !== path) {
            window.history.pushState(null, '', path);
          }
        }
      });
    }, observerOptions);

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    // Watch for scrolling back to the top of the page
    const handleScroll = () => {
      if (window.scrollY < 200) {
        if (window.location.pathname !== '/') {
          window.history.pushState(null, '', '/');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Click anywhere (except input) or scroll to close search dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const input = searchContainerRef.current?.querySelector('input');
      if (input && input.contains(e.target as Node)) {
        return;
      }
      setSearchFocused(false);
    };
    const handleScroll = () => {
      setSearchFocused(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Refs for interval timers to allow resetting on manual click
  const reelsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blogsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reels horizontal scrolling
  const scrollReels = (direction: number, manual = false) => {
    if (reelsRef.current) {
      const card = reelsRef.current.querySelector('.reel');
      const cardWidth = card ? card.getBoundingClientRect().width : 320;
      if (direction === 1 && reelsRef.current.scrollLeft + reelsRef.current.clientWidth >= reelsRef.current.scrollWidth - 10) {
        reelsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === -1 && reelsRef.current.scrollLeft <= 0) {
        reelsRef.current.scrollTo({ left: reelsRef.current.scrollWidth, behavior: 'smooth' });
      } else {
        reelsRef.current.scrollBy({ left: direction * (cardWidth + 22), behavior: 'smooth' });
      }
    }
    if (manual) startReelsTimer();
  };

  const startReelsTimer = () => {
    if (reelsTimerRef.current) clearInterval(reelsTimerRef.current);
    reelsTimerRef.current = setInterval(() => scrollReels(1), 15000);
  };

  // Auto-slide reels every 15 seconds
  useEffect(() => {
    startReelsTimer();
    return () => { if (reelsTimerRef.current) clearInterval(reelsTimerRef.current); };
  }, []);

  // Blogs horizontal scrolling
  const scrollBlogs = (direction: number, manual = false) => {
    if (btrackRef.current) {
      const card = btrackRef.current.querySelector('.bpost');
      const cardWidth = card ? card.getBoundingClientRect().width : 360;
      if (direction === 1 && btrackRef.current.scrollLeft + btrackRef.current.clientWidth >= btrackRef.current.scrollWidth - 10) {
        btrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === -1 && btrackRef.current.scrollLeft <= 0) {
        btrackRef.current.scrollTo({ left: btrackRef.current.scrollWidth, behavior: 'smooth' });
      } else {
        btrackRef.current.scrollBy({ left: direction * (cardWidth + 24), behavior: 'smooth' });
      }
    }
    if (manual) startBlogsTimer();
  };

  const startBlogsTimer = () => {
    if (blogsTimerRef.current) clearInterval(blogsTimerRef.current);
    blogsTimerRef.current = setInterval(() => scrollBlogs(1), 15000);
  };

  // Auto-slide blogs every 15 seconds
  useEffect(() => {
    startBlogsTimer();
    return () => { if (blogsTimerRef.current) clearInterval(blogsTimerRef.current); };
  }, []);

  const filteredSearchItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const countYears = useCountUp(48, 1500, statsTriggered);
  const countProjects = useCountUp(30, 1500, statsTriggered);
  const countFamilies = useCountUp(5000, 2000, statsTriggered);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="relative">
      {/* 1. HERO SECTION - matches original: video bg, absolute bottom search only */}
      <header className="relative min-h-[100svh] overflow-hidden text-white" style={{ display: 'flex', alignItems: 'flex-end', minHeight: '100svh' }}>
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover block"
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(18, 18, 16, .5) 0%, rgba(18, 18, 16, .2) 36%, rgba(18, 18, 16, .85) 100%)' }} />
        </div>

        {/* Centered Search Bar */}
        <div className="absolute inset-0 flex items-end justify-center z-10" style={{ padding: '0 24px clamp(46px, 11vh, 104px)' }} ref={searchContainerRef}>
          <form className="relative" style={{ width: 'min(760px, 90vw)' }} onSubmit={(e) => e.preventDefault()}>
            {/* <div className="hero-search" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: searchFocused ? 'rgba(18, 16, 12, .46)' : 'rgba(18, 16, 12, .34)',
              backdropFilter: 'blur(7px)',
              WebkitBackdropFilter: 'blur(7px)',
              border: searchFocused ? '1px solid rgba(220, 188, 124, .7)' : '1px solid rgba(255, 255, 255, .18)',
              borderRadius: '14px',
              padding: '20px 24px',
              boxShadow: '0 26px 64px -30px rgba(0, 0, 0, .65)',
              transition: 'border-color .35s ease, background .35s ease'
            }}>
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontFamily: '"Fraunces", serif',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                  letterSpacing: '.01em'
                }}
              />
              <button type="submit" aria-label="Search" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'grid', placeItems: 'center', transition: 'color .3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brass-bright)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}>
                <Search className="w-6 h-6" strokeWidth={1.6} />
              </button>
            </div> */}

            {/* Dropdown search autocomplete panel */}
            <AnimatePresence>
              {searchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={{ position: 'absolute', bottom: 'calc(100% + 12px)', left: 0, right: 0, background: 'rgba(18, 16, 12, .85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, .15)', borderRadius: '14px', boxShadow: '0 -24px 64px -16px rgba(0, 0, 0, .6)', zIndex: 20 }}
                  className="max-h-[300px] overflow-y-auto"
                >
                  {filteredSearchItems.length > 0 ? (
                    <div>
                      {filteredSearchItems.map((p, idx) => {
                        const isCompleted = p.status.toLowerCase() === 'completed';
                        const itemContent = (
                          <>
                            <div className="sdd-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                              <span className="sdd-title" style={{ color: '#fff', fontFamily: '"Fraunces", serif', fontSize: '1.15rem', fontWeight: 500 }}>{p.name}</span>
                              <span className={`sdd-status ${isCompleted ? 'completed' : 'ongoing'}`} style={{
                                fontSize: '0.65rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontWeight: 600,
                                background: isCompleted ? 'rgba(255, 255, 255, 0.1)' : 'rgba(220, 188, 124, 0.15)',
                                color: isCompleted ? 'rgba(255, 255, 255, 0.7)' : '#fff',
                                border: isCompleted ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.6)'
                              }}>{p.status}</span>
                            </div>
                            <div className="sdd-sub" style={{ color: 'rgba(255, 255, 255, .5)', fontSize: '0.85rem', fontWeight: 300 }}>{p.sub}</div>
                          </>
                        );

                        return p.slug ? (
                          <Link
                            key={idx}
                            to={`/projects/${p.slug}`}
                            className="sdd-item"
                            style={{ display: 'block', padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, .06)', textDecoration: 'none', transition: 'background .2s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, .05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                          >
                            {itemContent}
                          </Link>
                        ) : (
                          <a
                            key={idx}
                            href={p.link}
                            className="sdd-item"
                            style={{ display: 'block', padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, .06)', textDecoration: 'none', transition: 'background .2s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, .05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                          >
                            {itemContent}
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(255, 255, 255, .5)', fontStyle: 'italic' }}>No projects found.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </header>

      <section ref={statsRef} className="stats">
        <div className="wrap stats-grid">
          <div className="sbox">
            <div className="num">{countYears}+</div>
            <div className="lbl">Years Crafting Excellence</div>
          </div>
          <div className="sbox">
            <div className="num">{countProjects}+</div>
            <div className="lbl">Projects Completed</div>
          </div>
          <div className="sbox">
            <div className="num">{countFamilies.toLocaleString('en-IN')}+</div>
            <div className="lbl">Happy Families</div>
          </div>
        </div>
      </section>

      {/* 3. STORY (ABOUT US) - matches original design */}
      <section className="section story" id="story">
        <div className="wrap story-grid">
          <div className="reveal">
            <span className="eyebrow">About Us</span>
            <h2 className="serif">A Legacy Built on <em>Trust &amp; Craftsmanship</em></h2>
            <p>Since 1978, the Agarwal Group has been the cornerstone of residential development across the Vasai–Virar sub-region of Mumbai. What began as a vision to create thoughtfully designed homes has evolved into a legacy of excellence spanning generations of families.</p>
            <p>Each Agarwal residence is a testament to our unwavering commitment — spaces that blend intelligent architecture with world-class amenities, positioned in the most promising locations of the Mumbai Metropolitan Region.</p>

            <Link className="custom-read-more" to="/about-us">
              <span className="custom-read-more__label">Read More</span>
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
            </Link>

            <div className="values">
              <div className="vcard">
                <div className="vcard-icon">
                  <Sparkles className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>Quality Living</b>
                  <span>Every detail crafted with precision.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon">
                  <Clock className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>On-Time Delivery</b>
                  <span>A commitment upheld for decades.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>RERA Compliant</b>
                  <span>Transparent, accountable practices.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon">
                  <Users className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>Community First</b>
                  <span>Neighbourhoods that thrive together.</span>
                </div>
              </div>
            </div>

            <div className="quote">
              <p className="serif">"We don't just build structures — we build the places where life's greatest chapters unfold."</p>
            </div>
          </div>
          <div className="story-media reveal">
            <img
              src={storyImage}
              alt="Agarwal Group architecture"
              style={{ width: '100%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' }}
            />
            <div className="story-badge">
              <b>48+</b>
              <small>Years of Trust</small>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ONGOING PROJECTS PORTFOLIO */}
      <section className="section folio" id="projects">
        <div className="wrap">
          <div className="section-head reveal" style={{ position: 'relative' }}>
            <div className="folio-watermark">
              <div style={{ transform: 'translateX(0.2em)' }}>ongoing</div>
              <div style={{ transform: 'translateX(0.3em)' }}>projects</div>
            </div>
            <span className="eyebrow" style={{ position: 'relative', zIndex: 1 }}>Ongoing Projects</span>
            <h2 className="serif" style={{ position: 'relative', zIndex: 1 }}>Residences Crafted for <em>Discerning Lives</em></h2>
            <p style={{ position: 'relative', zIndex: 1 }}>Four exceptional developments across Vasai–Virar &amp; Mumbai — each offering a distinct vision of elevated living, with seamless connectivity to Mumbai.</p>
          </div>

          <div className="pgrid">
            {projects.map((proj) => {
              const imageSrc = projectHeroMap[proj.slug];

              // Map project details to exact static page values
              const projectMeta = {
                infinity: {
                  badge: 'Featured · Ready to Move',
                  location: 'Virar West, Mumbai',
                  tags: ['Swimming Pool', 'Tennis Court', 'Club One']
                },
                skyrise: {
                  badge: 'Ready · OC Received',
                  location: 'Vasai East, Mumbai',
                  tags: ['OTIS Lifts', 'Jogging Track']
                },
                'sky-heights': {
                  badge: 'Club Membership Free',
                  location: 'Virar West, Mumbai',
                  tags: ['Badminton', 'Clubhouse']
                },
                horizon: {
                  badge: 'Township Living',
                  location: 'Virar West, Mumbai',
                  tags: ['Schindler Lifts', 'Landscaped Garden']
                }
              }[proj.slug as 'infinity' | 'skyrise' | 'sky-heights' | 'horizon'] || {
                badge: proj.status,
                location: proj.location,
                tags: []
              };

              return (
                <article key={proj.slug} className="pcard reveal">
                  <div className="pcard-media">
                    <span className="pbadge">{projectMeta.badge}</span>
                    <img src={imageSrc} alt={proj.name} />
                  </div>
                  <div className="pbody">
                    <span className="loc">{projectMeta.location}</span>
                    <h3>{proj.name}</h3>
                    <div className="pmeta">
                      <span className="price">{proj.startingPrice}</span>
                      <span className="cfg">{proj.config}</span>
                    </div>
                    <div className="ptags">
                      {projectMeta.tags.map((t, idx) => (
                        <span key={idx} className="ptag">{t}</span>
                      ))}
                    </div>
                    <div className="pcta">
                      <Link className="btn-enquire" to="/customer-registration">
                        <span>Enquire Now</span>
                        <span className="arr">→</span>
                      </Link>
                      <Link className="btn-explore" to={`/projects/${proj.slug}`}>
                        <span>Explore</span>
                        <span className="arr">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );

            })}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION - matches original white background */}
      <section className="section faq" id="faq">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <h2 className="serif">Questions, <em>Answered</em></h2>
            <p>Everything you need to know before making an Agarwal address your home.</p>
          </div>

          <div className="faq-wrap reveal">
            {[
              {
                q: "How long has Agarwal Group been building homes?",
                a: "Since 1978, Agarwal Group has been developing residential projects across Mumbai, Vasai, and Virar. With over 47 years of experience, the company has earned the trust of thousands of families through quality construction, timely delivery, and customer-focused developments."
              },
              {
                q: "Where are Agarwal Group's residential projects located?",
                a: "Agarwal Group has residential projects in key locations across Mumbai, Vasai, and Virar, offering excellent connectivity to railway stations, highways, schools, hospitals, and daily conveniences."
              },
              {
                q: "What types of residential properties does Agarwal Group offer?",
                a: "Agarwal Group offers thoughtfully planned 1 BHK, 2 BHK, and 3 BHK apartments designed to meet the needs of first-time homebuyers, growing families, and property investors."
              },
              {
                q: "Are Agarwal Group projects RERA registered?",
                a: "Yes. All applicable Agarwal Group residential projects are registered under the Real Estate Regulatory Authority (RERA), ensuring transparency, regulatory compliance, and greater confidence for homebuyers."
              },
              {
                q: "What makes Agarwal Group different from other builders in Mumbai?",
                a: "Agarwal Group stands apart through its legacy of over four decades, commitment to quality construction, prime project locations, transparent practices, and thoughtfully designed homes. Every project is built to offer long-term value, modern amenities, and a comfortable lifestyle for families."
              },
              {
                q: "Does Agarwal Group offer ready-to-move homes?",
                a: "Agarwal Group offers a mix of ready-to-move and under-construction residential projects, depending on the development. Availability varies by project."
              },
              {
                q: "Can I book a site visit for an Agarwal Group project?",
                a: "Yes. You can schedule a site visit by contacting the sales team through the website or by calling the customer support numbers."
              },
              {
                q: "Are home loans available for Agarwal Group projects?",
                a: "Yes. Agarwal Group projects are approved by leading banks and financial institutions, making it easier for eligible buyers to avail home loan assistance with a smooth financing process."
              },
              {
                q: "Are Agarwal Group projects suitable for investment?",
                a: "Agarwal Group develops projects in well-connected locations across Mumbai, Vasai, and Virar, making them attractive for both end-users and long-term property investors."
              },
              {
                q: "How can I contact Agarwal Group?",
                a: "You can connect with Agarwal Group through the contact form on the website, call the sales team, or visit the corporate office in Virar for personalized assistance."
              }
            ].map((item, idx) => {
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
                      maxHeight: isOpen ? '200px' : '0px',
                      transition: 'max-height .45s var(--ease)',
                    }}
                  >
                    <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: item.a }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURES SECTION - 4-column strip, matches original */}
      <section className="section feat">
        <div className="wrap feat-grid">
          <div className="fitem reveal">
            <div className="fitem-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l6-3v17" />
                <path d="M11 21V9l6 3v9" />
                <path d="M8 9h.01M8 13h.01M8 17h.01" />
              </svg>
            </div>
            <h4 className="serif">Landmark Townships</h4>
            <p>Self-sufficient communities with schools, temples, clubs and lush green spaces — all within your neighbourhood.</p>
          </div>
          <div className="fitem reveal">
            <div className="fitem-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.6" />
              </svg>
            </div>
            <h4 className="serif">Prime Connectivity</h4>
            <p>Strategically located near Vasai–Virar &amp; Mumbai railway stations, with seamless access to the Western Express Highway.</p>
          </div>
          <div className="fitem reveal">
            <div className="fitem-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-6.6-6.6A2 2 0 0 1 3.4 12.6V5.4A2 2 0 0 1 5.4 3.4h7.2a2 2 0 0 1 1.4.6l6.6 6.6a2 2 0 0 1 0 2.8z" />
                <circle cx="8" cy="8" r="1.4" />
              </svg>
            </div>
            <h4 className="serif">Value Advantage</h4>
            <p>Own a premium home with financial benefits that make your purchase even more rewarding.</p>
          </div>
          <div className="fitem reveal">
            <div className="fitem-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M4 21v-9M8 21v-9M12 21v-9M16 21v-9M20 21v-9" />
                <path d="M2 12l10-7 10 7" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h4 className="serif">Bank Approved</h4>
            <p>All projects are approved by leading national banks and institutions, enabling hassle-free home loans.</p>
          </div>
        </div>
      </section>

      {/* 6. CLIENTS (TESTIMONIAL REELS) - matches original horizontal scroll */}
      <section className="section clients" id="testimonials">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Testimonials</span>
            <h2 className="serif">What Our <em>Clients Say</em></h2>
            <p>Real stories from the families who now call an Agarwal address home.</p>
          </div>
          <div className="reels-wrap reveal">
            <div className="reels" id="reels" ref={reelsRef}>
              {testimonialsData.map((item, index) => (
                <article
                  key={index}
                  className="reel"
                  style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <button className="reel-play" aria-label="Play client reel">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <div className="reel-cap">
                    <div className="reel-stars">★★★★★</div>
                    <b>{item.title}</b>
                    <span>{item.project}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="reels-nav">
              <button aria-label="Previous reels" onClick={() => scrollReels(-1, true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button aria-label="Next reels" onClick={() => scrollReels(1, true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROPERTY INSIGHTS (BLOGS) - matches original layout */}
      <section className="section bloghome" id="insights">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">From the Blog</span>
            <h2 className="serif">Property <em>Insights</em></h2>
            <p>Guides, stories and perspectives on living well across Vasai–Virar &amp; Mumbai.</p>
          </div>
          <div className="bcarousel reveal">
            <div className="btrack" id="btrack" ref={btrackRef}>
              {blogPostsData.map((post, index) => (
                <article key={index} className="bpost">
                  <Link
                    className="bpost-media"
                    style={{ backgroundImage: `url(${post.image})` }}
                    to="/blogs"
                    aria-label={post.title}
                  >
                    <span className="bpost-tag">{post.category}</span>
                  </Link>
                  <div className="bpost-body">
                    <div className="bpost-date">{post.date}</div>
                    <h3 className="serif">{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <Link className="bread" to="/blogs">
                      Read More <span className="arr">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="bnav">
              <button aria-label="Previous posts" onClick={() => scrollBlogs(-1, true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button aria-label="More posts" onClick={() => scrollBlogs(1, true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" style={{ padding: 'clamp(80px, 13vh, 150px) 0', background: 'var(--color-paper)' }}>
        <div className="wrap contact-grid">
          {/* Left info */}
          <div className="reveal">
            <span className="eyebrow" style={{ fontSize: '.64rem', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--color-brass-deep)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Contact Us</span>
            <h2 className="serif" style={{ fontFamily: '"Fraunces", serif', fontSize: 'clamp(2.1rem, 4.6vw, 3.6rem)', fontWeight: 300, lineHeight: 1.08, margin: '.4em 0 0', letterSpacing: '-.01em', color: 'var(--color-ink)' }}>
              Find Your <em>Perfect Home</em> With Us
            </h2>
            <p className="lead" style={{ marginTop: '1.2em', color: 'var(--color-ink-soft)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.6 }}>
              Let our expert advisors guide you through the finest residences in Vasai–Virar — the right home, at the right price, with unmatched ease.
            </p>
            <div className="cinfo">
              <div>
                <div className="ct">Phone</div>
                <a href="tel:+918408008001">+91 840 800 8001</a>
                <a href="tel:+918408008002">+91 840 800 8002</a>
              </div>
              <div>
                <div className="ct">Email</div>
                <a href="mailto:sales@agarwalrealties.com">sales@agarwalrealties.com</a>
              </div>
              <div>
                <div className="ct">WhatsApp</div>
                <a href="https://api.whatsapp.com/send?phone=918530081105&amp;text=Hello%2C%20I%27m%20interested%20in%20Agarwal%20Group%20projects">+91 853 008 1105</a>
              </div>
              <div>
                <div className="ct">Corporate Office</div>
                <p>9, Gokul Annexe, Agarwal Gardens, Opp. Muljibhai Mehta School, Gokul Township, Virar (W), Maharashtra — 401303</p>
              </div>
            </div>
          </div>

          {/* Right form Card - matches original 3-field callback form exactly */}
          <div className="form reveal" style={{ background: 'var(--color-ivory)', border: '1px solid var(--color-line)', borderRadius: '8px', padding: 'clamp(26px, 4vw, 42px)', paddingBottom: '24px' }}>
            <div className="ft serif" style={{ fontFamily: '"Fraunces", serif', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-ink)', paddingBottom: '16px', borderBottom: '1px solid var(--color-line)', lineHeight: 1.5 }}>
              Request an Immediate Callback for Exclusive Offers.
            </div>
            <div className="fsub" style={{ fontSize: '.86rem', color: 'var(--color-ink-soft)', paddingTop: '16px', marginBottom: '24px', fontWeight: 300 }}>
              Share your details and our relationship manager will contact you with special offer.
            </div>
            <AnimatePresence mode="wait">
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ display: 'block', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600, marginBottom: '7px' }}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      style={{ width: '100%', border: '1px solid var(--color-line)', borderRadius: '4px', padding: '13px 15px', fontSize: '.95rem', fontFamily: 'inherit', color: 'var(--color-ink)', outline: 'none', background: '#ffffff' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ display: 'block', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600, marginBottom: '7px' }}>Mobile Number</label>
                    <div style={{ display: 'flex', border: '1px solid var(--color-line)', borderRadius: '4px', overflow: 'hidden', background: '#ffffff' }}>
                      <span style={{ display: 'flex', alignItems: 'center', background: 'var(--color-ivory)', borderRight: '1px solid var(--color-line)', fontSize: '.95rem', fontWeight: 500, color: 'var(--color-ink)', padding: '0 13px', userSelect: 'none' }}>+91</span>
                      <input
                        type="tel"
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
                    <label style={{ display: 'block', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600, marginBottom: '7px' }}>Email Address</label>
                    <input
                      type="email"
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address (e.g. name@example.com)"
                      placeholder="you@email.com"
                      style={{ width: '100%', border: '1px solid var(--color-line)', borderRadius: '4px', padding: '13px 15px', fontSize: '.95rem', fontFamily: 'inherit', color: 'var(--color-ink)', outline: 'none', background: '#ffffff' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="pcta-btn btn-enquire"
                    style={{ width: '100%', marginTop: '10px' }}
                  >
                    <span>Get Best Offers</span>
                    <span className="arr">→</span>
                  </button>
                  <div style={{ fontSize: '.7rem', color: 'var(--color-taupe)', textAlign: 'center', marginTop: '10px', lineHeight: 1.4 }}>
                    By submitting, you agree to our Terms &amp; Privacy Policy. We will never share your data.
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
                    Thank you! Your details have been submitted. Our relationship manager will reach out shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM FEED SECTION - matches original profile & grid */}
      <section className="section insta" id="social">
        <div className="wrap">
          <div className="section-head reveal" style={{ marginBottom: 'clamp(34px, 5vh, 52px)' }}>
            <span className="eyebrow">Instagram</span>
            <h2 className="serif">Follow Our <em>Journey</em></h2>
          </div>
          <div className="ig-profile reveal">
            <div className="ig-avatar serif">A</div>
            <div className="ig-id">
              <h3 className="serif">Agarwal Group</h3>
              <div className="handle">@agarwalrealties · Virar, Maharashtra</div>
              <div className="ig-counts">
                <span><b>148</b> Posts</span>
                <span><b>12.4K</b> Followers</span>
                <span><b>326</b> Following</span>
              </div>
            </div>
            <a className="ig-follow" href="https://www.instagram.com/agarwalrealties" target="_blank" rel="noopener">
              Follow @agarwalrealties
            </a>
          </div>
          <div className="highlights reveal">
            <div className="hl">
              <div className="ring"><span>🏠</span></div>
              <small>Infinity</small>
            </div>
            <div className="hl">
              <div className="ring"><span>🌿</span></div>
              <small>Skyrise</small>
            </div>
            <div className="hl">
              <div className="ring"><span>✨</span></div>
              <small>Sky Heights</small>
            </div>
            <div className="hl">
              <div className="ring"><span>🏡</span></div>
              <small>Township</small>
            </div>
            <div className="hl">
              <div className="ring"><span>🏆</span></div>
              <small>Awards</small>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 md:gap-2 lg:gap-4 reveal">
            {instagramPosts.slice(0, 6).map((post) => (
              <a
                key={post.id}
                className="relative block overflow-hidden bg-line-light group w-full"
                style={{ aspectRatio: '4/5' }}
                href="https://www.instagram.com/agarwalrealties"
                target="_blank"
                rel="noopener"
                aria-label="View on Instagram"
              >
                <img
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
