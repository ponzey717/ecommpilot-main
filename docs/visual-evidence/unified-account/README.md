# Unified account panel visual QA

Captured from the local production build on 2026-10-19. The browser intercepted only the app's session-status and session-stats endpoints with labeled test identities and sample counts. These images show layout and interaction states; they are not evidence of live account data or a production release.

| Image | State | Viewport |
| --- | --- | --- |
| `guest-360.png` | Signed out | 360 × 844 |
| `free-390.png` | Free member; sample counts 12 / 4 / 2 | 390 × 844 |
| `pro-360-tool.png` | Pro member on a free calculator; sample counts 12 / 4 / 2 | 360 × 740 |
| `premium-1440.png` | Premium member; sample counts 12 / 4 / 2 | 1440 × 844 |
| `owner-390.png` | Owner with Editorial Desk access | 390 × 844 |

In the browser pass, each menu opened, Escape closed it, the owner link resolved to `https://app.ecommpilot.net/admin/editorial`, and no 360px or 390px page had horizontal overflow. Real account data requires the app and public-site releases plus authenticated production validation.
