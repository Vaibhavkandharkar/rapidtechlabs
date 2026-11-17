import { CheckCircle2, ArrowRight, ShieldCheck, FileCheck, RefreshCw } from "lucide-react";
import { developmentProcess } from "@/data/site";

export function DevelopmentProcessSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Our Methodology
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          From Concept to Production in 5 Proven Stages
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          No black boxes. You get complete transparency into sprint schedules, code repositories,
          and architectural milestones.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {developmentProcess.map((step, idx) => (
          <div
            key={step.step}
            className="relative rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-glow transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-extrabold text-2xl text-gradient-brand">
                  {step.step}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-primary">
                  {step.duration}
                </span>
              </div>
              <h3 className="font-bold text-base text-foreground mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </div>

            <div className="mt-6 pt-3 border-t border-border">
              <span className="text-[10px] font-bold uppercase text-muted-foreground block mb-0.5">
                Key Deliverable:
              </span>
              <span className="text-xs font-semibold text-primary block">{step.deliverable}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-soft border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-brand text-white grid place-items-center shrink-0 shadow-glow">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-base text-foreground">
              Guaranteed Security & Intellectual Property Transfer
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Strict bilateral NDAs, 100% source code ownership, zero proprietary dependencies, and
              GDPR/data privacy compliance.
            </p>
          </div>
        </div>
        <a
          href="#enquiry-form"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand text-white px-5 py-2.5 text-xs font-semibold shadow-glow hover:brightness-110 whitespace-nowrap transition"
        >
          Book Discovery Call <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
