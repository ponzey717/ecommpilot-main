# Seller Academy live release evidence

Captured from `https://ecommpilot.net` on 2026-10-19 after the production release transaction.

The six PNG files cover the live library and published flagship at 1440, 390, and 360 CSS pixels. `qa.json` records the HTTP status, document title, H1, horizontal-overflow result, guest-header state, placeholder check, and browser console errors for each capture.

Release boundary verified during this run:

- the public editorial API returns exactly one article;
- the flagship page returns 200;
- a scheduled article and a private draft both return 404 through the app API and public website;
- the sitemap contains the flagship and excludes both private examples;
- all ten free-tool routes return 200;
- the live pages have no horizontal overflow at 360, 390, or 1440 pixels.

Authenticated account-panel and Editorial Desk evidence requires an owner to establish a real app session in the browser QA profile. Mock sessions are not represented as live evidence.
