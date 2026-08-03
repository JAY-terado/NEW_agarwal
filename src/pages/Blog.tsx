import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllBlogsAxios } from '../_api/admin';
import type { BlogPost as BlogPostType } from '../data/blogs';
import blogGreen from '../assets/blog-green.jpg';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllBlogsAxios().then(response => {
      const apiData = Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : [];
      const mappedBlogs: BlogPostType[] = apiData.map((b: any) => ({
        id: b.id.toString(),
        title: b.titlename,
        category: b.category,
        excerpt: b.summary,
        content: b.article,
        image: b.imageurl && b.imageurl.length > 0 ? b.imageurl[0] : '',
        date: new Date(b.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }));
      setBlogs(mappedBlogs);
    }).catch(e => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

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
          {isLoading ? (
            <div className="text-center py-20 text-taupe">Loading stories...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-taupe">No stories available at the moment.</div>
          ) : (
            <div className="blog-grid">
              {blogs.map((post) => {
                const blogImg = post.image || 'https://via.placeholder.com/600x400?text=No+Image';
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
          )}
        </div>
      </section>
    </div>
  );
}
