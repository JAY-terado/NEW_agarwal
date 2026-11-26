import { useId, useState, type FormEvent } from 'react';
import { subscribeNewsletterAxios } from '../_api/newsletter';
import './NewsletterSignup.css';

export default function NewsletterSignup() {
  const emailId = useId();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    setPending(true);
    setMessage('');
    try {
      const data = await subscribeNewsletterAxios(email);

      if (data?.subscribed === true || data?.success === true) {
        form.reset();
        setMessage('Thank you for subscribing to the Agarwal Group newsletter.');
      } else {
        setMessage('We couldn’t confirm your subscription. Please try again.');
      }
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 422) {
        setMessage('Enter a valid email address and try again.');
      } else if (status === 429) {
        setMessage('Too many requests. Please try again in a minute.');
      } else {
        setMessage('We couldn’t confirm your subscription. Please try again.');
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="ag-newsletter" aria-label="Newsletter signup">
      <div>
        <h2 className="serif">Subscribe to our newsletter</h2>
        <p>Get Agarwal Group project launches and construction updates by email.</p>
      </div>
      <form onSubmit={subscribe}>
        <label htmlFor={emailId}>Email address</label>
        <div className="ag-newsletter-fields">
          <input id={emailId} name="email" type="email" placeholder="you@email.com"
            autoComplete="email" maxLength={254} required readOnly={pending} />
          <button type="submit" disabled={pending} className="pcta-btn btn-enquire">
            <span>{pending ? 'Subscribing…' : 'Subscribe'}</span>
          </button>
        </div>
        <p role="status" aria-live="polite">{message}</p>
      </form>
    </section>
  );
}
