import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kyanchase.com"),
  title: "Kyan Chase — Photographer & Maker",
  description:
    "Selected black-and-white photographs by Kyan Chase, exploring form, light, texture, and negative space.",
  openGraph: {
    title: "Kyan Chase — Form, Light & Space",
    description:
      "Selected black-and-white photographs exploring architecture, texture, and negative space.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kyan Chase — Form, Light & Space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyan Chase — Form, Light & Space",
    description:
      "Selected black-and-white photographs exploring architecture, texture, and negative space.",
    images: ["/og.png"],
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
        {children}
        <Script
          id="cloudflare-web-analytics"
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"5fc6bdbc74a346049c45dade1c6955ff"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
