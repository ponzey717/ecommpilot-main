import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

function validImageHostname(value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized.length > 253) return null;
  if (!/^[a-z0-9.-]+$/.test(normalized)) return null;
  if (normalized.startsWith(".") || normalized.endsWith(".") || normalized.includes("..")) return null;
  return normalized;
}

const configuredImageHosts = process.env.ECOMMPILOT_PUBLIC_IMAGE_HOSTS
  ?.split(",")
  .map(validImageHostname)
  .filter((value): value is string => value != null);

const publicImageHosts = configuredImageHosts?.length
  ? [...new Set(configuredImageHosts)]
  : ["media.ecommpilot.net"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: publicImageHosts.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    })),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/wp-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/wp-sitemap-posts-page-1.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/wp-sitemap-users-1.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/author/amzee459/:path*",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
