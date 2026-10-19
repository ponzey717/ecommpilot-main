"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, children, className, activeClassName = "" }: { href: string; children: ReactNode; className: string; activeClassName?: string }) {
  const pathname = usePathname();
  const active = href.startsWith("/") && !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
  return <Link href={href} className={`${className} ${active ? activeClassName : ""}`} aria-current={active ? "page" : undefined}>{children}</Link>;
}
