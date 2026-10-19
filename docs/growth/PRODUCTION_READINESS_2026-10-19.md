# Public content release readiness — 2026-10-19

## Read-only production check

- `https://ecommpilot.net/` returned 200 with canonical `https://ecommpilot.net` and `index, follow` robots metadata.
- `robots.txt` allows public crawling, disallows `/api/`, and points to the sitemap.
- All ten `/free-tools/` URLs returned 200 with one H1, distinct titles and descriptions, path-matching canonicals and BreadcrumbList markup. The sitemap listed ten tool URLs and no flagship review guide URL.
- Both flagship `/learn/[slug]` URLs returned 404. This matches their committed `review` state.
- The four checked legacy tool pages and the homepage had canonical URLs matching their paths. A full Search Console coverage report was unavailable; HTTP and source checks do not prove Google indexing.
- Important conversion destinations `/get-started`, `/winning-products`, `/learn` and `https://app.ecommpilot.net/login` returned 200 in this read-only check. Calculator behavior is covered by the local test suite; no account or external action was triggered.
- Public HTML and response headers did not identify a deployed Git SHA. Production can therefore be compared by observable behavior, not an asserted commit or branch.

## Branch relationship

PR #12 targets `feature/ep11-public-site-implementation`. Its content branch adds editorial planning, ten tool-guidance sections, the Learn article framework and two gated manuscripts. Production already serves the ten tools, but the exact deployed source commit could not be identified. This continuation deepens only the two review manuscripts, corrects keyword-map statuses and prepares the next four briefs. No deploy, merge, DNS, Hostinger or Search Console change was made.

## SEO and content decisions

- Each of the ten tools has its own canonical URL and interactive intent in `KEYWORD_MASTER_MAP.csv`; calculations and transformations stay on tool pages. The two flagship guides own procedural research and supplier-verification questions.
- Three URLs previously marked `Existing` in the map have no implemented guide route: `/learn/evaluate-ebay-dropshipping-product`, `/learn/profit-margin-vs-roi`, and `/learn/why-standby-supplier-matters`. They are now `Proposed / Not started` in the map.
- The article route generates metadata, breadcrumbs and Article schema only after explicit publication; the sitemap selects only published guides. The current review drafts remain inaccessible on public routes.
- Search volume, keyword difficulty, rankings and indexed status remain unverified. No new figures were inferred.
- Genuine redacted Seller Hub and selected AliExpress-variant screenshots remain editorial blockers. The review captures in `docs/visual-evidence/flagship-review/` document layout only.

## Dependency advisory check

`npm audit --json` reported five high findings involving the development lint chain: direct `eslint-config-next` and transitive `@next/eslint-plugin-next`, `fast-glob`, `micromatch`, and `braces`. No critical finding was reported. npm's suggested automatic fix would downgrade `eslint-config-next` across a major version and was not applied. Review a compatible upstream fix separately before dependency changes.

## Recommended release sequence

1. Owner reviews the two manuscripts and provides permission-safe, redacted source screenshots; editor verifies marketplace and supplier facts against those captures.
2. Re-run the 63 tests, lint, build, route/metadata audit and 360/390/1440 visual review on the release candidate. Confirm source links and tool behavior in production-like staging.
3. Record owner publication approval and true publication dates; change only approved guides to `published`. Verify Article schema, canonical, robots and sitemap entries then appear for those routes.
4. Separately approve PR merge and production deployment. After release, inspect live routes and Search Console only with owner authorization.
