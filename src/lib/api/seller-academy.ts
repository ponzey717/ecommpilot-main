import type { GrowthGuide } from "@/content/growth-guides";

function apiOrigin(): string | undefined {
  const value = process.env.ECOMMPILOT_API_BASE_URL?.trim();
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || (process.env.NODE_ENV !== "production" && url.protocol === "http:") ? url.origin : undefined;
  } catch { return undefined; }
}

function validArticle(value: unknown): value is GrowthGuide {
  if (!value || typeof value !== "object") return false;
  const article = value as Partial<GrowthGuide>;
  return typeof article.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)
    && typeof article.title === "string" && typeof article.description === "string"
    && typeof article.lead === "string" && typeof article.datePublished === "string"
    && Date.parse(article.datePublished) <= Date.now()
    && Array.isArray(article.sections) && article.sections.length >= 4
    && Array.isArray(article.sources) && Array.isArray(article.tools)
    && Array.isArray(article.processFlow) && Array.isArray(article.screenshotRequirements);
}

export async function getPublishedAcademyGuides(): Promise<GrowthGuide[]> {
  const origin = apiOrigin();
  if (!origin) return [];
  try {
    const response = await fetch(new URL("/api/public/editorial", origin), { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) return [];
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !Array.isArray((payload as { articles?: unknown }).articles)) return [];
    return (payload as { articles: unknown[] }).articles.filter(validArticle).map((article) => ({ ...article, status: "published" as const }));
  } catch { return []; }
}

export async function getPublishedAcademyGuide(slug: string): Promise<GrowthGuide | undefined> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return undefined;
  return (await getPublishedAcademyGuides()).find((article) => article.slug === slug);
}

export async function getPreviewAcademyGuide(slug: string, token: string): Promise<GrowthGuide | undefined> {
  const origin = apiOrigin();
  if (!origin || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || token.length < 30 || token.length > 2000) return undefined;
  try {
    const url = new URL(`/api/editorial-preview/${slug}`, origin);
    url.searchParams.set("token", token);
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) return undefined;
    const article: unknown = await response.json();
    if (!article || typeof article !== "object") return undefined;
    const preview = article as Partial<GrowthGuide>;
    if (preview.slug !== slug || typeof preview.title !== "string" || typeof preview.lead !== "string" || !Array.isArray(preview.sections) || !Array.isArray(preview.sources) || !Array.isArray(preview.tools) || !Array.isArray(preview.processFlow) || !Array.isArray(preview.screenshotRequirements)) return undefined;
    return { ...preview, datePublished: preview.datePublished ?? preview.dateModified ?? new Date().toISOString(), status: "review" } as GrowthGuide;
  } catch { return undefined; }
}
