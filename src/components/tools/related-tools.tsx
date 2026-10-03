import Link from "next/link";

const tools = [
  {
    href: "/free-tools/profit-margin-calculator",
    title: "Profit Margin Calculator",
    description: "Estimate landed cost, net profit, margin and ROI from your own assumptions.",
  },
  {
    href: "/free-tools/ebay-fee-estimator",
    title: "eBay Fee Estimator",
    description: "Test the marketplace fee rate and fixed transaction cost relevant to your listing.",
  },
  {
    href: "/free-tools/title-length-checker",
    title: "Title Length Checker",
    description: "Check an eBay title draft against the 80-character title limit.",
  },
  {
    href: "/free-tools/sell-through-calculator",
    title: "Sell-Through Calculator",
    description: "Calculate observed sell-through from your own sold and active listing counts.",
  },
] as const;

export function RelatedTools({ currentPath }: { currentPath: string }) {
  const related = tools.filter((tool) => tool.href !== currentPath);

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Related tools</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">
            Keep working on the listing.
          </h2>
        </div>
        <Link href="/free-tools" className="text-sm font-extrabold text-[var(--blue)]">
          View all free tools →
        </Link>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {related.map((tool) => (
          <Link key={tool.href} href={tool.href} className="tool-card group">
            <h3 className="text-lg font-extrabold text-[var(--navy)] group-hover:text-[var(--blue)]">
              {tool.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {tool.description}
            </p>
            <p className="mt-5 text-sm font-extrabold text-[var(--blue)]">
              Open tool →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-5 rounded-[22px] border border-[var(--border)] bg-[var(--surface-soft)] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="text-sm font-extrabold text-[var(--navy)]">
            Looking for product opportunities too?
          </p>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
            Browse the Winning Products catalog with market, supplier, delivery and economics context.
          </p>
        </div>
        <Link
          href="/winning-products"
          className="button button-secondary mt-4 shrink-0 sm:mt-0"
        >
          Browse Winning Products
        </Link>
      </div>
    </section>
  );
}
