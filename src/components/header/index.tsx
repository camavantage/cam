import Link from "next/link";
import { siteConfig } from "@/lib/data/site";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "../ui/button";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";
import { SearchArticleBar } from "../ws/articles/search-bar";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-6">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchArticleBar />
          </div>
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <FaFacebook  className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
              <BsTwitterX className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
