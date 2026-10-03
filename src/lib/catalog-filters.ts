export function parseMinProfitBand(
  value: string | string[] | undefined,
): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) return undefined;

  return parsed;
}
