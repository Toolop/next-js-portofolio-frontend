"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { portfolioData } from "@/data/portfolio";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tighter">
          {portfolioData.name.toUpperCase()}
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
