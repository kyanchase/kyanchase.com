const photographs = [
  {
    src: "/work/01-architecture-curves.jpeg",
    alt: "Curving light and dark architectural walls against an open sky",
    number: "01",
  },
  {
    src: "/work/03-broken-windshield.jpeg",
    alt: "The interior of an abandoned vehicle seen through a shattered windshield",
    number: "02",
  },
  {
    src: "/work/02-tree-architecture.jpeg",
    alt: "A flowering tree framed by a geometric building and overhanging roof",
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

const photograms = [
  {
    src: "/photograms/04-liquid-study.jpg",
    alt: "An abstract photogram of flowing cellular forms and textured residue",
    number: "01",
  },
  {
    src: "/photograms/02-organic-negative-dark.jpg",
    alt: "A dark organic photogram filled with rings, bubbles, and granular marks",
    number: "02",
  },
  {
    src: "/photograms/03-organic-negative-light.jpg",
    alt: "A light organic photogram with dark droplets and circular voids",
    number: "03",
  },
  {
    src: "/photograms/01-cassette-grid.jpg",
    alt: "A high-contrast photogram composed from overlapping cassette tapes",
    number: "04",
  },
  {
    src: "/photograms/05-loop-study.jpg",
    alt: "An abstract photogram of translucent loops against a dark ground",
    number: "05",
  },
  {
    src: "/photograms/06-folded-paper.jpg",
    alt: "A dark photogram of layered folded paper forms",
    number: "06",
  },
  {
    src: "/photograms/07-line-study.jpg",
    alt: "A sparse photogram of hand-drawn black lines on a white ground",
    number: "07",
  },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Kyan Chase, home">
        <span className="wordmark-initial">K</span>YAN{" "}
        <span className="wordmark-initial">C</span>HASE
      </a>
      <nav aria-label="Main navigation">
        <a href="/work/">Work</a>
        <a href="/photograms/">Photograms</a>
        <a href="/#about">About</a>
      </nav>
    </header>
  );
}

export function AboutSection() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="section-geometry about-geometry" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="eyebrow">About</p>
      <div className="about-grid">
        <h2 id="about-title">Kyan Chase</h2>
        <div className="about-copy">
          <p>
            I&apos;m Kyan Chase, a photographer and software developer based in
            Salt Lake City. I enjoy exploring new ways of making things—whether
            that&apos;s through film photography, darkroom experimentation,
            music, or code. This website is a collection of those projects as
            they continue to evolve.
          </p>
          <div className="social-links" aria-label="Contact Kyan">
            <a
              href="mailto:create@kyanchase.com"
              aria-label="Email Kyan at create at kyanchase dot com"
            >
              <span className="mail-mark" aria-hidden="true" />
              <span>
                <strong>create@kyanchase.com</strong>
                <small>Email</small>
              </span>
            </a>
            <a
              href="https://www.instagram.com/kyanchase_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Kyan Chase on Instagram, main account"
            >
              <span className="instagram-mark" aria-hidden="true" />
              <span>
                <strong>@kyanchase_</strong>
                <small>Main</small>
              </span>
            </a>
            <a
              href="https://www.instagram.com/kyan.mp4/"
              target="_blank"
              rel="noreferrer"
              aria-label="Kyan dot MP4 on Instagram, video edits"
            >
              <span className="instagram-mark" aria-hidden="true" />
              <span>
                <strong>@kyan.mp4</strong>
                <small>Video + edits</small>
              </span>
            </a>
            <a
              href="https://www.instagram.com/kyanscamera/"
              target="_blank"
              rel="noreferrer"
              aria-label="Kyan's Camera on Instagram, photography"
            >
              <span className="instagram-mark" aria-hidden="true" />
              <span>
                <strong>@kyanscamera</strong>
                <small>Photography</small>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      className={`work${standalone ? " standalone-section" : ""}`}
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-geometry work-geometry" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="section-intro">
        <p className="eyebrow">Selected work</p>
        {standalone ? (
          <h1 className="section-title" id="work-title">
            Six photographs
          </h1>
        ) : (
          <h2 id="work-title">Five selected photographs</h2>
        )}
        <p>
          Geometry, texture, and human traces—held together by the space around
          them.
        </p>
      </div>

      <div className={`gallery${standalone ? " gallery-full" : ""}`}>
        {photographs.map((photo, index) => (
          <figure
            className={`gallery-item gallery-item-${index + 1}`}
            key={photo.src}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>
              <span>{photo.number}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function PhotogramsSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section
      className={`photograms${standalone ? " standalone-section" : ""}`}
      id="photograms"
      aria-labelledby="photograms-title"
    >
      <div className="section-geometry photograms-geometry" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="photograms-intro">
        <p className="eyebrow">Darkroom experiments</p>
        {standalone ? (
          <h1 className="section-title" id="photograms-title">
            Photograms
          </h1>
        ) : (
          <h2 id="photograms-title">Photograms</h2>
        )}
        <p>
          Images made without a camera—using objects, folded paper, and liquid
          materials directly on light-sensitive paper.
        </p>
        <p className="archive-note">
          Working documentation · final scans forthcoming
        </p>
      </div>

      <div className="photogram-grid">
        {photograms.map((photogram, index) => (
          <figure
            className={`photogram-item photogram-item-${index + 1}`}
            key={photogram.src}
          >
            <div className="photogram-mat">
              <img
                src={photogram.src}
                alt={photogram.alt}
                loading="lazy"
              />
            </div>
            <figcaption aria-hidden="true">{photogram.number}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <a className="wordmark" href="/">
        Kyan Chase
      </a>
      <p>Photographs, photograms, and selected work.</p>
      <a href="#top" aria-label="Back to top">
        Back to top ↑
      </a>
    </footer>
  );
}
