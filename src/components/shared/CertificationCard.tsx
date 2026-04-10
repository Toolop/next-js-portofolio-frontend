"use client";

import React from "react";
import { motion } from "framer-motion";
import { CertificationData } from "@/data/mockApi";
import { Shield, CheckCircle, Code } from "lucide-react";

export default function CertificationCard({ cert }: { cert: CertificationData }) {
  const getIcon = (id: string) => {
    if (id.includes("UX")) return <CheckCircle className="w-6 h-6 text-[#81ECFF]" />;
    if (id.includes("SEC")) return <Shield className="w-6 h-6 text-[#81ECFF]" />;
    return <Code className="w-6 h-6 text-[#81ECFF]" />;
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
