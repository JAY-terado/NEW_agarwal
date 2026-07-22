import { Link } from 'react-router-dom';
import { PlusCircle, Trash2, ExternalLink } from 'lucide-react';
import { useBlogContext } from '../../context/BlogContext';

// Blog Asset Imports (same logic as main blog page)
import blogGreen from '../../assets/blog-green.jpg';
import blogClub from '../../assets/blog-club.jpg';
import blogInteriors from '../../assets/blog-interiors.jpg';
import blogInvest from '../../assets/blog-invest.jpg';
import blogCraft from '../../assets/blog-craft.jpg';
import blogFestival from '../../assets/blog-festival.jpg';

const blogImageMap: Record<string, string> = {
  'blog-green.jpg': blogGreen,
  'blog-club.jpg': blogClub,
  'blog-interiors.jpg': blogInteriors,
  'blog-invest.jpg': blogInvest,
  'blog-craft.jpg': blogCraft,
  'blog-festival.jpg': blogFestival,
};

export default function BlogList() {
  const { blogs, deleteBlog } = useBlogContext();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-ink">Manage Blogs</h1>
        <Link 
          to="/admin/blogs/new" 
          className="flex items-center gap-2 bg-pine hover:bg-pine-deep text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-colors shadow-md"
        >
          <PlusCircle className="w-4 h-4" /> Add New Blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-ivory/50 border-b border-line text-xs uppercase tracking-widest font-semibold text-taupe">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {blogs.map(post => {
              // Image logic: use map if it's a known string, else it's a base64 string
              const imgSrc = blogImageMap[post.image] || post.image;
              
              // Check if it's a static blog (can't delete static blogs)
              const isCustom = !blogImageMap[post.image];

              return (
                <tr key={post.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-12 rounded overflow-hidden bg-ivory">
                      <img src={imgSrc} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-serif font-medium text-ink max-w-sm truncate">{post.title}</div>
                    <div className="text-xs text-ink-soft truncate max-w-sm mt-1">{post.excerpt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 bg-ivory text-taupe text-[10px] uppercase font-bold tracking-widest rounded">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-ink-soft whitespace-nowrap">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/blogs/${post.id}`}
                        target="_blank"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-taupe hover:text-pine hover:bg-pine/10 transition-colors"
                        title="View Post"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {isCustom && (
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this blog?')) {
                              deleteBlog(post.id);
                            }
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-taupe hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
