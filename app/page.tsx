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
    src: "/photograms/01-cassette-grid.jpg",
    alt: "A high-contrast photogram composed from overlapping cassette tapes",
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
    src: "/photograms/04-liquid-study.jpg",
    alt: "An abstract photogram of flowing cellular forms and textured residue",
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

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Kyan Chase, home">
          <span className="wordmark-initial">K</span>YAN{" "}
          <span className="wordmark-initial">C</span>HASE
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#photograms">Photograms</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>Form</span>
            <span>Light</span>
            <span>Space</span>
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
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="photograms"
        id="photograms"
        aria-labelledby="photograms-title"
      >
        <div className="photograms-intro">
          <p className="eyebrow">Darkroom experiments</p>
          <h2 id="photograms-title">Photograms</h2>
          <p>
            Images made without a camera—using objects, folded paper, and
            liquid materials directly on light-sensitive paper.
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

      <section className="about" id="about" aria-labelledby="about-title">
        <p className="eyebrow">About</p>
        <div className="about-grid">
          <h2 id="about-title">Kyan Chase</h2>
          <div className="about-copy">
            <p>
              I&apos;m Kyan Chase, a photographer and software developer based
              in Salt Lake City. I enjoy exploring new ways of making
              things—whether that&apos;s through film photography, darkroom
              experimentation, music, or code. This website is a collection of
              those projects as they continue to evolve.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">
          Kyan Chase
        </a>
        <p>Photographs, photograms, and selected work.</p>
        <a href="#top" aria-label="Back to top">
          Back to top ↑
        </a>
      </footer>
    </main>
  );
}
