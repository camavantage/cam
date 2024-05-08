import { Suspense } from "react";
import { LoginFormDrawer } from "./login-form";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";
import { RegisterFormDrawer } from "./register-form";

export function NoSubscriberMessage() {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>S&apos;inscrire d&apos;abord</PageHeaderHeading>
        <PageHeaderDescription>
          Cet article n&apos;est visible que pour les abonnés de
          cam-avantage.com. Pour ne rien rater, connectez-vous à votre compte ou
          inscrivez-vous pour débloquer l&apos;accès au contenu réservé aux
          membres. S&apos;inscrire c&apos;est gratuit🎁🎉 et sans engagement.
        </PageHeaderDescription>
        <PageActions>
          <Suspense>
            <RegisterFormDrawer />
          </Suspense>
          <span>ou</span>
          <Suspense>
            <LoginFormDrawer />
          </Suspense>
        </PageActions>
      </PageHeader>
    </div>
  );
}
