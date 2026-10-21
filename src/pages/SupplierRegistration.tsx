import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Briefcase, Package, Users, Sparkles, Building2, MapPin, 
  Phone, Mail, User, ShieldCheck, UploadCloud, FileText, Trash2, Check, 
  RefreshCw, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/gallery-exterior.webp';

export type RegistrationTypeKey = 
  | 'Supplier / Manufacturer / Dealer'
  | 'Contractor / Subcontractor'
  | 'Service Provider / Consultant'
  | 'Other';

export interface DocumentEntry {
  status: 'attached' | 'later' | 'na';
  file: File | null;
}

export interface SupplierFormValues {
  registrationType: RegistrationTypeKey | '';
  registrationTypeOther: string;

  contactPerson: string;
  companyName: string;
  mobile: string;
  email: string;
  address: string;
  website: string;

  categories: string[];
  categoryOther: string;
  experienceYears: string;
  areasOfOperation: string[];
  majorProjects: string;
  additionalInfo: string;

  documents: {
    companyProfile: DocumentEntry;
    catalogue: DocumentEntry;
    rateList: DocumentEntry;
    portfolio: DocumentEntry;
    licences: DocumentEntry;
    otherDocs: DocumentEntry;
  };

  termsAccepted: boolean;
}

const initialFormValues: SupplierFormValues = {
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

  termsAccepted: false,
};

const REGISTRATION_TYPES: { id: RegistrationTypeKey; title: string; desc: string; icon: React.ElementType }[] = [
  {
    id: 'Supplier / Manufacturer / Dealer',
    title: 'Supplier / Manufacturer / Dealer',
    desc: 'Supply of raw materials, manufactured items, hardware, tools, fixtures & building supplies.',
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
    desc: 'Architecture, engineering, site testing, safety, security, landscaping & specialized consultancy.',
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
  key: keyof SupplierFormValues['documents'];
  title: string;
  hint: string;
  allowNA: boolean;
}

const DOCUMENT_ITEMS: DocumentMeta[] = [
  {
    key: 'companyProfile',
    title: 'Company Profile / Introduction',
    hint: 'Overview of business, organizational credentials & leadership background.',
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
    hint: 'Past projects delivered, completion certificates or major client work orders.',
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

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <span className="text-[10px] text-rose-500 font-bold mt-1 tracking-wide block">{message}</span>;
};

export default function SupplierRegistration() {
  const [formValues, setFormValues] = useState<SupplierFormValues>(initialFormValues);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // CAPTCHA State
  const [captchaQ, setCaptchaQ] = useState({ a: 7, b: 6 });
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
    window.scrollTo(0, 0);
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const toggleCategory = (cat: string) => {
    setFormValues(prev => {
      const exists = prev.categories.includes(cat);
      const categories = exists 
        ? prev.categories.filter(c => c !== cat) 
        : [...prev.categories, cat];
      return { ...prev, categories };
    });

    if (errors.categories) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.categories;
        return next;
      });
    }
  };

  const toggleArea = (area: string) => {
    setFormValues(prev => {
      const exists = prev.areasOfOperation.includes(area);
      const areasOfOperation = exists 
        ? prev.areasOfOperation.filter(a => a !== area) 
        : [...prev.areasOfOperation, area];
      return { ...prev, areasOfOperation };
    });

    if (errors.areasOfOperation) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.areasOfOperation;
        return next;
      });
    }
  };

  const setDocStatus = (key: keyof SupplierFormValues['documents'], status: 'attached' | 'later' | 'na') => {
    setFormValues(prev => ({
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

    if (errors[`doc_${key}`]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[`doc_${key}`];
        return next;
      });
    }
  };

  const setDocFile = (key: keyof SupplierFormValues['documents'], file: File | null) => {
    setFormValues(prev => ({
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

    if (errors[`doc_${key}`]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[`doc_${key}`];
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formValues.registrationType) {
      errs.registrationType = 'Please select a registration type.';
    }
    if (formValues.registrationType === 'Other' && !formValues.registrationTypeOther.trim()) {
      errs.registrationTypeOther = 'Please specify your registration type.';
    }

    if (!formValues.contactPerson.trim()) {
      errs.contactPerson = 'Contact person name is required.';
    }
    if (!formValues.companyName.trim()) {
      errs.companyName = 'Company / Firm name is required.';
    }
    if (!formValues.mobile.trim() || formValues.mobile.replace(/\D/g, '').length !== 10) {
      errs.mobile = 'Valid 10-digit mobile number is required.';
    }
    if (!formValues.email.trim() || !/^\S+@\S+\.\S+$/.test(formValues.email)) {
      errs.email = 'Valid email address is required.';
    }
    if (!formValues.address.trim()) {
      errs.address = 'Registered office / business address is required.';
    }

    if (formValues.categories.length === 0) {
      errs.categories = 'Please select at least one product or service category.';
    }
    if (formValues.categories.includes('Other') && !formValues.categoryOther.trim()) {
      errs.categoryOther = 'Please specify your other product/service category.';
    }

    if (!formValues.experienceYears) {
      errs.experienceYears = 'Please select your years of business experience.';
    }
    if (formValues.areasOfOperation.length === 0) {
      errs.areasOfOperation = 'Please select at least one area of operation.';
    }

    // Documents check: if status is 'attached', require file
    for (const item of DOCUMENT_ITEMS) {
      const entry = formValues.documents[item.key];
      if (entry.status === 'attached' && !entry.file) {
        errs[`doc_${item.key}`] = `Please attach file for "${item.title}" or select "Submit Later".`;
      }
    }

    if (!formValues.termsAccepted) {
      errs.termsAccepted = 'You must confirm the declaration to submit your registration.';
    }

    if (parseInt(captchaInput.trim(), 10) !== captchaQ.a + captchaQ.b) {
      errs.captcha = 'Incorrect verification calculation answer.';
      setCaptchaError(true);
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstErrorEl = document.querySelector('.text-rose-500');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const getInputStyle = (error?: boolean) => {
    return `border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brass text-ink font-medium transition-colors ${
      error ? 'border-rose-500 bg-rose-50/30' : 'border-line bg-ivory/20 focus:bg-white'
    }`;
  };

  return (
    <div className="bg-ivory text-ink min-h-screen">
      {/* Page Hero */}
      <section className="relative h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Supplier & Contractor Registration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/30 to-pine/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory flex justify-center">
          <div className="max-w-2xl w-full text-center flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brass-bright mb-2 block">
              Agarwal Group • Luxury • Leisure • Lifestyle
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight mb-2">
              Supplier &amp; Contractor <span className="italic font-serif text-brass-bright font-normal">Registration</span>
            </h1>
            <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
              Become a registered business associate of Agarwal Group. Complete the form and attach requested company documents.
            </p>
          </div>
        </div>
      </section>

      {/* Main Single Form Container */}
      <section className="py-16 md:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {!formSubmitted ? (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-line rounded-3xl p-6 sm:p-10 shadow-2xl"
            >
              {/* Form Header */}
              <div className="pb-6 border-b border-line mb-8">
                <span className="text-[10px] tracking-widest uppercase font-bold text-brass-deep">
                  Vendor Empanelment Application
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-light mt-1">
                  Business Registration Form
                </h2>
                <p className="text-[11px] text-taupe mt-1.5 leading-relaxed font-light">
                  Fields marked with an asterisk (<span className="text-rose-500 font-bold">*</span>) are mandatory. 
                  Documents can be uploaded now or submitted later for verification where applicable.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                
                {/* 1. REGISTRATION TYPE */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <Briefcase className="w-4 h-4" /> Registration Type *
                  </div>
                  <p className="text-xs text-ink-soft/80">Select the commercial category that describes your enterprise:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {REGISTRATION_TYPES.map((t) => {
                      const isSelected = formValues.registrationType === t.id;
                      const Icon = t.icon;
                      return (
                        <div
                          key={t.id}
                          onClick={() => {
                            setFormValues(prev => ({ ...prev, registrationType: t.id }));
                            if (errors.registrationType) {
                              setErrors(prev => {
                                const next = { ...prev };
                                delete next.registrationType;
                                return next;
                              });
                            }
                          }}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-brass-deep bg-ivory/60 shadow-sm ring-1 ring-brass/30'
                              : 'border-line/70 hover:border-brass-light hover:bg-ivory/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-brass-deep text-white' : 'bg-paper text-ink-soft border border-line/60'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-serif text-base text-ink font-semibold">{t.title}</h4>
                              <p className="text-[11px] text-ink-soft leading-relaxed mt-0.5">{t.desc}</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-2.5 border-t border-line/40 flex items-center justify-between">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-brass-deep' : 'text-taupe'}`}>
                              {isSelected ? '✓ Selected' : 'Click to select'}
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-brass-deep bg-brass-deep text-white' : 'border-line'}`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <ErrorMessage message={errors.registrationType} />

                  {formValues.registrationType === 'Other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 rounded-xl bg-ivory/40 border border-line flex flex-col gap-1"
                    >
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">
                        Please Specify Registration Type *
                      </label>
                      <input
                        type="text"
                        name="registrationTypeOther"
                        value={formValues.registrationTypeOther}
                        onChange={handleInputChange}
                        placeholder="e.g. Scaffolding, Heavy Machinery Rental, etc."
                        className={getInputStyle(!!errors.registrationTypeOther)}
                      />
                      <ErrorMessage message={errors.registrationTypeOther} />
                    </motion.div>
                  )}
                </div>

                {/* 2. APPLICANT DETAILS */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <User className="w-4 h-4" /> Applicant &amp; Entity Information
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Contact Person */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe flex items-center gap-1">
                        <User className="w-3 h-3 text-brass-deep" /> Contact Person Name *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formValues.contactPerson}
                        onChange={handleInputChange}
                        placeholder="Full name of representative"
                        className={getInputStyle(!!errors.contactPerson)}
                      />
                      <ErrorMessage message={errors.contactPerson} />
                    </div>

                    {/* Company / Firm Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-brass-deep" /> Company / Firm Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formValues.companyName}
                        onChange={handleInputChange}
                        placeholder="Full registered enterprise name"
                        className={getInputStyle(!!errors.companyName)}
                      />
                      <ErrorMessage message={errors.companyName} />
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe flex items-center gap-1">
                        <Phone className="w-3 h-3 text-brass-deep" /> Mobile Number *
                      </label>
                      <div className={`flex border rounded-xl overflow-hidden focus-within:border-brass ${errors.mobile ? 'border-rose-500 bg-rose-50/30' : 'border-line bg-ivory/20'}`}>
                        <span className="bg-ivory border-r border-line text-[10px] font-bold text-taupe flex items-center px-4">+91</span>
                        <input
                          type="tel"
                          name="mobile"
                          value={formValues.mobile}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            handleInputChange(e);
                          }}
                          placeholder="10-digit mobile number"
                          className="px-4 py-3 text-xs focus:outline-none w-full text-ink font-medium bg-transparent"
                        />
                      </div>
                      <ErrorMessage message={errors.mobile} />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe flex items-center gap-1">
                        <Mail className="w-3 h-3 text-brass-deep" /> Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="contact@company.com"
                        className={getInputStyle(!!errors.email)}
                      />
                      <ErrorMessage message={errors.email} />
                    </div>

                    {/* Registered Address */}
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brass-deep" /> Registered Office / Business Address *
                      </label>
                      <textarea
                        name="address"
                        rows={3}
                        value={formValues.address}
                        onChange={handleInputChange}
                        placeholder="Complete office address, Unit/Plot No., Street, City, State, PIN code"
                        className={`${getInputStyle(!!errors.address)} resize-none`}
                      />
                      <ErrorMessage message={errors.address} />
                    </div>

                    {/* Company Website */}
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe flex items-center gap-1">
                        <Globe className="w-3 h-3 text-brass-deep" /> Company Website <span className="normal-case font-normal text-ink-soft/70">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formValues.website}
                        onChange={handleInputChange}
                        placeholder="https://www.yourcompany.com"
                        className={getInputStyle(false)}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. PRODUCT / SERVICE CATEGORIES & EXPERIENCE */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <Package className="w-4 h-4" /> Scope, Categories &amp; Operational Presence
                  </div>

                  {/* Main Categories Multi-select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">
                      Main Product / Service Category * <span className="normal-case font-normal text-ink-soft/70">(Select all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {PRODUCT_SERVICE_CATEGORIES.map(cat => {
                        const isSelected = formValues.categories.includes(cat);
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all border cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-brass-deep text-white border-brass-deep shadow-sm'
                                : 'bg-white border-line text-ink hover:border-brass hover:text-brass-deep'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                    <ErrorMessage message={errors.categories} />

                    {formValues.categories.includes('Other') && (
                      <div className="mt-2">
                        <input
                          type="text"
                          name="categoryOther"
                          value={formValues.categoryOther}
                          onChange={handleInputChange}
                          placeholder="Please specify other category *"
                          className={getInputStyle(!!errors.categoryOther)}
                        />
                        <ErrorMessage message={errors.categoryOther} />
                      </div>
                    )}
                  </div>

                  {/* Years of Experience */}
                  <div className="flex flex-col gap-2 pt-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">
                      Years of Business Experience *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {EXPERIENCE_OPTIONS.map(exp => {
                        const isSelected = formValues.experienceYears === exp;
                        return (
                          <button
                            type="button"
                            key={exp}
                            onClick={() => {
                              setFormValues(prev => ({ ...prev, experienceYears: exp }));
                              if (errors.experienceYears) {
                                setErrors(prev => {
                                  const next = { ...prev };
                                  delete next.experienceYears;
                                  return next;
                                });
                              }
                            }}
                            className={`py-3 px-3 rounded-xl text-center text-xs font-semibold transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-brass/20 text-brass-deep border-brass-deep font-bold ring-1 ring-brass/30'
                                : 'bg-white border-line text-ink hover:border-brass-light'
                            }`}
                          >
                            {exp}
                          </button>
                        );
                      })}
                    </div>
                    <ErrorMessage message={errors.experienceYears} />
                  </div>

                  {/* Areas of Operation */}
                  <div className="flex flex-col gap-2 pt-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">
                      Areas of Operation * <span className="normal-case font-normal text-ink-soft/70">(Select all that apply)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {AREAS_OF_OPERATION.map(area => {
                        const isSelected = formValues.areasOfOperation.includes(area);
                        return (
                          <button
                            type="button"
                            key={area}
                            onClick={() => toggleArea(area)}
                            className={`p-3 rounded-xl text-left text-xs font-semibold transition-all border cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-brass/10 text-brass-deep border-brass-deep'
                                : 'bg-white border-line text-ink hover:border-brass-light'
                            }`}
                          >
                            <span>{area}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-brass-deep border-brass-deep text-white' : 'border-line bg-paper'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <ErrorMessage message={errors.areasOfOperation} />
                  </div>

                  {/* Major Projects */}
                  <div className="flex flex-col gap-1 pt-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">
                      Major Projects / Clients Served
                    </label>
                    <textarea
                      name="majorProjects"
                      rows={3}
                      value={formValues.majorProjects}
                      onChange={handleInputChange}
                      placeholder="List key real estate developers, commercial clients, prominent projects, or landmarks delivered..."
                      className={`${getInputStyle(false)} resize-none`}
                    />
                  </div>

                  {/* Additional Business Information */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-taupe">
                      Additional Business Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      rows={3}
                      value={formValues.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Brands dealt with, manufacturing/supply capacity, dedicated manpower, certifications (ISO, etc.) or specialisations..."
                      className={`${getInputStyle(false)} resize-none`}
                    />
                  </div>
                </div>

                {/* 4. DOCUMENTS TO BE UPLOADED / ATTACHED */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <UploadCloud className="w-4 h-4" /> Documents to be Uploaded / Attached
                  </div>
                  <p className="text-xs text-ink-soft/80">
                    Attach relevant company files or choose "Submit Later". Formats: PDF, DOC, DOCX, JPG, PNG (Max 15MB each).
                  </p>

                  <div className="flex flex-col gap-3.5">
                    {DOCUMENT_ITEMS.map((item) => {
                      const docState = formValues.documents[item.key];
                      const inputId = `file-${item.key}`;
                      const hasDocError = !!errors[`doc_${item.key}`];

                      return (
                        <div
                          key={item.key}
                          className={`p-4 rounded-2xl border transition-all ${
                            hasDocError ? 'border-rose-400 bg-rose-50/20' : 'border-line/70 bg-white hover:border-brass-light'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <h4 className="font-serif text-sm text-ink font-semibold flex items-center gap-2">
                                <FileText className="w-4 h-4 text-brass-deep" />
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-ink-soft/70 mt-0.5">{item.hint}</p>
                            </div>

                            {/* Status toggles */}
                            <div className="flex items-center gap-1 bg-ivory/60 p-1 rounded-xl border border-line self-start sm:self-auto shrink-0">
                              <button
                                type="button"
                                onClick={() => setDocStatus(item.key, 'attached')}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
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
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
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
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                    docState.status === 'na'
                                      ? 'bg-brass-deep text-white shadow-sm'
                                      : 'text-ink-soft hover:text-ink'
                                  }`}
                                >
                                  N/A
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Upload zone if 'attached' */}
                          {docState.status === 'attached' && (
                            <div className="mt-3">
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
                                <div className="flex items-center justify-between p-3 rounded-xl bg-ivory/70 border border-brass/30">
                                  <div className="flex items-center gap-2.5 overflow-hidden">
                                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                      <Check className="w-4 h-4" />
                                    </div>
                                    <div className="overflow-hidden">
                                      <p className="text-xs font-semibold text-ink truncate">{docState.file.name}</p>
                                      <p className="text-[10px] text-ink-soft">{(docState.file.size / 1024 / 1024).toFixed(2)} MB</p>
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
                                      className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
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
                                  className={`border-2 border-dashed rounded-xl p-3.5 flex items-center justify-center gap-2.5 bg-ivory/30 hover:bg-ivory/60 hover:border-brass transition-all cursor-pointer group ${
                                    hasDocError ? 'border-rose-400 bg-rose-50/20' : 'border-line'
                                  }`}
                                >
                                  <UploadCloud className="w-4 h-4 text-taupe group-hover:text-brass-deep transition-colors" />
                                  <span className="text-xs text-ink-soft">
                                    Click to browse or <strong className="font-semibold text-brass-deep">drop file here</strong>
                                  </span>
                                </label>
                              )}
                            </div>
                          )}

                          {docState.status === 'later' && (
                            <p className="text-[11px] text-taupe bg-ivory/40 px-3 py-1.5 rounded-lg italic mt-2">
                              File will be requested by the procurement department during technical review.
                            </p>
                          )}

                          {docState.status === 'na' && (
                            <p className="text-[11px] text-taupe bg-ivory/40 px-3 py-1.5 rounded-lg italic mt-2">
                              Marked as not applicable for this empanelment category.
                            </p>
                          )}

                          <ErrorMessage message={errors[`doc_${item.key}`]} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. DECLARATION & CAPTCHA */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-2 border-b border-line/40">
                    <ShieldCheck className="w-4 h-4" /> Declaration, Consent &amp; Verification
                  </div>

                  {/* Declaration Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-ivory/80 border border-brass/30 flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brass-deep flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Official Declaration
                    </span>
                    <p className="text-xs text-ink-soft leading-relaxed italic">
                      "I confirm that the information provided in this form and the documents submitted are true and correct to the best of my knowledge. I authorise Agarwal Group to contact me regarding vendor registration, verification and potential business opportunities. I understand that registration does not guarantee empanelment, allocation of work or placement of purchase orders."
                    </p>
                  </div>

                  {/* Checkbox */}
                  <div className="flex flex-col gap-1">
                    <label className="flex items-start gap-2.5 text-xs text-taupe font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formValues.termsAccepted}
                        onChange={handleInputChange}
                        className="accent-brass text-brass focus:ring-brass mt-0.5 cursor-pointer"
                        style={{ accentColor: 'var(--brass-deep)' }}
                      />
                      <span className="text-xs text-ink font-medium leading-relaxed">
                        I agree to the above declaration and consent to be contacted by Agarwal Group for the purposes stated. *
                      </span>
                    </label>
                    <ErrorMessage message={errors.termsAccepted} />
                  </div>

                  {/* CAPTCHA Widget */}
                  <div className="p-4 rounded-2xl bg-ivory/30 border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase font-bold text-taupe block mb-0.5">
                        Security Verification (CAPTCHA) *
                      </label>
                      <p className="text-[11px] text-ink-soft">Solve the calculation to confirm you are human.</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="px-3.5 py-2 bg-white rounded-xl border border-line font-mono text-sm font-bold text-ink select-none flex items-center gap-1.5">
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
                          if (errors.captcha) {
                            setErrors(prev => {
                              const next = { ...prev };
                              delete next.captcha;
                              return next;
                            });
                          }
                        }}
                        placeholder="?"
                        maxLength={4}
                        className={`w-14 py-2 text-center rounded-xl bg-white border text-sm font-bold outline-none transition-colors ${
                          captchaError || errors.captcha ? 'border-rose-500 text-rose-600' : 'border-line focus:border-brass text-ink'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-2 rounded-xl border border-line hover:bg-white text-ink-soft hover:text-brass-deep transition-colors cursor-pointer"
                        title="Refresh CAPTCHA"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <ErrorMessage message={errors.captcha} />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="pcta-btn btn-enquire"
                    style={{ width: '100%' }}
                  >
                    <span>
                      {isSubmitting ? 'Submitting Registration...' : 'Submit Registration Details'}
                    </span>
                    <span className="arr">→</span>
                  </button>
                </div>

              </form>
            </motion.div>
          ) : (
            /* Confirmation Screen (similar to CustomerRegistration.tsx) */
            <motion.div
              key="success-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-line rounded-3xl p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center justify-center py-20 gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-2 animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brass-deep block">
                Agarwal Group • Procurement &amp; Contracts
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
                Registration Submitted Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft max-w-md leading-relaxed font-light">
                Thank you for submitting your enterprise profile. Your application has been recorded in our vendor database. Our procurement team will review your credentials and contact you when relevant opportunities arise.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <Link
                  to="/"
                  className="px-6 py-3 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-widest hover:bg-brass-deep transition-colors"
                >
                  Return to Home
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setFormValues(initialFormValues);
                    setFormSubmitted(false);
                    generateCaptcha();
                  }}
                  className="px-6 py-3 rounded-full border border-line text-ink text-xs font-bold uppercase tracking-widest hover:bg-ivory transition-colors cursor-pointer"
                >
                  Submit Another Response
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
