import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, ArrowRight, Layers, Cpu, ShieldCheck } from "lucide-react";
import type { Service } from "@/data/site";

export function ServiceDetailModal({
  service,
  open,
  onOpenChange,
}: {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-3 py-1 text-white text-xs font-semibold uppercase tracking-wider w-fit mb-2">
            <service.icon size={14} /> {service.category}
          </div>
          <DialogTitle className="text-2xl font-bold">{service.title}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground mt-1">
            {service.short}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <p className="text-sm text-foreground leading-relaxed">{service.description}</p>

          {/* Business Benefits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
              Measurable Business Impact
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {service.businessBenefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What We Deliver */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Project Deliverables
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-xs font-medium">
              {service.deliverables.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.techUsed.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-border">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold hover:bg-secondary transition"
            >
              Close
            </button>
            <a
              href="#enquiry-form"
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand text-white px-5 py-2.5 text-xs font-semibold shadow-glow hover:brightness-110 transition"
            >
              Discuss {service.title} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
