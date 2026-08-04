import {
  AboutSection,
  PhotogramsSection,
  SiteFooter,
  SiteHeader,
  WorkSection,
} from "./portfolio";

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <h1 className="visually-hidden" id="hero-title">
          Kyan Chase
        </h1>
        <div className="hero-geometry" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
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
