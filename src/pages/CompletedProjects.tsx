import { useEffect } from 'react';

import agarwalParamount from '../assets/agarwalParamount.jpg';
import agarwalExotica from '../assets/agarwalExotica.jpg';
import agarwalLifestyle from '../assets/agarwalLifestyle.jpg';
import agarwalYashwantHts from '../assets/agarwalYashwantHts.jpg';
import agarwalMeadows from '../assets/agarwalMeadows.jpg';
import agarwalNagri from '../assets/agarwalNagri.jpeg';
import vivaVrindavan from '../assets/vivaVrindavan.jpeg';
import gokulSolitaire from '../assets/Gokul-Solitaire.jpg';
import gokulSapphire from '../assets/gokulSapphire.jpg';
import vrindavanGarden from '../assets/vrindavanGarden.jpg';
import agarwalResidency from '../assets/agarwalResidency.jpeg';

// Data extracted from Navbar
const completedProjects = [
  { name: 'Agarwal Paramount', sub: 'Virar West', image: agarwalParamount },
  { name: 'Agarwal Exotica', sub: 'Vasai East', image: agarwalExotica },
  { name: 'Agarwal Lifestyle', sub: 'Virar West', image: agarwalLifestyle },
  { name: 'Agarwal Yashwant Hts.', sub: 'Virar', image: agarwalYashwantHts },
  { name: 'Agarwal Meadows', sub: 'Virar West', image: agarwalMeadows },
  { name: 'Agarwal Nagri', sub: 'Vasai East', image: agarwalNagri },
  { name: 'Viva Vrindavan', sub: 'Virar Township', image: vivaVrindavan },
  { name: 'Gokul Solitaire', sub: 'Virar', image: gokulSolitaire },
  { name: 'Gokul Sapphire', sub: 'Virar', image: gokulSapphire },
  { name: 'Vrindavan Gardens', sub: 'Vasai', image: vrindavanGarden },
  { name: 'Agarwal Residency', sub: 'Vasai', image: agarwalResidency },
];

export default function CompletedProjects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-ivory min-h-screen text-ink pt-32 pb-24">
      <div className="wrap-widescreen">
        <div className="text-left mb-16">
          <span className="eyebrow block mb-4">Our Legacy</span>
          <h1 className="serif text-4xl md:text-5xl">Completed Projects</h1>
          <p className="mt-6 text-ink-soft max-w-2xl">
            Explore our portfolio of delivered landmarks. Each project stands as a testament to our commitment to quality, timely delivery, and customer satisfaction.
          </p>
        </div>

        <div className="flex flex-col gap-24 mt-16">
          {completedProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] bg-line relative rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-line-light">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-brass-deep font-bold mb-3 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.sub}
                  </span>
                  
                  <h2 className="serif text-4xl text-ink mb-6">{project.name}</h2>
                  
                  <p className="text-ink-soft leading-relaxed mb-8">
                    A hallmark of quality and thoughtful design, {project.name} stands as a testament to our commitment to excellence in {project.sub}. This delivered project continues to provide a premium lifestyle to its residents with superior craftsmanship and modern amenities.
                  </p>

                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1 border-l-2 border-brass-deep pl-4">
                      <span className="text-xs uppercase tracking-widest text-taupe font-bold">Status</span>
                      <span className="text-sm font-semibold text-ink">Delivered</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
