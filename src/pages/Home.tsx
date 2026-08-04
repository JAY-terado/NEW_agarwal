
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { projects } from '../data/projects';
import { contactEmailAxios } from '../_api/user';

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



export default function Home() {

  const [statsTriggered, setStatsTriggered] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInitialVisible, setIsInitialVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  const reelsRef = useRef<HTMLDivElement>(null);
  const btrackRef = useRef<HTMLDivElement>(null);

  // Handle initial scroll if navigating directly to a section URL
  useEffect(() => {
    const path = window.location.pathname;
    const validPaths = ['/story', '/projects', '/contact'];

    if (validPaths.includes(path)) {
      const sectionId = path.substring(1);
      // Small delay to ensure DOM is ready and any initial animations don't interfere
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

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



  // Refs for interval timers to allow resetting on manual click
  const reelsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blogsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reels horizontal scrolling
  const scrollReels = (direction: number, manual = false) => {
    if (reelsRef.current) {
      const card = reelsRef.current.querySelector('.reel');
      const cardWidth = card ? card.getBoundingClientRect().width : 320;
      const gap = 22;
      const setWidth = testimonialsData.length * (cardWidth + gap);

      if (direction === 1) {
        if (reelsRef.current.scrollLeft >= setWidth - 5) {
          reelsRef.current.style.scrollBehavior = 'auto';
          reelsRef.current.scrollLeft -= setWidth;
          void reelsRef.current.offsetWidth;
          reelsRef.current.style.scrollBehavior = 'smooth';
        }
        reelsRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      } else {
        if (reelsRef.current.scrollLeft <= 5) {
          reelsRef.current.style.scrollBehavior = 'auto';
          reelsRef.current.scrollLeft += setWidth;
          void reelsRef.current.offsetWidth;
          reelsRef.current.style.scrollBehavior = 'smooth';
        }
        reelsRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
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
      const gap = 24;
      const setWidth = blogPostsData.length * (cardWidth + gap);

      if (direction === 1) {
        if (btrackRef.current.scrollLeft >= setWidth - 5) {
          btrackRef.current.style.scrollBehavior = 'auto';
          btrackRef.current.scrollLeft -= setWidth;
          void btrackRef.current.offsetWidth;
          btrackRef.current.style.scrollBehavior = 'smooth';
        }
        btrackRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      } else {
        if (btrackRef.current.scrollLeft <= 5) {
          btrackRef.current.style.scrollBehavior = 'auto';
          btrackRef.current.scrollLeft += setWidth;
          void btrackRef.current.offsetWidth;
          btrackRef.current.style.scrollBehavior = 'smooth';
        }
        btrackRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
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



  const countYears = useCountUp(48, 1500, statsTriggered);
  const countProjects = useCountUp(30, 1500, statsTriggered);
  const countFamilies = useCountUp(5000, 2000, statsTriggered);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await contactEmailAxios({
        name: formData.get('name') as string,
        mobile_number: formData.get('mobile_number') as string,
        email: formData.get('email') as string,
      });
      setContactSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="relative">
      {/* 1. HERO SECTION - matches original: video bg, absolute bottom search only */}
      <header className="relative min-h-[100svh] overflow-hidden text-white" style={{ display: 'flex', alignItems: 'center', minHeight: '100svh' }}>
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

        <div
          className="relative z-10 w-full wrap-widescreen pt-24 pb-16 flex flex-col items-start text-left"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInitialVisible || isHovered ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <h1 className="serif drop-shadow-2xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '1.2rem' }}>
              Trusted Real Estate Developer <br className="hidden md:block" />
              in Vasai–Virar &amp; Mumbai <br />
              <em className="serif italic block mt-2" style={{ color: 'var(--color-brass)', fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}>Since 1978</em>
            </h1>

            <p className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2 md:gap-4 mb-10 max-w-4xl drop-shadow-md opacity-90" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', fontWeight: 400 }}>
              <span>Premium 1, 2, 3 &amp; 4 BHK Apartments</span>
              <span className="hidden md:inline opacity-50">|</span>
              <span>RERA Registered Projects</span>
              <span className="hidden md:inline opacity-50">|</span>
              <span>48+ Years of Trust</span>
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 w-full sm:w-auto">
              <Link
                className="group flex items-center justify-center gap-2 px-8 h-14 rounded font-medium tracking-wide uppercase transition-all duration-300 w-full sm:w-auto hover:shadow-lg hover:-translate-y-0.5"
                to="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ background: 'var(--color-brass)', color: '#fff', fontSize: '0.85rem' }}
              >
                <span>Explore Ongoing Projects</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                className="group flex items-center justify-center gap-2 px-8 h-14 rounded font-medium tracking-wide uppercase transition-all duration-300 w-full sm:w-auto border backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 hover:bg-white/20 hover:border-white/50"
                to="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}
              >
                <span>Book Site Visit</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      <section ref={statsRef} className="stats">
        <div className="wrap-widescreen stats-grid">
          <div className="sbox">
            <div className="num">{countYears}+</div>
            <div className="lbl">Years of Excellence in Real Estate Development</div>
          </div>
          <div className="sbox">
            <div className="num">{countProjects}+</div>
            <div className="lbl">Successfully Delivered Residential Projects</div>
          </div>
          <div className="sbox">
            <div className="num">{countFamilies.toLocaleString('en-IN')}+</div>
            <div className="lbl">Happy Families Living in Agarwal Homes</div>
          </div>
          <div className="sbox">
            <div className="num">1 Cr+</div>
            <div className="lbl">Square Feet Developed</div>
          </div>
        </div>
      </section>


      {/* 3. STORY (ABOUT US) - matches original design */}
      <section className="section story" id="story">
        <div className="wrap-widescreen story-grid">
          <div className="reveal">
            <span className="eyebrow">About Us</span>
            <h2 className="serif">About Agarwal Group – Leading Builder in <em>Vasai–Virar Since 1978</em></h2>
            <p>For over 50 years, Agarwal Group has been one of the most trusted real estate developers in Virar, Vasai and the Mumbai Metropolitan Region (MMR). Since 1978, we have successfully delivered thoughtfully planned residential projects that combine quality construction, prime locations, modern amenities and long-term value.</p>
            <p>From affordable 1 BHK homes to spacious 2, 3 and 4 BHK apartments, every Agarwal development is designed around the needs of modern families. Our projects are RERA registered, strategically located near railway stations, schools, hospitals and major highways, making everyday life more convenient.</p>

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
            {/* 
            <div className="values">
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Gem className="w-7 h-7" strokeWidth={1.25} />
                </div>
                <div className="vcard-content">
                  <b>Quality Living</b>
                  <span>Every detail crafted with precision.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Timer className="w-7 h-7" strokeWidth={1.25} />
                </div>
                <div className="vcard-content">
                  <b>On-Time Delivery</b>
                  <span>A commitment upheld for decades.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <BadgeCheck className="w-7 h-7" strokeWidth={1.25} />
                </div>
                <div className="vcard-content">
                  <b>RERA Compliant</b>
                  <span>Transparent, accountable practices.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <HeartHandshake className="w-7 h-7" strokeWidth={1.25} />
                </div>
                <div className="vcard-content">
                  <b>Community First</b>
                  <span>Neighbourhoods that thrive together.</span>
                </div>
              </div>
            </div>

            <div className="quote">
              <p className="serif">"We don't just build structures — we build the places where life's greatest chapters unfold."</p>
            </div> */}
          </div>
          <div className="story-media reveal">
            <img
              src={storyImage}
              alt="Agarwal Group architecture"
              style={{ width: '80%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' }}
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
        <div className="wrap-widescreen">
          <div className="section-head reveal" style={{ position: 'relative' }}>
            {/* <div className="folio-watermark">
              <div style={{ transform: 'translateX(0.2em)' }}>ongoing</div>
              <div style={{ transform: 'translateX(0.3em)' }}>projects</div>
            </div> */}
            <span className="eyebrow" style={{ position: 'relative', zIndex: 1 }}>Ongoing Projects</span>
            <h2 className="serif" style={{ position: 'relative', zIndex: 1 }}>Ongoing Residential Projects in <em>Vasai, Virar & Mumbai</em></h2>
            <p style={{ position: 'relative', zIndex: 1 }}>Explore our premium collection of residential projects offering luxury apartments and affordable homes across Virar and Vasai.</p>
          </div>

          <div className="pgrid">
            {projects.map((proj) => {
              const imageSrc = projectHeroMap[proj.slug];

              // Map project details to exact static page values
              const projectMeta = {
                infinity: {
                  badge: 'Featured · Ready to Move',
                  location: 'Opp. D-Mart, Virar (W), MMR Mumbai',
                  tags: ['⁠Luxury Residences with Deck', '⁠Exclusive Jodi Flats', '⁠Grand Lifestyle Amenities', 'Prime Location']
                },
                skyrise: {
                  badge: 'Ready · OC Received',
                  location: 'Gokhiware, Vasai (E), MMR Mumbai',
                  tags: ['Grand Clubhouses', 'Sky-High Rooftop Amenities', 'Multipurpose Turf', 'Excellent Connectivity']
                },
                'sky-heights': {
                  badge: 'Club Membership Free',
                  location: 'Y.K Nagar, Virar (W), MMR Mumbai',
                  tags: ['Iconic High-Rise Living', 'Grand Clubhouse Experience', '⁠Exclusive Rooftop Amenities', '⁠Grand Podium Amenities']
                },
                horizon: {
                  badge: 'Township Living',
                  location: 'Virar-Nsp Link Road, Virar (W), MMR Mumbai',
                  tags: ['Grand Clubhouses', 'Sky-High Rooftop Amenities', 'Multipurpose Turf', 'Excellent Connectivity']
                }
              }[proj.slug as 'infinity' | 'skyrise' | 'sky-heights' | 'horizon'] || {
                badge: proj.status,
                location: proj.location,
                tags: []
              };

              return (
                <article key={proj.slug} className="pcard">
                  <div className="pcard-media">
                    <span className="pbadge">{projectMeta.badge}</span>
                    <img src={imageSrc} alt={proj.name} />
                  </div>
                  <div className="pbody">
                    <h3>{proj.name}</h3>
                    <span className="loc">{projectMeta.location}</span>
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


      {/* 5. FEATURES SECTION - 4-column strip, matches original */}
      {/* <section className="section feat" style={{ backgroundColor: 'var(--color-paper)' }}>
        <div className="wrap-widescreen feat-grid">
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
      </section> */}

      {/* 6. CLIENTS (TESTIMONIAL REELS) - matches original horizontal scroll */}
      <section className="section clients" id="testimonials" style={{ backgroundColor: 'var(--color-paper)' }}>
        <div className="wrap-widescreen">
          <div className="section-head reveal">
            <span className="eyebrow">Testimonials</span>
            <h2 className="serif">What Our <em>Clients Say</em></h2>
            <p>Real stories from the families who now call an Agarwal address home.</p>
          </div>
          <div className="reels-wrap reveal">
            <div className="reels" id="reels" ref={reelsRef}>
              {[...testimonialsData, ...testimonialsData, ...testimonialsData].map((item, index) => (
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

      {/* 9. FAQ SECTION - matches original white background */}
      <section className="section faq" id="faq" style={{ backgroundColor: 'var(--color-ivory)' }}>
        <div className="wrap-widescreen">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <h2 className="serif">Questions, <em>Answered</em></h2>
            <p>Frequently Asked Questions About Agarwal Group</p>
          </div>

          <div className="faq-wrap reveal">
            {[
              {
                q: "How long has Agarwal Group been building homes?",
                a: "Since 1978, Agarwal Group has been developing residential projects across Virar, Vasai, MMR Mumbai region. With over 48+ years of experience, the company has earned the trust of thousands of families through quality construction, timely delivery, and customer-focused developments."
              },
              {
                q: "Is Agarwal Group a reliable brand for long-term investment?",
                a: "Yes, with over 48+ years of experience and 50+ completed projects, the brand Agarwal Group offers unmatched reliability. Their history of timely delivery and premium quality ensures high capital appreciation for investors."
              },
              {
                q: "Where are Agarwal Group's residential projects located?",
                a: "Agarwal Group has residential projects in key locations across Mumbai, Vasai, and Virar, offering excellent connectivity to railway stations, highways, schools, hospitals, and daily conveniences."
              },
              {
                q: "What property types does Agarwal Group specialize in?",
                a: "The group is a multi-dimensional developer specializing in luxury residential townships, ultra-premium apartments, and commercial office spaces tailored for high-growth businesses."
              },
              {
                q: "What types of residential properties does Agarwal Group offer?",
                a: "Agarwal Group offers thoughtfully planned 1 BHK, 2 BHK, 3 BHK and 4 BHK apartments designed to meet the needs of first-time homebuyers, growing families, and property investors."
              },
              {
                q: "Are Agarwal Group projects RERA registered?",
                a: "Yes. All applicable Agarwal Group residential projects are registered under the MahaRERA, ensuring transparency, regulatory compliance, and greater confidence for homebuyers."
              },
              {
                q: "What makes Agarwal Group different from other builders in Mumbai?",
                a: "Agarwal Group stands apart through its legacy of over four decades, commitment to quality construction, prime project locations, transparent practices, and thoughtfully designed homes. Every project is built to offer long-term value, modern amenities, and a comfortable lifestyle for families."
              },
              {
                q: "Does Agarwal Group offer ready-to-move homes in Virar, Vasai or Mumbai?",
                a: "Agarwal Group offers a mix of ready-to-move and under-construction residential projects, depending on the development. Availability varies by project."
              },
              {
                q: "Are home loans available for Agarwal Group projects?",
                a: "Yes, all Agarwal Group projects are approved by leading banks and financial institutions, making it easier for eligible buyers to avail home loan assistance with a smooth financing process."
              },
              {
                q: "Are Agarwal Group projects suitable for investment?",
                a: "Agarwal Group develops projects in well-connected locations across Mumbai, Vasai, and Virar, making them attractive for both end-users and long-term property investors."
              },
              {
                q: "Can I book a site visit for an Agarwal Group project?",
                a: "Yes. You can schedule an exclusive site visit or receive project brochures, by contacting the sales team through the website or by calling the customer support numbers + 91 84080 08001 / + 91 84080 08002 / + 91 84080 08003 for immediate assistance and personalized property consultation."
              },
              {
                q: "How can I contact Agarwal Group?",
                a: "You can connect with Agarwal Group through the contact form on the website, visit the corporate office in Virar for personalized assistance, or by calling the customer support numbers + 91 84080 08001 / + 91 84080 08002 / + 91 84080 08003."
              },
              {
                q: "What documents are required to buy a property in Agarwal Group?",
                a: "You typically need basic documents such as identity proof (Aadhaar/PAN), address proof, passport-size photographs to buy a property in Agarwal Group."
              },
              {
                q: "Is it better to buy an under-construction or ready-to-move property?",
                a: "Under-construction properties are usually cheaper but may involve waiting time, while ready-to-move properties allow immediate possession with no GST."
              },
              {
                q: "What is the process of property registration?",
                a: "Property registration involves signing the sale deed, paying stamp duty, and registering the property at the local sub-registrar office."
              },
              {
                q: "What factors should I consider before buying a property?",
                a: "You should consider location, connectivity, builder reputation, legal approvals, amenities, resale value, and future infrastructure development."
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
        </div>
      </section>

      {/* 7. PROPERTY INSIGHTS (BLOGS) - matches original layout */}
      <section className="section bloghome" id="insights" style={{ background: 'var(--color-paper)' }}>
        <div className="wrap-widescreen">
          <div className="section-head reveal">
            <span className="eyebrow">Blogs</span>
            <h2 className="serif">Property <em>Insights</em></h2>
            <p>Guides, stories and perspectives on living well across Vasai–Virar &amp; Mumbai.</p>
          </div>
          <div className="bcarousel reveal">
            <div className="btrack" id="btrack" ref={btrackRef}>
              {[...blogPostsData, ...blogPostsData, ...blogPostsData].map((post, index) => (
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
                    <Link className="custom-read-more" to="/blogs" style={{ marginTop: 'auto' }}>
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


      {/* 8. INSTAGRAM FEED SECTION - matches original profile & grid */}
      <section className="section insta" id="social" style={{ background: 'var(--color-ivory)' }}>
        <div className="wrap-widescreen">
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
            <a className="ig-follow flex items-center justify-center gap-2" href="https://www.instagram.com/agarwalrealties" target="_blank" rel="noopener">
              <Instagram className="w-4 h-4" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-12 w-full max-w-7xl mx-auto">
            <div className="flex justify-center w-full reveal overflow-hidden rounded-xl">
              <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background: '#FFF', border: '0', borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: '0', width: 'calc(100% - 2px)' }}><div style={{ padding: '16px' }}> <a href="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ background: '#FFFFFF', lineHeight: '0', padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank" rel="noopener noreferrer"> <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div> <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div></div></div><div style={{ padding: '19% 0' }}></div> <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style={{ paddingTop: '8px' }}> <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>View this post on Instagram</div></div><div style={{ padding: '12.5% 0' }}></div> <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}><div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div> <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div></div><div style={{ marginLeft: '8px' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div> <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div></div><div style={{ marginLeft: 'auto' }}> <div style={{ width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div> <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div> <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div></div></div> <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div></div></a><p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><a href="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">A post shared by MR Vishal Wow (@mrvishalwow)</a></p></div></blockquote>
            </div>
            <div className="flex justify-center w-full reveal overflow-hidden rounded-xl">
              <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background: '#FFF', border: '0', borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: '0', width: 'calc(100% - 2px)' }}><div style={{ padding: '16px' }}> <a href="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ background: '#FFFFFF', lineHeight: '0', padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank" rel="noopener noreferrer"> <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div> <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div></div></div><div style={{ padding: '19% 0' }}></div> <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style={{ paddingTop: '8px' }}> <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>View this post on Instagram</div></div><div style={{ padding: '12.5% 0' }}></div> <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}><div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div> <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div></div><div style={{ marginLeft: '8px' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div> <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div></div><div style={{ marginLeft: 'auto' }}> <div style={{ width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div> <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div> <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div></div></div> <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div></div></a><p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><a href="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">A post shared by MR Vishal Wow (@mrvishalwow)</a></p></div></blockquote>
            </div>
            <div className="flex justify-center w-full reveal overflow-hidden rounded-xl">
              <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background: '#FFF', border: '0', borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: '0', width: 'calc(100% - 2px)' }}><div style={{ padding: '16px' }}> <a href="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ background: '#FFFFFF', lineHeight: '0', padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank" rel="noopener noreferrer"> <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div> <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div></div></div><div style={{ padding: '19% 0' }}></div> <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style={{ paddingTop: '8px' }}> <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>View this post on Instagram</div></div><div style={{ padding: '12.5% 0' }}></div> <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}><div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div> <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div></div><div style={{ marginLeft: '8px' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div> <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div></div><div style={{ marginLeft: 'auto' }}> <div style={{ width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div> <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div> <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div></div></div> <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div> <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div></div></a><p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><a href="https://www.instagram.com/reel/DbU32a1u6yF/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">A post shared by MR Vishal Wow (@mrvishalwow)</a></p></div></blockquote>
            </div>
          </div>

          <div className="flex justify-center mt-16 reveal">
            <a className="custom-read-more" href="https://www.instagram.com/agarwalrealties" target="_blank" rel="noopener noreferrer">
              <span className="custom-read-more__label">View More</span>
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
            </a>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" style={{ padding: 'clamp(80px, 13vh, 150px) 0', background: 'var(--color-paper)' }}>
        <div className="wrap-widescreen contact-grid">
          {/* Left info */}
          <div className="reveal">
            <span className="eyebrow">Contact Us</span>
            <h2 className="serif" style={{ fontFamily: '"Fraunces", serif', fontSize: 'clamp(2.1rem, 4.6vw, 3.6rem)', fontWeight: 300, lineHeight: 1.08, margin: '.4em 0 0', letterSpacing: '-.01em', color: 'var(--color-ink)' }}>
              Contact <em className='text-brass'>Agarwal Group</em>

            </h2>
            <p className="lead" style={{ marginTop: '1.2em', color: 'var(--color-ink-soft)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.6 }}>
              Looking for the best residential project in Virar, Vasai or MMR Mumbai?
            </p>
            <p className="lead" style={{ marginTop: '1.2em', color: 'var(--color-ink-soft)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.6 }}>
              Speak with our property experts to explore premium 1, 2, 3 and 4 BHK apartments, schedule a site visit, compare projects and receive exclusive offers.
            </p>
            <div className="cinfo">
              <div>
                <div className="ct">Phone</div>
                <a href="tel:+918408008001" className="block w-fit transition-transform duration-300 hover:scale-105 hover:text-brass-deep origin-left">+91 840 800 8001</a>
                <a href="tel:+918408008002" className="block w-fit transition-transform duration-300 hover:scale-105 hover:text-brass-deep origin-left">+91 840 800 8002</a>
                <a href="tel:+918408008003" className="block w-fit transition-transform duration-300 hover:scale-105 hover:text-brass-deep origin-left">+91 840 800 8003</a>
              </div>
              <div>
                <div className="ct">Email</div>
                <a href="mailto:sales@agarwalrealties.com" className="block w-fit transition-transform duration-300 hover:scale-105 hover:text-brass-deep origin-left">sales@agarwalrealties.com</a>
              </div>
              <div>
                <div className="ct">WhatsApp</div>
                <a href="https://api.whatsapp.com/send?phone=918530081105&amp;text=Hello%2C%20I%27m%20interested%20in%20Agarwal%20Group%20projects" className="block w-fit transition-transform duration-300 hover:scale-105 hover:text-brass-deep origin-left">+91 853 008 1105</a>
              </div>
              <div>
                <div className="ct">Corporate Office</div>
                <p>9, Gokul Annexe, Agarwal Gardens, Opp. Muljibhai Mehta School, Gokul Township, Virar (W),<br /> Maharashtra — 401303</p>
              </div>
            </div>
          </div>

          {/* Right form Card - matches original 3-field callback form exactly */}
          <div className="form reveal" style={{ background: 'var(--color-ivory)', border: '1px solid var(--color-line)', borderRadius: '8px', padding: 'clamp(26px, 4vw, 42px)', paddingBottom: '24px' }}>
            <div className="ft serif" style={{ fontFamily: '"Fraunces", serif', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-ink)', paddingBottom: '4px', lineHeight: 1.4 }}>
              Request an <span className="text-brass">Immediate Callback</span> for Exclusive Offers.
            </div>
            <div className="fsub" style={{ fontSize: '.86rem', color: 'var(--color-ink-soft)', paddingBottom: '20px', marginBottom: '20px', fontWeight: 300, borderBottom: '1px solid var(--color-line)' }}>
              Share your details and our relationship manager will contact you with special offer.
            </div>
            <AnimatePresence mode="wait">
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                    style={{ width: '100%' }}
                  >
                    <span>Get Best Offers</span>
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
                    Thank you! Your details have been submitted. Our relationship manager will reach out shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>


    </div>
  );
}
