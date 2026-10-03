import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Learn eBay Product Research",
  description: "Practical eCommPilot guides for eBay product research, supplier validation, profit calculations and listing preparation.",
  path: "/learn",
});

const guides = [
  "How to evaluate an eBay dropshipping product",
  "Understanding profit margin vs ROI",
  "Why a standby supplier matters",
  "How delivery time affects a product opportunity",
  "Building cleaner eBay titles",
  "What to recheck before listing",
];

export default function LearnPage() {
  return (
    <PageShell>
      <section className="bg-white py-16">
        <div className="site-container">
          <p className="eyebrow">Learn</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">Practical research guidance for eBay sellers.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">The Learn hub will support the tools and Winning Products catalog with useful evergreen guidance, not thin SEO filler.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide,index) => (
              <article key={guide} className="feature-card">
                <span className="feature-number">{String(index + 1).padStart(2,"0")}</span>
                <h2 className="mt-5 text-xl font-extrabold text-[var(--navy)]">{guide}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Guide structure prepared. Full article content will be added before indexing.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
