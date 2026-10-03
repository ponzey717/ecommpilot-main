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

type MarketsResponse = {
  version: PublicCatalogVersion;
  markets: PublicMarket[];
};

type ProfitBandsResponse = {
  version: PublicCatalogVersion;
  bands: PublicProfitBand[];
};

function apiBase(): string | null {
  const value = process.env.ECOMMPILOT_API_BASE_URL?.trim();
  return value ? value.replace(/\/$/, '') : null;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  const base = apiBase();
  if (!base) return null;

  try {
    const response = await fetch(base + path, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/json',
        ...(process.env.ECOMMPILOT_API_TOKEN
          ? { Authorization: `Bearer ${process.env.ECOMMPILOT_API_TOKEN}` }
          : {}),
      },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getPublicMarkets(): Promise<PublicMarket[] | null> {
  const payload = await fetchJson<MarketsResponse>('/api/public/markets');
  return payload?.version === 'public-v1' ? payload.markets : null;
}

export async function getPublicProfitBands(): Promise<PublicProfitBand[] | null> {
  const payload = await fetchJson<ProfitBandsResponse>('/api/public/profit-bands');
  return payload?.version === 'public-v1' ? payload.bands : null;
}
