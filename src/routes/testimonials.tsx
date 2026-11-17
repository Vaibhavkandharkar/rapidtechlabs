import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { testimonials, stats } from "@/data/site";
import { Quote, Star } from "lucide-react";
import { generateMeta, webPageSchema, breadcrumbSchema } from "@/lib/seo";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/testimonials")({
  head: () =>
    generateMeta({
      title: "Client Testimonials & Reviews — Trusted by COOs, CTOs & Founders | RapidTechLabs",
      description:
        "Hear from COOs, CTOs and founders building mission-critical platforms with RapidTechLabs. 99% client satisfaction, 50+ global clients across ERP, healthcare, AI and more.",
      path: "/testimonials",
    }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Testimonials"
        title="Trusted by Leaders, Loved by Teams"
        subtitle="Genuine feedback from executive partners and engineering leaders shipping mission-critical platforms with RapidTechLabs."
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="relative rounded-2xl bg-card border border-border p-8 shadow-card flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 text-accent/20" size={36} />
              <div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground text-base sm:text-lg leading-relaxed">"{t.quote}"</p>
              </div>

              <footer className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-brand grid place-items-center text-white font-semibold">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl bg-gradient-hero text-white p-10 sm:p-14 shadow-glow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold text-cyan">{s.value}</div>
                <div className="mt-2 text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        title="Ready to build your next success story?"
        subtitle="Schedule a free technical discovery call with our team to discuss your project scope, architecture, and estimated investment."
        primaryText="Request Free Consultation"
        secondaryText="Book Instant Video Call"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Client Testimonials — RapidTechLabs",
              description: "Hear from COOs, CTOs and founders building with RapidTechLabs.",
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
