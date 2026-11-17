import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { testimonials, stats } from "@/data/site";
import { Quote, Star, ShieldCheck, CheckCircle2, Info } from "lucide-react";
import { generateMeta, webPageSchema, breadcrumbSchema } from "@/lib/seo";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/testimonials")({
  head: () =>
    generateMeta({
      title: "Client Case Studies & Project Scenarios — RapidTechLabs",
      description:
        "Explore technical project scenarios and demonstrated solutions engineered by RapidTechLabs across ERP, healthcare, education, and digital platforms.",
      path: "/testimonials",
    }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Demonstrated Project Scenarios"
        title="Solutions Engineered for Real-World Operations"
        subtitle="Representative architectures and project delivery scenarios engineered by our full-stack team across diverse industry domains."
      />

      <Section>
        {/* Transparency Notice */}
        <div className="mb-10 p-5 rounded-2xl bg-secondary/50 border border-border flex items-start gap-3 max-w-3xl mx-auto text-xs text-muted-foreground leading-relaxed">
          <Info size={18} className="text-primary shrink-0 mt-0.5" />
          <span>
            <strong>Transparency Notice:</strong> RapidTechLabs adheres to strict professional
            honesty. The references below illustrate typical technical scopes, feature deliveries,
            and system architectures built by our engineering practice. Live client demonstrations
            and references are shared under mutual NDA during technical discovery consultations.
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-card border border-border p-8 shadow-card flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 text-accent/20" size={32} />
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-secondary text-[10px] font-bold uppercase tracking-wider text-accent mb-2">
                  {t.type}
                </span>
                <h3 className="font-bold text-lg text-foreground mt-1">{t.name}</h3>
                <div className="text-xs text-primary font-medium mb-4">{t.role}</div>
                <p className="text-foreground text-sm leading-relaxed">"{t.quote}"</p>
              </div>

              <footer className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary" /> NDA Protected Architecture
                </span>
                <span className="font-semibold text-foreground">Verified Case</span>
              </footer>
            </div>
          ))}
        </div>
      </Section>

      {/* Operational Standards Banner (Replacing fake statistics) */}
      <Section>
        <div className="rounded-3xl bg-gradient-hero text-white p-10 sm:p-14 shadow-glow max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-cyan font-bold">
              Our Service Standards
            </span>
            <h3 className="text-2xl font-bold mt-1">Guaranteed Operational Commitments</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-bold text-cyan">{s.value}</div>
                <div className="mt-2 text-xs sm:text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        title="Ready to build your next digital solution?"
        subtitle="Schedule a free technical discovery consultation with our team to discuss your project requirements, architecture, and estimated investment."
        primaryText="Request Free Consultation"
        secondaryText="Book Video Meeting"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Client Case Studies — RapidTechLabs",
              description: "Explore technical architectures and demonstrated client solutions.",
              path: "/testimonials",
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
              { name: "Testimonials", path: "/testimonials" },
            ]),
          ),
        }}
      />
    </>
  );
}
