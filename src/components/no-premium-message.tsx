import Link from "next/link";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";
import { Button } from "./ui/button";
import { formatMoney } from "@/lib/utils";
import { Article } from "@/app/(backoffice)/ws/articles/[articleId]/page";
import { UserType } from "@/lib/types";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { RegisterFormDrawer } from "./register-form";
import { LoginFormDrawer } from "./login-form";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import { Mdx } from "./mdx";

const getArticleOrder = async (clientId?: string, articleId?: string) => {
  if (typeof clientId === "string" && typeof articleId === "string") {
    const order = await prisma.articleOrder.findFirst({
      where: { articleId, clientId },
    });
    return order;
  }
};

type NoPremiumMessageProps = {
  article: Article;
  session: Session | null;
};

export async function NoPremiumMessage({
  article,
  session,
}: NoPremiumMessageProps) {
  const order = await getArticleOrder(session?.user.id, article?.id);

  if (!article) {
    return undefined;
  }

  if (order && order.status === "confirmed") {
    return (
      <div className="px-6 lg:px-0 py-6 bg-background rounded-b-md">
        <Suspense>
          <Mdx content={article.markdown} />
        </Suspense>
      </div>
    );
  }
  if (order && order.status === "pending") {
    return <div>En attent</div>;
  }

  return (
    <div>
      <PageHeader>
        <Link
          href=""
          className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium"
        >
          <span>{formatMoney(article?.price)}</span>
        </Link>
        <PageHeaderHeading>Accès payant</PageHeaderHeading>
        <PageHeaderDescription>
          Seuls les abonnés qui ont payés pour cet article peuvent le consulter.
          Les articles payants sont des formations et guides pratiques avec
          accompagnement garantie.
        </PageHeaderDescription>

        {!session ? (
          <PageActions>
            <Suspense>
              <RegisterFormDrawer />
            </Suspense>
            <span>ou</span>
            <Suspense>
              <LoginFormDrawer />
            </Suspense>
          </PageActions>
        ) : (
          <PageActions>
            <Button className="rounded-full">
              Déverrouiller à {formatMoney(article?.price)}
            </Button>
          </PageActions>
        )}
      </PageHeader>
    </div>
  );
}
