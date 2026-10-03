import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-white py-24">
        <div className="site-container text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">This page is not here.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">The link may be old, or the product may no longer be published.</p>
          <div className="mt-8"><Link href="/" className="button button-primary">Back to eCommPilot</Link></div>
        </div>
      </section>
    </PageShell>
  );
}
