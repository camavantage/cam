import { getAppSetup } from "@/actions/ws/setup";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { NewsletterSection } from "@/components/newsletter";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { appStatusDescription } from "@/lib/utils";
import React, { Suspense } from "react";

export default async function FrontOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const app = await getAppSetup();

  if (app?.status === "offline") {
    return (
      <div className="pt-24 min-h-screen">
        <PageHeader>
          <PageHeaderHeading>Hors ligne</PageHeaderHeading>
          <PageHeaderDescription>
            {appStatusDescription(app.status)}
          </PageHeaderDescription>
        </PageHeader>
      </div>
    );
  }

  if (app?.status === "maintenance") {
    return (
      <div className="pt-24 min-h-screen">
        <PageHeader>
        <PageHeaderHeading>En maintenance</PageHeaderHeading>
          <PageHeaderDescription>
            {appStatusDescription(app.status)}
          </PageHeaderDescription>
        </PageHeader>
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen">
      <SiteHeader />
      {children}
      <section className="">
        <Suspense>
          <NewsletterSection />
        </Suspense>
      </section>
      <SiteFooter />
    </ScrollArea>
  );
}
