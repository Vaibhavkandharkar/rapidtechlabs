import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Zap } from "lucide-react";
import hero from "@/assets/hero.jpg";
import dashboard from "@/assets/dashboard.jpg";
import about from "@/assets/about.jpg";
import { services, stats, industries, techStack, caseStudies, faqs, testimonials } from "@/data/site";
import { Section } from "@/components/Section";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RapidTechLabs — Smart Technology Solutions for Modern Enterprises" },
      { name: "description", content: "Transforming businesses through ERP, AI, healthcare, education and product engineering. 100+ projects, 50+ clients, 99% satisfaction." },
      { property: "og:title", content: "RapidTechLabs — Smart Technology Solutions" },
      { property: "og:description", content: "Enterprise IT, AI integration and digital growth — engineered for scale." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 opacity-30">
          <img src={hero} alt="" className="w-full h-full object-cover" width={1600} height={1024} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.18_0.08_250)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium text-cyan">
              <Sparkles size={14} /> Enterprise IT · AI · Growth
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Transforming Businesses Through{" "}
              <span className="bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent">
                Smart Technology Solutions
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              From industrial ERP to AI copilots, we engineer the digital backbone of forward-thinking organizations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 font-semibold text-brand hover:brightness-110 transition shadow-glow">
                Request a Demo <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-lg glass-dark px-6 py-3 font-semibold text-white hover:bg-white/20 transition">
                Explore Services
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-cyan">{s.value}</div>
                  <div className="text-xs text-white/70 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float">
            <div className="relative rounded-2xl overflow-hidden shadow-glow ring-1 ring-white/20">
              <img src={dashboard} alt="Platform dashboard" className="w-full h-auto" width={1400} height={896} />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-brand p-2"><Zap className="text-white" size={18} /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Avg. deployment</div>
                  <div className="font-semibold text-foreground">6 weeks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
            {["Meridian", "Northcare", "Brightline", "FinPivot", "Loomstack", "Volton"].map((n) => (
              <span key={n} className="font-display font-bold text-xl text-muted-foreground">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section eyebrow="What we do" title="Solutions engineered for scale" subtitle="Six core practices, one accountable partner." center>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link key={s.slug} to="/services" className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-glow transition-all border border-border">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={s.image} alt={s.title} width={1200} height={800} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-lg bg-gradient-brand p-2"><s.icon className="text-white" size={18} /></div>
                  <h3 className="font-semibold text-lg text-foreground">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{s.short}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ABOUT */}
      <Section className="bg-gradient-soft rounded-3xl mx-4 sm:mx-6 lg:mx-8 !max-w-none">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img src={about} alt="Our team" className="w-full h-auto" width={1400} height={960} loading="lazy" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">About RapidTechLabs</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">A premium engineering partner for ambitious teams</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We blend deep domain expertise with rigorous engineering to deliver platforms that move the needle —
              from factory floors to hospital wards, classrooms to capital markets.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Senior, full-stack engineering pods",
                "Secure-by-design architecture",
                "Outcome-driven delivery model",
                "Long-term partnership mindset",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3"><CheckCircle2 className="text-accent mt-0.5" size={20} /><span>{t}</span></li>
              ))}
            </ul>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 font-semibold text-white shadow-glow">
              Read our story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section eyebrow="Industries we serve" title="Domain depth that compounds" subtitle="We've shipped production systems across every vertical that matters." center>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((i) => (
            <div key={i.name} className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-card hover:-translate-y-1 transition">
              <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center mb-3"><i.icon className="text-white" size={22} /></div>
              <div className="text-sm font-medium">{i.name}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* TECH STACK */}
      <Section eyebrow="Technology stack" title="Modern, proven, production-ready" center>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((t) => (
            <span key={t} className="rounded-full glass px-4 py-2 text-sm font-medium text-foreground shadow-card">
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* CASE STUDIES */}
      <Section eyebrow="Case studies" title="Outcomes our clients love" center>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.slice(0, 3).map((c) => (
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
        <div className="mt-10 text-center">
          <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 font-semibold hover:bg-secondary transition">
            View full portfolio <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* TESTIMONIALS PREVIEW */}
      <Section eyebrow="Testimonials" title="Trusted by leaders, loved by teams" center>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <blockquote key={t.name} className="rounded-2xl bg-card border border-border p-6 shadow-card">
              <p className="text-foreground">"{t.quote}"</p>
              <footer className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-brand grid place-items-center text-white font-semibold">
                  {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Frequently asked" center>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* CTA */}
      <section className="mx-4 sm:mx-6 lg:mx-8 mb-12">
        <div className="mx-auto max-w-7xl bg-gradient-hero text-white rounded-3xl p-10 sm:p-16 text-center shadow-glow relative overflow-hidden">
          <Shield className="absolute -right-10 -top-10 text-white/5" size={240} />
          <h2 className="text-3xl sm:text-4xl font-bold">Let's build what's next.</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">Tell us about your goals — we'll respond within one business day with a tailored plan.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 font-semibold text-brand shadow-glow hover:brightness-110 transition">
            Book a discovery call <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
