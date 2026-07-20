import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, MapPin, IndianRupee, Clock, Users, ChevronRight, X, UploadCloud } from 'lucide-react';
import heroImage from '../assets/gallery-lobby.jpg';

const JOBS = [
  {
    "id": 1,
    "title": "Site Engineer",
    "department": "Construction",
    "location": "Mumbai, Maharashtra",
    "employmentType": "Full Time",
    "experience": "2-5 Years",
    "salary": "₹4.5 - ₹7.5 LPA",
    "vacancies": 2,
    "description": "We are looking for a Site Engineer to oversee day-to-day construction activities, coordinate with contractors, ensure quality standards, and monitor project progress.",
    "requirements": [
      "B.E./B.Tech in Civil Engineering",
      "Knowledge of AutoCAD and MS Project",
      "Strong communication and site coordination skills",
      "Experience in residential high-rise projects preferred"
    ]
  },
  {
    "id": 2,
    "title": "Sales Executive",
    "department": "Sales & Marketing",
    "location": "Navi Mumbai, Maharashtra",
    "employmentType": "Full Time",
    "experience": "1-4 Years",
    "salary": "₹3 - ₹6 LPA + Incentives",
    "vacancies": 4,
    "description": "Responsible for handling customer inquiries, site visits, property presentations, bookings, and achieving monthly sales targets.",
    "requirements": [
      "Graduate in any discipline",
      "Excellent communication and negotiation skills",
      "Experience in real estate sales preferred",
      "Ability to work on weekends and holidays"
    ]
  },
  {
    "id": 3,
    "title": "Quantity Surveyor",
    "department": "Project Management",
    "location": "Thane, Maharashtra",
    "employmentType": "Full Time",
    "experience": "3-6 Years",
    "salary": "₹6 - ₹9 LPA",
    "vacancies": 1,
    "description": "Prepare BOQs, estimate project costs, verify contractor bills, and manage project budgets while ensuring cost efficiency.",
    "requirements": [
      "B.E./B.Tech Civil or Diploma in Civil Engineering",
      "Knowledge of BOQ preparation and quantity estimation",
      "Experience with billing and tender documentation",
      "Strong analytical and Excel skills"
    ]
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedJob(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-ivory text-ink min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Careers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/40 to-pine/65" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full text-ivory flex flex-col items-center text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-2">
            Build Your <span className="italic font-serif text-brass-bright font-normal">Career</span> With Us
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
            Join a legacy of excellence. We are always looking for passionate individuals to grow with the Agarwal Group.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-deep pb-3 border-b border-line/40">
            <Briefcase className="w-4 h-4" /> Current Openings
          </div>

          <div className="flex flex-col gap-6">
            {JOBS.map((job) => (
              <div key={job.id} className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-ink mb-1">{job.title}</h3>
                    <div className="text-brass-deep text-xs uppercase tracking-wider font-semibold">{job.department}</div>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(job.id)}
                    className="bg-pine text-ivory px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-pine-deep transition-colors self-start sm:self-auto"
                  >
                    Apply Now
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-line/40">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase text-taupe font-semibold tracking-wider">
                      <MapPin className="w-3 h-3" /> Location
                    </div>
                    <span className="text-sm text-ink-soft font-medium">{job.location}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase text-taupe font-semibold tracking-wider">
                      <Clock className="w-3 h-3" /> Type
                    </div>
                    <span className="text-sm text-ink-soft font-medium">{job.employmentType}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase text-taupe font-semibold tracking-wider">
                      <IndianRupee className="w-3 h-3" /> Salary
                    </div>
                    <span className="text-sm text-ink-soft font-medium">{job.salary}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase text-taupe font-semibold tracking-wider">
                      <Users className="w-3 h-3" /> Vacancies
                    </div>
                    <span className="text-sm text-ink-soft font-medium">{job.vacancies} Openings</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-ink mb-1.5">Job Description</h4>
                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-light">{job.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink mb-2">Requirements</h4>
                    <ul className="list-none pl-0 space-y-2">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <ChevronRight className="w-4 h-4 text-brass-bright shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-ink-soft font-light">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-line/40 flex items-center justify-between mt-4">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brass-deep hover:text-pine transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <span className="text-[10px] text-taupe font-medium">Agarwal Group HR Department</span>
          </div>

        </div>
      </section>

      {/* Application Modal */}
      {selectedJob !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm cursor-pointer"
          onClick={() => setSelectedJob(null)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line/40 bg-ivory">
              <h3 className="font-serif text-xl text-ink">Apply for Position</h3>
              <button onClick={() => setSelectedJob(null)} className="text-ink-soft hover:text-ink transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="p-6 flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-ink uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                <input type="text" required placeholder="John Doe" className="w-full border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep focus:ring-1 focus:ring-brass-deep transition-all" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-ink uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" required placeholder="+91 98765 43210" className="w-full border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep focus:ring-1 focus:ring-brass-deep transition-all" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-ink uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                <input type="email" required placeholder="john@example.com" className="w-full border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep focus:ring-1 focus:ring-brass-deep transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-ink uppercase tracking-wider">Resume / CV <span className="text-red-500">*</span></label>
                <label className="w-full border-2 border-dashed border-line rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-ivory/80 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <UploadCloud className="w-6 h-6 text-brass-deep" />
                  </div>
                  <span className="text-sm font-semibold text-ink mb-1">Click to upload or drag and drop</span>
                  <span className="text-xs text-taupe max-w-xs">Maximum file size: 5MB. Supported formats: PDF, DOC, DOCX</span>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" required />
                </label>
              </div>
              
              <div className="mt-4 flex items-center gap-3">
                <button type="button" onClick={() => setSelectedJob(null)} className="flex-1 py-3 rounded-full text-sm font-semibold text-ink border border-line hover:bg-ivory transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-full text-sm font-semibold bg-pine text-ivory hover:bg-pine-deep transition-colors shadow-lg">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
