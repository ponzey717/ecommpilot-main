import type { Metadata } from "next";
import Link from "next/link";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";
import {
  publicDeliveryThresholds,
  publicFreshnessThresholds,
  publicProfitBands,
  publicSalesThresholds,
  hasPublicCatalogQuery,
  parsePublicCatalogFilters,
} from "@/lib/catalog-filters";
import {
  getPublicCategories,
  getPublicMarketsWithFallback,
  type PublicMarket,
} from "@/lib/api/public-catalog";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  return buildMetadata({
    title: "What's Trending on eBay",
    description:
      "Explore currently published eCommPilot product opportunities ranked by verified 30-day eBay SOLD demand across the US, UK and Australia.",
    path: "/whats-trending",
    noIndex: hasPublicCatalogQuery(params, ["market"]),
  });
}

function one(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function allowedNumber(value: string, allowed: readonly number[]): number | undefined {
  const parsed = Number(value);
  return allowed.includes(parsed) ? parsed : undefined;
}

export default async function WhatsTrendingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const markets = (await getPublicMarketsWithFallback()).filter((item) => item.active);
  const marketCode = one(params.market).toUpperCase();
  const market = markets.find((item) => item.code === marketCode) as PublicMarket | undefined;
  const catalogFilters = parsePublicCatalogFilters(params);
  const categoryPayload = market ? await getPublicCategories({ market: market.code }) : [];
  const categories = categoryPayload ?? [];
  const categoriesUnavailable = market != null && categoryPayload == null;
  const requestedCategory = catalogFilters.category ?? "";
  const category = categoriesUnavailable
    ? requestedCategory
    : categories.some((item) => item.slug === requestedCategory)
      ? requestedCategory
      : "";
  const search = catalogFilters.search ?? "";
  const supplier = catalogFilters.supplier;
  const profit = allowedNumber(one(params.profit), publicProfitBands);
  const sales = allowedNumber(one(params.sales), publicSalesThresholds);
  const delivery = allowedNumber(one(params.delivery), publicDeliveryThresholds);
  const freshness = allowedNumber(one(params.freshness), publicFreshnessThresholds);

  return (
    <PageShell darkHeader>
      <PageHero
        eyebrow="What's Trending"
        badge="30-day SOLD demand"
        title="Explore the market through products moving now."
        description="A demand-first view of published Winning Products. Ranking uses current 30-day eBay SOLD evidence—not active listing counts, search volume or a hidden trend score."
        actions={
          <Link href={routes.winningProducts} className="button button-cyan">
            Browse all Winning Products
          </Link>
        }
      />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <SectionHeading
            eyebrow="Market → Category → Filters → Search"
            title="See What's Trending"
            description="Use the filters you care about, then eCommPilot ranks the remaining published products by their own verified 30-day SOLD demand."
          />

          <form method="get" action="/whats-trending" className="feature-card mt-8 grid gap-4">
            {categoriesUnavailable && category ? (
              <input type="hidden" name="category" value={category} />
            ) : null}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
                Market
                <select name="market" defaultValue={market?.code ?? ""} className="catalog-input">
                  <option value="">All markets</option>
                  {markets.map((item) => (
                    <option value={item.code} key={item.code}>{item.code} · {item.name}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
                Category
                <select
                  name="category"
                  defaultValue={category}
                  className="catalog-input"
                  disabled={!market || categoriesUnavailable}
                >
                  <option value="">
                    {!market
                      ? "Choose a market first"
                      : categoriesUnavailable
                        ? "Categories temporarily unavailable"
                        : "All published categories"}
                  </option>
                  {categories.map((item) => (
                    <option value={item.slug} key={item.id}>
                      {item.name} · {item.publishedProductCount}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
                Minimum profit
                <select name="profit" defaultValue={profit ?? ""} className="catalog-input">
                  <option value="">Any</option>
                  {publicProfitBands.map((value) => (
                    <option value={value} key={value}>{value}%+</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
                Minimum SOLD / 30d
                <select name="sales" defaultValue={sales ?? ""} className="catalog-input">
                  <option value="">Any</option>
                  {publicSalesThresholds.map((value) => (
                    <option value={value} key={value}>{value}+</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_180px_200px_180px_auto] xl:items-end">
              <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
                Supplier
                <select name="supplier" defaultValue={supplier ?? ""} className="catalog-input">
                  <option value="">All suppliers</option>
                  <option value="aliexpress">AliExpress</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
                Search product title
                <input
                  name="search"
                  type="search"
                  defaultValue={search}
                  maxLength={100}
                  placeholder="e.g. magnetic phone holder"
                  className="catalog-input"
                />
              </label>

              <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
                Max delivery
                <select name="delivery" defaultValue={delivery ?? ""} className="catalog-input">
                  <option value="">Any</option>
                  {publicDeliveryThresholds.map((value) => (
                    <option value={value} key={value}>{value} days</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-extrabold text-[var(--navy)]">
                Freshness
                <select name="freshness" defaultValue={freshness ?? ""} className="catalog-input">
                  <option value="">Any</option>
                  <option value="24">24h</option>
                  <option value="72">3 days</option>
                  <option value="168">7 days</option>
                </select>
              </label>

              <div className="flex flex-wrap gap-2">
                <button type="submit" className="button button-primary">Search</button>
                <Link href={routes.trending} className="button button-secondary">Reset</Link>
              </div>
            </div>
          </form>

          <div className="mt-8">
            <CatalogProductGrid
              market={market?.code}
              category={category || undefined}
              minimumProfitBand={profit}
              minimumSales30d={sales}
              maximumDeliveryDays={delivery}
              freshnessHours={freshness}
              supplier={supplier}
              search={search || undefined}
              sort="most_sold"
              limit={24}
            />
          </div>

          <div className="mt-10 rounded-[22px] border border-[var(--border)] bg-white p-6 text-sm leading-7 text-[var(--muted)]">
            <strong className="text-[var(--navy)]">How this differs from Winning Products:</strong>{" "}
            Winning Products is the full published catalog. What&apos;s Trending is the same catalog viewed through recent SOLD demand first. It does not create a second product database or substitute active listings for sold evidence.
          </div>
        </div>
      </section>
    </PageShell>
  );
}
