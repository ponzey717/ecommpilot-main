import assert from "node:assert/strict";
import { test } from "node:test";
import { growthGuides, isPublicGrowthGuide, publishedGrowthGuides } from "../src/content/growth-guides.ts";

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
  assert.ok(publishedGrowthGuides().every((guide) => isPublicGrowthGuide(guide)));
  assert.ok(!publishedGrowthGuides().some((guide) => guide.status === "review" || guide.status === "draft" || guide.status === "paused"));
});

test("scheduled guides cross the UTC publication boundary without a rebuild", () => {
  const guide = { ...growthGuides[0], status: "scheduled", publicationAt: "2026-11-01T14:00:00.000Z" };
  assert.equal(isPublicGrowthGuide(guide, new Date("2026-11-01T13:59:59.999Z")), false);
  assert.equal(isPublicGrowthGuide(guide, new Date("2026-11-01T14:00:00.000Z")), true);
  assert.equal(isPublicGrowthGuide({ ...guide, status: "paused" }, new Date("2026-11-02T14:00:00.000Z")), false);
  assert.equal(isPublicGrowthGuide({ ...guide, publicationAt: "invalid" }, new Date("2026-11-02T14:00:00.000Z")), false);
});

test("tool intent remains on the tool page and review guides stay unpublished", () => {
  assert.ok(!growthGuides.some((guide) => guide.primaryKeyword === "ebay profit calculator"));
  assert.deepEqual(growthGuides.map((guide) => guide.slug).sort(), ["match-ebay-item-specifics", "research-ebay-sold-products", "verify-aliexpress-supplier-variations"]);
  assert.ok(growthGuides.every((guide) => guide.status === "review" && !guide.datePublished));
  assert.equal(publishedGrowthGuides().length, 0);
  assert.ok(growthGuides.every((guide) => guide.screenshotRequirements.length > 0));
  assert.ok(growthGuides.every((guide) => guide.sources.every((source) => /^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt))));
});

test("review guides meet the requested editorial depth without metadata padding", () => {
  const words = (value) => value.trim().split(/\s+/).filter(Boolean).length;
  for (const guide of growthGuides) {
    const body = [guide.lead, ...guide.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.subsections ?? []).flatMap((subsection) => [subsection.heading, ...subsection.paragraphs]),
      ...(section.table ? [section.table.caption, ...section.table.headers, ...section.table.rows.flat()] : []),
    ])].join(" ");
    const count = words(body);
    assert.ok(count >= 2000 && count <= 3500, `${guide.slug}: ${count} editorial words`);
  }
});
