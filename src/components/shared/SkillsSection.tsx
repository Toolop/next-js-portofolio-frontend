"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSkills, SkillCategory } from "@/data/mockApi";

export default function SkillsSection() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);

  useEffect(() => {
    fetchSkills().then(setSkills);
  }, []);

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-[#020201] to-[#0a0a0a] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter uppercase inline-block border-b-2 border-[#81ECFF] pb-1">
              Core Modules & Stack
            </h2>
            <p className="text-neutral-500 text-sm mt-4 max-w-xl">
              Systems architecture built on robust, scalable, and high-performance technologies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-neutral-900/40 border border-white/5 p-8 rounded-xl relative group overflow-hidden"
            >
              {/* Card Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#81ECFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px bg-gradient-to-r from-[#81ECFF] to-transparent w-8"></div>
                  <h3 className="text-[#81ECFF] text-xs font-black tracking-[0.2em] uppercase">
                    {cat.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((item, itemIdx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (idx * 0.1) + (itemIdx * 0.05) }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(129, 236, 255, 0.1)",
                        borderColor: "rgba(129, 236, 255, 0.5)",
                        color: "#ffffff"
                      }}
                      className="px-4 py-2 border border-white/10 rounded-md text-sm text-neutral-400 bg-neutral-950/50 backdrop-blur-sm cursor-default transition-all duration-300"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Decorative Corner accents */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#81ECFF]/30 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#81ECFF]/30 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
