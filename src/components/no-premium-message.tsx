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
        <PageHeaderHeading>Accès payant</PageHeaderHeading>
        <PageHeaderDescription>
          Seuls les abonnés qui ont payés pour cet article peuvent le consulter.
          Les articles payants sont des formations et guides pratiques avec
          accompagnement.
        </PageHeaderDescription>
        <PageActions>
          <Button className="rounded-full">Acheter maintenant</Button>
        </PageActions>
      </PageHeader>
    </div>
  );
}
