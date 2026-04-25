"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchHeroData, HeroData } from "@/data/mockApi";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
};

export const HeroSection = () => {
  const [data, setData] = useState<HeroData | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    fetchHeroData().then(setData);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!data?.name) return;

    // Reset displayed text just in case
    setDisplayedText("");

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(data.name.slice(0, i + 1));
        i++;
        if (i >= data.name.length) clearInterval(interval);
      }, 80);
    }, 500);

    return () => clearTimeout(timeout);
  }, [data?.name]);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(blink);
  }, []);

  if (!data) {
    return <div className="min-h-screen bg-[#020201] flex items-center justify-center text-[#81ECFF]">Loading...</div>;
  }

  // Syntax highlighting helper for code snippet
  const highlightCode = (line: string) => {
    // Basic very simple syntax highlight logic
    const tokens = line.split(/(\s+|"[\w+\s]+"|#\w+)/g);
    return tokens.map((token, i) => {
      if (['class', 'async', 'return', 'await'].includes(token.trim())) {
        return <span key={i} className="text-[#81ECFF]">{token}</span>;
      }
      if (token.startsWith('"') && token.endsWith('"')) {
        return <span key={i} className="text-[#FFD93D]">{token}</span>;
      }
      return <span key={i} className="text-[rgba(255,255,255,0.7)]">{token}</span>;
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        );
      case 'youtube':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 7.1C2.5 7.1 2.1 9.5 2 12c.1 2.5.5 4.9.5 4.9C3.1 18.2 4.3 19.3 5.7 19.4c3.2.3 6.3.3 6.3.3s3.1 0 6.3-.3c1.4-.1 2.6-1.2 3.2-2.5.5 0 .9-2.4 1-4.9-.1-2.5-.5-4.9-1-4.9C20.9 5.8 19.7 4.7 18.3 4.6 15.1 4.3 12 4.3 12 4.3s-3.1 0-6.3.3C4.3 4.7 3.1 5.8 2.5 7.1z" /><polygon points="9.8,15.5 15.8,12 9.8,8.5 " />
          </svg>
        );
      case 'facebook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
          </svg>
        );
      default: return null;
    }
  }

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center mt-[-50px] justify-center overflow-hidden bg-[#020201]">
      {/* Background Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(129,236,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129,236,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container relative z-10 px-6 py-20 lg:py-0 w-full max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="flex flex-col items-start gap-8"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
          >
            {/* Status Badge */}
            <motion.div
              variants={fadeInDown}
              className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 backdrop-blur-sm"
            >
              <motion.div
                className="h-2 w-2 rounded-full bg-[#81ECFF]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-[rgba(255,255,255,0.5)]">
                {data.badge}
              </span>
            </motion.div>

            {/* Headings */}
            <div className="flex flex-col gap-2">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white m-0"
              >
                {data.greeting}
              </motion.h1>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight m-0 min-h-[40px] sm:min-h-[50px] lg:min-h-[80px]"
              >
                <span className="text-[#81ECFF]">
                  {displayedText}
                  <span style={{ opacity: showCursor ? 1 : 0 }} className="font-light">|</span>
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base text-[rgba(255,255,255,0.6)] leading-relaxed max-w-lg mt-2 font-medium"
            >
              Multi-disciplinary developer specializing in{" "}
              {data.roles.map((role, idx) => (
                <span key={idx}>
                  <span className="text-[#81ECFF]">{role}</span>
                  {idx < data.roles.length - 2 ? ", " : idx === data.roles.length - 2 ? ", and " : ". "}
                </span>
              ))}
              Turning raw data into kinetic experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="shrink-0"
              >
                <Link
                  href="#work"
                  className="rounded px-8 py-3.5 bg-[#81ECFF] text-[#020201] text-xs sm:text-sm font-bold tracking-widest transition-colors hover:bg-white inline-block w-full text-center"
                >
                  SEE MY WORK
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="shrink-0"
              >
                <Link
                  href="#contact"
                  className="rounded px-8 py-3.5 border border-[rgba(255,255,255,0.3)] text-white text-xs sm:text-sm font-bold tracking-widest transition-colors hover:border-[#81ECFF] hover:bg-[rgba(129,236,255,0.05)] inline-block w-full text-center"
                >
                  GET IN TOUCH
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Code & Stats (Hidden on small screens) */}
          <motion.div
            className="hidden md:flex flex-col gap-6"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } } }}
          >
            {/* CodeCard */}
            <motion.div
              variants={slideInRight}
              className="relative rounded border border-[rgba(255,255,255,0.08)] bg-[#0D0D0C] overflow-hidden shadow-2xl"
            >
              {/* Scanline effect */}
              <motion.div
                className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#81ECFF]/30 to-transparent z-10"
                animate={{ y: [0, 400] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] px-4 py-3 bg-[rgba(255,255,255,0.02)]">
                <span className="text-[10px] font-mono tracking-widest text-[#81ECFF]">
                  {data.codeSnippet.filename}
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-xs leading-loose overflow-x-auto relative z-0">
                <pre className="m-0">
                  <code>
                    {data.codeSnippet.lines.map((line, i) => (
                      <div key={i} className="whitespace-pre">
                        {highlightCode(line)}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </motion.div>

            {/* Stats Panel */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6">
              {data.stats.map((stat, i) => (
                <div key={i} className="rounded border border-[rgba(255,255,255,0.05)] bg-[#0D0D0C] p-6 flex flex-col justify-center">
                  <span className={`text-4xl font-bold mb-2 tracking-tight ${stat.value.includes('%') ? 'text-[#A78BFA]' : 'text-[#81ECFF]'}`}>
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest text-[rgba(255,255,255,0.4)] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* Social Bar */}
        <motion.div className="relative">
          <motion.div variants={fadeIn} className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)] w-full flex items-center gap-6">
            {data.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, color: "#81ECFF" }}
                  className="text-[rgba(255,255,255,0.5)] transition-colors"
                >
                  {getPlatformIcon(social.platform)}
                </motion.div>
              </a>
            ))}
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="hidden lg:flex absolute top-30 right-8 items-center gap-4 origin-bottom-right rotate-90"
          >
            <motion.div
              className="w-12 h-px bg-[rgba(255,255,255,0.2)] relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 h-full w-4 bg-white"
                animate={{ x: [-20, 60] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-[rgba(255,255,255,0.4)]">SCROLL</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
