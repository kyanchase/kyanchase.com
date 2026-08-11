import type { Metadata } from "next";
import { MotionSection, SiteFooter, SiteHeader } from "../portfolio";

export const metadata: Metadata = {
  title: "Motion — Kyan Chase",
  description:
    "Video edits, travel films, and recorded DJ sets by Kyan Chase.",
};

export default function MotionPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <MotionSection standalone />
      <SiteFooter />
    </main>
  );
}
