import Link from "next/link";
import { getTool, toolPath } from "@/config/tools";

export function ToolEditorial({ slug }: { slug: string }) {
  const tool = getTool(slug);
  if (!tool) return null;
  return <div className="mt-10 grid gap-5 md:grid-cols-2"><article className="feature-card"><p className="eyebrow">How it works</p><h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Use your own assumptions</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{tool.how}</p><p className="mt-4 text-sm leading-7 text-[var(--muted)]"><strong>Example:</strong> {tool.example}</p></article><article className="feature-card"><p className="eyebrow">Next steps</p><h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Keep the estimate in context</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{tool.limitation}</p><div className="mt-5 flex flex-col gap-3">{tool.related.map((slug) => { const related = getTool(slug); return related ? <Link key={slug} href={toolPath(slug)} className="font-bold text-[var(--blue)] hover:underline">{related.title} →</Link> : null; })}<Link href="/learn" className="font-bold text-[var(--blue)] hover:underline">eBay seller guides →</Link><Link href="/winning-products" className="font-bold text-[var(--blue)] hover:underline">Browse Winning Products →</Link></div></article></div>;
}
