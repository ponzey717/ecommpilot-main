export const siteConfig = {
  name: "eCommPilot",
  domain: "ecommpilot.net",
  url: "https://ecommpilot.net",
  appUrl: "https://app.ecommpilot.net",
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
