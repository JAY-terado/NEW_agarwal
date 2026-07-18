import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import heroImage from '../assets/gallery-lobby.jpg';

export default function TermsConditions() {
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
            alt="Terms & Conditions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/40 to-pine/65" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory">
          <div className="text-xs uppercase tracking-widest text-ivory/60 mb-3">
            <Link to="/" className="hover:text-brass-bright transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-brass-bright">Terms &amp; Conditions</span>
          </div>
          <span className="bg-brass-bright text-pine text-[10px] tracking-wider uppercase font-bold py-1 px-3.5 rounded-full inline-block mb-3.5">
            Legal &amp; Policy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
            Terms &amp; <span className="italic font-serif text-brass-bright font-normal">Conditions</span>
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 max-w-xl font-light leading-relaxed">
            Effective Date: July 18, 2026. Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="bg-white border border-line rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col gap-8">
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-3 border-b border-line/40">
            <FileText className="w-4 h-4" /> Website Terms of Use &amp; Service disclaimers
          </div>

          <div className="prose max-w-none text-xs sm:text-sm text-ink-soft leading-relaxed font-light flex flex-col gap-6">
            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">1. Agreement to Terms</h3>
              <p>
                By accessing and using this website, you agree to be bound by these Terms &amp; Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained on this website are protected by applicable copyright and trademark law.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">2. Property disclaimers &amp; MahaRERA</h3>
              <p>
                All project specifications, layout designs, 3D renderings, and amenities shown on this website are conceptual artist impressions intended only for representation purposes. Actual project dimensions, configuration details, and layouts are subject to approvals from appropriate municipal authorities and MahaRERA. 
              </p>
              <p className="mt-2">
                Prospective buyers are advised to check the official MahaRERA website or inspect the approved plans directly at our sales offices to review registration certificates and municipal layout approvals before making any booking decisions.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">3. Enquiries &amp; Customer Submissions</h3>
              <p>
                When submitting details through our callback request form, customer registration forms, or channel partner forms, you certify that the information provided is accurate and belongs to you. You grant the Agarwal Group and its authorized sales coordinators explicit consent to reach out to you via call, email, or WhatsApp relative to your inquiry, overriding DND status if registered.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">4. Limitations of Liability</h3>
              <p>
                In no event shall the Agarwal Group or its developers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">5. Intellectual Property</h3>
              <p>
                The trademarks, brands, images, logos, copy, and layout design displayed on this site are the sole property of the Agarwal Group and its partner brands. You are not granted any license or permission to copy, reuse, modify, or download any media files or assets (such as videos or project layouts) from this site without explicit written approval.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">6. Modifications and Updates</h3>
              <p>
                The Agarwal Group may revise these website Terms &amp; Conditions at any time without prior notice. By using this website, you agree to be bound by the current version of these Terms &amp; Conditions.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-line/40 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brass-deep hover:text-pine transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <span className="text-[10px] text-taupe font-medium">Agarwal Group Legal Office</span>
          </div>

        </div>
      </section>
    </div>
  );
}
