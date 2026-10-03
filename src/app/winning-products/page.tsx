import type { Metadata } from "next";
import { MarketFilter } from "@/components/products/market-filter";
import { ProductGrid } from "@/components/products/product-grid";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Winning Products for eBay Dropshippers",
  description: "Browse eCommPilot Winning Products across the US, UK and Australia with sales, supplier, delivery and profit context.",
  path: "/winning-products",
});

export default function WinningProductsPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Winning Products"
        badge="US · UK · AU"
        title="Browse product opportunities with the research layer already attached."
        description="Marketplace-style discovery for eBay dropshippers, with supplier, delivery and economics context designed to reduce guesswork."
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <MarketFilter />
          <div className="mt-6"><ProductGrid /></div>
          <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
            Development products are illustrative. Live catalog publication requires verified evidence and freshness checks.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
