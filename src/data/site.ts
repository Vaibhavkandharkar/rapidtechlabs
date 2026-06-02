import {
  Factory, GraduationCap, HeartPulse, Code2, BrainCircuit, Megaphone,
  type LucideIcon
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
  icon: LucideIcon;
  image: string;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "industrial-erp",
    title: "Industrial ERP",
    short: "End-to-end ERP for manufacturing operations.",
    description: "Streamline production, inventory, procurement, and finance with a modular ERP built for industrial scale.",
    icon: Factory,
    image: industrial,
    features: ["Production planning", "Inventory & BOM", "Procurement", "Real-time KPIs"],
  },
  {
    slug: "institute-management",
    title: "Institute Management System",
    short: "Unified platform for modern educational institutes.",
    description: "Admissions, attendance, grading, fees and parent portals — all under one elegant system.",
    icon: GraduationCap,
    image: education,
    features: ["Admissions & CRM", "Attendance & LMS", "Fee management", "Parent portal"],
  },
  {
    slug: "hospital-management",
    title: "Hospital Management System",
    short: "HIPAA-aware platform for hospitals & clinics.",
    description: "OPD, IPD, lab, pharmacy and billing on a secure, scalable architecture.",
    icon: HeartPulse,
    image: healthcare,
    features: ["EHR & OPD/IPD", "Lab & pharmacy", "Billing & insurance", "Telemedicine"],
  },
  {
    slug: "mvc-product-development",
    title: "MVC Product Development",
    short: "Custom MVC products engineered for scale.",
    description: "From architecture to deployment, we ship maintainable MVC applications with first-class DX.",
    icon: Code2,
    image: dev,
    features: ["Architecture & design", "API engineering", "Cloud deployment", "Long-term support"],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    short: "Embed AI into your workflows and products.",
    description: "RAG, copilots, document intelligence and predictive analytics, tailored to your domain.",
    icon: BrainCircuit,
    image: ai,
    features: ["RAG & copilots", "Document AI", "Predictive analytics", "Model evaluation"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Performance marketing that drives qualified pipeline.",
    description: "SEO, paid acquisition, content and lifecycle marketing aligned with your revenue goals.",
    icon: Megaphone,
    image: marketing,
    features: ["SEO & content", "Paid acquisition", "Lifecycle automation", "Analytics & CRO"],
  },
];

export const industries = [
  { name: "Manufacturing", icon: Factory },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "FinTech", icon: Code2 },
  { name: "Retail & eCommerce", icon: Megaphone },
  { name: "SaaS & Startups", icon: BrainCircuit },
];

export const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", ".NET", "Python",
  "PostgreSQL", "MongoDB", "AWS", "Azure", "Docker", "Kubernetes",
  "TensorFlow", "OpenAI", "LangChain", "Tailwind",
];

export const testimonials = [
  { name: "Anita Sharma", role: "COO, Meridian Manufacturing", quote: "RapidTechLabs delivered our ERP rollout 40% faster than projected. The platform has become the operating system for our factories." },
  { name: "Dr. Rajiv Menon", role: "Director, Northcare Hospitals", quote: "Our HMS rollout across 6 hospitals was seamless. Patient wait times dropped 28% and billing accuracy is near-perfect." },
  { name: "Sofia Alvarez", role: "Principal, Brightline Institute", quote: "Parents and teachers love the new system. Administration is finally paperless and data-driven." },
  { name: "Marcus Lee", role: "CTO, FinPivot", quote: "Their AI integration team shipped a production-grade copilot in 9 weeks. Best engineering partner we've worked with." },
  { name: "Emily Carter", role: "VP Marketing, Loomstack", quote: "Inbound leads doubled in one quarter. The team is sharp, data-obsessed, and a joy to collaborate with." },
  { name: "Hiroshi Tanaka", role: "Founder, Volton Robotics", quote: "From MVP to scale, RapidTechLabs has been our extended engineering team. Premium quality, every sprint." },
];

export const caseStudies = [
  { title: "Meridian Manufacturing", tag: "Industrial ERP", image: industrial, result: "+32% throughput, 40% faster rollout" },
  { title: "Northcare Hospitals", tag: "Hospital Management", image: healthcare, result: "-28% patient wait times across 6 sites" },
  { title: "Brightline Institute", tag: "Institute Management", image: education, result: "100% paperless operations in 90 days" },
  { title: "FinPivot Copilot", tag: "AI Integration", image: ai, result: "Production AI copilot in 9 weeks" },
  { title: "Loomstack Growth", tag: "Digital Marketing", image: marketing, result: "2× inbound leads in one quarter" },
  { title: "Volton Robotics", tag: "MVC Product Dev", image: dev, result: "MVP → scale across 14 countries" },
];

export const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Global Clients" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24/7", label: "Engineering Support" },
];

export const faqs = [
  { q: "How do you price engagements?", a: "We offer fixed-scope, time & materials, and dedicated-team models. Pricing depends on scope, timeline and team composition — discovery calls are free." },
  { q: "Do you sign NDAs and DPAs?", a: "Yes. We sign mutual NDAs upfront, and DPAs for any project that processes personal data. Security and compliance are baseline expectations for us." },
  { q: "Which industries do you specialize in?", a: "Manufacturing, healthcare, education, fintech, SaaS and retail are our core verticals — but our engineering practice is general-purpose." },
  { q: "Can you augment our existing team?", a: "Absolutely. We offer dedicated engineers and squads that embed with your team using your tooling and rituals." },
  { q: "What does a typical timeline look like?", a: "Discovery is 1–2 weeks, MVPs ship in 6–10 weeks, and enterprise rollouts run 3–9 months depending on scope." },
];
