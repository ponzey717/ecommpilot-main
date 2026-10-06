> **CURRENT PLAN NOTICE — 2026-10-06**
> This document remains valid where consistent with `docs/ECOMMPILOT_PUBLIC_SITE_COMPLETION_LOCK_2026-10-06.md`. Public-site work starts from stable app publication contracts and has no dependency on deferred desktop/research-worker systems.

# Environment Configuration

Copy `.env.example` to `.env.local` for local-only values.

```bash
cp .env.example .env.local
```

Never commit `.env.local` or production secrets.

## Variables

### NEXT_PUBLIC_SITE_URL

Public website URL.

Production:

```text
https://ecommpilot.net
```

### NEXT_PUBLIC_APP_URL

Authenticated app URL.

Production:

```text
https://app.ecommpilot.net
```

### ECOMMPILOT_API_BASE_URL

Future server-side base URL for the safe app/public API.

Do not use a privileged database URL in browser code.

### ECOMMPILOT_API_TOKEN

Future server-side token for authenticated service-to-service API calls if required.

This must never be prefixed with `NEXT_PUBLIC_`.

### GOOGLE_SITE_VERIFICATION

Optional Google Search Console meta verification value.

Add only the verification token value, not full HTML.

### NEXT_PUBLIC_GA_MEASUREMENT_ID

Optional analytics measurement ID after analytics is approved.

## Deployment

Production values should be stored in the hosting platform's environment/secret manager.

Do not commit:

- passwords;
- OAuth client secrets;
- database service-role keys;
- payment keys;
- supplier API secrets;
- eBay production secrets.
