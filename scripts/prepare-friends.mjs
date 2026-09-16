import { readdir, readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

export async function prepareFriends(root = process.cwd()) {
  const source = join(root, 'public/friends');
  const output = join(root, 'public/friends-preview');
  await mkdir(source, { recursive: true });
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  const files = (await readdir(source, { withFileTypes: true }))
    .filter(entry => entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name))
    .map(entry => entry.name).sort();
  // Retain established order; newly added files follow it.
  const orderPath = join(source, 'order.json');
  let savedOrder = [];
  try { savedOrder = JSON.parse(await readFile(orderPath, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const orderedFiles = [...savedOrder.filter(name => files.includes(name)),
    ...files.filter(name => !savedOrder.includes(name))];
  const photos = [];
  for (const [index, filename] of orderedFiles.entries()) {
    const input = join(source, filename);
    const variants = [];
    for (const size of [640, 1280, 1920]) {
      const name = `${index}-${size}.webp`;
      // Sharp strips metadata by default; rotate honors camera orientation.
      const info = await sharp(input).rotate().resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 85 }).toFile(join(output, name));
      if (!variants.some(variant => variant.width === info.width)) {
        variants.push({ src: `/friends-preview/${name}`, width: info.width, height: info.height });
      }
    }
    const largest = variants.at(-1);
    photos.push({ original: `/friends/${encodeURIComponent(filename)}`, ...largest, variants });
  }
  await writeFile(join(output, 'manifest.json'), JSON.stringify(photos));
  await writeFile(orderPath, JSON.stringify(orderedFiles, null, 2) + '\n');
  return photos;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(`Prepared ${(await prepareFriends()).length} Friends photographs.`);
}
