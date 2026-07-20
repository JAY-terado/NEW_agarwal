import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Send,
  CheckCircle2,
  Building,
  Waves,
  Dumbbell,
  TreePine,
  Gamepad2,
  Users,
  BookOpen,
  Sparkles,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { projects } from '../data/projects';

// Gallery Asset Imports
import galleryExterior from '../assets/gallery-exterior.jpg';
import galleryLobby from '../assets/gallery-lobby.jpg';
import galleryLiving from '../assets/gallery-living.jpg';
import galleryBedroom from '../assets/gallery-bedroom.jpg';
import galleryPool from '../assets/gallery-pool.jpg';
import galleryAerial from '../assets/gallery-aerial.jpg';

import layout1Bhk from '../assets/layout-1bhk.png';
import layout2Bhk from '../assets/layout-2bhk.png';
import layout3Bhk from '../assets/layout-3bhk.png';

// Project Hero Imports
import infinityHero from '../assets/agarwal-infinity-hero.jpg';
import skyriseHero from '../assets/agarwal-skyrise-hero.jpg';
import skyHeightsHero from '../assets/agarwal-sky-heights-hero.jpg';
import horizonHero from '../assets/agarwal-horizon-hero.jpg';

const projectHeroMap: Record<string, string> = {
  infinity: infinityHero,
  skyrise: skyriseHero,
  'sky-heights': skyHeightsHero,
  horizon: horizonHero,
};

const layoutImages = {
  '1 BHK': layout1Bhk,
  '2 BHK': layout2Bhk,
  '3 BHK': layout3Bhk,
};

const galleryMap: Record<string, string> = {
  'gallery-exterior.jpg': galleryExterior,
  'gallery-lobby.jpg': galleryLobby,
  'gallery-living.jpg': galleryLiving,
  'gallery-bedroom.jpg': galleryBedroom,
  'gallery-pool.jpg': galleryPool,
  'gallery-aerial.jpg': galleryAerial,
};

// Amenity Images
import amenityGym from '../assets/gymA.png';
import amenityIndoor from '../assets/indoorA.png';
import amenityLandscape from '../assets/landscaspeA.png';
import amenityLobby from '../assets/lobbyA.png';
import amenityMultipurpose from '../assets/multipurposeA.png';
import amenityPlay from '../assets/playA.png';
import amenityRooftop from '../assets/rooftopA.png';
import amenitySwim from '../assets/swimmingA.png';

const amenityImageMap: Record<string, string> = {
  'Grand Entrance Lobby': amenityLobby,
  'Swimming Pool & Deck': amenitySwim,
  'Fully-Equipped Gymnasium': amenityGym,
  'Landscaped Podium Garden': amenityLandscape,
  'Children\'s Play Area': amenityPlay,
  'Multipurpose Community Hall': amenityMultipurpose,
  'Indoor Games & Library': amenityIndoor,
  'Rooftop Sky Lounge': amenityRooftop
};

const amenityIconMap: Record<string, React.ComponentType<any>> = {
  'Grand Entrance Lobby': Building,
  'Swimming Pool & Deck': Waves,
  'Fully-Equipped Gymnasium': Dumbbell,
  'Landscaped Podium Garden': TreePine,
  "Children's Play Area": Gamepad2,
  'Multipurpose Community Hall': Users,
  'Indoor Games & Library': BookOpen,
  'Rooftop Sky Lounge': Sparkles,
};

const getAmenityIcon = (name: string) => {
  const Icon = amenityIconMap[name.trim()] || HelpCircle;
  return <Icon className="w-4 h-4 text-brass" />;
};

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState(projects.find((p) => p.slug === slug));
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeLayout, setActiveLayout] = useState<'1 BHK' | '2 BHK' | '3 BHK'>('1 BHK');
  const [amenityOffset, setAmenityOffset] = useState(0);
  const [showFloater, setShowFloater] = useState(false);
  const [hasClosedFloater, setHasClosedFloater] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setProject(projects.find((p) => p.slug === slug));
    setFormSubmitted(false);
    setSelectedImage(null);
    setAmenityOffset(0);
    setShowFloater(false);
    setHasClosedFloater(false);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setShowFloater(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!project?.amenities) return;
    const interval = setInterval(() => {
      setAmenityOffset((prev) => (prev + 1) % project.amenities.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [project]);

  const getVisibleAmenities = () => {
    if (!project) return [];
    const arr = project.amenities;
    const len = arr.length;
    if (len === 0) return [];
    if (len <= 2) return arr.map((item, idx) => ({ item, idx }));
    return [
      { item: arr[(amenityOffset) % len], idx: (amenityOffset) % len },
      { item: arr[(amenityOffset + 1) % len], idx: (amenityOffset + 1) % len }
    ];
  };

  const nextAmenity = () => {
    if (!project?.amenities) return;
    setAmenityOffset((prev) => (prev + 1) % project.amenities.length);
  };

  const prevAmenity = () => {
    if (!project?.amenities) return;
    setAmenityOffset((prev) => (prev - 1 + project.amenities.length) % project.amenities.length);
  };

  if (!project) {
    return (
      <div className="py-20 text-center bg-ivory text-ink">
        <h2 className="font-serif text-3xl mb-4">Project Not Found</h2>
        <Link to="/" className="text-brass-deep hover:underline text-sm font-semibold">
          Return to Home
        </Link>
      </div>
    );
  }

  const heroImage = projectHeroMap[project.slug];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-ivory text-ink">
      {/* 1. PROJECT HERO */}
      <section className="hero relative h-[55vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/40 to-pine/10" />
        </div>

        {/* Hero Title & Breadcrumb */}
        <div className="wrap relative z-10 w-full text-ivory pb-12">
          {/* <div className="text-xs uppercase tracking-widest text-ivory/80 mb-3">
            <Link to="/" className="hover:text-brass-bright transition-colors">Home</Link> &nbsp;/&nbsp;
            <span className="text-brass-bright">{project.name}</span>
          </div>
          <span className="bg-brass-bright text-pine text-[10px] tracking-wider uppercase font-bold py-1 px-3.5 rounded-full inline-block mb-3.5">
            {project.status}
          </span> */}
          <h1 className="font-serif text-5xl sm:text-6xl font-light tracking-tight mb-3">
            {project.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-ivory/90 font-medium pb-8">
            <MapPin className="w-4 h-4 text-brass-bright" />
            <span>{project.location}</span>
          </div>
        </div>
      </section>

      {/* 2. FACTS SUMMARY STRIP */}
      <section className="stats relative z-20">
        <div className="wrap grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-line-light">
          <div className="py-10 lg:py-14 px-4 flex flex-col justify-center items-center text-center">
            <div className="font-serif font-light text-brass-deep leading-none text-3xl lg:text-3xl whitespace-nowrap">{project.config}</div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft mt-3 lg:mt-4">Configuration</div>
          </div>
          <div className="py-10 lg:py-14 px-4 flex flex-col justify-center items-center text-center">
            <div className="font-serif font-light text-brass-deep leading-none text-3xl lg:text-3xl whitespace-nowrap">{project.startingPrice}</div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft mt-3 lg:mt-4">Starting Price</div>
          </div>
          <div className="py-10 lg:py-14 px-4 flex flex-col justify-center items-center text-center">
            <div className="font-serif font-light text-brass-deep leading-none text-3xl lg:text-3xl whitespace-nowrap">{project.carpetAreaRange}</div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft mt-3 lg:mt-4">Carpet Area</div>
          </div>
          <div className="py-10 lg:py-14 px-4 flex flex-col justify-center items-center text-center">
            <div className="font-serif font-light text-brass-deep leading-none text-3xl lg:text-3xl whitespace-nowrap">{project.status}</div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft mt-3 lg:mt-4">Possession</div>
          </div>
        </div>
      </section>

      {/* 3. OVERVIEW SECTION */}
      <section className="section story pt-24 pb-12">
        <div className="wrap story-grid" style={{ alignItems: 'flex-start' }}>
          <div>
            <div className="section-head mb-6">
              <span className="eyebrow">Overview</span>
              <h2 className="serif">{project.overviewTitle}</h2>
            </div>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed font-light mb-4">
              {project.overviewText1}
            </p>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed font-light">
              {project.overviewText2}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-serif text-xl font-semibold text-ink mb-6">Why Choose This Residence?</h4>
            <ul className="grid gap-4 text-sm text-ink-soft font-light pl-5 list-disc">
              {project.whyUs.map((usp, idx) => (
                <li key={idx} className="leading-relaxed">{usp}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. LIFESTYLE / AMENITIES */}
      <section className="section pt-24 pb-24 bg-ivory">
        <div className="wrap">
          <div className="section-head mb-14">
            <span className="eyebrow">Lifestyle</span>
            <h2 className="serif mt-2">Amenities Designed for Every Generation</h2>
          </div>
          <div className="relative group/slider">
            <button
              onClick={prevAmenity}
              className="absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-paper border border-line-light flex items-center justify-center text-ink hover:bg-brass hover:text-white hover:border-brass transition-colors shadow-xl opacity-0 group-hover/slider:opacity-100"
              aria-label="Previous amenity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextAmenity}
              className="absolute right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-paper border border-line-light flex items-center justify-center text-ink hover:bg-brass hover:text-white hover:border-brass transition-colors shadow-xl opacity-0 group-hover/slider:opacity-100"
              aria-label="Next amenity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative">
              <AnimatePresence mode="popLayout">
                {getVisibleAmenities().map(({ item, idx }) => (
                  <motion.div
                    layout
                    key={item}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[4/3] bg-line-light"
                  >
                    {/* Image */}
                    <div className="absolute inset-0 transition-transform duration-[1000ms] group-hover:scale-110">
                      <img
                        src={amenityImageMap[item] || `https://placehold.co/600x600/e2e0d8/8a867d?text=Amenity+${idx + 1}`}
                        alt={item}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Dark Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/50 transition-colors duration-700 z-10" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
                      <div className="flex flex-col items-center transition-transform duration-[1000ms] group-hover:scale-105">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-ivory drop-shadow-md mb-3">
                          {item}
                        </span>
                        <div className="w-6 h-[2px] bg-brass/50 group-hover:w-16 group-hover:bg-brass transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PLANS & PRICING */}
      <section className="section pt-24 pb-24 bg-paper">
        <div className="wrap">
          <div className="section-head mb-14">
            <span className="eyebrow">Plans & Pricing</span>
            <h2 className="serif">Configurations & Indicative Pricing</h2>
          </div>

          <div className="flex flex-col lg:flex-row w-full border border-line-light rounded-2xl overflow-hidden shadow-sm bg-paper items-stretch">
            {/* Left Column: Pricing Table */}
            <div className="flex flex-col w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-line-light">
              {/* Header */}
              <div className="grid grid-cols-[1.2fr_1fr_1.5fr_1fr] bg-pine/5 border-b border-line-light text-taupe font-bold text-[10px] sm:text-xs uppercase tracking-wider p-5">
                <div>Type</div>
                <div>Carpet</div>
                <div>Price</div>
                <div>Status</div>
              </div>

              {/* Body Rows */}
              <div className="divide-y divide-line text-ink font-medium flex-1 flex flex-col">
                {project.pricing.map((p, idx) => {
                  const isLayoutRowActive = activeLayout === p.type;
                  return (
                    <div
                      key={idx}
                      className={`flex-1 grid grid-cols-[1.2fr_1fr_1.5fr_1fr] p-5 text-sm items-center hover:bg-brass/5 transition-colors cursor-pointer ${isLayoutRowActive ? 'bg-brass/5 border-l-4 border-l-brass-deep' : 'border-l-4 border-l-transparent'
                        }`}
                      onClick={() => setActiveLayout(p.type as '1 BHK' | '2 BHK' | '3 BHK')}
                    >
                      <div className="font-serif pr-2 flex items-center gap-2">
                        <span className={`text-xs transition-opacity duration-200 ${isLayoutRowActive ? 'opacity-100 text-brass-deep' : 'opacity-0'}`}>
                          ▶
                        </span>
                        <span className="text-base">{p.type}</span>
                      </div>
                      <div>
                        {p.carpetArea.replace(' sq.ft', '')} <span className="text-[10px] text-taupe">sq.ft</span>
                      </div>
                      <div className="text-brass-deep font-semibold text-[11px] sm:text-xs md:text-sm">Price on Request</div>
                      <div>
                        <span className={`text-[9px] px-2 py-1 rounded-full font-bold uppercase ${p.status === 'Available' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-brass/15 text-brass-deep'
                          }`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Layout Image Viewer */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayout}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={layoutImages[activeLayout]}
                    alt={`${activeLayout} 3D Layout Plan`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                    onClick={() => setSelectedImage(layoutImages[activeLayout])}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <p className="text-xs text-taupe italic mt-4 w-full">
            *Prices are indicative, exclusive of government taxes and other statutory charges, and subject to change. Contact our sales office for latest offers.
          </p>
        </div>
      </section>

      {/* 6A. SPECIFICATIONS */}
      <section className="section pt-24 pb-24 bg-ivory">
        <div className="wrap max-w-4xl mx-auto">
          <div className="section-head mb-14">
            <span className="eyebrow">Specifications</span>
            <h2 className="serif mt-2">Built with Quality That Lasts</h2>
          </div>
          <div className="grid gap-y-2 border-t border-line pt-6">
            {project.specifications.map((spec, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-line text-sm font-medium gap-2">
                <span className="text-taupe uppercase tracking-wider text-xs">{spec.key}</span>
                <span className="text-ink sm:text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6B. LOCATION */}
      <section className="section pt-24 pb-24 bg-paper">
        <div className="wrap max-w-5xl mx-auto">
          <div className="section-head mb-14">
            <span className="eyebrow">Location</span>
            <h2 className="serif mt-2">Connected to Everything</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-white border border-line-light rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-6 relative">
              <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
                <rect width="600" height="400" fill="#F6F4EE" />
                <rect x="0" y="150" width="600" height="70" fill="#bcd3dc" opacity=".5" />
                <g stroke="#ddd3bf" strokeWidth="10">
                  <line x1="0" y1="90" x2="600" y2="90" />
                  <line x1="0" y1="300" x2="600" y2="300" />
                  <line x1="130" y1="0" x2="130" y2="400" />
                  <line x1="430" y1="0" x2="430" y2="400" />
                </g>
                <circle cx="300" cy="200" r="46" fill="#B68E3F" opacity=".18" />
                <path d="M300 158 c-24 0 -40 18 -40 40 c0 30 40 64 40 64 c0 0 40 -34 40 -64 c0 -22 -16 -40 -40 -40Z" fill="#94762F" />
                <circle cx="300" cy="198" r="15" fill="#F6F4EE" />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 p-6 bg-pine/5 backdrop-blur-[1px]">
                <span className="font-serif text-sm font-semibold text-pine text-center">Agarwal Project Site Location</span>
                <span className="text-[10px] text-taupe uppercase tracking-wider text-center">Gokul Sub-Region, Vasai-Virar, MH</span>
              </div>
            </div>

            <ul className="grid gap-3 font-medium">
              {project.connectivity.map((conn, idx) => (
                <li key={idx} className="flex justify-between items-center py-4 border-b border-line text-sm">
                  <span className="text-ink-soft text-base">{conn.key}</span>
                  <span className="text-brass-deep font-bold text-base">{conn.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. GALLERY */}
      <section className="section pt-24 pb-24 bg-ivory">
        <div className="wrap">
          <div className="section-head mb-14">
            <span className="eyebrow">Gallery</span>
            <h2 className="serif">A Closer Look at {project.name}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {project.gallery.map((imgName, idx) => {
              const imgAsset = galleryMap[imgName];
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(imgAsset)}
                  className="aspect-square bg-paper border border-line-light rounded-2xl overflow-hidden shadow-sm cursor-zoom-in group relative"
                >
                  <img
                    src={imgAsset}
                    alt={`Showcase ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Floating Callback Form Widget */}
      <AnimatePresence>
        {showFloater && !hasClosedFloater && !isContactVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-40 right-6 z-[99] w-[360px] bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 border border-line-light flex flex-col"
          >
            <button
              onClick={() => setHasClosedFloater(true)}
              className="absolute top-5 right-5 text-taupe hover:text-ink transition-colors bg-paper hover:bg-line-light rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-serif text-[20px] text-ink mb-6 font-semibold pr-4">Request an Immediate Callback.</h3>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-taupe mb-1.5 tracking-wider">Full Name</label>
                <input type="text" placeholder="Full name" className="border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep transition-colors bg-white" required />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-taupe mb-1.5 tracking-wider">Mobile Number</label>
                <div className="flex">
                  <div className="bg-paper border border-line border-r-0 rounded-l-xl px-4 flex items-center justify-center font-bold text-sm text-ink">+91</div>
                  <input type="text" placeholder="00000 00000" className="border border-line rounded-r-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep transition-colors flex-1 bg-white" required />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-taupe mb-1.5 tracking-wider">Email Address</label>
                <input type="email" placeholder="you@email.com" className="border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep transition-colors bg-white" required />
              </div>
              <button type="submit" className="bg-[#cca968] text-pine font-bold uppercase tracking-widest text-[11px] py-3.5 rounded-full mt-2 hover:bg-[#b59254] transition-colors w-full flex items-center justify-center gap-2">
                GET BEST OFFERS &rarr;
              </button>
            </form>
            <p className="text-[9px] text-taupe text-center mt-4">By submitting, you agree to our Terms & Privacy Policy.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. ENQUIRY & RERA */}
      <section ref={contactRef} className="section pt-24 pb-24 bg-paper">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="flex flex-col gap-12">
            <div className="section-head">
              <span className="eyebrow">Contact Us</span>
              <h2 className="serif">Register Your Interest</h2>
              <p className="mt-6 text-ink-soft leading-relaxed">
                Connect with our relationship managers today. Fill out the form, and we'll reach out to discuss booking options, schedule a site visit, and share exclusive offers available for {project.name}.
              </p>
            </div>

            <div className="border border-line-light rounded-2xl p-8 bg-white shadow-sm flex flex-col gap-3">
              <h4 className="font-serif text-sm font-bold text-brass-deep uppercase tracking-wider">MahaRERA Registration Details</h4>
              <div className="text-sm text-ink font-semibold">Registration Number: {project.rera}</div>
              <p className="text-xs text-taupe leading-relaxed mt-2 font-light">
                This project is registered under the Maharashtra Real Estate Regulatory Authority (MahaRERA). Detailed information is available on the official portal at maharera.mahaonline.gov.in. All layouts, illustrations, and dimensions shown here are conceptual models and subject to final municipal clearances.
              </p>
            </div>
          </div>

          <div className="bg-ivory border border-line-light rounded-3xl p-8 shadow-xl ">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <div className="serif text-2xl text-ink pb-4 border-b border-line-light leading-tight">
                    Request an Immediate Callback.
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label className="block text-xs tracking-widest uppercase text-taupe font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      className="w-full border border-line-light rounded-xl p-4 text-sm text-ink outline-none bg-paper focus:border-brass transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-xs tracking-widest uppercase text-taupe font-bold">Mobile Number</label>
                    <div className="flex border border-line-light rounded-xl overflow-hidden bg-paper focus-within:border-brass transition-colors">
                      <span className="flex items-center bg-ivory border-r border-line-light text-sm font-medium text-ink px-4 select-none">+91</span>
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
                        className="w-full flex-1 border-none p-4 text-sm text-ink outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-xs tracking-widest uppercase text-taupe font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address (e.g. name@example.com)"
                      placeholder="you@email.com"
                      className="w-full border border-line-light rounded-xl p-4 text-sm text-ink outline-none bg-paper focus:border-brass transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full p-4 rounded-full text-sm font-bold tracking-widest uppercase bg-gradient-to-br from-brass-bright to-brass text-pine border-none cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    Get Best Offers →
                  </button>
                  <div className="text-xs text-taupe text-center mt-2 leading-relaxed">
                    By submitting, you agree to our Terms &amp; Privacy Policy.
                  </div>
                </form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 grid place-items-center mx-auto">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="serif text-3xl font-medium text-ink">Callback Requested!</h3>
                  <p className="text-base text-ink-soft leading-relaxed">
                    Thank you! Your details have been submitted. Our relationship manager will reach out shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. LIGHTBOX / PHOTO VIEWER MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={selectedImage}
              alt="Lightbox View"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
