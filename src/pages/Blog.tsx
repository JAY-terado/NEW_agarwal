import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, X, Clock } from 'lucide-react';
import { blogs } from '../data/blogs';
import type { BlogPost } from '../data/blogs';

// Blog Asset Imports
import blogGreen from '../assets/blog-green.jpg';
import blogClub from '../assets/blog-club.jpg';
import blogInteriors from '../assets/blog-interiors.jpg';
import blogInvest from '../assets/blog-invest.jpg';
import blogCraft from '../assets/blog-craft.jpg';
import blogFestival from '../assets/blog-festival.jpg';

const blogImageMap: Record<string, string> = {
  'blog-green.jpg': blogGreen,
  'blog-club.jpg': blogClub,
  'blog-interiors.jpg': blogInteriors,
  'blog-invest.jpg': blogInvest,
  'blog-craft.jpg': blogCraft,
  'blog-festival.jpg': blogFestival,
};

// Mock article content to display when read modal is opened
const mockArticleContent: Record<string, string[]> = {
  'green-advantage': [
    "In the hustle and bustle of the Mumbai Metropolitan Region, finding tranquility is a luxury. At the Agarwal Group, we believe that open spaces and mature greenery are not additions; they are core architectural necessities.",
    "Townships built under our signature principles dedicate substantial percentages of land strictly to landscaping and open skies. Walking tracks shaded by mature trees, serene water bodies, and expansive grass lawns allow residents to unwind, breathe clean air, and connect with nature directly outside their homes.",
    "Scientific research shows that green viewscapes improve focus, reduce stress, and promote cardiac health. When families move into an Agarwal township, they aren't just buying four walls; they are upgrading their health, wellness, and lifestyle standard."
  ],
  'club-one': [
    "A residence should extend beyond the front door. Our Club One facilities are designed to act as social hubs, recreational centers, and personal retreats for all residents.",
    "Whether it is an early morning swim in our crystal-clear pools, an intense workout session at our fully-equipped modern gymnasium, or a quiet reading session in the clubhouse library, Club One provides options for everyone.",
    "Additionally, our townships offer fully managed banquet halls and community spaces, allowing families to celebrate housewarmings, birthdays, and festivals with their neighbors without leaving the comfort of their gated community."
  ],
  'crafting-homes': [
    "Intelligent interior planning is what sets Agarwal properties apart. We analyze the sun's trajectory and wind patterns to design layouts with abundant cross-ventilation and natural lighting.",
    "Every square foot is optimized to minimize passages and maximize usable carpet area. Our spec systems utilize high-grade vitrified tiling, granite platforms, premium CP fittings, and concealed copper wiring to ensure the apartment requires minimal maintenance over its lifetime.",
    "Timeless design means creating spaces that look modern today and remain functional for generations. Our design boards are curated by top architects to deliver premium style throughout the residence."
  ],
  'smartest-address': [
    "Vasai-Virar has transitioned from a weekend getaway to one of Mumbai's most promising real estate corridors. With seamless rail connectivity on the Western Line and quick access to highways, commuting to central business districts is easy.",
    "The upcoming Metro line, municipal expansions, and major commercial parks have created a robust infrastructure pipeline that guarantees strong property value appreciation over the next decade.",
    "For first-time home buyers or investors, the region offers the perfect combination: affordable residential pricing, high-end township amenities, and a pollution-free environment. It is truly Mumbai's smartest address."
  ],
  'build-philosophy': [
    "For 48 years, the Agarwal Group has been driven by one core philosophy: clear commitments build clear relationships. Real estate is more than engineering; it is about keeping promises.",
    "We maintain a flawless record of clear-title projects, MahaRERA certifications, and structural audits. We ensure that legal documentations, approvals, and OC certifications are processed on time so that buyers face zero legal hurdles.",
    "Our focus on on-time delivery has earned the trust of over 5,000 happy families. We continue to uphold these standards on every new project blueprint."
  ],
  'festival-firsts': [
    "A house becomes a home when it is filled with laughter, community, and celebrations. Our gated townships are planned to foster strong neighborly relations and vibrant community lives.",
    "From grand Diwali events and Navratri celebrations to small housewarmings, our community halls, parks, and clubhouses host thousands of memorable moments.",
    "We believe that a thriving community is the greatest amenity a developer can deliver. We build neighborhoods where children play safely, elders walk peacefully, and families thrive together."
  ]
};

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleReadClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const activeArticleBody = selectedPost ? (mockArticleContent[selectedPost.id] || [selectedPost.excerpt]) : [];

  return (
    <div style={{ background: 'var(--color-ivory)', minHeight: '100vh' }}>
      {/* Blog Page Hero */}
      <header className="page-hero">
        <div className="page-hero-bg">
          <img
            src={blogGreen}
            alt="Insights & Updates"
          />
        </div>
        <div className="wrap">
          <span className="eyebrow light">The Agarwal Journal</span>
          <h1 className="serif">Insights &amp; <em>Updates</em></h1>
          <p>Stories on design, community and the evolving Vasai–Virar landscape — straight from the team building it.</p>
          <div className="crumb">
            <Link to="/">Home</Link> / Blogs
          </div>
        </div>
      </header>

      {/* Blog Post Grid Section */}
      <section className="section">
        <div className="wrap">
          <div className="blog-grid">
            {blogs.map((post) => {
              const blogImg = blogImageMap[post.image];
              return (
                <article key={post.id} className="bcard">
                  <div className="bcard-media">
                    <img src={blogImg} alt={post.title} />
                  </div>
                  <div className="bbody">
                    <div className="bmeta">
                      <span>{post.category}</span>
                      <span className="dot"></span>
                      <span className="date">{post.date}</span>
                    </div>
                    <h3 className="serif">{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <button
                      onClick={() => handleReadClick(post)}
                      className="bread"
                    >
                      Read More <span className="arr">→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL POST MODAL READ PANELS */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pine/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                aria-label="Close article"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Main Banner Image */}
              <div className="relative h-60 sm:h-72 w-full">
                <img
                  src={blogImageMap[selectedPost.image]}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-brass-bright bg-pine-600/60 backdrop-blur-sm px-2.5 py-1 rounded inline-block mb-2">
                    {selectedPost.category}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-light leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              {/* Text Body Content */}
              <div className="p-6 sm:p-8 flex flex-col gap-4 overflow-y-auto max-h-[50vh]">
                <div className="flex gap-4 items-center text-[10px] uppercase tracking-wider text-taupe font-bold border-b border-line pb-3 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Admin Editorial</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 3 min read</span>
                </div>
                {activeArticleBody.map((paragraph, index) => (
                  <p key={index} className="text-xs sm:text-sm text-ink-soft leading-relaxed font-light">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
