"use client";

import { Github, Twitter, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NavbarLogo } from "./navbar";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="container pt-16 pb-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <NavbarLogo />
        <Separator />
        <div className="flex gap-1">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <a href="https://github.com/MohammadShehadeh" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <a href="/" className="pointer-events-none opacity-50" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <a href="/" className="pointer-events-none opacity-50" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};
