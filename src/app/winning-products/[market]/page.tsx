import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketFilter } from "@/components/products/market-filter";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import {
  fallbackPublicMarkets,
  getPublicMarketsWithFallback,
} from "@/lib/api/public-catalog";
import { parseMinProfitBand } from "@/lib/catalog-filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ minProfitBand?: string | string[] }>;
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
  const { market: slug } = await params;
  const query = await searchParams;
  const minProfitBand = parseMinProfitBand(query.minProfitBand);
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
              basePath={path}
            />
          </div>
          <div className="mt-6">
            <CatalogProductGrid
              market={market.code}
              minProfitBand={minProfitBand}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
