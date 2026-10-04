export type PublicCatalogVersion = 'public-v1';

export type PublicMarket = {
  code: 'US' | 'UK' | 'AU';
  marketplace: 'EBAY_US' | 'EBAY_GB' | 'EBAY_AU';
  name: string;
  slug: 'us' | 'uk' | 'au';
  currency: 'USD' | 'GBP' | 'AUD';
  active: boolean;
};

export type PublicProfitBand = {
  minimumPercent: number;
  slug: string;
};

export type PublicCategory = {
  market: PublicMarket['code'];
  marketplace: PublicMarket['marketplace'];
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  path?: string[];
  publishedProductCount?: number;
  checkedAt?: string | null;
};

export type PublicProductImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type PublicProductSummary = {
  id: string;
  slug: string;
  name: string;
  market: PublicMarket['code'];
  marketplace: PublicMarket['marketplace'];
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  image?: PublicProductImage | null;
  ebay?: {
    sales30d?: number | null;
    activeListings?: number | null;
    checkedAt?: string | null;
  } | null;
  supplier?: {
    provider?: string | null;
    choice?: boolean | null;
    rating?: number | null;
    orderCount?: number | null;
    deliveryMinDays?: number | null;
    deliveryMaxDays?: number | null;
    inStock?: boolean | null;
    checkedAt?: string | null;
  } | null;
  economics?: {
    currency?: string | null;
    recommendedSellingPriceMinor?: number | null;
    netProfitMinor?: number | null;
    profitPercent?: number | null;
    roiPercent?: number | null;
    profitBand?: string | null;
    checkedAt?: string | null;
    adCostIncluded?: boolean;
  } | null;
  freshness?: {
    status?: string | null;
    checkedAt?: string | null;
  } | null;
  access?: {
    details?: 'preview' | 'member' | 'locked';
    requiredTier?: 'free' | 'pro' | 'premium' | null;
  } | null;
};

export type PublicProductDetail = PublicProductSummary & {
  summary?: string | null;
  standbySupplier?: {
    available: boolean;
    provider?: string | null;
  } | null;
  methodology?: {
    profit?: string | null;
    optionalAdvertisingExcluded?: boolean;
  } | null;
  relatedProducts?: PublicProductSummary[];
};

type CategoriesResponse = {
  version: PublicCatalogVersion;
  categories: PublicCategory[];
  nextCursor?: string | null;
};

type ProductsResponse = {
  version: PublicCatalogVersion;
  products: PublicProductSummary[];
  nextCursor?: string | null;
};

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord | null {
  return value != null && typeof value === 'object' && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function booleanValue(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined;
}

function nullableString(value: unknown): string | null | undefined {
  return value === null ? null : stringValue(value);
}

function nullableNumber(value: unknown): number | null | undefined {
  return value === null ? null : numberValue(value);
}

function nullableBoolean(value: unknown): boolean | null | undefined {
  return value === null ? null : booleanValue(value);
}

function marketCode(value: unknown): PublicMarket['code'] | undefined {
  return value === 'US' || value === 'UK' || value === 'AU' ? value : undefined;
}

function marketplace(value: unknown): PublicMarket['marketplace'] | undefined {
  return value === 'EBAY_US' || value === 'EBAY_GB' || value === 'EBAY_AU'
    ? value
    : undefined;
}

function publicMarket(value: unknown): PublicMarket | null {
  const item = record(value);
  if (!item) return null;
  const code = marketCode(item.code);
  const market = marketplace(item.marketplace);
  const name = stringValue(item.name);
  const slug = item.slug === 'us' || item.slug === 'uk' || item.slug === 'au'
    ? item.slug
    : undefined;
  const currency = item.currency === 'USD' || item.currency === 'GBP' || item.currency === 'AUD'
    ? item.currency
    : undefined;
  const active = booleanValue(item.active);
  return code && market && name && slug && currency && active != null
    ? { code, marketplace: market, name, slug, currency, active }
    : null;
}

function publicCategory(value: unknown): PublicCategory | null {
  const item = record(value);
  if (!item) return null;
  const market = marketCode(item.market);
  const marketId = marketplace(item.marketplace);
  const id = stringValue(item.id);
  const name = stringValue(item.name);
  const slug = stringValue(item.slug);
  if (!market || !marketId || !id || !name || !slug) return null;
  return {
    market,
    marketplace: marketId,
    id,
    name,
    slug,
    ...(nullableString(item.parentId) !== undefined ? { parentId: nullableString(item.parentId) } : {}),
    ...(Array.isArray(item.path) && item.path.every((part) => typeof part === 'string')
      ? { path: item.path as string[] }
      : {}),
    ...(numberValue(item.publishedProductCount) !== undefined
      ? { publishedProductCount: numberValue(item.publishedProductCount) }
      : {}),
    ...(nullableString(item.checkedAt) !== undefined ? { checkedAt: nullableString(item.checkedAt) } : {}),
  };
}

export function projectPublicProduct(value: unknown, detail = false): PublicProductDetail | null {
  const item = record(value);
  if (!item) return null;
  const id = stringValue(item.id);
  const slug = stringValue(item.slug);
  const name = stringValue(item.name);
  const market = marketCode(item.market);
  const marketId = marketplace(item.marketplace);
  if (!id || !slug || !name || !market || !marketId) return null;

  const category = record(item.category);
  const image = record(item.image);
  const ebay = record(item.ebay);
  const supplier = record(item.supplier);
  const economics = record(item.economics);
  const freshness = record(item.freshness);
  const access = record(item.access);
  const standbySupplier = record(item.standbySupplier);
  const methodology = record(item.methodology);

  const product: PublicProductDetail = {
    id,
    slug,
    name,
    market,
    marketplace: marketId,
    ...(category && stringValue(category.id) && stringValue(category.name) && stringValue(category.slug)
      ? { category: { id: stringValue(category.id)!, name: stringValue(category.name)!, slug: stringValue(category.slug)! } }
      : item.category === null ? { category: null } : {}),
    ...(image && stringValue(image.url) && stringValue(image.alt)
      ? {
          image: {
            url: stringValue(image.url)!,
            alt: stringValue(image.alt)!,
            ...(numberValue(image.width) !== undefined ? { width: numberValue(image.width) } : {}),
            ...(numberValue(image.height) !== undefined ? { height: numberValue(image.height) } : {}),
          },
        }
      : item.image === null ? { image: null } : {}),
    ...(ebay
      ? { ebay: {
          ...(nullableNumber(ebay.sales30d) !== undefined ? { sales30d: nullableNumber(ebay.sales30d) } : {}),
          ...(nullableNumber(ebay.activeListings) !== undefined ? { activeListings: nullableNumber(ebay.activeListings) } : {}),
          ...(nullableString(ebay.checkedAt) !== undefined ? { checkedAt: nullableString(ebay.checkedAt) } : {}),
        } }
      : item.ebay === null ? { ebay: null } : {}),
    ...(supplier
      ? { supplier: {
          ...(nullableString(supplier.provider) !== undefined ? { provider: nullableString(supplier.provider) } : {}),
          ...(nullableBoolean(supplier.choice) !== undefined ? { choice: nullableBoolean(supplier.choice) } : {}),
          ...(nullableNumber(supplier.rating) !== undefined ? { rating: nullableNumber(supplier.rating) } : {}),
          ...(nullableNumber(supplier.orderCount) !== undefined ? { orderCount: nullableNumber(supplier.orderCount) } : {}),
          ...(nullableNumber(supplier.deliveryMinDays) !== undefined ? { deliveryMinDays: nullableNumber(supplier.deliveryMinDays) } : {}),
          ...(nullableNumber(supplier.deliveryMaxDays) !== undefined ? { deliveryMaxDays: nullableNumber(supplier.deliveryMaxDays) } : {}),
          ...(nullableBoolean(supplier.inStock) !== undefined ? { inStock: nullableBoolean(supplier.inStock) } : {}),
          ...(nullableString(supplier.checkedAt) !== undefined ? { checkedAt: nullableString(supplier.checkedAt) } : {}),
        } }
      : item.supplier === null ? { supplier: null } : {}),
    ...(economics
      ? { economics: {
          ...(nullableString(economics.currency) !== undefined ? { currency: nullableString(economics.currency) } : {}),
          ...(nullableNumber(economics.recommendedSellingPriceMinor) !== undefined ? { recommendedSellingPriceMinor: nullableNumber(economics.recommendedSellingPriceMinor) } : {}),
          ...(nullableNumber(economics.netProfitMinor) !== undefined ? { netProfitMinor: nullableNumber(economics.netProfitMinor) } : {}),
          ...(nullableNumber(economics.profitPercent) !== undefined ? { profitPercent: nullableNumber(economics.profitPercent) } : {}),
          ...(nullableNumber(economics.roiPercent) !== undefined ? { roiPercent: nullableNumber(economics.roiPercent) } : {}),
          ...(nullableString(economics.profitBand) !== undefined ? { profitBand: nullableString(economics.profitBand) } : {}),
          ...(nullableString(economics.checkedAt) !== undefined ? { checkedAt: nullableString(economics.checkedAt) } : {}),
          ...(booleanValue(economics.adCostIncluded) !== undefined ? { adCostIncluded: booleanValue(economics.adCostIncluded) } : {}),
        } }
      : item.economics === null ? { economics: null } : {}),
    ...(freshness
      ? { freshness: {
          ...(nullableString(freshness.status) !== undefined ? { status: nullableString(freshness.status) } : {}),
          ...(nullableString(freshness.checkedAt) !== undefined ? { checkedAt: nullableString(freshness.checkedAt) } : {}),
        } }
      : item.freshness === null ? { freshness: null } : {}),
    ...(access
      ? { access: {
          ...(access.details === 'preview' || access.details === 'member' || access.details === 'locked'
            ? { details: access.details }
            : {}),
          ...(access.requiredTier === 'free' || access.requiredTier === 'pro' || access.requiredTier === 'premium' || access.requiredTier === null
            ? { requiredTier: access.requiredTier }
            : {}),
        } }
      : item.access === null ? { access: null } : {}),
  };

  if (!detail) return product;
  return {
    ...product,
    ...(nullableString(item.summary) !== undefined ? { summary: nullableString(item.summary) } : {}),
    ...(standbySupplier && booleanValue(standbySupplier.available) !== undefined
      ? { standbySupplier: {
          available: booleanValue(standbySupplier.available)!,
          ...(nullableString(standbySupplier.provider) !== undefined ? { provider: nullableString(standbySupplier.provider) } : {}),
        } }
      : item.standbySupplier === null ? { standbySupplier: null } : {}),
    ...(methodology
      ? { methodology: {
          ...(nullableString(methodology.profit) !== undefined ? { profit: nullableString(methodology.profit) } : {}),
          ...(booleanValue(methodology.optionalAdvertisingExcluded) !== undefined
            ? { optionalAdvertisingExcluded: booleanValue(methodology.optionalAdvertisingExcluded) }
            : {}),
        } }
      : item.methodology === null ? { methodology: null } : {}),
    ...(Array.isArray(item.relatedProducts)
      ? { relatedProducts: item.relatedProducts
          .map((related) => projectPublicProduct(related))
          .filter((related): related is PublicProductSummary => related !== null) }
      : {}),
  };
}

function apiBase(): string | null {
  const value = process.env.ECOMMPILOT_API_BASE_URL?.trim();
  return value ? value.replace(/\/$/, '') : null;
}

type PublicApiResult<T> =
  | { state: 'ok'; data: T }
  | { state: 'not_found' }
  | { state: 'unavailable' };

async function fetchJsonResult<T>(
  path: string,
  revalidate = 3600,
): Promise<PublicApiResult<T>> {
  const base = apiBase();
  if (!base) return { state: 'unavailable' };

  try {
    const response = await fetch(base + path, {
      next: { revalidate },
      headers: {
        Accept: 'application/json',
        ...(process.env.ECOMMPILOT_API_TOKEN
          ? { Authorization: `Bearer ${process.env.ECOMMPILOT_API_TOKEN}` }
          : {}),
      },
    });

    if (response.status === 404) return { state: 'not_found' };
    if (!response.ok) return { state: 'unavailable' };

    return { state: 'ok', data: (await response.json()) as T };
  } catch {
    return { state: 'unavailable' };
  }
}

async function fetchJson<T>(path: string, revalidate = 3600): Promise<T | null> {
  const result = await fetchJsonResult<T>(path, revalidate);
  return result.state === 'ok' ? result.data : null;
}

export async function getPublicMarkets(): Promise<PublicMarket[] | null> {
  const payload = await fetchJson<unknown>('/api/public/markets');
  const response = record(payload);
  if (response?.version !== 'public-v1' || !Array.isArray(response.markets)) return null;
  const markets = response.markets.map(publicMarket);
  return markets.every((market): market is PublicMarket => market !== null) ? markets : null;
}

export async function getPublicProfitBands(): Promise<PublicProfitBand[] | null> {
  const payload = await fetchJson<unknown>('/api/public/profit-bands');
  const response = record(payload);
  if (response?.version !== 'public-v1' || !Array.isArray(response.bands)) return null;
  const bands = response.bands.map((value): PublicProfitBand | null => {
    const item = record(value);
    const minimumPercent = numberValue(item?.minimumPercent);
    const slug = stringValue(item?.slug);
    return minimumPercent !== undefined && slug ? { minimumPercent, slug } : null;
  });
  return bands.every((band): band is PublicProfitBand => band !== null) ? bands : null;
}

export async function getPublicCategoriesPage(input?: {
  market?: PublicMarket['code'];
  cursor?: string;
  limit?: number;
}): Promise<CategoriesResponse | null> {
  const query = new URLSearchParams();
  if (input?.market) query.set('market', input.market);
  if (input?.cursor) query.set('cursor', input.cursor);
  if (input?.limit != null) query.set('limit', String(input.limit));
  const suffix = query.size ? '?' + query.toString() : '';
  const payload = await fetchJson<unknown>('/api/public/categories' + suffix);
  const response = record(payload);
  if (response?.version !== 'public-v1' || !Array.isArray(response.categories)) return null;
  const categories = response.categories.map(publicCategory);
  if (!categories.every((category): category is PublicCategory => category !== null)) return null;
  return {
    version: 'public-v1',
    categories,
    ...(nullableString(response.nextCursor) !== undefined
      ? { nextCursor: nullableString(response.nextCursor) }
      : {}),
  };
}

export async function getPublicCategories(input?: {
  market?: PublicMarket['code'];
  cursor?: string;
  limit?: number;
}): Promise<PublicCategory[] | null> {
  const payload = await getPublicCategoriesPage(input);
  return payload?.categories ?? null;
}

export async function getAllPublicCategories(input?: {
  market?: PublicMarket['code'];
  maxPages?: number;
}): Promise<PublicCategory[] | null> {
  const categories: PublicCategory[] = [];
  const maxPages = Math.min(Math.max(input?.maxPages ?? 10, 1), 10);
  let cursor: string | undefined;

  for (let page = 0; page < maxPages; page += 1) {
    const payload = await getPublicCategoriesPage({
      ...(input?.market ? { market: input.market } : {}),
      ...(cursor ? { cursor } : {}),
      limit: 100,
    });
    if (!payload) return null;

    categories.push(...payload.categories);
    if (!payload.nextCursor) break;
    cursor = payload.nextCursor;
  }

  return categories;
}

export async function getPublicProducts(input?: {
  market?: PublicMarket['code'];
  category?: string;
  minProfitBand?: number;
  maxDeliveryDays?: number;
  minSales30d?: number;
  supplier?: string;
  freshnessHours?: number;
  cursor?: string;
  limit?: number;
}): Promise<ProductsResponse | null> {
  const query = new URLSearchParams();
  if (input?.market) query.set('market', input.market);
  if (input?.category) query.set('category', input.category);
  if (input?.minProfitBand != null) query.set('minimumProfitBand', String(input.minProfitBand));
  if (input?.maxDeliveryDays != null) query.set('maximumDeliveryDays', String(input.maxDeliveryDays));
  if (input?.minSales30d != null) query.set('minimumSales30d', String(input.minSales30d));
  if (input?.supplier) query.set('supplier', input.supplier);
  if (input?.freshnessHours != null) query.set('freshnessHours', String(input.freshnessHours));
  if (input?.cursor) query.set('cursor', input.cursor);
  if (input?.limit != null) query.set('limit', String(input.limit));

  const suffix = query.size ? '?' + query.toString() : '';
  const payload = await fetchJson<unknown>('/api/public/products' + suffix, 900);
  const response = record(payload);
  if (response?.version !== 'public-v1' || !Array.isArray(response.products)) return null;
  const products = response.products.map((product) => projectPublicProduct(product));
  if (!products.every((product): product is PublicProductSummary => product !== null)) return null;
  return {
    version: 'public-v1',
    products,
    ...(nullableString(response.nextCursor) !== undefined
      ? { nextCursor: nullableString(response.nextCursor) }
      : {}),
  };
}

export type PublicProductLookup =
  | { state: 'ok'; product: PublicProductDetail }
  | { state: 'not_found' }
  | { state: 'unavailable' };

export async function getPublicProductResult(slug: string): Promise<PublicProductLookup> {
  const normalized = slug.trim();
  if (!normalized) return { state: 'not_found' };

  const result = await fetchJsonResult<unknown>(
    '/api/public/products/' + encodeURIComponent(normalized),
    900,
  );
  if (result.state !== 'ok') return result;
  const response = record(result.data);
  if (response?.version !== 'public-v1') return { state: 'unavailable' };
  const product = projectPublicProduct(response.product, true);
  if (!product) return { state: 'unavailable' };

  return { state: 'ok', product };
}

export async function getPublicProduct(slug: string): Promise<PublicProductDetail | null> {
  const result = await getPublicProductResult(slug);
  return result.state === 'ok' ? result.product : null;
}

export function fallbackPublicMarkets(): PublicMarket[] {
  return [
    {
      code: 'US',
      marketplace: 'EBAY_US',
      name: 'United States',
      slug: 'us',
      currency: 'USD',
      active: true,
    },
    {
      code: 'UK',
      marketplace: 'EBAY_GB',
      name: 'United Kingdom',
      slug: 'uk',
      currency: 'GBP',
      active: true,
    },
    {
      code: 'AU',
      marketplace: 'EBAY_AU',
      name: 'Australia',
      slug: 'au',
      currency: 'AUD',
      active: true,
    },
  ];
}

export async function getPublicMarketsWithFallback(): Promise<PublicMarket[]> {
  return (await getPublicMarkets()) ?? fallbackPublicMarkets();
}
