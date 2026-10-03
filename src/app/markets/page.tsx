import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "eBay Markets",
  description: "Explore eCommPilot Winning Products by eBay market: United States, United Kingdom and Australia.",
  path: "/markets",
});

export default function MarketsPage() {
  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="Browse by market"
        title="Research the market you actually sell in."
        description="Fees, pricing, competition and supplier delivery can vary by marketplace, so eCommPilot keeps market context explicit from the start."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-3">
            {siteConfig.markets.map((market) => (
              <Link key={market.code} href={"/winning-products/" + market.slug} className="feature-card">
                <span className="badge badge-market">{market.code}</span>
                <h2 className="mt-5 text-2xl font-extrabold text-[var(--navy)]">{market.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Browse category-specific product opportunities for eBay {market.code}.
                </p>
                <p className="mt-5 text-sm font-extrabold text-[var(--blue)]">Explore market →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
