# Local visual evidence — 2026-10-18

Chrome device emulation against the local Next.js dev server with `ECOMMPILOT_PUBLIC_INDEXING_ENABLED=false`.

- `learn-mobile.png`: 390px Learn hub.
- `fee-desktop.png` and `fee-mobile.png`: 1440px and 390px fee calculator.
- `article-preview-1440.png` and `article-preview-390.png`: article template captured with a **temporary local published-state simulation**. The source was restored to `review` immediately afterward and both draft article URLs returned 404. These images demonstrate layout only and are not evidence of owner approval or publication.

For the article preview, Chrome reported no horizontal overflow at 390px and 1440px. The mobile contents drawer opened with focus on the first link; Escape closed it and returned focus to the trigger. The fee page initially overflowed at 390px because the comparison table imposed a 500px grid minimum. The page grid was constrained and a repeated Chrome check reported viewport and document width both 390px.

The dev-only Next.js indicator appears in some captures. No real Seller Hub, AliExpress or authenticated application screenshot was available; the editorial requirement remains open.
