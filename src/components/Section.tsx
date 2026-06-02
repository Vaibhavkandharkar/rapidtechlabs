import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  center,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 ${className}`}>
      {(eyebrow || title || subtitle) && (
        <div className={`mb-12 ${center ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}`}>
          {eyebrow && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              {eyebrow}
            </span>
          )}
          {title && <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>}
          {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {eyebrow && <span className="text-xs font-semibold uppercase tracking-widest text-cyan">{eyebrow}</span>}
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-5 text-white/80 text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
