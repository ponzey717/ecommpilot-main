import Link from "next/link";

export function GuideArticle({
  intro,
  sections,
  primaryHref = "/winning-products",
  primaryLabel = "Browse Winning Products",
  secondaryHref = "/free-tools",
  secondaryLabel = "Explore Free Tools",
}: {
  intro: string;
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
    points?: readonly string[];
  }[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <article className="mx-auto max-w-4xl">
      <p className="text-lg leading-8 text-[var(--muted)]">{intro}</p>

      <div className="mt-10 grid gap-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-[var(--navy)] md:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-4 grid gap-4 text-[15px] leading-7 text-[var(--muted)]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.points?.length ? (
              <ul className="mt-5 grid gap-3 rounded-[22px] border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="font-black text-[var(--blue)]">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-[24px] border border-[var(--border)] bg-[var(--surface-soft)] p-6">
        <p className="eyebrow">Continue researching</p>
        <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
          Turn the checklist into a real product decision.
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={primaryHref} className="button button-primary">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="button button-secondary">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
