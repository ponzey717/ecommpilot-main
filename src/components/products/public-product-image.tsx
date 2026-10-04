"use client";

import Image from "next/image";
import { useState } from "react";
import type { PublicProductImage as PublicProductImageData } from "@/lib/api/public-catalog";

type PublicProductImageProps = {
  image: PublicProductImageData | null | undefined;
  fallbackLabel: string;
  className: string;
  fallbackClassName: string;
  priority?: boolean;
};

function supportedUrl(value: string | undefined) {
  return Boolean(value?.startsWith("/") || value?.startsWith("https://"));
}

export function PublicProductImage({
  image,
  fallbackLabel,
  className,
  fallbackClassName,
  priority = false,
}: PublicProductImageProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const url = image?.url;
  const failed = !url || !supportedUrl(url) || failedUrl === url;

  if (failed) {
    return (
      <div className={fallbackClassName} role="img" aria-label={`${fallbackLabel} image unavailable`}>
        <div>
          <span
            aria-hidden="true"
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-[var(--blue)] shadow-sm"
          >
            ↗
          </span>
          <p className="mt-4 text-sm font-extrabold text-[var(--navy)]">{fallbackLabel}</p>
        </div>
      </div>
    );
  }

  const width = image?.width ?? 1200;
  const height = image?.height ?? 840;
  const onError = () => setFailedUrl(url);

  if (url.startsWith("/")) {
    return (
      <Image
        src={url}
        alt={image?.alt ?? fallbackLabel}
        width={width}
        height={height}
        className={className}
        onError={onError}
        priority={priority}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={image?.alt ?? fallbackLabel}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
      className={className}
      onError={onError}
    />
  );
}
