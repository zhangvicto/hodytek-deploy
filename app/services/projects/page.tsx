"use client";

import Footer from '../../footer';
import Menu from '../../menu';
import { useState, useEffect } from 'react'

type Project = {
    id: number;
    title: string;
    description: string;
    images: string[];
  };  

export default function Page() {
    return (
        <div className="bg-white text-sky-900 inset-0 overflow-hidden">
            <Menu />
            {/* Basic Description */}
            <section className="mb-10 px-10 lg:px-40 pt-10">
                <h1 className="text-3xl font-bold mb-4">Our Projects</h1>
                <p className="text-lg">
                    Below is a comprehensive list of our projects. Explore each section to learn more about the individual projects and see related images.
                </p>
            </section>
            <ProjectsPage />
            <Footer />
        </div>
    )
}

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/projects.json');
                const data: Project[] = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="container px-10 lg:px-40">

            {/* Table of Contents */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
                <ul className="list-disc list-inside">
                    {projects.map((project) => (
                        <li key={project.id}>
                            <a href={`#project-${project.id}`} className="text-blue-500 hover:underline">
                                {project.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Projects Sections */}
            {projects.map((project) => (
                <section id={`project-${project.id}`} key={project.id} className="mb-12">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="mb-4">{project.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image for ${project.title}`}
                                className="w-full h-auto rounded shadow"
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};
