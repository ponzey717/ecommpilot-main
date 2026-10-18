# eCommPilot editorial publishing workflow

Updated 2026-10-19. The two flagship manuscripts in `src/content/growth-guides.ts` are **review** content. Their proposed public routes return 404, and they do not enter the Learn listing, sitemap, or Article schema. Review source content locally. No owner approval or publication is implied.

## Workflow

Keyword research → search intent check → existing URL/cannibalization check → brief → official-source research → draft → fact check → real screenshot requirements → visuals → internal links → SEO audit → staging review → owner approval → publish → post-publication performance review.

Use `docs/SEARCH_INTENT_RESEARCH.md` for the qualitative intent spot check. Use `docs/KEYWORD_MASTER_MAP.csv` for ownership and `docs/EDITORIAL_BRIEFS.csv` for the first 20 proposed articles. Search volume and difficulty are unavailable; do not invent them. Calculator intent belongs to its calculator URL, including formulas, examples and fee references. A Learn article needs a distinct educational question.

## Add or edit a guide

1. Add a unique slug and complete the typed entry in `src/content/growth-guides.ts`. Keep `status: "draft"` or `"review"` while sources, screenshots, policy, links and copy are checked.
2. Record the source URL and checked date. Use the exact marketplace context. Reverify changing fees, seller policy and API claims before approval.
3. Use genuine redacted screenshots and original diagrams. The article component shows explicit screenshot requirements if an image has not been supplied; remove placeholders only after evidence exists.
4. Review metadata, source claims, accessible headings and links, internal links, policy risk and mobile layout. Confirm the article does not target a tool's primary search intent.
5. Record owner approval and set `status: "published"` with a genuine `datePublished`. The published selector then adds it to the Learn listing and sitemap. Deploy only after the separate production approval.
6. After release, monitor Search Console and user feedback where authorized; update the article and `dateModified` when facts change.

## Current blockers

- No authorized Search Console or paid keyword data was available in this local pass. The map uses qualitative priority only.
- Real Seller Hub and supplier variation screenshots need authenticated owner/editor access and redaction.
- The two flagship manuscripts require owner fact check and approval. The supplier article remains focused on exact SKU, stock, destination delivery and economics verification; sourcing-policy education is a separate editorial topic and is not a new product gate.
- Chrome viewport and interaction checks are local evidence only. Hosting, DNS, WordPress redirects and production indexing have not been changed.
