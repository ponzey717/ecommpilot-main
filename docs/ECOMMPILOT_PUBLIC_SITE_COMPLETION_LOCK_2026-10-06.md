# eCommPilot Public Site Completion Lock — 2026-10-06

Status: **CURRENT PUBLIC-SITE DELIVERY PLAN**

This document aligns ecommpilot.net with the app-first completion plan.

## Product role

ecommpilot.net is the public marketing/discovery surface for the eCommPilot platform.

The app owns canonical inventory, publication status, member entitlements, supplier privacy, economics, freshness and business operations.

The public site must consume only the approved public product contract and must never become a second inventory database or research engine.

## Timing

Do not block app completion on the public site.

Public implementation may proceed in parallel **after app EP-05**, when Inventory Review/Publish and public product fields are stable.

Research-worker, desktop automation and sold-data acquisition systems are deferred until after the app and public website are complete.

## Public navigation

Winning Products | What’s Trending | How It Works | Pricing | Learn | Login | Get Started

## Homepage order

1. Hero
2. Pain points → solutions
3. Winning Products preview
4. How It Works
5. Product detail/value preview
6. Manage Your eBay Business
7. Product Watcher
8. What’s Trending
9. eBay Profit Calculator
10. Pricing
11. Final CTA

Hero:
**Stop Searching. Start Listing Winning eBay Products.**

Supporting copy:
Ready-to-list eBay dropshipping products with verified suppliers, calculated profits, optimized listings and ongoing supplier monitoring.

Trust line:
You only need your eBay account. We handle the product work.

Final CTA:
**Your eBay account is ready. Your products should be too.**

## Public data boundary

Allowed when legitimate/current:
- image;
- title;
- market;
- category;
- legitimate sold/30d only when sourced;
- active listings/competition where appropriate;
- recommended selling price;
- net profit;
- margin;
- ROI;
- delivery;
- safe supplier label;
- freshness summary.

Never expose:
- exact supplier URL;
- private supplier/variant IDs;
- backup supplier;
- internal evidence payload;
- workspace/member IDs;
- private provenance;
- admin/research queues.

## What’s Trending

Preserve the existing discovery capability, but present it separately from Winning Products.

Flow:
Market → Category → Filters → Search.

## Profit Calculator

Provide a free public calculator:
Selling price + product cost + shipping + eBay fees + optional ads/tax/other → profit, margin and ROI.

## GitHub Actions budget

The public repo planning target is **<= 400 GitHub Actions minutes/month**, within the shared ~2,000 minute allowance.

Prefer local validation and path-filtered/concurrency-controlled CI. Avoid running expensive builds for docs-only edits when possible.

## Status

This lock changes documentation/product direction only. It does not by itself deploy ecommpilot.net.
