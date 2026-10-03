# eCommPilot Database and Media Strategy

**Locked direction:** 04 October 2026

## Database decision

Do **not** create a second Supabase project/database for the public website.

The current eCommPilot application already uses PostgreSQL through `DATABASE_URL`. The new public Winning Products platform should reuse that same eCommPilot production database as the system of record, provided the final production connection is confirmed.

Architecture:

```text
ecommpilot.net
    |
    | server-side safe API requests
    v
app.ecommpilot.net / product engine
    |
    v
existing eCommPilot PostgreSQL / Supabase database
```

The public website must not connect directly to privileged operational tables from browser code.

### Why one database

- avoids spending another Supabase free-project slot;
- prevents product/supplier data drifting between two databases;
- lets the existing research, supplier and listing systems remain the source of evidence;
- makes publishing a state change, not a database-copy job;
- keeps memberships, unlocks and downloads tied to the same product identity;
- simplifies backup and audit history.

Supabase Free currently provides only two free projects and a 500 MB database-size quota per project, so creating a new project solely for the public website would waste limited capacity.

## What gets added to the existing database

Only genuinely missing concepts should be added after migration review.

Likely additions:

- product publication state and public slug;
- market-specific public opportunity data;
- stable Primary and Standby supplier assignments;
- publication/freshness history;
- commercial Free/Pro/Premium entitlements;
- credit wallet and immutable credit ledger;
- saved/unlocked products;
- listing-package download records;
- CSV/XLSX/AI import batches;
- product media metadata;
- eBay market taxonomy snapshots;
- monitoring/check records.

Do not recreate tables that already exist for:

- master products;
- variants;
- supplier stores/products;
- supplier quotes;
- research evidence;
- listing drafts;
- listing images/provenance.

## Free-plan database controls

Because the current target is the Supabase Free plan:

1. keep images and binary files out of Postgres;
2. keep raw provider payloads trimmed to evidence actually needed;
3. archive or compact verbose old JSON payloads when safe;
4. index only useful query paths;
5. use append-only history selectively rather than storing duplicate full snapshots for every refresh;
6. monitor database size before large imports;
7. do not create a second database unless isolation becomes operationally necessary.

---

# Media/image hosting decision

## Recommended V1: Cloudflare R2

Use Cloudflare R2 for product/media objects instead of Supabase Storage.

Reasons:

- 10 GB-month Standard storage included in the free tier;
- 1 million Class A operations/month included;
- 10 million Class B operations/month included;
- Internet egress is free;
- after the free tier, Standard storage is currently low cost per GB;
- S3-compatible object-storage model;
- better separation between relational data and product media;
- avoids consuming the Supabase project's 1 GB Storage quota.

### Suggested buckets/prefixes

A single bucket is enough initially:

`ecommpilot-media`

Suggested keys:

```text
products/{product-id}/public/{asset-id}.webp
products/{product-id}/member/{asset-id}.webp
listing-packages/{market}/{product-id}/{version}.zip
imports/{yyyy}/{mm}/{batch-id}/source.csv
research/{batch-id}/{asset-id}
```

Keep environment separation by prefix until scale justifies separate buckets:

```text
dev/...
prod/...
```

## Database stores metadata, not image bytes

A product-media row should contain:

- product ID;
- source provider;
- original/source URL;
- R2 object key;
- public delivery URL if approved;
- MIME type;
- width/height;
- byte size;
- checksum;
- image role;
- sort order;
- rights/usage status;
- fetched/checked timestamp;
- active flag.

## Rights/provenance rule

Supplier or marketplace images must not be blindly copied and published.

Use a state such as:

- `unknown`
- `review`
- `approved`
- `rejected`

The existing Listing Builder already has this useful rights/provenance pattern and it should be reused.

If a third-party image is not approved for hosting, store/reference its source URL only where appropriate instead of copying it into R2.

## Delivery

For public product cards/pages:

- serve approved public assets through a branded media hostname later, for example `media.ecommpilot.net`;
- set strong cache headers;
- use WebP/AVIF where practical;
- keep original dimensions/metadata for later responsive rendering;
- do not proxy every request through the application server.

## Alternatives considered

### Supabase Storage

Usable, but not preferred for product media on the Free plan because the included storage is only 1 GB and the database/auth project is more valuable for application state.

### Backblaze B2

Also inexpensive and viable, but R2 is simpler for this project because of the generous free request allowance and zero Internet egress charge.

### Store files on Hostinger app disk

Not recommended as the canonical media store. Deployments, scaling and future migration are cleaner when product assets live in object storage.

## Decision summary

- **Database:** existing eCommPilot PostgreSQL/Supabase project.
- **New Supabase project:** no.
- **Public website database:** none of its own in V1.
- **Images/files:** Cloudflare R2.
- **Browser access to operational DB:** no.
- **Public data path:** eCommPilot app API -> public Next.js website.
