# eCommPilot Public Website Implementation Status

**Updated:** 09 October 2026

## Status language

- **Implemented** = code exists on the feature branch.
- **Validated** = exact current head passed the stated local/CI checks.
- **Deployed** = production runtime/domain was updated.
- **Live-proven** = the production public site consumed real production API data successfully.

Do not treat these as interchangeable.

## Architecture lock

Public site:

- Domain: `ecommpilot.net`
- Repository: `ponzey717/ecommpilot-main`

Authenticated app:

- Domain: `app.ecommpilot.net`
- Repository: `ponzey717/ecommpilot`

The public website consumes only the allowlisted `public-v1` API from the app. It does not connect directly to operational PostgreSQL tables and does not receive app/member session credentials.

## Completed foundation

### Phase 0 — Foundation and architecture

- Next.js 16 + React 19 + TypeScript + Tailwind.
- Architecture, SEO and environment documentation.
- robots, sitemap, manifest and JSON-LD foundations.
- GitHub CI foundation.
- Manual-actions register.
- Marketplace Hybrid + Energetic Blue/Cyan design direction locked.
- Approved logo/brand asset family present.

## EP-10 V1 implemented on feature branch

Branch:

`feature/ep10-public-site-v1`

Base main SHA:

`89af569e16f609c6caa1bba9d33e8132f8bb2be5`

### Product positioning / homepage

Implemented:

- locked primary navigation:
  **Winning Products | What's Trending | How It Works | Pricing | Learn | Login | Get Started**;
- locked hero:
  **Stop Searching. Start Listing Winning eBay Products.**;
- locked supporting promise and trust line;
- pain points → solutions;
- live Winning Products preview;
- How It Works;
- product detail/value preview;
- Manage Your eBay Business flow;
- Product Watcher;
- What's Trending;
- public eBay Profit Calculator CTA;
- Free / Pro / Premium structure without invented commercial prices;
- locked final conversion CTA.

The homepage no longer uses fabricated/sample product sales, profit or supplier values. Its snapshot uses a real published public product when available and a truthful empty state otherwise.

### Real public catalog connection

Implemented server-side adapter to:

- `/api/public/markets`
- `/api/public/categories`
- `/api/public/products`
- `/api/public/products/{slug}`
- `/api/public/profit-bands`

Rules:

- API version must be `public-v1`;
- public reads are anonymous and allowlisted;
- no app bearer token is stored by the public site;
- unavailable API/catalog fails to an honest empty state;
- demo-product fallback was removed from the final catalog;
- exact supplier/private URLs and internal evidence do not enter public rendering.

A small isolated app dependency branch exposes the DB-supported public sort/search parameters:

`feature/ep10-public-catalog-sort-v1`

It must be locally validated and merged before public Trending/sort functionality is released.

### Winning Products

Implemented:

- all-market catalog;
- US / UK / AU routes;
- live published categories;
- product detail route;
- functional server-driven filters:
  - market;
  - category;
  - public title/summary search;
  - supplier provider (AliExpress in V1);
  - minimum profit;
  - minimum 30-day SOLD;
  - maximum delivery;
  - freshness;
  - sort;
- supported public sorts:
  - recently published;
  - most sold / 30d;
  - highest profit;
  - freshest evidence;
  - fastest delivery;
- safe public product details:
  - 30-day SOLD;
  - active listings;
  - target price;
  - net profit;
  - margin;
  - ROI;
  - supplier provider/rating/order count;
  - delivery;
  - Choice/in-stock;
  - standby availability flag;
  - freshness;
- member conversion CTA without exposing protected sourcing fields.

Remote product images require an approved `listing_builder_images.hosted_url` and an explicit HTTPS hostname allowlist configured with `ECOMMPILOT_PUBLIC_IMAGE_HOSTS`. The safe default is `media.ecommpilot.net`; arbitrary supplier/source URLs are not automatically trusted.

### What's Trending

Implemented:

**Market → Category → Filters → Search**

Results use the same canonical published Winning Products projection and `most_sold` ordering.

Trending does not create a second database and does not use:

- active listings as SOLD evidence;
- search volume as SOLD evidence;
- a hidden trend score.

### Categories / Markets

Implemented:

- live US / UK / AU market hub;
- categories derived from currently published public catalog data;
- category product counts;
- market/category links;
- honest empty states when no published products exist.

### Public tools

Implemented routes:

- Profit Margin Calculator;
- eBay Fee Estimator;
- Title Length Checker;
- Free Tools hub.

The V1 calculators use user-entered assumptions and do not present one universal eBay fee percentage as fact.

### Learn

Implemented useful Learn hub with tracks for:

- product research;
- supplier validation;
- fees/profit;
- listings/SEO;
- delivery/risk;
- monitoring.

No thin individual article URLs are created merely for SEO scale.

### Pricing

Implemented:

- Free / Pro / Premium structure;
- membership dimensions:
  - Winning Product access;
  - product allowance;
  - exact supplier access;
  - Product Watcher frequency;
  - Saved / Listed capacity;
  - What's Trending limits;
  - advanced tools.

Exact paid prices and exact recurring limits remain intentionally configurable and are not fabricated.

### Trust / legal

Implemented public routes:

- About;
- Contact;
- Privacy;
- Terms;
- Data Deletion.

Legal continuity was verified against the live WordPress pages and the current app policies on 09 October 2026.

The replacement public site preserves the full current policy substance and the existing policy version date (**14 September 2026**) for:

- Privacy Policy;
- Terms of Use;
- Data Deletion, including eBay Marketplace Account Deletion/Closure handling.

These pages are not shortened marketing summaries. Contact does not invent a public support email or inbox; it accurately links to the current app support guidance.

### SEO

Implemented:

- canonical metadata helpers;
- Organization / WebSite / Breadcrumb / SoftwareApplication helpers;
- robots;
- dynamic sitemap;
- live market/category/product sitemap entries sourced only from the public API;
- no draft/private operational records in sitemap;
- safe product page metadata and breadcrumbs;
- no physical Product/Offer schema until semantics/data support it;
- preserved legacy WordPress `/data-deletion/` route;
- permanent redirects for the observed legacy WordPress author/sitemap URLs;
- live legacy URL audit recorded in `docs/LEGACY_WORDPRESS_REDIRECTS_2026-10-09.md`.

### Contract tests

Public repository now includes an EP-10 source-contract suite covering:

- locked positioning/navigation;
- public API parameter names;
- no public catalog bearer token;
- no demo catalog fallback;
- demand-first Trending;
- functional filter dimensions;
- protected sourcing boundary;
- configurable HTTPS media-host allowlist;
- dynamic sitemap integration;
- legacy WordPress URL preservation;
- honest outage vs empty/not-found states;
- market-neutral calculator assumptions.

## Not yet validated on exact EP-10 head

Still required before merge/release:

1. `npm test`
2. `npm run lint`
3. `npm run build`
4. responsive review at desktop/tablet/390px mobile;
5. keyboard/accessibility smoke;
6. local API integration against the validated app public catalog route;
7. public sort/search app dependency validation;
8. metadata/robots/sitemap inspection from built output;
9. no broken internal links;
10. no accidental third-party image hotlinks;
11. production `ECOMMPILOT_PUBLIC_IMAGE_HOSTS` matches the actual approved media/storage host;
12. legacy WordPress redirects return permanent redirects as intended;
13. live WordPress sitemap is re-fetched immediately before cutover and the redirect map is updated if needed.

## Not deployed / not production-approved

This feature branch does **not** authorize:

- switching `ecommpilot.net`;
- Hostinger production deployment;
- DNS changes;
- production app/database migration;
- payment enablement;
- analytics/advertising enablement.

The existing production website must remain untouched until a separate launch-readiness approval.
