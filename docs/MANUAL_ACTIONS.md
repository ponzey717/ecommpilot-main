# Manual Actions Register

This file records actions that require the owner because they involve local-machine state, account authentication, DNS, billing, verification or secrets.

## Required now

**None for continued GitHub implementation.**

EP-10 is being developed and reviewed on feature branches. Do not change DNS, Hostinger production deployment, Search Console verification or payment configuration during implementation validation.

## Required for local EP-10 validation

When the validation window is ready, use the existing local public-site checkout/worktree and validate the exact feature-branch head.

Required environment for live local catalog integration:

```text
ECOMMPILOT_API_BASE_URL=http://127.0.0.1:<local-app-port>
```

or an explicitly approved safe staging app URL.

The public `public-v1` catalog API is deliberately anonymous/allowlisted. Do not add:

- operator/member cookies;
- bearer tokens;
- database URLs;
- Supabase service-role credentials

to the public-site catalog integration.

## Required later — member signup launch

Before the public **Get Started** CTA is considered live, confirm the production app has:

```text
MEMBER_SELF_REGISTRATION_ENABLED=true
```

and verify a new registration creates a Free member account and redirects to sign-in.

Do not enable self-registration merely for development validation against production.

## Required later — staging / Hostinger

Owner action may be required for:

- creating/selecting the Hostinger Node.js Web App for `ponzey717/ecommpilot-main`;
- connecting the approved release branch;
- assigning a staging hostname first;
- adding production environment variables;
- validating build/start settings;
- later assigning `ecommpilot.net` only after launch approval.

Production public catalog setting:

```text
ECOMMPILOT_API_BASE_URL=https://app.ecommpilot.net
```

Do not switch the public domain until both the public site and app public API dependency are deployed and verified.

## Required later — Google Search Console / analytics

Owner action may be required for:

- confirming the domain property;
- DNS verification;
- sitemap submission;
- analytics-provider approval;
- consent/cookie configuration where required.

Do not enable non-essential analytics merely to make the implementation appear complete.

## Required later — payments

Before paid memberships:

- approve exact commercial prices and limits;
- select/configure the payment provider;
- complete business/account verification;
- store payment keys only in the deployment secret manager.

Current public Pricing deliberately contains no invented paid prices.

## Required later — public contact channel

The public Contact page currently routes account-specific support through the authenticated app.

Before displaying a public email address or contact form:

- approve the public contact address/provider;
- configure delivery;
- add anti-abuse controls where appropriate;
- then update the page.

Do not publish an invented or unmonitored email address.

## Production safety

The owner must explicitly approve separately before:

- production deployment;
- DNS/domain switch;
- app/database migrations;
- public API release if it changes app behavior;
- payments;
- analytics/ads.

## Never send in chat or commit

- passwords;
- OTPs;
- private API secrets;
- service-role keys;
- payment secret keys;
- private OAuth client secrets;
- recovery codes;
- browser session cookies.

When an authenticated approval screen is required, the owner completes that step directly.
