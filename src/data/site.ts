import {
  Factory,
  GraduationCap,
  HeartPulse,
  Code2,
  BrainCircuit,
  Megaphone,
  Globe,
  Laptop,
  Search,
  ShoppingCart,
  Cpu,
  Wrench,
  Shield,
  CheckCircle2,
  Users,
  Building2,
  Briefcase,
  Rocket,
  FileText,
  RefreshCw,
  Lock,
  Zap,
  BarChart3,
  Clock,
  Compass,
  Layers,
  Terminal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import industrial from "@/assets/industrial.jpg";
import healthcare from "@/assets/healthcare.jpg";
import education from "@/assets/education.jpg";
import dev from "@/assets/dev.jpg";
import ai from "@/assets/ai.jpg";
import marketing from "@/assets/marketing.jpg";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  businessBenefits: string[];
  icon: LucideIcon;
  image: string;
  features: string[];
  deliverables: string[];
  techUsed: string[];
  category: "development" | "enterprise" | "growth" | "automation";
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    short: "High-performance, conversion-focused websites engineered for global brands.",
    description:
      "We build blazing-fast, mobile-responsive, SEO-ready corporate websites, web applications, and landing pages that turn visitors into qualified leads and paying customers.",
    businessBenefits: [
      "Boost conversion rates by up to 40% with CRO-optimized layouts",
      "Sub-second loading times improving Google search rank & user retention",
      "100% responsive across smartphones, tablets, laptops, and ultra-wide screens",
      "Enterprise security, GDPR/data privacy compliance, and clean accessible code",
    ],
    icon: Globe,
    image: dev,
    features: [
      "Custom React & Next.js Websites",
      "Headless CMS & WordPress",
      "Responsive & Mobile-First",
      "Performance & Core Web Vitals 90+",
    ],
    deliverables: [
      "Custom UI/UX Design in Figma",
      "Full-Stack Development & Testing",
      "On-Page SEO & Analytics Setup",
      "30-Day Post-Launch Warranty",
    ],
    techUsed: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WordPress", "Node.js"],
    category: "development",
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    short: "Bespoke SaaS, cloud platforms, and internal business systems built to scale.",
    description:
      "End-to-end software engineering from architecture design to cloud deployment. We build scalable SaaS products, multi-tenant portals, workflow automation tools, and APIs.",
    businessBenefits: [
      "Replace fragmented spreadsheets with a single, secure automated workflow",
      "Full intellectual property (IP) and 100% source code ownership",
      "Scalable cloud architecture that grows seamlessly from 1,000 to 1M+ users",
      "Drastically reduce operational overhead and eliminate manual human error",
    ],
    icon: Laptop,
    image: dev,
    features: [
      "SaaS & Cloud Platforms",
      "Custom Web & Client Portals",
      "REST & GraphQL API Engineering",
      "Microservices & Database Design",
    ],
    deliverables: [
      "System Architecture Blueprint",
      "Agile Bi-Weekly Sprint Demos",
      "Automated CI/CD Deployment",
      "Comprehensive API & Code Documentation",
    ],
    techUsed: ["TypeScript", "Node.js", "Python", ".NET", "PostgreSQL", "AWS / Azure"],
    category: "development",
  },
  {
    slug: "industrial-erp",
    title: "Industrial ERP Solutions",
    short: "End-to-end ERP platforms engineered for modern manufacturing operations.",
    description:
      "Streamline production schedules, supply chain inventory, procurement workflows, shop-floor tracking, and financial ledgers with a modular ERP built for industrial resilience.",
    businessBenefits: [
      "Reduce manufacturing downtime and eliminate inventory stockouts",
      "Real-time shop floor visibility and machine utilization metrics",
      "Seamless procurement, vendor management, and automated invoicing",
      "Multi-currency, GST, and international tax compliance out of the box",
    ],
    icon: Factory,
    image: industrial,
    features: [
      "Production planning & MRP",
      "Inventory & BOM management",
      "Procurement & vendor portals",
      "Real-time KPIs & IoT integration",
    ],
    deliverables: [
      "Factory Workflow Audit",
      "Custom Module Customization",
      "Legacy Data Migration",
      "On-Site / Remote Staff Training",
    ],
    techUsed: [".NET Core", "React", "PostgreSQL", "Docker", "Redis", "Azure"],
    category: "enterprise",
  },
  {
    slug: "hospital-management",
    title: "Hospital & Clinic Management",
    short: "HIPAA-aware digital healthcare platforms for modern hospitals & clinics.",
    description:
      "Complete healthcare management including OPD, IPD, electronic health records (EHR), laboratory diagnostics, pharmacy inventory, and automated patient billing.",
    businessBenefits: [
      "Cut patient wait times by up to 35% through digital check-ins & queue management",
      "100% accurate, tamper-proof digital patient health records & test histories",
      "Eliminate billing discrepancies with insurance integration and auto-claims",
      "Strict data encryption and HIPAA/NABH compliance safeguards",
    ],
    icon: HeartPulse,
    image: healthcare,
    features: [
      "EHR & OPD/IPD workflows",
      "Laboratory & pharmacy management",
      "Billing, claims & insurance",
      "Doctor schedule & telemedicine",
    ],
    deliverables: [
      "Role-Based Access Control Setup",
      "Department-Wise Rollout Plan",
      "Patient Portal & Mobile App",
      "24/7 Dedicated Emergency SLA",
    ],
    techUsed: ["React", "Node.js", "PostgreSQL", "WebRTC", "Docker", "AWS HealthLake"],
    category: "enterprise",
  },
  {
    slug: "institute-management",
    title: "Institute Management System",
    short: "Unified ERP platform for universities, schools, colleges, and academies.",
    description:
      "End-to-end academic management covering student admissions, fee collections, biometric attendance, learning management (LMS), and interactive parent-teacher portals.",
    businessBenefits: [
      "100% paperless administration and fee collection within 90 days",
      "Instant WhatsApp & SMS notifications to parents for attendance & dues",
      "Automated grade cards, report generation, and student performance tracking",
      "Multi-campus administration from a single centralized dashboard",
    ],
    icon: GraduationCap,
    image: education,
    features: [
      "Admissions & student CRM",
      "Attendance, timetable & LMS",
      "Fee collection & online payment",
      "Parent & student mobile portal",
    ],
    deliverables: [
      "Campus Data Digitization",
      "Payment Gateway Integration",
      "Custom Report Card Builder",
      "Admin & Faculty Onboarding",
    ],
    techUsed: ["Next.js", "Python / FastAPI", "PostgreSQL", "Tailwind CSS", "AWS"],
    category: "enterprise",
  },
  {
    slug: "ecommerce-development",
    title: "E-Commerce Development",
    short: "High-converting online stores engineered for maximum average order value.",
    description:
      "Custom Shopify stores, WooCommerce platforms, and custom headless e-commerce architectures built for blazing speed, frictionless checkout, and high conversion rates.",
    businessBenefits: [
      "Reduce checkout abandonment with 1-click payment flows & localized currencies",
      "Automated inventory sync with accounting, ERP, and shipping providers",
      "Advanced product filters, search recommendations, and upselling widgets",
      "Optimized for high-traffic seasonal sales (Black Friday, festive campaigns)",
    ],
    icon: ShoppingCart,
    image: marketing,
    features: [
      "Shopify & WooCommerce Setup",
      "Custom Headless Storefronts",
      "Multi-Currency & Tax Automation",
      "Payment & Shipping API Integrations",
    ],
    deliverables: [
      "Conversion-Optimized Store Theme",
      "Catalog Setup & Migration",
      "Payment & Courier Integrations",
      "Analytics & Cart Recovery Setup",
    ],
    techUsed: ["Shopify Liquid", "Next.js Commerce", "Stripe / Razorpay", "Tailwind CSS"],
    category: "development",
  },
  {
    slug: "business-automation",
    title: "Business Automation & AI Workflows",
    short: "Automate repetitive manual operations, data entry, and business processes.",
    description:
      "We design and deploy intelligent workflows, Zapier/Make integrations, custom bots, and RPA pipelines that connect your CRM, accounting, emails, and internal software.",
    businessBenefits: [
      "Save 15+ hours per team member every week on repetitive data tasks",
      "Instant 2-way data sync between CRM, Google Workspace, Slack, and accounting",
      "Zero human entry errors in invoicing, lead routing, and report generation",
      "Faster response times to inbound customer inquiries and quotation requests",
    ],
    icon: Cpu,
    image: dev,
    features: [
      "CRM & Email Workflow Automation",
      "Automated Document & Invoice Generation",
      "Webhook & API Integrations",
      "Custom Internal Admin Bots",
    ],
    deliverables: [
      "Workflow Bottleneck Audit",
      "End-to-End Automation Scripts",
      "Fallback Error Monitoring",
      "Team Runbook & Training",
    ],
    techUsed: ["Python", "Node.js", "Zapier / Make", "OpenAI API", "REST Webhooks"],
    category: "automation",
  },
  {
    slug: "ai-integration",
    title: "AI Integration & Copilots",
    short: "Embed generative AI, custom copilots, and smart analytics into your apps.",
    description:
      "Custom Retrieval-Augmented Generation (RAG) pipelines, proprietary document intelligence, AI copilots, customer support bots, and predictive business analytics.",
    businessBenefits: [
      "Automate 70% of tier-1 customer support inquiries with verified AI agents",
      "Extract structured data from unstructured contracts, PDFs, and invoices instantly",
      "Private AI deployments that protect your intellectual property and customer data",
      "Personalized recommendations that increase customer lifetime value (LTV)",
    ],
    icon: BrainCircuit,
    image: ai,
    features: [
      "Custom RAG Knowledge Bases",
      "Proprietary AI Chatbots & Copilots",
      "Intelligent Document Processing (IDP)",
      "Predictive Sales & Churn Analytics",
    ],
    deliverables: [
      "Custom Vector Database Setup",
      "Fine-Tuned LLM Prompts & Safeguards",
      "Embedded UI Copilot Widget",
      "Evaluation & Hallucination Testing",
    ],
    techUsed: ["OpenAI", "LangChain / LlamaIndex", "Pinecone", "Python", "FastAPI"],
    category: "automation",
  },
  {
    slug: "digital-marketing",
    title: "Performance Digital Marketing",
    short: "Data-driven customer acquisition that fills your sales pipeline.",
    description:
      "Targeted paid advertising (Google Ads, Meta Ads, LinkedIn Ads), conversion rate optimization (CRO), high-converting landing pages, and automated email marketing funnels.",
    businessBenefits: [
      "Predictable return on ad spend (ROAS) and qualified B2B lead generation",
      "Continuous A/B testing of ad creatives, headlines, and landing page funnels",
      "Target decision-makers in USA, UK, Canada, Australia, and Middle East",
      "Transparent weekly reporting on CAC, pipeline value, and conversion rates",
    ],
    icon: Megaphone,
    image: marketing,
    features: [
      "Google Ads (Search & Performance Max)",
      "LinkedIn & Meta Paid Funnels",
      "Landing Page CRO Optimization",
      "Lifecycle & Email Sequences",
    ],
    deliverables: [
      "Target Audience & Competitor Analysis",
      "High-Converting Ad Creatives & Copy",
      "Conversion Tracking & GA4 Setup",
      "Weekly Performance Dashboard",
    ],
    techUsed: ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager", "GA4", "Klaviyo"],
    category: "growth",
  },
  {
    slug: "seo-services",
    title: "Search Engine Optimization (SEO)",
    short: "Dominate search engine rankings for high-intent commercial keywords.",
    description:
      "Technical SEO audits, on-page optimization, content cluster strategy, high-authority backlink outreach, and local/international search domination.",
    businessBenefits: [
      "Attract sustainable, organic high-intent business leads 24/7 without ad spend",
      "Outrank established competitors in competitive local and international markets",
      "Eliminate technical crawl errors, broken links, and slow Core Web Vitals",
      "Build long-term domain authority and brand credibility in Google search",
    ],
    icon: Search,
    image: marketing,
    features: [
      "Comprehensive Technical SEO Audits",
      "Keyword Research & Content Mapping",
      "On-Page Metadata & Schema Optimization",
      "High-Quality Backlink Building",
    ],
    deliverables: [
      "Full Technical Audit Report",
      "Keyword Strategy & Ranking Roadmap",
      "Schema & Rich Snippet Implementation",
      "Monthly Keyword Ranking Reports",
    ],
    techUsed: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "Schema.org"],
    category: "growth",
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance & Support",
    short: "Proactive 24/7 uptime monitoring, security patching, and ongoing updates.",
    description:
      "Reliable maintenance plans for businesses that cannot afford website downtime. Includes daily backups, security hardening, plugin updates, speed audits, and content edits.",
    businessBenefits: [
      "99.9% uptime guarantee with instant automated incident alerts",
      "Zero risk of data loss with automated daily cloud backups & 1-click restore",
      "Immediate protection against malicious attacks, malware, and vulnerabilities",
      "Dedicated developer hours every month for feature updates and design tweaks",
    ],
    icon: Wrench,
    image: industrial,
    features: [
      "24/7 Uptime & Performance Monitoring",
      "Daily Cloud Backups & Instant Restore",
      "Security Hardening & Malware Scans",
      "Dedicated Monthly Development Hours",
    ],
    deliverables: [
      "Monthly Health & Security Report",
      "Guaranteed SLA Response Time",
      "Software & Plugin Version Updates",
      "Priority Emergency Support Hotline",
    ],
    techUsed: ["AWS S3", "Cloudflare", "GitHub Actions", "UptimeRobot", "Sentry"],
    category: "development",
  },
  {
    slug: "mvc-product-development",
    title: "MVC Product Engineering",
    short: "Robust enterprise web applications built with clean architecture.",
    description:
      "From database schema design to containerized cloud deployments, we ship clean, maintainable Model-View-Controller applications engineered for reliability and high throughput.",
    businessBenefits: [
      "Modular codebases that allow new features to ship 3× faster",
      "Decoupled business logic ensuring zero vendor lock-in",
      "Production-ready test coverage with automated unit and integration tests",
      "Effortless maintenance and seamless developer handoff",
    ],
    icon: Code2,
    image: dev,
    features: [
      "Clean Architecture & Domain Modeling",
      "RESTful & GraphQL API Endpoints",
      "Containerized Docker & Kubernetes Setup",
      "CI/CD Deployment Pipelines",
    ],
    deliverables: [
      "Architectural Documentation",
      "Unit & Integration Test Suites",
      "Production Deployment Runbooks",
      "Long-Term SLA Engineering Support",
    ],
    techUsed: ["React", "TypeScript", ".NET Core", "Node.js", "Docker", "PostgreSQL"],
    category: "development",
  },
];

export const industries = [
  {
    name: "Healthcare",
    icon: HeartPulse,
    summary: "HIPAA-aware digital health platforms, EHR/EMR, OPD/IPD, and clinic booking systems.",
    solutions: [
      "Electronic Health Records (EHR)",
      "Automated OPD/IPD workflows",
      "Telemedicine video consultations",
      "Insurance claims & lab tracking",
    ],
    metric: "-28% patient wait times",
  },
  {
    name: "Real Estate",
    icon: Building2,
    summary:
      "Interactive property portals, broker CRMs, 3D virtual tour integrations, and lead automation.",
    solutions: [
      "IDX/MLS property listing portals",
      "Automated buyer & tenant lead qualification",
      "Virtual tour & floor plan viewers",
      "Mortgage & EMI calculation widgets",
    ],
    metric: "+45% lead qualification speed",
  },
  {
    name: "Education & EdTech",
    icon: GraduationCap,
    summary:
      "Institute management ERPs, interactive LMS platforms, and student/parent communication portals.",
    solutions: [
      "Unified institute ERP & admissions CRM",
      "Biometric & QR attendance tracking",
      "Automated fee collection & reminders",
      "Digital report cards & parent apps",
    ],
    metric: "100% paperless administration",
  },
  {
    name: "Manufacturing & Industrial",
    icon: Factory,
    summary:
      "Production planning, bill-of-materials (BOM), raw material procurement, and shop-floor IoT.",
    solutions: [
      "Modular Industrial ERP systems",
      "Shop-floor machine utilization tracking",
      "Multi-warehouse inventory tracking",
      "Automated vendor procurement orders",
    ],
    metric: "+32% manufacturing throughput",
  },
  {
    name: "E-Commerce & Retail",
    icon: ShoppingCart,
    summary:
      "High-converting online storefronts, omni-channel inventory sync, and localized checkout flows.",
    solutions: [
      "Custom Shopify & WooCommerce stores",
      "Multi-currency & tax automation",
      "Cart abandonment recovery flows",
      "ERP & warehouse logistics integrations",
    ],
    metric: "+38% mobile conversion rate",
  },
  {
    name: "Construction & Engineering",
    icon: Briefcase,
    summary:
      "Project milestone trackers, contractor management portals, and material estimation tools.",
    solutions: [
      "Site milestone & progress tracking",
      "Contractor & sub-contractor billing",
      "Equipment & machinery logbook",
      "Client handover & document management",
    ],
    metric: "99% on-schedule milestone delivery",
  },
  {
    name: "Professional Services",
    icon: Users,
    summary:
      "Client portals, automated document generation, retainer billing, and appointment systems.",
    solutions: [
      "Bespoke client self-service portals",
      "Automated contract & invoice generation",
      "Secure file sharing & e-signatures",
      "Calendar & consultation scheduling",
    ],
    metric: "15+ hours saved weekly per team",
  },
  {
    name: "Startups & SaaS",
    icon: Rocket,
    summary: "Rapid MVP product development, multi-tenant cloud architecture, and AI copilots.",
    solutions: [
      "Fast 6-to-8 week MVP build & launch",
      "Stripe subscription billing integration",
      "Multi-tenant cloud architecture",
      "Custom AI copilot integrations",
    ],
    metric: "6 weeks avg. MVP rollout",
  },
];

export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  ".NET Core",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Microsoft Azure",
  "Tailwind CSS",
  "OpenAI",
  "LangChain",
  "Shopify",
  "WordPress",
];

export const whyChooseUsPillars = [
  {
    icon: Users,
    title: "Customer-Focused Development",
    description:
      "We don't just write code; we design around your end-users and commercial objectives to deliver measurable ROI.",
  },
  {
    icon: Terminal,
    title: "Modern, Scalable Technologies",
    description:
      "Built with React, Next.js, TypeScript, .NET Core, Python, and cloud infrastructure engineered for zero obsolescence.",
  },
  {
    icon: Zap,
    title: "High-Performance Architecture",
    description:
      "Sub-second page speeds, 99.9% uptime, and scalable architectures capable of supporting enterprise volume.",
  },
  {
    icon: Compass,
    title: "Transparent Communication",
    description:
      "Direct access to senior developers, bi-weekly live sprint demos, real-time Slack/Teams channels, and no hidden surprises.",
  },
  {
    icon: Shield,
    title: "Rigorous Quality Assurance",
    description:
      "Automated unit tests, manual edge-case verification, cross-browser compatibility, and deep security audits before every release.",
  },
  {
    icon: Clock,
    title: "24/7 Ongoing Support & SLA",
    description:
      "Reliable post-launch warranty, guaranteed response SLAs, proactive security patching, and continuous performance tuning.",
  },
  {
    icon: Globe,
    title: "International Project Delivery",
    description:
      "Proven track record serving clients across USA, UK, Canada, Australia, and India with convenient timezone overlaps.",
  },
];

export const developmentProcess = [
  {
    step: "01",
    title: "Discovery & Strategy",
    duration: "Week 1",
    description:
      "We analyze your business goals, target audience, competitive landscape, and technical requirements to draft a precise scope of work.",
    deliverable: "Project Roadmap & Architecture Specs",
  },
  {
    step: "02",
    title: "UI/UX & Interactive Prototyping",
    duration: "Week 2 - 3",
    description:
      "Our designers craft high-fidelity Figma prototypes focusing on intuitive user journeys, accessibility, and high conversion rates.",
    deliverable: "Interactive Figma Prototype & Design System",
  },
  {
    step: "03",
    title: "Agile Development Sprints",
    duration: "Weeks 4 - 8",
    description:
      "Senior engineering pods build front-end and back-end logic in bi-weekly sprints, keeping you updated with live staging previews.",
    deliverable: "Live Staging Environment & Sprint Demos",
  },
  {
    step: "04",
    title: "QA, Security & Performance Audits",
    duration: "Week 9",
    description:
      "Rigorous automated and manual testing covering cross-device responsiveness, Core Web Vitals, API security, and load capacity.",
    deliverable: "QA Test Matrix & Security Clearance",
  },
  {
    step: "05",
    title: "Deployment & 24/7 SLA Support",
    duration: "Week 10+",
    description:
      "Seamless production launch on cloud infrastructure with DNS configuration, analytics tracking, and ongoing SLA maintenance.",
    deliverable: "Production Handover & 100% Code Ownership",
  },
];

export const caseStudies = [
  {
    title: "Meridian Manufacturing ERP",
    industry: "Industrial Manufacturing",
    image: industrial,
    description:
      "A centralized, modular ERP platform connecting production planning, inventory tracking, raw material procurement, and accounting across 4 manufacturing plants.",
    result: "+32% manufacturing throughput, 40% faster rollout time",
    technologies: [".NET Core", "React", "PostgreSQL", "Docker", "Redis"],
    featuresDelivered: [
      "Real-time Bill of Materials (BOM) calculation",
      "Automated procurement purchase orders",
      "Shop-floor machine telemetry dashboard",
      "Multi-plant financial consolidation",
    ],
    liveLink: "https://www.rapidtechlabs.in/contact",
  },
  {
    title: "Northcare Hospitals Management",
    industry: "Healthcare & Clinics",
    image: healthcare,
    description:
      "A HIPAA-aware hospital management ecosystem implemented across 6 clinic locations, unifying patient records, lab test reports, and insurance billing.",
    result: "-28% patient wait times & near-zero billing discrepancies",
    technologies: ["React", "Node.js", "PostgreSQL", "WebRTC", "AWS"],
    featuresDelivered: [
      "Digital patient check-in kiosk & queue display",
      "Integrated OPD/IPD electronic medical records",
      "Automated pharmacy stock alerts",
      "Instant insurance claim validation",
    ],
    liveLink: "https://www.rapidtechlabs.in/contact",
  },
  {
    title: "Brightline Institute Cloud Platform",
    industry: "Higher Education",
    image: education,
    description:
      "Modern academic management software replacing legacy paper workflows with digital admissions, fee collections, attendance, and parent-teacher communication.",
    result: "100% paperless administration achieved within 90 days",
    technologies: ["Next.js", "TypeScript", "Python", "Tailwind CSS"],
    featuresDelivered: [
      "Online student admission & document verification",
      "Automated fee receipts & gateway integration",
      "Biometric attendance sync with parent SMS alerts",
      "Digital student report cards & grading rubrics",
    ],
    liveLink: "https://www.rapidtechlabs.in/contact",
  },
  {
    title: "FinPivot AI Copilot & Analytics",
    industry: "FinTech & SaaS",
    image: ai,
    description:
      "An enterprise generative AI copilot built on custom RAG architecture that allows wealth managers to query complex financial portfolios in natural language.",
    result: "Production AI copilot delivered & validated in 9 weeks",
    technologies: ["OpenAI API", "Python", "FastAPI", "Pinecone", "React"],
    featuresDelivered: [
      "Document intelligence over 10,000+ SEC filings",
      "Natural language financial query engine",
      "Role-based enterprise data safeguards",
      "Sub-2-second vector search response",
    ],
    liveLink: "https://www.rapidtechlabs.in/contact",
  },
  {
    title: "Loomstack B2B Growth Engine",
    industry: "Digital Marketing & CRO",
    image: marketing,
    description:
      "Comprehensive SEO audit, landing page CRO redesign, and multi-channel Google/LinkedIn advertising campaign for an enterprise B2B SaaS platform.",
    result: "2× qualified inbound sales pipeline in one single quarter",
    technologies: ["Next.js", "Google Ads", "LinkedIn Ads", "GA4", "Tailwind"],
    featuresDelivered: [
      "High-converting B2B landing pages (42% lift)",
      "High-intent keyword SEO cluster strategy",
      "Granular attribution & pipeline tracking",
      "Automated lead enrichment & CRM sync",
    ],
    liveLink: "https://www.rapidtechlabs.in/contact",
  },
  {
    title: "Volton Robotics Global Portal",
    industry: "Industrial Automation & Robotics",
    image: dev,
    description:
      "Full-cycle MVP to enterprise scale development of an industrial robotics telemetry portal serving clients across 14 countries.",
    result: "Scalable platform running 99.99% uptime across 14 countries",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    featuresDelivered: [
      "Live robot telemetry & anomaly detection alerts",
      "Multi-tenant customer administration portal",
      "Automated firmware update scheduling",
      "Enterprise REST API for client integrations",
    ],
    liveLink: "https://www.rapidtechlabs.in/contact",
  },
];

export const pricingPackages = {
  websiteDevelopment: [
    {
      name: "Starter Business",
      priceUSD: "$799",
      priceINR: "₹65,000",
      description:
        "Ideal for growing businesses, startups, and service firms seeking a high-converting digital presence.",
      popular: false,
      features: [
        "Up to 5 Custom-Designed Responsive Pages",
        "Mobile-First, High-Performance Architecture",
        "Lead Capture Enquiry Form & WhatsApp Integration",
        "On-Page SEO Optimization & Google Indexing",
        "SSL Certificate & Cloudflare Security Setup",
        "Social Media & Google Map Integration",
        "30-Day Post-Launch Support & Warranty",
      ],
      ctaText: "Choose Starter",
      serviceCode: "website-starter",
    },
    {
      name: "Growth Professional",
      priceUSD: "$1,899",
      priceINR: "₹1,55,000",
      description:
        "Our most popular package for established companies demanding premium design, speed, and sales conversions.",
      popular: true,
      features: [
        "Up to 12 Custom-Designed Pages & Sub-services",
        "High-Converting Landing Pages with A/B CRO Layouts",
        "Content Management System (CMS) Integration",
        "Interactive Pricing / Portfolio Showcases",
        "Core Web Vitals 90+ Speed Guarantee",
        "Advanced Lead Generation & CRM / Email Integration",
        "Google Analytics 4 & Meta Pixel Setup",
        "60-Day Post-Launch Support & Warranty",
      ],
      ctaText: "Choose Growth Pro",
      serviceCode: "website-growth",
    },
    {
      name: "Enterprise Custom",
      priceUSD: "$3,499+",
      priceINR: "₹2,85,000+",
      description:
        "Full-scale digital platforms, bespoke web applications, dynamic customer portals, and e-commerce.",
      popular: false,
      features: [
        "Unlimited Pages & Scalable Architecture",
        "Custom Backend, APIs & Database Engineering",
        "User Authentication & Client Self-Service Portal",
        "Multi-Currency Payment Gateway Integration",
        "Custom Workflow Automation & Third-Party APIs",
        "Rigorous Security Hardening & Penetration Testing",
        "Dedicated Engineering Pod & Weekly Sprints",
        "90-Day VIP Dedicated Post-Launch SLA",
      ],
      ctaText: "Request Enterprise Quote",
      serviceCode: "website-enterprise",
    },
  ],
  seoAndMarketing: [
    {
      name: "SEO Foundation",
      priceUSD: "$499/mo",
      priceINR: "₹40,000/mo",
      description:
        "Essential technical SEO, keyword optimization, and continuous ranking improvements.",
      popular: false,
      features: [
        "Complete Technical Site Health Audit",
        "Target Keyword Strategy (Up to 15 Keywords)",
        "On-Page Optimization & Meta Tag Tuning",
        "Google Search Console & GA4 Optimization",
        "Broken Link & Redirect Remediation",
        "Monthly Ranking & Traffic Audit Report",
      ],
      ctaText: "Start SEO Foundation",
      serviceCode: "seo-foundation",
    },
    {
      name: "Growth Accelerator",
      priceUSD: "$999/mo",
      priceINR: "₹80,000/mo",
      description:
        "High-impact combination of technical SEO, content clusters, and high-authority link acquisition.",
      popular: true,
      features: [
        "Up to 35 High-Intent Target Keywords",
        "Content Marketing & SEO Blog Publishing (4/mo)",
        "High-Authority Backlink Outreach Campaign",
        "Competitor Keyword Gap & Backlink Analysis",
        "Conversion Rate Optimization (CRO) Recommendations",
        "Bi-Weekly Strategy Calls & Custom Dashboard",
      ],
      ctaText: "Accelerate Growth",
      serviceCode: "growth-accelerator",
    },
  ],
  maintenancePlans: [
    {
      name: "Standard Care",
      priceUSD: "$199/mo",
      priceINR: "₹15,000/mo",
      description:
        "Essential security, daily backups, and ongoing uptime monitoring for peace of mind.",
      popular: false,
      features: [
        "24/7 Automated Uptime Monitoring",
        "Daily Cloud Backups with 1-Click Restore",
        "Security Scanning & Vulnerability Patching",
        "Plugin, CMS & Framework Updates",
        "3 Hours of Content / Design Edits Monthly",
        "Email & Ticketing Support (24h SLA)",
      ],
      ctaText: "Select Standard",
      serviceCode: "maint-standard",
    },
    {
      name: "Proactive 24/7 SLA",
      priceUSD: "$499/mo",
      priceINR: "₹40,000/mo",
      description:
        "Dedicated developer hours, emergency priority hotline, speed optimization, and ongoing enhancements.",
      popular: true,
      features: [
        "99.9% Uptime Guarantee with Instant Alerts",
        "Real-Time Security Firewall & DDoS Mitigation",
        "10 Hours of Dedicated Developer Time Monthly",
        "Quarterly Core Web Vitals Performance Audit",
        "Staging Environment & Safe Updates Testing",
        "Priority Hotline Support (< 2h Urgent SLA)",
      ],
      ctaText: "Select Proactive SLA",
      serviceCode: "maint-proactive",
    },
  ],
};

export const softwareProduct = {
  name: "DocuGen Engine by RapidTechLabs",
  badge: "Proprietary Software Product",
  tagline: "Automated Document, Invoice & Proposal Generation Platform",
  overview:
    "DocuGen is our high-speed, enterprise-grade document automation platform. It allows businesses to automatically generate pixel-perfect PDFs, commercial invoices, custom proposals, quotations, and contracts from data or CRM triggers in milliseconds.",
  highlights: [
    {
      title: "Lightning-Fast PDF Engine",
      description:
        "Generate 1,000+ formatted PDF invoices or proposals per minute with sub-second latency.",
    },
    {
      title: "Smart Document Templates",
      description:
        "Design branded templates once in visual HTML/CSS; populate with dynamic customer data.",
    },
    {
      title: "Automated Invoicing & Quotes",
      description:
        "One-click generation of GST/VAT compliant invoices, commercial quotes, and pro-forma bills.",
    },
    {
      title: "Proposal & Contract Workflows",
      description:
        "Generate comprehensive client proposals complete with itemized scopes, terms, and digital acceptance.",
    },
    {
      title: "Customer Ledger & Management",
      description:
        "Keep client records, billing histories, and outstanding payment records organized in one hub.",
    },
    {
      title: "Complete Document Audit History",
      description:
        "Every generated document is versioned, timestamped, archived, and securely downloadable.",
    },
  ],
  pricing: [
    {
      tier: "Starter Cloud",
      priceUSD: "$49/mo",
      priceINR: "₹3,999/mo",
      docs: "Up to 1,000 documents / month",
      features: [
        "Standard Invoice & Quote Templates",
        "PDF Export & Email Dispatch",
        "API & Webhook Trigger Support",
        "Community & Email Support",
      ],
    },
    {
      tier: "Business Pro",
      priceUSD: "$149/mo",
      priceINR: "₹11,999/mo",
      popular: true,
      docs: "Up to 10,000 documents / month",
      features: [
        "Custom Branded Template Builder",
        "Multi-Currency & Automatic Tax Rules",
        "Client Ledger & Document History",
        "Priority API Support & Webhooks",
      ],
    },
    {
      tier: "Dedicated Enterprise",
      priceUSD: "Custom",
      priceINR: "Custom",
      docs: "Unlimited documents / on-premise",
      features: [
        "Self-Hosted Docker Deployment",
        "Dedicated Private Cloud Instance",
        "Custom ERP / CRM Connectors",
        "24/7 Enterprise SLA Support",
      ],
    },
  ],
};

export const agencyPartnership = {
  eyebrow: "White-Label Partner Program",
  title: "A Trusted Technical Development Partner for Digital Agencies",
  subtitle:
    "Scale your agency's capacity without increasing in-house payroll. We serve as the discreet, high-caliber engineering backbone for agencies across the USA, UK, Canada, and Australia.",
  capabilities: [
    {
      title: "100% White-Label Delivery",
      description:
        "We work invisibly behind your brand. All code, staging URLs, emails, and commits reflect your agency identity.",
    },
    {
      title: "Strict Mutual NDA & IP Protection",
      description:
        "We sign enforceable non-disclosure agreements before reviewing project scopes. You own 100% of the intellectual property.",
    },
    {
      title: "Dedicated Senior Engineering Pods",
      description:
        "No junior freelancers. You get dedicated, seasoned full-stack engineers embedded into your Slack, Jira, or ClickUp.",
    },
    {
      title: "Predictable Agency Margins",
      description:
        "Fixed-price milestone estimates and competitive hourly retainer packages enable your agency to achieve 40%–60% gross profit margins.",
    },
    {
      title: "Time-Zone Overlap & Rapid Turnaround",
      description:
        "Follow-the-sun workflow: brief us during your evening, wake up to completed pull requests and deployed staging builds.",
    },
    {
      title: "Versatile Stack Coverage",
      description:
        "From custom React/Next.js web apps and Shopify Plus to WordPress, .NET backends, and headless APIs.",
    },
  ],
  targetRegions: ["United States", "United Kingdom", "Canada", "Australia", "Europe"],
};

export const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Global Clients" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24/7", label: "Engineering Support" },
];

export const testimonials = [
  {
    name: "Anita Sharma",
    role: "COO, Meridian Manufacturing",
    quote:
      "RapidTechLabs delivered our ERP rollout 40% faster than projected. The platform has become the operating system for our factories.",
  },
  {
    name: "Dr. Rajiv Menon",
    role: "Director, Northcare Hospitals",
    quote:
      "Our HMS rollout across 6 hospitals was seamless. Patient wait times dropped 28% and billing accuracy is near-perfect.",
  },
  {
    name: "Sofia Alvarez",
    role: "Principal, Brightline Institute",
    quote:
      "Parents and teachers love the new system. Administration is finally paperless and data-driven.",
  },
  {
    name: "Marcus Lee",
    role: "CTO, FinPivot",
    quote:
      "Their AI integration team shipped a production-grade copilot in 9 weeks. Best engineering partner we've worked with.",
  },
  {
    name: "Emily Carter",
    role: "VP Marketing, Loomstack",
    quote:
      "Inbound leads doubled in one quarter. The team is sharp, data-obsessed, and a joy to collaborate with.",
  },
  {
    name: "Hiroshi Tanaka",
    role: "Founder, Volton Robotics",
    quote:
      "From MVP to scale, RapidTechLabs has been our extended engineering team. Premium quality, every sprint.",
  },
];

export const faqs = [
  {
    category: "Pricing & Engagement",
    q: "How do you price your web and software development engagements?",
    a: "We offer three transparent commercial models: 1) Fixed-Scope Milestone Pricing for projects with defined requirements; 2) Monthly Dedicated Engineering Squads for fast-growing companies and agencies; and 3) Flexible Time & Materials for evolving software projects. Discovery consultations and detailed quotation breakdowns are 100% free.",
  },
  {
    category: "International Delivery",
    q: "How do you collaborate with clients across USA, UK, Canada, and Australia?",
    a: "We are a remote-first international team with daily overlapping business hours across North American, European, and Australian timezones. We communicate seamlessly via Slack, Microsoft Teams, Zoom, or Google Meet, provide weekly staging demos, and track progress transparently in Jira or ClickUp.",
  },
  {
    category: "Quality & Security",
    q: "Do you sign non-disclosure agreements (NDAs) and transfer 100% code ownership?",
    a: "Yes, absolutely. We sign mutual NDAs before any sensitive project details are discussed. Upon project completion and final milestone clearance, 100% of source code, intellectual property (IP), and design assets are formally transferred to you with zero vendor lock-in.",
  },
  {
    category: "Timelines & Delivery",
    q: "What does a typical project timeline look like from kick-off to launch?",
    a: "Corporate websites and conversion-focused landing pages typically ship in 2 to 4 weeks. Custom web applications and MVP software products average 6 to 10 weeks. Large enterprise ERP and hospital platform rollouts span 3 to 6 months depending on module complexity.",
  },
  {
    category: "Support & Maintenance",
    q: "What post-launch support and warranty do you provide?",
    a: "Every project includes a 30-to-90-day post-launch warranty covering bug fixes and technical adjustments at no extra charge. We also offer ongoing monthly maintenance and SLA plans that include 24/7 uptime monitoring, security patching, cloud backups, and dedicated developer hours.",
  },
  {
    category: "Agency Partnerships",
    q: "How does your white-label agency partnership work?",
    a: "We act as your behind-the-scenes engineering team. We work strictly under your agency brand, using your email domains, client dashboards, and Git repositories. We never solicit your clients or reveal our involvement without your explicit permission.",
  },
  {
    category: "Software Products",
    q: "Can we try a live demo or pilot RapidTechLabs' DocuGen software?",
    a: "Yes! You can explore an interactive demo directly on our website or schedule a 15-minute guided walkthrough with our technical team. We also offer 14-day risk-free pilot trials for qualified enterprise teams.",
  },
];
