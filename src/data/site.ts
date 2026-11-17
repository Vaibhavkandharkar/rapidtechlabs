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
    short: "High-performance, conversion-focused websites engineered for modern businesses.",
    description:
      "We build blazing-fast, mobile-responsive, SEO-ready corporate websites, web applications, and landing pages that turn visitors into qualified leads and paying customers.",
    businessBenefits: [
      "Boost conversion rates with CRO-optimized layouts",
      "Sub-second loading times improving Google search rank & user retention",
      "100% responsive across smartphones, tablets, laptops, and ultra-wide screens",
      "Enterprise security, SSL configuration, and clean accessible code",
    ],
    icon: Globe,
    image: dev,
    features: [
      "Custom React & Next.js Websites",
      "Headless CMS & WordPress",
      "Mobile-First Responsive Layouts",
      "Performance & Core Web Vitals Optimization",
    ],
    deliverables: [
      "Custom UI/UX Design in Figma",
      "Full-Stack Development & Testing",
      "On-Page SEO & Analytics Setup",
      "Post-Launch Warranty & Handover",
    ],
    techUsed: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WordPress", "Node.js"],
    category: "development",
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    short: "Bespoke SaaS, cloud platforms, and internal business systems built to scale.",
    description:
      "End-to-end software engineering from architecture design to cloud deployment. We build scalable SaaS products, multi-tenant portals, workflow automation tools, and robust APIs.",
    businessBenefits: [
      "Replace fragmented spreadsheets with a single, secure automated workflow",
      "Full intellectual property (IP) and 100% source code ownership",
      "Scalable cloud architecture that grows seamlessly with your transaction volume",
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
    techUsed: ["TypeScript", "Node.js", "Python", ".NET Core", "PostgreSQL", "AWS / Azure"],
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
      "Multi-currency, GST, and statutory compliance out of the box",
    ],
    icon: Factory,
    image: industrial,
    features: [
      "Production planning & MRP",
      "Inventory & BOM management",
      "Procurement & vendor portals",
      "Real-time KPIs & IoT telemetry",
    ],
    deliverables: [
      "Factory Workflow Audit",
      "Custom Module Tailoring",
      "Legacy Data Migration",
      "Admin & Operator Training",
    ],
    techUsed: [".NET Core", "React", "PostgreSQL", "Docker", "Redis", "Azure"],
    category: "enterprise",
  },
  {
    slug: "hospital-management",
    title: "Hospital & Clinic Management",
    short: "Comprehensive digital healthcare platforms for modern hospitals & clinics.",
    description:
      "Complete healthcare management including OPD, IPD, electronic health records (EHR), laboratory diagnostics, pharmacy inventory, and automated patient billing.",
    businessBenefits: [
      "Cut patient wait times through digital check-ins & queue management",
      "Tamper-proof digital patient health records & test histories",
      "Eliminate billing discrepancies with insurance integration and auto-claims",
      "Strict data encryption and role-based access safeguards",
    ],
    icon: HeartPulse,
    image: healthcare,
    features: [
      "EHR & OPD/IPD workflows",
      "Laboratory & pharmacy management",
      "Billing, claims & insurance integration",
      "Doctor schedule & telemedicine portals",
    ],
    deliverables: [
      "Role-Based Access Control Setup",
      "Department-Wise Rollout Plan",
      "Patient Portal & Staff Training",
      "Guaranteed Incident Support SLA",
    ],
    techUsed: ["React", "Node.js", "PostgreSQL", "WebRTC", "Docker", "AWS"],
    category: "enterprise",
  },
  {
    slug: "institute-management",
    title: "Institute Management System",
    short: "Unified ERP platform for universities, schools, colleges, and academies.",
    description:
      "End-to-end academic management covering student admissions, fee collections, biometric attendance, learning management (LMS), and interactive parent-teacher communication.",
    businessBenefits: [
      "Paperless administration and digital fee collection",
      "Instant WhatsApp & SMS notifications for attendance & fee dues",
      "Automated grade cards, report generation, and student performance tracking",
      "Centralized multi-campus administration from a single dashboard",
    ],
    icon: GraduationCap,
    image: education,
    features: [
      "Admissions & student CRM",
      "Attendance, timetable & LMS",
      "Fee collection & online payment gateway",
      "Parent & student portal",
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
      "Reduce checkout abandonment with streamlined payment flows",
      "Automated inventory sync with accounting, ERP, and shipping providers",
      "Advanced product filters, search recommendations, and upselling widgets",
      "Optimized for seasonal sale traffic peaks",
    ],
    icon: ShoppingCart,
    image: marketing,
    features: [
      "Shopify & WooCommerce Setup",
      "Custom Headless Storefronts",
      "Multi-Currency & Tax Automation",
      "Payment & Courier API Integrations",
    ],
    deliverables: [
      "Conversion-Optimized Store Theme",
      "Catalog Setup & Migration",
      "Payment Gateway Integration",
      "Analytics & Cart Recovery Setup",
    ],
    techUsed: ["Shopify Liquid", "Next.js Commerce", "Razorpay / Stripe", "Tailwind CSS"],
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
      "Instant 2-way data sync between CRM, Google Workspace, and accounting",
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
      "Automate repetitive tier-1 customer inquiries with verified AI agents",
      "Extract structured data from unstructured contracts, PDFs, and invoices instantly",
      "Private AI deployments that protect your intellectual property and customer data",
      "Personalized recommendations that increase customer lifetime value",
    ],
    icon: BrainCircuit,
    image: ai,
    features: [
      "Custom RAG Knowledge Bases",
      "Proprietary AI Chatbots & Copilots",
      "Intelligent Document Processing (IDP)",
      "Predictive Analytics & Reports",
    ],
    deliverables: [
      "Custom Vector Database Setup",
      "Fine-Tuned Prompts & Safeguards",
      "Embedded UI Copilot Widget",
      "Evaluation & Output Verification",
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
      "Target decision-makers across national and international markets",
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
    short: "Build organic search authority and visibility for commercial keywords.",
    description:
      "Technical SEO audits, on-page optimization, content cluster strategy, ethical backlink outreach, and local/national search optimization following Google Webmaster guidelines.",
    businessBenefits: [
      "Attract sustainable, organic high-intent business leads 24/7 without ad spend",
      "Improve visibility for core commercial keywords in target geographic markets",
      "Eliminate technical crawl errors, broken links, and slow Core Web Vitals",
      "Build long-term domain authority and brand credibility in Google search",
    ],
    icon: Search,
    image: marketing,
    features: [
      "Comprehensive Technical SEO Audits",
      "Keyword Research & Content Mapping",
      "On-Page Metadata & Schema Optimization",
      "Ethical Authority Outreach & Content Strategy",
    ],
    deliverables: [
      "Full Technical Audit Report",
      "Keyword Strategy & Ranking Roadmap",
      "Schema & Rich Snippet Implementation",
      "Monthly Keyword Ranking Reports",
    ],
    techUsed: ["Google Search Console", "GA4", "Ahrefs / SEMrush", "Screaming Frog", "Schema.org"],
    category: "growth",
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance & Support",
    short: "Proactive uptime monitoring, security patching, and ongoing updates.",
    description:
      "Reliable maintenance plans for businesses that value uptime and security. Includes automated backups, security scans, plugin updates, speed audits, and minor design/content edits.",
    businessBenefits: [
      "High uptime guarantee with automated incident alerts",
      "Zero risk of data loss with automated daily cloud backups & 1-click restore",
      "Protection against malicious attacks, malware, and framework vulnerabilities",
      "Dedicated developer hours every month for content and design edits",
    ],
    icon: Wrench,
    image: industrial,
    features: [
      "Uptime & Performance Monitoring",
      "Daily Cloud Backups & Restore",
      "Security Hardening & Malware Scans",
      "Dedicated Monthly Developer Hours",
    ],
    deliverables: [
      "Monthly Health & Security Report",
      "Guaranteed SLA Response Time",
      "Software & Plugin Version Updates",
      "Priority Incident Support",
    ],
    techUsed: ["AWS S3", "Cloudflare", "GitHub Actions", "Uptime Monitoring", "Sentry"],
    category: "development",
  },
  {
    slug: "mvc-product-development",
    title: "MVC Product Engineering",
    short: "Robust enterprise web applications built with clean architecture.",
    description:
      "From database schema design to containerized cloud deployments, we ship clean, maintainable Model-View-Controller applications engineered for reliability and high throughput.",
    businessBenefits: [
      "Modular codebases that allow new features to ship faster",
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
      "Structured SLA Engineering Support",
    ],
    techUsed: ["React", "TypeScript", ".NET Core", "Node.js", "Docker", "PostgreSQL"],
    category: "development",
  },
];

export const industries = [
  {
    name: "Healthcare",
    icon: HeartPulse,
    summary:
      "Secure digital health platforms, EHR/EMR, OPD/IPD workflows, and clinic booking systems.",
    solutions: [
      "Electronic Health Records (EHR)",
      "Automated OPD/IPD workflows",
      "Telemedicine video consultations",
      "Insurance claims & lab tracking",
    ],
    metric: "Streamlined patient queue management",
  },
  {
    name: "Real Estate",
    icon: Building2,
    summary:
      "Interactive property portals, broker CRMs, virtual tour integrations, and lead automation.",
    solutions: [
      "Property listing & search portals",
      "Automated buyer & tenant lead qualification",
      "Virtual tour & floor plan viewers",
      "Mortgage & EMI calculation widgets",
    ],
    metric: "Faster lead response time",
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
    metric: "100% paperless administration workflows",
  },
  {
    name: "Manufacturing & Industrial",
    icon: Factory,
    summary:
      "Production planning, bill-of-materials (BOM), raw material procurement, and shop-floor tracking.",
    solutions: [
      "Modular Industrial ERP systems",
      "Shop-floor machine utilization tracking",
      "Multi-warehouse inventory tracking",
      "Automated vendor procurement orders",
    ],
    metric: "Optimized production throughput",
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
    metric: "Frictionless mobile checkout",
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
    metric: "On-schedule milestone tracking",
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
    metric: "Eliminated repetitive manual documentation",
  },
  {
    name: "Startups & SaaS",
    icon: Rocket,
    summary: "Rapid MVP product development, multi-tenant cloud architecture, and AI copilots.",
    solutions: [
      "Fast 6-to-8 week MVP build & launch",
      "Stripe / Razorpay subscription billing",
      "Multi-tenant cloud architecture",
      "Custom AI copilot integrations",
    ],
    metric: "6 weeks average MVP turnaround",
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
      "We design around your target audience and commercial objectives to deliver measurable business ROI.",
  },
  {
    icon: Terminal,
    title: "Modern, Scalable Technologies",
    description:
      "Built with React, Next.js, TypeScript, .NET Core, Python, and cloud infrastructure engineered for longevity.",
  },
  {
    icon: Zap,
    title: "High-Performance Architecture",
    description:
      "Sub-second page speeds, high availability, and clean responsive code capable of supporting enterprise traffic.",
  },
  {
    icon: Compass,
    title: "Transparent Communication",
    description:
      "Direct communication with developers, bi-weekly live sprint demos, real-time Slack/WhatsApp updates, and no surprises.",
  },
  {
    icon: Shield,
    title: "Rigorous Quality Assurance",
    description:
      "Manual edge-case verification, cross-browser compatibility, and deep security audits before every release.",
  },
  {
    icon: Clock,
    title: "Dedicated Support & Defined SLAs",
    description:
      "Post-launch warranty, defined response times during covered hours, proactive security patching, and updates.",
  },
  {
    icon: Globe,
    title: "National & International Delivery",
    description:
      "Reliable track record delivering projects for Indian enterprises, SMBs, and international agencies.",
  },
];

export const developmentProcess = [
  {
    step: "01",
    title: "Discovery & Strategy",
    duration: "Week 1",
    description:
      "We analyze your business goals, target audience, competitive landscape, and technical requirements to draft a precise scope of work.",
    deliverable: "Project Roadmap & Scope Specification",
  },
  {
    step: "02",
    title: "UI/UX & Prototyping",
    duration: "Week 2 - 3",
    description:
      "Our designers craft modern Figma mockups focusing on intuitive user journeys, accessibility, and high conversion rates.",
    deliverable: "Interactive Figma Prototype & Design System",
  },
  {
    step: "03",
    title: "Agile Development Sprints",
    duration: "Weeks 4 - 8",
    description:
      "Engineers build front-end and back-end logic in bi-weekly sprints, keeping you updated with live staging previews.",
    deliverable: "Live Staging Environment & Sprint Demos",
  },
  {
    step: "04",
    title: "QA, Security & Performance Audits",
    duration: "Week 9",
    description:
      "Rigorous automated and manual testing covering cross-device responsiveness, Core Web Vitals, and security headers.",
    deliverable: "QA Test Matrix & Deployment Sign-off",
  },
  {
    step: "05",
    title: "Deployment & SLA Support",
    duration: "Week 10+",
    description:
      "Production launch with DNS configuration, analytics setup, complete code handover, and ongoing maintenance coverage.",
    deliverable: "Production Handover & 100% Code Ownership",
  },
];

export const caseStudies = [
  {
    title: "Meridian Manufacturing ERP",
    industry: "Industrial Manufacturing",
    image: industrial,
    description:
      "Modular ERP platform connecting production planning, inventory tracking, raw material procurement, and accounting across multi-plant manufacturing operations.",
    result: "Demonstration Case: Streamlined shop-floor reporting and automated BOM calculation",
    technologies: [".NET Core", "React", "PostgreSQL", "Docker", "Redis"],
    featuresDelivered: [
      "Real-time Bill of Materials (BOM) calculation",
      "Automated procurement purchase orders",
      "Shop-floor machine telemetry dashboard",
      "Multi-plant financial consolidation",
    ],
    liveLink: "/contact",
  },
  {
    title: "Northcare Hospitals Management",
    industry: "Healthcare & Clinics",
    image: healthcare,
    description:
      "Clinical and administrative management ecosystem unifying electronic medical records, laboratory diagnostics, and patient billing.",
    result:
      "Demonstration Case: Centralized OPD/IPD queue management & paperless diagnostic records",
    technologies: ["React", "Node.js", "PostgreSQL", "WebRTC", "AWS"],
    featuresDelivered: [
      "Digital patient check-in kiosk & queue display",
      "Integrated OPD/IPD electronic medical records",
      "Automated pharmacy stock alerts",
      "Standard billing and insurance claim workflows",
    ],
    liveLink: "/contact",
  },
  {
    title: "Brightline Institute Cloud Platform",
    industry: "Higher Education",
    image: education,
    description:
      "Modern academic management software replacing legacy paper workflows with digital admissions, fee collections, attendance, and parent communication.",
    result: "Demonstration Case: 100% digital fee receipts & biometric attendance notifications",
    technologies: ["Next.js", "TypeScript", "Python", "Tailwind CSS"],
    featuresDelivered: [
      "Online student admission & document verification",
      "Automated fee receipts & gateway integration",
      "Biometric attendance sync with parent alerts",
      "Digital student report cards & grading rubrics",
    ],
    liveLink: "/contact",
  },
  {
    title: "FinPivot AI Copilot & Analytics",
    industry: "FinTech & SaaS",
    image: ai,
    description:
      "Enterprise generative AI copilot built on custom RAG architecture that allows analysts to query complex document repositories in natural language.",
    result: "Demonstration Case: Production RAG pipeline with sub-2-second document intelligence",
    technologies: ["OpenAI API", "Python", "FastAPI", "Pinecone", "React"],
    featuresDelivered: [
      "Document intelligence over financial reports",
      "Natural language business query engine",
      "Role-based enterprise data safeguards",
      "Sub-2-second vector search response",
    ],
    liveLink: "/contact",
  },
  {
    title: "Loomstack B2B Growth Engine",
    industry: "Digital Marketing & CRO",
    image: marketing,
    description:
      "Comprehensive SEO audit, landing page CRO redesign, and multi-channel Google/LinkedIn acquisition funnels for B2B services.",
    result: "Demonstration Case: Conversion-optimized landing page structure and search visibility",
    technologies: ["Next.js", "Google Ads", "LinkedIn Ads", "GA4", "Tailwind"],
    featuresDelivered: [
      "High-converting B2B landing pages",
      "High-intent keyword SEO cluster strategy",
      "Attribution & pipeline tracking setup",
      "Automated lead capture & CRM notification",
    ],
    liveLink: "/contact",
  },
  {
    title: "Volton Robotics Global Portal",
    industry: "Industrial Automation & Robotics",
    image: dev,
    description:
      "Telemetry dashboard and multi-tenant portal for connected industrial automation machinery with anomaly alerts.",
    result:
      "Demonstration Case: High-availability telemetry portal with real-time websocket monitoring",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    featuresDelivered: [
      "Machine telemetry & anomaly detection alerts",
      "Multi-tenant customer administration portal",
      "Automated firmware update scheduling",
      "Enterprise REST API for client integrations",
    ],
    liveLink: "/contact",
  },
];

export const pricingPackages = {
  websiteDevelopment: [
    {
      name: "Launch Website",
      priceINR: "₹19,999",
      priceUSD: "$249",
      billingPeriod: "one-time",
      chargeType: "One-time investment",
      description:
        "Ideal for individuals, small businesses and startups looking for a fast, modern digital launch.",
      popular: false,
      recommended: false,
      features: [
        "Up to 3 responsive website pages",
        "Professional modern UI design",
        "Mobile-first responsive layout",
        "WhatsApp integration",
        "Contact and enquiry form",
        "Basic on-page SEO",
        "Google Maps integration",
        "SSL setup",
        "15-day post-launch support",
      ],
      ctaText: "Choose Launch",
      serviceCode: "website-launch",
    },
    {
      name: "Starter Business",
      priceINR: "₹39,999",
      priceUSD: "$499",
      billingPeriod: "one-time",
      chargeType: "One-time investment",
      description:
        "Ideal for growing businesses and professional service providers requiring strong brand presence.",
      popular: false,
      recommended: false,
      features: [
        "Up to 5 custom-designed responsive pages",
        "Mobile-first high-performance architecture",
        "Lead capture enquiry form and WhatsApp integration",
        "On-page SEO optimization",
        "Google indexing setup",
        "SSL and Cloudflare security configuration",
        "Social media integration",
        "Google Maps integration",
        "30-day post-launch support",
      ],
      ctaText: "Choose Starter",
      serviceCode: "website-starter",
    },
    {
      name: "Growth Professional",
      priceINR: "₹99,999",
      priceUSD: "$1,199",
      billingPeriod: "one-time",
      chargeType: "One-time investment",
      description:
        "Complete full-funnel digital presence engineered for aggressive lead generation and high conversion.",
      popular: true,
      recommended: false,
      badge: "MOST POPULAR",
      features: [
        "Up to 12 custom-designed pages",
        "Landing pages optimized for conversions",
        "CMS integration",
        "Dynamic portfolio and service showcases",
        "Performance optimization",
        "Google Analytics 4 and Meta Pixel integration",
        "Advanced lead generation",
        "CRM and email integration",
        "SEO-friendly architecture",
        "60-day post-launch support",
      ],
      ctaText: "Choose Growth Pro",
      serviceCode: "website-growth",
    },
    {
      name: "Enterprise Custom",
      priceINR: "Starting ₹3,50,000",
      priceUSD: "Starting $4,200",
      billingPeriod: "custom",
      chargeType: "Project-based milestone pricing",
      description:
        "For businesses requiring advanced digital platforms, custom software, portals, and complex integrations.",
      popular: false,
      recommended: false,
      features: [
        "Custom web applications",
        "Scalable backend and database architecture",
        "API development and third-party integrations",
        "Authentication and user management",
        "Customer dashboards and portals",
        "Payment gateway integration",
        "Custom workflow automation",
        "Security testing and hardening",
        "Dedicated development support",
        "Project-based milestones and SLA",
      ],
      ctaText: "Request Enterprise Quote",
      serviceCode: "website-enterprise",
      note: "Calculated according to custom project requirements",
    },
  ],
  seoAndMarketing: [
    {
      name: "SEO Foundation",
      priceINR: "₹19,999",
      priceUSD: "$249",
      billingPeriod: "monthly",
      chargeType: "Billed Monthly",
      description:
        "Essential technical health and local/national organic search visibility for steady organic traffic.",
      popular: false,
      recommended: false,
      features: [
        "Complete technical SEO audit",
        "Target keyword research up to 15 keywords",
        "On-page SEO optimization",
        "Meta title and description optimization",
        "Google Search Console setup",
        "Google Analytics 4 configuration",
        "Broken link analysis",
        "Monthly SEO performance report",
      ],
      ctaText: "Select SEO Foundation",
      serviceCode: "seo-foundation",
    },
    {
      name: "Growth Accelerator",
      priceINR: "₹49,999",
      priceUSD: "$599",
      billingPeriod: "monthly",
      chargeType: "Billed Monthly",
      description:
        "Comprehensive organic growth engine combining technical SEO, content clusters, and ethical authority outreach.",
      popular: false,
      recommended: true,
      badge: "RECOMMENDED",
      features: [
        "Target keyword strategy up to 35 keywords",
        "Four SEO-optimized articles per month",
        "Technical SEO improvements",
        "Content cluster development",
        "Ethical backlink outreach",
        "Competitor keyword analysis",
        "Conversion optimization recommendations",
        "Bi-weekly strategy meetings",
        "Monthly performance dashboard",
      ],
      ctaText: "Select Growth Accelerator",
      serviceCode: "growth-accelerator",
      disclaimer: "No artificial ranking guarantees; verified white-hat Google compliance.",
    },
  ],
  maintenancePlans: [
    {
      name: "Standard Care",
      priceINR: "₹5,999",
      priceUSD: "$75",
      billingPeriod: "monthly",
      chargeType: "Billed Monthly",
      description:
        "Essential website uptime monitoring, daily backups, and framework security updates for business continuity.",
      popular: false,
      recommended: false,
      features: [
        "Website uptime monitoring",
        "Daily automated backups",
        "Security monitoring",
        "CMS and framework updates",
        "Three hours of minor content/design changes",
        "Email support",
        "Standard response within one business day",
      ],
      ctaText: "Choose Standard Care",
      serviceCode: "maint-standard",
    },
    {
      name: "Proactive SLA",
      priceINR: "₹24,999",
      priceUSD: "$299",
      billingPeriod: "monthly",
      chargeType: "Billed Monthly",
      description:
        "Advanced uptime monitoring, security firewall, dedicated developer hours, and rapid incident response.",
      popular: true,
      recommended: false,
      badge: "HIGH AVAILABILITY",
      features: [
        "Advanced uptime monitoring",
        "Security firewall configuration",
        "Ten dedicated developer hours monthly",
        "Performance optimization",
        "Quarterly Core Web Vitals audit",
        "Staging environment",
        "Safe deployment and update testing",
        "Priority incident support",
        "Urgent incident response target within two hours during covered support hours",
      ],
      ctaText: "Select Proactive SLA",
      serviceCode: "maint-proactive",
    },
  ],
};

export const pricingTransparencyPoints = [
  "Website hosting and domain registration are separately quoted unless explicitly included.",
  "Third-party subscriptions, paid APIs, and commercial integrations are billed separately.",
  "Advertising budgets (Google/Meta ad spend) are not included in marketing management fees.",
  "GST is additional where applicable under Indian tax regulations.",
  "Custom requirements, additional revisions, or out-of-scope modules may affect the final quotation.",
  "All project deliverables, milestone dates, and revision limits will be defined in the formal proposal.",
];

export const softwareProduct = {
  name: "PaperGen by RapidTechLabs",
  shortName: "PaperGen",
  badge: "Proprietary Software Product — Live App",
  liveUrl: "https://paper-gen-five.vercel.app/",
  tagline: "Automated Question Paper, Exam Worksheet & Document Generation Platform",
  overview:
    "PaperGen is our intelligent document automation and generation platform developed by RapidTechLabs. Deployed live on the cloud, PaperGen empowers educational institutions, coaching academies, universities, and enterprises to effortlessly create, customize, and generate formatted question papers, tests, commercial invoices, proposals, and dynamic PDFs in seconds.",
  highlights: [
    {
      title: "Live Cloud Application",
      description:
        "Access paper-gen-five.vercel.app directly from any web browser without local installation requirements.",
    },
    {
      title: "Automated Paper & Document Creation",
      description:
        "Instantly compile structured question papers, test sheets, exam blueprints, and business documents.",
    },
    {
      title: "Dynamic Smart Templates",
      description:
        "Standardized academic and enterprise templates ready for customized headers, logos, and section rules.",
    },
    {
      title: "Fast Vectorized PDF Rendering",
      description:
        "Generate print-ready, high-resolution PDFs and downloadable worksheets with crisp typography.",
    },
    {
      title: "Document History & Versioning",
      description:
        "Maintain an organized archive of generated papers, invoices, and templates with instant re-download capabilities.",
    },
    {
      title: "Enterprise API & LMS Integration",
      description:
        "Connect PaperGen directly to your school LMS, institute ERP, or business management database.",
    },
  ],
  pricing: [
    {
      tier: "Starter Cloud",
      priceINR: "₹3,999/mo",
      priceUSD: "$49/mo",
      docs: "Up to 1,000 papers & documents / month",
      features: [
        "Standard Paper & Document Templates",
        "Instant Cloud Access via Vercel",
        "PDF Export & Watermark Controls",
        "Email Support within 1 business day",
      ],
    },
    {
      tier: "Business & Academy Pro",
      priceINR: "₹11,999/mo",
      priceUSD: "$149/mo",
      popular: true,
      docs: "Up to 10,000 papers & documents / month",
      features: [
        "Custom Branded Institution Templates",
        "Question Bank & Category Shuffling",
        "Multi-User Faculty / Staff Accounts",
        "Priority Technical Support & Webhooks",
      ],
    },
    {
      tier: "Dedicated Enterprise",
      priceINR: "Custom Quote",
      priceUSD: "Custom Quote",
      docs: "Unlimited generation / on-premise",
      features: [
        "Self-Hosted Docker or Private Cloud Deploy",
        "Custom LMS / ERP Deep Integration",
        "Role-Based Access & Security Audit",
        "Dedicated Engineering SLA",
      ],
    },
  ],
};

export const agencyPartnership = {
  eyebrow: "White-Label Partner Program",
  title: "A Trusted Technical Development Partner for Digital Agencies",
  subtitle:
    "Scale your agency's delivery capacity without increasing in-house payroll. We serve as the discreet, high-caliber engineering backbone for agencies across India, USA, UK, Canada, and Australia.",
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
        "No junior freelancers. You get seasoned full-stack engineers embedded into your Slack, Jira, or ClickUp.",
    },
    {
      title: "Predictable Agency Margins",
      description:
        "Fixed-price milestone estimates and competitive hourly retainer packages enable your agency to achieve strong gross profit margins.",
    },
    {
      title: "Follow-The-Sun Turnaround",
      description:
        "Collaborative workflow: brief us during your evening, review completed pull requests and deployed staging builds next day.",
    },
    {
      title: "Versatile Stack Coverage",
      description:
        "From custom React/Next.js web apps and Shopify to WordPress, .NET backends, and headless APIs.",
    },
  ],
  targetRegions: ["India", "United States", "United Kingdom", "Canada", "Australia"],
};

// Genuine operational commitments replacing unsupported numerical stats
export const stats = [
  { value: "100%", label: "Source Code Ownership" },
  { value: "Agile", label: "Bi-Weekly Sprint Demos" },
  { value: "< 24h", label: "Discovery Response Time" },
  { value: "SLA", label: "Defined Support Coverage" },
];

// Clearly labeled illustrative project references
export const testimonials = [
  {
    name: "Enterprise ERP Implementation",
    role: "Industrial Manufacturing Vertical",
    quote:
      "A modular ERP rollout replacing fragmented manual spreadsheets with structured production planning, inventory BOM calculation, and real-time shop-floor tracking.",
    type: "Demonstration Project Case Study",
  },
  {
    name: "Hospital & Diagnostic Platform",
    role: "Healthcare & Clinical Services",
    quote:
      "A HIPAA-aware hospital management ecosystem implemented across multi-specialty clinics, unifying electronic health records, diagnostic lab tests, and automated billing.",
    type: "Demonstration Project Case Study",
  },
  {
    name: "Academic Institute Management",
    role: "Higher Education Sector",
    quote:
      "Digital academic management software replacing legacy paper workflows with online student admissions, automated fee receipts, and parent communication.",
    type: "Demonstration Project Case Study",
  },
  {
    name: "B2B SaaS Growth Architecture",
    role: "Technology & Software Practice",
    quote:
      "Technical SEO foundation, Core Web Vitals optimization, and conversion-focused landing page engineering tailored to commercial B2B acquisition funnels.",
    type: "Demonstration Project Case Study",
  },
];

export const faqs = [
  {
    category: "Pricing & Engagement",
    q: "How do you price your web and software development engagements?",
    a: "We offer transparent commercial models: 1) Fixed-Scope Milestone Packages (Launch at ₹19,999, Starter Business at ₹39,999, Growth Professional at ₹99,999, and Custom Enterprise starting ₹3,50,000); 2) Monthly Retainers for SEO and ongoing Maintenance; and 3) Flexible Milestone-based Software Quotations. Discovery consultations and detailed scopes of work are 100% free.",
  },
  {
    category: "GST & Invoicing",
    q: "Are the listed prices inclusive of GST?",
    a: "Prices listed are exclusive of GST. Applicable GST (18%) is charged on formal tax invoices for Indian entities, with full Input Tax Credit (ITC) compliance. Domain registration, hosting, third-party paid APIs, and advertising budgets are billed separately.",
  },
  {
    category: "Quality & Security",
    q: "Do you sign non-disclosure agreements (NDAs) and transfer 100% code ownership?",
    a: "Yes, absolutely. We sign mutual NDAs before any sensitive project details are discussed. Upon project completion and final milestone clearance, 100% of source code, intellectual property (IP), and design assets are formally transferred to you with zero vendor lock-in.",
  },
  {
    category: "Timelines & Delivery",
    q: "What does a typical project timeline look like from kick-off to launch?",
    a: "Launch and Starter websites typically ship in 1 to 3 weeks. Growth Professional websites take 3 to 5 weeks. Custom software, complex portals, and enterprise ERP systems span 6 to 12 weeks depending on scope.",
  },
  {
    category: "Support & Maintenance",
    q: "What post-launch support and warranty do you provide?",
    a: "Every project includes a 15 to 60-day post-launch warranty covering bug fixes and technical adjustments at no extra charge. We also offer monthly maintenance plans (Standard Care at ₹5,999/mo and Proactive SLA at ₹24,999/mo) with guaranteed response times during covered business hours.",
  },
  {
    category: "Agency Partnerships",
    q: "How does your white-label agency partnership work?",
    a: "We act as your behind-the-scenes engineering team. We work strictly under your agency brand, using your email domains, client dashboards, and Git repositories. We never solicit your clients or reveal our involvement without your explicit permission.",
  },
  {
    category: "SEO Results",
    q: "Do you guarantee #1 ranking on Google for SEO services?",
    a: "No ethical agency can guarantee specific #1 positions because Google's algorithm evaluates hundreds of evolving signals. What we guarantee is rigorous, 100% white-hat technical SEO, high-intent keyword mapping, Core Web Vitals optimization, and high-quality content that steadily builds domain authority and organic visibility.",
  },
];
