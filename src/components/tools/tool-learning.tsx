import { Checklist, Faq } from "@/components/learn/content-blocks";
import { toolLearning } from "@/config/tool-learning";

export function ToolLearning({ slug }: { slug: string }) {
  const data = toolLearning[slug];
  if (!data) return null;
  return <div className="mt-10 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5">
    <section className="feature-card min-w-0"><h2 className="text-2xl font-extrabold text-[var(--navy)]">How to use this tool</h2><div className="mt-4 text-sm leading-7 text-[var(--muted)]"><Checklist items={data.steps} /></div></section>
    <section className="feature-card min-w-0"><h2 className="text-2xl font-extrabold text-[var(--navy)]">Common mistake</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{data.mistake}</p></section>
    <section className="feature-card min-w-0"><h2 className="text-2xl font-extrabold text-[var(--navy)]">Questions sellers ask</h2><div className="mt-4"><Faq items={data.faq} /></div></section>
    <p className="text-xs text-[var(--muted)]">Official reference checked 18 October 2026: <a href={data.source.href} className="text-[var(--blue)] underline">{data.source.label}</a>. Recheck your own market and account terms before acting.</p>
  </div>;
}
