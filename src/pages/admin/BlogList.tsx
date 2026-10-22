import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Trash2, ExternalLink, Edit, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogContext } from '../../context/BlogContext';
import { type BlogPost } from '../../data/blogs';

export default function BlogList() {
  const { blogs, deleteBlog, isLoading } = useBlogContext();
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && blogToDelete && !isDeleting) {
        setBlogToDelete(null);
        setDeleteError(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [blogToDelete, isDeleting]);

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteBlog(blogToDelete.id);
      setBlogToDelete(null);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to delete blog';
      setDeleteError(msg);
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-taupe font-medium">
                  Loading blogs...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-taupe font-medium">
                  No blogs found. Create one above!
                </td>
              </tr>
            ) : (
              blogs.map(post => {
                const imgSrc = post.image || 'https://via.placeholder.com/600x400?text=No+Image';

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
                        <Link 
                          to={`/admin/blogs/edit/${post.id}`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-taupe hover:text-brass hover:bg-ivory transition-colors"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          type="button"
                          onClick={() => setBlogToDelete(post)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-taupe hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {blogToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setBlogToDelete(null)}
              className="fixed inset-0 bg-pine/50 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-line p-6 z-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setBlogToDelete(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-taupe hover:text-ink hover:bg-ivory transition-colors disabled:opacity-50 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-ink">Delete Blog Post</h3>
                  <p className="text-sm text-taupe mt-1">
                    Are you sure you want to delete this blog post?
                  </p>
                </div>
              </div>

              {/* Preview card of blog being deleted */}
              <div className="flex items-center gap-3 p-3 bg-ivory/60 rounded-xl border border-line mb-4">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-ivory shrink-0">
                  <img
                    src={blogToDelete.image || 'https://via.placeholder.com/600x400?text=No+Image'}
                    alt={blogToDelete.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-brass uppercase tracking-widest mb-0.5 truncate">
                    {blogToDelete.category}
                  </div>
                  <div className="text-sm font-medium text-ink truncate">
                    {blogToDelete.title}
                  </div>
                </div>
              </div>

              {deleteError && (
                <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{deleteError}</span>
                </div>
              )}

              <div className="text-xs text-rose-700 bg-rose-50/70 border border-rose-200/60 rounded-lg p-3 mb-6">
                This action is permanent and cannot be undone. The article will be removed from the website immediately.
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setBlogToDelete(null)}
                  className="px-4 py-2 text-sm font-semibold text-taupe hover:text-ink hover:bg-ivory rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteConfirm}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Blog
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
