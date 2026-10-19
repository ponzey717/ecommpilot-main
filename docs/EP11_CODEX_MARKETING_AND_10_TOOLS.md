# EP-11 — Codex build-ready foundation: marketing site + 10 free eBay tools

Status: APPROVED DIRECTION / IMPLEMENTATION HANDOFF (12 October 2026)
Owner decision: ecommpilot.net is FIRST a high-conversion marketing website, with Winning Products as its flagship feature and TEN genuinely free eBay seller tools as an organic-search acquisition engine.
Implementing agent: Codex. This document is the new EP-11 scope; retain prior EP-10 security/SEO/architecture locks unless explicitly superseded below.

## 1. Repo and architecture — REUSE, do not rebuild

- Public website: ecommpilot.net, repo ponzey717/ecommpilot-main (this repo).
- Member/Admin/research system: app.ecommpilot.net, repo ponzey717/ecommpilot.
- Current main branch already contains merged EP-10 Public Website V1 (merge eff755ff9f2606667b70802bc9ed75ade16ca70a). Audit real code first.
- Existing stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node 22.
- Public site consumes only the anonymous allowlisted app public-v1 API. No access to operational DB, app cookies, bearer token or private research/supplier data.
- Preserve old WordPress domain, privacy/terms/data-deletion URLs, redirects, staging noindex and Hostinger runbook until approved production cutover.
- App API is a dependency, not something to duplicate in the public website. Public catalogue must not be faked when there are no published products.
- IMPORTANT: this brief DOES NOT authorize merge, production deployment, DNS, payments, analytics, app migration, public self-registration or eBay publishing.

## 2. Product and conversion positioning

Primary offering: "Winning Products for eBay Dropshippers".
Keep locked homepage headline: "Stop Searching. Start Listing Winning eBay Products."
Supporting direction: researched eBay opportunities with real SOLD evidence, supplier/economics context, and member workflows (subject to verified available data/access).
Audience and initial markets: eBay US, UK and AU; keep market-specific fee/category treatment.
Marketing emphasis: benefits, clear steps, compelling real product preview, trust, tools-to-membership conversions. Not a seller operations dashboard on the public homepage.

New approved PRIMARY NAV (supersedes EP-10 nav order):
Winning Products | Free Tools | How It Works | Pricing | Learn | Login | Get Started Free.
"What's Trending" must remain discoverable beneath Winning Products, internal linking or catalog navigation; do NOT delete the route.
If the app's public registration is closed or password recovery is unverified, do not pretend that "Get Started Free" works; show a truthful non-deceptive account availability state/alternative, and do not silently enable registration.

Homepage sequence target:
1. Navy/blue hero with approved cart-arrow logo and clear browse/get-started actions.
2. Short "why eBay sellers use eCommPilot" problems and solutions.
3. Winning Products flagship preview using ONLY real current published API data; honest empty/unavailable state if none.
4. 3–4-step "How It Works" with single and bulk selection clarity.
5. Dedicated high-visibility Free eBay Tools showcase; link to the tools hub.
6. Supplier/product detail and Product Watcher differentiators, factual and access-aware.
7. US / UK / AU relevance, qualified market/education links.
8. Pricing / Free–Pro–Premium comparison with no invented commercial prices or limits.
9. Trust/legal links and final conversion section.

Brand: approved original shopping-cart + up-arrow eCommPilot assets, NOT an "eC" placeholder. Theme Studio direction = Marketplace Hybrid layout + Energetic Blue/Cyan (#071A3D, #146CFF, #16D9E3, #5CEBFF, #0B3BA7); Manrope headings, Inter body; navy hero, light clean product/card sections, minimal gratuitous gradients.
Reference: https://ecommpilot-theme-studio.ponzey717.chatgpt.site/

## 2A. MANDATORY VISUAL DESIGN HANDOFF — design is not discretionary

Codex MUST inspect both (1) the actual existing pages in this repository and (2) the owner-approved visual reference before rebuilding shared components. A written colour palette is NOT adequate visual QA. Source priority:
1. Owner-provided original logo and approved Theme Studio reference (visual truth): https://ecommpilot-theme-studio.ponzey717.chatgpt.site/ (especially its Marketplace Hybrid and Energetic Blue/Cyan directions, including #plans-a if still available).
2. docs/THEME_STUDIO_REVIEW.md (04 October 2026 owner-approved combination) and docs/BRAND_IMPLEMENTATION.md.
3. Existing public-site components and design tokens, preserving semantics/functioning routes.
4. This EP-11 marketing-first IA/UX brief where it explicitly changes the EP-10 homepage and primary navigation.

CONFIRMED PRESENT in this public repo:
- public/brand/ecommpilot-logo.svg — horizontal mark/wordmark.
- public/brand/ecommpilot-logo-light.svg — logo intended for dark backgrounds.
- public/brand/ecommpilot-mark.svg — icon-only mark.
- src/components/site/logo.tsx — actual asset chooser for header.
- src/app/globals.css — existing palette, headings, hero, cards, responsiveness.
- src/components/site/header.tsx, src/app/page.tsx, src/app/free-tools/page.tsx — existing page/component foundation.

ALSO PRESENT IN THE SEPARATE APP REPO (inspect for original-logo fidelity only, do not hotlink across deployments):
- ponzey717/ecommpilot: apps/web/public/brand/ecommpilot-logo.png
- ponzey717/ecommpilot: apps/web/public/brand/ecommpilot-icon.png
- ponzey717/ecommpilot: apps/web/public/brand/ecommpilot-square.png

WARNING: SVG/PNG filenames DO NOT by themselves prove pixel-perfect identity to the owner's original uploaded logo artwork. Visually compare shape, gradient, cart/up-arrow, typography and proportions against the owner's approved graphics before final branding acceptance. Do NOT redraw, substitute a placeholder, use an "eC" monogram, or invent a new logo. If the Theme Studio is inaccessible in the available browser, or fidelity to the original artwork cannot be verified, report that explicitly and request/reuse the actual approved design screenshots/assets rather than claiming visual parity. The tool/page build may continue, but "branding visually approved" must stay an OPEN acceptance gate.

DESIGN PAGE BLUEPRINT (Codex implements; this file is not a replacement for inspecting the visuals):
- Global header: original full horizontal logo; desktop links Winning Products, Free Tools, How It Works, Pricing, Learn; Login text and standout Get Started Free CTA; mobile collapse into accessible drawer. Header legible on dark hero/light sections.
- Homepage: striking dark navy hero; strong readable headline and concise promise on left, contextual REAL product/platform visual at right if data exists; bright blue/cyan primary actions. Then short benefit cards, real Winning Products product-card grid, simple 3–4 step process, prominent free-tool showcase, seller workflow/monitoring features, honest pricing, final CTA. Avoid 10 consecutive nearly identical cards or dashboard-like walls of statistics.
- Winning Products/market/category: white/light product-discovery canvas, simple search/filter toolbar, photo-led cards, prominent verified 30-day SOLD/price/profit/delivery/freshness, market/category labels, responsive grids; selection/member CTA goes to existing app workflow; no private supplier URL.
- Public product detail: image gallery, unambiguous evidence-backed sales/economics hierarchy, supplier metadata allowed publicly, freshness and limits, clear action to continue as Member. NO invented values or unapproved images.
- Free Tools hub: showcase exactly the working tools with a clear searchable/browsable topic grouping (Profit & Fees; Pricing & Offers; Shipping; Demand; Listings & Images), consistent iconography, one-card-one-benefit-one-CTA. Do not link or index incomplete tools.
- Individual free-tool page: benefit-forward H1, calculator/utility ABOVE long-form article copy, responsive two-column input/results layout on desktop and single column on mobile, visible instant output, explanations/examples, related-tool links, discreet Winning Products CTA. No login wall.
- How It Works + Learn: editorial clean layouts, practical illustrations/screenshots only where grounded, clear navigation and useful original copy rather than hype.
- Pricing: simple Free / Pro / Premium comparison, accurate feature/access disclosures, no fake prices/usage limits, distinguish unavailable payments/signups from active capabilities.
- Trust/legal: readable typography and stable legacy routing; do not modify legal substance.

MANDATORY QUALITY GATES:
A. Inspect the Theme Studio in a real browser, record the chosen hybrid direction, and compare desktop homepage/header/product-card composition; if inaccessible record this as blocked.
B. Verify actual rendered original logo and no broken image/network responses on ALL layouts.
C. Take/check desktop (1440px), tablet (~768px), mobile (390px) screenshots of homepage, Winning Products, tools hub and at least one complete tool; avoid overflow/cropped controls.
D. Inspect keyboard navigation, readable contrast/focus, clear UI text, consistent icons/spacing, meaningful hover/empty/error states.
E. Mark page templates "visually reviewed" only after seeing actual rendering, NEVER solely because npm test/build passes. Do not deploy without owner approval.

## 3. TEN free tools — exact initial inventory and canonical URLs

Build each as a fast useful standalone utility with NO login, NO payment, NO usage cap, NO external API requirement for the arithmetic. Do not make fake ranking/SEO claims.

| # | Tool | Canonical public route | Current state |
|---|---|---|---|
| 1 | eBay Fee Calculator (existing display: "eBay Fee Estimator") | /free-tools/ebay-fee-estimator | ALREADY IMPLEMENTED; audit/improve, preserve slug |
| 2 | eBay Profit Calculator (existing display: "Profit Margin Calculator") | /free-tools/profit-margin-calculator | ALREADY IMPLEMENTED; audit/improve, preserve slug |
| 3 | eBay Title Character Counter (existing display: "Title Length Checker") | /free-tools/title-length-checker | ALREADY IMPLEMENTED; audit/improve, preserve slug |
| 4 | eBay Break-Even Price Calculator | /free-tools/ebay-break-even-calculator | NEW |
| 5 | eBay Promoted Listings Profit Calculator | /free-tools/ebay-promoted-listings-calculator | NEW |
| 6 | eBay Best Offer Calculator | /free-tools/ebay-best-offer-calculator | NEW |
| 7 | eBay Shipping Profit Calculator | /free-tools/ebay-shipping-profit-calculator | NEW |
| 8 | eBay Sell-Through Rate Calculator | /free-tools/ebay-sell-through-rate-calculator | NEW |
| 9 | eBay Image Resizer & Compressor | /free-tools/ebay-image-resizer | NEW |
| 10 | eBay HTML Description Cleaner | /free-tools/ebay-html-description-cleaner | NEW |

Existing current code and tests:
- src/app/free-tools/page.tsx
- src/app/free-tools/ebay-fee-estimator/page.tsx
- src/app/free-tools/profit-margin-calculator/page.tsx
- src/app/free-tools/title-length-checker/page.tsx
- src/components/tools/calculators.tsx (audit actual exports before refactoring).
- src/components/site/header.tsx for primary navigation.
- src/config/routes.ts for internal route source of truth.

Build a typed centralized registry for each tool (slug, title, summary, status, purpose, topic/market, internal links), reused by the hub and relevant homepage preview. Render/link only implemented and tested tools. Never publish crawlable placeholder/coming-soon URLs or include them in the sitemap.

## 4. Calculator and utility correctness

Shared for arithmetic tools: explicit currency selection for USD/GBP/AUD, appropriate locale formatting, usable keyboard/mobile controls, client-side instant calculation, clear units and negative/zero handling, copy/share results when practical. Input validation must avoid NaN/Infinity, currency mixing, negative costs where invalid, division-by-zero, inaccurate rounding. Use consistent displayed formulas and disclose assumptions. For fee-based tools, choose market/category/seller settings only when data is actually accurate and verifiably maintained; OTHERWISE request an editable rate/flat charge and clearly say "estimate" instead of claiming to reproduce eBay's official charges.

4) Break-even: user enters item cost, inbound/freight cost, seller shipping, tax, percentage fee, fixed fee and optional overhead. Solve for the minimum gross sale price where net profit >= 0. Reject fee rates >=100% and impossible solutions; explain fee base, included shipping and rounding.

5) Promoted Listings: user-entered selling price, supplier/fulfilment costs, base selling fees and optional ad percentage/cost. Show profit before vs after advertising and break-even ad spend. Clearly note ad fees, attribution and fee bases can vary by ad product/market; do not claim campaign forecasts.

6) Best Offer: list price, proposed offer, shipping charged, landed costs, fees. Show net profit / margin / discount percentage and maximum safe discount for the stated target-profit rule. Don't imply automatic buyer-offer acceptance.

7) Shipping: compare "free shipping" vs "buyer-paid shipping" with input postage costs and marketplace fee applied to each relevant amount as configured. Show order-level net profit and margin, not only postage difference.

8) Sell-through: user manually enters sold count (time window explicit) and active listings count; show ratio with clearly labelled chosen formula (e.g., sold/(sold+active) where appropriate). Never infer sold history from active listing counts; no unsupported market live-data promise.

9) Image: browser-local uploads only, resize/compress image dimensions, preserve aspect ratio, provide target dimensions/file format/quality and preview before download. Avoid unnecessary server upload/storage; note metadata/transparency/format changes honestly; safely revoke blob URLs and cap huge files.

10) HTML cleaner: use a vetted allowlist-based HTML sanitizer; remove script, forms, unsafe attributes, event handlers, dangerous URLs, remote iframes, tracking/embed code. Display before/after and copy sanitized markup; no raw unsanitized HTML execution or dangerous preview. Avoid misleading claim of universal eBay compliance.

All ten tools: content should include actual interactive function, a concise how-to, formula/method where relevant, examples, limitations, related internal tool links and context to Winning Products without forcing a signup.

## 5. SEO and content delivery contract

- Each released tool gets one useful indexable canonical route, unique title/meta/H1, original helpful copy, accessible UI, breadcrumbs, responsible structured data (only actual visible supported content), inclusion in sitemap only when ready, and internal links.
- No thin city/country/category clones, no mass-generated pseudo articles, no fake SEO traffic/ranking testimonials, no invented "official eBay" partnership.
- Keyword research and SERP/competitor validation BEFORE final keyword titles; capture search intent, realistic competition and relevant geography in a short decision table. Do not represent guessed volumes as verified search volumes.
- Build a topic cluster: Seller Fees & Profit; Pricing & Offers; Shipping; Product Demand; Listings & Images. Learn hub should link to useful calculators, and each calculator to relevant guides and Winning Products.
- Content and tool output must work without accounts. Prefer browser-local processing for text/images.
- Preserve existing canonical, robots/noindex staging controls, Web Vitals, old WordPress redirect behavior and legal policies.
- Ensure public product snapshots (when zero approved products exist) are honest, not demo SOLD/profit records.

## 6. Codex execution phases

PHASE A — Audit existing repo at exact main SHA. Catalogue routes, existing 3 tools, navigation, tests, metadata, Hostinger readiness and app public-v1 contract. Avoid duplicate components. Record gaps briefly.
PHASE B — Build shared tools registry, landing hub, navigation promotion and homepage marketing layout to approved theme. Do not link unimplemented tools; ensure 390px mobile works.
PHASE C — Improve and validate 3 existing tools and ship seven new tools in small topic-based PRs with independent test fixtures and SEO copy. No new GitHub Actions run just for formatting-only commits.
PHASE D — Site-wide technical SEO + accessibility + performance + internal linking, noindex-to-index gate reviewed on staging.
PHASE E — Staging integration and real browser end-to-end: tools, public catalog, registered CTA behavior, legal/redirects, mobile; report problems and fix before production.
PHASE F — Launch proposal including exact SHA, Hostinger staging evidence, production env checklist, rollback plan and OWNER APPROVAL. No unapproved deployment.

Acceptance gates: npm ci; npm test; npm run lint; npm run build; TypeScript; independently verified calculation fixtures including edge cases; keyboard/mobile; responsive visual checks; accessibility (labels, focus, contrast); metadata/sitemap/robots; 404/no placeholders; no private data; links work; safe input/HTML/image handling; app API unavailable vs truly empty distinct; no misleading member-registration CTA.

## 7. Operational rules and Codex budget

- Preserve existing separately deployed production WordPress website until staging succeeds and owner approves cutover.
- Do NOT merge or deploy unapproved work; use feature branches and reviewable PRs.
- GitHub Actions free-minutes budget is shared with other projects (~2,000 minutes monthly per owner); conserve CI. Batch work logically; run tests locally first, then one exact-head CI per meaningful PR and once after release merge as needed. No repeated empty/retry loops.
- Do not change Supabase, live app, payments, eBay credentials, DNS, robots indexing, analytics or member self-registration while implementing marketing/tools without a separate approval.
- Avoid writing passwords/secrets to repository or logs; do not insert actual paid plan prices without owner approval.
- Existing docs AGENTS.md, docs/ARCHITECTURE.md, docs/SEO_ARCHITECTURE.md, docs/BRAND_IMPLEMENTATION.md, docs/HOSTINGER_DEPLOYMENT.md remain binding except where this EP-11 owner-approved product direction clearly supersedes older navigation/tool-count scope.

## 8. Copy-paste Codex starting instruction

Work in repository ponzey717/ecommpilot-main. Read docs/EP11_CODEX_MARKETING_AND_10_TOOLS.md FIRST, then AGENTS.md, docs/ARCHITECTURE.md, docs/SEO_ARCHITECTURE.md, docs/BRAND_IMPLEMENTATION.md and existing tool code. EP-10 V1 is already implemented and merged — do not rebuild. Deliver EP-11 marketing-first website and the ten free tools incrementally with local tests and minimal GitHub Actions consumption. Begin with an exact-code audit and the shared tool registry/marketing nav, then develop remaining seven tools, improve current three and connect meaningful SEO pages. Only working tools become publicly linked/indexed. Keep public catalog truthful, protect the app API boundary and retain staging noindex. Make changes on your own reviewed feature branch, submit PRs, DO NOT deploy/switch production without owner approval. Report exact SHA, files, test evidence and unresolved blockers.
