import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { contentPolicy } from '../scripts/secure-static-export.mjs';

for (const route of ['', 'work/', 'motion/', 'photograms/']) {
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
