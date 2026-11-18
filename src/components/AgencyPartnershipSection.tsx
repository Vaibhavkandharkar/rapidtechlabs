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
    <section
      id="agency-partners"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-hero text-white p-5 sm:p-10 lg:p-14 shadow-glow relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mb-8 sm:mb-12 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1 text-xs font-semibold text-cyan mb-3">
            <Handshake size={14} className="shrink-0" /> {agencyPartnership.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {agencyPartnership.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">
            {agencyPartnership.subtitle}
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-white/70">
            <span>Trusted technical partner for marketing &amp; design agencies in:</span>
            {agencyPartnership.targetRegions.map((region) => (
              <span
                key={region}
                className="inline-flex items-center gap-1 rounded-md glass-dark px-2.5 py-1 text-cyan"
              >
                <Globe size={12} className="shrink-0" /> {region}
              </span>
            ))}
          </div>
        </div>

        {/* Core Partnership Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10 mb-8 sm:mb-12">
          {agencyPartnership.capabilities.map((cap, i) => (
            <div
              key={i}
              className="rounded-2xl glass-dark p-5 sm:p-6 border border-white/10 hover:border-cyan/40 transition"
            >
              <h3 className="font-bold text-base sm:text-lg text-white mb-2 flex items-start gap-2">
                <CheckCircle size={18} className="text-cyan shrink-0 mt-0.5" />
                <span>{cap.title}</span>
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Services Offered to Agencies */}
        <div className="rounded-2xl glass p-5 sm:p-8 text-foreground relative z-10 bg-card/95">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-8 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Technical Capabilities We Provide
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                Your Agency Sells &amp; Designs. We Build &amp; Support.
              </h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Deliver complex engineering without the headache of managing full-time in-house
                development squads.
              </p>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-medium">
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Laptop size={16} className="text-primary shrink-0" />
                  <span>White-Label Next.js &amp; React</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Server size={16} className="text-primary shrink-0" />
                  <span>Custom Backends &amp; REST APIs</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Code2 size={16} className="text-primary shrink-0" />
                  <span>Headless WordPress &amp; CMS</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Workflow size={16} className="text-primary shrink-0" />
                  <span>Complex Third-Party Integrations</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary shrink-0" />
                  <span>Strict White-Label NDA</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center gap-2">
                  <Zap size={16} className="text-primary shrink-0" />
                  <span>Priority Ongoing Client SLA</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 min-w-0 text-center lg:text-right">
              <div className="p-5 sm:p-6 rounded-2xl bg-secondary/40 border border-border">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Ready to Expand Capacity?
                </div>
                <div className="text-base sm:text-lg font-bold text-foreground mb-4">
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
