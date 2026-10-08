function configuredBaseUrl(value: string | undefined, fallback: string) {
  const candidate = value?.trim().replace(/\/+$/, "") || fallback;
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" || parsed.protocol === "http:"
      ? parsed.origin
      : fallback;
  } catch {
    return fallback;
  }
}

const publicSiteUrl = configuredBaseUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  "https://ecommpilot.net",
);

const appUrl = configuredBaseUrl(
  process.env.NEXT_PUBLIC_APP_URL,
  "https://app.ecommpilot.net",
);

export const siteConfig = {
  name: "eCommPilot",
  domain: new URL(publicSiteUrl).hostname,
  url: publicSiteUrl,
  appUrl,
  locale: "en",
  title: "eCommPilot | Winning Products for eBay Dropshippers",
  shortTitle: "eCommPilot",
  description:
    "Research-backed winning products, supplier data and ready-to-list information for eBay dropshippers in the US, UK and Australia.",
  positioning: "Winning Products for eBay Dropshippers",
  markets: [
    { code: "US", name: "United States", slug: "us" },
    { code: "UK", name: "United Kingdom", slug: "uk" },
    { code: "AU", name: "Australia", slug: "au" },
  ],
  brand: {
    midnightNavy: "#071A3D",
    pilotBlue: "#146CFF",
    electricCyan: "#16D9E3",
    skyBlue: "#5CEBFF",
    deepBlue: "#0B3BA7",
  },
} as const;

export type MarketCode = (typeof siteConfig.markets)[number]["code"];
