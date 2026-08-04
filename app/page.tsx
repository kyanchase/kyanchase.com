import {
  AboutSection,
  PhotogramsSection,
  SiteFooter,
  SiteHeader,
  WorkSection,
} from "./portfolio";

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>Form</span>
            <span>Light</span>
            <span>Space</span>
          </h1>
        </div>
        <figure className="hero-image">
          <img
            src="/work/01-architecture-curves.jpeg"
            alt="Curving light and dark architectural walls against an open sky"
          />
        </figure>
        <a className="scroll-cue" href="#about" aria-label="Scroll to About">
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <AboutSection />
      <WorkSection />
      <PhotogramsSection />
      <SiteFooter />
    </main>
  );
}
