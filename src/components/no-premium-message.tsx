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
        <PageHeaderHeading>1$</PageHeaderHeading>
        <PageHeaderDescription>
          Seuls les abonnés qui ont payés pour cet article peuvent le consulter.
        </PageHeaderDescription>
        <PageActions>
          <Button className="rounded-full">Ajouter au panier</Button>
        </PageActions>
      </PageHeader>
    </div>
  );
}
