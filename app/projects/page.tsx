import Image from "next/image";
import Menu from "../menu";
import Footer from "../footer";
import { PageHeading, ProjectCTA } from "../ui";
import projects from "../../public/projects.json";
export default function Page() {
  return (
    <>
      <Menu />
      <main id="main-content">
        <PageHeading
          label="OUR PROJECT EXPERIENCE"
          title="Supporting ambition. Delivering expertise."
          description="From offshore production vessels to energy infrastructure, explore the projects we have supported with industrial supplies and technical expertise."
        />
        <section className="shell section">
          <nav className="project-jump" aria-label="Jump to a project">
            {projects.map((project) => (
              <a key={project.id} href={`#project-${project.id}`}>
                {project.title}
              </a>
            ))}
          </nav>
          <div className="project-list">
            {projects.map((project, index) => (
              <article
                id={`project-${project.id}`}
                key={project.id}
                className="project-detail"
              >
                <div>
                  <p className="eyebrow">
                    PROJECT {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
                <div className="project-photos">
                  {project.images.map((image, imageIndex) => (
                    <div key={image}>
                      <Image
                        src={image}
                        alt={`${project.title} — project view ${imageIndex + 1}`}
                        fill
                        sizes={
                          imageIndex === 0
                            ? "(max-width: 800px) 90vw, 750px"
                            : "(max-width: 800px) 45vw, 370px"
                        }
                      />
                    </div>
                  ))}
                </div>
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
