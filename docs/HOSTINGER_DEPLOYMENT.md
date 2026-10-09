# Hostinger Deployment — eCommPilot Public Website

**Applies to:** `ponzey717/ecommpilot-main`  
**Production domain:** `ecommpilot.net`  
**Status:** deployment runbook only — not production authorization

## 1. Deployment model

Use Hostinger **Node.js Web App / Next.js** hosting with the GitHub repository connected directly.

This public repository is a normal single-project Next.js app. It does **not** require the special standalone-runtime copy logic used by the separate eCommPilot app monorepo.

Current runtime lock:

```text
Node.js 22.x
Next.js 16.3.8
```

Package commands:

```text
Build: npm run build
Start: npm start
```

Hostinger should be allowed to detect **Next.js** automatically.

Do not force the framework type to `Other` unless automatic detection genuinely fails.

## 2. Stage before production

Keep the existing WordPress `ecommpilot.net` site live.

Deploy this repository first to a staging/test hostname.

During staging:

```text
ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false
```

The public app will then emit noindex/nofollow metadata and a robots policy that blocks crawlers.

Do not submit a staging sitemap to Search Console.

## 3. Required staging environment

Core settings:

```text
ECOMMPILOT_API_BASE_URL=https://app.ecommpilot.net
ECOMMPILOT_PUBLIC_IMAGE_HOSTS=<approved public media/storage hostnames>
ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false
```

Optional/launch-later settings:

```text
GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Never place in this public website:

- database credentials;
- Supabase service-role keys;
- member/operator cookies;
- app bearer tokens;
- eBay credentials;
- AliExpress credentials;
- browser session cookies.

## 4. GitHub connection

In Hostinger:

1. Websites → Add Website.
2. Choose **Deploy Web App**.
3. Choose **Import Git Repository**.
4. Authorize the GitHub account that can access `ponzey717/ecommpilot-main`.
5. Select this repository and the approved deployment branch.
6. Confirm framework detection says Next.js.
7. Confirm Node.js 22.x.
8. Confirm the build command is `npm run build`.
9. Use the normal Next.js start/runtime behavior. Do not invent a custom server file for this repo.

Hostinger's current Node.js Web App flow supports GitHub-connected Next.js deployments and rebuilds on redeploy.

## 5. Pre-staging code validation

Before Hostinger staging deployment, validate the exact PR head:

```bash
npm ci
npm test
npm run lint
npm run build
```

Also review:

- no unintended lockfile change;
- no uncommitted files;
- exact PR head SHA;
- dependency audit findings before applying any automated fix.

## 6. Staging QA

Verify at minimum:

### Pages

- `/`
- `/winning-products`
- `/winning-products/us`
- `/winning-products/uk`
- `/winning-products/au`
- `/whats-trending`
- `/markets`
- `/categories`
- `/free-tools`
- `/learn`
- `/pricing`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/data-deletion`

### Catalog

Verify:

- public API connection;
- empty vs unavailable states;
- market-specific categories;
- title search;
- AliExpress supplier filter;
- profit/SOLD/delivery/freshness filters;
- all public sort modes;
- published-order pagination;
- product detail;
- approved product images.

### Responsive/accessibility

Review:

- desktop;
- tablet;
- 390px mobile;
- keyboard-only navigation;
- skip link;
- focus visibility;
- mobile navigation;
- reduced-motion behavior;
- form labels and controls.

### SEO while staging

Confirm:

- pages emit noindex/nofollow;
- `/robots.txt` disallows `/`;
- canonical URLs point to the intended production URL;
- no staging hostname is accidentally indexed.

## 7. Legacy WordPress verification

Immediately before production cutover, re-fetch the live WordPress sitemap.

Current audited legacy mapping is recorded in:

`docs/LEGACY_WORDPRESS_REDIRECTS_2026-10-09.md`

At the 09 Oct 2026 audit the live site contained only:

- `/`
- `/privacy/`
- `/terms/`
- `/data-deletion/`
- `/author/amzee459/`

Do not assume this list is still complete at the later launch date. Re-check it.

On staging, verify the permanent redirects for:

- `/wp-sitemap.xml`
- `/wp-sitemap-posts-page-1.xml`
- `/wp-sitemap-users-1.xml`
- `/author/amzee459/`

## 8. Member registration dependency

Before the public **Get Started** CTA is treated as a working launch path:

1. verify the app's email/password recovery flow;
2. deliberately enable app self-registration;
3. create a new Free member account;
4. verify sign-in;
5. verify password recovery.

The relevant app setting is:

```text
MEMBER_SELF_REGISTRATION_ENABLED=true
```

Do not enable this in production merely to test the public website.

## 9. Production cutover

Production cutover requires a separate owner approval.

At the approved cutover:

1. confirm the exact public PR/release SHA;
2. confirm the app public API dependency is already deployed and verified;
3. confirm approved product-media hostnames;
4. confirm all legacy redirects;
5. confirm self-registration/recovery if Get Started is enabled;
6. set:

```text
ECOMMPILOT_PUBLIC_INDEXING_ENABLED=true
```

7. perform a **fresh build/redeploy**;
8. assign/switch `ecommpilot.net`;
9. verify HTTPS;
10. verify `robots.txt`;
11. verify `sitemap.xml`;
12. inspect representative canonical/meta/schema output;
13. submit/refresh the sitemap in Search Console only after the production checks pass.

## 10. Rollback rule

Do not delete the old WordPress site or its backup at cutover.

Keep a rollback path until:

- the new domain is stable;
- critical pages return correctly;
- public API calls are healthy;
- redirects are verified;
- indexing configuration is correct.

If production validation fails materially, restore the prior site/domain mapping rather than improvising fixes on the live release.

## 11. Current Hostinger references

Current Hostinger guidance used for this runbook:

- Node.js Web App deployment:
  `https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/`
- Next.js hosting:
  `https://www.hostinger.com/web-apps-hosting/nextjs-hosting`
- Node.js redeployment:
  `https://www.hostinger.com/support/how-to-redeploy-a-node-js-application/`

Re-check current Hostinger guidance at deployment time because the platform UI and supported runtime versions can change.
