import type { Metadata } from "next";
import {
  PhotogramsSection,
  SiteFooter,
  SiteHeader,
} from "../portfolio";

export const metadata: Metadata = {
  title: "Photograms — Kyan Chase",
  description:
    "Camera-less darkroom experiments made with objects, paper, and liquid materials.",
};

export default function PhotogramsPage() {
  return (
    <main className="inner-page" id="top">
      <SiteHeader />
      <PhotogramsSection standalone />
      <SiteFooter />
    </main>
  );
}
