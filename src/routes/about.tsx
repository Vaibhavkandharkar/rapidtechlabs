import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { CheckCircle2, Target, Users, Sparkles, Shield, ArrowRight } from "lucide-react";
import about from "@/assets/about.jpg";
import { stats } from "@/data/site";
import { generateMeta, webPageSchema, breadcrumbSchema } from "@/lib/seo";
import { DevelopmentProcessSection } from "@/components/DevelopmentProcessSection";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/about")({
  head: () =>
    generateMeta({
      title: "About RapidTechLabs — Premium Engineering Partner for Ambitious Teams",
      description:
        "Meet the senior engineering team building enterprise platforms across ERP, healthcare, education and AI. 100+ projects delivered, 50+ global clients, 99% satisfaction.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About RapidTechLabs"
        title="Engineering the Digital Backbone of Modern Enterprises"
        subtitle="We are a senior team of full-stack engineers, solution architects, and conversion specialists building software platforms that scale without limits."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-card border border-border">
            <img
              src={about}
              alt="The RapidTechLabs engineering team"
              className="w-full"
              width={1400}
              height={960}
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Our Story & Mission</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              RapidTechLabs was founded on a simple belief: most enterprise software is
              unnecessarily slow, overly generic, and disconnected from genuine commercial outcomes.
              We set out to change that — with agile, senior-led engineering pods that take complete
              ownership from architecture to post-launch SLA.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Today, we serve as the accountable technology development partner for manufacturers,
              healthcare systems, academic institutes, and fast-growing businesses across 14
              countries — including North America, Europe, Australia, and Asia.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="What we stand for" title="Core Engineering Principles" center>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "Outcomes Over Output",
              body: "We measure success by commercial KPIs, revenue lift, and operational savings — not meaningless story points shipped.",
            },
            {
              icon: Users,
              title: "Senior Engineers by Default",
              body: "Every sprint is led by software engineers with 8+ years of production experience. No junior bait-and-switch.",
            },
            {
              icon: Sparkles,
              title: "Craft at Every Layer",
              body: "From database normalization and REST API ergonomics to micro-interactions and Core Web Vitals, quality is non-negotiable.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-card"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center mb-4 shadow-glow">
                <p.icon className="text-white" size={22} />
              </div>
              <h3 className="font-semibold text-lg text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
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

      {/* Trust Elements: Development Methodology */}
      <DevelopmentProcessSection />

      <Section
        eyebrow="Why teams choose us"
        title="A partner you can trust with mission-critical work"
        center
      >
        <ul className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            "Transparent communication and weekly sprint staging demos",
            "Security & compliance as baseline: strict NDAs and 100% IP transfer",
            "Long-term SLA support contracts with named senior engineers",
            "Knowledge transfer and complete documentation baked into every engagement",
            "Flexible commercial models: fixed-milestone, T&M, or dedicated squads",
            "Global international delivery with follow-the-sun timezone coverage",
          ].map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 rounded-xl bg-card border border-border p-4 shadow-sm text-left"
            >
              <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={20} />
              <span className="text-sm text-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection
        title="Looking for a high-caliber technical development partner?"
        subtitle="Schedule a technical discovery session with our solutions architects to discuss your roadmap and requirements."
        primaryText="Discuss Your Project"
        secondaryText="Book Instant Video Call"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "About RapidTechLabs",
              description:
                "Meet the team building enterprise platforms across ERP, healthcare, education and AI.",
              path: "/about",
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
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />
    </>
  );
}
