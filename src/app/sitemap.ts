import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/winning-products" ? 0.9 : 0.7,
  }));

  const marketEntries: MetadataRoute.Sitemap = siteConfig.markets.map((market) => ({
    url: new URL("/winning-products/" + market.slug, siteConfig.url).toString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...marketEntries];
}
