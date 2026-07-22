import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Leaf,
  Dumbbell,
  Car,
  Sun
} from 'lucide-react';

const iconComponents: Record<string, React.ElementType> = {
  Leaf,
  Dumbbell,
  Car,
  Sun,
};
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

import qrSample from '../assets/qrSample.svg';

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

function ReraDetailsWidget({ project }: { project: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="absolute top-[82px] right-0 z-[40]">
      {/* The Expandable Panel */}
      <div
        className={`
          text-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden origin-top-right
          w-[280px] sm:w-[320px] /* Fixed width for both states to prevent leftward movement */
          border border-white/10 backdrop-blur-[14px]
          ${isExpanded ? 'h-[420px] p-6 bg-black/40' : 'h-[50px] cursor-pointer bg-black/15 hover:bg-black/25'}
        `}
        onClick={!isExpanded ? toggleExpand : undefined}
      >
        {/* Collapsed State Content */}
        <div
          className={`h-[50px] flex items-center justify-center transition-opacity duration-200 absolute top-0 left-0 right-0
            ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <span className="text-xs sm:text-sm tracking-[0.1em] font-medium text-white/90">MAHARERA DETAILS</span>
        </div>

        {/* Expanded State Content */}
        <div
          className={`flex flex-col items-center pt-2 transition-opacity duration-500 delay-100
            ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          {/* Close Button */}
          <button
            onClick={toggleExpand}
            className="absolute top-4 right-4 p-1 rounded-full border border-white/40 hover:bg-white/10 transition-colors"
            aria-label="Close details"
          >
            <X size={16} strokeWidth={1.5} className="text-white/80" />
          </button>

          {/* Logo Area */}
          <div className="mt-4 mb-4 flex flex-col items-center text-center">
            <h2 className="text-xl sm:text-2xl tracking-[0.2em] font-light mb-1 uppercase">{project.name}</h2>
            <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/80">{project.location.split(',')[0]}</p>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-2 mb-4 rounded-sm">
            <img
              src={qrSample}
              alt="RERA QR Code"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            />
          </div>

          {/* Registration Details */}
          <div className="text-center mb-6 flex flex-col gap-1">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] text-white/90">RERA Registration Number</p>
            <p className="text-sm sm:text-lg tracking-widest font-light">{project.rera || 'N/A'}</p>
          </div>

          {/* Link */}
          <a
            href="https://maharera.mahaonline.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm tracking-[0.1em] pb-1 border-b border-white hover:text-white/80 hover:border-white/80 transition-colors"
          >
            MAHARERA WEBSITE
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState(projects.find((p) => p.slug === slug));
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: string[], index: number } | null>(null);

  const [showFloater, setShowFloater] = useState(false);
  const [hasClosedFloater, setHasClosedFloater] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const contactRef = useRef<HTMLElement>(null);
  const [activeAmenityTab, setActiveAmenityTab] = useState<'Elevation' | 'Podium Amenities' | 'Terrace Amenities'>('Podium Amenities');

  useEffect(() => {
    setProject(projects.find((p) => p.slug === slug));
    setFormSubmitted(false);
    setLightbox(null);
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
      <div className="min-h-[100svh] flex flex-col">
        {/* 1. PROJECT HERO */}
        <section className="hero relative flex-1 flex items-end overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/40 to-pine/10" />
          </div>

          <ReraDetailsWidget project={project} />

          {/* Hero Title & Breadcrumb */}
          <div className="wrap-widescreen relative z-10 w-full text-ivory pb-12">
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
          <div className="wrap-widescreen grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-line-light">
            <div className="py-8 lg:py-14 px-2 lg:px-4 flex flex-col justify-center items-center text-center">
              <div className="font-serif font-light text-brass-deep leading-tight text-xl sm:text-2xl lg:text-3xl">{project.config}</div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft mt-2 lg:mt-4">Configuration</div>
            </div>
            <div className="py-8 lg:py-14 px-2 lg:px-4 flex flex-col justify-center items-center text-center">
              <div className="font-serif font-light text-brass-deep leading-tight text-xl sm:text-2xl lg:text-3xl">{project.startingPrice}</div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft mt-2 lg:mt-4">Starting Price</div>
            </div>
            <div className="py-8 lg:py-14 px-2 lg:px-4 flex flex-col justify-center items-center text-center">
              <div className="font-serif font-light text-brass-deep leading-tight text-xl sm:text-2xl lg:text-3xl">{project.carpetAreaRange}</div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft mt-2 lg:mt-4">Carpet Area</div>
            </div>
            <div className="py-8 lg:py-14 px-2 lg:px-4 flex flex-col justify-center items-center text-center">
              <div className="font-serif font-light text-brass-deep leading-tight text-xl sm:text-2xl lg:text-3xl">{project.status}</div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft mt-2 lg:mt-4">Possession</div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. OVERVIEW */}
      <section id="overview" className="section story pt-24 pb-12">
        <div className="wrap-widescreen story-grid" style={{ alignItems: 'flex-start' }}>
          <div>
            <div className="section-head !mb-4 lg:!mb-6">
              <span className="eyebrow">Overview</span>
              <h2 className="serif">{project.overviewTitle}</h2>
            </div>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed font-light mb-4 !max-w-none">
              {project.overviewText1}
            </p>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed font-light mb-10 !max-w-none">
              {project.overviewText2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              {(project.overviewFeatures || [
                { title: "Landscaped Gardens", desc: "Lush green spaces to unwind in", icon: "Leaf" },
                { title: "Fitness Zones", desc: "State-of-the-art equipment", icon: "Dumbbell" },
                { title: "Podium Parking", desc: "Dedicated covered parking spaces", icon: "Car" },
                { title: "Sky Deck Views", desc: "Panoramic vistas from the rooftop", icon: "Sun" }
              ]).map((feat, idx) => {
                const IconComponent = iconComponents[feat.icon] || Leaf;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-line-light flex items-center justify-center shrink-0 text-pine">
                      <IconComponent className="w-[20px] h-[20px]" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink mb-1">{feat.title}</h4>
                      <p className="text-[14px] text-ink-soft font-medium">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Asymmetric Image Grid */}
          <div className="flex flex-col gap-1 md:gap-2 h-full mt-10 lg:mt-0">
            <div className="w-full aspect-[2/1] lg:aspect-[21/9] bg-line-light overflow-hidden">
              <img src={galleryMap[project.gallery[0]]} alt="Overview 1" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="flex gap-1 md:gap-2 w-full">
              <div className="flex-1 aspect-[4/3] lg:aspect-[16/10] bg-line-light overflow-hidden">
                <img src={galleryMap[project.gallery[1]]} alt="Overview 2" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="flex-1 aspect-[4/3] lg:aspect-[16/10] bg-line-light overflow-hidden">
                <img src={galleryMap[project.gallery[2]]} alt="Overview 3" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. AMENITIES */}
      <section id="amenities" className="section pt-24 pb-24 bg-ivory">
        <div className="wrap-widescreen">
          <div className="section-head mb-10">
            <span className="eyebrow">Lifestyle</span>
            <h2 className="serif mt-2">Amenities Designed for Every Generation</h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-10 justify-center md:justify-start">
            {['Elevation', 'Podium Amenities', 'Terrace Amenities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAmenityTab(tab as any)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${activeAmenityTab === tab
                  ? 'bg-brass-deep text-white shadow-md'
                  : 'bg-white border border-line-light text-ink hover:border-brass-deep hover:text-brass-deep'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, idx) => {
              let spanClass = 'col-span-1';
              let heightClass = 'h-[250px] lg:h-[320px]';

              const patternIdx = idx % 8;
              if (patternIdx === 0) spanClass = 'col-span-1 md:col-span-2';
              else if (patternIdx === 1) spanClass = 'col-span-1 md:col-span-1';
              else if (patternIdx === 2) spanClass = 'col-span-1 md:col-span-1';
              else if (patternIdx === 3) spanClass = 'col-span-1 md:col-span-1';
              else if (patternIdx === 4) spanClass = 'col-span-1 md:col-span-1';
              else if (patternIdx === 5) {
                spanClass = 'col-span-1 md:col-span-2 md:row-span-2';
                heightClass = 'h-[250px] md:h-full';
              }
              else if (patternIdx === 6) spanClass = 'col-span-1 md:col-span-1';
              else if (patternIdx === 7) spanClass = 'col-span-1 md:col-span-1';

              let imageSrc = `https://placehold.co/600x600/e2e0d8/8a867d?text=${project.slug}+${activeAmenityTab.split(' ')[0]}+${idx + 1}`;
              let displayText = `${activeAmenityTab} ${idx + 1}`;

              if (activeAmenityTab === 'Podium Amenities' && project.amenities[idx]) {
                displayText = project.amenities[idx];
                imageSrc = amenityImageMap[displayText] || imageSrc;
              }

              return (
                <motion.div
                  key={`${activeAmenityTab}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`relative overflow-hidden group bg-line-light ${spanClass} ${heightClass}`}
                >
                  <img
                    src={imageSrc}
                    alt={displayText}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-left z-20">
                    <span className="font-serif text-sm md:text-base text-ivory tracking-wide">{displayText}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CONFIGURATIONS */}
      <section id="configurations" className="section pt-24 pb-24 bg-paper">
        <div className="wrap-widescreen">
          <div className="mb-14">
            <div className="section-head mb-0 max-w-full text-left">
              <span className="eyebrow">Plans & Pricing</span>
              <h2 className="serif whitespace-nowrap">Configurations & Indicative Pricing</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.pricing.map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-line-light flex flex-col cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                onClick={() => {
                  const images = project.pricing.map(p => layoutImages[p.type as '1 BHK' | '2 BHK' | '3 BHK']).filter(Boolean);
                  const imgIdx = images.indexOf(layoutImages[p.type as '1 BHK' | '2 BHK' | '3 BHK']);
                  setLightbox({ images, index: imgIdx >= 0 ? imgIdx : 0 });
                }}
              >
                {/* Image Area */}
                <div className="w-full relative overflow-hidden border-b border-line-light bg-white">
                  <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                    <div className="text-brass-deep flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current stroke-[1.5]">
                        <path d="M12 2L14.4 7.6L20.5 8.5L16.1 12.8L17.1 18.9L12 16.2L6.9 18.9L7.9 12.8L3.5 8.5L9.6 7.6L12 2Z" />
                      </svg>
                      <span className="font-serif font-bold text-[11px] uppercase tracking-wider">{p.type}</span>
                    </div>
                  </div>
                  <img
                    src={layoutImages[p.type as '1 BHK' | '2 BHK' | '3 BHK']}
                    alt={`${p.type} Floor Plan`}
                    className="w-full h-auto object-contain group-hover:scale-[1.03] transition-transform duration-700 block"
                  />
                </div>

                {/* Details Area */}
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  {/* <div className="flex flex-col gap-1.5">
                    <div className="text-[11px] text-brass-deep font-semibold tracking-widest uppercase">SKY DECK RESIDENCE</div>
                    <div className="font-serif text-[28px] text-ink tracking-tight">{p.type}</div>
                  </div> */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col gap-1.5">
                      <div className="font-bold text-ink text-[17px] font-sans tracking-tight">~{p.carpetArea.replace(' sq.ft', '')}</div>
                      <div className="text-[11px] text-ink-soft font-medium">Carpet Area (sq.ft.)</div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="font-bold text-ink text-[17px] font-sans tracking-tight">Price on Request</div>
                      <div className="text-[11px] text-ink-soft font-medium">Starting Price</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-taupe italic mt-10 text-center w-full">
            *Prices and areas are indicative, exclusive of government taxes and other statutory charges, and subject to change.
          </p>
        </div>
      </section>

      {/* 5. SPECIFICATIONS
      <section id="specifications" className="section pt-24 pb-24 bg-ivory">
        <div className="wrap-widescreen max-w-4xl mx-auto">
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
      </section> */}

      {/* 6. LOCATION */}
      <section id="location" className="section pt-24 pb-24 bg-ivory">
        <div className="wrap-widescreen max-w-5xl mx-auto">
          <div className="section-head mb-14">
            <span className="eyebrow">Location</span>
            <h2 className="serif mt-2">Connected to Everything</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-white border border-line-light rounded-2xl overflow-hidden shadow-sm flex items-center justify-center relative">
              {(project as any).mapEmbedUrl ? (
                <iframe
                  src={(project as any).mapEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${project.name} Location Map`}
                ></iframe>
              ) : (
                <>
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
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 p-6 bg-pine/5 backdrop-blur-[1px] pointer-events-none">
                    <span className="font-serif text-sm font-semibold text-pine text-center">Agarwal Project Site Location</span>
                    <span className="text-[10px] text-taupe uppercase tracking-wider text-center">Gokul Sub-Region, Vasai-Virar, MH</span>
                  </div>
                </>
              )}
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
      <section id="gallery" className="section pt-24 pb-24 bg-paper">
        <div className="wrap-widescreen">
          <div className="section-head mb-14">
            <span className="eyebrow">Gallery</span>
            <h2 className="serif whitespace-nowrap tracking-tight" style={{ fontSize: 'min(6vw, clamp(2.1rem, 4.6vw, 3.6rem))' }}>A Closer Look at {project.name}</h2>
          </div>

          <div className="grid grid-cols-12 gap-1 md:gap-2">
            {project.gallery.map((imgName, idx) => {
              const imgAsset = galleryMap[imgName];

              let colSpan = 'col-span-12';
              if (idx < 3) colSpan = 'col-span-12 md:col-span-4'; // Top row
              else if (idx === 3) colSpan = 'col-span-12 md:col-span-3'; // Bottom left
              else if (idx === 4) colSpan = 'col-span-12 md:col-span-5'; // Bottom middle
              else if (idx === 5) colSpan = 'col-span-12 md:col-span-4'; // Bottom right
              else colSpan = 'col-span-12 md:col-span-4'; // Fallback

              return (
                <div
                  key={idx}
                  onClick={() => {
                    const images = project.gallery.map(img => galleryMap[img]);
                    setLightbox({ images, index: idx });
                  }}
                  className={`${colSpan} h-[250px] sm:h-[350px] lg:h-[420px] overflow-hidden cursor-zoom-in group relative bg-line-light`}
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

      {/* WHY CHOOSE US */}
      {project.whyChoseUs && project.whyChoseUs.length > 0 && (
        <section className="section pt-24 pb-0 bg-ivory border-t border-line-light">
          <div className="wrap-widescreen">
            <div className="section-head mb-16 text-center max-w-2xl mx-auto">
              <span className="eyebrow">Highlights</span>
              <h2 className="serif mt-2">Why Choose {project.name}?</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8">
              {project.whyChoseUs.map((item, idx) => {
                const IconComponent = iconComponents[item.icon] || Leaf;
                return (
                  <div key={idx} className="flex flex-col items-center text-center px-2 group">
                    <div className="w-16 h-16 rounded-full bg-paper flex items-center justify-center text-brass-deep mb-5 shadow-sm border border-line-light transition-transform duration-500 group-hover:scale-110">
                      <IconComponent className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-serif text-[17px] md:text-lg font-medium text-ink mb-2.5">{item.title}</h4>
                    <p className="text-[13px] md:text-sm text-ink-soft leading-relaxed font-light">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Side Button */}
      <AnimatePresence>
        {!isContactVisible && (
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="fixed top-1/2 right-0 -translate-y-1/2 z-[98] bg-brass-deep text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase py-4 md:py-6 px-2 md:px-2.5 rounded-l-lg shadow-[-4px_0_15px_rgba(0,0,0,0.1)] hover:bg-[#b59254] hover:pr-3 md:hover:pr-4 transition-all duration-300 flex items-center justify-center cursor-pointer"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Enquire Now
          </motion.button>
        )}
      </AnimatePresence>

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
            <div className="ft serif" style={{ fontFamily: '"Fraunces", serif', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-ink)', paddingBottom: '12px', lineHeight: 1.4 }}>
              Request an Immediate Callback for Exclusive Offers.
            </div>
            <div className="fsub" style={{ fontSize: '.86rem', color: 'var(--color-ink-soft)', paddingBottom: '20px', marginBottom: '24px', fontWeight: 300, borderBottom: '1px solid var(--color-line)' }}>
              Share your details and our relationship manager will contact you with special offer.
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-taupe mb-1.5 tracking-wider">Full Name</label>
                <input type="text" placeholder="Full Name" className="border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep transition-colors bg-white" required />
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
            <div style={{ fontSize: '.7rem', color: 'var(--color-taupe)', textAlign: 'center', marginTop: '10px', lineHeight: 1.4 }}>
              I Authorize Agarwal Group And Its Representatives To Call, SMS, Email Or Whatsapp Me About Its Products And Offers. This Consent Overrides Any Registration For DND NDNC.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. ENQUIRY & RERA */}
      <section id="contact" ref={contactRef} className="section pt-24 pb-24 bg-paper">
        <div className="wrap-widescreen grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

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
                  <div className="flex flex-col">
                    <div className="ft serif" style={{ fontFamily: '"Fraunces", serif', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-ink)', paddingBottom: '4px', lineHeight: 1.4 }}>
                      Request an Immediate Callback for Exclusive Offers.
                    </div>
                    <div className="fsub" style={{ fontSize: '.86rem', color: 'var(--color-ink-soft)', paddingBottom: '20px', marginBottom: '0px', fontWeight: 300, borderBottom: '1px solid var(--color-line)' }}>
                      Share your details and our relationship manager will contact you with special offer.
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-xs tracking-widest uppercase text-taupe font-bold">Full Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full border border-line-light rounded-xl p-4 text-sm text-ink outline-none bg-paper focus:border-brass transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-xs tracking-widest uppercase text-taupe font-bold">Mobile Number*</label>
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
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address (e.g. name@example.com)"
                      placeholder="you@email.com"
                      className="w-full border border-line-light rounded-xl p-4 text-sm text-ink outline-none bg-paper focus:border-brass transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="pcta-btn btn-enquire w-full mt-4"
                  >
                    <span>Get Best Offers</span>
                    <span className="arr">→</span>
                  </button>
                  <div style={{ fontSize: '.7rem', color: 'var(--color-taupe)', textAlign: 'center', marginTop: '10px', lineHeight: 1.4 }}>
                    I Authorize Agarwal Group And Its Representatives To Call, SMS, Email Or Whatsapp Me About Its Products And Offers. This Consent Overrides Any Registration For DND NDNC.
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
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <div className="absolute top-4 right-4 z-[101]">
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                className="text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {lightbox.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null);
                  }}
                  className="absolute left-2 sm:left-6 z-[101] text-white/50 hover:text-white transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full hidden sm:block"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null);
                  }}
                  className="absolute right-2 sm:right-6 z-[101] text-white/50 hover:text-white transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full hidden sm:block"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-12 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox.index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "tween", duration: 0.3 }}
                  src={lightbox.images[lightbox.index]}
                  alt="Lightbox View"
                  drag={lightbox.images.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, { offset }) => {
                    const swipe = offset.x;
                    if (swipe < -50) {
                      setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null);
                    } else if (swipe > 50) {
                      setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain select-none touch-none"
                  style={{ cursor: lightbox.images.length > 1 ? "grab" : "auto" }}
                />
              </AnimatePresence>

              {lightbox.images.length > 1 && (
                <div className="absolute bottom-6 flex gap-2 z-[101]">
                  {lightbox.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${idx === lightbox.index ? 'bg-white' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
