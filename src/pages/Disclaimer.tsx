import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import heroImage from '../assets/gallery-lobby.jpg';

export default function Disclaimer() {
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
            alt="Website Disclaimer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/40 to-pine/65" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory flex flex-col items-center text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
            Website <span className="italic font-serif text-brass-bright font-normal">Disclaimer</span>
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
            Last Updated: 25 August 2026. Please read this disclaimer carefully before using our services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="bg-white border border-line rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col gap-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-3 border-b border-line/40">
            <ShieldAlert className="w-4 h-4" /> Legal &amp; Policy
          </div>

          <div className="prose max-w-none text-xs sm:text-sm text-ink-soft leading-relaxed font-light flex flex-col gap-6">
            <p>
              This website and all pages, materials, information, images, illustrations, videos, brochures and other content available on or through it are provided for general information and indicative purposes only, subject to the terms set out below.<br />
              By accessing, browsing or using this website, the user acknowledges having read and understood this Disclaimer.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-ink mb-2">1. General Disclaimer</h3>
                <p>The information contained on this website is intended to provide general information about Agarwal Group, its group/associate entities, projects, developments and services.<br />
                While reasonable efforts are made to keep the information accurate and updated, no representation or warranty, express or implied, is made regarding the completeness, accuracy, reliability, suitability or continued availability of any information appearing on this website.<br />
                Information may be modified, corrected, supplemented, updated or removed from time to time, subject to applicable law.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">2. Website Does Not Constitute an Offer</h3>
                <p>Nothing contained on this website shall be construed as:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>an offer for sale;</li>
                  <li>an invitation to offer;</li>
                  <li>an allotment or reservation of any premises;</li>
                  <li>a promise or assurance of availability;</li>
                  <li>a legal representation or warranty;</li>
                  <li>a commitment regarding price, specifications, amenities or possession;</li>
                  <li>an agreement or contract of any nature.</li>
                </ul>
                <p className="mt-2">Any purchase or allotment of premises shall be governed by the relevant application/booking documents, allotment documentation, Agreement for Sale and other documents executed between the parties, together with applicable law.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">3. RERA DISCLOSURE</h3>
                <p>Projects required to be registered under the Real Estate (Regulation and Development) Act, 2016 and the applicable rules and regulations are/will be registered with the appropriate regulatory authority.<br />
                Prospective purchasers are strongly advised to independently review the information and documents available on the official MahaRERA portal before making any decision concerning a project.<br />
                In the event of any inconsistency between general promotional content on this website and information required by law to be disclosed on the applicable regulatory portal, the position under applicable law and the relevant statutory/project documentation shall apply.<br />
                Nothing in this Disclaimer is intended to exclude, restrict or override any right or remedy available to an allottee or consumer under applicable law.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">4. PROJECT INFORMATION</h3>
                <p>All project information appearing on this website, including information relating to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 grid grid-cols-2 sm:grid-cols-3 gap-x-4">
                  <li>configurations;</li>
                  <li>areas;</li>
                  <li>dimensions;</li>
                  <li>layouts;</li>
                  <li>plans;</li>
                  <li>specifications;</li>
                  <li>amenities;</li>
                  <li>facilities;</li>
                  <li>building elevations;</li>
                  <li>project phases;</li>
                  <li>number of floors;</li>
                  <li>open spaces;</li>
                  <li>landscaping;</li>
                  <li>common areas;</li>
                  <li>parking;</li>
                  <li>connectivity;</li>
                  <li>surrounding development; and</li>
                  <li>proposed infrastructure</li>
                </ul>
                <p className="mt-2">should be independently verified by prospective purchasers before making a booking or purchase decision.<br />
                Project particulars may be subject to approvals, modifications and changes permissible under applicable laws and contractual documentation.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">5. IMAGES, RENDERS &amp; ARTISTIC IMPRESSIONS</h3>
                <p><strong>This clause should be particularly prominent on your website.</strong><br />
                All photographs, computer-generated images, architectural renders, artistic impressions, illustrations, sketches, videos, walkthroughs, animations and other visual representations displayed on this website are indicative and/or representative in nature, unless expressly stated otherwise.<br />
                They are intended to assist viewers in understanding the broad concept or character of a project.<br />
                The actual project may differ in appearance due to construction requirements, statutory approvals, design development, materials, landscaping, lighting and other permissible factors.<br />
                Unless specifically stated otherwise:<br />
                *Images are for representational purposes only.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">6. FURNITURE, INTERIORS &amp; DECOR</h3>
                <p>Furniture, furnishings, fixtures, appliances, lighting, decorative elements, artwork, plants, accessories and interior styling shown in images or renders are generally used for illustrative purposes.<br />
                Such items should not be presumed to form part of the standard premises being offered for sale unless specifically stated in the relevant contractual documents/specifications.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">7. VIEWS FROM APARTMENTS</h3>
                <p>Any views shown from apartments, decks, balconies, windows, terraces or other areas are indicative.<br />
                Actual views may vary depending upon:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 grid grid-cols-2">
                  <li>floor;</li>
                  <li>unit location;</li>
                  <li>orientation;</li>
                  <li>surrounding buildings;</li>
                  <li>future development;</li>
                  <li>landscaping;</li>
                  <li>infrastructure;</li>
                  <li>seasonal conditions; and</li>
                  <li>other factors outside the developer's control.</li>
                </ul>
                <p className="mt-2">No particular view should be treated as guaranteed merely because it appears in promotional material.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">8. PLANS &amp; LAYOUTS</h3>
                <p>Floor plans, master plans, unit plans, location plans, layout plans and other drawings displayed on the website are indicative and should not be used for taking measurements, ordering furniture, carrying out interior work or making technical decisions.<br />
                Dimensions shown may be rounded or approximate.<br />
                Prospective purchasers should refer to the relevant sanctioned/approved plans and contractual documents, as applicable, for authoritative particulars.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">9. AREA DISCLAIMER</h3>
                <p>References to carpet area, built-up area or any other area measurement shall be understood in accordance with the terminology expressly used and applicable law.<br />
                Where a project is governed by RERA, the relevant RERA carpet-area disclosures and contractual documents should be referred to.<br />
                Users should not calculate or infer saleable area, loading or other measurements merely from images or website drawings.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">10. AMENITIES &amp; FACILITIES</h3>
                <p>Amenities displayed on the website are project-specific.<br />
                An amenity shown for one Agarwal Group project should not be assumed to be available in another project.<br />
                Users should therefore refer only to the amenities specifically disclosed for the project in which they are interested.<br />
                The nature, location, design and specifications of amenities shall be governed by the relevant approved/project documentation and applicable law.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">11. LOCATION MAPS &amp; DISTANCES</h3>
                <p>Maps appearing on this website are generally schematic and are intended only to provide broad location guidance.<br />
                They may not be to scale.<br />
                Distances and travel times mentioned on the website may be approximate and may vary due to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>traffic;</li>
                  <li>road conditions;</li>
                  <li>route selected;</li>
                  <li>infrastructure changes;</li>
                  <li>mode of transportation; and</li>
                  <li>other circumstances.</li>
                </ul>
                <p className="mt-2">References to nearby landmarks, schools, hospitals, railway stations, shopping centres or other establishments are intended only for location identification and do not imply any association with, endorsement by or affiliation with such establishments.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">12. PROPOSED INFRASTRUCTURE</h3>
                <p>References to proposed roads, metro lines, highways, bridges, railway improvements, airports or other public infrastructure are based on information understood to be available at the relevant time.<br />
                Such projects are generally planned, approved and implemented by independent governmental or statutory authorities.<br />
                Agarwal Group does not control and cannot guarantee their completion, timelines, alignment or implementation.<br />
                Prospective purchasers should independently verify such information.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">13. PRICES</h3>
                <p>Any price, starting price, cost illustration, payment plan or commercial information displayed on the website is indicative unless expressly stated otherwise.<br />
                Prices may change from time to time.<br />
                Additional amounts may apply towards items such as taxes, statutory charges, stamp duty, registration charges and other applicable amounts, depending upon the transaction and applicable law.<br />
                The final commercial terms shall be those formally communicated and documented for the relevant transaction.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">14. AVAILABILITY</h3>
                <p>Display of any configuration, apartment, floor, wing or unit on the website does not guarantee availability.<br />
                Inventory changes continuously as a result of bookings, cancellations, reservations and other transactions.<br />
                Users should confirm current availability directly with the authorised Agarwal Group sales team.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">15. OFFERS &amp; PROMOTIONS</h3>
                <p>Any discount, scheme, benefit, festive offer, payment plan or other promotional campaign shall:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>be valid only for the specified period;</li>
                  <li>be subject to its applicable terms and eligibility criteria;</li>
                  <li>be subject to availability; and</li>
                  <li>not be presumed to apply to every project or unit.</li>
                </ul>
                <p className="mt-2">T&amp;C Apply wherever indicated.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">16. POSSESSION &amp; COMPLETION</h3>
                <p>Any construction, completion or possession information should be read together with the applicable project registration details and contractual documentation.<br />
                Users should not rely solely on advertisements, social-media posts, website content, verbal discussions or informal communication for determining contractual possession obligations.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">17. CONSTRUCTION UPDATES</h3>
                <p>Photographs and videos shown under construction updates are intended to provide general progress information.<br />
                Dates of photographs may be mentioned where appropriate.<br />
                Construction progress can vary across wings, buildings, phases and different portions of a project.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">18. ORAL REPRESENTATIONS</h3>
                <p>Prospective purchasers should not rely upon any oral statement, informal assurance or representation that is inconsistent with the officially issued project information and executed contractual documentation.<br />
                Employees, representatives, brokers and Channel Partners should not be understood to have authority to vary contractual terms unless such variation is duly authorised and documented in writing by the competent entity.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">19. CHANNEL PARTNERS &amp; THIRD-PARTY BROKERS</h3>
                <p>Agarwal Group may engage or interact with independent Channel Partners, brokers and real estate consultants.<br />
                Unless expressly authorised in writing, such third parties are not authorised to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>alter project specifications;</li>
                  <li>guarantee unit availability;</li>
                  <li>promise unauthorised discounts;</li>
                  <li>modify payment terms;</li>
                  <li>make commitments regarding possession;</li>
                  <li>collect money on behalf of the developer; or</li>
                  <li>make representations beyond officially authorised project information.</li>
                </ul>
                <p className="mt-2">Prospective purchasers should independently verify material representations with the authorised Agarwal Group sales office before acting upon them.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">20. PAYMENTS</h3>
                <p>Users should make payments only through payment modes and bank accounts officially communicated by the relevant project entity.<br />
                Agarwal Group shall not be responsible for payments voluntarily made by users to unauthorised persons, intermediaries or accounts, subject always to applicable law.<br />
                If in doubt, verify payment instructions with the authorised sales/accounts team before transferring funds.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">21. NO INVESTMENT OR FINANCIAL ADVICE</h3>
                <p>Nothing on this website constitutes investment, financial, tax or legal advice.<br />
                Statements relating to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 grid grid-cols-2">
                  <li>appreciation;</li>
                  <li>future value;</li>
                  <li>investment potential;</li>
                  <li>rental yield;</li>
                  <li>infrastructure growth; or</li>
                  <li>market trends</li>
                </ul>
                <p className="mt-2">should not be treated as guarantees of future returns.<br />
                Real estate values and market conditions can fluctuate.<br />
                Purchasers and investors should undertake their own assessment and obtain independent professional advice where necessary.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">22. LOANS &amp; HOME FINANCE</h3>
                <p>Any reference to banks, housing finance companies, home loans or financing options is provided for general convenience.<br />
                Loan approval, interest rates, eligibility, tenure and disbursement are determined independently by the concerned lender.<br />
                Agarwal Group does not guarantee sanction of any loan merely because a project or purchaser has been considered by a particular lender.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">23. THIRD-PARTY NAMES, LOGOS &amp; TRADEMARKS</h3>
                <p>Names, logos or trademarks belonging to third parties that may appear on the website remain the property of their respective owners.<br />
                Their appearance does not necessarily indicate any partnership, sponsorship, endorsement or association with Agarwal Group unless expressly stated.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">24. THIRD-PARTY LINKS</h3>
                <p>The website may contain links to third-party websites or services, including regulatory authorities, maps, social-media platforms and other external resources.<br />
                Such links are provided for convenience.<br />
                Agarwal Group does not control the content, availability, security or privacy practices of third-party websites and shall not be responsible for their operation, subject to applicable law.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">25. INTELLECTUAL PROPERTY</h3>
                <p>All content on this website, including:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 grid grid-cols-2 sm:grid-cols-3 gap-x-4">
                  <li>Agarwal Group name and logo;</li>
                  <li>project names and logos;</li>
                  <li>photographs;</li>
                  <li>renders;</li>
                  <li>videos;</li>
                  <li>brochures;</li>
                  <li>drawings;</li>
                  <li>text;</li>
                  <li>graphics;</li>
                  <li>layouts; and</li>
                  <li>website design</li>
                </ul>
                <p className="mt-2">is owned by, licensed to or used with permission by the relevant Agarwal Group entity, unless otherwise stated.<br />
                Unauthorised copying, reproduction, modification, publication, commercial exploitation or distribution is prohibited.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">26. WEBSITE AVAILABILITY &amp; TECHNICAL ISSUES</h3>
                <p>Reasonable efforts are made to maintain website availability and security.<br />
                However, Agarwal Group does not warrant uninterrupted or error-free access.<br />
                The website may temporarily become unavailable due to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 grid grid-cols-2">
                  <li>maintenance;</li>
                  <li>upgrades;</li>
                  <li>server issues;</li>
                  <li>telecommunications failures;</li>
                  <li>cyber incidents; or</li>
                  <li>circumstances beyond reasonable control.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">27. NO WARRANTY</h3>
                <p>To the extent permitted by applicable law, the website and its content are made available on an "as is" and "as available" basis.<br />
                No warranty is given that the website will always be uninterrupted, error-free or free from harmful components.<br />
                This clause does not exclude any warranty or obligation that cannot lawfully be excluded.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">28. LIMITATION OF LIABILITY</h3>
                <p>To the maximum extent permitted by applicable law, Agarwal Group and its relevant entities, directors, employees and authorised representatives shall not be liable for indirect, incidental, special or consequential loss arising solely from access to, inability to access or reliance upon general website content.<br />
                This limitation shall not apply where liability cannot legally be excluded or limited.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">29. SOCIAL MEDIA &amp; DIGITAL ADVERTISEMENTS</h3>
                <p>Information published on social-media platforms, digital advertisements, WhatsApp campaigns, online portals or third-party property platforms may be abbreviated because of space and format limitations.<br />
                Prospective purchasers should therefore refer to the relevant project page, official documentation and regulatory disclosures before making a decision.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">30. PROJECT-SPECIFIC ENTITIES</h3>
                <p>The expression "Agarwal Group" may be used on the website as a brand/reference to the group.<br />
                Individual projects may be developed, promoted or owned by different legal entities within or associated with the Group.<br />
                The name and details of the relevant promoter/developer entity should be disclosed on the respective project page and in applicable statutory/project documentation.<br />
                <strong>This is an important clause for your website if different projects are undertaken through different partnership firms, LLPs or companies.</strong></p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">31. CHANGES TO INFORMATION</h3>
                <p>Website content may be updated periodically.<br />
                Users should not rely on screenshots, downloaded copies, cached pages or previously viewed versions as representing the latest information.<br />
                For current information, users should contact the authorised sales team or refer to the applicable statutory disclosures.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">32. GOVERNING LAW</h3>
                <p>Use of this website and this Disclaimer shall be governed by the laws of India.<br />
                Subject to applicable statutory rights and jurisdictional requirements, disputes relating specifically to use of this website shall be subject to the jurisdiction of the competent courts at Mumbai, Maharashtra.</p>
              </div>

              <div>
                <h3 className="font-bold text-ink mb-2">33. RESERVATION OF STATUTORY RIGHTS</h3>
                <p>Nothing contained in this Disclaimer is intended to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>waive any statutory obligation of a promoter;</li>
                  <li>restrict any non-waivable right of an allottee or consumer;</li>
                  <li>override the Real Estate (Regulation and Development) Act, 2016;</li>
                  <li>override applicable MahaRERA rules, regulations or orders; or</li>
                  <li>override any other mandatory provision of applicable law.</li>
                </ul>
                <p className="mt-2">Where any provision of this Disclaimer conflicts with a mandatory provision of applicable law, the applicable law shall prevail to the extent of such conflict.</p>
              </div>

              <div className="pt-8 border-t border-line/40">
                <h3 className="font-bold text-ink mb-4">34. CONTACT &amp; VERIFICATION</h3>
                <p className="mb-2">Before making a booking, payment or purchase decision, prospective purchasers are encouraged to verify project information directly with:</p>
                <p className="font-bold">AGARWAL GROUP</p>
                <p>Corporate Office:<br />9, Gokul Annexe, Agarwal Gardens,
                  Opp. Muljibhai Mehta School,
                  Gokul Township, Virar (W),
                  Maharashtra - 401303</p>
                <p className="mt-2">Sales Helpline:<br />+91 84080 08001 / +91 84080 08002 / +91 84080 08003</p>
                <p className="mt-2">Email:<br />sales@agarwalrealties.com</p>
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
