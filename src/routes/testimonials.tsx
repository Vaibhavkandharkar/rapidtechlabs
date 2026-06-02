import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { testimonials, stats } from "@/data/site";
import { Quote, Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Loved by leaders | RapidTechLabs" },
      { name: "description", content: "Hear from COOs, CTOs and founders building with RapidTechLabs." },
      { property: "og:title", content: "Testimonials — RapidTechLabs" },
      { property: "og:description", content: "Trusted by leaders, loved by teams." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="Trusted by leaders, loved by teams" subtitle="Real stories from clients shipping mission-critical work with us." />
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="relative rounded-2xl bg-card border border-border p-8 shadow-card">
              <Quote className="absolute top-6 right-6 text-accent/30" size={36} />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
              </div>
              <p className="text-foreground text-lg leading-relaxed">"{t.quote}"</p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-brand grid place-items-center text-white font-semibold">
                  {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
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
    </>
  );
}
