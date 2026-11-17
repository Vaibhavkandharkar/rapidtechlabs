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
      title: "RapidTechLabs — Smart Technology Solutions, Custom Software & Web Development",
      description:
        "Enterprise IT solutions, website development, custom software engineering, ERP, and AI integration for international businesses. 100+ projects delivered with 99% satisfaction.",
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
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 opacity-30">
          <img
            src={hero}
            alt=""
            className="w-full h-full object-cover"
            width={1600}
            height={1024}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.18_0.08_250)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium text-cyan">
              <Sparkles size={14} /> Enterprise IT · AI · Custom Software · Global Delivery
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Transforming Businesses Through{" "}
              <span className="bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent">
                Smart Technology Solutions
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              From high-converting web applications and ERPs to AI copilots and custom software, we
              engineer the digital backbone of forward-thinking organizations worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 font-semibold text-brand hover:brightness-110 transition shadow-glow"
              >
                Request a Free Quote <ArrowRight size={18} />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg glass-dark px-6 py-3 font-semibold text-white hover:bg-white/20 transition"
              >
                Explore Services
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-cyan">{s.value}</div>
                  <div className="text-xs text-white/70 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float">
            <div className="relative rounded-2xl overflow-hidden shadow-glow ring-1 ring-white/20">
              <img
                src={dashboard}
                alt="Platform dashboard"
                className="w-full h-auto"
                width={1400}
                height={896}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-brand p-2">
                  <Zap className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Avg. deployment</div>
                  <div className="font-semibold text-foreground">6 weeks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by teams at forward-thinking enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
            {[
              "Meridian Manufacturing",
              "Northcare Hospitals",
              "Brightline Institute",
              "FinPivot AI",
              "Loomstack Growth",
              "Volton Robotics",
            ].map((n) => (
              <span
                key={n}
                className="font-display font-bold text-lg sm:text-xl text-muted-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FREE WEBSITE AUDIT TOOL */}
      <WebsiteAuditSection />

      {/* SERVICES */}
      <Section
        eyebrow="What we do"
        title="Solutions engineered for scale"
        subtitle="End-to-end technology practices engineered for international performance, security, and sales conversion."
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

      {/* SOFTWARE PRODUCTS PROMOTION (DocuGen Engine) */}
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

      {/* INTERNATIONAL AGENCY PARTNERSHIP */}
      <AgencyPartnershipSection />

      {/* PRICING & PACKAGES */}
      <PricingSection />

      {/* ABOUT */}
      <Section className="bg-gradient-soft rounded-3xl mx-4 sm:mx-6 lg:mx-8 !max-w-none">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img
              src={about}
              alt="Our team"
              className="w-full h-auto"
              width={1400}
              height={960}
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              About RapidTechLabs
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
              A premium engineering partner for ambitious teams
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We blend deep domain expertise with rigorous engineering to deliver platforms that
              move the needle — from factory floors to hospital wards, classrooms to capital
              markets.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Senior, full-stack engineering pods with 8+ years experience",
                "Secure-by-design architecture, strict NDAs & IP transfer",
                "Outcome-driven delivery with weekly sprints & live staging",
                "Direct time-zone overlap for US, UK, Canada & Australia clients",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-0.5" size={20} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 font-semibold text-white shadow-glow"
              >
                Read our story <ArrowRight size={16} />
              </Link>
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 font-semibold text-foreground hover:bg-secondary"
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

      {/* CASE STUDIES */}
      <Section
        eyebrow="Case studies"
        title="Verified outcomes our clients love"
        subtitle="Real software platforms running in production across 14 countries."
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
            View full portfolio & verified metrics <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* TESTIMONIALS PREVIEW */}
      <Section eyebrow="Testimonials" title="Trusted by leaders, loved by teams" center>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl bg-card border border-border p-6 shadow-card flex flex-col justify-between"
            >
              <p className="text-foreground text-sm leading-relaxed">"{t.quote}"</p>
              <footer className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-brand grid place-items-center text-white font-semibold text-sm">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </footer>
            </blockquote>
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
        subtitle="Everything you need to know about our services, pricing, timelines, and international collaboration."
        center
      >
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-semibold text-foreground">
                <span className="flex items-center gap-2">
                  <span className="text-xs uppercase px-2 py-0.5 rounded bg-secondary text-primary font-bold tracking-wider">
                    {f.category}
                  </span>
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
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
        secondaryText="Book Instant Video Call"
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
              name: "DocuGen Engine by RapidTechLabs",
              description:
                "Automated document, invoice, quotation and proposal generation platform for modern enterprises.",
              applicationCategory: "BusinessApplication",
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
    </>
  );
}
