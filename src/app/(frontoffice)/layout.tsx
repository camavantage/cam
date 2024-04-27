// import { Header } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function FrontOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollArea className="h-screen">
      <SiteHeader />
      {children}
      <SiteFooter/>
    </ScrollArea>
  );
}
