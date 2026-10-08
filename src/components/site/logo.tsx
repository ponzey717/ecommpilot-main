import Image from "next/image";
import Link from "next/link";

export function Logo({
  light = false,
  compact = false,
  priority = false,
}: {
  light?: boolean;
  compact?: boolean;
  priority?: boolean;
}) {
  const src = compact
    ? "/brand/ecommpilot-mark.svg"
    : light
      ? "/brand/ecommpilot-logo-light.svg"
      : "/brand/ecommpilot-logo.svg";

  return (
    <Link href="/" className="inline-flex items-center" aria-label="eCommPilot home">
      <Image
        src={src}
        alt="eCommPilot"
        width={compact ? 44 : 190}
        height={compact ? 44 : 45}
        priority={priority}
        className={compact ? "h-10 w-10" : "h-10 w-auto"}
      />
    </Link>
  );
}
