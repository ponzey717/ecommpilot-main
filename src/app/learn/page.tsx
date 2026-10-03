import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
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
    <PageShell darkHeader>
      <PageHero
        eyebrow="Learn"
        title="Practical research guidance for eBay sellers."
        description="The Learn hub will support Winning Products and the free tools with evergreen guidance, not thin SEO filler."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide,index) => (
              <article key={guide} className="feature-card">
                <span className="feature-number">{String(index + 1).padStart(2,"0")}</span>
                <h2 className="mt-5 text-xl font-extrabold text-[var(--navy)]">{guide}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Guide structure prepared. Full article content will be completed before article URLs are indexed.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
