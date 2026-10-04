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
- Learn hub is now indexable with three completed evergreen guides, Article schema, ItemList schema and sitemap coverage.

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

Review additions now also include the fourth free tool, API contract alignment, conditional sitemap behavior, loading/error states and safe product-detail Standby/methodology rendering.

Branch:

`chatgpt/api-first-categories-hub`

Current scope:

- replace production hardcoded Categories hub with market-specific API categories;
- keep category samples development-only;
- make market filters functional;
- make profit-band filters functional;
- support configured profit bands, with approved V1 bands as fallback;
- pass `minProfitBand` through hub, market and category product queries.

This branch must remain unmerged until local lint/build validation is run at the milestone.

## Private backend dependency

The private `ponzey717/ecommpilot` backend task is being implemented separately by Codex.

Requested branch:

`feature/public-winning-products-v1`

Codex had already:

- audited canonical docs/schema;
- confirmed publication must remain additive to the internal `winning-v1` engine;
- confirmed existing supplier pool/quotes/evidence should remain authoritative;
- identified the need for a separate public-economics projection because the internal Research economics include promoted-listing/other assumptions that do not match the public V1 formula;
- started editing before a network reconnect.

Do not recreate or duplicate that backend implementation from the public repository.

## Next engineering work

1. Finish static review of the draft public catalog PR.
2. Run local `npm run lint` and `npm run build` once at the milestone before merge.
3. Backend foundation `feature/public-winning-products-v1` is now pushed and under draft PR review (#58).
4. Review the follow-on `feature/public-winning-products-ops-v1` once Codex pushes it, with special attention to canonical evidence reconciliation, transactional publication mutations and qualification profile defaults.
5. After backend approval and production migration approval, connect production `ECOMMPILOT_API_BASE_URL`.
6. Verify markets, categories, products and product detail end to end.
7. Expand sitemap/indexing only for real published catalog URLs.
8. Continue mobile catalog/filter polish.
9. Expand Learn with additional genuinely useful guides as topics mature.
10. Expand additional free tools based on genuine seller utility and SEO value.

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
