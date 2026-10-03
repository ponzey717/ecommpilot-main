export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
