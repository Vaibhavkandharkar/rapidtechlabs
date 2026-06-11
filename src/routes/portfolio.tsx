import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { caseStudies } from "@/data/site";
import { ArrowRight } from "lucide-react";
import { generateMeta, webPageSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  head: () => generateMeta({
    title: "Portfolio & Case Studies — ERP, HMS, AI Projects | RapidTechLabs",
    description: "Explore our selected work across manufacturing ERP, hospital management, institute platforms, AI copilots and growth marketing. 100+ projects delivered across 14 countries.",
    path: "/portfolio",
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Work we're proud of" subtitle="A snapshot of platforms now running in production across 14 countries." />
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((c) => (
            <article key={c.title} className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-glow transition">
              <div className="aspect-video overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition" width={1200} height={800} loading="lazy" />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">{c.tag}</span>
                <h3 className="mt-2 font-semibold text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.result}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 font-semibold text-white shadow-glow">
            Start your project <ArrowRight size={18} />
          </Link>
        </div>
      </Section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Portfolio — RapidTechLabs Case Studies",
              description: "Selected work across manufacturing, healthcare, education, AI and growth marketing.",
              path: "/portfolio",
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
              { name: "Portfolio", path: "/portfolio" },
            ])
          ),
        }}
      />
    </>
  );
}
