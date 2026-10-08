import type { Metadata } from "next";
import { MarketFilter } from "@/components/products/market-filter";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Winning Products for eBay Dropshippers",
  description: "Browse eCommPilot Winning Products across the US, UK and Australia with sales, supplier, delivery and profit context.",
  path: "/winning-products",
});

function profitBand(value: string | string[] | undefined): number | undefined {
  const raw = typeof value === "string" ? Number(value) : Number.NaN;
  return [10, 15, 20, 25, 30, 35, 40, 50].includes(raw) ? raw : undefined;
}

export default async function WinningProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const minimumProfitBand = profitBand(params.profit);
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
          <MarketFilter minimumProfitBand={minimumProfitBand} />
          <div className="mt-6"><CatalogProductGrid minimumProfitBand={minimumProfitBand} /></div>
        </div>
      </section>
    </PageShell>
  );
}
