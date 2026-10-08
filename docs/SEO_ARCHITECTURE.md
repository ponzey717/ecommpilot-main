# eCommPilot SEO Architecture

## Goal

Build `ecommpilot.net` as an SEO-first public acquisition surface without turning it into thin programmatic pages.

## 1. Indexable page families

Current EP-10 V1 indexable page families:

- homepage;
- Winning Products hub;
- US / UK / AU market landing pages;
- published category landing pages;
- qualified public product opportunity pages;
- public What's Trending landing page;
- free eBay tools;
- Learn hub;
- pricing/membership information;
- About / Contact / legal-policy pages.

Individual Learn article routes are not created until a full useful article exists.

Only pages with meaningful unique value should be indexable.

## 2. URL structure

Preferred:

```text
/
 /winning-products
 /winning-products/us
 /winning-products/uk
 /winning-products/au
 /winning-products/us/{category-slug}
 /winning-products/us/{category-slug}/{product-slug}
 /whats-trending
 /markets
 /categories
 /free-tools
 /free-tools/{tool-slug}
 /learn
 /pricing
 /about
 /contact
 /privacy
 /terms
 /data-deletion
```

Rules:

- lowercase;
- short human-readable slugs;
- one canonical URL per item;
- no query-string pages in sitemap;
- clean `/winning-products`, market pages and `/whats-trending` may be indexable;
- filter/search/sort/cursor query variants are **noindex**;
- on approved production they remain **follow** so crawlers can discover canonical product/category links;
- on local/staging, `ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false` makes the whole site noindex/nofollow;
- a future curated filter combination must receive its own clean route and unique content before it becomes indexable.

## 3. Metadata

Every indexable template needs:

- unique title;
- unique meta description;
- canonical;
- Open Graph;
- Twitter metadata;
- robots directive;
- meaningful H1;
- breadcrumb context where relevant.

Market/category/product titles must be generated from real page data, not keyword stuffing.

## 4. Structured data

Use schema only when supported by the visible page.

Current V1 schema types:

- Organization
- WebSite
- BreadcrumbList
- SoftwareApplication for the genuine public tools

Future ItemList or Article schema should be added only when the corresponding visible page/content semantics are implemented.

Do not add physical Product/Offer/AggregateRating schema until the page data and semantics support it. eCommPilot is presenting product-opportunity intelligence, not necessarily acting as the merchant of record for the physical product.

## 5. Sitemaps

V1 sitemap is generated from shipped/indexable static routes plus the live public-v1 market/category/product projection.

It never includes query-string filter variants.

As volume approaches the single-sitemap XML limits, split into a sitemap index rather than silently truncating:

- main/static sitemap;
- products sitemap;
- categories sitemap;
- learn sitemap;
- tools sitemap;
- optional image sitemap.

Do not add draft, locked-only, paused, stale or non-canonical pages.

## 6. Product page indexing quality

A product page should not be indexable merely because a product exists in the database.

Before indexing, require enough unique useful content such as:

- market and category context;
- current sales evidence;
- supplier status;
- delivery information;
- economics/profit information appropriate to visitor access;
- freshness timestamp;
- meaningful summary;
- related category/market links.

The current app publication projection already removes non-publishable/stale publication records from public reads. If lifecycle rules change later, preserve the same principle: non-publishable products must not remain indexable merely because an old slug once existed.

## 7. Internal linking

Core hierarchy:

```text
Home
 -> Winning Products
    -> Market
       -> Category
          -> Product
```

Supporting links:

- product -> category;
- product -> market;
- category -> related categories;
- tools -> related guides;
- guides -> tools/products where contextually relevant;
- pricing -> catalog/member CTA.

Avoid orphan product pages.

## 8. Search Console

Keep staging fail-closed with `ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false`.

After the approved production deployment is rebuilt with indexing enabled, production setup should include:

- domain property where possible;
- sitemap submission;
- URL inspection after launch;
- indexing monitoring;
- Core Web Vitals monitoring;
- structured data monitoring;
- manual action/security monitoring.

Verification token should be configured without committing secrets.

## 9. Technical SEO

Required:

- server-rendered meaningful page content;
- stable canonical URLs;
- no accidental duplicate content;
- fast images with dimensions;
- responsive layout;
- accessible navigation;
- HTTPS;
- correct status codes;
- 404 handling;
- redirects when slugs change;
- minimal hydration/client JS;
- caching/revalidation suited to freshness;
- clean robots behavior.

## 10. Content and trust

Use factual, data-led language.

Prefer:

- "64 sales in the last 30 days"
- "Supplier checked 3 hours ago"
- "34.8% estimated margin before optional ad spend"

Avoid unsupported hype such as:

- "guaranteed winner"
- "guaranteed profit"
- "best supplier"

Show evidence dates and methodology where useful.

## 11. Free tools as acquisition pages

Public tools remain strategically important.

Each tool page should include:

- useful interactive tool;
- clear explanation;
- examples;
- FAQ only when genuinely useful;
- related guide links;
- relevant Winning Products/member CTA;
- SoftwareApplication schema only when supported.

Tools should solve real eBay seller problems, not exist only to create keyword pages.

## 12. Measurement

Minimum launch measurement:

- Google Search Console;
- privacy-appropriate analytics;
- conversions for Join Free / Login / pricing / product view;
- organic landing-page performance;
- tool usage;
- catalog-to-registration conversion.

Exact analytics provider can be decided before production deployment.
