import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../portfolio";
import styles from "./shop.module.css";

export const metadata: Metadata = {
  title: "Print Shop — Kyan Chase",
  description: "Two square photographic prints by Kyan Chase, shown in a concept for a clear acrylic wall mount.",
};

const prints = ["Prior Performing Arts Center", "Rusting Fire Truck"];

export default function ShopPage() {
  return (
    <main className={styles.shop} id="top">
      <SiteHeader />
      <h1 className="visually-hidden">Print Shop</h1>

      <section className={styles.gallery} aria-label="Prints">
        <p className={styles.printDetails}>
          Photographed on medium-format film with a Ciro-flex. Each 24″ × 24″
          print is mounted in a 26″ × 26″ clear acrylic frame.
        </p>
        <img
          className={styles.installation}
          src="/shop/acrylic-installation.webp"
          width={1683}
          height={935}
          alt="Prior Performing Arts Center and Rusting Fire Truck in clear acrylic on a plain wall"
        />
        <ul className={styles.prints}>
          {prints.map((title) => (
            <li key={title}>
              <h2>{title}</h2>
              <a
                href={`mailto:create@kyanchase.com?subject=${encodeURIComponent(`Print inquiry — ${title}`)}`}
                aria-label={`Inquire about ${title}`}
              >
                Inquire
              </a>
            </li>
          ))}
        </ul>
        <img
          className={styles.installation}
          src="/shop/mountain-interior.webp"
          width={1672}
          height={941}
          loading="lazy"
          alt="Prior Performing Arts Center displayed in a modern alpine home with curved windows"
        />
        <img
          className={styles.installation}
          src="/shop/coastal-interior.webp"
          width={1672}
          height={941}
          loading="lazy"
          alt="Rusting Fire Truck displayed in a modern coastal home overlooking the ocean at dusk"
        />
      </section>

      <SiteFooter />
    </main>
  );
}
