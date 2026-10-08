import type { Metadata } from "next";
import { CatalogQueryForm } from "@/components/products/catalog-query-form";
import { MarketFilter } from "@/components/products/market-filter";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import {
  parsePublicCatalogCursor,
  parsePublicCatalogFilters,
} from "@/lib/catalog-filters";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Winning Products for eBay Dropshippers",
  description: "Browse eCommPilot Winning Products across the US, UK and Australia with sales, supplier, delivery and profit context.",
  path: "/winning-products",
});

export default async function WinningProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parsePublicCatalogFilters(params);
  const cursor = parsePublicCatalogCursor(params.cursor);
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
          <MarketFilter filters={filters} />
          <CatalogQueryForm
            categories={[]}
            filters={{ ...filters, category: undefined }}
          />
          <div className="mt-6"><CatalogProductGrid
            search={filters.search}
            minimumProfitBand={filters.profit}
            minimumSales30d={filters.sales}
            maximumDeliveryDays={filters.delivery}
            freshnessHours={filters.freshness}
            supplier={filters.supplier}
            sort={filters.sort}
            cursor={cursor}
          /></div>
        </div>
      </section>
    </PageShell>
  );
}
