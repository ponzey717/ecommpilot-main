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
    ? "/brand/ecommpilot-icon-original.png"
    : "/brand/ecommpilot-logo-original.png";

  return (
    <Link href="/" className="inline-flex shrink-0 items-center" data-header-context={light ? "dark" : "light"} aria-label="eCommPilot home">
      <Image
        src={src}
        alt="eCommPilot"
        width={compact ? 44 : 2048}
        height={compact ? 44 : 682}
        priority={priority}
        className={compact ? "h-10 w-10" : "h-[48px] w-[135px] object-contain sm:h-[60px] sm:w-[180px]"}
      />
    </Link>
  );
}
