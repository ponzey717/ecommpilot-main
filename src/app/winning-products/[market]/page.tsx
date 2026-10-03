import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketFilter } from "@/components/products/market-filter";
import { ProductGrid } from "@/components/products/product-grid";
import { PageShell } from "@/components/site/page-shell";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ market: string }>;
};

export function generateStaticParams() {
  return siteConfig.markets.map((market) => ({ market: market.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: slug } = await params;
  const market = siteConfig.markets.find((item) => item.slug === slug);
  if (!market) return {};
  return buildMetadata({
    title: "Winning Products for eBay " + market.code,
    description: "Browse eCommPilot Winning Products for eBay " + market.name + " with supplier, delivery and profit context.",
    path: "/winning-products/" + market.slug,
  });
}

export default async function MarketPage({ params }: PageProps) {
  const { market: slug } = await params;
  const market = siteConfig.markets.find((item) => item.slug === slug);
  if (!market) notFound();

  return (
    <PageShell>
      <section className="bg-white py-14">
        <div className="site-container">
          <span className="badge badge-market">{market.code}</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">
            Winning Products for eBay {market.code}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Marketplace-specific product research for {market.name}. Production results will be filtered from verified catalog data.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="site-container">
          <MarketFilter />
          <div className="mt-6"><ProductGrid /></div>
          <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
            Current cards are illustrative while the public API and production inventory are being connected.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
