import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact RapidTechLabs — Book a discovery call" },
      { name: "description", content: "Tell us about your project. We respond within one business day." },
      { property: "og:title", content: "Contact RapidTechLabs" },
      { property: "og:description", content: "Book a discovery call." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's build what's next." subtitle="Tell us about your goals — we'll respond within one business day with a tailored plan." />
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-2xl bg-card border border-border p-8 shadow-card space-y-5"
            >
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="mx-auto text-accent" size={48} />
                  <h3 className="mt-4 text-xl font-semibold">Thanks — message received</h3>
                  <p className="mt-2 text-muted-foreground">We'll be in touch within one business day.</p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" name="name" required />
                    <Field label="Work email" name="email" type="email" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Company" name="company" />
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Service of interest</label>
                      <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Not sure yet</option>
                        {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tell us about your project</label>
                    <textarea required rows={5} maxLength={2000}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" defaultChecked /> Request a product demo
                  </label>
                  <button type="submit" className="w-full rounded-lg bg-gradient-brand px-6 py-3 font-semibold text-white shadow-glow hover:brightness-110 transition">
                    Send message
                  </button>
                </>
              )}
            </form>
          </div>
          <aside className="space-y-6">
            <InfoCard icon={Mail} label="Email" value="hello@rapidtechlabs.com" />
            <InfoCard icon={Phone} label="Phone" value="+1 (555) 123-4567" />
            <InfoCard icon={MapPin} label="HQ" value="Global · Remote-first" />
            <div className="rounded-2xl bg-gradient-hero text-white p-6 shadow-glow">
              <h4 className="font-semibold">Need something fast?</h4>
              <p className="mt-2 text-sm text-white/80">Urgent inquiries answered within 2 hours during business hours.</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1.5">{label}</label>
      <input id={name} name={name} type={type} required={required} maxLength={255}
        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-card flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-gradient-brand grid place-items-center"><Icon className="text-white" size={20} /></div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}
