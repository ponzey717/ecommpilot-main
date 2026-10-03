# eCommPilot Complete Platform Build Plan

## Product direction

eCommPilot becomes a Winning Products platform for eBay dropshippers.

Public acquisition:

`ecommpilot.net`

Member/admin/product engine:

`app.ecommpilot.net`

Initial markets:

- US
- UK
- AU

Initial supplier:

- AliExpress

Later:

- CJ
- Amazon
- other suppliers/wholesalers/private sources
- Germany market

## Build principles

1. Keep public SEO and private operations separated.
2. Reuse proven app code and integrations rather than rebuilding blindly.
3. Make business thresholds configurable.
4. Metrics and economics must be transparent and date-stamped.
5. Every published product has a primary supplier and standby supplier target.
6. Never force a fixed number of products to qualify.
7. Keep the member experience simple.
8. Add new supplier sources behind a common adapter model.
9. Build SEO into templates before content scale.
10. Use small checkpoints and validate before expanding.

---

# Phase 0 — Foundation and architecture

**Status:** in progress

Deliverables:

- public GitHub repository;
- Next.js + TypeScript + Tailwind;
- canonical architecture docs;
- agent instructions;
- site configuration;
- SEO metadata utilities;
- schema utilities;
- robots;
- sitemap foundation;
- web manifest;
- manual-actions register;
- build plan.

Exit criteria:

- `npm run lint` passes;
- `npm run build` passes;
- no starter metadata remains;
- no unfinished route appears in sitemap.

---

# Phase 1 — Brand implementation and design system

Inputs:

- approved eCommPilot horizontal logo;
- square logo;
- icon/favicon asset;
- final Theme Studio direction.

Deliverables:

- production color tokens;
- typography;
- spacing/radius/shadow tokens;
- buttons;
- badges;
- navigation;
- product cards;
- filters;
- market selector;
- empty/loading/error states;
- desktop/tablet/mobile rules;
- accessible contrast validation.

Pages to prototype:

- homepage;
- Winning Products grid;
- single product;
- pricing;
- free tools hub;
- member handoff CTA.

Do not start broad page styling until the Theme Studio choice is locked.

---

# Phase 2 — Public site shell

Deliverables:

- global header;
- footer;
- responsive navigation;
- homepage;
- Winning Products hub shell;
- Markets hub;
- Categories hub;
- Pricing;
- Free Tools hub;
- Learn hub;
- 404/not-found;
- error boundaries.

SEO:

- canonical metadata;
- OG/Twitter;
- breadcrumbs;
- sitemap additions only as routes ship.

---

# Phase 3 — App/database audit and public API contract

Audit the existing app before adding new tables.

Confirm:

- existing products/research tables;
- eBay taxonomy integration;
- supplier entities;
- economics fields;
- auth/membership tables;
- existing API patterns;
- current Supabase/storage setup.

Define safe public contracts:

- products list;
- product detail;
- markets;
- categories;
- profit bands;
- freshness;
- public access fields;
- member access fields.

Exit criteria:

- typed API contract;
- no browser access to private operational tables;
- no duplicate database model created without audit.

---

# Phase 4 — Central Product Inventory

Build/reconcile the canonical inventory in the app engine.

Needs:

- product identity;
- market/category;
- eBay evidence;
- primary supplier;
- standby supplier;
- economics;
- listing data;
- images;
- freshness;
- workflow state;
- audit history.

Product lifecycle:

Imported -> Researching -> Needs Review -> Qualified -> Ready -> Published -> Needs Recheck/Paused -> Retired

---

# Phase 5 — CSV/XLSX and AI import

Contract:

`ecompilot_product_import_v1`

Support:

- category-specific research batches;
- market/source validation;
- primary and standby supplier fields;
- eBay evidence;
- economics;
- listing fields;
- QA status;
- research timestamps;
- rejection reasons.

Validation must catch:

- missing required data;
- malformed URLs;
- currency mismatch;
- invalid market/source;
- stale research;
- duplicate products;
- profit calculation errors;
- missing backup supplier;
- invalid categories;
- invalid media.

AI/browser submissions use the same normalized contract. AI does not bypass QA.

---

# Phase 6 — AliExpress supplier engine

Use existing AliExpress integration where useful.

For each candidate capture, where available:

- exact product/SKU match;
- Choice;
- orders/sold history;
- rating;
- review count;
- store quality;
- stock;
- product cost;
- shipping;
- tax where relevant;
- ship-from;
- delivery;
- variations;
- source URL;
- checked-at;
- current link health.

Primary and standby supplier selection remains auditable.

Choice is preferred, not an unconditional blocker.

---

# Phase 7 — Economics engine

Formula:

```text
Landed Supplier Cost =
  Product Cost
  + Supplier Shipping
  + Purchase Tax/GST/VAT where applicable

eBay Cost =
  Marketplace Selling Fee
  + Mandatory Transaction Fees

Net Profit =
  eBay Selling Price
  - Landed Supplier Cost
  - eBay Cost

Profit % =
  Net Profit / eBay Selling Price * 100

ROI =
  Net Profit / Landed Supplier Cost * 100
```

V1 excludes optional ad/promoted listing cost.

Profit bands:

- 10%+
- 15%+
- 20%+
- 25%+
- 30%+
- 35%+
- 40%+
- 50%+

Market/category/tax/fee rules must be configurable and versioned.

---

# Phase 8 — Winning Products public catalog

Product card priorities:

- image;
- market;
- product name;
- category;
- 30-day sales;
- delivery;
- supplier;
- Choice indicator;
- rating;
- profit band/exact accessible margin;
- freshness;
- CTA.

Filters:

- market;
- category;
- profit band;
- supplier;
- delivery;
- sales;
- rating;
- freshness.

Public/member field visibility must be enforced server-side.

---

# Phase 9 — Product detail pages

Sections:

1. product identity;
2. eBay Market;
3. supplier;
4. standby supplier;
5. profit;
6. listing data;
7. freshness/status;
8. related products/category.

Anonymous visitors receive useful public data plus registration CTA.

Logged-in tier determines locked/unlocked data.

---

# Phase 10 — Memberships and credits

Working membership names:

- Free
- Pro
- Premium

Working access concept:

- Free: access up through roughly the 25%+ level, with higher-value details locked;
- Pro: access up through roughly 35%+;
- Premium: all bands including 40%+ and 50%+.

Exact pricing, product limits and recurring credit quantities remain configurable and not yet locked.

Credits may support:

- product unlocks;
- listing package generation;
- enhanced SEO generation;
- paid tools.

Payment provider is selected later.

---

# Phase 11 — Listing packages

Paid/member actions may generate:

- eBay CSV;
- optimized title;
- HTML description;
- item specifics JSON;
- pricing/economics summary;
- supplier reference;
- standby supplier reference;
- research summary;
- images where usage is permitted.

Standard vs enhanced SEO output must use stored verified facts and never invent product specifications.

---

# Phase 12 — Free eBay tools and Learn hub

Public tools remain an important SEO/acquisition channel.

Prioritize tools with:

- real seller utility;
- search demand;
- clear connection to Winning Products/membership;
- server-renderable explanatory content;
- strong internal links.

Each tool gets a focused landing page, not a thin generic shell.

Learn content should support:

- eBay dropshipping;
- product research;
- profit/fee understanding;
- supplier validation;
- listings;
- category-specific guidance.

---

# Phase 13 — Product freshness and monitoring

Suggested configurable schedule:

Daily lightweight:

- source link;
- stock;
- obvious price/availability changes.

Weekly:

- product cost;
- shipping;
- delivery;
- primary/standby validity;
- economics.

Monthly:

- eBay 30-day sales;
- price range;
- competition;
- active listings;
- supplier quality;
- economics.

Auto-pause/recheck examples:

- both suppliers invalid;
- profit below 10%;
- sales below configured review threshold;
- product mismatch;
- stale evidence;
- source removed/out of stock.

Retain history.

---

# Phase 14 — SEO scale and Search Console

Deliverables:

- sitemap indexes when needed;
- product/category/learn/tool sitemaps;
- robots rules;
- canonical validation;
- schema validation;
- Search Console verification;
- sitemap submission;
- Core Web Vitals review;
- index coverage review;
- internal linking audit;
- redirects/slug history;
- 404/410 policy.

Do not index low-information or stale pages only to increase URL count.

---

# Phase 15 — Deployment

Preferred public deployment:

- Hostinger Node.js Web App;
- GitHub `main` deployment;
- `ecommpilot.net`;
- HTTPS;
- production environment variables;
- build/start configuration;
- rollback checkpoint.

Before domain switch:

- staging/preview validation;
- desktop/mobile;
- sitemap/robots;
- metadata;
- schema;
- forms/CTAs;
- API connectivity;
- 404s;
- performance;
- accessibility.

---

# Phase 16 — Additional suppliers and markets

Add behind common adapters:

- CJ;
- Amazon;
- additional wholesalers/sources;
- Germany market.

Do not fork the product model per supplier.

---

# Phase 17 — User eBay account connections

Not required for Winning Products V1.

Later:

- user OAuth;
- direct publishing;
- revise/sync;
- orders;
- tracking;
- account-specific listing workflows.

Our own eBay account(s) may remain connected in the app for API testing and internal publishing experiments.

---

# Immediate sequence

1. Finish Phase 0 foundation.
2. Lock Theme Studio visual direction.
3. Implement Phase 1 design system.
4. Build public shell.
5. Audit app/database and define APIs.
6. Connect real catalog data.
7. Build product pages.
8. Add memberships/credits handoff.
9. Build listing packages.
10. Expand tools/learn and SEO scale.
11. Add monitoring and additional suppliers.

This sequence intentionally avoids building a polished frontend against an unverified data model.
