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
          <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-2">
            Privacy <span className="italic font-serif text-brass-bright font-normal">Policy</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-ivory/80 font-light leading-relaxed">
            Effective Date: 25 August 2026. Your privacy is our highest priority, and we ensure absolute confidentiality.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="bg-white border border-line rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col gap-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-3 border-b border-line/40">
            <Shield className="w-4 h-4" /> Data collection &amp; Privacy protection systems
          </div>

          <div className="prose prose-sm max-w-none text-[11px] sm:text-xs text-ink-soft leading-relaxed font-light flex flex-col gap-6">
            <p>
              Agarwal Group ("Company", "we", "our", or "us") values your trust and is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, disclose and protect your personal information when you visit our website, interact with us online or offline, or use any of our services.<br />
              By accessing or using this website, you agree to the practices described in this Privacy Policy.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-ink mb-2">1. WHO WE ARE</h3>
                <p>Agarwal Group is a trusted real estate developer, engaged in developing quality residential and commercial projects.<br />For the purpose of this Privacy Policy, "Personal Information" means any information that identifies or can reasonably identify an individual.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">2. INFORMATION WE COLLECT</h3>
                <p>Depending on how you interact with us, we may collect the following information:</p>
                
                <h4 className="font-semibold text-ink mt-3 mb-1">A. Personal Information</h4>
                <ul className="list-disc pl-5 space-y-1 grid grid-cols-2 sm:grid-cols-3 gap-x-4">
                  <li>Full Name</li>
                  <li>Mobile Number</li>
                  <li>Email Address</li>
                  <li>Residential Address</li>
                  <li>City</li>
                  <li>State</li>
                  <li>PIN Code</li>
                  <li>Occupation</li>
                  <li>Company Name</li>
                  <li>Preferred Project</li>
                  <li>Budget Preferences</li>
                  <li>Property Preferences</li>
                </ul>

                <h4 className="font-semibold text-ink mt-4 mb-1">B. Information Submitted Through Forms</h4>
                <p>Whenever you fill any form on our website, including:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Enquiry Form</li>
                  <li>Contact Form</li>
                  <li>Book Site Visit</li>
                  <li>Download Brochure</li>
                  <li>Request Callback</li>
                  <li>Channel Partner Registration</li>
                  <li>Career Application</li>
                </ul>
                <p className="mt-1">we may collect the information provided by you.</p>

                <h4 className="font-semibold text-ink mt-4 mb-1">C. Technical Information</h4>
                <p>When you browse our website, certain information may be collected automatically, including:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>IP Address</li>
                  <li>Browser Type</li>
                  <li>Device Type</li>
                  <li>Operating System</li>
                  <li>Internet Service Provider</li>
                  <li>Date &amp; Time of Visit</li>
                  <li>Pages Visited</li>
                  <li>Website Navigation Behaviour</li>
                  <li>Referring Website</li>
                </ul>

                <h4 className="font-semibold text-ink mt-4 mb-1">D. Cookies &amp; Similar Technologies</h4>
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Improve website functionality</li>
                  <li>Understand visitor behaviour</li>
                  <li>Enhance user experience</li>
                  <li>Measure website performance</li>
                  <li>Personalise content</li>
                </ul>
                <p className="mt-1">You may disable cookies through your browser settings, although certain features of the website may not function properly.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">3. HOW WE USE YOUR INFORMATION</h3>
                <p>The information collected may be used for purposes including:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Responding to enquiries</li>
                  <li>Providing project information</li>
                  <li>Scheduling site visits</li>
                  <li>Sending brochures</li>
                  <li>Providing pricing information</li>
                  <li>Processing Channel Partner registrations</li>
                  <li>Responding to customer support requests</li>
                  <li>Improving website performance</li>
                  <li>Analysing visitor behaviour</li>
                  <li>Sending newsletters (where subscribed)</li>
                  <li>Informing you about launches, offers and events</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">4. COMMUNICATION FROM AGARWAL Group</h3>
                <p>By submitting your information through our website, you consent to receiving communications from Agarwal Group through:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Telephone Calls</li>
                  <li>SMS</li>
                  <li>WhatsApp</li>
                  <li>Email</li>
                  <li>Other electronic communication channels</li>
                </ul>
                <p className="mt-2">These communications may include:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Project Updates</li>
                  <li>Brochures</li>
                  <li>Event Invitations</li>
                  <li>New Launches</li>
                  <li>Offers</li>
                  <li>Appointment Confirmations</li>
                  <li>Customer Support</li>
                </ul>
                <p className="mt-2">You may opt out of promotional communications at any time by contacting us or following the unsubscribe instructions provided in our communications.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">5. CHANNEL PARTNER INFORMATION</h3>
                <p>If you register as a Channel Partner, we may collect additional information such as:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Firm Name</li>
                  <li>RERA Registration Details</li>
                  <li>GST Information</li>
                  <li>PAN Details</li>
                  <li>Bank Details (where required)</li>
                  <li>Business Address</li>
                  <li>Supporting Documents</li>
                </ul>
                <p className="mt-2">This information is collected solely for evaluating your application, onboarding approved Channel Partners and managing the business relationship.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">6. CAREER APPLICATIONS</h3>
                <p>If you apply for employment with Agarwal Group, we may collect:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Resume/CV</li>
                  <li>Educational Qualifications</li>
                  <li>Employment History</li>
                  <li>Professional References</li>
                  <li>Contact Details</li>
                  <li>Other information voluntarily provided by you</li>
                </ul>
                <p className="mt-2">Such information shall only be used for recruitment and related purposes.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">7. HOW WE SHARE YOUR INFORMATION</h3>
                <p>We respect your privacy and do not sell your personal information.<br />However, we may share your information where necessary with:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Our employees</li>
                  <li>Sales representatives</li>
                  <li>Authorised Channel Partners</li>
                  <li>Marketing agencies</li>
                  <li>Technology service providers</li>
                  <li>CRM providers</li>
                  <li>Payment service providers (where applicable)</li>
                  <li>Legal advisors</li>
                  <li>Government authorities when required by law</li>
                </ul>
                <p className="mt-2">All such parties are expected to maintain appropriate confidentiality.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">8. DATA SECURITY</h3>
                <p>We take reasonable administrative, technical and organisational measures to safeguard your personal information against:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Unauthorised access</li>
                  <li>Loss</li>
                  <li>Misuse</li>
                  <li>Alteration</li>
                  <li>Disclosure</li>
                  <li>Destruction</li>
                </ul>
                <p className="mt-2">While we strive to protect your information, no system can guarantee absolute security over the internet.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">9. DATA RETENTION</h3>
                <p>We retain personal information only for as long as reasonably necessary to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Respond to enquiries</li>
                  <li>Provide requested services</li>
                  <li>Maintain business records</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes</li>
                  <li>Enforce agreements</li>
                </ul>
                <p className="mt-2">Once no longer required, the information will be securely deleted or anonymised, subject to applicable legal requirements.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">10. THIRD-PARTY WEBSITES</h3>
                <p>Our website may contain links to third-party websites.<br />This Privacy Policy applies only to Agarwal Group's website.<br />We are not responsible for the privacy practices or content of third-party websites.<br />Users are encouraged to review the privacy policies of such websites before sharing personal information.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">11. CHILDREN'S PRIVACY</h3>
                <p>Our website is intended for adults.<br />We do not knowingly collect personal information from children below the age of 18 years.<br />If we become aware that information has been collected from a minor without appropriate consent, reasonable steps will be taken to delete such information.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">12. YOUR RIGHTS</h3>
                <p>Subject to applicable law, you may have the right to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Update your information</li>
                  <li>Request deletion of your information</li>
                  <li>Withdraw consent where applicable</li>
                  <li>Opt out of promotional communications</li>
                </ul>
                <p className="mt-2">Requests may be made using the contact details provided.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">13. ACCURACY OF INFORMATION</h3>
                <p>You are responsible for ensuring that the information you provide is true, accurate and up to date.<br />Please inform us promptly if your contact details change.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">14. WEBSITE ANALYTICS</h3>
                <p>We may use website analytics tools such as Google Analytics or similar services to better understand:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Visitor traffic</li>
                  <li>User behaviour</li>
                  <li>Popular pages</li>
                  <li>Device usage</li>
                  <li>Marketing effectiveness</li>
                </ul>
                <p className="mt-2">The information collected is generally aggregated and helps us improve our website and services.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">15. SOCIAL MEDIA</h3>
                <p>If you interact with Agarwal Group through social media platforms such as Instagram, Facebook, LinkedIn or YouTube, your interactions will also be subject to the respective platform's privacy policies.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">16. CHANGES TO THIS PRIVACY POLICY</h3>
                <p>We may update this Privacy Policy from time to time.<br />Any changes shall become effective immediately upon publication on this website.<br />We encourage users to review this page periodically.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">17. CONTACT US</h3>
                <p>If you have any questions regarding this Privacy Policy or wish to exercise your privacy rights, please contact us.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">18. CONSENT</h3>
                <p>By accessing this website or submitting your information through any form available on the website, you acknowledge that you have read, understood and agreed to this Privacy Policy and consent to the collection, use, storage and processing of your personal information in accordance with its terms.</p>
              </div>
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
