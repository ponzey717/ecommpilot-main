const DEFAULT_PUBLIC_IMAGE_HOSTS = ["media.ecommpilot.net"] as const;

function configuredHosts(): readonly string[] {
  const configured = process.env.ECOMMPILOT_PUBLIC_IMAGE_HOSTS
    ?.split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return configured?.length ? configured : DEFAULT_PUBLIC_IMAGE_HOSTS;
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
