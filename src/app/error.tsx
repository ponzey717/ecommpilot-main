"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("eCommPilot public route error", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center bg-[var(--surface-soft)] py-20">
      <div className="site-container">
        <div className="mx-auto max-w-2xl rounded-[24px] border border-[var(--border)] bg-white p-8 text-center shadow-sm md:p-12">
          <p className="eyebrow">Something went wrong</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-[-.03em] text-[var(--navy)] md:text-5xl">
            This page could not be completed.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">
            No product or account action was taken. You can retry this page or return to the public homepage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" className="button button-primary" onClick={() => reset()}>
              Try again
            </button>
            <a href="/" className="button button-secondary">
              Back to eCommPilot
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
