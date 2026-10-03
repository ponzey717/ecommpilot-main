# eCommPilot Public Website Agent Instructions

This repository powers the public eCommPilot website at `https://ecommpilot.net`.

## Product architecture

eCommPilot has two surfaces:

- `ecommpilot.net`: public, SEO-first website for Winning Products, markets, categories, free tools, guides, pricing and acquisition.
- `app.ecommpilot.net`: authenticated member/admin/product engine for product inventory, research, supplier data, memberships, credits, downloads and internal operations.

Do not merge these responsibilities without an explicit architecture decision.

The public website must consume safe public/member APIs. It must not directly expose private operational tables, credentials, supplier secrets, admin data or raw internal research records.

## Product positioning

Primary positioning:

> Winning Products for eBay Dropshippers

Initial markets:

- US
- UK
- AU

Germany can be added later.

Initial supplier source:

- AliExpress

Later sources may include CJ, Amazon and other supplier/wholesale sources. Supplier logic must remain source-agnostic.

## Winning Product rules

Criteria are intentionally practical, configurable and not over-engineered. Do not hardcode business thresholds across the UI or data layer.

Current working baseline includes:

- around 30+ eBay sales in the last 30 days;
- physical item;
- reasonable size for dropshipping;
- non-fragile;
- maximum 3 major variations;
- suitable for dropshipping;
- no obvious high-risk issue;
- enough price room for profit;
- current market activity.

These are configuration rules, not permanent constants.

## Economics

V1 profit logic:

- Landed Supplier Cost = Product Cost + Supplier Shipping + Purchase Tax/GST/VAT where applicable
- eBay Cost = applicable marketplace selling fee + mandatory transaction fees
- Net Profit = eBay Selling Price - Landed Supplier Cost - eBay Cost
- Profit % = Net Profit / eBay Selling Price * 100
- ROI = Net Profit / Landed Supplier Cost * 100

Optional promoted listing/ad spend is excluded in V1 and must be disclosed where profit is shown.

Never hardcode one tax or fee rate globally. Market/category/source configuration must control those values.

## Supplier model

Published products should support:

- primary supplier;
- standby supplier;
- supplier history;
- stock/availability;
- delivery;
- price and shipping;
- tax where applicable;
- rating/reviews/orders where available;
- Choice or equivalent source attributes where available;
- checked-at timestamps;
- recheck/pause state.

Do not silently delete supplier history.

## Design

The approved brand direction is modern SaaS + marketplace/catalog hybrid.

Current V1 palette:

- Midnight Navy: #071A3D
- Pilot Blue: #146CFF
- Electric Cyan: #16D9E3
- Sky Blue: #5CEBFF
- Deep Blue: #0B3BA7

Typography direction:

- Manrope for headings
- Inter for body/UI

The approved visual mark is the cart + upward arrow eCommPilot logo.

The Theme Studio direction is now locked:

- Marketplace Hybrid for catalog/product structure and browse behavior.
- Energetic Blue/Cyan for brand identity, CTAs and selected highlights.
- Dark navy/blue hero and header treatment is approved for major public page intros.
- AliExpress Choice should use a restrained AliExpress-style green treatment.
- Product/data sections should remain predominantly light, readable and marketplace-oriented.
- Do not flood the interface with gradients; reserve them for brand moments.

This direction was explicitly approved by the owner on 04 October 2026.

## SEO non-negotiables

Every public implementation must consider:

- semantic headings;
- unique title and meta description;
- canonical URL;
- Open Graph/Twitter metadata;
- schema only when supported by visible page data;
- XML sitemap coverage;
- robots controls;
- clean crawlable URLs;
- breadcrumbs;
- internal linking;
- image alt text;
- Core Web Vitals;
- accessible navigation;
- server-rendered/indexable core content.

Never create fake reviews, fake aggregate ratings, fake prices, fake availability or unsupported Product schema.

## Route principles

Preferred public structure:

- /
- /winning-products
- /winning-products/[market]
- /winning-products/[market]/[category]
- /winning-products/[market]/[category]/[slug]
- /markets
- /markets/[market]
- /categories
- /free-tools
- /free-tools/[tool]
- /learn
- /learn/[slug]
- /pricing

Do not add unfinished routes to the sitemap.

## Engineering rules

- Next.js App Router + TypeScript + Tailwind.
- Prefer server components for indexable public content.
- Keep client JavaScript minimal.
- No direct browser access to privileged APIs or secret keys.
- Environment variables containing secrets must never use NEXT_PUBLIC_.
- Keep data fetching behind typed adapters.
- Keep public API contracts stable and documented.
- Avoid duplicate business logic between website and app engine.
- Do not run `npm audit fix --force` without explicit review.
- Do not perform broad dependency upgrades during feature work.
- Do not make destructive Git operations unless explicitly approved.

## Before completing a change

Run, when applicable:

```bash
npm run lint
npm run build
```

Confirm:

- no TypeScript errors;
- no broken routes;
- canonical/metadata behavior is correct;
- no secrets in committed code;
- mobile layout is not broken;
- new indexable pages are considered for sitemap and schema.

## Working style

Use small, reviewable phases. Preserve architecture decisions in `docs/`. If a requirement conflicts with these instructions, stop and document the conflict instead of creating a one-off workaround.
