import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
};

function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
  image,
}: MetadataInput = {}): Metadata {
  const canonical = absoluteUrl(path);
  const socialImages = image ? [absoluteUrl(image)] : undefined;

  return {
    title: title ?? siteConfig.title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: title ?? siteConfig.title,
      description,
      url: canonical,
      images: socialImages,
    },
    twitter: {
      card: socialImages ? "summary_large_image" : "summary",
      title: title ?? siteConfig.title,
      description,
      images: socialImages,
    },
  };
}

export function toAbsoluteUrl(path = "/") {
  return absoluteUrl(path);
}
