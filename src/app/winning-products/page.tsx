import type { Metadata } from "next";
import { MarketFilter } from "@/components/products/market-filter";
import { ProductGrid } from "@/components/products/product-grid";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Winning Products for eBay Dropshippers",
  description: "Browse eCommPilot Winning Products across the US, UK and Australia with sales, supplier, delivery and profit context.",
  path: "/winning-products",
});

export default function WinningProductsPage() {
  return (
    <PageShell>
      <section className="bg-white py-14 md:py-18">
        <div className="site-container">
          <span className="badge badge-market">US · UK · AU</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">Winning Products</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Product opportunities organized for eBay dropshippers, with market,
            supplier, delivery and economics context.
          </p>
        </div>
      </section>
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
