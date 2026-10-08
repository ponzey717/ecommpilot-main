const DEFAULT_PUBLIC_IMAGE_HOSTS = ["media.ecommpilot.net"] as const;

function validHostname(value: string): string | null {
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized.length > 253) return null;
  if (!/^[a-z0-9.-]+$/.test(normalized)) return null;
  if (normalized.startsWith(".") || normalized.endsWith(".") || normalized.includes("..")) return null;
  return normalized;
}

function configuredHosts(): readonly string[] {
  const configured = process.env.ECOMMPILOT_PUBLIC_IMAGE_HOSTS
    ?.split(",")
    .map(validHostname)
    .filter((value): value is string => value != null);

  return configured?.length ? [...new Set(configured)] : DEFAULT_PUBLIC_IMAGE_HOSTS;
}

export function publicImageHosts(): readonly string[] {
  return configuredHosts();
}

export function approvedPublicImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return value;

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:") return null;
    return configuredHosts().includes(parsed.hostname.toLowerCase()) ? parsed.toString() : null;
  } catch {
    return null;
  }
}
