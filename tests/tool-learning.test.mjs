import assert from "node:assert/strict";
import { test } from "node:test";
import { tools } from "../src/config/tools.ts";
import { toolLearning } from "../src/config/tool-learning.ts";

test("every non-fee tool owns practical guidance and an official reference", () => {
  for (const tool of tools.filter((item) => item.slug !== "ebay-fee-estimator")) {
    const guide = toolLearning[tool.slug];
    assert.ok(guide, `Missing guidance for ${tool.slug}`);
    assert.equal(guide.steps.length, 3);
    assert.ok(guide.mistake.length > 40);
    assert.ok(guide.faq.length >= 2);
    assert.ok(guide.source.href.startsWith("https://www.ebay.com/"));
  }
});
