import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import {
  getPublicCategories,
  getPublicMarketsWithFallback,
  type PublicCategory,
  type PublicMarket,
} from "@/lib/api/public-catalog";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "eBay Product Categories",
  description: "Browse published eCommPilot Winning Products by eBay category and market.",
  path: "/categories",
});

function categoryHref(market: PublicMarket, category: PublicCategory) {
  return `/winning-products/${market.slug}/${category.slug}`;
}

export default async function CategoriesPage() {
  const markets = (await getPublicMarketsWithFallback()).filter((market) => market.active);
  const groups = await Promise.all(
    markets.map(async (market) => ({
      market,
      categories: await getPublicCategories({ market: market.code }),
    })),
  );
  const unavailable = groups.every((group) => group.categories == null);
  const total = groups.reduce((sum, group) => sum + (group.categories?.length ?? 0), 0);

  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="eBay category structure"
        badge="US · UK · AU"
        title="Browse Winning Products by real marketplace category."
        description="Categories shown here come only from currently published eCommPilot products and remain market-specific instead of pretending eBay has one universal taxonomy."
      />
      <section className="py-14 md:py-18">
        <div className="site-container">
          {unavailable ? (
            <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-8 text-center">
              <p className="eyebrow !text-amber-700">Categories temporarily unavailable</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                Published category data could not be loaded.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                eCommPilot is not substituting an invented category list while the live catalog is unavailable.
              </p>
            </div>
          ) : total === 0 ? (
            <div className="rounded-[22px] border border-[var(--border)] bg-white p-8 text-center">
              <p className="eyebrow">Categories</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                No published category pages are available yet.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Category pages appear automatically when approved Winning Products are published. eCommPilot does not invent taxonomy counts for an empty catalog.
              </p>
            </div>
          ) : (
            <div className="grid gap-10">
              {groups.map(({ market, categories }) => (
                <section key={market.code} aria-labelledby={`market-${market.slug}`}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="eyebrow">eBay {market.code}</p>
                      <h2 id={`market-${market.slug}`} className="mt-2 text-3xl font-extrabold text-[var(--navy)]">
                        {market.name}
                      </h2>
                    </div>
                    <Link
                      href={`/winning-products/${market.slug}`}
                      className="text-sm font-extrabold text-[var(--blue)]"
                    >
                      Browse all {market.code} products →
                    </Link>
                  </div>
                  {categories == null ? (
                    <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-[var(--muted)]">
                      {market.code} category data is temporarily unavailable.
                    </p>
                  ) : categories.length ? (
                    <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {categories.map((category) => (
                        <Link
                          key={`${market.code}:${category.id}`}
                          href={categoryHref(market, category)}
                          className="feature-card group"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="badge badge-market">{market.code}</span>
                            <span className="text-xs font-extrabold text-[var(--muted)]">
                              {category.publishedProductCount} published
                            </span>
                          </div>
                          <h3 className="mt-5 text-xl font-extrabold text-[var(--navy)] group-hover:text-[var(--blue)]">
                            {category.name}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Browse current published Winning Products in this eBay {market.code} category.
                          </p>
                          <p className="mt-5 text-sm font-extrabold text-[var(--blue)]">
                            Open category →
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-5 text-sm text-[var(--muted)]">
                      No published {market.code} category pages yet.
                    </p>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
