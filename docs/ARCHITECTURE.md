> **CURRENT PLAN NOTICE — 2026-10-06**
> This document remains valid where consistent with `docs/ECOMMPILOT_PUBLIC_SITE_COMPLETION_LOCK_2026-10-06.md`. ecommpilot.net is a public marketing/discovery surface over app-owned canonical inventory; it is not a second research or inventory system.

# eCommPilot Platform Architecture

## 1. Canonical platform split

### Public website

**Domain:** `ecommpilot.net`  
**Repository:** `ponzey717/ecommpilot-main`

Responsibilities:

- homepage and brand;
- Winning Products public catalog;
- market pages;
- category pages;
- product preview/detail pages;
- free eBay tools;
- learning/SEO content;
- pricing;
- public membership comparison;
- SEO, schema, sitemaps and Search Console readiness.

The public site should be highly cacheable and server-rendered where practical.

### Member/admin engine

**Domain:** `app.ecommpilot.net`

Responsibilities:

- registration and login;
- memberships;
- credits;
- saved/unlocked products;
- downloads/listing packages;
- paid tools;
- product inventory;
- research;
- imports/manual entry;
- supplier matching;
- economics;
- publishing;
- freshness monitoring;
- admin operations.

Existing research/listing modules may be reused internally even when they are no longer exposed as the normal member workflow.

## 2. Data boundary

The public site must not directly query private operational tables from the browser.

Preferred flow:

```text
Public browser
    |
    v
ecommpilot.net (Next.js)
    |
    v
safe public/member API
    |
    v
app engine / database
```

Public responses should expose only fields approved for the user's access level.

Candidate public endpoints:

- `GET /api/public/products`
- `GET /api/public/products/{slug}`
- `GET /api/public/categories`
- `GET /api/public/markets`
- `GET /api/public/profit-bands`

Member-only data must require authenticated endpoints.

## 3. Main platform entities

Before creating new database tables, audit the existing app schema and reuse compatible entities.

Target conceptual model:

- Users
- MembershipPlans
- UserMemberships
- CreditWallets
- CreditTransactions
- Markets
- EbayCategories
- Products
- ProductMarketOpportunities
- SupplierProducts
- SupplierOffers
- ProductSuppliers
- ProductEconomics
- ProductImages
- ProductListings
- ProductImports
- ResearchBatches
- ProductChecks
- ProductUnlocks
- SavedProducts
- ListingPackages
- LinkHealth

## 4. Product ingestion

Products may enter through:

1. eCommPilot research engine;
2. manual admin entry;
3. versioned CSV/XLSX import;
4. future structured API/AI browser submission.

Every path must pass validation and QA before public publishing.

## 5. Supplier resilience

Each published product should support a primary and standby supplier.

If the primary supplier fails:

1. validate standby;
2. recalculate economics;
3. promote standby when it still qualifies;
4. find a new standby;
5. pause/recheck when no valid supplier remains.

Supplier history remains auditable.

## 6. Product freshness

Suggested configurable checks:

- daily lightweight link/availability checks;
- weekly supplier price, stock, delivery and economics;
- monthly eBay 30-day sales, competition and current opportunity checks.

Possible lifecycle states:

- Imported
- Researching
- Needs Review
- Qualified
- Ready
- Published
- Needs Recheck
- Paused
- Retired

## 7. Images and files

Preferred central object storage, subject to production database/storage audit:

- public product media;
- member/private product media;
- listing packages;
- import files;
- research assets.

Do not copy third-party product media blindly. Track source URL, supplier/source, fetch date, storage status and usage approval.

## 8. Deployment principle

The public site should remain deployable independently from the member/admin engine.

A failure or deployment on `app.ecommpilot.net` should not automatically make the public SEO website unavailable, and vice versa.
