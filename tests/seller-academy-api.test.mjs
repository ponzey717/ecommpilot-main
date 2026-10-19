import assert from 'node:assert/strict';
import test from 'node:test';
import { growthGuides } from '../src/content/growth-guides.ts';
import { getPublishedAcademyGuides } from '../src/lib/api/seller-academy.ts';

test('website accepts only due published API articles and sends no credentials', async () => {
  const previousBase = process.env.ECOMMPILOT_API_BASE_URL;
  const previousFetch = globalThis.fetch;
  process.env.ECOMMPILOT_API_BASE_URL = 'https://app.ecommpilot.net';
  const base = growthGuides[0];
  const due = { ...base, datePublished: '2026-10-18T10:00:00Z' };
  const future = { ...base, slug: 'future-guide', datePublished: '2099-10-18T10:00:00Z' };
  globalThis.fetch = async (url, options) => {
    assert.equal(String(url), 'https://app.ecommpilot.net/api/public/editorial');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.headers, undefined);
    return Response.json({ articles: [due, future, { slug: 'incomplete' }] });
  };
  try {
    assert.deepEqual((await getPublishedAcademyGuides()).map((article) => article.slug), [base.slug]);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBase === undefined) delete process.env.ECOMMPILOT_API_BASE_URL;
    else process.env.ECOMMPILOT_API_BASE_URL = previousBase;
  }
});
