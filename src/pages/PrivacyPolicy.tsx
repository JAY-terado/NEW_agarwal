import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import heroImage from '../assets/gallery-pool.jpg';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-ivory text-ink min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Privacy Policy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/40 to-pine/65" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory">
          <div className="text-xs uppercase tracking-widest text-ivory/60 mb-3">
            <Link to="/" className="hover:text-brass-bright transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-brass-bright">Privacy Policy</span>
          </div>
          <span className="bg-brass-bright text-pine text-[10px] tracking-wider uppercase font-bold py-1 px-3.5 rounded-full inline-block mb-3.5">
            Legal &amp; Policy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
            Privacy <span className="italic font-serif text-brass-bright font-normal">Policy</span>
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 max-w-xl font-light leading-relaxed">
            Effective Date: July 18, 2026. Your privacy is our highest priority, and we ensure absolute confidentiality.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="bg-white border border-line rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col gap-8">
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-3 border-b border-line/40">
            <Shield className="w-4 h-4" /> Data collection &amp; Privacy protection systems
          </div>

          <div className="prose max-w-none text-xs sm:text-sm text-ink-soft leading-relaxed font-light flex flex-col gap-6">
            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">1. Information We Collect</h3>
              <p>
                We collect personal information that you voluntarily provide to us when you request a callback, fill out our customer onboarding forms, register as a channel partner, or contact us. This information includes:
              </p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5">
                <li>Full Name and contact person details.</li>
                <li>Mobile number and alternate numbers.</li>
                <li>Email address.</li>
                <li>Preferred budget and housing configuration (1, 2, or 3 BHK).</li>
                <li>Residential Address and occupational metadata (for customer registration forms).</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">2. How We Use Your Information</h3>
              <p>
                The information you share is processed strictly for legitimate business relations, including:
              </p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5">
                <li>Scheduling project site visits and sending booking brochures.</li>
                <li>Processing buyer details into our corporate CRM systems for CRM assignment.</li>
                <li>Sending updates, exclusive payment schemes, and marketing details relative to the specific project you selected.</li>
                <li>Facilitating home loans with partner national banks.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">3. Information Protection &amp; Security</h3>
              <p>
                We implement robust security measures to prevent unauthorized access, alteration, or disclosure of your personal data. All user data collected via forms is encrypted during transfer using SSL/TLS protocols and is stored securely in our CRM databases. Access is limited only to authorized sales and CRM executives.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">4. Non-Disclosure to Third Parties</h3>
              <p>
                We do not sell, rent, trade, or otherwise transfer your personally identifiable information to outside marketing firms or unrelated third parties. We may share details only with our trusted affiliates, legal advisors, and partner banks solely to process your home loan or complete your property booking.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">5. Cookies &amp; Web Analytics</h3>
              <p>
                Our site may use basic tracking cookies to improve user experience, optimize site navigation, and track page views. You can modify your browser settings to reject cookies if you prefer, though this may disable certain interactive search features on the site.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">6. Your Rights &amp; Opt-Out Details</h3>
              <p>
                You have the right to request a copy of the information we hold about you or request that we delete your details from our marketing lists. If you wish to opt-out of updates, you can notify us at any time by sending an email to our corporate inbox or clicking the unsubscribe links in our communications.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-line/40 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brass-deep hover:text-pine transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <span className="text-[10px] text-taupe font-medium">Agarwal Group CRM Office</span>
          </div>

        </div>
      </section>
    </div>
  );
}
