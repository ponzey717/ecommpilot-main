import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogAdvancedFilters } from "@/components/products/catalog-advanced-filters";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { MarketFilter } from "@/components/products/market-filter";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import {
  fallbackPublicMarkets,
  getPublicMarketsWithFallback,
  getPublicProducts,
} from "@/lib/api/public-catalog";
import { hasCatalogQuery, parseCatalogCursor, parseCatalogInteger, parseMinProfitBand, parseSupplierProvider } from "@/lib/catalog-filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ market: string; category: string }>;
  searchParams: Promise<{ minProfitBand?: string | string[]; minSales30d?: string | string[]; maxDeliveryDays?: string | string[]; supplier?: string | string[]; freshnessHours?: string | string[]; cursor?: string | string[] }>;
};

async function resolveCategory(marketSlug: string, categorySlug: string) {
  const markets = await getPublicMarketsWithFallback();
  const market = markets.find((item) => item.slug === marketSlug && item.active);
  if (!market) return { state: "not_found" as const };

  const payload = await getPublicProducts({
    market: market.code,
    category: categorySlug,
    limit: 1,
  });
  if (payload === null) return { state: "unavailable" as const };

  const category = payload.products[0]?.category;
  if (!category || category.slug !== categorySlug) {
    return { state: "not_found" as const };
  }

  return { state: "ok" as const, market, category };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ market: marketSlug, category: categorySlug }, query] = await Promise.all([
    params,
    searchParams,
  ]);
  const resolved = await resolveCategory(marketSlug, categorySlug);

  if (resolved.state !== "ok") {
    const market = fallbackPublicMarkets().find((item) => item.slug === marketSlug);
    return {
      title: market ? "eBay " + market.code + " Products" : "Winning Products",
      robots: { index: false, follow: true },
    };
  }

  return buildMetadata({
    title: resolved.category.name + " Winning Products for eBay " + resolved.market.code,
    description:
      "Browse verified " +
      resolved.category.name +
      " product opportunities for eBay " +
      resolved.market.name +
      " with supplier, delivery and profit context.",
    path:
      "/winning-products/" +
      resolved.market.slug +
      "/" +
      resolved.category.slug,
    noIndex: hasCatalogQuery(query),
  });
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { market: marketSlug, category: categorySlug } = await params;
  const query = await searchParams;
  const minProfitBand = parseMinProfitBand(query.minProfitBand);
  const minSales30d = parseCatalogInteger(query.minSales30d, 100000);
  const maxDeliveryDays = parseCatalogInteger(query.maxDeliveryDays, 365);
  const supplier = parseSupplierProvider(query.supplier);
  const freshnessHours = parseCatalogInteger(query.freshnessHours, 8760);
  const cursor = parseCatalogCursor(query.cursor);
  const resolved = await resolveCategory(marketSlug, categorySlug);
  if (resolved.state === "unavailable") {
    throw new Error("Public category catalog is temporarily unavailable.");
  }
  if (resolved.state === "not_found") notFound();

  const { market, category } = resolved;
  const path = "/winning-products/" + market.slug + "/" + category.slug;

  return (
    <PageShell darkHeader>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Winning Products", path: "/winning-products" },
          { name: market.code, path: "/winning-products/" + market.slug },
          { name: category.name, path },
        ])}
      />
      <PageHero
        eyebrow={"eBay " + market.code + " · " + category.name}
        badge={market.currency}
        title={category.name + " Winning Products"}
        description={
          "Browse published product opportunities for " +
          category.name +
          " in the eBay " +
          market.name +
          " market."
        }
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Winning Products", href: "/winning-products" },
              { label: market.code, href: "/winning-products/" + market.slug },
              { label: category.name },
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
              category={category.slug}
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
