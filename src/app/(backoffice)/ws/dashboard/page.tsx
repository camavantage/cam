import { getAppSetup } from "@/actions/ws/setup";
import { ContactHoverCard } from "@/components/contact-hover-card";
import { AcceptOrder, RejectOrder, CancelConfirmedOrder } from "@/components/order-controler";
import { TooltipWrap } from "@/components/tooltip-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatElapsedTime, formatMoney } from "@/lib/utils";
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

const getPendingOrders = async () => {
  const orders = await prisma.articleOrder.findMany({
    where: { status: "pending" },
    include: { client: {}, article: {} },
    orderBy: { createdAt: "asc" },
  });

  return orders;
};

const getConfimedOrders = async () => {
  const orders = await prisma.articleOrder.findMany({
    where: { status: "confirmed" },
    include: { client: {}, article: {} },
    orderBy: { updatedAt: "desc" },
  });

  return orders;
};

export default async function WSDashboardPage() {
  const session = await auth();
  const data = await getDashboardData();
  const app = await getAppSetup();
  const orders = await getPendingOrders();
  const confirmedOrders = await getConfimedOrders();
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
                  <CardTitle className=" text-2xl font-bold">
                    {app?.title}
                  </CardTitle>
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
          <div className=" my-4">
            <h1 className=" text-2xl font-bold">Commandes d&apos;articles</h1>
          </div>
          <div className="">
            <Card className=" border-none shadow-none">
              <CardContent className="pt-3">
                <Tabs defaultValue="pending" className="pt-2">
                  <TabsList className=" w-full justify-start px-0 bg-transparent">
                    <TabsTrigger value="pending" className="flex space-x-2">
                      <Badge variant="destructive">
                        {orders.length > 99 ? "99+" : orders.length}
                      </Badge>
                      <span>En attente</span>
                    </TabsTrigger>
                    <TabsTrigger value="confirmed" className="flex space-x-2">
                      <Badge>
                        {confirmedOrders.length > 99
                          ? "99+"
                          : confirmedOrders.length}
                      </Badge>
                      <span>Confirmée(s)</span>
                    </TabsTrigger>
                  </TabsList>
                  <div>
                    <TabsContent value="pending">
                      <div className="pt-6">
                        {orders.map((order) => (
                          <div
                            key={order.articleId + order.clientId}
                            className="flex space-x-4 py-4 border-b"
                          >
                            <Avatar>
                              <AvatarImage src={order.client?.image ?? ""} />
                              <AvatarFallback className="uppercase">
                                {order.client.name?.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold">
                                {order.client.name}{" "}
                                <ContactHoverCard user={order.client} />
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {order.article.title}
                              </p>
                            </div>
                            <div className=" flex flex-col items-end">
                              <h3 className=" text-sm font-semibold">
                                {formatMoney(order.price)}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {formatElapsedTime(order.createdAt)}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <AcceptOrder clientId={order.clientId} articleId={order.articleId} price={order.price} />
                              <RejectOrder clientId={order.clientId} articleId={order.articleId} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="confirmed">
                      <div className="pt-6">
                        {confirmedOrders.map((order) => (
                          <div
                            key={order.articleId + order.clientId}
                            className="flex space-x-4 py-4 border-b"
                          >
                            <Avatar>
                              <AvatarImage src={order.client?.image ?? ""} />
                              <AvatarFallback className="uppercase">
                                {order.client.name?.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold">
                                {order.client.name}{" "}
                                <ContactHoverCard user={order.client} />
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {order.article.title}
                              </p>
                            </div>
                            <div className=" flex flex-col items-end">
                              <h3 className=" text-sm font-semibold">
                                {formatMoney(order.price)}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {formatElapsedTime(order.createdAt)}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <CancelConfirmedOrder clientId={order.clientId} articleId={order.articleId} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
