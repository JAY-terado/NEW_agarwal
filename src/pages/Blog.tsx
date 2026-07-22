import { Link } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';

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

export default function Blog() {
  const { blogs } = useBlogContext();

  return (
    <div style={{ background: 'var(--color-ivory)', minHeight: '100vh' }}>
      {/* Blog Page Hero */}
      <header className="relative w-full h-[50vh] sm:h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={blogGreen}
            alt="Insights & Updates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/60 to-pine/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 sm:pb-16 text-white flex flex-col items-center text-center">
          <div className="mb-4">
            <span className="text-[10px] tracking-widest uppercase font-bold text-pine bg-brass-bright px-3 py-1.5 rounded-sm inline-block">
              The Agarwal Journal
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-4">
            Insights &amp; <span className="italic font-serif text-brass-bright font-normal">Updates</span>
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed max-w-none mx-auto mb-8 sm:whitespace-nowrap">
            Stories on design, community and the evolving Vasai–Virar landscape — straight from the team building it.
          </p>
          {/* <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ivory/60">
            <Link to="/" className="hover:text-brass-bright transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Blogs</span>
          </div> */}
        </div>
      </header>

      {/* Blog Post Grid Section */}
      <section className="section">
        <div className="wrap-widescreen">
          <div className="blog-grid">
            {blogs.map((post) => {
              const blogImg = blogImageMap[post.image] || post.image;
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
                    <Link
                      to={`/blogs/${post.id}`}
                      className="bread"
                    >
                      Read More <span className="arr">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
