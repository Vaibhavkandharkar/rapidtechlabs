import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { services } from "@/data/site";
import { generateMeta, webPageSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => generateMeta({
    title: "Contact RapidTechLabs — Book a Free Discovery Call Today",
    description: "Tell us about your project and get a tailored plan within one business day. Enterprise IT, ERP, hospital management, AI integration and digital marketing solutions.",
    path: "/contact",
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      service: formData.get('service'),
      project: formData.get('project'),
      demo: formData.get('demo') === 'on'
    };

    try {
      const response = await fetch('https://api.rapidtechlabs.in/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's build what's next." subtitle="Tell us about your goals — we'll respond within one business day with a tailored plan." />
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
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
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" name="name" required />
                    <Field label="Work email" name="email" type="email" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Company" name="company" />
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Service of interest</label>
                      <select name="service" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Not sure yet</option>
                        {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tell us about your project</label>
                    <textarea name="project" required rows={5} maxLength={2000}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" name="demo" defaultChecked /> Request a product demo
                  </label>
                  <button type="submit" disabled={loading} className="w-full rounded-lg bg-gradient-brand px-6 py-3 font-semibold text-white shadow-glow hover:brightness-110 transition disabled:opacity-70">
                    {loading ? 'Sending...' : 'Send message'}
                  </button>
                </>
              )}
            </form>
          </div>
          <aside className="space-y-6">
            <InfoCard icon={Mail} label="Email" value="contact.rapidtechlabs@gmail.com" />
            <InfoCard icon={Phone} label="Phone" value="+91 9325378590" />
            <InfoCard icon={MapPin} label="HQ" value="Global · Remote-first" />
            <div className="rounded-2xl bg-gradient-hero text-white p-6 shadow-glow">
              <h4 className="font-semibold">Need something fast?</h4>
              <p className="mt-2 text-sm text-white/80">Urgent inquiries answered within 2 hours during business hours.</p>
            </div>
          </aside>
        </div>
      </Section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Contact RapidTechLabs",
              description: "Tell us about your project. We respond within one business day.",
              path: "/contact",
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
              { name: "Contact", path: "/contact" },
            ])
          ),
        }}
      />
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
