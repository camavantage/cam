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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { siteConfig } from "@/lib/data/site";
import { UnlockPremiumArticle } from "./unlock-premium-article";

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
      <div className="px-6 lg:px-0 py-6 bg-background">
        <Suspense>
          <Mdx content={article.markdown} />
        </Suspense>
      </div>
    );
  }
  if (order && order.status === "pending") {
    return (
      <div className="px-6 lg:px-0 py-6">
        <PageHeader>
          <Link
            href=""
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium"
          >
            <span>{formatMoney(article?.price)}</span>
          </Link>
          <PageHeaderHeading>Accès en attente ⏳</PageHeaderHeading>
          <PageHeaderDescription>
            Seuls les abonnés qui ont payés pour cet article peuvent le
            consulter. Les articles payants sont des formations et guides
            pratiques avec accompagnement garantie.
          </PageHeaderDescription>
          <Card className="border-none shadow-none bg-[#FEB117]">
            <CardHeader>
              <CardTitle className=" text-white">
                Votre demande d&apos;accès est en attente de validation
              </CardTitle>
              <CardDescription className="text-white">
                C&apos;est l&apos;administrateur de CAM/AVANTAGE qui valide les
                demandes d&apos;accès.✅ Cette dernière est en attente, c&apos;est
                tout simplement parce que l&apos;administrateur ne l&apos;a pas
                encore acceptée. Votre demande peut aussi être rejetée ❌ ! Si
                vous ne comprenez pas pourquoi, rapprochez vous de
                l&apos;administrateur afin d&apos;en savoir plus.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-white">
            <Link href={siteConfig.links.whatsapp}>
                <Button className=" rounded-full">Nous contacter!</Button>
              </Link>
            </CardContent>
          </Card>
        </PageHeader>
      </div>
    );
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
            <Suspense>
              <UnlockPremiumArticle
                price={article.price}
                clientId={session.user.id}
                articleId={article.id}
              />
            </Suspense>
          </PageActions>
        )}
      </PageHeader>
    </div>
  );
}
