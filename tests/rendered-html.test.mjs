import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { contentPolicy } from '../scripts/secure-static-export.mjs';

for (const route of ['', 'work/', 'motion/', 'photograms/', 'friends/']) {
  test(`export /${route} restricts scripts and retains portfolio content`, async () => {
    const html = await readFile(`out/${route}index.html`, 'utf8');
    assert.match(html, /Kyan Chase/);
    assert.doesNotMatch(html, /Your site is taking shape/);
    const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
    assert.ok(policy);
    assert.ok(html.indexOf('http-equiv="Content-Security-Policy"') < html.indexOf('<script'));
    const scriptPolicy = policy.split('; ').find(d => d.startsWith('script-src '));
    assert.ok(!scriptPolicy.includes('unsafe-inline') && !scriptPolicy.includes('unsafe-eval'));
    for (const [, attributes, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/\bsrc\s*=/.test(attributes)) {
        const src = attributes.match(/\bsrc="([^"]+)"/)?.[1];
        assert.ok(src?.startsWith('/') && !src.startsWith('//'));
        await access(`out${src}`);
      } else if (body) {
        assert.ok(scriptPolicy.includes(`'sha256-${createHash('sha256').update(body).digest('base64')}'`));
      }
    }
    for (const [, src] of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
      assert.ok(src.startsWith('/') && !src.startsWith('//'));
      await access(`out${src}`);
    }
    assert.ok(policy.includes("object-src 'none'"));
    assert.ok(policy.includes("base-uri 'none'"));
    assert.ok(policy.includes("form-action 'none'"));
    assert.doesNotMatch(html, /<form\b/i);
    assert.doesNotMatch(html, /\s(?:src|href)="http:\/\//i);
  });
}

test('policy does not authorize injected script content', () => {
  const policy = contentPolicy('<script>console.log("original")</script>');
  const altered = createHash('sha256').update('console.log("altered")').digest('base64');
  assert.ok(!policy.includes(altered));
  assert.ok(!policy.includes("script-src 'self' 'unsafe-inline'"));
});

test('Friends uses responsive browsing images and intact download targets', async () => {
  const html = await readFile('out/friends/index.html', 'utf8');
  assert.match(html, /<h1[^>]*>Friends<\/h1>/);
  assert.match(html, /href="\/friends\/"/);
  for (const [, attributes] of html.matchAll(/<img\b([^>]+)>/g)) {
    assert.match(attributes, /src="\/friends-preview\//);
    assert.match(attributes, /srcSet="/);
    assert.match(attributes, /loading="lazy"/);
  }
  for (const [, href] of html.matchAll(/href="([^"]+)" download=/g)) {
    await access(`out${decodeURIComponent(href)}`);
    assert.deepEqual(await readFile(`out${decodeURIComponent(href)}`), await readFile(`public${decodeURIComponent(href)}`));
  }
});
