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
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory flex flex-col items-center text-center">
          {/* <div className="text-xs uppercase tracking-widest text-ivory/60 mb-3">
            <Link to="/" className="hover:text-brass-bright transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-brass-bright">Terms &amp; Conditions</span>
          </div>
          <span className="bg-brass-bright text-pine text-[10px] tracking-wider uppercase font-bold py-1 px-3.5 rounded-full inline-block mb-3.5">
            Legal &amp; Policy
          </span> */}
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
            Terms &amp; <span className="italic font-serif text-brass-bright font-normal">Conditions</span>
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
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
            <ul className="list-none pl-0 space-y-4">
              {[
                "The information, images, plans, layouts, specifications, dimensions, elevations, amenities, facilities, illustrations, videos, and other content displayed on this website are for general information and artistic representation only and are subject to change without prior notice, subject to approvals from the competent authorities.",
                "All visual representations, including computer-generated images (CGIs), renders, walkthroughs, animations, and sample apartment photographs, are indicative only and may differ from the actual completed development.",
                "Furniture, furnishings, décor items, electronic appliances, landscaping elements, vehicles, and accessories shown in the images or videos are for illustrative purposes only and do not form part of the standard apartment unless specifically mentioned in the Agreement for Sale.",
                "Apartments shall be delivered as per the specifications mentioned in the Agreement for Sale and the approved construction plans.",
                "Views shown from balconies, windows, terraces, or common areas are indicative and may vary depending on the apartment location, floor level, surrounding developments, weather conditions, and future construction in the vicinity.",
                "Floor plans, dimensions, and layouts are approximate and may undergo minor modifications due to architectural, structural, engineering, or statutory requirements.",
                "Carpet Area, as defined under the Real Estate (Regulation and Development) Act, 2016 (RERA), shall prevail wherever applicable. Super Built-up Area or Saleable Area, if mentioned, is for reference only.",
                "Prices mentioned for 1 BHK, 2 BHK, and 3 BHK apartments are exclusive of applicable GST (where applicable), stamp duty, registration charges, maintenance deposits, legal charges, government levies, utility connection charges, society formation charges, and any other statutory charges payable by the purchaser.",
                "All offers, discounts, payment plans, and promotional schemes are subject to change, withdrawal, or modification without prior notice and are subject to the terms of the respective offer.",
                "Amenities and recreational facilities shall be developed in phases wherever applicable and will be provided in accordance with the approved plans and project specifications.",
                "The project timeline, possession schedule, and completion dates are subject to force majeure events, government directives, judicial orders, natural calamities, material shortages, labour issues, or any other circumstances beyond the control of the developer.",
                "The developer reserves the right to make reasonable modifications in design, specifications, materials, colour schemes, landscaping, or common areas, provided such changes comply with applicable laws and regulatory approvals.",
                "Prospective purchasers are advised to independently verify all project details, approvals, specifications, pricing, availability, payment schedules, and legal documents before making any booking or purchase decision.",
                "The information contained on this website does not constitute a legal offer, contract, warranty, or commitment. The terms of the Agreement for Sale and other executed legal documents shall prevail in case of any inconsistency.",
                "The project shall be governed by the applicable provisions of the Real Estate (Regulation and Development) Act, 2016, the rules framed thereunder, and other applicable laws.",
                "The Project RERA Registration Number, approved plans, and other statutory details are available on the respective State RERA portal and should be verified by intending purchasers before making any payment.",
                "The developer shall not be liable for any reliance placed on outdated information after the website has been updated or revised.",
                "By accessing this website, the user acknowledges that they have read, understood, and agreed to these Terms & Conditions."
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rotate-45 bg-brass-bright shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
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
