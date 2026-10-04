export function parseMinProfitBand(
  value: string | string[] | undefined,
): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) return undefined;

  return parsed;
}

export function parseCatalogCursor(
  value: string | string[] | undefined,
): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || raw.length > 512) return undefined;
  return /^[A-Za-z0-9_-]+$/.test(raw) ? raw : undefined;
}
