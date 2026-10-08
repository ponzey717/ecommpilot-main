function normalizedPublicUrl(value: string | undefined, fallback: string): string {
  const candidate = value?.trim() || fallback;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return fallback;
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

const siteUrl = normalizedPublicUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  "https://ecommpilot.net",
);
const appUrl = normalizedPublicUrl(
  process.env.NEXT_PUBLIC_APP_URL,
  "https://app.ecommpilot.net",
);

export const siteConfig = {
  name: "eCommPilot",
  domain: new URL(siteUrl).hostname,
  url: siteUrl,
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
