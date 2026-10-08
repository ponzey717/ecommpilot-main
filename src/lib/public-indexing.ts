export function publicIndexingEnabled(): boolean {
  return process.env.ECOMMPILOT_PUBLIC_INDEXING_ENABLED === "true";
}
