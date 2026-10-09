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
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader dark={darkHeader} />
      <main id="main-content" className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
