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
    <section id="skills" className="py-24 bg-[#020201]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter uppercase inline-block border-b-2 border-[#81ECFF] pb-1">
            Core Modules & Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-[#81ECFF] text-xs font-bold tracking-[0.3em] uppercase opacity-60">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05, borderColor: "#81ECFF" }}
                    className="px-4 py-2 border border-white/10 rounded-full text-sm text-white/80 transition-colors bg-neutral-900/40 hover:text-white"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
