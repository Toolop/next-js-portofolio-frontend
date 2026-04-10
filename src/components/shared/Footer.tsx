"use client";

import React, { useEffect, useState } from "react";
import { fetchHeroData, HeroData } from "@/data/mockApi";
import { Instagram, Youtube, Facebook, Linkedin } from "lucide-react";

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
};

export const Footer = () => {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    fetchHeroData().then(setData);
  }, []);

  if (!data) return null;

  return (
    <footer className="bg-[#0b1424] py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Name */}
          <div className="text-white font-bold tracking-tighter uppercase text-sm">
            {data.name.replace("I am ", "")}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6">
            {data.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#81ECFF] transition-colors"
                title={social.platform}
              >
                {platformIcons[social.platform.toLowerCase()] || social.platform}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-neutral-500 text-[10px] tracking-widest uppercase font-mono">
            © 2026 {data.name.replace("I am ", "")}
          </div>
        </div>
      </div>
    </footer>
  );
};
