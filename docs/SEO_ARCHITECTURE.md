# eCommPilot SEO Architecture

## Goal

Build `ecommpilot.net` as an SEO-first public acquisition surface without turning it into thin programmatic pages.

## 1. Indexable page families

Planned page families:

- homepage;
- Winning Products hub;
- market landing pages;
- category landing pages;
- qualified product opportunity pages;
- free eBay tools;
- evergreen learning/guides;
- pricing/membership information.

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
 /markets
 /markets/us
 /categories
 /free-tools
 /free-tools/{tool-slug}
 /learn
 /learn/{article-slug}
 /pricing
```

Rules:

- lowercase;
- short human-readable slugs;
- one canonical URL per item;
- no query-string pages in sitemap;
- filters are normally non-indexable unless intentionally promoted as curated landing pages.

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

Initial schema types:

- Organization
- WebSite
- BreadcrumbList
- ItemList
- Article
- SoftwareApplication for genuine public tools when applicable

Do not add physical Product/Offer/AggregateRating schema until the page data and semantics support it. eCommPilot is presenting product-opportunity intelligence, not necessarily acting as the merchant of record for the physical product.

## 5. Sitemaps

V1 sitemap starts with shipped/indexable routes only.

As data routes go live, split when volume justifies it:

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

Paused or stale products may need noindex or removal from sitemap depending on lifecycle policy.

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

Production setup should include:

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
