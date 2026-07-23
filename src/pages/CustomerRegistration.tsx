import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, User, Home, FileText, Send, Building } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import heroImage from '../assets/gallery-exterior.jpg';

const schema = z.object({
  applicantName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  project: z.string().min(1, "Please select a project"),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  alternateMobileNumber: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits").optional().or(z.literal('')),

  // Address
  houseNo: z.string().optional(),
  buildingName: z.string().min(2, "Building name is required"),
  streetName: z.string().optional(),
  city: z.string().min(2, "City is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),

  // Occupation
  occupation: z.string().min(1, "Please select an occupation"),
  companyName: z.string().optional(),
  designation: z.string().optional(),

  // Requirements & Budget
  config: z.string().min(1, "Please select a configuration"),
  budget: z.string().min(1, "Please select a budget"),

  // Sources
  source: z.string().min(1, "Please select how you heard about us"),
  visitSource: z.string().min(1, "Please select source of visit"),

  // Channel Partner details
  cpName: z.string().optional(),
  cpAgencyName: z.string().optional(),
  cpLocation: z.string().optional(),
  cpMobileNumber: z.string().optional(),

  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).superRefine((data, ctx) => {
  if (data.visitSource === 'Channel Partner') {
    if (!data.cpName || data.cpName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Channel Partner name is required", path: ['cpName'] });
    }
    if (!data.cpAgencyName || data.cpAgencyName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Agency name is required", path: ['cpAgencyName'] });
    }
    if (!data.cpLocation || data.cpLocation.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Location is required", path: ['cpLocation'] });
    }
    if (!data.cpMobileNumber || !/^[0-9]{10}$/.test(data.cpMobileNumber)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid 10-digit mobile number is required", path: ['cpMobileNumber'] });
    }
  }
});

type FormData = z.infer<typeof schema>;

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <span className="text-[10px] text-rose-500 font-bold mt-1 tracking-wide">{message}</span>;
};

export default function CustomerRegistration() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [cpOtpSent, setCpOtpSent] = useState(false);
  const [cpOtpVerified, setCpOtpVerified] = useState(false);
  const [cpOtp, setCpOtp] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      state: "Maharashtra",
      country: "India",
    }
  });

  const visitSource = watch('visitSource');

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    setFormSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInputStyle = (error?: any) => {
    return `border rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium transition-colors ${error ? 'border-rose-500 bg-rose-50/30' : 'border-line bg-ivory/20 focus:bg-white'
      }`;
  };

  const getSelectStyle = (error?: any) => {
    return `border rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-white transition-colors ${error ? 'border-rose-500 bg-rose-50/30' : 'border-line'
      }`;
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
          <div className="max-w-2xl w-full text-center flex flex-col items-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
              Customer <span className="italic font-serif text-brass-bright font-normal">Registration</span>
            </h1>
            <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed sm:whitespace-nowrap">
              Share your requirements and budget, and our CRM team will guide you through registration.
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

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                {/* 1. Applicant Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <User className="w-4 h-4" /> Applicant Information
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Applicant Name*</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className={getInputStyle(errors.applicantName)}
                        {...register('applicantName')}
                      />
                      <ErrorMessage message={errors.applicantName?.message} />
                    </div>
                  </div>
                </div>

                {/* 2. Project Selector & Core Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className={getInputStyle(errors.email)}
                      {...register('email')}
                    />
                    <ErrorMessage message={errors.email?.message} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Preferred Project*</label>
                    <select
                      className={getSelectStyle(errors.project)}
                      defaultValue=""
                      {...register('project')}
                    >
                      <option value="" disabled hidden>
                        Select Preferred Project
                      </option>
                      <option value="skyrise">Agarwal Skyrise — Vasai East</option>
                      <option value="infinity">Agarwal Infinity — Virar West</option>
                      <option value="sky-heights">Agarwal Sky Heights — Virar West</option>
                      <option value="horizon">Agarwal Horizon — Virar West</option>
                      <option value="general inquiry">General Inquiry</option>
                    </select>
                    <ErrorMessage message={errors.project?.message} />
                  </div>
                </div>

                {/* 3. Phone Verification */}
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Mobile Number*</label>
                      <div className={`flex border rounded overflow-hidden focus-within:border-brass ${errors.mobileNumber ? 'border-rose-500 bg-rose-50/30' : 'border-line bg-ivory/20'}`}>
                        <span className="bg-ivory border-r border-line text-[10px] font-bold text-taupe flex items-center px-4">+91</span>
                        <input
                          type="tel"
                          placeholder="10 digit number"
                          className="px-4 py-3 text-xs focus:outline-none w-full text-ink font-medium bg-transparent"
                          {...(() => {
                            const { onChange, ...rest } = register('mobileNumber');
                            return {
                              ...rest,
                              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                onChange(e);
                              }
                            };
                          })()}
                        />
                      </div>
                      <ErrorMessage message={errors.mobileNumber?.message} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Alternate Mobile Number</label>
                      <div className={`flex border rounded overflow-hidden focus-within:border-brass ${errors.alternateMobileNumber ? 'border-rose-500 bg-rose-50/30' : 'border-line bg-ivory/20'}`}>
                        <span className="bg-ivory border-r border-line text-[10px] font-bold text-taupe flex items-center px-4">+91</span>
                        <input
                          type="tel"
                          placeholder="10 digit number"
                          className="px-4 py-3 text-xs focus:outline-none w-full text-ink font-medium bg-transparent"
                          {...(() => {
                            const { onChange, ...rest } = register('alternateMobileNumber');
                            return {
                              ...rest,
                              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                onChange(e);
                              }
                            };
                          })()}
                        />
                      </div>
                      <ErrorMessage message={errors.alternateMobileNumber?.message} />
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
                        className={getInputStyle(errors.houseNo)}
                        {...register('houseNo')}
                      />
                      <ErrorMessage message={errors.houseNo?.message} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Building/Society Name*</label>
                      <input
                        type="text"
                        className={getInputStyle(errors.buildingName)}
                        {...register('buildingName')}
                      />
                      <ErrorMessage message={errors.buildingName?.message} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Street Name / Locality</label>
                      <input
                        type="text"
                        className={getInputStyle(errors.streetName)}
                        {...register('streetName')}
                      />
                      <ErrorMessage message={errors.streetName?.message} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">City*</label>
                      <input
                        type="text"
                        className={getInputStyle(errors.city)}
                        {...register('city')}
                      />
                      <ErrorMessage message={errors.city?.message} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Pincode*</label>
                      <input
                        type="text"
                        maxLength={6}
                        className={getInputStyle(errors.pincode)}
                        {...(() => {
                          const { onChange, ...rest } = register('pincode');
                          return {
                            ...rest,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                              e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
                              onChange(e);
                            }
                          };
                        })()}
                      />
                      <ErrorMessage message={errors.pincode?.message} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">State*</label>
                      <input
                        type="text"
                        className={getInputStyle(errors.state)}
                        {...register('state')}
                      />
                      <ErrorMessage message={errors.state?.message} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Country*</label>
                      <input
                        type="text"
                        className={getInputStyle(errors.country)}
                        {...register('country')}
                      />
                      <ErrorMessage message={errors.country?.message} />
                    </div>
                  </div>
                </div>

                {/* 5. Occupation & Business info */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <Building className="w-4 h-4" /> Occupation details
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Occupation Category*</label>
                    <div className="flex flex-wrap gap-3">
                      {['Business', 'Service', 'Professional', 'Others'].map((occ) => (
                        <label key={occ} className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30 transition-colors ${errors.occupation ? 'border-rose-500' : 'border-line'}`}>
                          <input type="radio" value={occ} className="text-brass focus:ring-brass" {...register('occupation')} />
                          <span>{occ}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage message={errors.occupation?.message} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="Company name"
                        className={getInputStyle(errors.companyName)}
                        {...register('companyName')}
                      />
                      <ErrorMessage message={errors.companyName?.message} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Designation</label>
                      <input
                        type="text"
                        placeholder="Your title"
                        className={getInputStyle(errors.designation)}
                        {...register('designation')}
                      />
                      <ErrorMessage message={errors.designation?.message} />
                    </div>
                  </div>
                </div>

                {/* 7. Requirements & Budget Categories */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <FileText className="w-4 h-4" /> Requirements &amp; Preferences
                  </div>

                  {/* Requirements */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Preferred Configuration*</label>
                    <div className="flex gap-2.5">
                      {['1 BHK', '2 BHK', '3 BHK', '4 BHK'].map((c) => (
                        <label key={c} className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30 ${errors.config ? 'border-rose-500' : 'border-line'}`}>
                          <input type="radio" value={c} {...register('config')} />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage message={errors.config?.message} />
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Estimated Budget*</label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Below ₹30 L', '₹30–40 L', '₹40–55 L', '₹55–70 L', '₹70 L & Above'].map((b) => (
                        <label key={b} className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer hover:bg-ivory/30 ${errors.budget ? 'border-rose-500' : 'border-line'}`}>
                          <input type="radio" value={b} {...register('budget')} />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage message={errors.budget?.message} />
                  </div>

                  {/* Source */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">How did you hear about us?*</label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Hoardings', 'Friends & Relatives', 'Channel Partner', 'Print Media', 'Social Media', 'Website', 'WhatsApp', 'Other'].map((s) => (
                        <label key={s} className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer transition-colors ${errors.source ? 'border-rose-500' : 'border-line hover:bg-ivory/30'}`}>
                          <input type="radio" value={s} {...register('source')} />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage message={errors.source?.message} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Source of Visit*</label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Direct', 'Channel Partner'].map((s) => (
                        <label key={s} className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer transition-colors ${errors.visitSource ? 'border-rose-500' : 'border-line hover:bg-ivory/30'}`}>
                          <input type="radio" value={s} {...register('visitSource')} />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage message={errors.visitSource?.message} />
                  </div>

                  {/* Channel Partner Fields */}
                  <AnimatePresence>
                    {visitSource === 'Channel Partner' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-4 overflow-hidden mt-2 p-4 bg-ivory/30 border border-line-light rounded-xl"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                          Channel Partner Details
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Name of Channel Partner*</label>
                            <input
                              type="text"
                              placeholder="Full Name"
                              className={getInputStyle(errors.cpName)}
                              {...register('cpName')}
                            />
                            <ErrorMessage message={errors.cpName?.message} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Agency Name*</label>
                            <input
                              type="text"
                              placeholder="Agency Name"
                              className={getInputStyle(errors.cpAgencyName)}
                              {...register('cpAgencyName')}
                            />
                            <ErrorMessage message={errors.cpAgencyName?.message} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Location*</label>
                            <input
                              type="text"
                              placeholder="City / Area"
                              className={getInputStyle(errors.cpLocation)}
                              {...register('cpLocation')}
                            />
                            <ErrorMessage message={errors.cpLocation?.message} />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Contact Number of Channel Partner *</label>
                            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                              <div className={`flex border rounded overflow-hidden focus-within:border-brass flex-1 w-full bg-white ${errors.cpMobileNumber ? 'border-rose-500' : 'border-line'}`}>
                                <span className="bg-ivory border-r border-line text-[10px] font-bold text-taupe flex items-center px-4">+91</span>
                                <input
                                  type="tel"
                                  disabled={cpOtpVerified}
                                  placeholder="10 digit number"
                                  className="px-4 py-3 text-xs focus:outline-none w-full text-ink font-medium bg-transparent disabled:opacity-50"
                                  {...(() => {
                                    const { onChange, ...rest } = register('cpMobileNumber');
                                    return {
                                      ...rest,
                                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        onChange(e);
                                      }
                                    };
                                  })()}
                                />
                              </div>

                              {!cpOtpVerified && (
                                <button
                                  type="button"
                                  onClick={() => setCpOtpSent(true)}
                                  className="whitespace-nowrap bg-brass text-pine px-4 py-3 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-brass-deep transition-colors w-full md:w-auto"
                                >
                                  {cpOtpSent ? 'Resend OTP' : 'Send OTP'}
                                </button>
                              )}

                              {cpOtpVerified && (
                                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider bg-emerald-50 px-3 py-2.5 rounded border border-emerald-200">
                                  <CheckCircle2 className="w-4 h-4" /> Verified
                                </div>
                              )}
                            </div>
                            <ErrorMessage message={errors.cpMobileNumber?.message} />
                          </div>
                        </div>

                        {cpOtpSent && !cpOtpVerified && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-1"
                          >
                            <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">Enter Verification Code</label>
                            <div className="flex gap-3">
                              <input
                                type="text"
                                maxLength={4}
                                value={cpOtp}
                                onChange={(e) => setCpOtp(e.target.value)}
                                placeholder="4-digit code"
                                className="border border-line rounded px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium bg-white w-32 tracking-[0.25em]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (cpOtp.length === 4) setCpOtpVerified(true);
                                }}
                                className={`px-4 py-3 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${cpOtp.length === 4 ? 'bg-pine text-white hover:bg-pine/90' : 'bg-line/50 text-taupe cursor-not-allowed'}`}
                              >
                                Verify
                              </button>
                            </div>
                            <span className="text-[10px] text-taupe mt-1">Hint: Enter any 4 digits to verify (Mock OTP)</span>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Terms and Submit */}
                <div className="flex flex-col gap-4 mt-4">
                  <label className="flex items-start gap-2.5 text-xs text-taupe font-medium cursor-pointer">
                    <input type="checkbox" className="text-brass focus:ring-brass mt-0.5" {...register('termsAccepted')} />
                    <span>
                      I declare that all the information provided above is correct. I agree to the{' '}
                      <a href="#" className="text-brass-deep underline font-bold">
                        Terms &amp; Conditions
                      </a>{' '}
                      and allow sales executives to reach out. *
                    </span>
                  </label>
                  <ErrorMessage message={errors.termsAccepted?.message} />

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
