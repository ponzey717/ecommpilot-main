import assert from "node:assert/strict";
import { test } from "node:test";
import { growthGuides, publishedGrowthGuides } from "../src/content/growth-guides.ts";

test("growth guide slugs are unique, valid and useful", () => {
  const slugs = growthGuides.map((guide) => guide.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const guide of growthGuides) {
    assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(guide.title.length > 20);
    assert.ok(guide.description.length > 70);
    assert.ok(guide.lead.length > 30);
    assert.ok(guide.sections.length >= 4);
    assert.ok(guide.sources.length >= 1);
    assert.ok(guide.sources.every((source) => source.url.startsWith("https://")));
    assert.ok(guide.tools.every((tool) => tool.href.startsWith("/free-tools/")));
  }
});

test("unapproved draft articles are not published", () => {
  assert.ok(publishedGrowthGuides().every((guide) => guide.status === "published" && guide.datePublished));
  assert.ok(!publishedGrowthGuides().some((guide) => guide.status !== "published"));
});

test("tool intent remains on the calculator page and flagship drafts stay unpublished", () => {
  assert.ok(!growthGuides.some((guide) => guide.primaryKeyword === "ebay profit calculator"));
  assert.deepEqual(growthGuides.map((guide) => guide.slug).sort(), ["research-ebay-sold-products", "verify-aliexpress-supplier-variations"]);
  assert.ok(growthGuides.every((guide) => guide.status === "review" && !guide.datePublished));
  assert.equal(publishedGrowthGuides().length, 0);
  assert.ok(growthGuides.every((guide) => guide.screenshotRequirements.length > 0));
  assert.ok(growthGuides.every((guide) => guide.sources.every((source) => /^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt))));
});
