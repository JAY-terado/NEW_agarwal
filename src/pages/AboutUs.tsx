import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Hammer, Map, Trophy,
  CalendarCheck, BadgeCheck, Users, Linkedin, Mail, ChevronLeft, ChevronRight, Trees
} from 'lucide-react';
import heroImage from '../assets/gallery-pool.jpg';
import storyImage from '../assets/gallery-living.jpg';
import visionImage from '../assets/blog-interiors.jpg';
import ceo1 from '../assets/ceo1.png';
import ceo2 from '../assets/ceo2.png';
import ceo3 from '../assets/ceo3.png';
import ceo4 from '../assets/ceo4.png';

const TEAM_TESTIMONIALS = [
  {
    name: "Ajay Devgan",
    role: "AVP & PROJECT MANAGER",
    quote: "The journey at Agarwal Group began with a sense of anticipation and a multitude of opportunities for growth and learning. Completing challenging projects and achieving significant milestones has been a defining feature of my journey. The emphasis on quality is unmatched.",
    image: ceo1
  },
  {
    name: "Hrithik Roshan",
    role: "MANAGEMENT TRAINEE",
    quote: "At Agarwal Group, I've found a unique and welcoming environment that actively encourages professional and personal growth. The company's culture extends beyond mere motivation; it redefines the conventional real estate approach by prioritizing well-being and learning.",
    image: ceo2
  },
  {
    name: "Kareena Kapoor",
    role: "MANAGER - CRM",
    quote: "Agarwal Group is simply exceptional. Their expertise and dedication have made all the difference in my real estate endeavors. Their unwavering commitment to quality, coupled with their innovative approach, has consistently delivered outstanding results.",
    image: ceo3
  },
  {
    name: "Arjun Rampal",
    role: "AGM - GROWTH & CROSS FUNCTION INITIATIVES",
    quote: "Having been a part of Agarwal Group for five inspiring years, I have thrived in their innovative, empowering work environment. Exceptional mentorship and visionary leadership have shaped my professional growth, while the diverse and collaborative team culture drives success.",
    image: ceo4
  }
];

export default function AboutUs() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < TEAM_TESTIMONIALS.length - visibleCount;

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canScrollLeft) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const visiblePartners = TEAM_TESTIMONIALS.slice(currentIndex, currentIndex + visibleCount);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-ivory text-ink min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
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
            Trusted Real Estate Developer in Vasai, Virar & Mumbai Since 1969
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
                Established in <strong>1978</strong>, Agarwal Group has become one of the most respected real estate developers in <strong>Vasai–Virar and Mumbai</strong>, with a legacy of delivering thoughtfully planned residential communities.
              </p>
              <p>
                From affordable homes to premium apartments, every project reflects our commitment to exceptional construction quality, intelligent space planning, modern lifestyle amenities, and timely delivery.
              </p>
              <p>
                With <strong>30+</strong> completed residential projects and <strong>5,000+</strong> happy families, we continue to create homes that offer comfort today and appreciation for the future.
              </p>
              <div className="quote">
                <p className="serif">"Every Agarwal development is designed to build not just homes, but thriving communities where families grow, memories are created, and investments gain lasting value."</p>
              </div>
            </div>
            <div className="story-media">
              <img
                src={storyImage}
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
              <div className="folio-watermark" style={{ top: '-60px', whiteSpace: 'nowrap', left: 'auto', right: '-100%' }}>
                <div>choose agarwal</div>
              </div>
              <span className="eyebrow" style={{ position: 'relative', zIndex: 1 }}>Why Homebuyers Choose Agarwal Group</span>
              {/* <h2 className="serif" style={{ position: 'relative', zIndex: 1 }}>
                Uncompromising <br /><em>Quality & Trust</em>
              </h2> */}
            </div>
            <div className="values" style={{ marginTop: '4rem' }}>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Trophy className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>48+ Years of Trusted Experience</b>
                  <span>Nearly five decades of delivering residential projects with consistent quality, transparency, and customer satisfaction.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Map className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>Prime Locations Across Mumbai, Vasai & Virar</b>
                  <span>Our developments are strategically located near railway stations, highways, schools, hospitals, business hubs, and everyday conveniences.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Hammer className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>Superior Construction Quality</b>
                  <span>Every home is built using premium materials, advanced engineering practices, and strict quality control standards.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <CalendarCheck className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>Timely Project Delivery</b>
                  <span>We are committed to delivering homes within promised timelines while maintaining the highest construction standards.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <BadgeCheck className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>RERA Registered Projects</b>
                  <span>All ongoing developments comply with MahaRERA regulations, ensuring transparency, legal compliance, and buyer confidence. </span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Users className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="vcard-content">
                  <b>Customer-Centric Approach</b>
                  <span>From site visits to possession and after-sales support, we strive to make every home-buying journey smooth, transparent, and rewarding.</span>
                </div>
              </div>
              <div className="vcard">
                <div className="vcard-icon-clear">
                  <Trees className="w-5 h-5" strokeWidth={1.8} />
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
                src={visionImage}
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
                src={heroImage}
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
                For more than four decades, Agarwal Group has developed residential communities across:
              </p>
              <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: 'var(--color-ink-soft)', fontWeight: 300 }}>
                <li>• Virar West</li>
                <li>• Virar East</li>
                <li>• Vasai East</li>
                <li>• Vasai West</li>
                <li style={{ gridColumn: 'span 2' }}>• Mumbai Metropolitan Region (MMR)</li>
              </ul>
              <p>
                Our portfolio includes premium apartments, integrated townships, and lifestyle-focused residential developments designed for modern families.
              </p>
            </div>
            <div className="story-media" style={{ direction: 'ltr' }}>
              <img
                src={visionImage}
                alt="Agarwal Group Presence"
                style={{ width: '80%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Hear From Our Team */}
        <section className="section pt-24 pb-0">
          <div className="wrap-widescreen">
            <div className="section-head mb-14" style={{ position: 'relative' }}>
              {/* <div className="folio-watermark" style={{ top: '-30%' }}>
                <div style={{ transform: 'translateX(0.2em)' }}>core</div>
                <div style={{ transform: 'translateX(0.3em)' }}>team</div>
              </div> */}
              <span className="eyebrow" style={{ position: 'relative', zIndex: 1 }}>Our People</span>
              <h2 className="serif" style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>The Team Behind <em>Every Landmark</em></h2>
            </div>
            <div className="relative w-full flex items-center justify-center group my-12">
              <button
                onClick={handlePrev}
                disabled={!canScrollLeft}
                className={`absolute left-0 lg:-left-12 z-20 p-3 rounded-full bg-paper border border-line-light text-brass-deep hover:bg-brass-bright hover:text-paper hover:border-transparent transition-all shadow-md
                  ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100 lg:opacity-100'}`}
                aria-label="Previous members"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.div
                className="flex justify-center gap-4 md:gap-6 w-full h-[450px] items-center cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, { offset }) => {
                  if (offset.x < -40) handleNext();
                  else if (offset.x > 40) handlePrev();
                }}
              >
                <AnimatePresence mode="popLayout">
                  {visiblePartners.map((member, idx) => {
                    const memberId = currentIndex + idx;
                    const isHovered = hoveredId === memberId;
                    const isAnyHovered = hoveredId !== null;

                    return (
                      <TeamCard
                        key={memberId}
                        member={member}
                        isHovered={isHovered}
                        isAnyHovered={isAnyHovered}
                        onHover={() => setHoveredId(memberId)}
                        onLeave={() => setHoveredId(null)}
                        isMobile={visibleCount === 1}
                      />
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              <button
                onClick={handleNext}
                disabled={!canScrollRight}
                className={`absolute right-0 lg:-right-12 z-20 p-3 rounded-full bg-paper border border-line-light text-brass-deep hover:bg-brass-bright hover:text-paper hover:border-transparent transition-all shadow-md
                  ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100 lg:opacity-100'}`}
                aria-label="Next members"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="pt-8 border-t border-line/40 flex items-center justify-between mt-4 max-w-[1150px] mx-auto">
              <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brass-deep hover:text-pine transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
              <span className="text-[10px] text-taupe font-medium">Agarwal Group Corporate</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function TeamCard({ member, isHovered, isAnyHovered, onHover, onLeave, isMobile }: any) {
  const cardVariants = {
    idle: {
      width: isMobile ? '320px' : '240px',
      scale: 1,
      opacity: isAnyHovered ? 0.6 : 1,
      filter: isAnyHovered ? 'brightness(0.8) grayscale(0.3)' : 'brightness(1) grayscale(0)',
      zIndex: 1,
    },
    hovered: {
      width: isMobile ? '320px' : '380px',
      scale: 1.05,
      opacity: 1,
      filter: 'brightness(1) grayscale(0)',
      zIndex: 10,
    }
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="idle"
      animate={isHovered ? 'hovered' : 'idle'}
      transition={{
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        opacity: { duration: 0.3 }
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shrink-0 bg-pine/5 border border-line-light`}
      style={{
        boxShadow: isHovered
          ? '0 20px 40px -10px rgba(0,0,0,0.2)'
          : '0 10px 30px -10px rgba(0,0,0,0.05)'
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/70 to-transparent opacity-90" />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
        <motion.div
          layout="position"
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-20"
        >
          <h3 className="font-serif text-[1.4rem] font-medium text-paper tracking-wide drop-shadow-md">
            {member.name}
          </h3>
          <p className="text-[10px] font-medium text-brass-bright uppercase tracking-widest mt-1">
            {member.role}
          </p>
        </motion.div>

        <div className="overflow-hidden relative z-20">
          <AnimatePresence initial={false}>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{
                  height: { duration: 0.3, ease: 'easeOut' },
                  opacity: { duration: 0.2, delay: 0.1 },
                  marginTop: { duration: 0.3 }
                }}
              >
                <p className="text-xs text-paper/80 leading-relaxed font-light mb-4">
                  {member.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-paper/10 text-paper/80">
                  <a href="#" className="hover:text-brass-bright transition-colors"><Linkedin className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-brass-bright transition-colors"><Mail className="w-4 h-4" /></a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
