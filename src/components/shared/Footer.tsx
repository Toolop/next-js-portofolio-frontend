import React from "react";
import { portfolioData } from "@/data/portfolio";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by {portfolioData.name}. The source code is available on{" "}
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">
              LinkedIn
            </a>
            <a href={portfolioData.contact.twitter} target="_blank" rel="noreferrer" className="hover:text-primary">
              Twitter
            </a>
            <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-primary">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
