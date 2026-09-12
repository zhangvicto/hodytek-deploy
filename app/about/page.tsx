import Image from "next/image";
import Link from "next/link";
import Footer from "../footer";
import Menu from "../menu";
import { Arrow, PageHeading, ProjectCTA } from "../ui";
export default function Page() {
  return (
    <>
      <Menu />
      <main id="main-content">
        <PageHeading
          label="ABOUT HODYTEK"
          title="Industrial expertise. Personal commitment."
          description="We provide products, consulting, and integrated solutions for oil & gas, marine, offshore engineering, and related industries."
        />
        <section className="shell section about-intro">
          <div>
            <p className="eyebrow">A PARTNER IN YOUR SUCCESS</p>
            <h2>
              Global connections.
              <br />
              Practical expertise.
            </h2>
            <p className="lead">
              Connecting your project with the right products and people.
            </p>
            <p>
              As an agent for brands from Europe, the United States, Korea, and
              China, Hodytek brings advanced technology and quality products to
              the global market. We work with design firms, engineering
              companies, and shipyards across China and Southeast Asia.
            </p>
            <p>
              Our support extends from product selection and technical guidance
              through to after-sales service, aligning our solutions with your
              project’s specific requirements.
            </p>
            <Link href="/projects" className="text-link">
              Explore our project experience <Arrow />
            </Link>
          </div>
          <div className="intro-image">
            <Image
              src="/images/about-us-bg.jpeg"
              alt="Marine and offshore industrial operations"
              fill
              sizes="(max-width: 800px) 90vw, 550px"
            />
          </div>
        </section>
        <section className="product-section section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">WHAT GUIDES US</p>
                <h2>A commitment you can build on.</h2>
              </div>
            </div>
            <div className="values-grid">
              <article>
                <h3>Professionalism</h3>
                <p>
                  Technical knowledge and attentive service, focused on
                  understanding your application and meeting your project needs.
                </p>
              </article>
              <article>
                <h3>Integrity</h3>
                <p>
                  Clear communication and lasting relationships with our
                  clients, suppliers, and engineering partners.
                </p>
              </article>
              <article>
                <h3>Practical thinking</h3>
                <p>
                  Reliable products and effective solutions that address real
                  challenges in demanding industrial environments.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="shell section about-intro">
          <div>
            <p className="eyebrow">OUR REACH</p>
            <h2>
              Based in Toronto.
              <br />
              Connected to the world.
            </h2>
            <p className="lead">
              Supporting clients across borders and industries.
            </p>
            <p>
              Our international network supports projects in oil & gas, marine
              and offshore engineering, energy, telecommunications, sensors and
              instruments, and construction.
            </p>
            <Link href="/contact" className="text-link">
              Connect with our team <Arrow />
            </Link>
          </div>
          <div className="intro-image">
            <Image
              src="/images/map.png"
              alt="World map illustrating Hodytek’s international reach"
              fill
              sizes="(max-width: 800px) 90vw, 550px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </section>
        <ProjectCTA />
      </main>
      <Footer />
    </>
  );
}
