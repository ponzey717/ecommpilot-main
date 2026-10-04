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
    profitPercent?: number | null;
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

type MarketsResponse = {
  version: PublicCatalogVersion;
  markets: PublicMarket[];
};

type ProfitBandsResponse = {
  version: PublicCatalogVersion;
  bands: PublicProfitBand[];
};

type CategoriesResponse = {
  version: PublicCatalogVersion;
  categories: PublicCategory[];
};

type ProductsResponse = {
  version: PublicCatalogVersion;
  products: PublicProductSummary[];
  nextCursor?: string | null;
};

type ProductResponse = {
  version: PublicCatalogVersion;
  product: PublicProductDetail;
};

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
  const payload = await fetchJson<MarketsResponse>('/api/public/markets');
  return payload?.version === 'public-v1' ? payload.markets : null;
}

export async function getPublicProfitBands(): Promise<PublicProfitBand[] | null> {
  const payload = await fetchJson<ProfitBandsResponse>('/api/public/profit-bands');
  return payload?.version === 'public-v1' ? payload.bands : null;
}

export async function getPublicCategories(input?: {
  market?: PublicMarket['code'];
  cursor?: string;
  limit?: number;
}): Promise<PublicCategory[] | null> {
  const query = new URLSearchParams();
  if (input?.market) query.set('market', input.market);
  if (input?.cursor) query.set('cursor', input.cursor);
  if (input?.limit != null) query.set('limit', String(input.limit));
  const suffix = query.size ? '?' + query.toString() : '';
  const payload = await fetchJson<CategoriesResponse>('/api/public/categories' + suffix);
  return payload?.version === 'public-v1' ? payload.categories : null;
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
  const payload = await fetchJson<ProductsResponse>('/api/public/products' + suffix, 900);
  return payload?.version === 'public-v1' ? payload : null;
}

export type PublicProductLookup =
  | { state: 'ok'; product: PublicProductDetail }
  | { state: 'not_found' }
  | { state: 'unavailable' };

export async function getPublicProductResult(slug: string): Promise<PublicProductLookup> {
  const normalized = slug.trim();
  if (!normalized) return { state: 'not_found' };

  const result = await fetchJsonResult<ProductResponse>(
    '/api/public/products/' + encodeURIComponent(normalized),
    900,
  );
  if (result.state !== 'ok') return result;
  if (result.data.version !== 'public-v1') return { state: 'unavailable' };

  return { state: 'ok', product: result.data.product };
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
