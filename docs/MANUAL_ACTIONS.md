# Manual Actions Register

This file records actions that require the owner because they involve local-machine state, account authentication, DNS, billing, verification or secrets.

## Required now

### 1. Pull GitHub changes into the Mac workspace

When this GitHub foundation commit is complete, the local VS Code folder will be behind the remote repository.

In the local folder:

```bash
cd /Users/macbookpro/Developer/ecommpilot-main
git pull
```

If the development server is running, restart it after the pull if Next.js does not reload cleanly.

This is the only immediate manual action required for the foundation work.

### 2. Theme Studio review access

The published Theme Studio link currently requires ChatGPT authentication for external inspection.

To let an external browser inspection review it, either:

- change the Site access setting so the published preview is publicly viewable; or
- approve/use a signed-in browser profile/session when requested.

No password should ever be sent in chat.

## Required later

### Public deployment / Hostinger

Owner action may be required for:

- creating/selecting the Hostinger Node.js Web App;
- connecting GitHub repository;
- assigning `ecommpilot.net`;
- DNS changes;
- production environment variables.

### Google Search Console

Owner action may be required for:

- adding/confirming the domain property;
- DNS verification token;
- account access;
- sitemap submission approval if not automated.

### Production app/data access

Before real product integration:

- make the actual eCommPilot production database/Supabase project available;
- confirm the safe API base URL;
- provide access through the supported connector/workflow, not secrets pasted into source code.

### eBay

Only when needed for audited API work:

- confirm production/developer credentials are configured securely;
- complete OAuth/consent screens manually where required.

### Supplier sources

At the AliExpress supplier phase:

- confirm API/integration account if a credentialed production source is needed.

At later phases:

- CJ/Amazon/other supplier credentials or approvals as required.

### Payments

Before paid memberships/credit packs:

- select the payment provider;
- create/configure the business account;
- complete identity/business verification manually;
- place keys in the deployment secret manager, never Git.

### Analytics

Before production launch:

- confirm analytics provider;
- authorize Search Console/analytics accounts;
- provide IDs through environment configuration.

## Never send in chat or commit

- passwords;
- OTPs;
- private API secrets;
- service-role keys;
- payment secret keys;
- private OAuth client secrets;
- recovery codes.

When an authenticated approval screen is required, the owner completes that step directly.
