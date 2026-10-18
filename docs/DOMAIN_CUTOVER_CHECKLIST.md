# ecommpilot.net cutover review checklist

Do not execute until owner approval. Checked against the local repository on 2026-10-18; live hosting state has not been verified.

- [x] Public canonical base resolves to `https://ecommpilot.net` through the site configuration and environment defaults. Verify the deployed staging override.
- [x] App URL remains `https://app.ecommpilot.net`.
- [x] Sitemap and robots use the public site base URL.
- [x] `ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false` disables indexing in metadata and robots. Verify the deployed staging environment keeps this value; confirm the sitemap is not submitted for staging.
- [ ] Inventory current WordPress URLs and map exact 301 redirects; verify no redirect loops.
- [ ] Follow `docs/HOSTINGER_DEPLOYMENT.md`: verify staging environment, certificate, API connectivity, WordPress backup, redirect inventory and rollback path. Do not execute cutover without owner approval.
- [ ] Crawl preview for internal links, canonicals, sitemap and structured data.
- [ ] Confirm DNS and routing plan with owner; do not change live DNS here.
- [ ] Run a controlled cutover and post-cutover crawl only after explicit approval.
