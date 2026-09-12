"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./ui";
const slides = [
  {
    image: "/images/carousel1.webp",
    label: "Marine & offshore",
    title: "Expertise that keeps your projects moving.",
    text: "Industrial products and integrated solutions for oil & gas, marine, and offshore engineering.",
    alt: "Offshore vessel and industrial infrastructure",
  },
  {
    image: "/images/refinery.avif",
    label: "Oil & gas",
    title: "Solutions for demanding environments.",
    text: "Cable systems, hazardous area equipment, and technical support aligned with your project requirements.",
    alt: "Oil and gas refinery infrastructure",
  },
  {
    image: "/images/carousel2-transformed.webp",
    label: "Industrial & energy",
    title: "Connecting products. Supporting progress.",
    text: "From product selection to project delivery, a committed partner for your industrial and energy applications.",
    alt: "Industrial engineering and energy infrastructure",
  },
];
export default function Carousel() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  return (
    <section
      className="hero"
      aria-label="Industries we support"
      aria-roledescription="carousel"
    >
      <Image
        key={slide.image}
        src={slide.image}
        alt={slide.alt}
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
      <div className="hero-shade" />
      <div className="shell hero-inner">
        <div className="hero-copy" aria-live="polite">
          <p className="eyebrow light">
            <span /> YOUR PARTNER IN INDUSTRIAL SOLUTIONS
          </p>
          <h1>{slide.title}</h1>
          <p className="hero-description">{slide.text}</p>
          <div className="button-row">
            <Link href="/product" className="button button-bright">
              Explore our products <Arrow />
            </Link>
            <Link href="/about" className="button button-outline">
              Discover Hodytek <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="hero-tabs">
            {slides.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={active === index ? "active" : ""}
              >
                <span>0{index + 1}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="hero-controls">
            <button
              aria-label="Previous industry"
              onClick={() =>
                setActive((active + slides.length - 1) % slides.length)
              }
            >
              ←
            </button>
            <button
              aria-label="Next industry"
              onClick={() => setActive((active + 1) % slides.length)}
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
