import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/Section";
import { caseStudies } from "@/data/site";
import { ArrowRight, CheckCircle2, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import { generateMeta, webPageSchema, breadcrumbSchema } from "@/lib/seo";
import { ProjectEnquiryForm } from "@/components/ProjectEnquiryForm";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    generateMeta({
      title: "Portfolio & Case Studies — Verified Client Results | RapidTechLabs",
      description:
        "Explore selected production work across manufacturing ERP, hospital platforms, university systems, AI copilots, and high-performance websites across 14 countries.",
      path: "/portfolio",
    }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");

  const industriesList = ["All", ...Array.from(new Set(caseStudies.map((c) => c.industry)))];

  const filteredProjects =
    selectedIndustry === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === selectedIndustry);

  return (
    <>
      <PageHero
        eyebrow="Portfolio & Case Studies"
        title="Proven Platforms Running in Production Worldwide"
        subtitle="We measure success by commercial outcomes: higher throughput, reduced patient wait times, automated paperless workflows, and scalable revenue growth."
      />

      {/* Filter Tabs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-secondary/60 border border-border max-w-3xl mx-auto">
          {industriesList.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedIndustry === ind
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((c) => (
            <article
              key={c.title}
              className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-glow transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={1200}
                    height={800}
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-md glass-dark px-2.5 py-1 text-[11px] font-bold text-cyan uppercase tracking-wider">
                      {c.industry}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl text-foreground">{c.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-secondary/50 border border-border">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-0.5">
                      Verified Result
                    </span>
                    <span className="text-xs font-semibold text-foreground">{c.result}</span>
                  </div>

                  {/* Features delivered */}
                  <div className="mt-4">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Key Deliverables
                    </h4>
                    <ul className="space-y-1.5 text-xs text-foreground">
                      {c.featuresDelivered.map((feat) => (
                        <li key={feat} className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-1">
                    {c.technologies.map((tech) => (
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
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card hover:bg-secondary px-4 py-2.5 text-xs font-semibold text-foreground transition"
                >
                  Discuss Similar Solution <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Embedded Project Enquiry Form */}
      <section
        id="enquiry-form"
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      >
        <ProjectEnquiryForm
          title="Have a Project in Mind? Let's Build It Together."
          subtitle="Tell us about your requirements, timeline, and industry. Our engineering leadership will prepare a clear scope and roadmap within 24 hours."
        />
      </section>

      {/* Closing CTA */}
      <CTASection
        title="Want to see an interactive live demo of any platform?"
        subtitle="Schedule a 15-minute screen share with our solution engineering team to explore the admin dashboards, architecture, and live features."
        primaryText="Schedule Platform Demo"
        secondaryText="Book Instant Video Call"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Portfolio & Case Studies — RapidTechLabs",
              description:
                "Selected production work across manufacturing, healthcare, education, AI and growth marketing.",
              path: "/portfolio",
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
              { name: "Portfolio", path: "/portfolio" },
            ]),
          ),
        }}
      />
    </>
  );
}
