const photographs = [
  {
    src: "/work/01-architecture-curves.jpeg",
    alt: "Curving light and dark architectural walls against an open sky",
    number: "01",
  },
  {
    src: "/work/02-tree-architecture.jpeg",
    alt: "A flowering tree framed by a geometric building and overhanging roof",
    number: "02",
  },
  {
    src: "/work/03-broken-windshield.jpeg",
    alt: "The interior of an abandoned vehicle seen through a shattered windshield",
    number: "03",
  },
  {
    src: "/work/04-peeling-steel.jpeg",
    alt: "Peeling paint and hardware across a textured steel surface",
    number: "04",
  },
  {
    src: "/work/05-industrial-wall.jpeg",
    alt: "Graffiti, handles, shadows, and worn paint on an industrial wall",
    number: "05",
  },
  {
    src: "/work/06-under-structure.jpeg",
    alt: "A low view beneath a decaying structure with a beam suspended above debris",
    number: "06",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Kyan Chase, home">
          Kyan Chase
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Photographs · 2026</p>
          <h1 id="hero-title">
            Form,
            <br />
            light &amp; space.
          </h1>
          <p className="hero-note">
            Black-and-white photographs exploring the tension between the
            natural and the built.
          </p>
        </div>
        <figure className="hero-image">
          <img
            src="/work/01-architecture-curves.jpeg"
            alt="Curving light and dark architectural walls against an open sky"
          />
          <figcaption>
            <span>Untitled</span>
            <span>Silver gelatin / medium format</span>
          </figcaption>
        </figure>
        <a className="scroll-cue" href="#work">
          View selected work <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Six photographs</h2>
          <p>
            Geometry, texture, and human traces—held together by the space
            around them.
          </p>
        </div>

        <div className="gallery">
          {photographs.map((photo, index) => (
            <figure
              className={`gallery-item gallery-item-${index + 1}`}
              key={photo.src}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>
                <span>{photo.number}</span>
                <span>Untitled</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <p className="eyebrow">About</p>
        <div className="about-grid">
          <h2 id="about-title">Kyan Chase</h2>
          <div className="about-copy">
            <p>
              Kyan Chase is a photographer and multidisciplinary maker. His
              work finds quiet relationships between architecture, texture,
              light, and negative space.
            </p>
            <p>
              Working across film photography, photograms, music, and
              technology, he is interested in structure emerging from chance.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">
          Kyan Chase
        </a>
        <p>Photography and selected work.</p>
        <a href="#top" aria-label="Back to top">
          Back to top ↑
        </a>
      </footer>
    </main>
  );
}
