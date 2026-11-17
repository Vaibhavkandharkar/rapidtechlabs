import { useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles, HelpCircle } from "lucide-react";
import { pricingPackages } from "@/data/site";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PricingSection() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Transparent Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Predictable Investments, High ROI
        </h2>
        <p className="mt-3 text-muted-foreground text-lg">
          No hidden fees, surprise invoices, or proprietary vendor lock-in. 100% source code
          ownership.
        </p>

        {/* Currency Switcher */}
        <div className="mt-6 inline-flex items-center gap-2 p-1 rounded-xl bg-secondary border border-border">
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
        </div>
      </div>

      <Tabs defaultValue="websites" className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-10">
          <TabsList className="bg-secondary p-1 rounded-xl">
            <TabsTrigger value="websites" className="text-xs sm:text-sm font-semibold">
              Website Development
            </TabsTrigger>
            <TabsTrigger value="seo" className="text-xs sm:text-sm font-semibold">
              SEO & Growth
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="text-xs sm:text-sm font-semibold">
              Maintenance & Support
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-xs sm:text-sm font-semibold">
              Custom Software
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Website Development */}
        <TabsContent value="websites">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPackages.websiteDevelopment.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl bg-card border p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "border-primary shadow-glow ring-2 ring-primary/20"
                    : "border-border shadow-card hover:border-primary/40"
                }`}
              >
                <div>
                  {pkg.popular && (
                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-brand text-white text-[11px] font-bold tracking-wide uppercase mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{pkg.description}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                      {currency === "USD" ? pkg.priceUSD : pkg.priceINR}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">/ project</span>
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

        {/* Tab 2: SEO & Growth */}
        <TabsContent value="seo">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPackages.seoAndMarketing.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl bg-card border p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "border-primary shadow-glow ring-2 ring-primary/20"
                    : "border-border shadow-card hover:border-primary/40"
                }`}
              >
                <div>
                  {pkg.popular && (
                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-brand text-white text-[11px] font-bold tracking-wide uppercase mb-3">
                      Recommended
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{pkg.description}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                      {currency === "USD" ? pkg.priceUSD : pkg.priceINR}
                    </span>
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand text-white py-3 text-xs font-semibold shadow-glow hover:brightness-110 transition"
                  >
                    {pkg.ctaText} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Maintenance & Support */}
        <TabsContent value="maintenance">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPackages.maintenancePlans.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl bg-card border p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "border-primary shadow-glow ring-2 ring-primary/20"
                    : "border-border shadow-card hover:border-primary/40"
                }`}
              >
                <div>
                  {pkg.popular && (
                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-brand text-white text-[11px] font-bold tracking-wide uppercase mb-3">
                      High-Availability
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{pkg.description}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                      {currency === "USD" ? pkg.priceUSD : pkg.priceINR}
                    </span>
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand text-white py-3 text-xs font-semibold shadow-glow hover:brightness-110 transition"
                  >
                    {pkg.ctaText} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Tab 4: Custom Software Quotation */}
        <TabsContent value="custom">
          <div className="rounded-2xl bg-gradient-soft border border-border p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground">
              Need Bespoke Custom Software or ERP?
            </h3>
            <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto">
              Every complex SaaS application, Industrial ERP, or healthcare platform has distinct
              requirements. We provide a guaranteed fixed-price estimate with itemized sprint
              deliverables after a free discovery call.
            </p>

            <div className="mt-6 grid sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-bold text-sm text-foreground">Fixed-Price Sprints</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Guaranteed scope & milestone delivery timeline.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-bold text-sm text-foreground">Dedicated Pods</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Senior engineers embedded into your rituals.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-bold text-sm text-foreground">100% IP Transfer</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Zero vendor lock-in; all source code is yours.
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
    </section>
  );
}
