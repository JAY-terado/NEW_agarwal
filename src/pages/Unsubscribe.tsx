import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { unsubscribeNewsletterAxios } from '../_api/newsletter';

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email')?.trim() || '';

  const [email, setEmail] = useState(initialEmail);
  const [pending, setPending] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleUnsubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (pending) return;

    const targetEmail = email.trim();
    if (!targetEmail) {
      setError('Please enter your email address.');
      return;
    }

    setPending(true);
    setError('');
    try {
      await unsubscribeNewsletterAxios(targetEmail);
      setUnsubscribed(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'We couldn’t process your request. Please try again.'
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="min-h-[75vh] bg-ivory flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-md bg-white border border-line rounded-2xl p-8 sm:p-10 shadow-sm text-left">
        {!unsubscribed ? (
          <>
            <h1 className="serif text-2xl sm:text-3xl font-normal text-ink leading-snug mb-2">
              Do you want to unsubscribe from our messages?
            </h1>
            <p className="text-sm text-ink-soft mb-6">
              You&apos;ll stop receiving newsletter updates from Agarwal Group.
            </p>

            <form onSubmit={handleUnsubscribe} className="flex flex-col gap-4">
              {!initialEmail && (
                <div>
                  <label
                    htmlFor="unsubscribe-email"
                    className="block text-[10px] font-bold uppercase tracking-wider text-taupe mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="unsubscribe-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full border border-line rounded-xl px-4 py-2.5 text-sm text-ink bg-white outline-none focus:border-brass-deep transition-colors"
                  />
                </div>
              )}

              {error && (
                <p role="alert" className="text-xs text-rose-600">
                  {error}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={pending}
                  className="pcta-btn btn-enquire disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{pending ? 'Unsubscribing…' : 'Unsubscribe'}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div>
            <h1 className="serif text-2xl sm:text-3xl font-normal text-ink leading-snug mb-2">
              You&apos;ve been unsubscribed
            </h1>
            <p className="text-sm text-ink-soft mb-6">
              <strong className="text-ink">{email}</strong> has been removed from the Agarwal Group newsletter list.
            </p>
            <Link to="/" className="pcta-btn btn-enquire inline-flex">
              <span>Back to Home</span>
              <span className="arr">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
