import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { getPublicMarketsWithFallback } from "@/lib/api/public-catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "eBay Markets",
  description:
    "Explore eCommPilot Winning Products by eBay market: United States, United Kingdom and Australia.",
  path: "/markets",
});

export default async function MarketsPage() {
  const markets = (await getPublicMarketsWithFallback()).filter((market) => market.active);

  return (
    <PageShell darkHeader>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Markets", path: "/markets" },
        ])}
      />
      <PageHero
        eyebrow="Browse by market"
        title="Research the market you actually sell in."
        description="Fees, pricing, competition and supplier delivery can vary by marketplace, so eCommPilot keeps market context explicit from the start."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Markets" },
            ]}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {markets.map((market) => (
              <Link
                key={market.code}
                href={"/winning-products/" + market.slug}
                className="feature-card"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="badge badge-market">{market.code}</span>
                  <span className="text-xs font-extrabold text-[var(--muted)]">
                    {market.currency}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-extrabold text-[var(--navy)]">
                  {market.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Browse market-specific Winning Product opportunities for eBay {market.code}.
                </p>
                <p className="mt-5 text-sm font-extrabold text-[var(--blue)]">
                  Explore market →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
