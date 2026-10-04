"use client";

export default function WinningProductsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[55vh] bg-[var(--background)]">
      <div className="site-container py-16 text-center">
        <p className="eyebrow">Catalog status</p>
        <h1 className="mt-3 text-3xl font-extrabold text-[var(--navy)]">
          Verified catalog data is temporarily unavailable.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          eCommPilot is not substituting sample or guessed product evidence. Try the
          verified catalog again when the data service responds.
        </p>
        <button type="button" onClick={reset} className="button button-primary mt-6">
          Try again
        </button>
      </div>
    </div>
  );
}
