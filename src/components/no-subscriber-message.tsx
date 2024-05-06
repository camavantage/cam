import { PageActions, PageHeader, PageHeaderDescription } from "./page-header";
import { Button } from "./ui/button";

export function NoSubscriberMessage() {
  return (
    <div>
      <PageHeader>
        <PageHeaderDescription>
          Cet article n&apos;est visible que pour les abonnés de
          cam-avantage.com. Pour ne rien rater, connectez-vous à votre compte ou
          inscrivez-vous et débloquez l&apos;accès au contenu réservé aux
          membres. S&apos;inscrire c&apos;est gratuit🎁🎉 et sans engagement.
        </PageHeaderDescription>
        <PageActions>
          <Button className=" rounded-full">S&apos;inscrire</Button>
          <Button variant="secondary" className="rounded-full">
            Se connecter
          </Button>
        </PageActions>
      </PageHeader>
    </div>
  );
}
