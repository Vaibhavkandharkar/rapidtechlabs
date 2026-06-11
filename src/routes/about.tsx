import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { CheckCircle2, Target, Users, Sparkles } from "lucide-react";
import about from "@/assets/about.jpg";
import { stats } from "@/data/site";
import { generateMeta, webPageSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => generateMeta({
    title: "About RapidTechLabs — Premium Engineering Partner for Ambitious Teams",
    description: "Meet the senior engineering team building enterprise platforms across ERP, healthcare, education and AI. 100+ projects delivered, 50+ global clients, 99% satisfaction.",
    path: "/about",
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Engineering the digital backbone of modern enterprises"
        subtitle="We are a senior team of engineers, designers and strategists building platforms that scale." />
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img src={about} alt="The team" className="w-full" width={1400} height={960} loading="lazy" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Our story</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              RapidTechLabs was founded on a simple belief: most enterprise software is too slow, too generic, and too disconnected from the people who use it. We set out to fix that — with smaller, senior teams that own outcomes end-to-end.
            </p>
            <p className="mt-4 text-muted-foreground text-lg">
              Today, we partner with manufacturers, hospitals, institutes and startups across 14 countries — shipping platforms that quietly run mission-critical operations.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="What we stand for" title="Principles, not buzzwords" center>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Outcomes over output", body: "We measure success by your KPIs — not story points shipped." },
            { icon: Users, title: "Senior by default", body: "Every project is led by engineers with 8+ years of production experience." },
            { icon: Sparkles, title: "Craft at every layer", body: "From API design to UI polish, quality is non-negotiable." },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl bg-card border border-border p-6 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center mb-4"><p.icon className="text-white" size={22} /></div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
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

      <Section eyebrow="Why teams choose us" title="A partner you can trust with mission-critical work">
        <ul className="grid md:grid-cols-2 gap-4 max-w-4xl">
          {[
            "Transparent communication and weekly demos",
            "Security & compliance as baseline, not premium",
            "Long-term support contracts with named engineers",
            "Knowledge transfer baked into every engagement",
            "Flexible commercial models (fixed, T&M, dedicated)",
            "Global delivery, follow-the-sun coverage",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3 rounded-xl bg-card border border-border p-4">
              <CheckCircle2 className="text-accent mt-0.5" size={20} /><span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "About RapidTechLabs",
              description: "Meet the team building enterprise platforms across ERP, healthcare, education and AI.",
              path: "/about",
            })
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
            ])
          ),
        }}
      />
    </>
  );
}
