"use client";

import React from "react";
import { motion } from "framer-motion";
import { CertificationData } from "@/data/mockApi";

export default function CertificationCard({ cert }: { cert: CertificationData }) {
  const getIcon = (id: string) => {
    if (id.includes("UX")) return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#81ECFF]">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    );
    if (id.includes("SEC")) return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#81ECFF]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    );
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#81ECFF]">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative bg-neutral-900/50 border border-white/5 p-8 rounded-lg overflow-hidden group transition-all hover:border-[#81ECFF]/30 hover:bg-neutral-800/80"
    >
      {/* Background Glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#81ECFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex justify-between items-start mb-12">
        <div className="p-3 bg-neutral-800 rounded-lg group-hover:bg-[#81ECFF]/10 transition-colors">
          {getIcon(cert.id)}
        </div>
        <span className="text-[10px] tracking-widest text-neutral-500 font-mono">
          ID: {cert.id}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight uppercase group-hover:text-[#81ECFF] transition-colors">
        {cert.title}
      </h3>
      <p className="text-sm text-neutral-400 leading-relaxed font-light">
        {cert.description}
      </p>
    </motion.div>
  );
}
