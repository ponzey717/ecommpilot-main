# Public Catalog API Contract V1

**Consumer:** `ecommpilot.net`  
**Provider:** `app.ecommpilot.net`  
**Contract version:** `public-v1`

## Contract status

This contract is implemented.

The public website consumes these endpoints through the server-side adapter in:

`src/lib/api/public-catalog.ts`

The website does not query operational database tables directly and does not send app/member bearer credentials for these reads.

## Core rules

- Responses use an explicit public field allowlist.
- Missing evidence remains null/omitted; it is never fabricated.
- 30-day SOLD evidence is distinct from active-listing evidence.
- Volatile evidence includes `checkedAt` timestamps.
- Money uses integer minor units plus an ISO currency code.
- Optional promoted-listing/ad spend is excluded from V1 economics unless explicitly stated otherwise.
- Exact supplier URLs, private sourcing costs, competitor URLs, internal evidence notes and credentials are not part of the anonymous public projection.
- Public errors must not expose SQL errors, provider credentials or stack traces.

## GET /api/public/markets

Returns the configured public markets.

Current V1 markets:

- US → `EBAY_US` → USD
- UK → `EBAY_GB` → GBP
- AU → `EBAY_AU` → AUD

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

## GET /api/public/profit-bands

Returns the configured public display/filter bands.

Current V1 bands:

- 10%+
- 15%+
- 20%+
- 25%+
- 30%+
- 35%+
- 40%+
- 50%+

A numerical profit band does not itself define membership entitlement.

## GET /api/public/categories

### Query

- optional `market`;
- optional `cursor`;
- optional `limit` from 1–100, default 50.

### Important V1 scope

This endpoint is **not a complete eBay taxonomy endpoint**.

It projects categories that are represented by currently publishable Winning Products. The response declares:

```json
{
  "taxonomy": {
    "complete": false,
    "source": "published-product-evidence"
  }
}
```

Each category contains:

- market;
- marketplace;
- eBay category ID;
- category name;
- generated category slug;
- published product count;
- checked timestamp.

Pagination uses a name/id cursor.

## GET /api/public/products

### Query

- optional `market`;
- optional `category`;
- optional `minimumProfitBand`;
- optional `supplier`;
- optional `maximumDeliveryDays`;
- optional `minimumSales30d`;
- optional `freshnessHours`;
- optional `search`;
- optional `sort`;
- optional `cursor`;
- optional `limit`.

### Input bounds

Current V1 route rules:

- `search`: normalized whitespace, maximum 100 characters;
- `category`: lowercase public slug, maximum 120 characters, alphanumeric/hyphen format;
- `supplier`: lowercase provider key, maximum 64 characters, alphanumeric/underscore/hyphen format;
- `cursor`: base64url-style characters, maximum 512 characters;
- `limit`: integer 1–100;
- integer filters must be non-negative;
- `minimumProfitBand` must be one of the configured public profit bands.

Invalid request parameters return a 400-class public error and do not fall through as catalog outages.

### Allowlisted sorts

- `published` — newest published first;
- `most_sold` — per-product 30-day SOLD evidence descending;
- `highest_profit` — current published profit basis points descending;
- `freshest` — publication evidence freshness descending;
- `fastest_delivery` — current confirmed supplier delivery max ascending.

Stable deterministic tie-breakers remain in the DB ordering.

The timestamp/id continuation cursor is defined only for `published` ordering in V1. Non-published sorts return no continuation cursor.

### Anonymous list item

Representative shape:

```json
{
  "id": "public-publication-uuid",
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
    "url": "https://approved-media-host.example/...",
    "alt": "Portable Car Vacuum"
  },
  "ebay": {
    "sales30d": 64,
    "activeListings": 22,
    "checkedAt": "2026-10-04T10:00:00Z"
  },
  "supplier": {
    "provider": "aliexpress",
    "choice": true,
    "rating": 4.8,
    "orderCount": 320,
    "deliveryMinDays": 7,
    "deliveryMaxDays": 12,
    "inStock": true,
    "checkedAt": "2026-10-04T10:00:00Z"
  },
  "economics": {
    "currency": "USD",
    "recommendedSellingPriceMinor": 3499,
    "netProfitMinor": 1099,
    "profitPercent": 31.4,
    "roiPercent": 45.8,
    "profitBand": "30-plus",
    "checkedAt": "2026-10-04T10:00:00Z",
    "adCostIncluded": false
  },
  "freshness": {
    "status": "fresh",
    "checkedAt": "2026-10-04T10:00:00Z"
  },
  "access": {
    "details": "preview",
    "requiredTier": "free"
  }
}
```

The public website may format raw display values such as `30-plus` into a seller-facing label such as `30%+ profit`; the API value remains unchanged.

## GET /api/public/products/{slug}

Current V1 detail response is the same allowlisted public product projection plus:

- public summary when one is stored;
- standby-supplier availability/provider summary;
- public methodology metadata describing the profit model.

It does **not** expose:

- primary supplier URL;
- standby supplier URL;
- supplier store URL;
- protected supplier/variant IDs;
- item/freight private sourcing costs;
- raw provider payloads;
- internal evidence notes.

A missing or non-publishable slug returns `PRODUCT_NOT_FOUND` / HTTP 404.

A provider/database failure returns `CATALOG_UNAVAILABLE` / HTTP 503 without substituting a fabricated product.

## Public website adapter behavior

The website adapter:

- requires response version `public-v1`;
- sends `Accept: application/json`;
- sends no app bearer token;
- uses server-side Next.js revalidation;
- uses a 6-second request timeout;
- treats a failed/unavailable API response separately from a valid empty catalog;
- treats product HTTP 404 separately from temporary unavailability.

Current website revalidation windows:

- markets/categories/profit bands: 3600 seconds;
- products/product detail: 900 seconds.

These website cache windows are separate from research-evidence freshness.

## Provider cache headers

Successful public API responses currently use:

```text
Cache-Control: public, max-age=300, s-maxage=3600, stale-while-revalidate=86400
```

Public error responses use `no-store`.

## Public image boundary

The API may return only an approved `listing_builder_images.hosted_url` selected by the publication query.

The public website then applies a second display boundary:

- HTTPS only for remote images;
- hostname must be listed in `ECOMMPILOT_PUBLIC_IMAGE_HOSTS`;
- arbitrary supplier/source image URLs are not automatically trusted.

## Error shape

Representative error:

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product is not available."
  }
}
```

Other public error codes include invalid-request/market/limit/profit-band/cursor cases and `CATALOG_UNAVAILABLE`.

## Membership boundary

Authenticated member operations are a separate app concern and are not part of this anonymous `public-v1` contract.

The public website may link visitors into the app, but membership entitlement and private supplier/listing data must continue to be enforced server-side by the authenticated application.

## Change rule

Do not silently change field meanings under `public-v1`.

If a future change is incompatible with existing public consumers, introduce an explicit versioned contract change rather than repurposing a current field.
