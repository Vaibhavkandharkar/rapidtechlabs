import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Zap, ExternalLink } from "lucide-react";
import hero from "@/assets/hero.jpg";
import dashboard from "@/assets/dashboard.jpg";
import about from "@/assets/about.jpg";
import {
  services,
  stats,
  industries,
  techStack,
  caseStudies,
  faqs,
  testimonials,
  type Service,
} from "@/data/site";
import { Section } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  generateMeta,
  faqPageSchema,
  breadcrumbSchema,
  webPageSchema,
  softwareAppSchema,
  organizationSchema,
} from "@/lib/seo";

import { ProjectEnquiryForm } from "@/components/ProjectEnquiryForm";
import { WebsiteAuditSection } from "@/components/WebsiteAuditSection";
import { SoftwareProductSection } from "@/components/SoftwareProductSection";
import { AgencyPartnershipSection } from "@/components/AgencyPartnershipSection";
import { PricingSection } from "@/components/PricingSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { DevelopmentProcessSection } from "@/components/DevelopmentProcessSection";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/")({
  head: () =>
    generateMeta({
      title: "RapidTechLabs — Professional Web Development, Custom Software & Digital Agency",
      description:
        "High-performance website development, custom software engineering, ERP, and AI integration for growing businesses and enterprises. Transparent pricing and guaranteed code ownership.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setServiceModalOpen(true);
  };

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 opacity-30">
          <img
            src={hero}
            alt="RapidTechLabs Technology Workspace"
            className="w-full h-full object-cover"
            width={1600}
            height={1024}
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.18_0.08_250)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="animate-fade-up min-w-0">
            <span className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-full glass-dark px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium text-cyan leading-snug">
              <Sparkles size={13} className="shrink-0" /> Full-Stack Engineering · AI · Web
              Development · Agency Partner
            </span>
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transforming Businesses Through{" "}
              <span className="bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent">
                Smart Technology Solutions
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
              From launch-ready corporate websites and custom SaaS to modular ERPs and AI copilots,
              we engineer the digital backbone of ambitious businesses in India and worldwide.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-cyan px-6 py-3 font-semibold text-sm sm:text-base text-brand hover:brightness-110 transition shadow-glow"
              >
                View Packages & Pricing <ArrowRight size={18} />
              </a>
              <a
                href="#enquiry-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg glass-dark px-6 py-3 font-semibold text-sm sm:text-base text-white hover:bg-white/20 transition"
              >
                Request Custom Quote
              </a>
            </div>
            {/* Operational Commitments (Replaced fake client counts) */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-lg sm:text-2xl font-bold text-cyan">{s.value}</div>
                  <div className="text-[11px] text-white/70 mt-0.5 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float min-w-0">
            <div className="relative rounded-2xl overflow-hidden shadow-glow ring-1 ring-white/20">
              <img
                src={dashboard}
                alt="Platform dashboard preview"
                className="w-full h-auto"
                width={1400}
                height={896}
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-4 sm:left-4 lg:-bottom-6 lg:-left-6 glass rounded-xl p-3 sm:p-4 inline-flex sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-brand p-2 shrink-0">
                  <Zap className="text-white" size={16} />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground">
                    Average Delivery
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-foreground">
                    2–4 Weeks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR FOCUS & PLATFORM CAPABILITIES */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4">
            Technical Engineering Across Key Industry Verticals
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2 opacity-85 text-xs sm:text-sm font-semibold text-muted-foreground">
            <span>Manufacturing &amp; ERP</span>
            <span className="hidden sm:inline">·</span>
            <span>Healthcare &amp; Clinics</span>
            <span className="hidden sm:inline">·</span>
            <span>Education &amp; EdTech</span>
            <span className="hidden sm:inline">·</span>
            <span>FinTech &amp; AI</span>
            <span className="hidden sm:inline">·</span>
            <span>Retail &amp; E-Commerce</span>
            <span className="hidden sm:inline">·</span>
            <span>SaaS Startups</span>
          </div>
        </div>
      </section>

      {/* PRICING & PACKAGES (Positioned high for conversion focus) */}
      <PricingSection />

      {/* FREE WEBSITE AUDIT TOOL */}
      <WebsiteAuditSection />

      {/* SERVICES */}
      <Section
        eyebrow="What we do"
        title="Solutions engineered for scale"
        subtitle="End-to-end technology practices engineered for high performance, security, and measurable sales conversion."
        center
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.slug}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-glow transition-all border border-border flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="rounded-md glass-dark px-2.5 py-1 text-[11px] font-bold text-cyan uppercase tracking-wider">
                      {s.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-lg bg-gradient-brand p-2 shrink-0">
                      <s.icon className="text-white" size={18} />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.short}</p>

                  <div className="mt-4 pt-3 border-t border-border">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-accent block mb-1">
                      Business Advantage:
                    </span>
                    <p className="text-xs text-foreground font-medium">{s.businessBenefits[0]}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleLearnMore(s)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Learn more{" "}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </button>
                <a
                  href="#enquiry-form"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition"
                >
                  Get Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold text-foreground hover:bg-secondary transition shadow-sm"
          >
            Explore Complete Service Catalog & Deliverables <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* SOFTWARE PRODUCTS PROMOTION (PaperGen) */}
      <SoftwareProductSection />

      {/* WHY CHOOSE US */}
      <WhyChooseUsSection />

      {/* INDUSTRIES */}
      <Section
        eyebrow="Industries we serve"
        title="Domain depth that compounds"
        subtitle="We build specialized architectures that address vertical-specific compliance, operations, and customer journeys."
        center
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((i) => (
            <div
              key={i.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-glow hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center mb-4 shadow-glow">
                  <i.icon className="text-white" size={22} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">{i.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{i.summary}</p>

                <ul className="space-y-1.5 border-t border-border pt-3">
                  {i.solutions.slice(0, 3).map((sol) => (
                    <li key={sol} className="text-xs text-foreground flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] font-bold text-accent">{i.metric}</span>
                <a
                  href="#enquiry-form"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Consult &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* INTERNATIONAL & INDIAN AGENCY PARTNERSHIP */}
      <AgencyPartnershipSection />

      {/* ABOUT */}
      <Section className="bg-gradient-soft rounded-2xl sm:rounded-3xl mx-4 sm:mx-6 lg:mx-8 !max-w-none">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img
              src={about}
              alt="Our engineering team"
              className="w-full h-auto"
              width={1400}
              height={960}
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              About RapidTechLabs
            </span>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              A reliable engineering partner for ambitious teams
            </h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              We blend deep technical craft with business awareness to deliver platforms that move
              the needle — from corporate websites to hospital clinics, educational institutions to
              custom ERPs.
            </p>
            <ul className="mt-5 sm:mt-6 space-y-3 text-sm sm:text-base">
              {[
                "Senior, full-stack engineers with hands-on production experience",
                "Secure-by-design architecture, strict NDAs & 100% IP transfer",
                "Outcome-driven delivery with bi-weekly sprint staging demos",
                "Transparent Indian market pricing with no surprise billing",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={18} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                Read our story <ArrowRight size={16} />
              </Link>
              <a
                href="#enquiry-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Request a Consultation
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* DEVELOPMENT METHODOLOGY ROADMAP */}
      <DevelopmentProcessSection />

      {/* TECH STACK */}
      <Section eyebrow="Technology stack" title="Modern, proven, production-ready" center>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {techStack.map((t) => (
            <span
              key={t}
              className="rounded-full glass px-4 py-2 text-sm font-medium text-foreground shadow-card"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* CASE STUDIES (Clearly labeled demonstration case studies) */}
      <Section
        eyebrow="Case studies"
        title="Demonstrated Technical Solutions"
        subtitle="Representative software architectures engineered across diverse business domains."
        center
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.slice(0, 3).map((c) => (
            <article
              key={c.title}
              className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-glow transition flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                    width={1200}
                    height={800}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {c.industry}
                  </span>
                  <h3 className="mt-2 font-semibold text-lg text-foreground">{c.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                  <div className="mt-3 font-semibold text-xs text-primary">{c.result}</div>

                  <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-1">
                    {c.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded px-2 py-0.5 bg-secondary text-[10px] font-semibold text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="#enquiry-form"
                  className="w-full inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-secondary transition"
                >
                  Discuss Similar Project <ArrowRight size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 font-semibold hover:bg-secondary transition shadow-sm"
          >
            View full portfolio & architectural cases <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* REPRESENTATIVE PROJECT REFERENCES & CLIENT FEEDBACK FRAMEWORK */}
      <Section
        eyebrow="Demonstration Scenarios"
        title="Project Case Scenarios & Implementations"
        subtitle="Representative client use cases reflecting our modular engineering and deliverables."
        center
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-card border border-border p-6 shadow-card flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-secondary text-[10px] font-bold uppercase tracking-wider text-accent mb-2">
                  {t.type}
                </span>
                <h4 className="font-bold text-base text-foreground">{t.name}</h4>
                <div className="text-xs text-primary font-medium mb-3">{t.role}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* DEDICATED HIGH-CONVERTING PROJECT ENQUIRY SECTION */}
      <section
        id="enquiry-form"
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      >
        <ProjectEnquiryForm />
      </section>

      {/* COMPREHENSIVE FAQ ACCORDION */}
      <Section
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Everything you need to know about our services, pricing, GST compliance, and project delivery."
        center
      >
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground">
                <span className="flex flex-col sm:flex-row sm:items-center items-start gap-1.5 sm:gap-2.5 pr-2">
                  <span className="shrink-0 text-[10px] sm:text-xs uppercase px-2 py-0.5 rounded bg-secondary text-primary font-bold tracking-wider">
                    {f.category}
                  </span>
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-2">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* FINAL HIGH-IMPACT CTA */}
      <CTASection
        title="Let's build what's next for your business."
        subtitle="Tell us about your goals — our technical architects will respond within one business day with a tailored roadmap and guaranteed estimate."
        primaryText="Get a Free Consultation"
        secondaryText="Book Video Meeting"
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        open={serviceModalOpen}
        onOpenChange={setServiceModalOpen}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            softwareAppSchema({
              name: "PaperGen by RapidTechLabs",
              description:
                "Automated question paper, exam worksheet and document generation platform deployed live on the cloud.",
              applicationCategory: "EducationalBusinessApplication",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "RapidTechLabs — Smart Technology Solutions",
              description:
                "Transforming businesses through ERP, AI, custom software, healthcare, education and product engineering.",
              path: "/",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Home", path: "/" }])),
        }}
      />
    </div>
  );
}
