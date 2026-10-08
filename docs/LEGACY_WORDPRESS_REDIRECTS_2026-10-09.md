# Legacy WordPress URL Preservation Audit — 09 Oct 2026

## Purpose

Preserve the small existing `ecommpilot.net` URL footprint when the current WordPress site is eventually replaced by the Next.js public website.

This audit was taken from the live production website and its WordPress sitemap before any production switch.

## Live sitemap footprint observed

The live WordPress sitemap exposed:

- `/`
- `/privacy/`
- `/terms/`
- `/data-deletion/`
- `/author/amzee459/`

The live sitemap endpoints were:

- `/wp-sitemap.xml`
- `/wp-sitemap-posts-page-1.xml`
- `/wp-sitemap-users-1.xml`

The public root `/sitemap.xml` currently redirects to the WordPress sitemap index.

## Replacement mapping

| Existing URL | Replacement behavior |
| --- | --- |
| `/` | Keep `/` |
| `/privacy/` | Keep as `/privacy` |
| `/terms/` | Keep as `/terms` |
| `/data-deletion/` | Keep as `/data-deletion` |
| `/author/amzee459/` | Permanent redirect to `/about` |
| `/wp-sitemap.xml` | Permanent redirect to `/sitemap.xml` |
| `/wp-sitemap-posts-page-1.xml` | Permanent redirect to `/sitemap.xml` |
| `/wp-sitemap-users-1.xml` | Permanent redirect to `/sitemap.xml` |

## Notes

- Do not create a replacement author archive solely to preserve WordPress structure; there are no article URLs in the observed live sitemap.
- The new `/data-deletion` page preserves the legacy public URL and links to the current operational policy on `app.ecommpilot.net/data-deletion`.
- Before production DNS/domain cutover, re-fetch the live sitemap one final time. If WordPress content changes between this audit and launch, update this map before switching.
- After launch, verify the redirects with real HTTP requests and confirm Search Console sees the new `/sitemap.xml`.
