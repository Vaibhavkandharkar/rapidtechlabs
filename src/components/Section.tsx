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
    <section
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${className}`}
    >
      {(eyebrow || title || subtitle) && (
        <div className={`mb-8 sm:mb-12 ${center ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}`}>
          {eyebrow && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-2 sm:mb-3">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 sm:mt-5 text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
