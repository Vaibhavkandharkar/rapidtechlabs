import {
  Globe,
  ShieldCheck,
  Clock,
  Users,
  ArrowRight,
  Laptop,
  Server,
  Code2,
  Workflow,
  CheckCircle,
  MessageSquare,
  Handshake,
  Zap,
} from "lucide-react";
import { agencyPartnership } from "@/data/site";

export function AgencyPartnershipSection() {
  return (
    <section id="agency-partners" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="rounded-3xl bg-gradient-hero text-white p-8 sm:p-14 shadow-glow relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mb-12 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1 text-xs font-semibold text-cyan mb-3">
            <Handshake size={14} /> {agencyPartnership.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {agencyPartnership.title}
          </h2>
          <p className="mt-4 text-white/80 text-base sm:text-lg leading-relaxed">
            {agencyPartnership.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-white/70">
            <span>Trusted technical partner for marketing & design agencies in:</span>
            {agencyPartnership.targetRegions.map((region) => (
              <span
                key={region}
                className="inline-flex items-center gap-1 rounded-md glass-dark px-2.5 py-1 text-cyan"
              >
                <Globe size={12} /> {region}
              </span>
            ))}
          </div>
        </div>

        {/* Core Partnership Capabilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-12">
          {agencyPartnership.capabilities.map((cap, i) => (
            <div
              key={i}
              className="rounded-2xl glass-dark p-6 border border-white/10 hover:border-cyan/40 transition"
            >
              <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-cyan shrink-0" />
                {cap.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Services Offered to Agencies */}
        <div className="rounded-2xl glass p-6 sm:p-8 text-foreground relative z-10 bg-card/95">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Technical Capabilities We Provide
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1">
                Your Agency Sells & Designs. We Build & Support.
              </h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Deliver complex engineering without the headache of managing full-time in-house
                development squads.
              </p>

              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-xs font-medium">
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Laptop size={16} className="text-primary" /> White-Label Next.js & React
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Server size={16} className="text-primary" /> Custom Backends & REST APIs
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Code2 size={16} className="text-primary" /> Headless WordPress & CMS
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Workflow size={16} className="text-primary" /> Complex Third-Party Integrations
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary" /> Strict White-Label NDA
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Zap size={16} className="text-primary" /> 24/7 Ongoing Client SLA
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <div className="p-6 rounded-2xl bg-secondary/40 border border-border">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Ready to Expand Capacity?
                </div>
                <div className="text-lg font-bold text-foreground mb-4">
                  Schedule Agency Discovery
                </div>
                <a
                  href="#enquiry-form"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand text-white px-5 py-3 text-sm font-semibold shadow-glow hover:brightness-110 transition"
                >
                  Partner With Us <ArrowRight size={16} />
                </a>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Free consultation · NDA signed upfront
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
