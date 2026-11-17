import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { Mail, Phone, MapPin, MessageSquare, Video, ShieldCheck, Clock, Globe } from "lucide-react";
import { generateMeta, webPageSchema, breadcrumbSchema, organizationSchema } from "@/lib/seo";
import { ProjectEnquiryForm } from "@/components/ProjectEnquiryForm";
import { InstantMeeting } from "@/components/InstantMeeting";

export const Route = createFileRoute("/contact")({
  head: () =>
    generateMeta({
      title: "Contact RapidTechLabs — Book a Free Discovery Call Today",
      description:
        "Tell us about your project and get a guaranteed proposal within 24 hours. Custom software, website development, ERP, AI integration, and digital agency partnerships.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & Consultations"
        title="Let's Build What's Next for Your Organization"
        subtitle="Tell us about your goals, timelines, and technical requirements. A senior solution architect will review your brief and respond with a tailored proposal within 24 business hours."
      />

      <Section>
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Enquiry Form */}
          <div className="lg:col-span-8">
            <ProjectEnquiryForm
              title="Project Brief & Consultation Request"
              subtitle="Fill out the details below. We sign mutual non-disclosure agreements upfront."
            />
          </div>

          {/* Sidebar Contact Info & Fast Track */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl bg-card border border-border p-6 shadow-card space-y-4">
              <h3 className="font-bold text-lg text-foreground pb-2 border-b border-border">
                Direct Channels
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white grid place-items-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">General & Sales Email</div>
                  <a
                    href="mailto:contact.rapidtechlabs@gmail.com"
                    className="font-semibold text-sm text-foreground hover:text-primary transition"
                  >
                    contact.rapidtechlabs@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white grid place-items-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Direct Call & WhatsApp</div>
                  <a
                    href="tel:+919325378590"
                    className="font-semibold text-sm text-foreground hover:text-primary transition"
                  >
                    +91 9325378590
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white grid place-items-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Headquarters & Availability</div>
                  <div className="font-semibold text-sm text-foreground">
                    Global · Remote-First (US, UK, CA, AU Friendly)
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/919325378590"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-semibold transition"
                >
                  <MessageSquare size={16} /> Quick Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Instant Meeting Card */}
            <div className="rounded-2xl bg-gradient-hero text-white p-6 shadow-glow">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan block mb-1">
                Zero Waiting Time
              </span>
              <h4 className="text-xl font-bold">Need to Speak Right Now?</h4>
              <p className="mt-2 text-xs text-white/80 leading-relaxed">
                Generate an instant video room or schedule a guaranteed meeting slot directly on our
                Google Meet calendar.
              </p>
              <div className="mt-5">
                <InstantMeeting
                  trigger={
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan text-brand px-4 py-2.5 text-xs font-bold shadow-glow hover:brightness-110 transition">
                      <Video size={16} /> Launch Instant Video Meeting
                    </button>
                  }
                />
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="rounded-2xl bg-secondary/50 border border-border p-6 space-y-3 text-xs text-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent shrink-0" />
                <span>Strict bilateral NDA signed upfront</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-accent shrink-0" />
                <span>Under 24-hour response turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-accent shrink-0" />
                <span>Full overlap with US, UK & Australian hours</span>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Contact RapidTechLabs",
              description:
                "Tell us about your project. We respond within one business day with a tailored plan.",
              path: "/contact",
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
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
    </>
  );
}
