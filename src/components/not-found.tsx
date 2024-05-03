import { cn } from "@/lib/utils";
import { PageActions, PageHeader, PageHeaderHeading } from "./page-header";
import Link from "next/link";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    // <div
    //   className={cn(
    //     " p-6 flex  justify-center items-center text-sm text-muted-foreground"
    //   )}
    // >
    //   <p className="">404 | Page non trouvée</p>
    // </div>
    <div className="px-6">
    <PageHeader>
      <PageHeaderHeading>404 | Page non trouvée</PageHeaderHeading>
      <PageActions>
        <Link href="/"><Button className=" rounded-full">Allez à l&apos;écran d&apos;accueil</Button></Link>
      </PageActions>
    </PageHeader>
    </div>
  );
}
