"use client";

import React, { useEffect, useState } from "react";
import { fetchProjects, ProjectData } from "@/data/mockApi";
import ProjectCard from "./ProjectCard";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <section id="projects" className="py-24 bg-[#020201] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter uppercase inline-block border-b-2 border-[#81ECFF] pb-1">
              Project Archives
            </h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-[#81ECFF] text-[10px] tracking-widest font-bold uppercase hover:opacity-70 transition-opacity">
            All Nodes <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
