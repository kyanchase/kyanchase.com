import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#101010",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kyanchase.com"),
  title: "Kyan Chase — Photographer & Maker",
  description:
    "Selected black-and-white photographs by Kyan Chase, exploring form, light, texture, and negative space.",
  openGraph: {
    title: "Kyan Chase",
    description:
      "Selected black-and-white photographs exploring architecture, texture, and negative space.",
    type: "website",
    images: [
      {
        url: "/share-photo.jpg",
        width: 1232,
        height: 1232,
        alt: "Curving light and dark architectural walls against an open sky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyan Chase",
    description:
      "Selected black-and-white photographs exploring architecture, texture, and negative space.",
    images: ["/share-photo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.querySelector(\'meta[name="viewport"]\')?.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");',
          }}
        />
        {children}
        <script src="/photo-controls.js" defer />
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"4f2f57f4282d4ecdb513d1e0dac89992"}'
        />
      </body>
    </html>
  );
}
