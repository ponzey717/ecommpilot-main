import { Breadcrumbs } from "@/components/site/breadcrumbs";

export function ToolPageIntro({ title, description }: { title: string; description: string }) {
  return <section className="tool-page-intro"><div className="site-container">
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free Tools", href: "/free-tools" }, { label: title }]} />
    <div className="tool-intro-copy"><div><p className="tool-intro-kicker"><span aria-hidden="true">✓</span> Free · Instant · No sign-up</p><h1>{title}</h1><p>{description}</p></div><div className="tool-trust"><span>Browser-safe</span><span>Your inputs stay private</span><span>Editable assumptions</span></div></div>
  </div></section>;
}
