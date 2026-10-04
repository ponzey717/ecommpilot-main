import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  getPublicCategories,
  getPublicMarkets,
  getPublicProducts,
  type PublicMarket,
  type PublicProductSummary,
} from "@/lib/api/public-catalog";

const staticPaths = [
  "/",
  "/winning-products",
  "/markets",
  "/free-tools",
  "/free-tools/profit-margin-calculator",
  "/free-tools/ebay-fee-estimator",
  "/free-tools/title-length-checker",
  "/free-tools/sell-through-calculator",
  "/pricing",
] as const;

const SITEMAP_PRODUCT_PAGE_LIMIT = 100;
const SITEMAP_MAX_PRODUCT_PAGES_PER_MARKET = 10;

async function sitemapProducts(market: PublicMarket): Promise<PublicProductSummary[]> {
  const products: PublicProductSummary[] = [];
  let cursor: string | undefined;

  for (let page = 0; page < SITEMAP_MAX_PRODUCT_PAGES_PER_MARKET; page += 1) {
    const payload = await getPublicProducts({
      market: market.code,
      ...(cursor ? { cursor } : {}),
      limit: SITEMAP_PRODUCT_PAGE_LIMIT,
    });
    if (!payload) break;

    products.push(...payload.products);
    if (!payload.nextCursor) break;
    cursor = payload.nextCursor;
  }

  return products;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/winning-products" ? 0.9 : 0.7,
  }));

  const marketPayload = await getPublicMarkets();
  const markets = marketPayload?.filter((market) => market.active) ?? [];

  const catalogByMarket = await Promise.all(
    markets.map(async (market) => {
      const [categories, products] = await Promise.all([
        getPublicCategories({ market: market.code, limit: 100 }),
        sitemapProducts(market),
      ]);
      return {
        market,
        categories: categories ?? [],
        products,
      };
    }),
  );

  const hasPublishedCategories = catalogByMarket.some(
    ({ categories }) => categories.length > 0,
  );

  const categoriesHubEntries: MetadataRoute.Sitemap = hasPublishedCategories
    ? [
        {
          url: new URL("/categories", siteConfig.url).toString(),
          changeFrequency: "weekly",
          priority: 0.75,
        },
      ]
    : [];

  const marketEntries: MetadataRoute.Sitemap = catalogByMarket
    .filter(({ products }) => products.length > 0)
    .map(({ market }) => ({
      url: new URL("/winning-products/" + market.slug, siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const categoryEntries: MetadataRoute.Sitemap = catalogByMarket.flatMap(
    ({ market, categories }) =>
      categories.map((category) => ({
        url: new URL(
          "/winning-products/" + market.slug + "/" + category.slug,
          siteConfig.url,
        ).toString(),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      })),
  );

  const productEntries: MetadataRoute.Sitemap = catalogByMarket.flatMap(
    ({ market, products }) =>
      products.flatMap((product) =>
        product.category?.slug
          ? [
              {
                url: new URL(
                  "/winning-products/" +
                    market.slug +
                    "/" +
                    product.category.slug +
                    "/" +
                    product.slug,
                  siteConfig.url,
                ).toString(),
                changeFrequency: "weekly" as const,
                priority: 0.7,
              },
            ]
          : [],
      ),
  );

  return [
    ...staticEntries,
    ...categoriesHubEntries,
    ...marketEntries,
    ...categoryEntries,
    ...productEntries,
  ];
}
