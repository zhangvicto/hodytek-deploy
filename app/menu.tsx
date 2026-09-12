"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { catalogCategories } from "./catalog";
import { Arrow } from "./ui";

export default function Menu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productMenu = useRef<HTMLLIElement>(null);
  const productToggle = useRef<HTMLButtonElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!productMenu.current?.contains(event.target as Node))
        setProductsOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          if (productsOpen) {
            productToggle.current?.focus();
            setProductsOpen(false);
          } else {
            menuToggle.current?.focus();
            setOpen(false);
          }
        }
      }}
    >
      <div className="utility-bar">
        <div className="shell">
          <span>Industrial expertise. Global perspective.</span>
          <a href="mailto:inquiry@hodytek.com">
            inquiry@hodytek.com <Arrow diagonal />
          </a>
        </div>
      </div>
      <nav className="shell navigation" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Hodytek home">
          <Image src="/icons/hodytek-icon.svg" alt="" width={45} height={40} />
          <Image
            src="/icons/hodytek-text.svg"
            alt="Hodytek"
            width={150}
            height={41}
          />
        </Link>
        <button
          ref={menuToggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path
              d={open ? "m6 6 12 12M6 18 18 6" : "M3 6h18M3 12h18M3 18h18"}
            />
          </svg>
        </button>
        <ul
          id="main-navigation"
          className={`nav-links ${open ? "is-open" : ""}`}
        >
          <li>
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              aria-current={pathname === "/about" ? "page" : undefined}
            >
              About us
            </Link>
          </li>
          <li
            className="product-nav"
            ref={productMenu}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                setProductsOpen(false);
            }}
          >
            <div className="product-nav-label">
              <Link
                href="/product"
                aria-current={
                  pathname.startsWith("/product") ? "page" : undefined
                }
              >
                Products
              </Link>
              <button
                ref={productToggle}
                aria-label="Product categories"
                aria-expanded={productsOpen}
                aria-controls="product-navigation"
                onClick={() => setProductsOpen(!productsOpen)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="m4 7 6 6 6-6" />
                </svg>
              </button>
            </div>
            {productsOpen && (
              <ul id="product-navigation" className="product-dropdown">
                {catalogCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/product/${category.slug}`}
                      onClick={() => {
                        setProductsOpen(false);
                        setOpen(false);
                      }}
                    >
                      {category.name}
                      <Arrow diagonal />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/projects"
              aria-current={pathname === "/projects" ? "page" : undefined}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="button button-primary nav-contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
            >
              Contact us <Arrow />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
