import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Briefcase, Package, Check, ChevronLeft, ChevronRight, UploadCloud, FileText, Plus, Trash2, Edit2
} from 'lucide-react';

interface ProjectExperience {
  id: string;
  name: string;
  client: string;
  location: string;
  scope: string;
  year: string;
}

interface FormData {
  companyName: string;
  businessType: string;
  establishedYear: string;
  website: string;
  email: string;
  mobile: string;
  altContact: string;
  workCategories: string[];
  specializedWork: string;
  experienceYears: string;
  projects: ProjectExperience[];
  materialCategories: string[];
  productsSupplied: string;
  brands: string;
  portfolioFile: File | null;
  catalogFile: File | null;
  additionalFiles: File[];
  agreedAccuracy: boolean;
  agreedContact: boolean;
}

const initialFormData: FormData = {
  companyName: '', businessType: '', establishedYear: '', website: '', email: '', mobile: '', altContact: '',
  workCategories: [], specializedWork: '', experienceYears: '', projects: [],
  materialCategories: [], productsSupplied: '', brands: '',
  portfolioFile: null, catalogFile: null, additionalFiles: [],
  agreedAccuracy: false, agreedContact: false
};

const WORK_CATEGORIES = ['Civil', 'Electrical', 'Plumbing', 'HVAC', 'Fire Fighting', 'Waterproofing', 'Painting', 'Flooring', 'Fabrication', 'Interior', 'Landscaping', 'Other'];
const MATERIAL_CATEGORIES = ['Cement', 'Steel', 'Tiles', 'Plumbing Material', 'Electrical Material', 'Hardware', 'Paint', 'Sanitary', 'Doors & Windows', 'Building Material', 'Other'];

export default function SupplierRegistrationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [registrationType, setRegistrationType] = useState<'contractor' | 'supplier' | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Refs for auto-scrolling
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
    // Basic validation depending on step could go here
    if (step === 1 && !registrationType) return;
    
    // For step 2 (Form validation handled natively by browser if form submits)
    setStep(prev => prev + 1);
    scrollToTop();
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
    scrollToTop();
  };

  const handleTypeSelect = (type: 'contractor' | 'supplier') => {
    setRegistrationType(type);
    // Clear dynamic arrays when switching type
    setFormData(prev => ({
      ...prev,
      workCategories: [],
      projects: [],
      materialCategories: []
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      handleNext();
    } else {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  // Generic input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Toggle Category
  const toggleCategory = (category: string, field: 'workCategories' | 'materialCategories') => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(category)) {
        return { ...prev, [field]: current.filter(c => c !== category) };
      } else {
        return { ...prev, [field]: [...current, category] };
      }
    });
  };

  // Projects logic
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Math.random().toString(36).substr(2, 9), name: '', client: '', location: '', scope: '', year: '' }]
    }));
  };

  const removeProject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const updateProject = (id: string, field: keyof ProjectExperience, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  // File Upload Logic
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>, type: 'portfolio' | 'catalog' | 'additional') => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files, type);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'portfolio' | 'catalog' | 'additional') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files, type);
    }
  };

  const handleFiles = (files: File[], type: 'portfolio' | 'catalog' | 'additional') => {
    if (files.length === 0) return;
    
    if (type === 'portfolio') {
      setFormData(prev => ({ ...prev, portfolioFile: files[0] }));
    } else if (type === 'catalog') {
      setFormData(prev => ({ ...prev, catalogFile: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, additionalFiles: [...prev.additionalFiles, ...files] }));
    }
  };

  // Steps Configuration
  const steps = [
    { num: 1, title: 'Registration', icon: Briefcase },
    { num: 2, title: 'Company', icon: FileText },
    { num: 3, title: 'Details', icon: Package },
    { num: 4, title: 'Documents', icon: UploadCloud },
    { num: 5, title: 'Submit', icon: Check }
  ];

  const renderStepProgress = () => (
    <div className="bg-paper border-b border-line-light overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sticky top-0 z-20">
      <div className="flex px-4 md:px-8 py-4 min-w-[500px]">
        {steps.map((s, idx) => (
          <div key={s.num} className={`flex-1 flex items-center ${idx !== steps.length - 1 ? 'pr-2' : ''}`}>
            <div className="flex flex-col gap-1 relative z-10 bg-paper">
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${step >= s.num ? 'text-brass-deep' : 'text-taupe'}`}>
                {String(s.num).padStart(2, '0')}
              </span>
              <span className={`text-xs md:text-sm font-semibold transition-colors ${step >= s.num ? 'text-ink' : 'text-ink-soft/50'}`}>
                {s.title}
              </span>
            </div>
            {idx !== steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 relative top-1">
                <div className="absolute inset-0 bg-line-light rounded" />
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-brass transition-all duration-500 ease-out rounded"
                  style={{ width: step > s.num ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        ))}
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
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full h-full md:h-[85vh] max-w-4xl bg-ivory rounded-none md:rounded-[32px] shadow-2xl flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="px-6 md:px-10 py-5 flex items-center justify-between bg-white border-b border-line-light shrink-0">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-ink">Supplier & Contractor Registration</h2>
              <p className="text-xs md:text-sm text-ink-soft mt-1">Register your company with us to explore opportunities.</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-ink-soft hover:text-ink hover:bg-line-light transition-colors self-start md:self-center shrink-0 ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            <>
              {renderStepProgress()}

              {/* Form Body */}
              <div ref={bodyRef} className="flex-1 overflow-y-auto bg-paper p-6 md:p-8 relative [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-full">
                <form id="supplierForm" onSubmit={handleFormSubmit} className="max-w-3xl mx-auto w-full">
                  
                  {/* STEP 1: TYPE */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
                      <h3 className="font-serif text-2xl text-ink mb-1">Select Registration Type</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div 
                          onClick={() => handleTypeSelect('contractor')}
                          className={`cursor-pointer p-6 md:p-7 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full bg-white group ${registrationType === 'contractor' ? 'border-brass-deep shadow-lg scale-[1.02]' : 'border-line-light hover:border-brass-light hover:shadow-md'}`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 transition-colors ${registrationType === 'contractor' ? 'bg-brass/20 text-brass-deep' : 'bg-paper text-ink-soft group-hover:text-brass'}`}>
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <h4 className="font-serif text-2xl text-ink mb-2">Contractor</h4>
                          <p className="text-sm text-ink-soft font-light leading-relaxed">Construction, installation and specialized contracting services.</p>
                          <div className={`mt-auto pt-5 flex items-center gap-2 text-sm font-semibold transition-colors ${registrationType === 'contractor' ? 'text-brass-deep' : 'text-taupe'}`}>
                            {registrationType === 'contractor' ? 'Selected' : 'Select'} <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>

                        <div 
                          onClick={() => handleTypeSelect('supplier')}
                          className={`cursor-pointer p-6 md:p-7 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full bg-white group ${registrationType === 'supplier' ? 'border-brass-deep shadow-lg scale-[1.02]' : 'border-line-light hover:border-brass-light hover:shadow-md'}`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 transition-colors ${registrationType === 'supplier' ? 'bg-brass/20 text-brass-deep' : 'bg-paper text-ink-soft group-hover:text-brass'}`}>
                            <Package className="w-6 h-6" />
                          </div>
                          <h4 className="font-serif text-2xl text-ink mb-2">Supplier</h4>
                          <p className="text-sm text-ink-soft font-light leading-relaxed">Construction materials, products, equipment and building supplies.</p>
                          <div className={`mt-auto pt-5 flex items-center gap-2 text-sm font-semibold transition-colors ${registrationType === 'supplier' ? 'text-brass-deep' : 'text-taupe'}`}>
                            {registrationType === 'supplier' ? 'Selected' : 'Select'} <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: COMPANY INFO */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <h3 className="font-serif text-2xl text-ink mb-2">Company Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Company / Firm Name *</label>
                          <input required type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Enter company or firm name" className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors" />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Business Type *</label>
                          <select required name="businessType" value={formData.businessType} onChange={handleInputChange} className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors">
                            <option value="">Select Type</option>
                            <option value="Proprietorship">Proprietorship</option>
                            <option value="Partnership">Partnership</option>
                            <option value="LLP">LLP</option>
                            <option value="Private Limited">Private Limited</option>
                            <option value="Public Limited">Public Limited</option>
                            <option value="Individual / Freelancer">Individual / Freelancer</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Year of Establishment</label>
                          <input type="number" name="establishedYear" value={formData.establishedYear} onChange={handleInputChange} min="1800" max={new Date().getFullYear()} placeholder="YYYY" className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors" />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Website</label>
                          <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://example.com" className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors" />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Company Email *</label>
                          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="company@example.com" className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors" />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Mobile Number *</label>
                          <div className="flex bg-white border border-line-light rounded-xl overflow-hidden focus-within:border-brass transition-colors">
                            <span className="bg-paper px-4 py-3 border-r border-line-light text-ink-soft text-sm font-medium">+91</span>
                            <input required type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="00000 00000" maxLength={10} className="w-full px-4 py-3 outline-none bg-transparent" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Alternate Contact</label>
                          <div className="flex bg-white border border-line-light rounded-xl overflow-hidden focus-within:border-brass transition-colors">
                            <span className="bg-paper px-4 py-3 border-r border-line-light text-ink-soft text-sm font-medium">+91</span>
                            <input type="tel" name="altContact" value={formData.altContact} onChange={handleInputChange} placeholder="00000 00000" maxLength={10} className="w-full px-4 py-3 outline-none bg-transparent" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: DETAILS */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8">
                      <h3 className="font-serif text-2xl text-ink mb-2">
                        {registrationType === 'contractor' ? 'Work & Experience Details' : 'Material & Supply Details'}
                      </h3>

                      {registrationType === 'contractor' ? (
                        <>
                          {/* Contractor Details */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-3">Work Category * <span className="normal-case font-normal text-ink-soft/70">(Select multiple)</span></label>
                            <div className="flex flex-wrap gap-2.5">
                              {WORK_CATEGORIES.map(cat => {
                                const isSelected = formData.workCategories.includes(cat);
                                return (
                                  <button
                                    type="button"
                                    key={cat}
                                    onClick={() => toggleCategory(cat, 'workCategories')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${isSelected ? 'bg-brass-deep text-white border-brass-deep' : 'bg-white border-line-light text-ink-soft hover:border-brass-light hover:text-brass-deep'}`}
                                  >
                                    {cat}
                                  </button>
                                );
                              })}
                            </div>
                            {/* Hidden input to enforce required on categories if we wanted to native validate */}
                            {formData.workCategories.length === 0 && <input type="text" className="w-0 h-0 opacity-0 absolute pointer-events-none" required />}
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Specialized Work</label>
                            <textarea name="specializedWork" value={formData.specializedWork} onChange={handleInputChange} rows={3} placeholder="Describe your specialized work, capabilities and areas of expertise..." className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors resize-none"></textarea>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Number of Years of Experience</label>
                            <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleInputChange} min="0" placeholder="e.g. 10" className="w-full md:w-1/3 bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors" />
                          </div>

                          <div className="pt-4 border-t border-line-light">
                            <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-4">Previous Major Projects</label>
                            <div className="flex flex-col gap-6">
                              <AnimatePresence>
                                {formData.projects.map((proj, idx) => (
                                  <motion.div 
                                    key={proj.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-5 border border-line-light bg-white rounded-xl relative group"
                                  >
                                    <button type="button" onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-1 bg-red-50 hover:bg-red-100 rounded transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="text-sm font-serif font-bold text-ink mb-4 pb-2 border-b border-line-light w-max">Project {idx + 1}</div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                      <input type="text" required placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} className="w-full bg-paper border border-line-light rounded-lg px-3 py-2 outline-none focus:border-brass text-sm" />
                                      <input type="text" required placeholder="Client / Developer" value={proj.client} onChange={(e) => updateProject(proj.id, 'client', e.target.value)} className="w-full bg-paper border border-line-light rounded-lg px-3 py-2 outline-none focus:border-brass text-sm" />
                                      <input type="text" required placeholder="Location" value={proj.location} onChange={(e) => updateProject(proj.id, 'location', e.target.value)} className="w-full bg-paper border border-line-light rounded-lg px-3 py-2 outline-none focus:border-brass text-sm" />
                                      <input type="number" required placeholder="Completion Year" min="1900" max={new Date().getFullYear()+5} value={proj.year} onChange={(e) => updateProject(proj.id, 'year', e.target.value)} className="w-full bg-paper border border-line-light rounded-lg px-3 py-2 outline-none focus:border-brass text-sm" />
                                      <div className="md:col-span-2">
                                        <input type="text" required placeholder="Work Scope (e.g. Turnkey Civil Works)" value={proj.scope} onChange={(e) => updateProject(proj.id, 'scope', e.target.value)} className="w-full bg-paper border border-line-light rounded-lg px-3 py-2 outline-none focus:border-brass text-sm" />
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                              
                              <button type="button" onClick={addProject} className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-line-light rounded-xl text-taupe font-semibold text-sm hover:border-brass hover:text-brass-deep transition-colors bg-white hover:bg-ivory">
                                <Plus className="w-4 h-4" /> Add Another Project
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Supplier Details */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-3">Material Category * <span className="normal-case font-normal text-ink-soft/70">(Select multiple)</span></label>
                            <div className="flex flex-wrap gap-2.5">
                              {MATERIAL_CATEGORIES.map(cat => {
                                const isSelected = formData.materialCategories.includes(cat);
                                return (
                                  <button
                                    type="button"
                                    key={cat}
                                    onClick={() => toggleCategory(cat, 'materialCategories')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${isSelected ? 'bg-brass-deep text-white border-brass-deep' : 'bg-white border-line-light text-ink-soft hover:border-brass-light hover:text-brass-deep'}`}
                                  >
                                    {cat}
                                  </button>
                                );
                              })}
                            </div>
                            {formData.materialCategories.length === 0 && <input type="text" className="w-0 h-0 opacity-0 absolute pointer-events-none" required />}
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Products / Materials Supplied *</label>
                            <textarea required name="productsSupplied" value={formData.productsSupplied} onChange={handleInputChange} rows={4} placeholder="List the products and materials supplied by your company..." className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors resize-none"></textarea>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-2">Brands / Manufacturers</label>
                            <textarea name="brands" value={formData.brands} onChange={handleInputChange} rows={3} placeholder="Enter brands or manufacturers you deal with..." className="w-full bg-white border border-line-light rounded-xl px-4 py-3 outline-none focus:border-brass transition-colors resize-none"></textarea>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 4: DOCUMENTS */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                      <h3 className="font-serif text-2xl text-ink mb-2">Portfolio & Documents</h3>
                      <p className="text-sm text-ink-soft -mt-4 mb-4">Upload relevant documents to help us evaluate your capabilities.</p>

                      <div className="flex flex-col gap-6">
                        {/* Portfolio */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-1">Company Portfolio</label>
                          <p className="text-xs text-ink-soft/70 mb-3">Upload your company profile, completed projects or work portfolio. (Max 10MB)</p>
                          <div 
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleFileDrop(e, 'portfolio')}
                            className="border-2 border-dashed border-line rounded-2xl p-8 bg-white flex flex-col items-center justify-center text-center hover:border-brass transition-colors relative group"
                          >
                            <input type="file" onChange={(e) => handleFileInput(e, 'portfolio')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                            {formData.portfolioFile ? (
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><Check className="w-6 h-6" /></div>
                                <span className="text-sm font-semibold text-ink group-hover:text-brass-deep">{formData.portfolioFile.name}</span>
                                <span className="text-xs text-ink-soft">{(formData.portfolioFile.size / 1024 / 1024).toFixed(2)} MB</span>
                              </div>
                            ) : (
                              <>
                                <UploadCloud className="w-10 h-10 text-taupe mb-3 group-hover:text-brass-deep transition-colors" strokeWidth={1.5} />
                                <span className="text-sm font-semibold text-ink">Drag & Drop or <span className="text-brass">Browse</span></span>
                                <span className="text-xs text-ink-soft mt-1">Accepts PDF, JPG, PNG</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Catalog */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-1">Product Catalog</label>
                          <p className="text-xs text-ink-soft/70 mb-3">Upload your latest product catalogue, brochures or material specifications. (Max 20MB)</p>
                          <div 
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleFileDrop(e, 'catalog')}
                            className="border-2 border-dashed border-line rounded-2xl p-8 bg-white flex flex-col items-center justify-center text-center hover:border-brass transition-colors relative group"
                          >
                            <input type="file" onChange={(e) => handleFileInput(e, 'catalog')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                            {formData.catalogFile ? (
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><Check className="w-6 h-6" /></div>
                                <span className="text-sm font-semibold text-ink group-hover:text-brass-deep">{formData.catalogFile.name}</span>
                                <span className="text-xs text-ink-soft">{(formData.catalogFile.size / 1024 / 1024).toFixed(2)} MB</span>
                              </div>
                            ) : (
                              <>
                                <UploadCloud className="w-10 h-10 text-taupe mb-3 group-hover:text-brass-deep transition-colors" strokeWidth={1.5} />
                                <span className="text-sm font-semibold text-ink">Drag & Drop or <span className="text-brass">Browse</span></span>
                                <span className="text-xs text-ink-soft mt-1">Accepts PDF, JPG, PNG</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Additional */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-taupe mb-1">Additional Documents <span className="normal-case font-normal text-ink-soft/70">(Optional)</span></label>
                          <p className="text-xs text-ink-soft/70 mb-3">Certifications, Datasheets, etc.</p>
                          <div 
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleFileDrop(e, 'additional')}
                            className="border-2 border-dashed border-line rounded-2xl p-6 bg-white hover:border-brass transition-colors relative flex items-center group"
                          >
                            <input type="file" multiple onChange={(e) => handleFileInput(e, 'additional')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                            <div className="flex items-center gap-4 w-full">
                              <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center shrink-0 group-hover:bg-ivory"><Plus className="w-5 h-5 text-ink-soft group-hover:text-brass-deep" /></div>
                              <div className="flex-1 flex flex-col">
                                <span className="text-sm font-semibold text-ink group-hover:text-brass-deep transition-colors">Add Documents</span>
                                {formData.additionalFiles.length > 0 ? (
                                  <span className="text-xs text-brass-deep">{formData.additionalFiles.length} file(s) selected</span>
                                ) : (
                                  <span className="text-xs text-ink-soft">Drop files here</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: REVIEW */}
                  {step === 5 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8 pb-4">
                      <h3 className="font-serif text-2xl text-ink mb-2">Review & Submit</h3>

                      <div className="bg-white border border-line-light rounded-2xl p-6 relative">
                        <button type="button" onClick={() => {setStep(2); scrollToTop();}} className="absolute top-6 right-6 text-brass-deep hover:text-brass flex items-center gap-1 text-xs font-bold uppercase tracking-wider"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-taupe mb-4 border-b border-line-light pb-2">Company Information</h4>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                          <div><span className="block text-[10px] text-ink-soft/70 uppercase">Name</span> <span className="font-semibold text-ink">{formData.companyName}</span></div>
                          <div><span className="block text-[10px] text-ink-soft/70 uppercase">Type</span> <span className="font-semibold text-ink">{formData.businessType}</span></div>
                          <div><span className="block text-[10px] text-ink-soft/70 uppercase">Email</span> <span className="font-semibold text-ink">{formData.email}</span></div>
                          <div><span className="block text-[10px] text-ink-soft/70 uppercase">Phone</span> <span className="font-semibold text-ink">+91 {formData.mobile}</span></div>
                        </div>
                      </div>

                      <div className="bg-white border border-line-light rounded-2xl p-6 relative">
                        <button type="button" onClick={() => {setStep(3); scrollToTop();}} className="absolute top-6 right-6 text-brass-deep hover:text-brass flex items-center gap-1 text-xs font-bold uppercase tracking-wider"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-taupe mb-4 border-b border-line-light pb-2">Work / Material Details</h4>
                        <div className="text-sm">
                          <div className="mb-4">
                            <span className="block text-[10px] text-ink-soft/70 uppercase mb-1">Registration Type</span>
                            <span className="inline-block px-3 py-1 bg-paper text-ink font-semibold rounded text-xs uppercase tracking-wider">{registrationType}</span>
                          </div>
                          <div className="mb-4">
                            <span className="block text-[10px] text-ink-soft/70 uppercase mb-1">Categories</span>
                            <div className="flex flex-wrap gap-1.5">
                              {(registrationType === 'contractor' ? formData.workCategories : formData.materialCategories).map(c => (
                                <span key={c} className="px-2.5 py-1 bg-brass/10 text-brass-deep rounded text-xs">{c}</span>
                              ))}
                            </div>
                          </div>
                          {registrationType === 'contractor' && formData.projects.length > 0 && (
                            <div>
                              <span className="block text-[10px] text-ink-soft/70 uppercase mb-1">Projects Added</span>
                              <span className="font-semibold text-ink">{formData.projects.length} Major Projects</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-white border border-line-light rounded-2xl p-6 relative">
                        <button type="button" onClick={() => {setStep(4); scrollToTop();}} className="absolute top-6 right-6 text-brass-deep hover:text-brass flex items-center gap-1 text-xs font-bold uppercase tracking-wider"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-taupe mb-4 border-b border-line-light pb-2">Documents</h4>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-ink-soft" /> 
                            <span className="w-24 text-[10px] text-ink-soft/70 uppercase">Portfolio</span>
                            <span className="font-semibold text-ink truncate">{formData.portfolioFile?.name || 'Not provided'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-ink-soft" /> 
                            <span className="w-24 text-[10px] text-ink-soft/70 uppercase">Catalog</span>
                            <span className="font-semibold text-ink truncate">{formData.catalogFile?.name || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input type="checkbox" required name="agreedAccuracy" checked={formData.agreedAccuracy} onChange={handleInputChange} className="mt-1 accent-brass-deep w-4 h-4" />
                          <span className="text-sm text-ink-soft group-hover:text-ink transition-colors">I confirm that the information provided above is accurate and complete.</span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input type="checkbox" required name="agreedContact" checked={formData.agreedContact} onChange={handleInputChange} className="mt-1 accent-brass-deep w-4 h-4" />
                          <span className="text-sm text-ink-soft group-hover:text-ink transition-colors">I agree that the company may contact me regarding supplier / contractor opportunities.</span>
                        </label>
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
                    onClick={handleBack}
                    className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-ink hover:bg-paper transition-colors"
                  >
                    Back
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button 
                    onClick={() => {
                      if (step === 1 && !registrationType) {
                        alert("Please select a registration type to continue.");
                        return;
                      }
                      // Trigger form submit to run native validation
                      const form = document.getElementById('supplierForm') as HTMLFormElement;
                      if (form) {
                        if (form.checkValidity()) {
                          handleNext();
                        } else {
                          form.reportValidity();
                        }
                      }
                    }}
                    disabled={step === 1 && !registrationType}
                    className="px-8 py-3 rounded-full bg-brass-deep text-white text-sm font-bold uppercase tracking-widest hover:bg-[#b59254] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brass-deep/20"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      const form = document.getElementById('supplierForm') as HTMLFormElement;
                      if (form && form.checkValidity()) {
                        handleFormSubmit(new Event('submit') as unknown as React.FormEvent);
                      } else {
                        form.reportValidity();
                      }
                    }}
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-full bg-pine text-white text-sm font-bold uppercase tracking-widest hover:bg-pine-deep transition-colors shadow-lg flex items-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                    ) : 'Submit Registration'}
                  </button>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS STATE */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-10 text-center bg-white"
            >
              <div className="w-24 h-24 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 mb-8 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-green-400/20 animate-ping opacity-20" />
                <Check className="w-12 h-12 relative z-10" strokeWidth={3} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">Registration Submitted Successfully</h2>
              <p className="text-ink-soft text-base md:text-lg max-w-lg mb-10 leading-relaxed">
                Thank you for registering with Agarwal Group. Our procurement team will review your details and contact you if there is a relevant opportunity.
              </p>
              <button 
                onClick={onClose}
                className="px-10 py-4 rounded-full bg-brass-deep text-white text-sm font-bold uppercase tracking-widest hover:bg-[#b59254] transition-colors shadow-lg"
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
