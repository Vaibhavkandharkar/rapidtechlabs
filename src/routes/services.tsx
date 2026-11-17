import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/Section";
import { services, techStack, type Service } from "@/data/site";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Cpu, ExternalLink } from "lucide-react";
import { generateMeta, webPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { ProjectEnquiryForm } from "@/components/ProjectEnquiryForm";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/services")({
  head: () =>
    generateMeta({
      title: "Software & Web Development Services — RapidTechLabs",
      description:
        "Website development, custom software engineering, ERP, hospital & institute systems, AI copilots, SEO, and digital marketing. 100+ projects delivered.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Services" },
    { id: "development", label: "Web & Custom Software" },
    { id: "enterprise", label: "Enterprise ERP & Healthcare" },
    { id: "automation", label: "AI & Automation" },
    { id: "growth", label: "SEO & Growth Marketing" },
  ];

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((s) => s.category === selectedCategory);

  const openServiceModal = (s: Service) => {
    setActiveModalService(s);
    setModalOpen(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Core Practices"
        title="Engineering Solutions Built For Scalable Growth"
        subtitle="From high-converting web applications and SaaS platforms to industrial ERPs and AI workflows, we provide end-to-end technical execution with zero compromises."
      />

      {/* Category Filter Pills */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-secondary/60 border border-border max-w-2xl mx-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedCategory === c.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <Section>
        <div className="space-y-16">
          {filteredServices.map((s, idx) => (
            <article
              key={s.slug}
              id={s.slug}
              className={`grid lg:grid-cols-2 gap-10 items-center scroll-mt-24 ${
                idx % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="rounded-2xl overflow-hidden shadow-card border border-border group relative aspect-[16/10]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width={1200}
                  height={800}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-md glass-dark px-3 py-1 text-xs font-bold text-cyan uppercase tracking-wider">
                    {s.category}
                  </span>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-3 py-1.5 text-white text-xs font-semibold uppercase tracking-wider">
                  <s.icon size={14} /> {s.title}
                </div>
                <h2 className="mt-4 text-3xl font-bold text-foreground">{s.title}</h2>
                <p className="mt-3 text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {s.description}
                </p>

                {/* Key Business Benefits */}
                <div className="mt-5 p-4 rounded-xl bg-secondary/40 border border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                    Key Business Advantages
                  </h4>
                  <ul className="space-y-1.5">
                    {s.businessBenefits.slice(0, 2).map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-foreground font-medium"
                      >
                        <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={15} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Features / Tech */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Features & Deliverables
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.techUsed.map((t) => (
                    <span
                      key={t}
                      className="rounded px-2.5 py-1 bg-secondary text-[11px] font-semibold text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-white text-sm font-semibold shadow-glow hover:brightness-110 transition"
                  >
                    Discuss Your Project <ArrowRight size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={() => openServiceModal(s)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-secondary text-foreground transition"
                  >
                    View Deliverables & Scope
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Technology stack"
        title="Built on proven foundations"
        subtitle="We select technologies optimized for developer ergonomics, security, and sub-second load times."
        center
      >
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {techStack.map((t) => (
            <span
              key={t}
              className="rounded-full glass px-4 py-2 text-sm font-medium shadow-card text-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Embedded Project Enquiry Form */}
      <section
        id="enquiry-form"
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      >
        <ProjectEnquiryForm
          title="Request a Detailed Technical Proposal"
          subtitle="Select your required service and tell us about your timelines and budget. A senior solution architect will prepare a tailored scope within 24 hours."
        />
      </section>

      {/* Closing CTA */}
      <CTASection
        title="Not sure which technical solution fits best?"
        subtitle="Schedule a free 15-minute discovery consultation with our engineering architects to explore technical trade-offs and cost estimates."
        primaryText="Request Free Consultation"
        secondaryText="Instant Video Meeting"
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Services — RapidTechLabs",
              description:
                "Website development, custom software engineering, ERP, hospital & institute management, AI integration, SEO, and digital marketing.",
              path: "/services",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]),
          ),
        }}
      />
    </>
  );
}
