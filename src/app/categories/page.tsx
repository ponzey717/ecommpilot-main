import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import {
  getPublicCategories,
  getPublicMarketsWithFallback,
} from "@/lib/api/public-catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "eBay Product Categories",
  description: "Browse eCommPilot Winning Products by eBay category and market.",
  path: "/categories",
});

const developmentCategories = [
  ["Electronics", "Audio, accessories and compact consumer products."],
  ["Home & Garden", "Practical household products with dropshipping-friendly profiles."],
  ["Automotive", "Compact car accessories and everyday vehicle products."],
  ["Office & Accessories", "Desk, organization and work-from-home products."],
  ["Pet Supplies", "Practical pet accessories and non-fragile everyday items."],
  ["Sports & Outdoors", "Portable accessories and lightweight activity products."],
] as const;

export default async function CategoriesPage() {
  const markets = (await getPublicMarketsWithFallback()).filter((market) => market.active);
  const catalog = await Promise.all(
    markets.map(async (market) => ({
      market,
      categories: await getPublicCategories({ market: market.code }),
    })),
  );
  const hasVerifiedCategories = catalog.some(({ categories }) => Boolean(categories?.length));
  const catalogUnavailable = catalog.every(({ categories }) => categories === null);

  return (
    <PageShell darkHeader>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories" },
        ])}
      />
      <PageHero
        eyebrow="eBay category structure"
        title="Browse opportunities by category."
        description="Categories stay marketplace-specific so the US, UK and Australia catalogs can follow verified eBay category data instead of one universal taxonomy."
      />

      <section className="py-14 md:py-18">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Categories" },
            ]}
          />
          <div className="mt-8">
          {hasVerifiedCategories ? (
            <div className="space-y-10">
              {catalog
                .filter(({ categories }) => Boolean(categories?.length))
                .map(({ market, categories }) => (

                  <section key={market.code}>
                    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="eyebrow">eBay {market.code}</p>
                        <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">
                          {market.name}
                        </h2>
                      </div>
                      <Link
                        href={"/winning-products/" + market.slug}
                        className="text-sm font-extrabold text-[var(--blue)]"
                      >
                        View all {market.code} products →
                      </Link>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {categories!.map((category) => (
                        <Link
                          key={market.code + ":" + category.id}
                          href={
                            "/winning-products/" +
                            market.slug +
                            "/" +
                            category.slug
                          }
                          className="feature-card"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="badge badge-market">{market.code}</span>
                            {category.publishedProductCount != null ? (
                              <span className="text-xs font-extrabold text-[var(--muted)]">
                                {category.publishedProductCount} published
                              </span>
                            ) : null}
                          </div>

                          <h3 className="mt-5 text-xl font-extrabold text-[var(--navy)]">
                            {category.name}
                          </h3>

                          {category.path?.length ? (
                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                              {category.path.join(" · ")}
                            </p>
                          ) : (
                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                              Browse verified Winning Product opportunities in this eBay category.
                            </p>
                          )}

                          <p className="mt-5 text-sm font-extrabold text-[var(--blue)]">
                            Explore category →
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          ) : catalogUnavailable && process.env.NODE_ENV === "production" ? (
            <div className="rounded-[22px] border border-[var(--border)] bg-white p-8 text-center">
              <p className="eyebrow">Category status</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                The category catalog is temporarily unavailable.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                eCommPilot could not retrieve verified public category data right now.
                No fallback taxonomy is shown in production.
              </p>
            </div>
          ) : process.env.NODE_ENV !== "production" ? (
            <div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {developmentCategories.map(([name, text]) => (
                  <article key={name} className="feature-card">
                    <span className="tool-icon">↗</span>
                    <h2 className="mt-5 text-xl font-extrabold text-[var(--navy)]">
                      {name}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
                Development fallback only. Verified market-specific categories from the public API replace this list automatically when available.
              </p>
            </div>
          ) : (
            <div className="rounded-[22px] border border-[var(--border)] bg-white p-8 text-center">
              <p className="eyebrow">Categories</p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                No verified categories are published yet.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                eCommPilot will show category pages here only when the public catalog API returns verified marketplace category data.
              </p>
            </div>
          )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
