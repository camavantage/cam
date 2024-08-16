"use client";

import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
import { siteConfig } from "@/lib/data/site";
import { docsConfig } from "@/lib/data/menu";
import { MobileLink } from "./mobile-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LogoWithtext } from "./icons/logo-with-text";

const date = new Date();

export function SiteFooter() {
  return (
    <footer className=" bg-ws-background p-6 lg:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:gap-5">
        <div className=" lg:col-span-2">
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="flex flex-row px-0 space-x-4 items-center lg:items-start">
              <Link href="/" className="">
                <LogoWithtext className="h-20 w-20 " />
              </Link>
              <div>
                <CardTitle className="font-bold text-[18px]">
                  Vivre le présent!
                </CardTitle>
                <CardDescription>
                  La passion du goût au service de la communauté.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-0"></CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className=" text-[18px]">Liens rapides</CardTitle>
              <CardDescription>
                <div className="flex flex-col space-y-3">
                  {docsConfig.mainNav?.map(
                    (item) =>
                      item.href && (
                        <MobileLink
                          key={item.href}
                          href={item.href}
                        // onOpenChange={setOpen}
                        >
                          {item.title}
                        </MobileLink>
                      )
                  )}
                </div>
              </CardDescription>
            </CardHeader>
            {/* <CardContent className="px-0"></CardContent> */}
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className=" text-[18px]">Contacts</CardTitle>
              <CardDescription>
                <address className=" not-italic">
                  <ul>
                    <li>+243826776661</li>
                    <li>+243977778829</li>
                    <li>+243896106667</li>
                    <li>contact@cam-avantage.com</li>
                  </ul>
                </address>
              </CardDescription>
            </CardHeader>
            {/* <CardContent className="px-0"></CardContent> */}
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className=" text-[18px]">Adresses</CardTitle>
              <CardDescription>
                <address className=" not-italic">
                  Nord-Kivu, Butembo, com. Kimemi, Q. Vutsundo, cel. Mutsunga,
                  N⁰89
                </address>
              </CardDescription>
            </CardHeader>
            {/* <CardContent className="px-0"></CardContent> */}
          </Card>
        </div>
      </div>
      <div className="px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Made with <IoIosHeart className=" inline text-[#ff0000]" /> from DRC
        </p>
        <p className="text-sm text-muted-foreground">
          © {date.getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
