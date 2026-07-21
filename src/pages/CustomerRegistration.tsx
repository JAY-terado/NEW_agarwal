import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, User, Home, FileText, Send, Building } from 'lucide-react';
import heroImage from '../assets/gallery-exterior.jpg';

export default function CustomerRegistration() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showApplicant2, setShowApplicant2] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-ivory text-ink">
      {/* Page Hero */}
      <section className="relative h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Customer Onboarding"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/30 to-pine/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory flex justify-center">
          <div className="max-w-xl w-full text-center flex flex-col items-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
              Customer <span className="italic font-serif text-brass-bright font-normal">Registration</span>
            </h1>
            <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
              Onboard as an official buyer with the Agarwal Group. Share your requirements and budget, and our CRM team will guide you through registration.
            </p>
          </div>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!formSubmitted ? (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-line rounded-3xl p-6 sm:p-10 shadow-2xl"
            >
              <div className="pb-6 border-b border-line mb-8">
                <span className="text-[10px] tracking-widest uppercase font-bold text-brass">Customer Details</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-light mt-1">Tell us about yourself</h2>
                <p className="text-[11px] text-taupe mt-1 leading-relaxed font-light">
                  Fields marked <span className="text-rose-500 font-bold">*</span> are required. Verified details will be registered into our CRM system within 24 hours.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
                {/* 1. Applicant Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <User className="w-4 h-4" /> Applicant Information
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Applicant 1 Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                    {showApplicant2 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col gap-1"
                      >
                        <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Applicant 2 Name</label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                        />
                      </motion.div>
                    )}
                  </div>
                  {!showApplicant2 && (
                    <button
                      type="button"
                      onClick={() => setShowApplicant2(true)}
                      className="self-start text-[10px] tracking-wider uppercase font-bold text-brass-deep hover:text-pine transition-colors mt-1"
                    >
                      + Add second applicant
                    </button>
                  )}
                </div>

                {/* 2. Project Selector & Core Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Preferred Project</label>
                    <select
                      className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass bg-white text-ink font-medium"
                    >
                      <option value="skyrise">Agarwal Skyrise — Vasai East</option>
                      <option value="infinity">Agarwal Infinity — Virar West</option>
                      <option value="sky-heights">Agarwal Sky Heights — Virar West</option>
                      <option value="horizon">Agarwal Horizon — Virar West</option>
                      <option value="general inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* 3. Phone Verification */}
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Mobile Number <span className="text-rose-500">*</span></label>
                      <div className="flex border border-line rounded overflow-hidden bg-ivory/20 focus-within:border-brass">
                        <span className="bg-ivory border-r border-line text-[10px] font-bold text-taupe flex items-center px-4">+91</span>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          placeholder="10 digit number"
                          className="px-4 py-3 text-xs focus:outline-none w-full text-ink font-medium bg-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Alternate Mobile Number</label>
                      <div className="flex border border-line rounded overflow-hidden bg-ivory/20 focus-within:border-brass">
                        <span className="bg-ivory border-r border-line text-[10px] font-bold text-taupe flex items-center px-4">+91</span>
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          placeholder="10 digit number"
                          className="px-4 py-3 text-xs focus:outline-none w-full text-ink font-medium bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="self-start bg-ivory border border-line hover:bg-brass hover:border-brass hover:text-pine px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-ink transition-all"
                    >
                      Send Verification OTP
                    </button>
                    {otpSent && (
                      <span className="text-[10px] text-taupe leading-relaxed">
                        ✓ OTP verification will be activated once the system is connected to your CRM backend.
                      </span>
                    )}
                  </div>
                </div>

                {/* 4. Residential Address */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <Home className="w-4 h-4" /> Residential Address
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">House/Flat No.</label>
                      <input
                        type="text"
                        placeholder="e.g., A/102"
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Building/Society Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Street Name / Locality</label>
                      <input
                        type="text"
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">City <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Pincode <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        pattern="[0-9]{6}"
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">State <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        defaultValue="Maharashtra"
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Country <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        defaultValue="India"
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Occupation & Business info */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <Building className="w-4 h-4" /> Occupation details
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Occupation Category <span className="text-rose-500">*</span></label>
                    <div className="flex flex-wrap gap-3">
                      {['Business', 'Service', 'Professional', 'Others'].map((occ) => (
                        <label key={occ} className="flex items-center gap-2 border border-line rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30 transition-colors">
                          <input type="radio" name="occupation" value={occ} required className="text-brass focus:ring-brass" />
                          <span>{occ}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="Company name"
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Designation</label>
                      <input
                        type="text"
                        placeholder="Your title"
                        className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. Contact Person Info
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Is the contact person same as Applicant 1? <span className="text-rose-500">*</span></label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 border border-line rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30">
                        <input
                          type="radio"
                          name="samecontact"
                          value="Yes"
                          defaultChecked
                          onClick={() => setShowContactPerson(false)}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 border border-line rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30">
                        <input
                          type="radio"
                          name="samecontact"
                          value="No"
                          onClick={() => setShowContactPerson(true)}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  {showContactPerson && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 overflow-hidden"
                    >
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Contact Person Name</label>
                        <input
                          type="text"
                          required
                          className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Relation / Designation</label>
                        <input
                          type="text"
                          required
                          className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-ivory/20"
                        />
                      </div>
                    </motion.div>
                  )}
                </div> */}

                {/* 7. Requirements & Budget Categories */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <FileText className="w-4 h-4" /> Requirements &amp; Preferences
                  </div>

                  {/* Requirements */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Preferred Configuration <span className="text-rose-500">*</span></label>
                    <div className="flex gap-2.5">
                      {['1 BHK', '2 BHK', '3 BHK', '4 BHK',].map((c) => (
                        <label key={c} className="flex items-center gap-2 border border-line rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30">
                          <input type="radio" name="config" value={c} required />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Estimated Budget <span className="text-rose-500">*</span></label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Below ₹30 L', '₹30–40 L', '₹40–55 L', '₹55–70 L', '₹70 L & Above'].map((b) => (
                        <label key={b} className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30">
                          <input type="radio" name="budget" value={b} required />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Source */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">How did you hear about us? <span className="text-rose-500">*</span></label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Hoardings', 'Friends & Relatives', 'Channel Partner', 'Print Media', 'Social Media', 'Website', 'WhatsApp', 'Other'].map((s) => (
                        <label key={s} className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30">
                          <input type="radio" name="source" value={s} required />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="flex flex-col gap-4 mt-4">
                  <label className="flex items-start gap-2.5 text-xs text-taupe font-medium cursor-pointer">
                    <input type="checkbox" required className="text-brass focus:ring-brass mt-0.5" />
                    <span>
                      I declare that all the information provided above is correct. I agree to the{' '}
                      <a href="#" className="text-brass-deep underline font-bold">
                        Terms &amp; Conditions
                      </a>{' '}
                      and allow sales executives to reach out. <span className="text-rose-500">*</span>
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-brass hover:bg-brass-deep text-pine hover:text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-lg mt-2"
                  >
                    Submit Registration Details
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-line rounded-3xl p-10 shadow-2xl text-center flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-2 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-ink font-semibold">
                Registration Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft max-w-sm leading-relaxed font-light">
                Thank you! Your buyer registration form has been logged successfully. Our CRM team will verify details and assign a customer relationship executive within 24 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
