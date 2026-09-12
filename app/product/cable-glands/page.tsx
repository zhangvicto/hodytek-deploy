import Image from "next/image";
import Link from "next/link";
import Menu from "../../menu";
import Footer from "../../footer";
import { Arrow, PageHeading, ProjectCTA } from "../../ui";
const groups = [
  {
    title: "Cable glands",
    image: "/images/oscg-cable-gland.jpg",
    options: [
      {
        label: "Hazardous area cable glands",
        url: "https://oscg.net/bbs/board.php?bo_table=lev_1_1",
      },
      {
        label: "Industrial cable glands",
        url: "https://oscg.net/bbs/board.php?bo_table=lev_1_2",
      },
      {
        label: "NEC standard cable glands",
        url: "https://oscg.net/bbs/board.php?bo_table=lev_1_3",
      },
    ],
  },
  {
    title: "Accessories",
    image: "/images/oscg-accessories.jpg",
    options: [
      {
        label: "Ex-certified accessories",
        url: "https://oscg.net/bbs/board.php?bo_table=lev_2_1&sca=Ex%20Certified%20Accessories",
      },
      {
        label: "Gland accessories",
        url: "https://oscg.net/bbs/board.php?bo_table=lev_2_1&sca=Gland%20Accessories",
      },
    ],
  },
];
export default function Page() {
  return (
    <>
      <Menu />
      <main id="main-content">
        <PageHeading
          label="PRODUCT RANGE"
          title="Cable glands & accessories"
          description="Explore cable glands and accessories for hazardous and industrial environments. Product links open the OSCG manufacturer catalog in a new tab."
        />
        <section className="shell section">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/product">All products</Link>
            <span aria-hidden="true">/</span>
            <span>Cable glands & accessories</span>
          </nav>
          <div className="gland-grid">
            {groups.map((group) => (
              <article key={group.title} className="gland-card">
                <div className="gland-image">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    sizes="(max-width: 550px) 90vw, 550px"
                  />
                </div>
                <h2>{group.title}</h2>
                {group.options.map((option) => (
                  <a
                    href={option.url}
                    key={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {option.label}
                    <Arrow diagonal />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ))}
              </article>
            ))}
          </div>
        </section>
        <ProjectCTA />
      </main>
      <Footer />
    </>
  );
}
