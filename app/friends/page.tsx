import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SiteFooter, SiteHeader } from "../portfolio";

export const metadata: Metadata = { title: "Friends — Kyan Chase" };

type Photo = {
  original: string;
  src: string;
  width: number;
  height: number;
  variants: { src: string; width: number }[];
};

export default async function FriendsPage() {
  const photos: Photo[] = JSON.parse(
    await readFile(join(process.cwd(), "public/friends-preview/manifest.json"), "utf8"),
  );
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <section className="work standalone-section friends-section" aria-labelledby="friends-title">
        <div className="section-intro">
          <h1 className="section-title" id="friends-title">Friends</h1>
        </div>
        <div className="gallery friends-gallery">
          {photos.map((photo) => (
            <figure className="gallery-item friend-photo" key={photo.original}>
              {/* Static export uses browsing derivatives generated before the build. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src}
                srcSet={photo.variants.map(v => `${v.src} ${v.width}w`).join(", ")}
                sizes="(max-width: 600px) 92vw, 44vw"
                width={photo.width} height={photo.height}
                alt="Photograph of friends" loading="lazy" decoding="async" />
              <a className="friend-download" href={photo.original} download aria-label="Download photograph">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
                </svg>
              </a>
            </figure>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
