export default function WinningProductsLoading() {
  return (
    <div className="min-h-[60vh] bg-[var(--background)]">
      <div className="site-container py-12 md:py-16">
        <div className="h-5 w-36 animate-pulse rounded-full bg-[var(--surface-soft)]" />
        <div className="mt-5 h-12 max-w-2xl animate-pulse rounded-2xl bg-[var(--surface-soft)]" />
        <div className="mt-8 h-20 animate-pulse rounded-[18px] border border-[var(--border)] bg-white" />
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-[360px] animate-pulse rounded-[24px] border border-[var(--border)] bg-white"
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--muted)]">
          Loading verified public catalog data…
        </p>
      </div>
    </div>
  );
}
