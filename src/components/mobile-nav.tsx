"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { docsConfig } from "@/lib/data/menu";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { IoIosHeart } from "react-icons/io";
import { ArticleType } from "@/lib/types";
import { courses } from "@/lib/data/courses";
import Image from "next/image";

const date = new Date();

type MobileNavProps = {
  lastArticles?: ArticleType[];
};
export function MobileNav({ lastArticles }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center font-bold text-[18px]"
          onOpenChange={setOpen}
        >
          <span className=" text-[#FEAA00]">CAM</span>/AVANTAGE
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <h4 className="font-bold text-muted-foreground">Nos formations</h4>
              {courses.map((course) => (
                <Link href={`/courses#${course.name}`} key={course.id}>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className=" w-6 h-6">
                      <Image
                        src={course.mediaItem.sourceUrl}
                        alt={course.mediaItem.alt}
                        height={512}
                        width={512}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h6 className="">{course.name}</h6>
                      <p>{course.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="text-muted-foreground text-sm">
          <p className="leading-3">
            Made with <IoIosHeart className=" inline text-[#ff0000]" /> from DRC
          </p>
          <p className=" ">
            © {date.getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
