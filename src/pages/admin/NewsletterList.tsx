import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Trash2, Edit, Search, AlertTriangle, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getNewsletterListAxios,
  deleteNewsletterAxios,
  type NewsletterItem,
} from '../../_api/newsletter';
import { resolveFileUrl } from '../../_api/fileUpload';
import toast from 'react-hot-toast';

export default function NewsletterList() {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [itemToDelete, setItemToDelete] = useState<NewsletterItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchNewsletters = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getNewsletterListAxios({
        page,
        limit: 10,
        ...(search.trim() ? { search: search.trim() } : {}),
        status: 1,
      });
      const data = res?.data ?? res;
      setNewsletters(data?.newsletters ?? []);
      setTotalPages(data?.totalPages ?? 1);
      setTotalRecords(data?.totalRecords ?? 0);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to load newsletters');
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchNewsletters();
  }, [fetchNewsletters]);

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteNewsletterAxios(itemToDelete.id);
      toast.success('Newsletter deleted successfully');
      setItemToDelete(null);
      fetchNewsletters();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to delete newsletter');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-serif text-ink">Manage Newsletters</h1>
          <p className="text-xs text-taupe mt-1">{totalRecords} total newsletter{totalRecords === 1 ? '' : 's'}</p>
        </div>
        <Link
          to="/admin/newsletters/new"
          className="flex items-center gap-2 bg-pine hover:bg-pine-deep text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-colors shadow-md"
        >
          <PlusCircle className="w-4 h-4" /> Create Newsletter
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search newsletters by title..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-line rounded-lg text-sm text-ink outline-none focus:border-brass-deep"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-ivory/50 border-b border-line text-xs uppercase tracking-widest font-semibold text-taupe">
            <tr>
              <th className="px-6 py-4">Banner</th>
              <th className="px-6 py-4">Title &amp; Subtitle</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-taupe font-medium">
                  Loading newsletters...
                </td>
              </tr>
            ) : newsletters.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-taupe font-medium">
                  No newsletters found. Create one above!
                </td>
              </tr>
            ) : (
              newsletters.map((item) => {
                const imgSrc = resolveFileUrl(item.image);
                return (
                  <tr key={item.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 rounded overflow-hidden bg-ivory flex items-center justify-center">
                        {imgSrc ? (
                          <img src={imgSrc} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <Mail className="w-5 h-5 text-taupe" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-serif font-medium text-ink max-w-sm truncate">{item.title}</div>
                      <div className="text-xs text-ink-soft truncate max-w-sm mt-1">{item.subtitle}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest rounded ${
                          item.status === 1
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-ivory text-taupe'
                        }`}
                      >
                        {item.status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-soft whitespace-nowrap">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/newsletters/edit/${item.id}`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-taupe hover:text-brass-deep hover:bg-brass/10 transition-colors"
                          title="Edit Newsletter"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setItemToDelete(item)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-taupe hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Newsletter"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded border border-line bg-white text-sm text-ink disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-taupe px-2">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded border border-line bg-white text-sm text-ink disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => !isDeleting && setItemToDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-line"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-serif text-lg font-medium text-ink">Delete Newsletter?</h3>
                </div>
                <button
                  onClick={() => !isDeleting && setItemToDelete(null)}
                  className="text-taupe hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-ink-soft mb-6">
                Are you sure you want to delete <strong>{itemToDelete.title}</strong>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setItemToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-lg border border-line text-sm text-ink hover:bg-ivory"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 disabled:opacity-60"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
