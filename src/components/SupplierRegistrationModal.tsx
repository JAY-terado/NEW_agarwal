import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Briefcase, Package, Check, ChevronRight, UploadCloud, FileText, 
  Trash2, Edit2, Users, Sparkles, RefreshCw, AlertCircle, Building2, MapPin, Phone, Mail, User, ShieldCheck
} from 'lucide-react';

export type RegistrationTypeKey = 
  | 'Supplier / Manufacturer / Dealer'
  | 'Contractor / Subcontractor'
  | 'Service Provider / Consultant'
  | 'Other';

export interface DocumentEntry {
  status: 'attached' | 'later' | 'na';
  file: File | null;
}

export interface SupplierFormData {
  // Step 1: Type
  registrationType: RegistrationTypeKey | '';
  registrationTypeOther: string;

  // Step 2: Applicant Details
  contactPerson: string;
  companyName: string;
  mobile: string;
  email: string;
  address: string;
  website: string;

  // Step 3: Product / Service & Operations
  categories: string[];
  categoryOther: string;
  experienceYears: string;
  areasOfOperation: string[];
  majorProjects: string;
  additionalInfo: string;

  // Step 4: Documents
  documents: {
    companyProfile: DocumentEntry;
    catalogue: DocumentEntry;
    rateList: DocumentEntry;
    portfolio: DocumentEntry;
    licences: DocumentEntry;
    otherDocs: DocumentEntry;
  };

  // Step 5: Declaration & Consent
  agreedDeclaration: boolean;
}

const initialFormData: SupplierFormData = {
  registrationType: '',
  registrationTypeOther: '',

  contactPerson: '',
  companyName: '',
  mobile: '',
  email: '',
  address: '',
  website: '',

  categories: [],
  categoryOther: '',
  experienceYears: '',
  areasOfOperation: [],
  majorProjects: '',
  additionalInfo: '',

  documents: {
    companyProfile: { status: 'attached', file: null },
    catalogue: { status: 'attached', file: null },
    rateList: { status: 'attached', file: null },
    portfolio: { status: 'attached', file: null },
    licences: { status: 'attached', file: null },
    otherDocs: { status: 'later', file: null },
  },

  agreedDeclaration: false,
};

const REGISTRATION_TYPES: { id: RegistrationTypeKey; title: string; desc: string; icon: React.ElementType }[] = [
  {
    id: 'Supplier / Manufacturer / Dealer',
    title: 'Supplier / Manufacturer / Dealer',
    desc: 'Supply of raw materials, manufactured items, fixtures, hardware, tools & building products.',
    icon: Package,
  },
  {
    id: 'Contractor / Subcontractor',
    title: 'Contractor / Subcontractor',
    desc: 'Civil works, structural, MEP, interior, finishing, waterproofing, labour & turnkey contracting.',
    icon: Briefcase,
  },
  {
    id: 'Service Provider / Consultant',
    title: 'Service Provider / Consultant',
    desc: 'Architectural, engineering, site inspection, safety, security, landscaping & specialized consultancy.',
    icon: Users,
  },
  {
    id: 'Other',
    title: 'Other Business Associate',
    desc: 'Machinery leasing, specialized fabrication, transport/logistics or other trade categories.',
    icon: Sparkles,
  },
];

const PRODUCT_SERVICE_CATEGORIES = [
  'Building Materials',
  'Cement, Steel & RMC',
  'Electrical Materials',
  'Plumbing & Sanitaryware',
  'Tiles, Marble & Flooring',
  'Doors, Windows & Glass',
  'Paints, Waterproofing & Chemicals',
  'Aluminium, Fabrication & Metal Works',
  'Civil Works & Structural Contractors',
  'MEP Contractors',
  'Interior & Finishing Contractors',
  'Labour & Manpower Contractors',
  'Lifts & Building Systems',
  'Safety, Security & Fire Systems',
  'Architects / Consultants',
  'Machinery / Site Services',
  'Other',
];

const EXPERIENCE_OPTIONS = [
  'Less than 2 years',
  '2–5 years',
  '5–10 years',
  'More than 10 years',
];

const AREAS_OF_OPERATION = [
  'Virar / Vasai / Palghar',
  'Mumbai Metropolitan Region (MMR)',
  'Across Maharashtra',
  'Pan India',
];

interface DocumentMeta {
  key: keyof SupplierFormData['documents'];
  title: string;
  hint: string;
  allowNA: boolean;
}

const DOCUMENT_ITEMS: DocumentMeta[] = [
  {
    key: 'companyProfile',
    title: 'Company Profile / Introduction',
    hint: 'Overview of business, organizational structure, leadership & credentials.',
    allowNA: false,
  },
  {
    key: 'catalogue',
    title: 'Product Catalogue / Brochure',
    hint: 'Brochures, technical datasheets, brand catalogues or material specifications.',
    allowNA: true,
  },
  {
    key: 'rateList',
    title: 'Rate List / Product Specifications',
    hint: 'Indicative price schedule, standard rate list or product grade sheets.',
    allowNA: true,
  },
  {
    key: 'portfolio',
    title: 'Previous Work Orders / Project Portfolio',
    hint: 'Past projects delivered, completion certificates or work orders.',
    allowNA: true,
  },
  {
    key: 'licences',
    title: 'Relevant Licences / Certifications',
    hint: 'GST Certificate, PAN, MSME, ISO, contractor licenses or trade permits.',
    allowNA: true,
  },
  {
    key: 'otherDocs',
    title: 'Other Supporting Documents',
    hint: 'Any additional test certificates, dealership agreements or endorsements.',
    allowNA: true,
  },
];

export default function SupplierRegistrationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SupplierFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // CAPTCHA State
  const [captchaQ, setCaptchaQ] = useState({ a: 7, b: 5 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 2;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptchaQ({ a, b });
    setCaptchaInput('');
    setCaptchaError(false);
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setValidationError(null);
    }
  }, [isOpen]);

  const bodyRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const scrollToTop = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setValidationError(null);

    // Validation per step
    if (step === 1) {
      if (!formData.registrationType) {
        setValidationError('Please select a registration type to proceed.');
        return;
      }
      if (formData.registrationType === 'Other' && !formData.registrationTypeOther.trim()) {
        setValidationError('Please specify your registration type.');
        return;
      }
    }

    if (step === 2) {
      if (!formData.contactPerson.trim()) {
        setValidationError('Please enter contact person name.');
        return;
      }
      if (!formData.companyName.trim()) {
        setValidationError('Please enter company / firm name.');
        return;
      }
      if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, '').length < 10) {
        setValidationError('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        setValidationError('Please enter a valid email address.');
        return;
      }
      if (!formData.address.trim()) {
        setValidationError('Please enter registered office / business address.');
        return;
      }
    }

    if (step === 3) {
      if (formData.categories.length === 0) {
        setValidationError('Please select at least one Product / Service Category.');
        return;
      }
      if (formData.categories.includes('Other') && !formData.categoryOther.trim()) {
        setValidationError('Please specify your other category.');
        return;
      }
      if (!formData.experienceYears) {
        setValidationError('Please select your years of business experience.');
        return;
      }
      if (formData.areasOfOperation.length === 0) {
        setValidationError('Please select at least one area of operation.');
        return;
      }
    }

    if (step === 4) {
      // Validate that items marked as "attached" actually have a file attached
      for (const item of DOCUMENT_ITEMS) {
        const entry = formData.documents[item.key];
        if (entry.status === 'attached' && !entry.file) {
          setValidationError(`Please upload the file for "${item.title}" or select "To be submitted later".`);
          return;
        }
      }
    }

    setStep(prev => Math.min(5, prev + 1));
    scrollToTop();
  };

  const handleBack = () => {
    setValidationError(null);
    setStep(prev => Math.max(1, prev - 1));
    scrollToTop();
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.agreedDeclaration) {
      setValidationError('Please accept the declaration & consent to proceed.');
      return;
    }

    if (parseInt(captchaInput.trim(), 10) !== captchaQ.a + captchaQ.b) {
      setCaptchaError(true);
      setValidationError('Incorrect CAPTCHA answer. Please solve the calculation.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // Change Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleCategory = (cat: string) => {
    setFormData(prev => {
      const exists = prev.categories.includes(cat);
      const categories = exists 
        ? prev.categories.filter(c => c !== cat) 
        : [...prev.categories, cat];
      return { ...prev, categories };
    });
  };

  const toggleArea = (area: string) => {
    setFormData(prev => {
      const exists = prev.areasOfOperation.includes(area);
      const areasOfOperation = exists 
        ? prev.areasOfOperation.filter(a => a !== area) 
        : [...prev.areasOfOperation, area];
      return { ...prev, areasOfOperation };
    });
  };

  const setDocStatus = (key: keyof SupplierFormData['documents'], status: 'attached' | 'later' | 'na') => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [key]: {
          ...prev.documents[key],
          status,
          file: status === 'attached' ? prev.documents[key].file : null
        }
      }
    }));
  };

  const setDocFile = (key: keyof SupplierFormData['documents'], file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [key]: {
          ...prev.documents[key],
          file,
          status: file ? 'attached' : prev.documents[key].status
        }
      }
    }));
  };

  // Steps Configuration
  const steps = [
    { num: 1, title: 'Registration Type', icon: Briefcase },
    { num: 2, title: 'Applicant Details', icon: FileText },
    { num: 3, title: 'Business Profile', icon: Package },
    { num: 4, title: 'Documents', icon: UploadCloud },
    { num: 5, title: 'Declaration', icon: Check }
  ];

  const renderStepProgress = () => (
    <div className="bg-paper border-b border-line-light overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sticky top-0 z-20">
      <div className="flex px-4 md:px-8 py-3.5 min-w-[540px]">
        {steps.map((s, idx) => {
          const isActive = step === s.num;
          const isDone = step > s.num;
          return (
            <div key={s.num} className={`flex-1 flex items-center ${idx !== steps.length - 1 ? 'pr-2' : ''}`}>
              <div className="flex flex-col gap-0.5 relative z-10 bg-paper">
                <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isActive || isDone ? 'text-brass-deep' : 'text-taupe'}`}>
                  {String(s.num).padStart(2, '0')}
                </span>
                <span className={`text-xs md:text-sm font-semibold transition-colors ${isActive ? 'text-ink font-bold' : isDone ? 'text-ink' : 'text-ink-soft/40'}`}>
                  {s.title}
                </span>
              </div>
              {idx !== steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-3 relative top-1">
                  <div className="absolute inset-0 bg-line-light rounded" />
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-brass transition-all duration-500 ease-out rounded"
                    style={{ width: isDone ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-6 lg:p-10"
      >
        <motion.div 
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="w-full h-full md:h-[90vh] max-w-4xl bg-ivory rounded-none md:rounded-[32px] shadow-2xl flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="px-6 md:px-10 py-5 flex items-center justify-between bg-white border-b border-line-light shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brass-deep block mb-1">
                Agarwal Group • Luxury • Leisure • Lifestyle
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-ink">Supplier & Contractor Registration</h2>
              <p className="text-xs md:text-sm text-ink-soft mt-0.5">
                Become a registered business associate of Agarwal Group. Fields marked * are mandatory.
              </p>
            </div>
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-ink-soft hover:text-ink hover:bg-line-light transition-colors self-start md:self-center shrink-0 ml-4 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            <>
              {renderStepProgress()}

              {/* Form Body */}
              <div 
                ref={bodyRef} 
                className="flex-1 overflow-y-auto bg-paper p-6 md:p-10 relative [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-full"
              >
                <form id="supplierRegistrationForm" onSubmit={step === 5 ? handleFinalSubmit : (e) => { e.preventDefault(); handleNext(); }} className="max-w-3xl mx-auto w-full">
                  
                  {/* Validation Error Alert */}
                  {validationError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                      <span>{validationError}</span>
                    </motion.div>
                  )}

                  {/* STEP 1: REGISTRATION TYPE */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block mb-1">Section A: Applicant Details</span>
                        <h3 className="font-serif text-2xl md:text-3xl text-ink">Registration Type *</h3>
                        <p className="text-sm text-ink-soft mt-1">Please select the category that best represents your commercial engagement.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {REGISTRATION_TYPES.map((t) => {
                          const isSelected = formData.registrationType === t.id;
                          const Icon = t.icon;
                          return (
                            <div 
                              key={t.id}
                              onClick={() => {
                                setFormData(prev => ({ ...prev, registrationType: t.id }));
                                setValidationError(null);
                              }}
                              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full bg-white group ${
                                isSelected 
                                  ? 'border-brass-deep shadow-md scale-[1.01] ring-2 ring-brass/20' 
                                  : 'border-line-light hover:border-brass-light hover:shadow-sm'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                                isSelected ? 'bg-brass/20 text-brass-deep' : 'bg-paper text-ink-soft group-hover:text-brass'
                              }`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <h4 className="font-serif text-xl text-ink mb-1.5">{t.title}</h4>
                              <p className="text-xs md:text-sm text-ink-soft font-light leading-relaxed">{t.desc}</p>
                              <div className={`mt-auto pt-4 flex items-center gap-2 text-xs md:text-sm font-semibold transition-colors ${
                                isSelected ? 'text-brass-deep font-bold' : 'text-taupe'
                              }`}>
                                {isSelected ? 'Selected' : 'Select'} <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {formData.registrationType === 'Other' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }}
                          className="p-5 rounded-2xl bg-ivory border border-line-light"
                        >
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">
                            Please Specify Registration Type *
                          </label>
                          <input 
                            type="text" 
                            name="registrationTypeOther" 
                            value={formData.registrationTypeOther} 
                            onChange={handleInputChange} 
                            placeholder="e.g. Specialized Scaffolding, Heavy Machinery Rental, etc." 
                            className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass text-sm text-ink transition-colors"
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 2: APPLICANT DETAILS */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block mb-1">Section A: Contact & Business Entity</span>
                        <h3 className="font-serif text-2xl md:text-3xl text-ink">Applicant & Company Details</h3>
                        <p className="text-sm text-ink-soft mt-1">Provide your primary contact credentials and official business location.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        {/* Contact Person Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-brass-deep" /> Contact Person Name *
                          </label>
                          <input 
                            required 
                            type="text" 
                            name="contactPerson" 
                            value={formData.contactPerson} 
                            onChange={handleInputChange} 
                            placeholder="Full name of representative" 
                            className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors text-sm text-ink" 
                          />
                        </div>

                        {/* Company Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-brass-deep" /> Company / Firm Name *
                          </label>
                          <input 
                            required 
                            type="text" 
                            name="companyName" 
                            value={formData.companyName} 
                            onChange={handleInputChange} 
                            placeholder="Registered enterprise name" 
                            className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors text-sm text-ink" 
                          />
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-brass-deep" /> Mobile Number *
                          </label>
                          <div className="flex bg-white border border-line-light rounded-xl overflow-hidden focus-within:border-brass transition-colors">
                            <span className="bg-ivory px-4 py-3 border-r border-line-light text-ink-soft text-sm font-medium">+91</span>
                            <input 
                              required 
                              type="tel" 
                              name="mobile" 
                              value={formData.mobile} 
                              onChange={handleInputChange} 
                              placeholder="98765 43210" 
                              maxLength={10} 
                              className="w-full px-4 py-3 outline-none bg-transparent text-sm text-ink" 
                            />
                          </div>
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-brass-deep" /> Email Address *
                          </label>
                          <input 
                            required 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            placeholder="contact@company.com" 
                            className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors text-sm text-ink" 
                          />
                        </div>

                        {/* Registered Office / Business Address */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-brass-deep" /> Registered Office / Business Address *
                          </label>
                          <textarea 
                            required 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                            rows={3} 
                            placeholder="Complete office address, Unit/Plot No., Street, City, State, PIN code" 
                            className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors resize-none text-sm text-ink" 
                          />
                        </div>

                        {/* Company Website */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">
                            Company Website <span className="normal-case font-normal text-ink-soft/70">(Optional)</span>
                          </label>
                          <input 
                            type="url" 
                            name="website" 
                            value={formData.website} 
                            onChange={handleInputChange} 
                            placeholder="https://www.yourcompany.com" 
                            className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors text-sm text-ink" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: BUSINESS PROFILE & CATEGORIES */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block mb-1">Section A: Scope & Capacity</span>
                        <h3 className="font-serif text-2xl md:text-3xl text-ink">Products, Services & Experience</h3>
                        <p className="text-sm text-ink-soft mt-1">Select the trades you operate in and highlight your track record.</p>
                      </div>

                      {/* Main Product / Service Category */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-3">
                          Main Product / Service Category * <span className="normal-case font-normal text-ink-soft/70">(Select all that apply)</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {PRODUCT_SERVICE_CATEGORIES.map(cat => {
                            const isSelected = formData.categories.includes(cat);
                            return (
                              <button
                                type="button"
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all border cursor-pointer flex items-center gap-1.5 ${
                                  isSelected 
                                    ? 'bg-brass-deep text-white border-brass-deep shadow-sm' 
                                    : 'bg-white border-line-light text-ink hover:border-brass hover:text-brass-deep'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                                {cat}
                              </button>
                            );
                          })}
                        </div>

                        {formData.categories.includes('Other') && (
                          <div className="mt-3">
                            <input 
                              type="text" 
                              name="categoryOther" 
                              value={formData.categoryOther} 
                              onChange={handleInputChange} 
                              placeholder="Specify other product or service category *" 
                              className="w-full bg-white border border-line-light rounded-xl px-4 py-2.5 outline-none focus:border-brass text-sm text-ink" 
                            />
                          </div>
                        )}
                      </div>

                      {/* Years of Business Experience */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-3">
                          Years of Business Experience *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {EXPERIENCE_OPTIONS.map(exp => {
                            const isSelected = formData.experienceYears === exp;
                            return (
                              <button
                                type="button"
                                key={exp}
                                onClick={() => setFormData(prev => ({ ...prev, experienceYears: exp }))}
                                className={`py-3 px-4 rounded-xl text-center text-xs md:text-sm font-semibold transition-all border cursor-pointer ${
                                  isSelected 
                                    ? 'bg-brass/20 text-brass-deep border-brass-deep ring-2 ring-brass/20 font-bold' 
                                    : 'bg-white border-line-light text-ink hover:border-brass-light'
                                }`}
                              >
                                {exp}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Areas of Operation */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-3">
                          Areas of Operation * <span className="normal-case font-normal text-ink-soft/70">(Select all that apply)</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {AREAS_OF_OPERATION.map(area => {
                            const isSelected = formData.areasOfOperation.includes(area);
                            return (
                              <button
                                type="button"
                                key={area}
                                onClick={() => toggleArea(area)}
                                className={`p-3.5 rounded-xl text-left text-xs md:text-sm font-semibold transition-all border cursor-pointer flex items-center justify-between ${
                                  isSelected 
                                    ? 'bg-brass/10 text-brass-deep border-brass-deep' 
                                    : 'bg-white border-line-light text-ink hover:border-brass-light'
                                }`}
                              >
                                <span>{area}</span>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                                  isSelected ? 'bg-brass-deep border-brass-deep text-white' : 'border-line-light bg-paper'
                                }`}>
                                  {isSelected && <Check className="w-3.5 h-3.5" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Major Projects / Clients Served */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">
                          Major Projects / Clients Served
                        </label>
                        <textarea 
                          name="majorProjects" 
                          value={formData.majorProjects} 
                          onChange={handleInputChange} 
                          rows={3} 
                          placeholder="List key real estate developers, commercial clients, prominent projects, or landmarks delivered..." 
                          className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors resize-none text-sm text-ink" 
                        />
                      </div>

                      {/* Additional Business Information */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">
                          Additional Business Information
                        </label>
                        <textarea 
                          name="additionalInfo" 
                          value={formData.additionalInfo} 
                          onChange={handleInputChange} 
                          rows={3} 
                          placeholder="Brands dealt with, manufacturing/supply capacity, dedicated manpower, certifications (ISO, etc.) or specialisations..." 
                          className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors resize-none text-sm text-ink" 
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: DOCUMENTS TO BE UPLOADED / ATTACHED */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block mb-1">Section E: Verification Documents</span>
                        <h3 className="font-serif text-2xl md:text-3xl text-ink">Documents to be Uploaded / Attached</h3>
                        <p className="text-sm text-ink-soft mt-1">
                          Attach files now or choose "To be submitted later". Formats: PDF, DOC, DOCX, JPG, PNG (Max 15MB each).
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        {DOCUMENT_ITEMS.map((item) => {
                          const docState = formData.documents[item.key];
                          const inputId = `file-upload-${item.key}`;
                          return (
                            <div 
                              key={item.key} 
                              className="p-5 rounded-2xl bg-white border border-line-light flex flex-col gap-4 transition-all hover:border-brass-light"
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                  <h4 className="font-serif text-base text-ink font-semibold flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-brass-deep" />
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-ink-soft/70 mt-0.5">{item.hint}</p>
                                </div>

                                {/* Status Radio Selector Pills */}
                                <div className="flex items-center gap-1.5 self-start md:self-auto bg-ivory p-1 rounded-xl border border-line-light">
                                  <button
                                    type="button"
                                    onClick={() => setDocStatus(item.key, 'attached')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                      docState.status === 'attached'
                                        ? 'bg-brass-deep text-white shadow-sm'
                                        : 'text-ink-soft hover:text-ink'
                                    }`}
                                  >
                                    Attached
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDocStatus(item.key, 'later')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                      docState.status === 'later'
                                        ? 'bg-brass-deep text-white shadow-sm'
                                        : 'text-ink-soft hover:text-ink'
                                    }`}
                                  >
                                    Submit Later
                                  </button>
                                  {item.allowNA && (
                                    <button
                                      type="button"
                                      onClick={() => setDocStatus(item.key, 'na')}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        docState.status === 'na'
                                          ? 'bg-brass-deep text-white shadow-sm'
                                          : 'text-ink-soft hover:text-ink'
                                      }`}
                                    >
                                      Not Applicable
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Upload zone if "Attached" */}
                              {docState.status === 'attached' && (
                                <div className="mt-1">
                                  <input 
                                    id={inputId}
                                    type="file" 
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        setDocFile(item.key, e.target.files[0]);
                                      }
                                    }} 
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.xls,.xlsx"
                                    className="hidden" 
                                  />

                                  {docState.file ? (
                                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-brass/30">
                                      <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                          <Check className="w-5 h-5" />
                                        </div>
                                        <div className="overflow-hidden">
                                          <p className="text-xs md:text-sm font-semibold text-ink truncate">{docState.file.name}</p>
                                          <p className="text-[11px] text-ink-soft">{(docState.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 shrink-0">
                                        <label 
                                          htmlFor={inputId}
                                          className="text-xs text-brass-deep hover:underline cursor-pointer font-semibold px-2 py-1"
                                        >
                                          Replace
                                        </label>
                                        <button
                                          type="button"
                                          onClick={() => setDocFile(item.key, null)}
                                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                          aria-label="Remove file"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <label 
                                      htmlFor={inputId}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        e.preventDefault();
                                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                          setDocFile(item.key, e.dataTransfer.files[0]);
                                        }
                                      }}
                                      className="border-2 border-dashed border-line rounded-xl p-4 flex items-center justify-center gap-3 bg-ivory/50 hover:bg-ivory hover:border-brass transition-all cursor-pointer group"
                                    >
                                      <UploadCloud className="w-5 h-5 text-taupe group-hover:text-brass-deep transition-colors" />
                                      <span className="text-xs md:text-sm text-ink-soft">
                                        Click to browse or <strong className="font-semibold text-brass-deep">drop file here</strong>
                                      </span>
                                    </label>
                                  )}
                                </div>
                              )}

                              {docState.status === 'later' && (
                                <p className="text-xs text-taupe bg-ivory/60 px-3 py-2 rounded-lg italic">
                                  Will be requested by the procurement department during verification.
                                </p>
                              )}

                              {docState.status === 'na' && (
                                <p className="text-xs text-taupe bg-ivory/60 px-3 py-2 rounded-lg italic">
                                  Marked as not applicable for your enterprise category.
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: DECLARATION, REVIEW & SUBMIT */}
                  {step === 5 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-7 pb-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block mb-1">Section F: Declaration & Consent</span>
                        <h3 className="font-serif text-2xl md:text-3xl text-ink">Review & Submit Registration</h3>
                        <p className="text-sm text-ink-soft mt-1">
                          Review your entered information, agree to the declaration, and complete the security verification.
                        </p>
                      </div>

                      {/* Summary Card 1: Registration & Company */}
                      <div className="bg-white border border-line-light rounded-2xl p-5 relative">
                        <button 
                          type="button" 
                          onClick={() => { setStep(2); scrollToTop(); }} 
                          className="absolute top-5 right-5 text-brass-deep hover:text-brass flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-taupe mb-3 border-b border-line-light pb-2">
                          Applicant & Company
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                          <div>
                            <span className="block text-[10px] text-ink-soft/70 uppercase">Registration Type</span>
                            <span className="font-semibold text-ink">
                              {formData.registrationType === 'Other' ? `Other: ${formData.registrationTypeOther}` : formData.registrationType}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-ink-soft/70 uppercase">Contact Person</span>
                            <span className="font-semibold text-ink">{formData.contactPerson}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-ink-soft/70 uppercase">Company Name</span>
                            <span className="font-semibold text-ink">{formData.companyName}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-ink-soft/70 uppercase">Phone & Email</span>
                            <span className="font-semibold text-ink">+91 {formData.mobile} • {formData.email}</span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="block text-[10px] text-ink-soft/70 uppercase">Office Address</span>
                            <span className="font-medium text-ink">{formData.address}</span>
                          </div>
                          {formData.website && (
                            <div className="sm:col-span-2">
                              <span className="block text-[10px] text-ink-soft/70 uppercase">Website</span>
                              <span className="font-medium text-brass-deep">{formData.website}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Summary Card 2: Scope & Operations */}
                      <div className="bg-white border border-line-light rounded-2xl p-5 relative">
                        <button 
                          type="button" 
                          onClick={() => { setStep(3); scrollToTop(); }} 
                          className="absolute top-5 right-5 text-brass-deep hover:text-brass flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-taupe mb-3 border-b border-line-light pb-2">
                          Profile & Scope
                        </h4>
                        <div className="flex flex-col gap-3 text-sm">
                          <div>
                            <span className="block text-[10px] text-ink-soft/70 uppercase mb-1">Categories Selected</span>
                            <div className="flex flex-wrap gap-1.5">
                              {formData.categories.map(c => (
                                <span key={c} className="px-2.5 py-1 bg-brass/10 text-brass-deep rounded-md text-xs font-medium">
                                  {c === 'Other' && formData.categoryOther ? `Other: ${formData.categoryOther}` : c}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div>
                              <span className="block text-[10px] text-ink-soft/70 uppercase">Business Experience</span>
                              <span className="font-semibold text-ink">{formData.experienceYears}</span>
                            </div>
                            <div>
                              <span className="block text-[10px] text-ink-soft/70 uppercase">Areas of Operation</span>
                              <span className="font-semibold text-ink">{formData.areasOfOperation.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Summary Card 3: Documents */}
                      <div className="bg-white border border-line-light rounded-2xl p-5 relative">
                        <button 
                          type="button" 
                          onClick={() => { setStep(4); scrollToTop(); }} 
                          className="absolute top-5 right-5 text-brass-deep hover:text-brass flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-taupe mb-3 border-b border-line-light pb-2">
                          Document Attachments
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                          {DOCUMENT_ITEMS.map((item) => {
                            const entry = formData.documents[item.key];
                            return (
                              <div key={item.key} className="flex items-center justify-between p-2 rounded-lg bg-ivory/60">
                                <span className="font-medium text-ink truncate max-w-[180px]">{item.title}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  entry.status === 'attached' && entry.file 
                                    ? 'bg-green-100 text-green-700' 
                                    : entry.status === 'later'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-paper text-taupe'
                                }`}>
                                  {entry.status === 'attached' && entry.file 
                                    ? 'Attached' 
                                    : entry.status === 'later'
                                    ? 'Submit Later'
                                    : 'N/A'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Official Declaration Text Box */}
                      <div className="p-5 rounded-2xl bg-ivory border border-brass/30 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-brass-deep font-bold text-xs uppercase tracking-wider">
                          <ShieldCheck className="w-4 h-4" />
                          Official Declaration
                        </div>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed italic">
                          "I confirm that the information provided in this form and the documents submitted are true and correct to the best of my knowledge. I authorise Agarwal Group to contact me regarding vendor registration, verification and potential business opportunities. I understand that registration does not guarantee empanelment, allocation of work or placement of purchase orders."
                        </p>
                      </div>

                      {/* Consent Checkbox */}
                      <label className="flex items-start gap-3.5 cursor-pointer group p-2">
                        <input 
                          type="checkbox" 
                          required 
                          name="agreedDeclaration" 
                          checked={formData.agreedDeclaration} 
                          onChange={handleInputChange} 
                          className="mt-1 accent-brass-deep w-4 h-4 rounded cursor-pointer" 
                        />
                        <span className="text-xs md:text-sm text-ink font-medium leading-relaxed group-hover:text-brass-deep transition-colors">
                          I agree to the above declaration and consent to be contacted by Agarwal Group for the purposes stated. *
                        </span>
                      </label>

                      {/* CAPTCHA Security Verification */}
                      <div className="p-5 rounded-2xl bg-white border border-line-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-1">
                            Security Verification (CAPTCHA) *
                          </label>
                          <p className="text-xs text-ink-soft">Please calculate the sum to verify you are a human applicant.</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="px-4 py-2 bg-ivory rounded-xl border border-line-light font-mono text-base font-bold text-ink select-none flex items-center gap-2">
                            <span>{captchaQ.a}</span>
                            <span>+</span>
                            <span>{captchaQ.b}</span>
                            <span>=</span>
                          </div>
                          <input 
                            type="text" 
                            value={captchaInput} 
                            onChange={(e) => {
                              setCaptchaInput(e.target.value);
                              setCaptchaError(false);
                            }} 
                            placeholder="?" 
                            maxLength={4}
                            className={`w-16 py-2 px-3 text-center rounded-xl bg-white border text-base font-bold outline-none transition-colors ${
                              captchaError ? 'border-red-400 focus:border-red-500 text-red-600' : 'border-line-light focus:border-brass text-ink'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={generateCaptcha}
                            className="p-2 rounded-xl border border-line-light hover:bg-ivory text-ink-soft hover:text-brass-deep transition-colors cursor-pointer"
                            title="Refresh CAPTCHA"
                            aria-label="Refresh CAPTCHA"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Hidden submit button triggered by footer */}
                  <button type="submit" id="supplierSubmitBtn" className="hidden" />
                </form>
              </div>

              {/* Footer Actions */}
              <div className="px-6 md:px-10 py-5 bg-white border-t border-line-light flex items-center justify-between shrink-0">
                {step > 1 ? (
                  <button 
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest text-ink hover:bg-paper transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button 
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 rounded-full bg-brass-deep text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#b59254] transition-colors shadow-md shadow-brass-deep/20 cursor-pointer"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={(e) => {
                      const form = document.getElementById('supplierRegistrationForm') as HTMLFormElement;
                      if (form) {
                        handleFinalSubmit(e);
                      }
                    }}
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-full bg-pine text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-pine-deep transition-colors shadow-lg flex items-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS STATE */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 mb-6 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-green-400/20 animate-ping opacity-25" />
                <Check className="w-10 h-10 md:w-12 md:h-12 relative z-10" strokeWidth={3} />
              </div>
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-brass-deep mb-2 block">
                Agarwal Group • Luxury • Leisure • Lifestyle
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-3">Registration Submitted Successfully</h2>
              <p className="text-ink-soft text-sm md:text-base max-w-lg mb-8 leading-relaxed">
                Thank you for registering with Agarwal Group. Your application has been recorded. Our procurement and vendor management team will review your details and reach out when relevant opportunities arise.
              </p>
              <button 
                type="button"
                onClick={() => {
                  setFormData(initialFormData);
                  setStep(1);
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-10 py-3.5 rounded-full bg-brass-deep text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#b59254] transition-colors shadow-lg cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
