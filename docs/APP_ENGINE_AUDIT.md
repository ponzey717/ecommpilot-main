> **CURRENT INTERPRETATION — 2026-10-06**
> Treat app-engine findings as dependency/context only. The public site consumes approved public contracts from the app; it must not reproduce app inventory/research logic. See `docs/ECOMMPILOT_PUBLIC_SITE_COMPLETION_LOCK_2026-10-06.md`.

# Existing eCommPilot App Engine Audit

**Source repository:** `ponzey717/ecommpilot`  
**Public website repository:** `ponzey717/ecommpilot-main`  
**Audit date:** 04 October 2026

## Purpose

Identify what already exists in the private application before adding the new Winning Products publication, membership and import layers.

Core rule:

> Reuse compatible foundations. Do not create duplicate product, supplier, research or listing systems.

## Existing product foundation

### master_products

Already provides:

- canonical product name;
- category hint;
- brand strategy;
- workflow status;
- extensible attributes;
- workspace isolation.

### product_variants

Already provides:

- master-product relation;
- internal SKU;
- variant identity;
- attributes;
- active state.

**Decision:** reuse both.

## Existing supplier foundation

### supplier_stores

Already stores provider, store identity, URL, feedback, age, status and metadata.

### supplier_products

Already stores:

- supplier/store relation;
- master-product relation;
- provider product ID and URL;
- title snapshot;
- AliExpress Choice;
- product rating;
- order count;
- status;
- review-risk summary;
- metadata;
- first/last seen timestamps.

### supplier_variant_mappings

Already supports exact variant matching and specification snapshots.

### supplier_quotes

Already supports marketplace/destination-specific item cost, shipping cost, delivery range and stock.

### supplier_rankings / supplier_performance

Already supports eligibility, ranking, landed cost, margin, delivery and operational supplier quality.

**Decision:** do not create another generic supplier catalog.

## Existing Research supplier workflow

The newer Research workflow adds:

- supplier pool entries;
- exact-match confirmation;
- supplier variant identity;
- viability state;
- Primary/backup roles;
- role history;
- supplier-confirmed quotations;
- supplier-specific economics;
- freshness controls.

The current supplier queue read model already exposes much of what the new product catalog needs internally:

- product and market;
- category;
- supplier counts;
- confirmed/viable supplier counts;
- Primary supplier;
- item cost;
- freight;
- delivery;
- quote expiry;
- projected margin/contribution;
- supplier-readiness status.

**Decision:** reuse this as evidence. Add a stable publication layer rather than duplicating it.

## Existing Research evidence model

Already present:

- research profiles;
- keyword clusters;
- research jobs;
- discovery signals;
- product candidates;
- research observations;
- competitor snapshots;
- assessment history.

The architecture is evidence/provenance oriented.

**Decision:** keep this as the admin/product-engine research layer.

## Previous Winning Products scoring

The existing app contains the older `winning-v1` weighted 100-point scoring model and its approval history.

That was built for the previous workflow.

The current platform direction uses simpler configurable dropshipping qualification rules, including current eBay demand, shipping/fragility/variation fit, risk, supplier validity, delivery and profit.

**Decision:**

- preserve old `winning-v1` data/history;
- do not delete it;
- do not use it as the new public qualification contract;
- create a new versioned qualification/publication layer.

## Existing Listing Builder

Already stores:

- marketplace;
- eBay category;
- condition;
- title/subtitle;
- SKU;
- description;
- currency;
- selling price;
- quantity;
- supplier summary;
- economics summary;
- source snapshot;
- validation status;
- version/change history.

This is a strong base for member Listing Packages.

### Images

The existing Listing Builder image model already tracks source URL, hosted URL, source kind, rights status and sort order.

**Decision:** reuse this provenance/rights concept when adding canonical product media.

## Existing eBay capabilities

The private app already contains:

- eBay OAuth;
- Browse API research;
- item summary/detail reads;
- seller/price/shipping/category fields;
- connected-account reads;
- active listings;
- orders;
- traffic;
- finance;
- US/UK/AU marketplace support.

### Gap: official taxonomy synchronization

The inspected main branch does not currently expose a dedicated eBay Taxonomy category-tree/aspect service and canonical taxonomy tables.

**Decision:** add market-specific eBay taxonomy synchronization later. Do not mistake category fields returned by Browse for a complete taxonomy system.

## Membership gap

Current `workspace_memberships` represent operational RBAC:

- owner;
- admin;
- operator;
- viewer.

They are not customer subscriptions.

**Decision:** Free/Pro/Premium and credits require a separate commercial entitlement model.

## Public API gap

The app does not yet expose the new safe public catalog contract.

Required V1 endpoints:

- `GET /api/public/markets`
- `GET /api/public/categories`
- `GET /api/public/profit-bands`
- `GET /api/public/products`
- `GET /api/public/products/{slug}`

Member data should use authenticated endpoints and explicit entitlements.

## New concepts genuinely required

- product publication;
- product/market opportunity projection;
- public slug/SEO metadata;
- stable Primary and Standby supplier publication roles;
- commercial memberships/entitlements;
- credits ledger;
- saved/unlocked products;
- import batches and normalized import rows;
- public product media metadata;
- eBay taxonomy snapshots;
- product/supplier/freshness monitoring;
- listing-package generation/downloads.

## Migration rule

Before writing a migration, map every proposed column to one of:

1. existing canonical field;
2. existing evidence field/read model;
3. derived calculation;
4. genuinely new field.

Only category 4 belongs in a new column/table.
