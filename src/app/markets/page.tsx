import type { Metadata } from "next";
import Link from "next/link";
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
    <PageShell>
      <section className="bg-white py-16">
        <div className="site-container">
          <p className="eyebrow">Browse by market</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-.04em] text-[var(--navy)] md:text-6xl">Research the market you actually sell in.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Fees, pricing, competition and supplier delivery can vary by marketplace, so eCommPilot keeps market context explicit.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {siteConfig.markets.map((market) => (
              <Link key={market.code} href={"/winning-products/" + market.slug} className="feature-card">
                <span className="badge badge-market">{market.code}</span>
                <h2 className="mt-5 text-2xl font-extrabold text-[var(--navy)]">{market.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Browse category-specific product opportunities for eBay {market.code}.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
