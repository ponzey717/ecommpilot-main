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
      <div className="site-container relative z-10 py-14 md:py-20">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="hero-kicker">{eyebrow}</span>
            {badge && (
              <span className="badge border border-white/15 bg-white/8 text-white/75">
                {badge}
              </span>
            )}
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-[-.045em] text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
            {description}
          </p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
