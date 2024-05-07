import { PageActions, PageHeader, PageHeaderHeading } from "./page-header";
import Link from "next/link";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <div className="px-6">
      <PageHeader>
        <PageHeaderHeading>404 | Page non trouvée</PageHeaderHeading>
        <PageActions>
          <Link href="/">
            <Button className=" rounded-full">
              Allez à l&apos;écran d&apos;accueil
            </Button>
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  );
}
