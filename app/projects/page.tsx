"use client";

import publicDataURL from '../dataURL';
import Footer from '../footer';
import Menu from '../menu';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Project = {
  id: number;
  title: string;
  description: string;
  images: string[];
};

export default function Page() {
  return (
    <div className="bg-white text-sky-900 inset-0">
      <Menu />
      {/* Basic Description */}
      <section className="mb-10 px-10 lg:px-40 pt-10">
        <h1 className="text-3xl font-bold mb-4">Our Projects</h1>
        <p className="text-lg">
          We have a proven track record of providing supplies and support to successful projects. Browse through all of our successful projects here!
        </p>
      </section>
      <ProjectsPage />
      <Footer />
    </div>
  );
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const sectionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(publicDataURL('projects.json'));
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (!projects.length) {
    return <div>Loading...</div>;
  }

  // Handle link click
  const handleLinkClick = (projectId: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const container = containerRef.current;
    const targetElement = sectionRefs.current[projectId];

    if (targetElement) {
      if (container && window.innerWidth >= 1024) {
        // On large screens (lg breakpoint and above), scroll within the container
        const scrollOffset = targetElement.offsetTop - container.offsetTop;

        container.scrollTo({
          top: scrollOffset,
          behavior: 'smooth',
        });
      } else {
        // On mobile devices, scroll the window
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle Back to Top button click
  const handleBackToTop = () => {
    if (containerRef.current && window.innerWidth >= 1024) {
      // On large screens, scroll the container to top
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // On mobile devices, scroll the window to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full px-10 lg:px-40 py-5 block lg:flex relative">
      {/* Table of Contents */}
      <div className="w-full lg:w-1/4 h-full px-10 py-10 lg:mr-5 mb-5 lg:mb-0 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Table of Contents</h2>
        <ul className="list-disc list-inside text-gray-700">
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              <a
                href={`#project-${project.id}`}
                onClick={handleLinkClick(project.id)}
                className="text-sky-900 hover:underline transition-all duration-200 ease-in-out hover:text-sky-700"
              >
                {project.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects Section */}
      <div
        className="lg:mx-5 lg:h-screen lg:overflow-y-scroll lg:flex-1"
        ref={containerRef}
      >
        {projects.map((project) => (
          <div
            id={`project-${project.id}`}
            key={project.id}
            ref={(el) => {
              sectionRefs.current[project.id] = el;
            }}
            className="mb-12 lg:mb-20 mx-5 mt-10"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
            <p
              className="mb-4 text-gray-600"
              style={{ whiteSpace: 'pre-line' }}
            >
              {project.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 lg:pr-5">
              {project.images.map((image, idx) => (
                <div key={idx} className="relative h-40 md:h-60">
                  <Image
                    src={image}
                    fill
                    objectFit="cover"
                    alt={`Image for ${project.title}`}
                    className="md:h-full md:w-auto rounded-sm shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back to Top Button */}
      <button
        onClick={handleBackToTop}
        className="
          fixed
          h-16
          w-16
          bottom-5
          left-5
          bg-sky-900
          text-white
          p-4
          rounded-full
          shadow-lg
          hover:bg-sky-700
          transition
          duration-300
          ease-in-out
          lg:hidden
        "
        aria-label="Back to Top"
      >
        ↑
      </button>
    </div>
  );
};
