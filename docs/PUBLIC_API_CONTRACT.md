# Public Catalog API Contract V1

**Consumer:** `https://ecommpilot.net`  
**Provider:** `https://app.ecommpilot.net`  
**Contract version:** `public-v1`

## Rules

- Public pages never access privileged database tables directly from browser code.
- The engine returns an explicit field allowlist.
- Missing evidence is null/omitted, never fabricated.
- Volatile values include `checkedAt`.
- Supplier and competitor URLs can be access-controlled.
- Publication/access rules are enforced server-side.
- Money uses integer minor units + ISO currency.
- Optional ad/promoted-listing spend is excluded from V1 profit unless explicitly stated otherwise.

## GET /api/public/markets

Returns active supported markets.

Example:

```json
{
  "version": "public-v1",
  "markets": [
    {
      "code": "US",
      "marketplace": "EBAY_US",
      "name": "United States",
      "slug": "us",
      "currency": "USD",
      "active": true
    }
  ]
}
```

Initial mappings:

- US -> EBAY_US -> USD
- UK -> EBAY_GB -> GBP
- AU -> EBAY_AU -> AUD

## GET /api/public/profit-bands

Returns configured display/filter bands.

Initial bands:

- 10%+
- 15%+
- 20%+
- 25%+
- 30%+
- 35%+
- 40%+
- 50%+

Do not infer membership access from the numerical band itself. Entitlements are separate configuration.

## GET /api/public/categories

Query:

- `market`
- optional `parent`
- cursor/limit

Category response fields:

- market;
- marketplace;
- eBay category ID;
- name;
- slug;
- parent;
- path;
- published product count;
- taxonomy checked timestamp.

Production categories come from market-specific eBay taxonomy snapshots.

## GET /api/public/products

Filters:

- market;
- category;
- minimum profit band;
- supplier;
- maximum delivery days;
- minimum 30-day sales;
- minimum supplier rating;
- freshness;
- sort;
- cursor/limit.

Anonymous list item:

```json
{
  "id": "uuid",
  "slug": "portable-car-vacuum-us",
  "name": "Portable Car Vacuum",
  "market": "US",
  "marketplace": "EBAY_US",
  "category": {
    "id": "12345",
    "name": "Car Interior Accessories",
    "slug": "car-interior-accessories"
  },
  "image": {
    "url": "https://media.ecommpilot.net/...",
    "alt": "Portable car vacuum",
    "width": 1200,
    "height": 1200
  },
  "ebay": {
    "sales30d": 64,
    "activeListings": 22,
    "checkedAt": "2026-10-04T00:00:00Z"
  },
  "supplier": {
    "provider": "aliexpress",
    "choice": true,
    "rating": 4.8,
    "deliveryMinDays": 7,
    "deliveryMaxDays": 12,
    "inStock": true,
    "checkedAt": "2026-10-04T00:00:00Z"
  },
  "economics": {
    "currency": "USD",
    "recommendedSellingPriceMinor": 3499,
    "profitPercent": 31.4,
    "profitBand": "30-plus",
    "checkedAt": "2026-10-04T00:00:00Z",
    "adCostIncluded": false
  },
  "freshness": {
    "status": "fresh",
    "checkedAt": "2026-10-04T00:00:00Z"
  },
  "access": {
    "details": "preview",
    "requiredTier": "free"
  }
}
```

## GET /api/public/products/{slug}

Public detail may add:

- richer eBay demand summary;
- supplier quality summary;
- profit explanation;
- freshness;
- related products;
- locked-section metadata.

Anonymous response must not expose private supplier URL, competitor URL, exact protected cost breakdown or internal evidence notes when those fields are member-gated.

## Authenticated member product endpoint

Recommended separately:

`GET /api/member/products/{id}`

Response is filtered by the caller's current entitlement and unlock state.

Possible member-only fields:

- Primary supplier URL;
- Standby supplier URL;
- exact supplier cost;
- shipping/tax breakdown;
- marketplace fee breakdown;
- competitor URLs;
- listing title;
- item specifics;
- description;
- image/download package;
- research notes appropriate to the tier.

## Caching

Public list/category/market endpoints should support CDN/server caching and revalidation.

Product freshness in the response refers to research evidence freshness, not HTTP cache age.

## Error shape

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product is not available."
  }
}
```

Do not leak database IDs, SQL errors, provider credentials or internal stack traces in public errors.

## Next implementation step

Build a private-app read model that projects only publishable products into this contract, then connect the public website through a typed server-side adapter.
