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

const configuredImageHosts = process.env.ECOMMPILOT_PUBLIC_IMAGE_HOSTS
  ?.split(",")
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean);

const publicImageHosts = configuredImageHosts?.length
  ? configuredImageHosts
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
};

export default nextConfig;
