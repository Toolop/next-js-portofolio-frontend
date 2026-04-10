"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const animateText = (currentIndex: number) => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        timeout = setTimeout(() => animateText(currentIndex + 1), 100);
      }
    };

    const startTimeout = setTimeout(() => animateText(0), delay * 1000);
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};

export default function CtaSection() {
  return (
    <section className="relative py-32 bg-[#000000] overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#81ECFF] text-xs font-bold tracking-[0.4em] uppercase mb-8"
        >
          READY TO CONNECT?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-bold text-white mb-12 leading-tight tracking-tighter"
        >
          LET'S BUILD THE <br />
          <span className="text-[#A855F7]">
            <TypewriterText text="NEXT PROTOCOL" delay={0.5} />
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#81ECFF] text-black px-8 py-4 rounded font-bold text-sm tracking-widest hover:brightness-110 transition-all uppercase"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Hire Me
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "#81ECFF" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded font-bold text-sm tracking-widest hover:text-[#81ECFF] transition-all uppercase"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Schedule Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
