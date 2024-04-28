import { getAppSetup } from "@/actions/ws/setup";
import { TooltipWrap } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { LiaEdit } from "react-icons/lia";

const getDashboardData = async () => {
  const allArticles = await prisma.article.count();
  const publishedArticles = await prisma.article.count({
    where: { published: true, blocked: false },
  });

  const allTags = await prisma.tag.count();
  const publishedTags = await prisma.tag.count({
    where: { published: true },
  });

  const allUsers = await prisma.user.count();
  const subscriberedUsers = await prisma.user.count({
    where: { role: "subscriber" },
  });

  return {
    articles: { all: allArticles, published: publishedArticles },
    tags: { all: allTags, published: publishedTags },
    users: { all: allUsers, subscribered: subscriberedUsers },
  };
};

export default async function WSDashboardPage() {
  const session = await auth();
  const data = await getDashboardData();
  const app = await getAppSetup();
  return (
    <div className=" bg-ws-background">
      <div className="h-16 flex items-center px-3 space-x-4">
        <h1 className=" font-bold">Tableau de bord</h1>
        <div className="flex-1" />
        <TooltipWrap content="Créer un article">
          <Link href="/ws/articles/new">
            <Button variant="outline" className=" bg-transparent">
              <LiaEdit className="h-[1.2rem] w-[1.2rem] mr-2" />
              <span>Écrire</span>
            </Button>
          </Link>
        </TooltipWrap>
      </div>
      <ScrollArea className=" h-[calc(100vh-64px)]">
        <div className="px-6 pb-6">
          <div className=" flex w-full justify-start pb-4 ">
            <p className=" text-muted-foreground text-center">
              👋🤗 Bienvenue dans votre espace de travail{" "}
              <span className="text-base text-foreground">
                {session?.user.name}!
              </span>
            </p>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-x-4">
            <div>
              <Card className=" border-none shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>{app?.title}</CardTitle>
                  <CardDescription>{app?.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div>
              <Card className=" border-none shadow-none">
                <CardHeader>
                  <CardTitle className=" text-sm text-foreground">
                    Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardTitle>{data.articles.all}</CardTitle>
                  <CardDescription className=" text-xs">
                    {data.articles.published} Publié(s)
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className=" border-none shadow-none">
                <CardHeader>
                  <CardTitle className=" text-sm text-foreground">
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardTitle>{data.tags.all}</CardTitle>
                  <CardDescription className=" text-xs">
                    {data.tags.published} Publié(s)
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className=" border-none shadow-none">
                <CardHeader>
                  <CardTitle className=" text-sm text-foreground">
                    Membres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardTitle>{data.users.all}</CardTitle>
                  <CardDescription className=" text-xs">
                    {data.users.subscribered} Abonné(s)
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
