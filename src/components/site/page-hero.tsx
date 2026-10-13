import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  badge,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="hero-dark">
      <div className="site-container relative z-10 py-12 md:py-14">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="hero-kicker">{eyebrow}</span>
            {badge && (
              <span className="badge border border-white/15 bg-white/8 text-white/75">
                {badge}
              </span>
            )}
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-.045em] text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
            {description}
          </p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
