export const routes = {
  home: "/",
  winningProducts: "/winning-products",
  markets: "/markets",
  categories: "/categories",
  freeTools: "/free-tools",
  learn: "/learn",
  pricing: "/pricing",
  login: "https://app.ecommpilot.net/login",
  join: "https://app.ecommpilot.net/register",
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
