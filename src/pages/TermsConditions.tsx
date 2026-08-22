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
          <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-2">
            Terms &amp; <span className="italic font-serif text-brass-bright font-normal">Conditions</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-ivory/80 font-light leading-relaxed">
            Last Updated: 25 August 2026. Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="bg-white border border-line rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col gap-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-3 border-b border-line/40">
            <FileText className="w-4 h-4" /> Website Terms of Use &amp; Service disclaimers
          </div>

          <div className="prose prose-sm max-w-none text-[11px] sm:text-xs text-ink-soft leading-relaxed font-light flex flex-col gap-6">
            <p>
              Welcome to the Agarwal Group website ("Website"). By accessing or using this Website, you agree to comply with and be bound by these Terms &amp; Conditions ("Terms"). If you do not agree with these Terms, please refrain from using this Website.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-ink mb-2">1. About Agarwal Group</h3>
                <p>This Website is owned and operated by Agarwal Group ("Company", "we", "our", or "us"), a real estate developer engaged in the development of residential and commercial projects in the Mumbai Metropolitan Region (MMR).<br />These Terms govern your access to and use of this Website and all information, services and content made available through it.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">2. Acceptance of Terms</h3>
                <p>By accessing this Website, you acknowledge that you have read, understood and agreed to be bound by these Terms, our Privacy Policy and any other policies published on this Website.<br />If you are accessing the Website on behalf of an organisation, you represent that you have the authority to bind such organisation to these Terms.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">3. Purpose of the Website</h3>
                <p>This Website has been created to provide information about Agarwal Group, its projects, services, company updates and other related information.<br />The information provided on this Website is intended solely for general informational purposes and should not be construed as legal, financial, investment or professional advice.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">4. Project Information</h3>
                <p>While every effort is made to ensure that the information displayed on this Website is accurate and up to date, the Company reserves the right to modify, update or withdraw any information without prior notice.<br />Project details including but not limited to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Floor plans</li>
                  <li>Layouts</li>
                  <li>Unit configurations</li>
                  <li>Amenities</li>
                  <li>Specifications</li>
                  <li>Prices</li>
                  <li>Payment plans</li>
                  <li>Availability</li>
                  <li>Possession timelines</li>
                  <li>Elevations</li>
                  <li>Images</li>
                  <li>Brochures</li>
                </ul>
                <p className="mt-2">may be revised from time to time.<br />The latest information shall always be available through our authorised sales team.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">5. Representative Images</h3>
                <p>Photographs, renders, illustrations, computer-generated images, furniture, landscaping, lifestyle visuals and artistic impressions displayed on this Website are intended solely for illustrative and representational purposes.<br />Actual construction, views, colours, finishes, landscaping and specifications may differ.<br />Nothing displayed on the Website shall constitute a warranty or contractual commitment unless specifically incorporated into a written agreement executed between the Company and the purchaser.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">6. MahaRERA Compliance</h3>
                <p>Information relating to projects registered under the Real Estate (Regulation and Development) Act, 2016 shall be subject to the details available on the official MahaRERA website.<br />Prospective purchasers are advised to verify the applicable project registration details before making any purchase decision.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">7. Pricing</h3>
                <p>Any pricing, offers, payment plans or promotional schemes displayed on the Website are indicative in nature and are subject to revision without prior notice.<br />Prices applicable at the time of booking shall prevail.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">8. No Offer</h3>
                <p>Nothing contained on this Website shall constitute:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>a legal offer;</li>
                  <li>an invitation to contract;</li>
                  <li>a commitment to sell;</li>
                  <li>a guarantee of allotment.</li>
                </ul>
                <p className="mt-2">Booking of any property shall be governed solely by the terms of the application form, allotment letter, agreement for sale and other applicable documents.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">9. Enquiries</h3>
                <p>By submitting your contact details through this Website, you authorise Agarwal Group and its authorised representatives to contact you via:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Telephone</li>
                  <li>SMS</li>
                  <li>WhatsApp</li>
                  <li>Email</li>
                  <li>Other electronic communication</li>
                </ul>
                <p className="mt-2">for responding to your enquiry and providing information about our projects, services and promotional offers.<br />You may opt out of promotional communications at any time.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">10. Channel Partner Registration</h3>
                <p>Submission of a Channel Partner registration form does not automatically create a business relationship with Agarwal Group.<br />Registration requests are subject to review and approval in accordance with the Company's prevailing policies.<br />Any business relationship shall be governed by the applicable Channel Partner Agreement.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">11. Intellectual Property</h3>
                <p>Unless otherwise stated, all content available on this Website including:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 grid grid-cols-2 sm:grid-cols-3 gap-x-4">
                  <li>Logos</li>
                  <li>Trademarks</li>
                  <li>Trade names</li>
                  <li>Text</li>
                  <li>Images</li>
                  <li>Videos</li>
                  <li>Graphics</li>
                  <li>Brochures</li>
                  <li>Floor plans</li>
                  <li>Icons</li>
                  <li>Software</li>
                  <li>Website design</li>
                  <li>Layout</li>
                </ul>
                <p className="mt-2">is owned by or licensed to Agarwal Group and is protected under applicable intellectual property laws.<br />No content may be copied, reproduced, modified, distributed, published or used for commercial purposes without prior written permission from Agarwal Group.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">12. Permitted Use</h3>
                <p>You agree to use this Website only for lawful purposes.<br />You shall not:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>misuse the Website;</li>
                  <li>attempt to gain unauthorised access;</li>
                  <li>introduce viruses or malicious code;</li>
                  <li>interfere with Website functionality;</li>
                  <li>copy or scrape Website content without permission;</li>
                  <li>impersonate another person or organisation;</li>
                  <li>use the Website in violation of applicable law.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">13. Third-Party Links</h3>
                <p>This Website may contain links to third-party websites for the convenience of users.<br />Agarwal Group does not control, endorse or assume responsibility for the content, policies or practices of such third-party websites.<br />Users access such websites at their own discretion.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">14. Limitation of Liability</h3>
                <p>To the fullest extent permitted by law, Agarwal Group shall not be liable for any direct, indirect, incidental, consequential or special damages arising out of or in connection with:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>use of this Website;</li>
                  <li>inability to use the Website;</li>
                  <li>reliance on Website content;</li>
                  <li>technical interruptions;</li>
                  <li>viruses or malware;</li>
                  <li>inaccuracies or omissions in Website information.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">15. Availability of Website</h3>
                <p>While we strive to keep the Website available at all times, uninterrupted access cannot be guaranteed.<br />The Company reserves the right to suspend, modify or discontinue any part of the Website at any time without notice.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">16. Privacy</h3>
                <p>Collection and processing of personal information shall be governed by our Privacy Policy, which forms an integral part of these Terms.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">17. Cookies</h3>
                <p>The Website may use cookies and similar technologies to improve user experience, analyse Website performance and personalise content.<br />By continuing to use the Website, you consent to the use of cookies in accordance with our Cookie Policy.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">18. Accuracy of Information</h3>
                <p>Users are advised to independently verify all information relating to projects, approvals, specifications, pricing and availability before making any purchase decision.<br />Nothing contained on the Website should be treated as a substitute for independent verification.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">19. Indemnity</h3>
                <p>You agree to indemnify and hold harmless Agarwal Group, its directors, employees, representatives and affiliates against any claims, liabilities, losses, damages or expenses arising from your misuse of the Website or breach of these Terms.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">20. Modification of Terms</h3>
                <p>Agarwal Group reserves the right to amend or update these Terms at any time without prior notice.<br />The revised Terms shall become effective upon publication on this Website.<br />Users are encouraged to review this page periodically.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">21. Governing Law and Jurisdiction</h3>
                <p>These Terms shall be governed by and construed in accordance with the laws of India.<br />Any disputes arising out of or relating to these Terms or the use of this Website shall be subject to the exclusive jurisdiction of the competent courts at Mumbai, Maharashtra, unless otherwise required by applicable law.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">22. Viruses</h3>
                <p>We do not guarantee that Our Sites will be secure or free from bugs or viruses.</p>
                <p className="mt-2">You are responsible for configuring your information technology, computer programmes and platform in order to access Our Sites. You should use your own virus protection software.</p>
                <p className="mt-2">You must not misuse Our Sites by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to Our Sites, the server on which Our Sites are stored or any server, computer or database connected to Our Sites. You must not attack Our Sites via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Information Technology Act, 2000 and/ or any statutory amendments made therein. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use Our Sites will cease immediately.</p>
              </div>

              <div className="pt-8 border-t border-line/40">
                <h3 className="font-bold text-ink mb-4">Contact Us</h3>
                <p className="mb-2">For any questions regarding these Terms &amp; Conditions, please contact:</p>
                <p className="font-bold">Agarwal Group</p>
                <p>Corporate Office:<br />9, Gokul Annexe, Agarwal Gardens,
                  Opp. Muljibhai Mehta School,
                  Gokul Township, Virar (W),
                  Maharashtra - 401303</p>
                <p className="mt-2">Phone:<br />+91 84080 08001<br />
                  +91 84080 08002<br />
                  +91 84080 08003</p>
                <p className="mt-2">Email:<br />sales@agarwalrealties.com</p>
                <p className="mt-2">Website:<br />[Insert Website URL]</p>
              </div>
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
