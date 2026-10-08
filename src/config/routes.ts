import { siteConfig } from "./site";

export const routes = {
  home: "/",
  winningProducts: "/winning-products",
  trending: "/whats-trending",
  howItWorks: "/#how-it-works",
  markets: "/markets",
  categories: "/categories",
  freeTools: "/free-tools",
  learn: "/learn",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  dataDeletion: "/data-deletion",
  login: `${siteConfig.appUrl}/login`,
  join: `${siteConfig.appUrl}/register`,
  support: `${siteConfig.appUrl}/support`,
  appPrivacy: `${siteConfig.appUrl}/privacy`,
  appTerms: `${siteConfig.appUrl}/terms`,
  appDataDeletion: `${siteConfig.appUrl}/data-deletion`,
} as const;

export function marketProductsPath(market: string) {
  return `${routes.winningProducts}/${market.toLowerCase()}`;
}

export function categoryProductsPath(market: string, categorySlug: string) {
  return `${marketProductsPath(market)}/${categorySlug}`;
}

export function productPath(
  market: string,
  categorySlug: string,
  productSlug: string,
) {
  return `${categoryProductsPath(market, categorySlug)}/${productSlug}`;
}
