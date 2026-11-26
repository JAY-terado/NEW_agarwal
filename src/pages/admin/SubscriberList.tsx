import { useState, useEffect, useCallback } from 'react';
import { Search, Mail, UserMinus } from 'lucide-react';
import {
  getNewsletterSubscribersAxios,
  adminUnsubscribeNewsletterAxios,
} from '../../_api/newsletter';
import toast from 'react-hot-toast';

interface Subscriber {
  id?: number;
  email: string;
  status?: number;
  createdAt?: string;
  subscribed_at?: string;
}

export default function SubscriberList() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [unsubscribingKey, setUnsubscribingKey] = useState<string | null>(null);

  const fetchSubscribers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getNewsletterSubscribersAxios({
        page,
        limit: 20,
        ...(search.trim() ? { search: search.trim() } : {}),
      });
      const data = res?.data ?? res;
      const list = data?.subscribers ?? data?.rows ?? (Array.isArray(data) ? data : []);
      setSubscribers(list);
      setTotalPages(data?.totalPages ?? 1);
      setTotalRecords(data?.totalRecords ?? list.length);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to load subscribers');
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const handleAdminUnsubscribe = async (sub: Subscriber) => {
    const key = String(sub.id ?? sub.email);
    setUnsubscribingKey(key);
    try {
      await adminUnsubscribeNewsletterAxios(
        sub.id !== undefined ? { id: sub.id } : { email: sub.email }
      );
      toast.success(`Unsubscribed ${sub.email}`);
      fetchSubscribers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to unsubscribe');
    } finally {
      setUnsubscribingKey(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-serif text-ink">Newsletter Subscribers</h1>
          <p className="text-xs text-taupe mt-1">
            {totalRecords} subscriber{totalRecords === 1 ? '' : 's'}
          </p>
        </div>
      </div>

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
            placeholder="Search subscriber email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-line rounded-lg text-sm text-ink outline-none focus:border-brass-deep"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-ivory/50 border-b border-line text-xs uppercase tracking-widest font-semibold text-taupe">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Subscribed On</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-taupe font-medium">
                  Loading subscribers...
                </td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-taupe font-medium">
                  No subscribers found.
                </td>
              </tr>
            ) : (
              subscribers.map((sub, idx) => {
                const rowKey = String(sub.id ?? sub.email ?? idx);
                const isBusy = unsubscribingKey === rowKey;
                return (
                  <tr key={rowKey} className="hover:bg-ivory/30 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3 text-sm font-medium text-ink">
                      <Mail className="w-4 h-4 text-taupe" />
                      {sub.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-soft whitespace-nowrap">
                      {sub.createdAt || sub.subscribed_at
                        ? new Date(sub.createdAt || sub.subscribed_at!).toLocaleDateString('en-IN')
                        : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleAdminUnsubscribe(sub)}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                        {isBusy ? 'Unsubscribing...' : 'Unsubscribe'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

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
    </div>
  );
}
