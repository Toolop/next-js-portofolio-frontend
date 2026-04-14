"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchWorkHistory, WorkHistoryData } from "@/data/mockApi";

const WorkHistoryItem = ({ data, isActive }: { data: WorkHistoryData; isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.98
      }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 py-12 border-b border-white/10 last:border-0 transition-colors"
    >
      {/* Year Column */}
      <div className="md:col-span-3">
        <span className={`text-sm font-medium tracking-widest ${isActive ? "text-[#81ECFF]" : "text-[#292A28]"}`}>
          {data.year}
        </span>
      </div>

      {/* Role & Company Column */}
      <div className="md:col-span-5">
        <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isActive ? "text-white" : "text-[#292A28]"}`}>
          {data.role}
        </h3>
        <p className={`text-sm tracking-widest ${isActive ? "text-white/70" : "text-[#292A28]/50"}`}>
          {data.company}
        </p>
      </div>

      {/* Description Column */}
      <div className="md:col-span-4">
        <p className={`text-sm leading-relaxed ${isActive ? "text-white/60" : "text-[#292A28]/40"}`}>
          {data.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function ProjectArchives() {
  const [workHistory, setWorkHistory] = useState<WorkHistoryData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchWorkHistory();
      setWorkHistory(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const observers = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px", // Trigger when in the middle 20% of the screen
        threshold: 0,
      }
    );

    const elements = document.querySelectorAll("[data-work-item]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [workHistory]);

  return (
    <section id="work-history" className="bg-gradient-to-b from-[#020201] to-[#0a0a0a] relative py-24 px-6 md:px-12 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter uppercase inline-block border-b-2 border-[#81ECFF] pb-1">
            Project Archives
          </h2>
        </div>

        <div className="space-y-0">
          {workHistory.map((item, index) => (
            <div
              key={item.id}
              data-work-item
              data-index={index}
              className="relative"
            >
              <WorkHistoryItem
                data={item}
                isActive={activeIndex === index}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
