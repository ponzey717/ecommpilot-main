> **CURRENT PLAN NOTICE — 2026-10-06**
> This document remains valid where consistent with `docs/ECOMMPILOT_PUBLIC_SITE_COMPLETION_LOCK_2026-10-06.md`. Public-site work starts from stable app publication contracts and has no dependency on deferred desktop/research-worker systems.

# Theme Studio Review

## Source

Reviewed the current eCommPilot Theme Studio prototype containing three visual directions using the same illustrative product, membership and research content.

The three directions are:

### A — Energetic Blue/Cyan

Theme statement:

> Clear blue. Fresh cyan. Built for momentum.

Strengths:

- strongest immediate connection to the approved logo;
- energetic and recognizably eCommPilot;
- works well for primary actions and growth/research cues;
- good fit for acquisition pages and hero moments.

Risk:

- can become visually busy if cyan/gradient treatment is applied to every card, badge and metric.

### B — Premium Navy/Blue

Theme statement:

> Deep navy. Measured contrast. Research with confidence.

Strengths:

- strongest SaaS/research credibility;
- likely to work well for long-form reading, analytics and paid-member surfaces;
- restrained visual hierarchy.

Risk:

- if used too heavily, it can make the catalog feel conservative and less like an active product-discovery marketplace.

### C — Marketplace Hybrid

Theme statement:

> Familiar marketplace cues. A sharper data layer.

Strengths:

- closest match to the actual eCommPilot business model;
- strongest structure for browsing Winning Products;
- familiar product-discovery behavior;
- supports images, filters and product metrics without making the site look like a generic dashboard;
- provides the clearest bridge between public marketplace browsing and SaaS research depth.

Risk:

- must keep strong eCommPilot branding so it does not become visually generic.

## Locked production direction

**Approved by the owner on 04 October 2026: use C — Marketplace Hybrid as the structural/UI direction, combined with the approved A — Energetic Blue/Cyan brand palette and logo language.**

The owner also approved dark navy/blue header and hero treatment from the Theme Studio examples, and requested AliExpress Choice to use a green treatment closer to AliExpress's own Choice presentation.

In practice:

- Marketplace Hybrid for product grids, filters, category browsing, product cards and detail-page information hierarchy.
- Energetic Blue/Cyan for logo, primary CTA, active filter, key highlights and selected brand moments.
- Use deeper navy for headings, navigation and data-heavy sections.
- Keep green reserved mainly for positive economics/profit.
- Use violet only for Premium membership/access where useful.
- Avoid applying gradients to every component.

This gives eCommPilot the intended hybrid:

**SaaS credibility + marketplace discoverability + recognizable blue/cyan identity.**

## Production warning

The Theme Studio explicitly uses illustrative product metrics and illustrative membership pricing.

Do not carry prototype values such as sample sales, margins, supplier evidence or $29/$59 pricing into production data unless separately approved and connected to the real data/membership configuration.

## Design implementation order

1. Lock production design tokens.
2. Build header/navigation.
3. Build hero/market selector.
4. Build the Winning Product card system.
5. Build catalog filters.
6. Build product deep-dive layout.
7. Build membership comparison.
8. Validate mobile 390px experience.
9. Validate accessible contrast and keyboard states.
10. Only then scale the design to all public templates.
