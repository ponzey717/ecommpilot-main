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
  publishedProductCount: number;
  checkedAt: string;
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
    provider: string | null;
  };
  methodology?: {
    profit: string;
    optionalAdvertisingExcluded: boolean;
  };
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

type FetchJsonResult<T> = {
  readonly payload: T | null;
  readonly status: number | null;
};

async function fetchJsonResult<T>(path: string, revalidate = 3600): Promise<FetchJsonResult<T>> {
  const base = apiBase();
  if (!base) return { payload: null, status: null };

  try {
    const response = await fetch(base + path, {
      next: { revalidate },
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) return { payload: null, status: response.status };
    return { payload: (await response.json()) as T, status: response.status };
  } catch {
    return { payload: null, status: null };
  }
}

async function fetchJson<T>(path: string, revalidate = 3600): Promise<T | null> {
  return (await fetchJsonResult<T>(path, revalidate)).payload;
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
}): Promise<PublicCategory[] | null> {
  const query = new URLSearchParams();
  if (input?.market) query.set('market', input.market);
  const suffix = query.size ? '?' + query.toString() : '';
  const payload = await fetchJson<CategoriesResponse>('/api/public/categories' + suffix);
  return payload?.version === 'public-v1' ? payload.categories : null;
}

export async function getPublicProducts(input?: {
  market?: PublicMarket['code'];
  category?: string;
  minimumProfitBand?: number;
  maximumDeliveryDays?: number;
  minimumSales30d?: number;
  supplier?: string;
  freshnessHours?: number;
  sort?: 'published' | 'most_sold' | 'highest_profit' | 'freshest' | 'fastest_delivery';
  search?: string;
  cursor?: string;
  limit?: number;
}): Promise<ProductsResponse | null> {
  const query = new URLSearchParams();
  if (input?.market) query.set('market', input.market);
  if (input?.category) query.set('category', input.category);
  if (input?.minimumProfitBand != null) query.set('minimumProfitBand', String(input.minimumProfitBand));
  if (input?.maximumDeliveryDays != null) query.set('maximumDeliveryDays', String(input.maximumDeliveryDays));
  if (input?.minimumSales30d != null) query.set('minimumSales30d', String(input.minimumSales30d));
  if (input?.supplier) query.set('supplier', input.supplier);
  if (input?.freshnessHours != null) query.set('freshnessHours', String(input.freshnessHours));
  if (input?.sort) query.set('sort', input.sort);
  if (input?.search) query.set('search', input.search);
  if (input?.cursor) query.set('cursor', input.cursor);
  if (input?.limit != null) query.set('limit', String(input.limit));

  const suffix = query.size ? '?' + query.toString() : '';
  const payload = await fetchJson<ProductsResponse>('/api/public/products' + suffix, 900);
  return payload?.version === 'public-v1' ? payload : null;
}

export async function getPublicProductState(slug: string): Promise<{
  readonly product: PublicProductDetail | null;
  readonly unavailable: boolean;
}> {
  const normalized = slug.trim();
  if (!normalized) return { product: null, unavailable: false };
  const result = await fetchJsonResult<ProductResponse>(
    '/api/public/products/' + encodeURIComponent(normalized),
    900,
  );
  if (result.payload?.version === 'public-v1') {
    return { product: result.payload.product, unavailable: false };
  }
  return {
    product: null,
    unavailable: result.status !== 404,
  };
}

export async function getPublicProduct(slug: string): Promise<PublicProductDetail | null> {
  return (await getPublicProductState(slug)).product;
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
