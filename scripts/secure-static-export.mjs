import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export function contentPolicy(html) {
  const hashes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes, body]) => !/\bsrc\s*=/i.test(attributes) && body.length)
    .map(([, , body]) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`);
  return [
    "default-src 'none'",
    `script-src 'self' ${[...new Set(hashes)].join(' ')}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src https://www.youtube-nocookie.com https://www.instagram.com",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

export async function secureExport(directory = 'out') {
  let pages = 0;
  async function visit(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.name.endsWith('.html')) {
        let html = await readFile(path, 'utf8');
        // Regeneration is safe; place the policy before any executable content.
        html = html.replace(/<meta data-static-security="true"[^>]*>/g, '');
        const policy = contentPolicy(html);
        if (!html.includes('<head>')) throw new Error(`Missing head: ${path}`);
        const charset = html.match(/<meta charSet="[^"]+"\/>/i)?.[0] ?? '';
        if (charset) html = html.replace(charset, '');
        html = html.replace('<head>', `<head>${charset}<meta data-static-security="true" http-equiv="Content-Security-Policy" content="${policy}"><meta data-static-security="true" name="referrer" content="strict-origin-when-cross-origin">`);
        await writeFile(path, html);
        pages++;
      }
    }
  }
  await visit(directory);
  if (!pages) throw new Error('No exported HTML to secure');
  console.log(`Applied hashed script policies to ${pages} static pages.`);
}

if (process.argv[1]?.endsWith('/secure-static-export.mjs')) await secureExport();
