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

Server-side base URL for the allowlisted public catalog API.

Production:

```text
https://app.ecommpilot.net
```

The V1 public catalog endpoints are deliberately anonymous and field-allowlisted. Do not add app session cookies, bearer tokens or database credentials to these public reads.

### ECOMMPILOT_PUBLIC_IMAGE_HOSTS

Comma-separated hostnames that are allowed to render approved public product images.

Example:

```text
media.ecommpilot.net,project-storage.example.com
```

Rules:

- hostnames only; do not include `https://` or a path;
- images still require an approved `listing_builder_images.hosted_url` from the app publication pipeline;
- source/supplier image URLs are not automatically trusted;
- the public site accepts HTTPS only;
- configure the actual production storage/CDN host before launch;
- rebuild the public site after changing this variable because Next.js remote-image configuration is created at build time.

If the variable is blank, the safe default is only `media.ecommpilot.net`.

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
