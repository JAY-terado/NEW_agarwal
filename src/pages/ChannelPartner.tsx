import { useState } from 'react';

import heroImage from '../assets/agarwal-horizon-hero.jpg';

export default function ChannelPartner() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: 'var(--color-ivory)', minHeight: '100vh' }}>
      {/* Page Hero */}
      <header className="page-hero">
        <div className="page-hero-bg">
          <img src={heroImage} alt="Channel Partner network" />
        </div>
        <div className="wrap-widescreen relative z-10">
          <span className="eyebrow light">Channel Partners</span>
          <h1 className="serif">Become an <em>Agarwal Group</em> Channel Partner</h1>
          <p>Partner with one of the most trusted real estate developers in Vasai–Virar &amp; Mumbai. Access premium residential projects, competitive brokerage, dedicated sales support, and exclusive pre-launch opportunities to grow your business.</p>
        </div>
      </header>

      {/* Main Section */}
      <section className="section">
        <div className="wrap-widescreen channel-grid">
          <div>
            <span className="eyebrow">Why Partner with Agarwal Group?</span>
            <h2 className="serif" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', lineHeight: 1.12, margin: '.4em 0 .5em' }}>
              A partnership built on <em style={{ fontStyle: 'italic', color: 'var(--brass-deep)' }}>trust &amp; returns</em>
            </h2>
            <p className="ch-lead">
              Register as an Agarwal Group channel partner to unlock our full inventory across Vasai–Virar &amp; Mumbai, best-in-class brokerage, and the marketing muscle of an established brand.
            </p>

            <ul className="ch-benefits">
              <li>
                <b>Competitive Brokerage</b>
                <span>Earn attractive commissions on every successful booking.</span>
              </li>
              <li>
                <b>Timely Payouts</b>
                <span>Transparent and hassle-free brokerage settlements.</span>
              </li>
              <li>
                <b>RERA-Registered Projects</b>
                <span>Promote trusted residential developments with confidence.</span>
              </li>
              <li>
                <b>Dedicated Relationship Manager</b>
                <span>Get expert support from enquiry to booking.</span>
              </li>
              <li>
                <b>Marketing Support</b>
                <span>Access brochures, floor plans, pricing, and digital creatives.</span>
              </li>
              <li>
                <b>Exclusive Launch Access</b>
                <span>Receive priority access to new project launches and special offers.</span>
              </li>
            </ul>

            <div style={{ marginTop: '48px' }}>
              <span className="eyebrow">How It Works</span>

              <div className="steps">
                <div className="step">
                  <div className="n serif">01</div>
                  <h4 className="serif">Register</h4>
                  <p> Submit your details and MahaRERA registration.</p>
                </div>
                <div className="step">
                  <div className="n serif">02</div>
                  <h4 className="serif">Get Onboarded</h4>
                  <p>Our team verifies and activates your profile within 24 hours.</p>
                </div>
                <div className="step">
                  <div className="n serif">03</div>
                  <h4 className="serif">Start Earning</h4>
                  <p>Access project inventory, marketing support, and start earning.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="form">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <div className="ft serif">Register as a Channel Partner</div>
                <div className="fsub">Join our growing network of real estate consultants, brokers, and channel partners across Mumbai, Vasai, Virar, and the MMR.</div>

                <div className="frow">
                  <div className="field">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" required placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="firmCompany">Firm / Company</label>
                    <input type="text" id="firmCompany" required placeholder="Company name" />
                  </div>
                </div>

                <div className="frow">
                  <div className="field">
                    <label htmlFor="reraNo">RERA Reg. No.</label>
                    <input type="text" id="reraNo" required placeholder="Agent RERA no." />
                  </div>
                  <div className="field">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="tel" id="mobile" required placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required placeholder="you@email.com" />
                </div>

                <div className="field">
                  <label htmlFor="city">City of Operation</label>
                  <input type="text" id="city" required placeholder="e.g. Mumbai, Thane, Palghar" />
                </div>

                <button className="btn btn-brass" type="submit" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
                  Become a Partner →
                </button>

                <p className="form-note">
                  Already a partner? Email <a href="mailto:sales@agarwalrealties.com" style={{ color: 'var(--brass-deep)' }}>sales@agarwalrealties.com</a>
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--color-pine)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px'
                }}>
                  ✓
                </div>
                <div className="ft serif" style={{ color: 'var(--color-pine)', marginBottom: '10px' }}>Registration Received!</div>
                <p className="fsub" style={{ marginBottom: '0' }}>
                  Registered — we will be in touch shortly to activate your channel partner portal.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
