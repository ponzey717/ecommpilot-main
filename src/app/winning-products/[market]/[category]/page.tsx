import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import {
  fallbackPublicMarkets,
  getPublicCategories,
  getPublicMarketsWithFallback,
} from "@/lib/api/public-catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ market: string; category: string }>;
};

async function resolveCategory(marketSlug: string, categorySlug: string) {
  const markets = await getPublicMarketsWithFallback();
  const market = markets.find((item) => item.slug === marketSlug && item.active);
  if (!market) return null;

  const categories = await getPublicCategories({ market: market.code });
  const category = categories?.find((item) => item.slug === categorySlug);
  if (!category) return null;

  return { market, category };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: marketSlug, category: categorySlug } = await params;
  const resolved = await resolveCategory(marketSlug, categorySlug);

  if (!resolved) {
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
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { market: marketSlug, category: categorySlug } = await params;
  const resolved = await resolveCategory(marketSlug, categorySlug);
  if (!resolved) notFound();

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
            <CatalogProductGrid market={market.code} category={category.slug} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
