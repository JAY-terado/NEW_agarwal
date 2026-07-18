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
                        className={`grid grid-cols-4 p-4 text-xs sm:text-sm items-center hover:bg-brass/5 transition-colors cursor-pointer ${
                          isLayoutRowActive ? 'bg-brass/5' : ''
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
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            p.status === 'Available' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-brass/15 text-brass-deep'
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
        <div id="project-enquiry-form" className="bg-white border border-line rounded-2xl p-6 shadow-2xl lg:sticky lg:top-24 z-10 overflow-hidden">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="pb-2 border-b border-line mb-2">
                  <h3 className="font-serif text-lg text-ink font-semibold">Interested in {project.name}?</h3>
                  <p className="text-[11px] text-taupe mt-1 font-light">Share your details and our relationship manager will contact you with booking options.</p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-widest uppercase font-bold text-taupe">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="border border-line rounded px-3 py-2 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-widest uppercase font-bold text-taupe">Mobile Number</label>
                  <div className="flex border border-line rounded overflow-hidden bg-ivory/20 focus-within:border-brass">
                    <span className="bg-ivory border-r border-line text-[10px] font-bold text-taupe flex items-center px-3">+91</span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10 digit number"
                      className="px-3 py-2 text-xs focus:outline-none w-full text-ink font-medium bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-widest uppercase font-bold text-taupe">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="border border-line rounded px-3 py-2 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-widest uppercase font-bold text-taupe">Preferred Configuration</label>
                  <select
                    required
                    className="border border-line rounded px-3 py-2 text-xs focus:outline-none focus:border-brass bg-white text-ink font-medium"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-widest uppercase font-bold text-taupe">Message</label>
                  <textarea
                    rows={2}
                    placeholder="I'd like to schedule a site visit..."
                    className="border border-line rounded px-3 py-2 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brass hover:bg-brass-deep text-pine hover:text-white py-3 rounded-full font-bold uppercase tracking-wider text-[10px] transition-colors mt-2 flex items-center justify-center gap-1.5 shadow-md"
                >
                  Request a Callback
                  <Send className="w-3 h-3" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-ink font-semibold">
                  Callback Requested!
                </h3>
                <p className="text-[11px] text-ink-soft max-w-sm leading-relaxed font-light">
                  Thank you! Your inquiry has been submitted. Our sales team will reach out to you within 24 hours.
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
