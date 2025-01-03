import Link from "next/link";
import { siteConfig } from "@/lib/data/site";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";
import { SearchArticleBar } from "./ws/articles/search-bar";
import { RiWhatsappFill } from "react-icons/ri";
import React, { Suspense } from "react";
import { SubscriberAvatar } from "./subscriber-avatar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-6">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
             {/* <SearchArticleBar /> */}
            
          </div>
          <nav className="flex items-center space-x-3">
            {/* <Link
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <BsFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link> */}
            <Suspense>
             <SubscriberAvatar />
           </Suspense>
            <Link
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary" size="icon" className=" rounded-full">
                <RiWhatsappFill className="h-5 w-5 fill-current" />
                <span className="sr-only">Whatsapp</span>
              </Button>
            </Link>
            {/* <ModeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
