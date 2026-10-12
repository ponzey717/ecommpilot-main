# EP-11 implementation and validation notes

Updated 13 October 2026. This branch begins at `028d25072bcbfeb930ef41ad8449d28bd2a60b08` (EP-11 foundation, based on `eff755ff9f2606667b70802bc9ed75ade16ca70a` main).

## Reused public foundations

The public-v1 server adapter, Winning Products catalogue and detail routes, filters, markets, legal pages, legacy redirects, metadata/robots/sitemap machinery, and Free/Pro/Premium plan structure remain in place. The public site does not query app operational tables or receive member credentials.

## EP-11 changes

- Marketing navigation, prominent ten-tool showcase, market links and a grouped tools hub.
- Ten functional free tools at the canonical routes in the EP-11 brief. The original three routes are retained and improved; seven routes are generated from a typed shared registry.
- Shared arithmetic and topic content. Percent fee inputs remain editable, and calculation pages disclose their fee bases and limits.
- Browser-local image processing with format, size and dimension limits; allowlist HTML cleaning with a sandboxed preview.
- `/get-started` explains the current account availability gate and links existing members to the separate app. Public tools and catalogue remain open without registration.
- Original approved logo and icon PNGs copied from `ponzey717/ecommpilot/apps/web/public/brand/`, with the original icon converted to a 256px favicon. The horizontal PNG is SHA-256 `51e090caeede85f8a70e188b5337cc32d42b411a01ab8891babec72420760a89` and matches the app asset byte for byte. The older public SVG has visibly different geometry and is no longer rendered.

## Local checks

The reproducible browser smoke script is `scripts/ep11-visual-qa.mjs`. It checks the homepage, Winning Products, tools hub, pricing and Learn at 1440px, 768px and 390px, and all ten tools at 390px. It also checks horizontal overflow, page errors, mobile navigation, break-even output, client-side image export and HTML sanitization. Screenshots are written outside the repository to `/tmp/ecommpilot-ep11-qa`.

Local and staging indexing remains disabled by default. The public API at `https://app.ecommpilot.net/api/public/products?limit=1` returned HTTP 200 with a valid `public-v1` empty catalogue on 13 October 2026. The public site showed the honest empty state when connected to that API. An unknown product URL returned 404. No real published product detail was available for visual review.

The Theme Studio URL could not be opened with the available browser tool. Direct comparison with that design reference remains open even though the approved theme documentation and original app logo assets were inspected. Hostinger staging and production were not deployed by this branch. A staging browser pass with the intended hostname and media allowlist remains a launch gate.

`npm audit --omit=dev` reported no production dependency vulnerabilities. The full audit reports five high severity findings through the existing Next ESLint dev dependency chain (`braces`/`micromatch`/`fast-glob`). No forced or broad dependency upgrade was applied.
