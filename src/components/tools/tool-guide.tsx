import Link from "next/link";
import { getTool, toolPath } from "@/config/tools";
import { toolDepth } from "@/config/tool-depth";
import { toolLearning } from "@/config/tool-learning";

const feeReferences = [
  { label: "US selling fees", href: "https://www.ebay.com/help/selling-fees/selling/selling-fees?id=4822" },
  { label: "UK business seller fees", href: "https://www.ebay.co.uk/help/selling/fees-credits-invoices/selling-fees?id=4809" },
  { label: "AU selling fees", href: "https://www.ebay.com.au/help/selling/fees-credits-invoices/selling-fees?id=4822" },
];

export function ToolGuide({ slug }: { slug: string }) {
  const tool = getTool(slug);
  const depth = toolDepth[slug];
  const learning = toolLearning[slug];
  if (!tool || !depth || !learning) return null;
  const references = slug === "ebay-fee-estimator" || slug === "profit-margin-calculator" ? feeReferences : [learning.source];
  return <section className={`tool-guide tool-guide-${depth.style}`} aria-label={`${tool.title} guidance`}>
    <header className="tool-guide-header"><span className="tool-guide-kicker">BEHIND THE RESULT</span><h2>{depth.heading}</h2><p>{depth.context[0]}</p></header>
    <div className="tool-guide-main">
      <div className="tool-guide-explainer"><div className="tool-guide-formula"><span>{depth.formulaLabel}</span><strong>{depth.formula}</strong></div><p>{depth.context[1]}</p>{depth.workedExample ? <div className="tool-guide-worked"><strong>Worked example</strong><p>{depth.workedExample}</p></div> : null}<div className="tool-guide-action"><span aria-hidden="true">↗</span><div><strong>Before you act</strong><p>{depth.decision}</p></div></div></div>
      <aside className="tool-guide-scenario"><span className="tool-guide-kicker">ILLUSTRATIVE EXAMPLE</span><p>{tool.example}</p><small>Use your own item, marketplace and account figures in the tool above.</small></aside>
    </div>
    <div className="tool-guide-practice"><div><span className="tool-guide-kicker">THREE-STEP CHECK</span><h3>Use the result with a clear source trail</h3></div><ol>{learning.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></div>
    <div className="tool-guide-lower"><aside className="tool-guide-caution"><span aria-hidden="true">!</span><div><h3>Watch for this mistake</h3><p>{learning.mistake}</p><p>{tool.limitation}</p></div></aside><section className="tool-guide-faq"><h3>Questions sellers ask</h3>{learning.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section></div>
    <footer className="tool-guide-footer"><div><span className="tool-guide-kicker">VERIFY THE RULES</span><p>Official references checked 19 October 2026. Recheck the terms for your own market and account.</p><div className="tool-guide-references">{references.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span></a>)}</div></div><div><span className="tool-guide-kicker">KEEP WORKING</span><div className="tool-guide-links">{tool.related.map((relatedSlug) => { const related = getTool(relatedSlug); return related ? <Link key={relatedSlug} href={toolPath(relatedSlug)}>{related.title} <span aria-hidden="true">↗</span></Link> : null; })}<Link href="/learn">Seller guides <span aria-hidden="true">↗</span></Link></div></div></footer>
  </section>;
}
