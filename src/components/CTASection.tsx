import { ArrowRight, Video, Shield, Clock, Sparkles, MessageSquare } from "lucide-react";
import { InstantMeeting } from "@/components/InstantMeeting";

export function CTASection({
  title = "Ready to Transform Your Digital Infrastructure?",
  subtitle = "Schedule a 15-minute technical discovery call with our solutions team, or request a guaranteed milestone estimate for your next project.",
  primaryText = "Request a Free Quote",
  secondaryText = "Book Video Meeting",
  className = "",
}: {
  title?: string;
  subtitle?: string;
  primaryText?: string;
  secondaryText?: string;
  className?: string;
}) {
  return (
    <section className={`mx-4 sm:mx-6 lg:mx-8 my-16 ${className}`}>
      <div className="mx-auto max-w-7xl bg-gradient-hero text-white rounded-3xl p-8 sm:p-14 lg:p-16 text-center shadow-glow relative overflow-hidden">
        <Shield
          className="absolute -right-12 -top-12 text-white/5 pointer-events-none"
          size={280}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1 text-xs font-semibold text-cyan mb-4">
            <Sparkles size={14} /> Start Within 48 Hours
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
          <p className="mt-4 text-white/80 text-base sm:text-lg leading-relaxed">{subtitle}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan text-brand px-6 py-3.5 font-semibold text-sm sm:text-base shadow-glow hover:brightness-110 transition active:scale-95"
            >
              {primaryText} <ArrowRight size={18} />
            </a>

            <InstantMeeting
              trigger={
                <button className="inline-flex items-center gap-2 rounded-xl glass-dark text-white px-6 py-3.5 font-semibold text-sm sm:text-base hover:bg-white/20 transition active:scale-95">
                  <Video size={18} className="text-cyan" /> {secondaryText}
                </button>
              }
            />
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-6 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-cyan" /> Response in &lt; 24h
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-cyan" /> Mutual NDA upfront
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare size={14} className="text-cyan" /> WhatsApp support available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
