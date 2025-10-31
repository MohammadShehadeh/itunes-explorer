"use client";

import { Headphones } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type NavbarProps = PropsWithChildren<{
  className?: string;
}>;

export const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Headphones className="size-5" aria-hidden="true" />
      </span>
      <span className="text-base font-semibold">مستكشف iTunes</span>
    </Link>
  );
};

export const Navbar = ({ className, children }: NavbarProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur supports-backdrop-filter:bg-background/40",
        className,
      )}
    >
      <div className="container flex md:flex-row flex-col gap-2 md:justify-between justify-center items-center">
        <NavbarLogo />
        <nav className="flex items-center gap-2">{children}</nav>
      </div>
    </header>
  );
};
