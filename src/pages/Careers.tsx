import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, MapPin, IndianRupee, Clock, Users, ChevronRight, X, UploadCloud } from 'lucide-react';
import heroImage from '../assets/gallery-lobby.jpg';

const JOBS = [
  {
    "id": 1,
    "title": "Sales & Marketing Director / Head",
    "department": "Sales & Marketing",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "vacancies": "Open",
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
    "title": "Jr. Interiar Designer",
    "department": "Architecture & Design",
    "location": "Mumbai / Virar",
    "employmentType": "Full Time",
    "experience": "As per industry standards",
    "salary": "Competitive",
    "vacancies": "Open",
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
    "vacancies": "Open",
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
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm cursor-pointer"
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
                <label className="text-xs font-semibold text-ink uppercase tracking-wider">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-deep focus:ring-1 focus:ring-brass-deep transition-all" />
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
