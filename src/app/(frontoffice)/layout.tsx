import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { NewsletterSection } from "@/components/newsletter";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { Suspense } from "react";

export default function FrontOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollArea className="h-screen">
      <SiteHeader />
      {children}
      <section className="">
        <Suspense>
          <NewsletterSection />
        </Suspense>
      </section>
      <SiteFooter/>
    </ScrollArea>
  );
}
