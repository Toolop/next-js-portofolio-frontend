"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
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
      className="fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: COLORS.background }}
      initial={false}
      animate={{
        paddingTop: isScrolled ? "16px" : "8px",
        paddingBottom: isScrolled ? "16px" : "8px",
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Grid background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(129,236,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129,236,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <motion.nav
        className="relative flex items-center justify-between mx-auto px-8"
        animate={{
          maxWidth: isScrolled ? "1400px" : "1280px",
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Logo */}
        <motion.div
          animate={{ scale: isScrolled ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href="/"
            id="navbar-logo"
            className="font-black tracking-[0.15em] text-lg select-none"
            style={{ color: COLORS.primary, fontFamily: "var(--font-geist-sans)" }}
          >
            PORTOFOLIO
          </Link>
        </motion.div>

        {/* Nav pill */}
        <motion.div
          className="flex items-center rounded-full border"
          style={{ borderColor: "rgba(129,236,255,0.18)" }}
          animate={{
            paddingLeft: isScrolled ? "32px" : "24px",
            paddingRight: isScrolled ? "32px" : "24px",
            paddingTop: isScrolled ? "12px" : "8px",
            paddingBottom: isScrolled ? "12px" : "8px",
            gap: isScrolled ? "36px" : "24px",
            backgroundColor: isScrolled
              ? "rgba(129,236,255,0.04)"
              : "transparent",
            boxShadow: isScrolled
              ? "0 0 24px rgba(129,236,255,0.06)"
              : "none",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                id={`navbar-link-${item.id}`}
                className="relative text-xs font-semibold tracking-widest transition-colors duration-300 group"
                style={{
                  color: isActive ? COLORS.active : COLORS.inactive,
                  letterSpacing: "0.12em",
                }}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}

                {/* Active underline indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-px"
                      style={{ backgroundColor: COLORS.primary }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* Hover glow */}
                <span
                  className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(ellipse at center, rgba(129,236,255,0.06) 0%, transparent 70%)`,
                  }}
                />
              </Link>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          animate={{ scale: isScrolled ? 1.03 : 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href="#contact"
            id="navbar-cta"
            className="relative rounded-full border font-semibold text-xs tracking-widest overflow-hidden group transition-all duration-300"
            style={{
              color: COLORS.primary,
              borderColor: "rgba(129,236,255,0.35)",
              padding: isScrolled ? "12px 28px" : "8px 20px",
              letterSpacing: "0.1em",
            }}
            onClick={() => setActiveSection("contact")}
          >
            {/* Hover fill */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(129,236,255,0.08)" }}
            />
            <span className="relative">GET IN TOUCH</span>
          </Link>
        </motion.div>
      </motion.nav>
    </motion.header>
  );
};
