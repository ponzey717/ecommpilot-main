const supportedProfitBands = new Set([10, 15, 20, 25, 30, 35, 40, 50]);

export function parseMinProfitBand(
  value: string | string[] | undefined,
): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;

  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && supportedProfitBands.has(parsed)
    ? parsed
    : undefined;
}

export function parseCatalogCursor(
  value: string | string[] | undefined,
): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || raw.length > 512) return undefined;
  return /^[A-Za-z0-9_-]+$/.test(raw) ? raw : undefined;
}
