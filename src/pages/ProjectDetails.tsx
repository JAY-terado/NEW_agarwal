import { useState, useEffect } from 'react';
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
  HelpCircle
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

  useEffect(() => {
    setProject(projects.find((p) => p.slug === slug));
    setFormSubmitted(false);
    setSelectedImage(null);
    window.scrollTo(0, 0);
  }, [slug]);

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
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/30 to-pine/50" />
        </div>

        {/* Hero Title & Breadcrumb */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory">
          <div className="text-xs uppercase tracking-widest text-ivory/60 mb-3">
            <Link to="/" className="hover:text-brass-bright">Home</Link> &nbsp;/&nbsp;
            <span className="text-brass-bright">{project.name}</span>
          </div>
          <span className="bg-brass-bright text-pine text-[10px] tracking-wider uppercase font-bold py-1 px-3.5 rounded-full inline-block mb-3.5">
            {project.status}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
            {project.name}
          </h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-ivory/80 font-medium">
            <MapPin className="w-4 h-4 text-brass-bright" />
            <span>{project.location}</span>
          </div>
        </div>
      </section>

      {/* 2. FACTS SUMMARY STRIP */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-6">
        <div className="bg-white border border-line rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-line overflow-hidden">
          <div className="p-5 text-center">
            <span className="text-[10px] uppercase font-bold text-taupe block">Configuration</span>
            <span className="font-serif text-base text-ink font-medium mt-1 block">{project.config}</span>
          </div>
          <div className="p-5 text-center">
            <span className="text-[10px] uppercase font-bold text-taupe block">Starting Price</span>
            <span className="font-serif text-base text-brass-deep font-semibold mt-1 block">{project.startingPrice}</span>
          </div>
          <div className="p-5 text-center">
            <span className="text-[10px] uppercase font-bold text-taupe block">Carpet Area</span>
            <span className="font-serif text-base text-ink font-medium mt-1 block">{project.carpetAreaRange}</span>
          </div>
          <div className="p-5 text-center">
            <span className="text-[10px] uppercase font-bold text-taupe block">Possession</span>
            <span className="font-serif text-base text-ink font-medium mt-1 block">{project.status}</span>
          </div>
          <div className="p-5 text-center col-span-2 md:col-span-1">
            <span className="text-[10px] uppercase font-bold text-taupe block">MahaRERA ID</span>
            <span className="font-serif text-base text-ink font-medium mt-1 block">{project.rera}</span>
          </div>
        </div>
      </section>

      {/* 3. TABS CONTENT - OVERVIEW, PLANS, SPECS */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Left 2 Columns: Project Details */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Overview */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] tracking-widest uppercase font-bold text-brass">Overview</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-light leading-tight">
              {project.overviewTitle}
            </h2>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed font-light">
              {project.overviewText1}
            </p>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed font-light">
              {project.overviewText2}
            </p>

            {/* USPs */}
            <div className="mt-4 flex flex-col gap-3">
              <h4 className="font-serif text-sm font-semibold text-ink">Why Choose This Residence?</h4>
              <ul className="grid gap-2 text-xs sm:text-sm text-ink-soft font-light pl-5 list-disc">
                {project.whyUs.map((usp, idx) => (
                  <li key={idx} className="leading-relaxed">{usp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lifestyle / Amenities */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] tracking-widest uppercase font-bold text-brass">Lifestyle</span>
            <h2 className="font-serif text-2xl text-ink font-light">Amenities Designed for Every Generation</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {project.amenities.map((amen, idx) => (
                <div key={idx} className="bg-white border border-line rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-lg bg-brass/10 text-brass flex items-center justify-center font-bold">
                    {getAmenityIcon(amen)}
                  </div>
                  <span className="text-xs font-semibold text-ink leading-tight">{amen}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plans & Pricing Table */}
          <div id="config" className="flex flex-col gap-5">
            <span className="text-[10px] tracking-widest uppercase font-bold text-brass">Plans &amp; Pricing</span>
            <h2 className="font-serif text-2xl text-ink font-light">Configurations &amp; Indicative Pricing</h2>
            <div className="border border-line rounded-xl overflow-hidden shadow-sm bg-white mt-2">
              {/* Header */}
              <div className="grid grid-cols-4 bg-ivory border-b border-line text-taupe font-bold text-[10px] sm:text-xs uppercase tracking-wider p-4">
                <div>Type</div>
                <div>Carpet Area</div>
                <div>Price</div>
                <div>Status</div>
              </div>

              {/* Body Rows */}
              <div className="divide-y divide-line text-ink font-medium">
                {project.pricing.map((p, idx) => {
                  const isLayoutRowActive = activeLayout === p.type;
                  return (
                    <div key={idx} className="flex flex-col">
                      {/* Pricing Row */}
                      <div
                        className={`grid grid-cols-4 p-4 text-xs sm:text-sm items-center hover:bg-brass/5 transition-colors cursor-pointer ${isLayoutRowActive ? 'bg-brass/5' : ''
                          }`}
                        onClick={() => setActiveLayout(p.type as '1 BHK' | '2 BHK' | '3 BHK')}
                      >
                        <div className="font-serif">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] transition-transform duration-200 ${isLayoutRowActive ? 'rotate-180 text-brass-deep' : 'text-taupe'}`}>
                              ▼
                            </span>
                            <span>{p.type}</span>
                            {!isLayoutRowActive && (
                              <span className="text-[8px] uppercase tracking-wider text-brass-deep bg-brass/10 px-1.5 py-0.5 rounded-full font-bold ml-1 animate-pulse">
                                Click to view 3D
                              </span>
                            )}
                          </div>
                        </div>
                        <div>{p.carpetArea}</div>
                        <div className="text-brass-deep font-semibold">{p.price}</div>
                        <div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${p.status === 'Available' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-brass/15 text-brass-deep'
                            }`}>
                            {p.status}
                          </span>
                        </div>
                      </div>

                      {/* Expandable Image container with smooth Framer Motion height/opacity animation */}
                      <AnimatePresence initial={false}>
                        {isLayoutRowActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="overflow-hidden bg-ivory/10 border-t border-line/40"
                          >
                            <div className="p-4 flex flex-col items-center justify-center">
                              <div className="max-w-2xl w-full border border-line rounded-xl bg-white p-2 shadow-sm">
                                <img
                                  src={layoutImages[p.type as '1 BHK' | '2 BHK' | '3 BHK']}
                                  alt={`${p.type} 3D Layout Plan`}
                                  className="w-full h-auto object-contain max-h-[350px] mx-auto"
                                />
                              </div>
                              <p className="text-[10px] text-taupe text-center mt-2 italic font-light">
                                *Isometric 3D layout plan for {p.type} is an artistic impression for representation purposes.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-[10px] text-taupe italic">
              *Prices are indicative, exclusive of government taxes and other statutory charges, and subject to change. Contact our sales office for latest offers.
            </p>
          </div>

          {/* Specifications */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] tracking-widest uppercase font-bold text-brass">Specifications</span>
            <h2 className="font-serif text-2xl text-ink font-light">Built with Quality That Lasts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 border-t border-line pt-4 mt-2">
              {project.specifications.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-line text-xs sm:text-sm font-medium">
                  <span className="text-taupe uppercase tracking-wider text-[10px]">{spec.key}</span>
                  <span className="text-ink pr-2">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Connectivity */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] tracking-widest uppercase font-bold text-brass">Location</span>
            <h2 className="font-serif text-2xl text-ink font-light">Connected to Everything That Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-2">
              {/* Connectivity Times */}
              <ul className="grid gap-3 font-medium">
                {project.connectivity.map((conn, idx) => (
                  <li key={idx} className="flex justify-between items-center py-2.5 border-b border-line text-xs sm:text-sm">
                    <span className="text-ink-soft">{conn.key}</span>
                    <span className="text-brass-deep font-bold">{conn.value}</span>
                  </li>
                ))}
              </ul>
              {/* Map Placeholder */}
              <div className="aspect-[4/3] bg-white border border-line rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-6 relative">
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
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] tracking-widest uppercase font-bold text-brass">Gallery</span>
            <h2 className="font-serif text-2xl text-ink font-light">A Closer Look at {project.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {project.gallery.map((imgName, idx) => {
                const imgAsset = galleryMap[imgName];
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(imgAsset)}
                    className="aspect-square bg-white border border-line rounded-xl overflow-hidden shadow-sm cursor-zoom-in group relative"
                  >
                    <img
                      src={imgAsset}
                      alt={`Showcase ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RERA details */}
          <div className="border border-line rounded-xl p-5 bg-white shadow-sm flex flex-col gap-2">
            <h4 className="font-serif text-xs font-bold text-brass-deep uppercase tracking-wider">MahaRERA Registration details</h4>
            <div className="text-xs text-ink font-semibold">Registration Number: {project.rera}</div>
            <p className="text-[11px] text-taupe leading-relaxed mt-1 font-light">
              This project is registered under the Maharashtra Real Estate Regulatory Authority (MahaRERA). Detailed information is available on the official portal at maharera.mahaonline.gov.in. All layouts, illustrations, and dimensions shown here are conceptual models and subject to final municipal clearances.
            </p>
          </div>
        </div>

        {/* Right 1 Column: Sticky Enquiry Form */}
        <div id="project-enquiry-form" className="lg:sticky lg:top-24 z-10" style={{ background: 'var(--color-ivory)', border: '1px solid var(--color-line)', borderRadius: '8px', padding: '24px 24px 20px 24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="ft serif" style={{ fontFamily: '"Fraunces", serif', fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-ink)', paddingBottom: '12px', borderBottom: '1px solid var(--color-line)', lineHeight: 1.4 }}>
                  Request an Immediate Callback for Exclusive Offers.
                </div>
                <div className="fsub" style={{ fontSize: '.8rem', color: 'var(--color-ink-soft)', paddingTop: '10px', marginBottom: '16px', fontWeight: 300 }}>
                  Share your details and our relationship manager will contact you with booking options.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ display: 'block', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600, marginBottom: '5px' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    style={{ width: '100%', border: '1px solid var(--color-line)', borderRadius: '4px', padding: '10px 12px', fontSize: '.85rem', fontFamily: 'inherit', color: 'var(--color-ink)', outline: 'none', background: '#ffffff' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ display: 'block', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600, marginBottom: '5px' }}>Mobile Number</label>
                  <div style={{ display: 'flex', border: '1px solid var(--color-line)', borderRadius: '4px', overflow: 'hidden', background: '#ffffff' }}>
                    <span style={{ display: 'flex', alignItems: 'center', background: 'var(--color-ivory)', borderRight: '1px solid var(--color-line)', fontSize: '.85rem', fontWeight: 500, color: 'var(--color-ink)', padding: '0 10px', userSelect: 'none' }}>+91</span>
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
                      style={{ width: '100%', flex: 1, border: 'none', padding: '10px 12px', fontSize: '.85rem', fontFamily: 'inherit', color: 'var(--color-ink)', outline: 'none', background: 'transparent' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ display: 'block', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-taupe)', fontWeight: 600, marginBottom: '5px' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address (e.g. name@example.com)"
                    placeholder="you@email.com"
                    style={{ width: '100%', border: '1px solid var(--color-line)', borderRadius: '4px', padding: '10px 12px', fontSize: '.85rem', fontFamily: 'inherit', color: 'var(--color-ink)', outline: 'none', background: '#ffffff' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '50px', fontSize: '.7rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', background: 'linear-gradient(135deg, var(--color-brass-bright), var(--color-brass))', color: 'var(--color-pine)', border: 'none', cursor: 'pointer', transition: 'transform .4s var(--ease), box-shadow .45s var(--ease)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
                >
                  Get Best Offers →
                </button>
                <div style={{ fontSize: '.65rem', color: 'var(--color-taupe)', textAlign: 'center', marginTop: '8px', lineHeight: 1.4 }}>
                  By submitting, you agree to our Terms &amp; Privacy Policy. We will never share your data.
                </div>
              </form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '30px 0', gap: '14px' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'rgb(16, 185, 129)', display: 'grid', placeItems: 'center', margin: '0 auto' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="serif" style={{ fontFamily: '"Fraunces", serif', fontSize: '1.3rem', fontWeight: 500, color: 'var(--color-ink)' }}>Callback Requested!</h3>
                <p style={{ fontSize: '.8rem', color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
                  Thank you! Your details have been submitted. Our relationship manager will reach out shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
