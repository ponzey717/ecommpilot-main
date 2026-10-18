# eCommPilot growth-guide publishing foundation

Branch: `growth/content-foundation-20261018`. This is an editorial infrastructure PR based on `feature/ep11-public-site-implementation`, separate from Claude's unpushed audit fixes and Desktop/SaaS PR #123.

## Current behavior
- Draft guides are reachable for editorial preview at `/learn/<slug>`, but carry `noindex` and have no Article schema or sitemap entry.
- Publication requires `status: "published"`, a real `datePublished`, dated source checking, screenshot/editorial approval, and a deployed/verified release.
- The public site still remains globally noindexed behind the existing `ECOMMPILOT_PUBLIC_INDEXING_ENABLED` launch gate.
- Two evidence-backed sample drafts are present, not promoted to live articles: profit calculations and dropshipping sourcing/policy.

## Adding or updating a guide
1. Draft and approve text in Google Drive `ecommpilot Growth/03 Blog Editorial and Drafts` and track its keywords/intent in the mapped workbook.
2. Add a new unique entry to `src/content/growth-guides.ts`, with slug, title, description, region, content sections, real related-tool URLs and official sources. Keep `status: "draft"`.
3. Test `/learn/<slug>` in staging and verify human-readable formatting, policy claims and mobile view; add original cropped UI screenshots when approved.
4. Review editorial quality, dates, citations, internal links, accessibility, page metadata, duplicate target intent, structured data and privacy. Only then switch to `published` and set `datePublished`.
5. Add approved articles to the Learn hub; include only published articles in the sitemap; test canonical/indexing and 200 status. Create a PR, wait for CI and human approval, and then deploy.

## Required next implementation
- Add approval-driven listing of published guides in the Learn hub and auto-sitemap entries (no draft URLs).
- Turn long-form Drive drafts into approved page content with source review, original screenshots and independent fee tests.
- Add publishing workflow tests (status gate, unique slugs, metadata, internal links, no unsafe HTML).
- Add a secure editorial CMS only after owner selects its hosting, authentication and permissions. Do not add an unauthenticated writing API.

This PR intentionally does not merge Claude's fee fixes or enable public indexing.
