import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketFilter } from "@/components/products/market-filter";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import {
  fallbackPublicMarkets,
  getPublicMarketsWithFallback,
} from "@/lib/api/public-catalog";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ market: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function profitBand(value: string | string[] | undefined): number | undefined {
  const raw = typeof value === "string" ? Number(value) : Number.NaN;
  return [10, 15, 20, 25, 30, 35, 40, 50].includes(raw) ? raw : undefined;
}

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
  const minimumProfitBand = profitBand(query.profit);
  const markets = await getPublicMarketsWithFallback();
  const market = markets.find((item) => item.slug === slug && item.active);

  if (!market) notFound();

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
          <MarketFilter market={market.code} minimumProfitBand={minimumProfitBand} />
          <div className="mt-6">
            <CatalogProductGrid market={market.code} minimumProfitBand={minimumProfitBand} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
