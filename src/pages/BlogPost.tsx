import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { useBlogContext } from '../context/BlogContext';
import { type BlogPost as BlogPostType } from '../data/blogs';

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

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs } = useBlogContext();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundPost = blogs.find(b => b.id === id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/blogs');
    }
  }, [id, navigate]);

  if (!post) return null;

  return (
    <div className="bg-white min-h-screen text-ink pb-24">
      {/* Article Header (White Background) */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-32 sm:pt-40 pb-8">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-taupe hover:text-brass transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
        </Link>
        
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-ink mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-y border-line py-4 mb-8">
          <div className="flex flex-wrap gap-4 items-center text-xs uppercase tracking-wider text-ink-soft font-semibold">
            <span>By <span className="text-ink font-bold border-b border-ink">Editorial Team</span></span>
            <span className="w-1 h-1 rounded-full bg-line"></span>
            <span>Published {post.date}</span>
            <span className="w-1 h-1 rounded-full bg-line"></span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 3 min read</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-taupe mr-2">Share:</span>
            <button className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-ink hover:bg-brass hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-ink hover:bg-brass hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Image */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-12">
        <div className="w-full h-[40vh] sm:h-[60vh] bg-ivory rounded-lg overflow-hidden">
          <img
            src={blogImageMap[post.image] || post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-3 text-[10px] sm:text-xs text-taupe font-medium flex justify-between">
          <span>Image via Agarwal Group Real Estate</span>
          <span className="uppercase tracking-widest text-brass-deep">{post.category}</span>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full max-w-3xl mx-auto px-6">
        <p className="text-lg sm:text-xl font-serif text-ink font-medium leading-relaxed mb-8 italic">
          {post.excerpt}
        </p>
        
        <article className="flex flex-col gap-6">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-[15px] sm:text-[17px] text-ink-soft leading-[1.8] font-light">
              {paragraph}
            </p>
          ))}
        </article>
      </section>
    </div>
  );
}
