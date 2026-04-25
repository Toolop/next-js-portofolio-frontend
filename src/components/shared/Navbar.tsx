"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "HOME", href: "#home", id: "home" },
  { label: "PORTOFOLIO", href: "#projects", id: "projects" },
  { label: "CERTIFICATE", href: "#certificate", id: "certificate" },
  { label: "SKILLS", href: "#skills", id: "skills" },
];

const COLORS = {
  primary: "#81ECFF",
  inactive: "#6B7068",
  active: "#FFFFFF",
  background: "#020201",
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 p-4 md:p-0"
      initial={false}
      animate={{
        paddingTop: isScrolled ? "16px" : "8px",
        paddingBottom: isScrolled ? "16px" : "8px",
        backgroundColor: (isScrolled || isMobileMenuOpen) ? COLORS.background : "transparent",
      }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(129,236,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129,236,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: isScrolled ? 1 : 0
        }}
      />

      <nav className="relative flex items-center justify-between max-w-7xl mx-auto px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-black tracking-[0.15em] text-lg lg:text-xl select-none relative z-50"
          style={{ color: COLORS.primary }}
        >
          PORTOFOLIO
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-8 py-3 gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative text-[10px] font-black tracking-[0.2em] transition-colors duration-300 group"
                style={{ color: isActive ? COLORS.active : COLORS.inactive }}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <Link
          href="#contact"
          className="hidden md:block border border-primary/40 px-6 py-2 rounded-full text-[10px] font-black tracking-widest text-primary hover:bg-primary/10 transition-all"
        >
          GET IN TOUCH
        </Link>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden relative z-50 p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background pt-32 px-10 z-40 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-2xl font-black tracking-tighter"
                  style={{ color: activeSection === item.id ? COLORS.primary : COLORS.inactive }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-primary/20 mr-4">/</span>
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-8 border border-primary/40 p-6 text-center text-primary font-black tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GET IN TOUCH
              </Link>
            </div>
            
            <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-4">
               <div className="h-px bg-white/5 w-full" />
               <div className="text-[10px] text-neutral-600 font-bold tracking-widest">
                  © 2024 PORTFOLIO_V1.0
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
