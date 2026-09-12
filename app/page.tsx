import Image from "next/image";
import Link from "next/link";
import Carousel from "./carousel";
import ContactForm from "./contact-form";
import Footer from "./footer";
import Menu from "./menu";
import ProductGrid from "./product-grid";
import { catalogCategories } from "./catalog";
import { Arrow } from "./ui";

export default function Home() {
  return (
    <>
      <Menu />
      <main id="main-content">
        <Carousel />
        <div className="industry-strip">
          <div className="shell">
            <span>BUILT AROUND YOUR INDUSTRY</span>
            <p>Oil & gas</p>
            <i />
            <p>Marine & offshore</p>
            <i />
            <p>Energy</p>
            <i />
            <p>Industrial engineering</p>
          </div>
        </div>
        <section className="shell section about-intro">
          <div>
            <p className="eyebrow">THE HODYTEK ADVANTAGE</p>
            <h2>
              Technical expertise.
              <br />
              Practical solutions.
            </h2>
            <p className="lead">
              More than a supplier. A partner in your project’s success.
            </p>
            <p>
              Hodytek brings together quality industrial products, technical
              consulting, and integrated solutions. We connect your project with
              the right equipment and expertise, from initial specification to
              ongoing support.
            </p>
            <Link href="/about" className="text-link">
              Get to know Hodytek <Arrow />
            </Link>
          </div>
          <div className="intro-image">
            <Image
              src="/images/carousel3.jpg"
              alt="Marine vessel supported by industrial engineering"
              fill
              sizes="(max-width: 800px) 90vw, 550px"
            />
            <div className="image-caption">
              <span>BASED IN CANADA. CONNECTED GLOBALLY.</span>
              <p>
                Local commitment.
                <br />
                International reach.
              </p>
              <Arrow diagonal />
            </div>
          </div>
        </section>
        <section className="section product-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">OUR PRODUCT RANGE</p>
                <h2>Engineered for the task ahead.</h2>
              </div>
              <Link href="/product" className="text-link">
                View all products <Arrow />
              </Link>
            </div>
            <ProductGrid items={catalogCategories.slice(0, 4)} />
            <p className="range-note">
              From individual components to complete systems.{" "}
              <Link href="/contact">
                Let’s find the right fit for your project{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </p>
          </div>
        </section>
        <section className="services-section section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow light">WHAT WE BRING TO YOUR PROJECT</p>
                <h2>One partner. Complete support.</h2>
              </div>
              <p>
                Products, people, and practical expertise.
                <br />
                Working together from start to finish.
              </p>
            </div>
            <div className="service-grid">
              {[
                {
                  number: "01",
                  title: "Industrial supplies",
                  text: "A comprehensive range of cables, cable glands, sealing systems, and equipment for hazardous and industrial environments.",
                  link: "/product",
                  cta: "Explore our range",
                  icon: "M4 7 12 3l8 4v10l-8 4-8-4V7Zm0 0 8 4 8-4M12 11v10M8 5l8 4",
                },
                {
                  number: "02",
                  title: "Dedicated service",
                  text: "Pre-sales guidance, procurement support, and after-sales service, connecting owners, builders, and our international supplier network.",
                  link: "/about",
                  cta: "Our approach",
                  icon: "M12 3 4 7v5c0 5 8 9 8 9s8-4 8-9V7l-8-4Zm-4 9 3 3 5-6",
                },
                {
                  number: "03",
                  title: "Integrated solutions",
                  text: "Application-specific support from our technical team for cable systems, accessories, and equipment in demanding environments.",
                  link: "/contact",
                  cta: "Talk to our team",
                  icon: "M5 3v12m0 4v2M12 3v3m0 4v11M19 3v9m0 4v5M2 15h6M9 6h6m1 6h6",
                },
              ].map((service) => (
                <article key={service.number} className="service-card">
                  <div className="service-top">
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      aria-hidden="true"
                    >
                      <path d={service.icon} />
                    </svg>
                    <span>{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <Link href={service.link}>
                    {service.cta}
                    <Arrow />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="shell section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPERIENCE IN ACTION</p>
              <h2>Supporting complex projects.</h2>
            </div>
            <Link href="/projects" className="text-link">
              Explore our projects <Arrow />
            </Link>
          </div>
          <div className="featured-projects">
            {[
              {
                title: "Floating production systems",
                label: "MARINE & OFFSHORE",
                image: "/images/projects/FPSO.png",
                id: 1,
              },
              {
                title: "LNG infrastructure",
                label: "OIL & GAS",
                image: "/images/projects/yamal.png",
                id: 8,
              },
              {
                title: "Energy storage",
                label: "ENERGY",
                image: "/images/projects/energy-storage.png",
                id: 12,
              },
            ].map((project) => (
              <Link
                href={`/projects#project-${project.id}`}
                className="featured-project"
                key={project.id}
              >
                <div className="featured-project-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 700px) 90vw, 380px"
                  />
                </div>
                <div>
                  <p className="eyebrow">{project.label}</p>
                  <h3>
                    {project.title}
                    <Arrow diagonal />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
