"use client";

import publicDataURL from '../dataURL';
import Footer from '../footer';
import Menu from '../menu';
import { useState, useEffect } from 'react'
import Image from 'next/image';

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
                    We have a proven track record of providing supplies and support to successful projects. Browse through all of our sucessful projects here!
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
                const response = await fetch(publicDataURL('projects.json'));
                const data: Project[] = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="w-full px-10 lg:px-40 py-5 lg:h-screen block lg:flex">
            {/* Table of Contents */}
            <section className="mb-8 w-full border-r">
                <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
                <ul className="list-disc list-inside">
                    {projects.map((project) => (
                        <li key={project.id}>
                            <a href={`#project-${project.id}`} className="text-sky-900 hover:underline">
                                {project.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Projects Sections */}
            <div className="lg:mx-10 lg:h-screen overflow-y-scroll scroll-smooth">
                {projects.map((project) => (
                    <section id={`project-${project.id}`} key={project.id} className="mb-12">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>{project.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 lg:pr-5">
                            {project.images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    height={300}
                                    width={400}
                                    alt={`Image for ${project.title}`}
                                    className="w-full h-auto md:h-full md:w-auto rounded shadow"
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
