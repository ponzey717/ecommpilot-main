import type { ReactNode } from "react";
import { SiteFooter } from "./footer";
import { SiteHeader } from "./header";

export function PageShell({
  children,
  darkHeader = false,
}: {
  children: ReactNode;
  darkHeader?: boolean;
}) {
  return (
    <>
      <SiteHeader dark={darkHeader} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
