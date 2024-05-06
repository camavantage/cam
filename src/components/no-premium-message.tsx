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
        <PageHeaderHeading>Accès à 1$</PageHeaderHeading>
        <PageHeaderDescription>
          Seuls les abonnés qui ont payés pour cet article peuvent le consulter.
        </PageHeaderDescription>
        <PageActions>
          <Button className="rounded-full">Acheter maintenant</Button>
        </PageActions>
      </PageHeader>
    </div>
  );
}
