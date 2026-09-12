import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./ui";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="Hodytek home">
            <Image
              src="/icons/hodytek-icon.svg"
              alt=""
              width={40}
              height={36}
            />
            <Image
              src="/icons/hodytek-text.svg"
              alt="Hodytek"
              width={145}
              height={40}
            />
          </Link>
          <p>
            Products, expertise, and integrated solutions for the industries
            that move our world.
          </p>
          <span>Toronto, Canada · Serving clients worldwide</span>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/about">About us</Link>
          <Link href="/product">Our products</Link>
          <Link href="/projects">Our projects</Link>
        </div>
        <div>
          <h2>Get in touch</h2>
          <a href="mailto:inquiry@hodytek.com">
            inquiry@hodytek.com <Arrow diagonal />
          </a>
          <a href="tel:+16473856629">+1 647 385 6629</a>
          <Link href="/contact">
            Discuss your project <Arrow />
          </Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {new Date().getFullYear()} Hodytek Ltd. All rights reserved.
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
