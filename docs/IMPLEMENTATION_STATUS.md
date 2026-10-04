# eCommPilot Public Website Implementation Status

**Updated:** 04 October 2026

## Completed

### Phase 0 — Foundation and architecture

- GitHub repository connected.
- Next.js 16 + React 19 + TypeScript + Tailwind initialized.
- Lint and production build passed on the owner's Mac after foundation sync.
- Architecture documented.
- SEO architecture documented.
- Environment structure documented.
- robots, sitemap and manifest foundations created.
- JSON-LD helpers created.
- GitHub CI workflow created.
- Manual-actions register created.
- Heavy GitHub Actions validation reduced to milestone/review use instead of every push.

### Brand decision

Locked:

**Marketplace Hybrid structure + Energetic Blue/Cyan identity**

Also approved:

- dark navy/blue page headers and heroes;
- cyan/blue glow for selected brand moments;
- light marketplace/catalog product sections;
- AliExpress Choice green badge treatment;
- Manrope headings + Inter UI/body.

### Phase 1 — Design system

Implemented in GitHub:

- primary/dark brand logo assets for development;
- favicon/icon mark;
- brand color tokens;
- typography integration;
- responsive header;
- mobile navigation;
- footer;
- CTA styles;
- badges;
- filters;
- product cards;
- data metric cards;
- hero/snapshot pattern.

### Phase 2 — Public site shell

Implemented in GitHub:

- branded homepage;
- Winning Products hub;
- US/UK/AU market routes;
- market/category/product-detail Winning Products routes;
- Markets hub;
- Categories hub;
- Free Tools hub;
- Learn hub shell;
- Pricing shell;
- custom 404;
- four free-tool routes, including the user-input Sell-Through Calculator;
- breadcrumbs and breadcrumb schema across mature catalog and public hub routes;
- contextual related-tool links and catalog CTA on free-tool pages;
- Learn hub is now indexable with three completed evergreen guides, Article schema, ItemList schema, homepage discovery and sitemap coverage.

### Phase 3 — API-first catalog preparation

Implemented in GitHub:

- typed server-side public catalog adapter;
- markets API client;
- profit-band API client;
- categories API client;
- products list API client;
- product detail API client;
- API-first Winning Products grids;
- production-safe empty states;
- development-only sample product fallback;
- homepage catalog section connected to the API layer;
- market pages connected to the API layer;
- category pages connected to verified API categories;
- product detail pages display only API-supplied evidence;
- safe public filter support for market and minimum profit band;
- exact query-name alignment with the private backend contract;
- separate verified-empty and temporary-unavailable states;
- non-data loading states for Winning Products and Categories;
- dynamic sitemap inclusion for market/category/product catalog routes only when verified public data exists, with bounded cursor pagination;
- safe Standby availability and public profit methodology on product detail pages;
- real cursor pagination for catalog grids;
- public catalog filters for supplier, maximum delivery, minimum 30-day sales and evidence freshness, with sanitized query handling and filter preservation;
- approved hosted HTTPS product images rendered on cards/detail pages and available to social metadata.

## Important development rules

- Production must never display sample/demo product or category data as verified evidence.
- Missing evidence remains missing; do not fabricate values.
- ecommpilot.net consumes only the safe public API from app.ecommpilot.net.
- The browser never receives privileged database/API secrets.
- Do not create a second Supabase project for the public website.
- Do not build a fake universal eBay taxonomy.
- Do not add Product schema unless visible verified data supports it.

## Current branch / review work

Draft PR:

**Connect categories and catalog filters to public API**

Review additions now also include advanced catalog filtering, real cursor pagination, false-404 outage protection, verified freshness timestamps, safe hosted-image rendering, completed Learn content, conditional real-data sitemap expansion, filter-query noindex rules, calculator economics improvements and accessibility fixes.

Branch:

`chatgpt/api-first-categories-hub`

Current scope:

- API-first production Categories and Winning Products surfaces;
- development-only catalog fallbacks;
- market/profit/sales/delivery/supplier/freshness filters;
- cursor pagination with filter preservation;
- correct backend query contract;
- safe unavailable vs empty vs not-found behavior;
- verified category/product sitemap discovery only;
- safe product detail evidence, Standby summary and methodology;
- real Learn content and seller tools;
- filtered query URLs marked noindex/follow;
- mobile/accessibility polish.

This branch must remain unmerged until local lint/build validation is run at the milestone.

## Private backend dependency

The private `ponzey717/ecommpilot` backend is handled separately.

Completed and pushed:

- `feature/public-winning-products-v1` at `3349ec9`;
- draft backend foundation PR #58;
- `feature/public-winning-products-ops-v1` at `1cada14`, with private qualification/economics/supplier/publication operations and UI.

Reviewed operations improvements include canonical DB evidence reconstruction and transaction-scoped writes through `withWorkspaceTransaction`.

Launch-readiness branch is now pushed and under draft review:

`feature/public-winning-products-launch-readiness-v1`

It adds server-derived publication identity, migration preflight/postflight tooling, PostgreSQL workflow integration tests, deployment safeguards, dependency security remediation and the production migration checkpoint.

Lead review added further hardening for retired controls, marketplace-matched evidence/quotes, hostile cross-market PostgreSQL fixtures and cleaner partial-schema verification. The branch now needs one local validation rerun before migration approval is considered.

Do not recreate or duplicate that backend implementation from the public repository.

## Next engineering work

1. Public static review is at the local validation checkpoint.
2. Run local `npm run lint` and `npm run build` once before merging public PR #1.
3. Rerun local validation on `feature/public-winning-products-launch-readiness-v1` after lead-review hardening.
4. Keep backend foundation/operations/launch-readiness PRs unmerged until that rerun is clean.
5. Do not merge/deploy the private app before explicit migration approval because its root production build runs the migration command.
6. After backend approval and migration application, configure production `ECOMMPILOT_API_BASE_URL`.
7. Verify markets, categories, products, filters, cursor pagination and product detail end to end against real published data.
8. Then perform production sitemap/robots/metadata/schema checks before Search Console submission.
9. Expand Learn/tools only where genuine utility justifies new pages.

## Manual action currently required

None while GitHub implementation continues.

At the validation milestone on the owner's Mac:

```bash
cd /Users/macbookpro/Developer/ecommpilot-main
git pull
npm run lint
npm run build
```

Do not trigger repeated full GitHub Actions runs during active development.
