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
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory flex flex-col items-center text-center">
          {/* <div className="text-xs uppercase tracking-widest text-ivory/60 mb-3">
            <Link to="/" className="hover:text-brass-bright transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-brass-bright">Privacy Policy</span>
          </div>
          <span className="bg-brass-bright text-pine text-[10px] tracking-wider uppercase font-bold py-1 px-3.5 rounded-full inline-block mb-3.5">
            Legal &amp; Policy
          </span> */}
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
            Privacy <span className="italic font-serif text-brass-bright font-normal">Policy</span>
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
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
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">1. Information collected and purpose</h3>
              <p className="font-medium mb-1">Information Downloaded:-</p>
              <p>
                While visiting our website, certain amount of information is automatically processed and may be collected by us for the interest and use of this association. These are listed below:
              </p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5">
                <li>The requested web page or download;</li>
                <li>Information on whether the request was successful or not;</li>
                <li>The date and time when you accessed the site;</li>
                <li>The Internet address of the web site or the domain name of the computer from which you accessed the site;</li>
                <li>The operating system of the machine running your web browser and the type and version of your web browser.</li>
              </ul>

              <p className="font-medium mt-4 mb-1">Cookies:-</p>
              <p>
                Cookies are small pieces of data that the site transfers to the user’s computer hard drive when the user visits the website. Our website uses only session cookies which are erased when the user closes the Web browser. The session cookie is stored in the computer's temporary memory and is not retainable after the browser is closed. Session cookies do not collect information from the user’s computer. They will typically store information in the form of a session identification that does not personally identify the user.
              </p>

              <p className="font-medium mt-4 mb-1">Personal data provided by the data subject:-</p>
              <p>
                When using this website’s online facilities, data subjects may be required to provide their personal information for the purpose of viewing/receiving further information about the company.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">2. Links to other Web Sites</h3>
              <p>
                To give you a better service our site can connect you with a number of links to other local and international organizations and agencies. When connecting to such other websites you will no longer be subject to our privacy policy but to the privacy policy of the new website being visited.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">3. Changes to this Privacy Policy</h3>
              <p>
                Shall there are any changes to this privacy policy, it will immediately be replaced with an updated version. It is therefore in your own interest to check the "Privacy Policy" page any time you access our website so as to be aware of any changes which may occur from time to time.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">4. Feedback</h3>
              <p>
                Any comments or suggestions that you may have and which may contribute to a better quality of service will always be welcomed and appreciated by us.
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
