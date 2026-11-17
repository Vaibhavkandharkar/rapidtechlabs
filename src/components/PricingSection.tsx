import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Info,
  MessageSquare,
  FileCheck,
  Check,
  Minus,
} from "lucide-react";
import { pricingPackages, pricingTransparencyPoints } from "@/data/site";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PricingSection() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const comparisonFeatures = [
    {
      name: "Pages Included",
      launch: "Up to 3 Pages",
      starter: "Up to 5 Pages",
      growth: "Up to 12 Pages",
      enterprise: "Custom / Unlimited",
    },
    {
      name: "UI/UX Design",
      launch: "Modern Professional",
      starter: "Custom Responsive",
      growth: "CRO Conversion-Engineered",
      enterprise: "Bespoke Design System",
    },
    {
      name: "Mobile Responsiveness",
      launch: "Yes",
      starter: "Yes",
      growth: "Yes (Core Web Vitals 90+)",
      enterprise: "Yes (Multi-device / Portal)",
    },
    {
      name: "WhatsApp & Contact Form",
      launch: "Yes",
      starter: "Yes + Lead Capture",
      growth: "Advanced Lead Capture + CRM",
      enterprise: "Custom Automated Workflows",
    },
    {
      name: "SEO Optimization",
      launch: "Basic On-Page",
      starter: "On-Page + Google Indexing",
      growth: "Full SEO-Friendly Architecture",
      enterprise: "Enterprise Technical SEO",
    },
    {
      name: "Analytics & Tracking",
      launch: "-",
      starter: "-",
      growth: "Google Analytics 4 & Meta Pixel",
      enterprise: "Custom Event Tracking & BI",
    },
    {
      name: "Content Management (CMS)",
      launch: "-",
      starter: "Basic CMS",
      growth: "Full Dynamic CMS",
      enterprise: "Headless / Custom DB",
    },
    {
      name: "Security & SSL Setup",
      launch: "SSL Setup",
      starter: "SSL + Cloudflare",
      growth: "SSL + Cloudflare Hardened",
      enterprise: "Security Hardening & Testing",
    },
    {
      name: "Post-Launch Warranty",
      launch: "15 Days",
      starter: "30 Days",
      growth: "60 Days",
      enterprise: "Milestone-Based SLA",
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 scroll-mt-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Transparent Agency Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Competitive Indian Market Pricing. Zero Compromise on Quality.
        </h2>
        <p className="mt-3 text-muted-foreground text-base sm:text-lg">
          No hidden fees, no ambiguous billing, and zero vendor lock-in. 100% source code ownership
          and transparent milestone scopes.
        </p>

        {/* Currency Switcher */}
        <div className="mt-6 inline-flex items-center gap-1.5 p-1 rounded-xl bg-secondary border border-border">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              currency === "INR"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            INR (₹ India)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              currency === "USD"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            USD ($ International)
          </button>
        </div>
      </div>

      <Tabs defaultValue="websites" className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-10">
          <TabsList className="bg-secondary p-1 rounded-xl flex-wrap justify-center h-auto">
            <TabsTrigger value="websites" className="text-xs sm:text-sm font-semibold">
              Website Development
            </TabsTrigger>
            <TabsTrigger value="seo" className="text-xs sm:text-sm font-semibold">
              SEO & Growth
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="text-xs sm:text-sm font-semibold">
              Website Maintenance
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-xs sm:text-sm font-semibold">
              Custom Software & ERP
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB 1: WEBSITE DEVELOPMENT (4 PACKAGES) */}
        <TabsContent value="websites">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPackages.websiteDevelopment.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl bg-card border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-glow hover:-translate-y-1 relative ${
                  pkg.popular
                    ? "border-primary shadow-glow ring-2 ring-primary/30"
                    : "border-border shadow-card hover:border-primary/40"
                }`}
              >
                <div>
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-brand text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                        <Sparkles size={11} /> {pkg.badge || "MOST POPULAR"}
                      </span>
                    </div>
                  )}

                  <div className="mt-1">
                    <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed min-h-[36px]">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {currency === "INR" ? pkg.priceINR : pkg.priceUSD}
                    </div>
                    <div className="text-[11px] font-semibold text-primary uppercase tracking-wider mt-0.5">
                      {pkg.chargeType}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2 text-xs text-foreground">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.note && (
                    <p className="mt-4 text-[11px] text-muted-foreground italic bg-secondary/50 p-2 rounded-lg">
                      * {pkg.note}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <a
                    href="#enquiry-form"
                    className={`w-full inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition ${
                      pkg.popular
                        ? "bg-gradient-brand text-white shadow-glow hover:brightness-110"
                        : "border border-border bg-card hover:bg-secondary text-foreground"
                    }`}
                  >
                    {pkg.ctaText} <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* PACKAGE COMPARISON MATRIX */}
          <div className="mt-14 rounded-2xl bg-card border border-border overflow-hidden shadow-card">
            <div className="p-5 bg-secondary/50 border-b border-border">
              <h4 className="font-bold text-base text-foreground">
                Website Development Package Comparison
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Compare features side-by-side to choose the best scope for your business.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-secondary/30 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Feature Inclusions</th>
                    <th className="py-3 px-3">Launch (₹19,999)</th>
                    <th className="py-3 px-3">Starter (₹39,999)</th>
                    <th className="py-3 px-3 text-primary font-extrabold bg-primary/5">
                      Growth Pro (₹99,999)
                    </th>
                    <th className="py-3 px-3">Enterprise (₹3.5L+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/20 transition">
                      <td className="py-2.5 px-4 font-medium text-foreground">{row.name}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{row.launch}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{row.starter}</td>
                      <td className="py-2.5 px-3 font-semibold text-primary bg-primary/5">
                        {row.growth}
                      </td>
                      <td className="py-2.5 px-3 text-foreground font-medium">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: SEO & GROWTH (2 PACKAGES) */}
        <TabsContent value="seo">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPackages.seoAndMarketing.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl bg-card border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-glow relative ${
                  pkg.recommended
                    ? "border-primary shadow-glow ring-2 ring-primary/30"
                    : "border-border shadow-card hover:border-primary/40"
                }`}
              >
                <div>
                  {pkg.recommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-brand text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                        <Sparkles size={11} /> {pkg.badge || "RECOMMENDED"}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mt-5 pt-3 border-t border-border">
                    <div className="text-3xl font-extrabold text-foreground">
                      {currency === "INR" ? pkg.priceINR : pkg.priceUSD}
                    </div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">
                      {pkg.chargeType}
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-foreground">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.disclaimer && (
                    <p className="mt-4 text-[11px] text-muted-foreground italic bg-secondary/50 p-2 rounded-lg">
                      * {pkg.disclaimer}
                    </p>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-border">
                  <a
                    href="#enquiry-form"
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition ${
                      pkg.recommended
                        ? "bg-gradient-brand text-white shadow-glow hover:brightness-110"
                        : "border border-border bg-card hover:bg-secondary text-foreground"
                    }`}
                  >
                    {pkg.ctaText} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* TAB 3: WEBSITE MAINTENANCE (2 PLANS) */}
        <TabsContent value="maintenance">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPackages.maintenancePlans.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl bg-card border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-glow relative ${
                  pkg.popular
                    ? "border-primary shadow-glow ring-2 ring-primary/30"
                    : "border-border shadow-card hover:border-primary/40"
                }`}
              >
                <div>
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-brand text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                        <Sparkles size={11} /> {pkg.badge || "HIGH AVAILABILITY"}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mt-5 pt-3 border-t border-border">
                    <div className="text-3xl font-extrabold text-foreground">
                      {currency === "INR" ? pkg.priceINR : pkg.priceUSD}
                    </div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">
                      {pkg.chargeType}
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-foreground">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-border">
                  <a
                    href="#enquiry-form"
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition ${
                      pkg.popular
                        ? "bg-gradient-brand text-white shadow-glow hover:brightness-110"
                        : "border border-border bg-card hover:bg-secondary text-foreground"
                    }`}
                  >
                    {pkg.ctaText} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* TAB 4: CUSTOM SOFTWARE & ERP QUOTATION */}
        <TabsContent value="custom">
          <div className="rounded-2xl bg-gradient-soft border border-border p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground">
              Need Bespoke Custom Software, ERP or Web Portals?
            </h3>
            <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
              Every complex SaaS application, Industrial ERP, or healthcare platform has distinct
              requirements. We calculate enterprise pricing according to your specific database
              architecture, user concurrency, and integration needs.
            </p>

            <div className="mt-6 grid sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-bold text-sm text-foreground">Milestone Sprints</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Guaranteed deliverables, transparent sprint reviews, and fixed milestones.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-bold text-sm text-foreground">Dedicated Squads</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Senior full-stack developers embedded into your Slack, Jira, or Teams rituals.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-bold text-sm text-foreground">100% IP Transfer</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Zero vendor lock-in; complete source code, repositories, and assets belong to you.
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand text-white px-6 py-3 font-semibold text-sm shadow-glow hover:brightness-110 transition"
              >
                Request Custom Architecture Estimate <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* SECTION 5: PRICING TRANSPARENCY */}
      <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary grid place-items-center">
            <Info size={18} />
          </div>
          <div>
            <h4 className="font-bold text-base text-foreground">What's Included in Our Pricing?</h4>
            <p className="text-xs text-muted-foreground">
              Clear terms and transparent agency billing standards.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5 mt-5 text-xs text-muted-foreground leading-relaxed">
          {pricingTransparencyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <ShieldCheck size={16} className="text-accent shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: STRONG CONVERSION SECTION */}
      <div className="mt-12 max-w-5xl mx-auto rounded-3xl bg-gradient-hero text-white p-8 sm:p-12 shadow-glow text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-cyan text-xs font-semibold mb-3">
            <HelpCircle size={14} /> Tailored Advice
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Not Sure Which Package Is Right for You?
          </h3>
          <p className="mt-3 text-white/80 text-sm sm:text-base leading-relaxed">
            Tell us about your business goals. Our team will recommend the right digital solution
            based on your requirements and budget.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan text-brand px-5 py-3 text-sm font-semibold shadow-glow hover:brightness-110 transition"
            >
              Get a Free Consultation <ArrowRight size={16} />
            </a>
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-xl glass-dark text-white px-5 py-3 text-sm font-semibold hover:bg-white/20 transition"
            >
              Request Custom Quotation
            </a>
            <a
              href="https://wa.me/919325378590?text=Hi%20RapidTechLabs%2C%20I%20would%20like%20to%20consult%20about%20the%20best%20package%20for%20my%20business"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-sm font-semibold transition"
            >
              <MessageSquare size={16} /> Talk to Our Experts on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
