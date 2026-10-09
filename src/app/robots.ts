import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publicIndexingEnabled } from "@/lib/public-indexing";

export default function robots(): MetadataRoute.Robots {
  if (!publicIndexingEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
