import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, ArrowLeft, MapPin, IndianRupee, Clock, Users, ChevronRight, X, 
  UploadCloud, AlertCircle, CheckCircle2, FileCheck, Eye, ExternalLink, Download, 
  Trash2, FileText 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { careerApplyAxios, extractErrorMessage } from '../_api/registration';
import { uploadFileAxios } from '../_api/fileUpload';
import heroImage from '../assets/gallery-lobby-grand-entrance-virar.webp';

const JOBS = [
  {
    "id": 1,
    "title": "Sales & Marketing Director / Head",
    "department": "Sales & Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Formulate and execute overall sales and marketing strategies for all real estate projects. Manage large marketing budgets, drive multi-channel sales campaigns, lead the sales management team, and establish strong relationships with key channel partners to achieve organizational revenue targets.",
    "requirements": [
      "MBA in Marketing / Post Graduate",
      "Strategic Planning",
      "Team Leadership",
      "Budgeting",
      "High-Value Deal Closure",
      "Channel Partner Management"
    ]
  },
  {
    "id": 2,
    "title": "Sales Manager",
    "department": "Sales & Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Lead and motivate the on-site sales executive team to meet monthly and quarterly sales targets. Handle corporate clients, resolve complex customer queries, monitor daily site walk-ins, and manage broker networks/channel partners.",
    "requirements": [
      "MBA / Graduate",
      "Sales Team Management",
      "Customer Conversion",
      "Real Estate Market Knowledge",
      "Negotiation"
    ]
  },
  {
    "id": 3,
    "title": "Assistant Sales Manager",
    "department": "Sales & Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Assist the Sales Manager in managing site walk-ins, delivering project pitches, maintaining active communication with potential buyers, and executing initial documentation during booking.",
    "requirements": [
      "Graduate / MBA",
      "Client Relationship",
      "Pitching",
      "Follow-ups",
      "Target Oriented"
    ]
  },
  {
    "id": 4,
    "title": "Sales Executive",
    "department": "Sales & Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Conduct project presentations and site tours for prospective buyers. Explain layout plans, pricing models, and financing options. Follow up diligently with prospective leads to close property bookings.",
    "requirements": [
      "Graduate",
      "Communication Skills",
      "Persuasion",
      "Presentation",
      "Active Listening"
    ]
  },
  {
    "id": 5,
    "title": "Presales Executive / Telecaller",
    "department": "Sales & Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Call incoming leads generated from marketing campaigns, introduce ongoing projects, filter qualified prospects, and schedule formal site visits for the on-site sales team.",
    "requirements": [
      "Undergraduate / Graduate",
      "Telephonic Etiquette",
      "Lead Filtering",
      "Customer Relationship",
      "Basic Excel"
    ]
  },
  {
    "id": 6,
    "title": "Digital Marketing Lead",
    "department": "Digital Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Plan and supervise all digital lead generation campaigns across Google, Facebook, Instagram, and LinkedIn. Analyze campaign performance metrics, optimize cost per lead (CPL), and manage the digital marketing agency and internal creative team.",
    "requirements": [
      "MBA / Certification in Digital Marketing",
      "Google Ads",
      "Meta Ads",
      "SEO Strategy",
      "Web Analytics",
      "Campaign Planning"
    ]
  },
  {
    "id": 7,
    "title": "Digital Marketing Executive",
    "department": "Digital Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Execute and monitor daily paid ad campaigns, manage official social media channels, publish regular updates, and optimize website content to improve organic search rankings.",
    "requirements": [
      "Graduate / Digital Marketing Course",
      "Social Media Management",
      "PPC Campaigns",
      "Content Distribution",
      "SEO"
    ]
  },
  {
    "id": 8,
    "title": "Graphic Designer & Content Creator",
    "department": "Digital Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Design high-quality marketing collateral including project brochures, social media posters, ad banners, and short video reels for digital promotion.",
    "requirements": [
      "Diploma or Degree in Graphic Design",
      "Adobe Photoshop",
      "Illustrator",
      "Canva",
      "Video Editing",
      "Creative Thinking"
    ]
  },
  {
    "id": 9,
    "title": "Senior Project Manager (SPM)",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Oversee the end-to-end execution of high-rise or large residential/commercial projects. Ensure construction aligns with approved architectural drawings, master timelines, quality benchmarks, and budgetary limits.",
    "requirements": [
      "B.E. / B.Tech in Civil Engineering",
      "Project Scheduling",
      "Cost Control",
      "Contractor Management",
      "Execution Planning"
    ]
  },
  {
    "id": 10,
    "title": "Senior Site Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Supervise daily on-site construction work, cross-verify RCC layouts and finishing tasks against structural drawings, resolve technical challenges, and monitor subcontractor milestones.",
    "requirements": [
      "B.E. / B.Tech / Diploma in Civil Engineering",
      "Drawing Interpretation",
      "Material Verification",
      "Structural Knowledge",
      "Team Supervision"
    ]
  },
  {
    "id": 11,
    "title": "Site Engineer / Junior Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Manage on-site labor allocations, oversee daily masonry, shuttering, and reinforcement activities, maintain accurate material utilization logs, and report progress to the Senior Engineer.",
    "requirements": [
      "B.E. / Diploma in Civil Engineering",
      "Labor Supervision",
      "Site Log Maintenance",
      "Concrete Pouring Check",
      "Basic Autocad"
    ]
  },
  {
    "id": 12,
    "title": "Billing & Quantity Surveyor (QS) Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Prepare precise material quantity estimations, verify contractor and vendor invoices against actual site execution metrics, analyze work-rate fluctuations, and manage monthly billing reconciliations.",
    "requirements": [
      "B.E. / Diploma in Civil Engineering",
      "Quantity Estimation",
      "Bill Verification",
      "Rate Analysis",
      "MS Excel",
      "AutoCAD"
    ]
  },
  {
    "id": 13,
    "title": "CRM Manager",
    "department": "Customer Relationship (CRM)",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Head the post-sales customer service division. Oversee allotment processes, manage bank loan documentations, coordinate registration processes, and resolve complex client queries or complaints.",
    "requirements": [
      "MBA / Post Graduate",
      "Client Grievance Redressal",
      "Post-Sales Operations",
      "Loan Coordination",
      "Team Management"
    ]
  },
  {
    "id": 14,
    "title": "CRM Executive",
    "department": "Customer Relationship (CRM)",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Generate and issue milestone-based payment demand letters to customers, process receipts, maintain accurate customer accounts in CRM software, and follow up regularly on outstanding payments.",
    "requirements": [
      "Graduate",
      "Customer Service",
      "Demand Letter Generation",
      "Data Accuracy",
      "Communication"
    ]
  },
  {
    "id": 15,
    "title": "Chief Accountant / Accounts Manager",
    "department": "Finance & Accounts",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Manage the company's comprehensive financial accounts. Finalize annual balance sheets, optimize corporate taxation models, handle statutory GST/TDS compliance filing, and manage project fund allocations and cash flows.",
    "requirements": [
      "CA / ICWA / M.Com",
      "Financial Auditing",
      "Taxation (GST/TDS)",
      "Balance Sheet Finalization",
      "Cash Flow Management"
    ]
  },
  {
    "id": 16,
    "title": "Accountant",
    "department": "Finance & Accounts",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Maintain accurate day-to-day accounting records using Tally Prime. Process vendor payments, reconcile monthly bank statements, verify contractor invoices, and administer employee payroll records.",
    "requirements": [
      "B.Com / M.Com",
      "Tally Prime",
      "Bank Reconciliation",
      "Voucher Verification",
      "Payroll Processing"
    ]
  },
  {
    "id": 17,
    "title": "Accounts Assistant",
    "department": "Finance & Accounts",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Assist the senior accounting team with basic financial data entry, file physical and digital invoices, process petty cash expenses, and perform general administrative accounting support tasks.",
    "requirements": [
      "B.Com",
      "Data Entry",
      "Invoice Archiving",
      "Basic Accounting",
      "MS Office"
    ]
  },
  {
    "id": 18,
    "title": "Purchase Manager",
    "department": "Procurement & Store",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Lead the procurement department for structural and finishing materials (steel, cement, tiles, plumbing fixtures). Develop a strong vendor network, negotiate volume-based supply contracts, and minimize procurement costs.",
    "requirements": [
      "Graduate / MBA in Supply Chain",
      "Vendor Development",
      "Rate Negotiation",
      "Supply Chain Management",
      "Material Sourcing"
    ]
  },
  {
    "id": 19,
    "title": "Storekeeper / Store Executive",
    "department": "Procurement & Store",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Manage the on-site materials warehouse. Maintain precise logs for inward shipments and outward material issuance, conduct regular physical stock verifications, and prevent material damage or theft.",
    "requirements": [
      "Graduate",
      "Inventory Management",
      "Inward/Outward Log",
      "Material Preservation",
      "Stock Verification"
    ]
  },
  {
    "id": 20,
    "title": "Liaisoning Head / Senior Manager",
    "department": "Liaisoning & Approvals",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Coordinate with municipal corporations, town planning boards, environment ministries, and RERA authorities to secure all necessary pre-construction approvals, commencement certificates, and final occupancy certificates.",
    "requirements": [
      "Graduate / Architect / Civil Engineer",
      "Municipal Regulations",
      "Building Bye-laws",
      "Government Relations",
      "RERA Compliance"
    ]
  },
  {
    "id": 21,
    "title": "Liaisoning Executive",
    "department": "Liaisoning & Approvals",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Prepare and organize structural/legal files for submission to various government bodies. Handle field visits to administrative offices to track file status and expedite approval processes.",
    "requirements": [
      "Graduate",
      "Documentation",
      "Government Department Follow-ups",
      "Local Language Proficiency"
    ]
  },
  {
    "id": 22,
    "title": "QA/QC Manager",
    "department": "Quality & Safety (QA/QC & HSE)",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Establish on-site quality assurance frameworks. Conduct structural raw material checks (compressive strength, sand silt content, steel tensile tests) and enforce strict standard operating procedures for structural masonry and finishes.",
    "requirements": [
      "B.E. Civil / Quality Certification",
      "Material Testing",
      "Quality Audit",
      "Concrete Cube Testing",
      "ISO Standards"
    ]
  },
  {
    "id": 23,
    "title": "Safety Officer / Engineer",
    "department": "Quality & Safety (QA/QC & HSE)",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Enforce strict construction safety protocols at the project site. Ensure mandatory usage of safety gear (harnesses, helmets, nets), conduct periodic safety drills, and mitigate workplace hazards.",
    "requirements": [
      "Diploma in Fire & Safety / Civil Engineering",
      "Hazard Identification",
      "Safety Training",
      "PPE Enforcement",
      "Accident Prevention"
    ]
  },
  {
    "id": 24,
    "title": "Legal Head",
    "department": "Legal",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Oversee the organization's legal affairs. Conduct intensive title verification checks for land acquisitions, manage joint-development contract drafting, represent the company in regulatory forums, and handle dispute litigations.",
    "requirements": [
      "LLB / LLM",
      "Property Law",
      "Land Title Due Diligence",
      "Contract Drafting",
      "Dispute Resolution"
    ]
  },
  {
    "id": 25,
    "title": "Legal Executive",
    "department": "Legal",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Draft standard customer Sale Deeds, Allotment Letters, and Vendor Agreements. Compile historical title documents and maintain absolute regulatory alignment with regional property laws.",
    "requirements": [
      "LLB",
      "Agreement Drafting",
      "Document Verification",
      "RERA Formalities",
      "Compliance"
    ]
  },
  {
    "id": 26,
    "title": "HR & Admin Manager",
    "department": "Human Resources & Admin",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Manage end-to-end human resource planning and general office administration. Strategize corporate recruitment drives, manage employee performance appraisal systems, process payroll parameters, and maintain active adherence to local labor codes.",
    "requirements": [
      "MBA in HR",
      "Talent Acquisition",
      "Performance Management",
      "Labor Law Compliance",
      "Office Administration"
    ]
  },
  {
    "id": 27,
    "title": "BBS (Bar Bending Schedule) Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Prepare and review BBS, optimize steel consumption, reconcile reinforcement steel with structural drawings, and support execution and billing activities.",
    "requirements": [
      "B.E./B.Tech / Diploma in Civil Engineering",
      "Bar Bending Schedule",
      "AutoCAD",
      "Steel Optimization",
      "MS Excel",
      "Structural Drawings"
    ]
  },
  {
    "id": 28,
    "title": "BOQ Engineer / Quantity Surveyor",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Prepare BOQs, quantity take-offs, cost estimates, billing verification, rate analysis, and project cost monitoring.",
    "requirements": [
      "B.E./B.Tech / Diploma in Civil Engineering",
      "Quantity Surveying",
      "Bill of Quantities (BOQ)",
      "Cost Estimation",
      "Rate Analysis",
      "Material Take-off"
    ]
  },
  {
    "id": 29,
    "title": "Jr. Planning Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Assist in project scheduling, tracking tracking, MIS reporting, tracking progress, and coordination for timely execution.",
    "requirements": [
      "B.E./B.Tech / Diploma in Civil Engineering",
      "Project Scheduling",
      "MS Project",
      "Primavera P6",
      "Progress Tracking",
      "MIS Reporting"
    ]
  },
  {
    "id": 30,
    "title": "Lab Technician",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Conduct RMC, aggregates, sand, ready mix plaster, specific gravity, steel/TMT testing, site inspection, and quality documentation.",
    "requirements": [
      "Diploma / ITI / Degree in Material Technology / Civil Engineering or Equivalent",
      "Material Testing",
      "Concrete Mix Design",
      "Quality Control",
      "Lab Equipment Management"
    ]
  },
  {
    "id": 31,
    "title": "MEP Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Manage MEP execution including electrical, plumbing, firefighting, HVAC, coordination, testing, and commissioning activities.",
    "requirements": [
      "B.E./B.Tech / Diploma in Electrical / Mechanical Engineering",
      "MEP Execution",
      "HVAC",
      "Electrical Systems",
      "Plumbing & Firefighting",
      "Coordination"
    ]
  },
  {
    "id": 32,
    "title": "Project Manager",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Lead end-to-end project execution; planning, budgeting, contractor management, project delivery, and stakeholder coordination.",
    "requirements": [
      "B.E./B.Tech in Civil Engineering (MBA preferred)",
      "Project Management",
      "Budgeting",
      "Vendor Management",
      "Team Leadership",
      "Risk Management"
    ]
  },
  {
    "id": 33,
    "title": "Quality Assistant",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Support QA/QC activities, inspections, documentation, material testing, and quality compliance.",
    "requirements": [
      "B.Tech in Civil Engineering / Diploma in Civil Engineering",
      "Quality Audits",
      "Site Inspection",
      "QA/QC Checklists",
      "Documentation"
    ]
  },
  {
    "id": 34,
    "title": "Quality Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Manage QA/QC systems, material approvals, audits, corrective actions, and ensure construction quality standards.",
    "requirements": [
      "B.E./B.Tech / Diploma in Civil Engineering",
      "Quality Assurance",
      "QC Standards",
      "Root Cause Analysis",
      "Method Statements",
      "Compliance"
    ]
  },
  {
    "id": 35,
    "title": "Safety Manager",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Lead EHS functions, implement safety procedures, conduct audits, training, incident management, and statutory compliance.",
    "requirements": [
      "Degree / Diploma in Safety Management / Certified ADIS (Industrial Safety preferred)",
      "EHS Management",
      "Hazard Identification",
      "Safety Audits",
      "Incident Investigation",
      "Statutory Compliance"
    ]
  },
  {
    "id": 36,
    "title": "Safety Steward",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Monitor site safety practices, conduct toolbox talks, ensure PPE compliance, and support timely completion.",
    "requirements": [
      "Diploma / Certification in Safety Management / Course preferred",
      "Site Monitoring",
      "Toolbox Talks",
      "PPE Compliance",
      "Safety Hazard Reports"
    ]
  },
  {
    "id": 37,
    "title": "Sr. Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Supervise project execution, monitor quality and progress, coordinate contractors, and ensure timely completion.",
    "requirements": [
      "B.E./B.Tech / Diploma in Civil Engineering",
      "Site Execution",
      "Contractor Coordination",
      "Quality Monitoring",
      "Resource Management"
    ]
  },
  {
    "id": 38,
    "title": "Sr. Planning Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Develop project schedules, monitor progress, perform delay analysis, and manage planning reports using Primavera/MS Project.",
    "requirements": [
      "B.E./B.Tech / Diploma in Civil Engineering (Planning Certification preferred)",
      "Primavera P6",
      "MS Project",
      "Project Controls",
      "Delay Analysis",
      "Progress Reports"
    ]
  },
  {
    "id": 39,
    "title": "Sr. Site Engineer",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Handle site execution, contractor coordination, quality monitoring, and daily progress management.",
    "requirements": [
      "B.E./B.Tech / Diploma in Civil Engineering",
      "Site Management",
      "Daily Progress Reports",
      "Contractor Management",
      "Quality Control"
    ]
  },
  {
    "id": 40,
    "title": "Store Keeper",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Manage material receipt, inventory control, stock records, issue tracking, and store documentation.",
    "requirements": [
      "Graduate / Diploma in Material Management / Supply Chain Management / Construction Material Management",
      "Inventory Management",
      "Store Accounting",
      "Material Receipt",
      "Stock Verification",
      "Excel"
    ]
  },
  {
    "id": 41,
    "title": "Supervisor",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Supervise labour and construction activities, monitor productivity, and maintain site discipline.",
    "requirements": [
      "Graduate / ITI / Diploma / Degree in Civil Engineering",
      "Labour Management",
      "Site Discipline",
      "Execution Monitoring",
      "Progress Tracking"
    ]
  },
  {
    "id": 42,
    "title": "Surveyor",
    "department": "Civil Construction",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Perform layout marking, level checking, quantity verification, and coordinate survey activities.",
    "requirements": [
      "Diploma / Degree in ITI Surveying / Civil Engineering",
      "Total Station",
      "Leveling",
      "Layout Marking",
      "Survey Data Analysis"
    ]
  },
  {
    "id": 43,
    "title": "Jr. Architect",
    "department": "Architecture & Design",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Assist senior architects with architectural drawings, layouts, design development, site measurements, and coordination with consultants and site teams. Prepare and revise drawings as per project requirements.",
    "requirements": [
      "B.Arch / Diploma in Architecture",
      "AutoCAD",
      "Architectural Planning",
      "Space Planning",
      "Site Coordination",
      "Basic 3D Software"
    ]
  },
  {
    "id": 44,
    "title": "Jr. Interior Designer",
    "department": "Architecture & Design",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Assist in developing interior layouts, furniture plans, material selections, and presentations. Coordinate with vendors and site teams and support execution as per approved designs.",
    "requirements": [
      "Degree / Diploma in Interior Design",
      "AutoCAD",
      "SketchUp",
      "Space Planning",
      "Material Selection",
      "3D Visualization"
    ]
  },
  {
    "id": 45,
    "title": "Jr. Draftsman",
    "department": "Architecture & Design",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Available Openings",
    "description": "Prepare accurate 2D architectural and working drawings under senior supervision. Update drawings based on site requirements, maintain drawing revisions, and coordinate drawing details with project teams.",
    "requirements": [
      "Diploma / ITI in Drafting or Civil / Architectural Drafting",
      "AutoCAD",
      "2D Drafting",
      "Working Drawings",
      "Detailing",
      "Drawing Coordination"
    ]
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState('');
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  // Resume Preview State
  const [previewDoc, setPreviewDoc] = useState<{
    fileName: string;
    file?: File | null;
    url?: string;
  } | null>(null);
  const [previewBlobUrl, setPreviewBlobUrl] = useState('');

  useEffect(() => {
    if (!previewDoc) {
      setPreviewBlobUrl('');
      return;
    }
    if (previewDoc.file) {
      const url = URL.createObjectURL(previewDoc.file);
      setPreviewBlobUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (previewDoc.url) {
      setPreviewBlobUrl(previewDoc.url);
    }
  }, [previewDoc]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewDoc) {
        setPreviewDoc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewDoc]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetForm = () => {
    setApplicantName('');
    setMobileNumber('');
    setEmail('');
    setResumeLink('');
    setSelectedFileName('');
    setSelectedFile(null);
    setUploadedResumeUrl('');
    setIsUploadingResume(false);
    setPreviewDoc(null);
    setErrorMsg(null);
    setIsSuccess(false);
  };

  const handleOpenJob = (jobId: number) => {
    resetForm();
    setSelectedJob(jobId);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    resetForm();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        return;
      }
      setSelectedFile(file);
      setSelectedFileName(file.name);
      setIsUploadingResume(true);
      try {
        const res = await uploadFileAxios(file, 'resumes');
        setUploadedResumeUrl(res.data.fileURL);
        toast.success('Resume uploaded successfully');
      } catch (err: any) {
        console.error('Resume upload error:', err);
        toast.error(err.message || 'Failed to upload resume to server');
      } finally {
        setIsUploadingResume(false);
      }
      if (errorMsg) setErrorMsg(null);
    }
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const currentJob = JOBS.find(j => j.id === selectedJob);
    const positionTitle = currentJob ? currentJob.title : 'General Application';

    if (!applicantName.trim()) {
      const err = 'Please enter your full name';
      setErrorMsg(err);
      toast.error(err);
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/[^0-9]/g, '').length !== 10) {
      const err = 'Please enter a valid 10-digit mobile number';
      setErrorMsg(err);
      toast.error(err);
      return;
    }
    if (!email.trim()) {
      const err = 'Please enter your email address';
      setErrorMsg(err);
      toast.error(err);
      return;
    }

    if (isUploadingResume) {
      toast.error('Please wait for the resume to finish uploading.');
      return;
    }

    let finalResume = uploadedResumeUrl.trim() || resumeLink.trim();
    if (!finalResume && selectedFile) {
      setIsSubmitting(true);
      try {
        const res = await uploadFileAxios(selectedFile, 'resumes');
        finalResume = res.data.fileURL;
        setUploadedResumeUrl(finalResume);
      } catch (uploadErr: any) {
        setIsSubmitting(false);
        const err = uploadErr.message || 'Failed to upload resume to server';
        setErrorMsg(err);
        toast.error(err);
        return;
      }
    }

    if (!finalResume) {
      const err = 'Please upload a resume file or enter a resume link';
      setErrorMsg(err);
      toast.error(err);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await careerApplyAxios({
        appliedForPosition: positionTitle,
        fullName: applicantName.trim(),
        email: email.trim(),
        mobileNumber: mobileNumber.replace(/[^0-9]/g, '').slice(0, 10),
        resumeUploadLink: finalResume
      });

      if (response && response.success === false) {
        throw new Error(response.message || 'Application submission failed');
      }

      toast.success(response?.message || 'Application submitted successfully!');
      setIsSuccess(true);
    } catch (err: any) {
      const msg = extractErrorMessage(err, 'Failed to submit application. Please try again.');
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    onClick={() => handleOpenJob(job.id)}
                    className="pcta-btn btn-enquire self-start sm:self-auto"
                    style={{ flex: 'none', padding: '12px 28px' }}
                  >
                    <span>Apply Now</span>
                    <span className="arr">→</span>
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
                    <span className="text-sm text-ink-soft font-medium">{job.vacancies || "Available Openings"}</span>
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
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm cursor-pointer"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col cursor-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line/40 bg-ivory">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brass-deep block">Application</span>
                <h3 className="font-serif text-lg sm:text-xl text-ink">
                  {JOBS.find(j => j.id === selectedJob)?.title || 'Apply for Position'}
                </h3>
              </div>
              <button onClick={handleCloseModal} className="text-ink-soft hover:text-ink transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl text-ink mb-2">Application Submitted!</h4>
                <p className="text-sm text-taupe mb-6 max-w-sm">
                  Thank you for applying for <span className="font-semibold text-ink">{JOBS.find(j => j.id === selectedJob)?.title}</span>. Our HR team has received your application and will contact you if your profile matches our requirements.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-8 py-3 bg-pine text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-brass transition-colors shadow-md"
                >
                  Done
                </button>
              </div>
            ) : (
              <form className="p-6 flex flex-col gap-4" onSubmit={handleCareerSubmit}>
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                    <span className="leading-relaxed font-medium">{errorMsg}</span>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={applicantName}
                    onChange={(e) => { setApplicantName(e.target.value); if (errorMsg) setErrorMsg(null); }}
                    className="w-full border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep focus:ring-1 focus:ring-brass-deep transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex border border-line rounded-xl overflow-hidden bg-white focus-within:border-brass-deep focus-within:ring-1 focus-within:ring-brass-deep transition-all">
                    <span className="flex items-center bg-ivory px-3 text-xs font-semibold text-ink border-r border-line">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      placeholder="9876543210"
                      value={mobileNumber}
                      onChange={(e) => { setMobileNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10)); if (errorMsg) setErrorMsg(null); }}
                      className="w-full px-4 py-2.5 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errorMsg) setErrorMsg(null); }}
                    className="w-full border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep focus:ring-1 focus:ring-brass-deep transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                    Resume / CV <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="career-resume-file"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />

                  {selectedFile || selectedFileName ? (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory/80 border border-brass/30 shadow-sm">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          {isUploadingResume ? (
                            <span className="w-4 h-4 border-2 border-brass-deep border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <FileCheck className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold text-ink truncate max-w-[160px] sm:max-w-xs">
                            {selectedFileName || selectedFile?.name}
                          </p>
                          <p className="text-[10px] text-ink-soft">
                            {isUploadingResume
                              ? 'Uploading to server...'
                              : selectedFile
                              ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready`
                              : 'Uploaded resume'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setPreviewDoc({
                            fileName: selectedFileName || selectedFile?.name || 'Resume',
                            file: selectedFile,
                            url: uploadedResumeUrl
                          })}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-brass-deep bg-brass/10 hover:bg-brass/20 transition-colors cursor-pointer"
                          title="Preview attachment"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                        <label
                          htmlFor="career-resume-file"
                          className="text-xs text-brass-deep hover:underline cursor-pointer font-semibold px-1.5 py-1"
                        >
                          Replace
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setSelectedFileName('');
                            setUploadedResumeUrl('');
                          }}
                          className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          aria-label="Remove resume"
                          title="Remove resume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="career-resume-file"
                      className="w-full border-2 border-dashed border-line rounded-xl p-5 flex flex-col items-center justify-center text-center hover:bg-ivory/80 transition-colors cursor-pointer group"
                    >
                      <div className="w-10 h-10 bg-ivory rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm">
                        <UploadCloud className="w-5 h-5 text-brass-deep" />
                      </div>
                      <span className="text-xs font-semibold text-ink mb-1">Click to select resume file</span>
                      <span className="text-[10px] text-taupe max-w-xs">PDF, DOC, DOCX (Max 10MB)</span>
                    </label>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                      Or Resume URL / Drive Link
                    </label>
                    {resumeLink && (
                      <button
                        type="button"
                        onClick={() => setPreviewDoc({
                          fileName: resumeLink.split('/').pop()?.split('?')[0] || 'Resume Link',
                          url: resumeLink
                        })}
                        className="text-[11px] font-semibold text-brass-deep hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" /> Preview Link
                      </button>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/... or LinkedIn"
                    value={resumeLink}
                    onChange={(e) => { setResumeLink(e.target.value); if (errorMsg) setErrorMsg(null); }}
                    className="w-full border border-line rounded-xl px-4 py-2 text-xs outline-none focus:border-brass-deep focus:ring-1 focus:ring-brass-deep transition-all"
                  />
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-2.5 rounded-full text-xs font-semibold text-ink border border-line hover:bg-ivory transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="pcta-btn btn-enquire flex-1"
                    style={{ padding: '12px 24px', opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                    <span className="arr">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-line max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-ivory/60">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-brass/10 text-brass-deep flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-sm sm:text-base font-serif font-bold text-ink truncate">
                      Resume / Curriculum Vitae
                    </h3>
                    <p className="text-xs text-ink-soft truncate">
                      {previewDoc.fileName}
                      {previewDoc.file ? ` • ${(previewDoc.file.size / 1024 / 1024).toFixed(2)} MB` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {(previewBlobUrl || previewDoc.url) && (
                    <a
                      href={previewBlobUrl || previewDoc.url}
                      download={previewDoc.fileName}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl text-ink-soft hover:text-ink hover:bg-ivory border border-line/60 transition-all flex items-center gap-1.5 text-xs font-semibold"
                      title="Download or open in new tab"
                    >
                      <ExternalLink className="w-4 h-4 text-brass-deep" />
                      <span className="hidden sm:inline">Open in Tab</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(null)}
                    className="p-2 rounded-xl text-ink-soft hover:text-ink hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Close preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 bg-ivory/30 flex items-center justify-center min-h-[300px]">
                {previewDoc.file && (previewDoc.file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg)$/i.test(previewDoc.file.name)) ? (
                  <div className="w-full flex items-center justify-center">
                    <img
                      src={previewBlobUrl}
                      alt={previewDoc.fileName}
                      className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-md border border-line"
                    />
                  </div>
                ) : (previewDoc.file && (previewDoc.file.type === 'application/pdf' || /\.pdf$/i.test(previewDoc.file.name))) || (previewDoc.url && /\.pdf(\?.*)?$/i.test(previewDoc.url)) ? (
                  <iframe
                    src={previewBlobUrl || previewDoc.url}
                    title={previewDoc.fileName}
                    className="w-full h-[65vh] rounded-xl border border-line bg-white shadow-inner"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-line max-w-md shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-brass/10 text-brass-deep flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif font-bold text-ink text-base mb-1 truncate max-w-full px-2">
                      {previewDoc.fileName}
                    </h4>
                    <p className="text-xs text-ink-soft mb-5">
                      {previewDoc.file
                        ? 'Direct in-browser preview is not available for Word files (.doc, .docx). You can open or download the document directly.'
                        : 'External link document preview. You can open the link in a new browser tab.'}
                    </p>
                    <a
                      href={previewBlobUrl || previewDoc.url}
                      download={previewDoc.fileName}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brass-deep hover:bg-brass text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <Download className="w-4 h-4" /> Download / Open File
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
