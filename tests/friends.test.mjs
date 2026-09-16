import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { prepareFriends } from '../scripts/prepare-friends.mjs';

test('Friends preserves originals, sorts files, strips derivative metadata and rebuilds cleanly', async () => {
  const root = await mkdtemp(join(tmpdir(), 'friends-test-'));
  try {
    const folder = join(root, 'public/friends');
    await mkdir(folder, { recursive: true });
    await sharp({ create: { width: 2400, height: 1600, channels: 3, background: '#999' } })
      .jpeg().withMetadata({ orientation: 6 }).toFile(join(folder, '002 photo.jpg'));
    await sharp({ create: { width: 320, height: 200, channels: 3, background: '#555' } })
      .png().toFile(join(folder, '001.png'));
    const before = await readFile(join(folder, '002 photo.jpg'));
    const photos = await prepareFriends(root);
    assert.deepEqual(photos.map(p => p.original), ['/friends/001.png', '/friends/002%20photo.jpg']);
    assert.equal(photos[0].width, 320);
    assert.equal(photos[0].variants.length, 1);
    assert.equal(photos[1].width / photos[1].height, 1600 / 2400);
    for (const photo of photos) for (const variant of photo.variants) {
      const metadata = await sharp(join(root, 'public', variant.src)).metadata();
      assert.ok(metadata.width <= 1920);
      assert.equal(metadata.exif, undefined);
      assert.equal(metadata.orientation, undefined);
    }
    assert.deepEqual(await readFile(join(folder, '002 photo.jpg')), before);
    await sharp({ create: { width: 100, height: 100, channels: 3, background: '#333' } })
      .png().toFile(join(folder, '000-new.png'));
    const appended = await prepareFriends(root);
    assert.deepEqual(appended.map(p => p.original),
      ['/friends/001.png', '/friends/002%20photo.jpg', '/friends/000-new.png']);
    assert.deepEqual((await prepareFriends(root)).map(p => p.original), appended.map(p => p.original));
    await rm(join(folder, '000-new.png'));
    await rm(join(folder, '001.png'));
    await rm(join(folder, '002 photo.jpg'));
    assert.deepEqual(await prepareFriends(root), []);
    assert.deepEqual(await readdir(join(root, 'public/friends-preview')), ['manifest.json']);
  } finally { await rm(root, { recursive: true, force: true }); }
});
