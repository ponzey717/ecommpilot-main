export default function CategoriesLoading() {
  return (
    <div className="min-h-[55vh] bg-[var(--background)]">
      <div className="site-container py-12 md:py-16">
        <div className="h-5 w-32 animate-pulse rounded-full bg-[var(--surface-soft)]" />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-44 animate-pulse rounded-[22px] border border-[var(--border)] bg-white"
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--muted)]">
          Loading verified category data…
        </p>
      </div>
    </div>
  );
}
