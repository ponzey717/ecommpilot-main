import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublicMarkets, getPublicProducts, type PublicMarket } from "@/lib/api/public-catalog";

const staticPaths = [
  "/",
  "/winning-products",
  "/markets",
  "/categories",
  "/free-tools",
  "/free-tools/profit-margin-calculator",
  "/free-tools/ebay-fee-estimator",
  "/free-tools/title-length-checker",
  "/free-tools/sell-through-calculator",
  "/pricing",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/winning-products" ? 0.9 : 0.7,
  }));

  const markets = (await getPublicMarkets())?.filter((market) => market.active) ?? [];
  const marketAvailability = await Promise.all(
    markets.map(async (market) => {
      const products = await getPublicProducts({ market: market.code, limit: 1 });
      return products?.products?.length ? market : null;
    }),
  );

  const marketEntries: MetadataRoute.Sitemap = marketAvailability
    .filter((market): market is PublicMarket => market != null)
    .map((market) => ({
      url: new URL("/winning-products/" + market.slug, siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticEntries, ...marketEntries];
}
