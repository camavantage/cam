import Link from "next/link";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";
import { Button } from "./ui/button";

export function NoPremiumMessage() {
  return (
    <div>
      <PageHeader>
      <Link
            href=""
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium"
          >
            <span>1$</span>
          </Link>
        <PageHeaderHeading>Accès payant</PageHeaderHeading>
        <PageHeaderDescription>
          Seuls les abonnés qui ont payés pour cet article peuvent le consulter.
          Les articles payants sont des formations et guides pratiques avec
          accompagnement garantie.
        </PageHeaderDescription>
        <PageActions>
          <Button className="rounded-full">Déverrouiller à 1$</Button>
        </PageActions>
      </PageHeader>
    </div>
  );
}
