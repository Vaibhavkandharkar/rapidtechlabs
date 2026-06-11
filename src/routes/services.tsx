import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { services, techStack } from "@/data/site";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { generateMeta, webPageSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => generateMeta({
    title: "IT Services — ERP, Hospital Management, AI & Digital Marketing | RapidTechLabs",
    description: "Industrial ERP, Hospital & Institute Management Systems, MVC product development, AI integration and performance digital marketing. Six core practices, one accountable partner.",
    path: "/services",
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Six practices. One accountable partner."
        subtitle="From ERP rollouts to AI copilots, we build platforms that quietly run mission-critical operations." />
      <Section>
        <div className="space-y-16">
          {services.map((s, idx) => (
            <article key={s.slug} className={`grid lg:grid-cols-2 gap-10 items-center ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="rounded-2xl overflow-hidden shadow-card">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" width={1200} height={800} loading="lazy" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-3 py-1.5 text-white text-xs font-semibold uppercase tracking-wider">
                  <s.icon size={14} /> {s.title}
                </div>
                <h2 className="mt-4 text-3xl font-bold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground text-lg">{s.description}</p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="text-accent" size={16} />{f}</li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-white font-semibold shadow-glow">
                  Discuss your project <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Technology stack" title="Built on proven foundations" center>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((t) => (
            <span key={t} className="rounded-full glass px-4 py-2 text-sm font-medium shadow-card">{t}</span>
          ))}
        </div>
      </Section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Services — RapidTechLabs",
              description: "Industrial ERP, Hospital & Institute Management, MVC product development, AI integration and digital marketing.",
              path: "/services",
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
              { name: "Services", path: "/services" },
            ])
          ),
        }}
      />
    </>
  );
}
