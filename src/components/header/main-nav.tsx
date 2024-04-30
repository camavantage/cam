"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-4">
       <Logo className="w-4 h-4" />
        <span className="hidden font-extrabold text-[18px] sm:inline-block">
          CAM/AVANTAGE
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-base lg:gap-6">
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/about" ? "text-foreground" : "text-foreground/60"
          )}
        >
          À propos
        </Link>
        <Link
          href="/articles"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/articles")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Astuces et recettes
        </Link>
        <Link
          href="/courses"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/courses")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Formations
        </Link>
        <Link
          href="/contact"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/contact")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
