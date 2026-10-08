# EP-10 Exact-Head Validation Runbook — 09 Oct 2026

## Purpose

Validate the two Draft PRs that complete the eCommPilot public website without touching production:

- Public website: `ponzey717/ecommpilot-main` PR **#6**
- App public-API dependency: `ponzey717/ecommpilot` PR **#93**

This runbook is for validation only.

Do **not**:

- merge either PR;
- deploy production;
- switch DNS;
- run a production migration;
- write to eBay;
- place AliExpress orders;
- expose browser sessions/cookies;
- dispatch GitHub Actions unless separately approved.

## 1. Record exact heads first

Before any validation, record:

- PR #93 exact head SHA;
- PR #6 exact head SHA;
- current base SHA of `feature/inventory-engine-v1`;
- current `main` SHA of `ecommpilot-main`.

If either head changes during validation, the validation result is no longer final for the new head.

## 2. Validate app dependency PR #93 first

Repository:

`ponzey717/ecommpilot`

Branch:

`feature/ep10-public-catalog-sort-v1`

Expected scope:

- `apps/web/src/app/api/public/products/route.ts`
- `apps/web/src/lib/public-winning-products-v1.test.mjs`

The PR should remain narrowly scoped.

### 2.1 Clean checkout/worktree

Use a clean isolated checkout/worktree.

Before running commands:

```bash
git status --short
git rev-parse HEAD
git diff --stat feature/inventory-engine-v1...HEAD
```

Do not discard unrelated local work.

### 2.2 Focused unit validation

Run:

```bash
npm run test:public-catalog
```

Must prove:

- all five public sort values remain allowlisted;
- `most_sold` orders by per-product 30-day SOLD evidence;
- deterministic tie-breakers remain;
- title/summary search stays parameterized;
- public search max length is 100 characters;
- non-published sort + cursor fails closed;
- public route remains read-only;
- public projection privacy tests still pass.

### 2.3 Disposable PostgreSQL validation

Run:

```bash
npm run test:public-catalog:postgres
```

The harness must use its temporary local PostgreSQL cluster.

It must:

- initialize a disposable local cluster;
- point `DATABASE_URL` / `TEST_DATABASE_URL` to localhost;
- apply migrations only there;
- run the public catalog PostgreSQL suite;
- run public migration verification;
- stop PostgreSQL;
- remove the temporary data directory.

Do not substitute a production/staging database URL.

### 2.4 Relevant regressions

Run at minimum:

```bash
npm run test:member-marketplace
npm run test:product-watcher
npm run test:ui
npm run typecheck
```

If the current integration branch has a dedicated What's Trending test script at validation time, run it too.

### 2.5 Safe app build

**Do not run the top-level `npm run build` for validation.**

In this repository the top-level build command runs `db:migrate` before the web build.

Use:

```bash
npm --workspace apps/web run build
npm run check:hostinger-runtime
```

If any required build-time environment is missing, report it. Do not point the build at production merely to make it pass.

### 2.6 App dependency audit

Run a reviewed dependency audit such as:

```bash
npm audit --audit-level=high
```

Record findings.

Do not run:

```bash
npm audit fix --force
```

### 2.7 PR #93 exit gate

Report:

- exact SHA;
- changed files;
- unit pass count;
- PostgreSQL pass count;
- regression results;
- typecheck result;
- web build result;
- Hostinger runtime check result;
- audit result;
- clean worktree status.

Do not merge.

## 3. Validate public website PR #6 second

Repository:

`ponzey717/ecommpilot-main`

Branch:

`feature/ep10-public-site-v1`

### 3.1 Clean checkout/worktree

Before validation:

```bash
git status --short
git rev-parse HEAD
git diff --stat main...HEAD
```

Do not discard unrelated local changes.

### 3.2 Install and static checks

Node version must satisfy:

```text
22.x
```

Run:

```bash
npm ci
npm test
npm run lint
```

Then run a reviewed dependency audit:

```bash
npm audit --audit-level=high
```

Record findings; do not auto-force fixes.

### 3.3 Local public API integration environment

Prefer an approved local app instance containing the validated PR #93 behavior.

Example:

```text
ECOMMPILOT_API_BASE_URL=http://127.0.0.1:<app-port>
ECOMMPILOT_PUBLIC_IMAGE_HOSTS=<approved local/test media hostnames>
ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false
```

Do not add an app bearer token.

Do not add DB/service-role credentials to the public website.

### 3.4 Production build

Run:

```bash
npm run build
```

The build must pass with:

- TypeScript;
- Next.js route generation;
- sitemap/robots metadata routes;
- remote image configuration;
- redirects.

Start the built app:

```bash
npm start
```

Use an available local port if 3000 is occupied.

### 3.5 Required browser checks

Test desktop, tablet and approximately 390px mobile.

Pages:

- `/`
- `/winning-products`
- `/winning-products/us`
- `/winning-products/uk`
- `/winning-products/au`
- at least one real category page when data exists;
- at least one real product page when data exists;
- `/whats-trending`
- `/markets`
- `/categories`
- `/free-tools`
- all three free tools;
- `/learn`
- `/pricing`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/data-deletion`;
- a guaranteed 404 path.

### 3.6 Winning Products checks

Verify:

- US/UK/AU market routing;
- category is marketplace-specific;
- changing market clears an invalid category;
- search max is 100 characters;
- supplier filter supports AliExpress V1;
- profit bands;
- 30-day SOLD thresholds;
- delivery thresholds;
- freshness filters;
- Recently published sort;
- Most sold · 30d sort;
- Highest profit sort;
- Freshest evidence sort;
- Fastest delivery sort;
- published-order pagination preserves active filters;
- non-published sorts do not show an invalid continuation cursor.

Confirm active listings are shown only as active-listing context, never as SOLD evidence.

### 3.7 What's Trending checks

Verify:

**Market → Category → Filters → Search**

Confirm:

- demand ranking is `most_sold`;
- 30-day SOLD is the demand basis;
- no hidden trend score;
- no second database;
- category changes remain marketplace-valid;
- category API outage is visually distinct from no matching products.

### 3.8 Outage / empty / 404 checks

Test three different states:

1. API unavailable;
2. API available with zero matching products;
3. real missing product/category.

The site must not confuse these.

Expected:

- API outage → temporary-unavailable state;
- empty query → no matching published products;
- true missing product/category → 404/noindex path.

No demo/fake product fallback may appear.

### 3.9 Product privacy checks

Inspect browser HTML/network payloads.

Public pages must not expose:

- exact AliExpress URL;
- supplier store URL;
- private supplier external IDs;
- variant IDs;
- quote IDs;
- product-candidate/workspace IDs;
- raw provider payloads;
- item/freight private sourcing cost fields.

Safe public fields may include:

- SOLD evidence;
- active listings;
- target price;
- net profit/margin/ROI;
- safe supplier provider;
- rating/orders;
- delivery;
- Choice/in-stock state;
- freshness.

### 3.10 Product image checks

Confirm a real published product with an approved `hosted_url`.

Verify its hostname is present in:

`ECOMMPILOT_PUBLIC_IMAGE_HOSTS`

Confirm:

- approved image renders;
- unapproved arbitrary HTTPS host does not render as a public product image;
- local fallback artwork/state remains clean;
- no supplier source image is hotlinked merely because it is HTTPS.

### 3.11 Free tool checks

Profit calculator:

- USD / GBP / AUD;
- fee rate starts empty;
- marketplace fee / profit / margin / ROI remain unavailable until fee rate is entered;
- mandatory fixed fee input works;
- optional ad/promoted spend is disclosed as excluded.

Fee estimator:

- USD / GBP / AUD;
- rate starts empty;
- result stays unavailable until the rate is supplied;
- fixed fee works.

Title checker:

- 80-character count;
- over-limit state;
- no ranking guarantee claim.

### 3.12 Accessibility smoke

Keyboard-only:

- skip link appears on focus;
- navigation is reachable;
- mobile disclosure is operable;
- visible focus states;
- select/input/button controls reachable;
- product cards/CTAs reachable.

Also verify:

- meaningful headings;
- image alt fallback;
- reduced-motion preference;
- no obvious horizontal overflow at 390px.

### 3.13 Legal continuity

Confirm public pages contain the current full policy version:

**Last updated: 14 September 2026**

Verify key policy sections on:

- `/privacy`
- `/terms`
- `/data-deletion`

Do not shorten these policies during validation fixes.

### 3.14 SEO while local/staging

With:

```text
ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false
```

confirm:

- page metadata is noindex;
- `/robots.txt` disallows `/`;
- no staging indexing is enabled.

Inspect:

- canonical URLs;
- Open Graph/Twitter;
- Organization/WebSite schema;
- breadcrumbs;
- free-tool SoftwareApplication schema;
- `/sitemap.xml`.

### 3.15 Legacy redirect checks

Verify permanent redirects:

- `/wp-sitemap.xml` → `/sitemap.xml`
- `/wp-sitemap-posts-page-1.xml` → `/sitemap.xml`
- `/wp-sitemap-users-1.xml` → `/sitemap.xml`
- `/author/amzee459/` → `/about`

Verify `/data-deletion/` resolves to the preserved policy route.

### 3.16 Public repo exit gate

Report:

- exact PR #6 SHA;
- exact PR #93 dependency SHA used;
- `npm test` result/count;
- lint result;
- build result;
- dependency audit result;
- desktop/tablet/mobile result;
- accessibility result;
- real public API integration result;
- image-host result;
- redirect result;
- SEO noindex staging result;
- clean worktree status.

Do not merge or deploy.

## 4. Production actions remain separate

Even if every validation passes, stop before:

- marking the PRs ready/merging unless explicitly approved;
- Hostinger production deployment;
- DNS switch;
- enabling production indexing;
- enabling self-registration;
- Search Console submission;
- payment setup.

Those are separate owner-approved release actions.
