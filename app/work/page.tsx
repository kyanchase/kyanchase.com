import type { Metadata } from "next";
import { SiteFooter, SiteHeader, WorkSection } from "../portfolio";

export const metadata: Metadata = {
  title: "Work — Kyan Chase",
  description:
    "Selected black-and-white photographs by Kyan Chase exploring form, texture, and space.",
};

export default function WorkPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <WorkSection standalone />
      <SiteFooter />
    </main>
  );
}
