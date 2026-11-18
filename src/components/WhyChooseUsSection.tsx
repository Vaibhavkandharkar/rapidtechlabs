import {
  Users,
  Terminal,
  Zap,
  Compass,
  Shield,
  Clock,
  Globe,
  CheckCircle2,
  ArrowRight,
  Award,
} from "lucide-react";
import { whyChooseUsPillars } from "@/data/site";

export function WhyChooseUsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-2 sm:mb-3">
          Why RapidTechLabs
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          Built For High-Growth Enterprises &amp; Ambitious Founders
        </h2>
        <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          We combine the speed and domain agility of a boutique engineering studio with the rigor
          and security required by international enterprises.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {whyChooseUsPillars.map((pillar, i) => (
          <div
            key={i}
            className="group rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-card hover:shadow-glow hover:-translate-y-1 transition duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center mb-5 text-white shadow-glow group-hover:scale-105 transition-transform">
              <pillar.icon size={22} />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">{pillar.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
          </div>
        ))}

        {/* Highlight Banner Card */}
        <div className="rounded-2xl bg-gradient-hero text-white p-6 sm:p-8 shadow-glow flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1 text-xs font-semibold text-cyan mb-3">
              <Award size={14} /> 100% Quality Commitment
            </div>
            <h3 className="font-bold text-xl mb-2">Our Engineering Guarantee</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Every deliverable undergoes automated test suites, manual security validation, and
              cross-browser audits before deployment. If something doesn't work, we fix it promptly
              under warranty.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 text-cyan font-semibold text-sm hover:underline"
            >
              Start a Conversation <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
