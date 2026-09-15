import { useEffect } from 'react';

import img0 from '../assets/Completed Projects/Agarwal & Doshi Complex, Kaul Heritage City, Vasai West.jpg';
import img1 from '../assets/Completed Projects/Agarwal Exotica, Yashwant Smart City, Vasai East.jpg';
import img2 from '../assets/Completed Projects/Agarwal Gardens (Phase-I), Gokul Township, Virar West.jpg';
import img3 from '../assets/Completed Projects/Agarwal Gardens (Phase-II), Gokul Township, Virar West.png';
import img4 from '../assets/Completed Projects/Agarwal Heritage, Yashwant Nagar, Virar West.png';
import img5 from '../assets/Completed Projects/Agarwal Infinity, New Viva College Road, Virar West.jpg';
import img6 from '../assets/Completed Projects/Agarwal Lifestyle, Global City, Virar West.jpg';
import img7 from '../assets/Completed Projects/Agarwal Meadows, Near Gokul Township, Virar West.jpg';
import img8 from '../assets/Completed Projects/Agarwal Palazzo, Near Kora Kendra, Borivali West.jpg';
import img9 from '../assets/Completed Projects/Agarwal Paramount, Global City, Virar West.jpg';
import img10 from '../assets/Completed Projects/Agarwal Residency, Yashwant Viva Township, Vasai East.jpg';
import img11 from '../assets/Completed Projects/Agarwal Sky Heights, Yashwant Smart City, Vasai East.jpg';
import img12 from '../assets/Completed Projects/Agarwal Skyrise, Y K Nagar NX, Virar West.jpg';
import img13 from '../assets/Completed Projects/Agarwal Solitaire, HDIL Township, Virar West.jpg';
import img14 from '../assets/Completed Projects/Agarwal Township, Kaul Heritage City, Vasai West.jpg';
import img15 from '../assets/Completed Projects/Agarwal XYz.png';
import img16 from '../assets/Completed Projects/Balaji Banquets, Gokul Township, Virar West.jpg';
import img17 from '../assets/Completed Projects/Glory, Viva Gokul Complex, Virar West.jpg';
import img18 from '../assets/Completed Projects/Gokul Aangan, Gokul Township, Virar West.png';
import img19 from '../assets/Completed Projects/Gokul Annexe, Gokul Township, Virar West.png';
import img20 from '../assets/Completed Projects/Gokul Arcade, Gokul Township, Virar West.png';
import img21 from '../assets/Completed Projects/Gokul Empire, Gokul Township, Virar West.png';
import img22 from '../assets/Completed Projects/Gokul Heaven, Gokul Township, Virar West.png';
import img23 from '../assets/Completed Projects/Gokul Heights, Gokul Township, Virar West.png';
import img24 from '../assets/Completed Projects/Gokul Sapphire, Near Muljibhai Mehta School, Gokul Township, Virar West.JPG';
import img25 from '../assets/Completed Projects/Gokul Solitaire, Agarwal Gardens Phase 2, Gokul Township, Virar West.jpg';
import img26 from '../assets/Completed Projects/Gokul Township, Bolinj, Virar West.png';
import img27 from '../assets/Completed Projects/Gokuldham Complex, Virar West.png';
import img28 from '../assets/Completed Projects/Krishna Galaxy, Viva Vrindavan Township, Virar West.png';
import img29 from '../assets/Completed Projects/Krishna Heritage, M G Road, Kandivali West.png';
import img30 from '../assets/Completed Projects/Madhuvan Heights, Gokhiware, Vasai East.jpg';
import img31 from '../assets/Completed Projects/Madhuvan Park (Phase-II), Tirupati Nagar, Virar West.png';
import img32 from '../assets/Completed Projects/Siddhivinayak Tower, Y K Nagar, Virar West.jpg';
import img33 from '../assets/Completed Projects/Srishti Complex, New Viva College Road, Virar West.png';
import img34 from '../assets/Completed Projects/Surbhi Arcade SH3, Gokul Township, Virar West.jpg';
import img35 from '../assets/Completed Projects/Vinay Heights, Mira Road East.jpg';
import img36 from '../assets/Completed Projects/Vinay Kumkum Shopping Arcade, Goregaon West.jpeg';
import img37 from '../assets/Completed Projects/Viva Gokul Arcade,  Viva Gokul Complex, Virar West.jpg';
import img38 from '../assets/Completed Projects/Viva Gokul Complex, Gokul Township, Virar West.png';
import img39 from '../assets/Completed Projects/Viva Vrindavan Township, Opp. Viva College, Virar West.png';
import img40 from '../assets/Completed Projects/Vrindavan Gardens, Yashwant Viva Township, Vasai East.png';
import img41 from '../assets/Completed Projects/Vrindavan Township, New Viva College Road, Virar West.jpg';
import img42 from '../assets/Completed Projects/Yashwant Heights, Virat Nagar, Virar West.jpg';

const completedProjects = [
  { name: 'Agarwal & Doshi Complex', sub: 'Kaul Heritage City, Vasai West', image: img0 },
  { name: 'Agarwal Exotica', sub: 'Yashwant Smart City, Vasai East', image: img1 },
  { name: 'Agarwal Gardens (Phase-I)', sub: 'Gokul Township, Virar West', image: img2 },
  { name: 'Agarwal Gardens (Phase-II)', sub: 'Gokul Township, Virar West', image: img3 },
  { name: 'Agarwal Heritage', sub: 'Yashwant Nagar, Virar West', image: img4 },
  { name: 'Agarwal Infinity', sub: 'New Viva College Road, Virar West', image: img5 },
  { name: 'Agarwal Lifestyle', sub: 'Global City, Virar West', image: img6 },
  { name: 'Agarwal Meadows', sub: 'Near Gokul Township, Virar West', image: img7 },
  { name: 'Agarwal Palazzo', sub: 'Near Kora Kendra, Borivali West', image: img8 },
  { name: 'Agarwal Paramount', sub: 'Global City, Virar West', image: img9 },
  { name: 'Agarwal Residency', sub: 'Yashwant Viva Township, Vasai East', image: img10 },
  { name: 'Agarwal Sky Heights', sub: 'Yashwant Smart City, Vasai East', image: img11 },
  { name: 'Agarwal Skyrise', sub: 'Y K Nagar NX, Virar West', image: img12 },
  { name: 'Agarwal Solitaire', sub: 'HDIL Township, Virar West', image: img13 },
  { name: 'Agarwal Township', sub: 'Kaul Heritage City, Vasai West', image: img14 },
  { name: 'Agarwal XYz', sub: '', image: img15 },
  { name: 'Balaji Banquets', sub: 'Gokul Township, Virar West', image: img16 },
  { name: 'Glory', sub: 'Viva Gokul Complex, Virar West', image: img17 },
  { name: 'Gokul Aangan', sub: 'Gokul Township, Virar West', image: img18 },
  { name: 'Gokul Annexe', sub: 'Gokul Township, Virar West', image: img19 },
  { name: 'Gokul Arcade', sub: 'Gokul Township, Virar West', image: img20 },
  { name: 'Gokul Empire', sub: 'Gokul Township, Virar West', image: img21 },
  { name: 'Gokul Heaven', sub: 'Gokul Township, Virar West', image: img22 },
  { name: 'Gokul Heights', sub: 'Gokul Township, Virar West', image: img23 },
  { name: 'Gokul Sapphire', sub: 'Near Muljibhai Mehta School, Gokul Township, Virar West', image: img24 },
  { name: 'Gokul Solitaire', sub: 'Agarwal Gardens Phase 2, Gokul Township, Virar West', image: img25 },
  { name: 'Gokul Township', sub: 'Bolinj, Virar West', image: img26 },
  { name: 'Gokuldham Complex', sub: 'Virar West', image: img27 },
  { name: 'Krishna Galaxy', sub: 'Viva Vrindavan Township, Virar West', image: img28 },
  { name: 'Krishna Heritage', sub: 'M G Road, Kandivali West', image: img29 },
  { name: 'Madhuvan Heights', sub: 'Gokhiware, Vasai East', image: img30 },
  { name: 'Madhuvan Park (Phase-II)', sub: 'Tirupati Nagar, Virar West', image: img31 },
  { name: 'Siddhivinayak Tower', sub: 'Y K Nagar, Virar West', image: img32 },
  { name: 'Srishti Complex', sub: 'New Viva College Road, Virar West', image: img33 },
  { name: 'Surbhi Arcade SH3', sub: 'Gokul Township, Virar West', image: img34 },
  { name: 'Vinay Heights', sub: 'Mira Road East', image: img35 },
  { name: 'Vinay Kumkum Shopping Arcade', sub: 'Goregaon West', image: img36 },
  { name: 'Viva Gokul Arcade', sub: 'Viva Gokul Complex, Virar West', image: img37 },
  { name: 'Viva Gokul Complex', sub: 'Gokul Township, Virar West', image: img38 },
  { name: 'Viva Vrindavan Township', sub: 'Opp. Viva College, Virar West', image: img39 },
  { name: 'Vrindavan Gardens', sub: 'Yashwant Viva Township, Vasai East', image: img40 },
  { name: 'Vrindavan Township', sub: 'New Viva College Road, Virar West', image: img41 },
  { name: 'Yashwant Heights', sub: 'Virat Nagar, Virar West', image: img42 },
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
          <h1 className="serif text-4xl md:text-5xl">Completed <em className='text-brass-deep'>Projects</em></h1>
          <p className="mt-6 text-ink-soft max-w-2xl">
            Explore our portfolio of delivered landmarks. Each project stands as a testament to our commitment to quality, timely delivery, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-16">
          {completedProjects.map((project, idx) => (
            <div key={idx} className="flex flex-col group cursor-pointer">
              {/* Image Side */}
              <div className="aspect-[4/3] bg-line relative rounded-2xl overflow-hidden shadow-sm border border-line-light mb-4">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Content Side */}
              <h3 className="serif text-2xl text-ink mb-1 group-hover:text-brass-deep transition-colors duration-300">{project.name}</h3>
              <span className="text-sm uppercase tracking-widest text-brass-deep font-bold flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {project.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
