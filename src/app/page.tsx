"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { portfolioData } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import { 
  Code2, 
  Cpu, 
  Globe, 
  Layout, 
  Server, 
  Smartphone 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section id="home" className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="container relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 bg-opacity-50 leading-tight">
            {portfolioData.name}
          </h1>
          <p className="mt-6 font-medium text-lg md:text-xl text-neutral-400 max-w-2xl text-center mx-auto leading-relaxed">
            {portfolioData.role}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#projects" 
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}
            >
              Explore Work
            </Link>
            <Link 
              href="#contact" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8 backdrop-blur-sm")}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Bento Grid */}
      <section id="skills" className="py-24 container px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">About Experience</h2>
        <BentoGrid className="max-w-4xl mx-auto">
          <BentoGridItem
            title="Fullstack Development"
            description="Expertise in both frontend and backend technologies to build end-to-end solutions."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><Code2 className="w-10 h-10 text-primary" /></div>}
            icon={<Layout className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-2"
          />
          <BentoGridItem
            title="Cloud Native"
            description="Scalable infrastructure with Docker."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><Server className="w-10 h-10 text-primary" /></div>}
            icon={<Globe className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-1"
          />
          <BentoGridItem
            title="Architecture"
            description="Designing robust and maintainable systems."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><Cpu className="w-10 h-10 text-primary" /></div>}
            icon={<Smartphone className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-1"
          />
          <BentoGridItem
            title="Passion for Learning"
            description={portfolioData.bio}
            className="md:col-span-2"
          />
        </BentoGrid>
      </section>

      {/* Projects Section - 3D Cards */}
      <section id="projects" className="py-24 container px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">Featured Projects</h2>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
          {portfolioData.projects.map((project, index) => (
            <CardContainer key={index} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {project.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {project.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="h-40 w-full bg-gradient-to-br from-neutral-200 to-neutral-400 dark:from-neutral-800 dark:to-neutral-900 rounded-xl group-hover/card:shadow-xl flex items-center justify-center font-bold text-neutral-500 italic">
                    Project Preview
                  </div>
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                  <div className="flex gap-2">
                    {project.tech.map(t => (
                      <CardItem
                        key={t}
                        translateZ={20}
                        as="span"
                        className="px-2 py-1 rounded-sm text-xs bg-gray-100 dark:bg-white/[0.1] text-neutral-500 dark:text-neutral-300"
                      >
                        {t}
                      </CardItem>
                    ))}
                  </div>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    View Project
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>
    </div>
  );
}
