import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogQueryForm } from "@/components/products/catalog-query-form";
import { MarketFilter } from "@/components/products/market-filter";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import {
  fallbackPublicMarkets,
  getPublicCategories,
  getPublicMarketsWithFallback,
} from "@/lib/api/public-catalog";
import {
  parsePublicCatalogCursor,
  parsePublicCatalogFilters,
} from "@/lib/catalog-filters";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ market: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return fallbackPublicMarkets().map((market) => ({ market: market.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: slug } = await params;
  const market = fallbackPublicMarkets().find((item) => item.slug === slug);
  if (!market) return {};

  return buildMetadata({
    title: "Winning Products for eBay " + market.code,
    description:
      "Browse eCommPilot Winning Products for eBay " +
      market.name +
      " with supplier, delivery and profit context.",
    path: "/winning-products/" + market.slug,
  });
}

export default async function MarketPage({ params, searchParams }: PageProps) {
  const [{ market: slug }, query] = await Promise.all([params, searchParams]);
  const filters = parsePublicCatalogFilters(query);
  const cursor = parsePublicCatalogCursor(query.cursor);
  const markets = await getPublicMarketsWithFallback();
  const market = markets.find((item) => item.slug === slug && item.active);

  if (!market) notFound();
  const categories = await getPublicCategories({ market: market.code });

  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow={"eBay " + market.code}
        badge={market.currency}
        title={"Winning Products for eBay " + market.code}
        description={
          "Marketplace-specific product research for " +
          market.name +
          ", with supplier, delivery and economics context."
        }
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <MarketFilter market={market.code} filters={filters} />
          <CatalogQueryForm
            market={market.code}
            categories={categories ?? []}
            categoriesUnavailable={categories == null}
            filters={filters}
          />
          <div className="mt-6">
            <CatalogProductGrid
              market={market.code}
              category={filters.category}
              search={filters.search}
              minimumProfitBand={filters.profit}
              minimumSales30d={filters.sales}
              maximumDeliveryDays={filters.delivery}
              freshnessHours={filters.freshness}
              supplier={filters.supplier}
              sort={filters.sort}
              cursor={cursor}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
