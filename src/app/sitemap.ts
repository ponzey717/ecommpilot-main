import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  getPublicCategories,
  getPublicMarketsWithFallback,
  getPublicProducts,
  type PublicProductSummary,
} from "@/lib/api/public-catalog";

const staticPaths = [
  "/",
  "/winning-products",
  "/whats-trending",
  "/markets",
  "/categories",
  "/free-tools",
  "/free-tools/profit-margin-calculator",
  "/free-tools/ebay-fee-estimator",
  "/free-tools/title-length-checker",
  "/learn",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/data-deletion",
] as const;

function dateOrUndefined(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : undefined;
}

async function publishedProductsForSitemap(): Promise<PublicProductSummary[]> {
  const products: PublicProductSummary[] = [];
  let cursor: string | undefined;

  // A single XML sitemap supports up to 50,000 URLs. At 100 products per API
  // page, 500 pages reaches that ceiling without silently truncating at 2,000.
  for (let page = 0; page < 500; page += 1) {
    const payload = await getPublicProducts({
      limit: 100,
      ...(cursor ? { cursor } : {}),
    });
    if (!payload) return products;
    products.push(...payload.products);
    if (!payload.nextCursor) break;
    cursor = payload.nextCursor;
  }

  return products;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency:
      path === "/" || path === "/winning-products" || path === "/whats-trending"
        ? "daily"
        : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/winning-products" || path === "/whats-trending"
          ? 0.9
          : 0.7,
  }));

  const markets = (await getPublicMarketsWithFallback()).filter((market) => market.active);
  const marketEntries: MetadataRoute.Sitemap = markets.map((market) => ({
    url: new URL("/winning-products/" + market.slug, siteConfig.url).toString(),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  const categoryGroups = await Promise.all(
    markets.map(async (market) => ({
      market,
      categories: (await getPublicCategories({ market: market.code })) ?? [],
    })),
  );
  const categoryEntries: MetadataRoute.Sitemap = categoryGroups.flatMap(
    ({ market, categories }) =>
      categories.map((category) => ({
        url: new URL(
          `/winning-products/${market.slug}/${category.slug}`,
          siteConfig.url,
        ).toString(),
        lastModified: dateOrUndefined(category.checkedAt),
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
  );

  const products = await publishedProductsForSitemap();
  const productEntries: MetadataRoute.Sitemap = products.flatMap((product) => {
    if (!product.category?.slug) return [];
    return [{
      url: new URL(
        `/winning-products/${product.market.toLowerCase()}/${product.category.slug}/${product.slug}`,
        siteConfig.url,
      ).toString(),
      lastModified: dateOrUndefined(product.freshness?.checkedAt),
      changeFrequency: "daily" as const,
      priority: 0.75,
    }];
  });

  return [...staticEntries, ...marketEntries, ...categoryEntries, ...productEntries];
}
