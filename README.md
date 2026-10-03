# eCommPilot Public Website

Public website for **eCommPilot — Winning Products for eBay Dropshippers**.

## Canonical responsibilities

This repository powers:

- `ecommpilot.net`
- public Winning Products catalog;
- market/category/product pages;
- free eBay tools;
- Learn/SEO content;
- pricing and acquisition pages;
- public SEO, schema, robots and sitemaps.

Authenticated member/admin/product operations belong to `app.ecommpilot.net`.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- ESLint

## Local development

```bash
npm install
npm run dev
```

Open:

`http://localhost:3000`

Quality checks:

```bash
npm run lint
npm run build
```

Do not run `npm audit fix --force` without reviewing dependency impact.

## Architecture and build docs

- [Agent instructions](./AGENTS.md)
- [Platform architecture](./docs/ARCHITECTURE.md)
- [Complete build plan](./docs/PLATFORM_BUILD_PLAN.md)
- [SEO architecture](./docs/SEO_ARCHITECTURE.md)
- [Brand implementation](./docs/BRAND_IMPLEMENTATION.md)
- [Manual actions](./docs/MANUAL_ACTIONS.md)
- [Environment configuration](./docs/ENVIRONMENT.md)

## Current phase

Phase 0: foundation and architecture.

The starter homepage remains intentionally unstyled until the Theme Studio visual direction is locked.
