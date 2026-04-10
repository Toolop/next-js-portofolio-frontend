"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ProjectData } from "@/data/mockApi";

export default function ProjectCard({ project }: { project: ProjectData }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full rounded-xl bg-neutral-900 border border-white/10 p-4 transition-colors hover:bg-neutral-800/50 group"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Placeholder for Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-neutral-800 mb-6">
          <div className="absolute inset-0 flex items-center justify-center text-[#81ECFF]/20 font-bold text-4xl">
            {project.title.split(" ")[0]}
          </div>
          <div className="absolute top-2 right-2 bg-[#81ECFF] text-black text-[10px] font-bold px-2 py-1 rounded">
            {project.category}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#81ECFF] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-400 mb-6 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          className="inline-block w-full text-center border border-white/20 py-2 rounded text-xs tracking-widest hover:bg-white hover:text-black transition-all"
        >
          VIEW SPECS
        </a>
      </div>
    </motion.div>
  );
}
