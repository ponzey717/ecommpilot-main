# eCommPilot Public Website

Public acquisition and Winning Products website for **eCommPilot — Winning Products for eBay Dropshippers**.

## Platform split

Public website:

- domain: `ecommpilot.net`
- repository: `ponzey717/ecommpilot-main`

Authenticated member/admin application:

- domain: `app.ecommpilot.net`
- repository: `ponzey717/ecommpilot`

The public website never connects directly to operational database tables. It consumes only the anonymous, allowlisted `public-v1` catalog API exposed by the app.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Node.js 22
- ESLint

## Current delivery state

EP-10 Public Website V1 is implemented on:

`feature/ep10-public-site-v1`

Draft PR:

`#6 — EP-10: Public Website V1`

The public sort/search API dependency is isolated in the app repository:

`#93 — EP-10 API: Public catalog sort and search`

Neither Draft PR authorizes production deployment.

## Implemented public surfaces

- locked product-first homepage
- Winning Products catalog
- US / UK / AU market pages
- market-specific category pages
- public product detail
- What's Trending
- Free eBay Tools
- Learn
- Pricing
- About
- Contact
- Privacy Policy
- Terms of Use
- Data Deletion
- dynamic sitemap / robots / metadata
- legacy WordPress URL preservation

## Local development

Install dependencies:

```bash
npm ci
```

Create local environment configuration from `.env.example`.

For public catalog integration, point to an approved local/staging app:

```text
ECOMMPILOT_API_BASE_URL=http://127.0.0.1:<app-port>
ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false
```

Start development:

```bash
npm run dev
```

Open:

`http://localhost:3000`

## Validation

Before any merge/release, validate the exact feature-branch head:

```bash
npm test
npm run lint
npm run build
```

Also verify responsive layouts, keyboard navigation, public API integration, legacy redirects, robots/sitemap metadata and approved image hosting.

Do not use `npm audit fix --force` without reviewing the dependency impact.

## Public production environment

At production launch the core server-side settings include:

```text
ECOMMPILOT_API_BASE_URL=https://app.ecommpilot.net
ECOMMPILOT_PUBLIC_IMAGE_HOSTS=<approved media/storage hostnames>
ECOMMPILOT_PUBLIC_INDEXING_ENABLED=true
```

Keep `ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false` throughout local/staging QA.

See `docs/ENVIRONMENT.md` and `docs/MANUAL_ACTIONS.md` for the complete launch controls.

## Architecture and build docs

- [Agent instructions](./AGENTS.md)
- [Platform architecture](./docs/ARCHITECTURE.md)
- [Public API contract](./docs/PUBLIC_API_CONTRACT.md)
- [Implementation status](./docs/IMPLEMENTATION_STATUS.md)
- [SEO architecture](./docs/SEO_ARCHITECTURE.md)
- [Brand implementation](./docs/BRAND_IMPLEMENTATION.md)
- [Manual actions](./docs/MANUAL_ACTIONS.md)
- [Environment configuration](./docs/ENVIRONMENT.md)
- [Hostinger deployment runbook](./docs/HOSTINGER_DEPLOYMENT.md)
- [EP-10 exact-head validation runbook](./docs/EP10_EXACT_HEAD_VALIDATION_RUNBOOK_2026-10-09.md)
- [Legacy WordPress redirects](./docs/LEGACY_WORDPRESS_REDIRECTS_2026-10-09.md)
