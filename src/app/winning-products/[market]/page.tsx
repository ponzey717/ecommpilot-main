import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogAdvancedFilters } from "@/components/products/catalog-advanced-filters";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { MarketFilter } from "@/components/products/market-filter";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import {
  fallbackPublicMarkets,
  getPublicMarketsWithFallback,
} from "@/lib/api/public-catalog";
import { hasCatalogQuery, parseCatalogCursor, parseCatalogInteger, parseMinProfitBand, parseSupplierProvider } from "@/lib/catalog-filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ minProfitBand?: string | string[]; minSales30d?: string | string[]; maxDeliveryDays?: string | string[]; supplier?: string | string[]; freshnessHours?: string | string[]; cursor?: string | string[] }>;
};

export function generateStaticParams() {
  return fallbackPublicMarkets().map((market) => ({ market: market.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ market: slug }, query] = await Promise.all([params, searchParams]);
  const market = fallbackPublicMarkets().find((item) => item.slug === slug);
  if (!market) return {};

  return buildMetadata({
    title: "Winning Products for eBay " + market.code,
    description:
      "Browse eCommPilot Winning Products for eBay " +
      market.name +
      " with supplier, delivery and profit context.",
    path: "/winning-products/" + market.slug,
    noIndex: hasCatalogQuery(query),
  });
}

export default async function MarketPage({ params, searchParams }: PageProps) {
  const { market: slug } = await params;
  const query = await searchParams;
  const minProfitBand = parseMinProfitBand(query.minProfitBand);
  const minSales30d = parseCatalogInteger(query.minSales30d, 100000);
  const maxDeliveryDays = parseCatalogInteger(query.maxDeliveryDays, 365);
  const supplier = parseSupplierProvider(query.supplier);
  const freshnessHours = parseCatalogInteger(query.freshnessHours, 8760);
  const cursor = parseCatalogCursor(query.cursor);
  const markets = await getPublicMarketsWithFallback();
  const market = markets.find((item) => item.slug === slug && item.active);

  if (!market) notFound();

  const path = "/winning-products/" + market.slug;

  return (
    <PageShell darkHeader>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Winning Products", path: "/winning-products" },
          { name: market.code, path },
        ])}
      />
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
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Winning Products", href: "/winning-products" },
              { label: market.code },
            ]}
          />
          <div className="mt-8">
            <MarketFilter
              currentMarket={market.code}
              currentMinProfitBand={minProfitBand}
              minSales30d={minSales30d}
              maxDeliveryDays={maxDeliveryDays}
              supplier={supplier}
              freshnessHours={freshnessHours}
              basePath={path}
            />
            <CatalogAdvancedFilters
              basePath={path}
              minProfitBand={minProfitBand}
              minSales30d={minSales30d}
              maxDeliveryDays={maxDeliveryDays}
              supplier={supplier}
              freshnessHours={freshnessHours}
            />
          </div>
          <div className="mt-6">
            <CatalogProductGrid
              market={market.code}
              minProfitBand={minProfitBand}
              minSales30d={minSales30d}
              maxDeliveryDays={maxDeliveryDays}
              supplier={supplier}
              freshnessHours={freshnessHours}
              cursor={cursor}
              basePath={path}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
