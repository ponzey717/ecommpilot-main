export const publicProfitBands = [10, 15, 20, 25, 30, 35, 40, 50] as const;
export const publicSalesThresholds = [30, 50, 100, 250, 500] as const;
export const publicFreshnessThresholds = [24, 72, 168] as const;
export const publicDeliveryThresholds = [7, 10, 15, 20] as const;
export const publicSorts = [
  ["published", "Recently published"],
  ["most_sold", "Most sold · 30d"],
  ["highest_profit", "Highest profit"],
  ["freshest", "Freshest evidence"],
  ["fastest_delivery", "Fastest delivery"],
] as const;

export type PublicCatalogSort = (typeof publicSorts)[number][0];

export interface PublicCatalogFilterState {
  readonly category?: string;
  readonly search?: string;
  readonly supplier?: "aliexpress";
  readonly profit?: number;
  readonly sales?: number;
  readonly delivery?: number;
  readonly freshness?: number;
  readonly sort?: PublicCatalogSort;
}

function one(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function safeSlug(value: string): string | undefined {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 120
    ? value
    : undefined;
}

function safeSearch(value: string): string | undefined {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized ? normalized.slice(0, 100) : undefined;
}

function allowedNumber(
  value: string | string[] | undefined,
  allowed: readonly number[],
): number | undefined {
  const parsed = Number(one(value));
  return allowed.includes(parsed) ? parsed : undefined;
}

export function parsePublicCatalogFilters(
  params: Record<string, string | string[] | undefined>,
): PublicCatalogFilterState {
  const sortValue = one(params.sort);
  const sort = publicSorts.some(([value]) => value === sortValue)
    ? (sortValue as PublicCatalogSort)
    : undefined;
  const category = safeSlug(one(params.category));
  const search = safeSearch(one(params.search));
  const supplier = one(params.supplier).toLowerCase() === "aliexpress"
    ? "aliexpress" as const
    : undefined;
  return {
    ...(category ? { category } : {}),
    ...(search ? { search } : {}),
    ...(supplier ? { supplier } : {}),
    ...(allowedNumber(params.profit, publicProfitBands) != null
      ? { profit: allowedNumber(params.profit, publicProfitBands)! }
      : {}),
    ...(allowedNumber(params.sales, publicSalesThresholds) != null
      ? { sales: allowedNumber(params.sales, publicSalesThresholds)! }
      : {}),
    ...(allowedNumber(params.delivery, publicDeliveryThresholds) != null
      ? { delivery: allowedNumber(params.delivery, publicDeliveryThresholds)! }
      : {}),
    ...(allowedNumber(params.freshness, publicFreshnessThresholds) != null
      ? { freshness: allowedNumber(params.freshness, publicFreshnessThresholds)! }
      : {}),
    ...(sort ? { sort } : {}),
  };
}

export function catalogFilterQuery(
  filters: PublicCatalogFilterState,
  overrides: Partial<PublicCatalogFilterState>,
): string {
  const value = { ...filters, ...overrides };
  const query = new URLSearchParams();
  if (value.category) query.set("category", value.category);
  if (value.search) query.set("search", value.search);
  if (value.supplier) query.set("supplier", value.supplier);
  if (value.profit != null) query.set("profit", String(value.profit));
  if (value.sales != null) query.set("sales", String(value.sales));
  if (value.delivery != null) query.set("delivery", String(value.delivery));
  if (value.freshness != null) query.set("freshness", String(value.freshness));
  if (value.sort && value.sort !== "published") query.set("sort", value.sort);
  const text = query.toString();
  return text ? "?" + text : "";
}


export function parsePublicCatalogCursor(value: string | string[] | undefined): string | undefined {
  const raw = one(value);
  return raw && raw.length <= 512 && /^[A-Za-z0-9_-]+$/.test(raw)
    ? raw
    : undefined;
}


const publicCatalogQueryKeys = [
  "category",
  "search",
  "supplier",
  "profit",
  "sales",
  "delivery",
  "freshness",
  "sort",
  "cursor",
] as const;

export function hasPublicCatalogQuery(
  params: Record<string, string | string[] | undefined>,
  extraKeys: readonly string[] = [],
): boolean {
  return [...publicCatalogQueryKeys, ...extraKeys].some((key) => one(params[key]) !== "");
}
