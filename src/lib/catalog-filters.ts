const supportedProfitBands = new Set([10, 15, 20, 25, 30, 35, 40, 50]);

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseMinProfitBand(
  value: string | string[] | undefined,
): number | undefined {
  const raw = first(value);
  if (!raw) return undefined;

  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && supportedProfitBands.has(parsed)
    ? parsed
    : undefined;
}

export function parseCatalogCursor(
  value: string | string[] | undefined,
): string | undefined {
  const raw = first(value);
  if (!raw || raw.length > 512) return undefined;
  return /^[A-Za-z0-9_-]+$/.test(raw) ? raw : undefined;
}

export function parseCatalogInteger(
  value: string | string[] | undefined,
  maximum: number,
): number | undefined {
  const raw = first(value);
  if (!raw) return undefined;

  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed >= 0 && parsed <= maximum
    ? parsed
    : undefined;
}

export function parseSupplierProvider(
  value: string | string[] | undefined,
): string | undefined {
  const raw = first(value)?.trim().toLowerCase();
  if (!raw || raw.length > 40) return undefined;
  return /^[a-z0-9_-]+$/.test(raw) ? raw : undefined;
}
