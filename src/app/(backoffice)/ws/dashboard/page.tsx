import { getAppSetup } from "@/actions/ws/setup";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatElapsedTime, formatMoney } from "@/lib/utils";
import { LucideExternalLink } from "lucide-react";
import Link from "next/link";
import { LiaEdit } from "react-icons/lia";
import { PiPhoneCallFill } from "react-icons/pi";
import { RiWhatsappFill } from "react-icons/ri";
import { TbMailFilled } from "react-icons/tb";

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
  });

  return orders;
};

export default async function WSDashboardPage() {
  const session = await auth();
  const data = await getDashboardData();
  const app = await getAppSetup();
  const orders = await getPendingOrders();
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
                      <Badge variant="destructive">{orders.length}</Badge>
                      <span>En attente</span>
                    </TabsTrigger>
                    <TabsTrigger value="confirmed" className="flex space-x-2">
                      <Badge>99+</Badge>
                      <span>Confirmée(s)</span>
                    </TabsTrigger>
                  </TabsList>
                  <div>
                    <TabsContent value="pending">
                      <div className="pt-6">
                        {orders.map((order) => (
                          <div
                            key={order.articleId + order.client}
                            className="flex space-x-3 py-3 border-b"
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
                                <HoverCard>
                                  <HoverCardTrigger>
                                    <Badge variant="outline">
                                      Contacts
                                    </Badge>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-80">
                                    <div className="flex space-x-4">
                                      <Avatar>
                                        <AvatarImage
                                          src={order.client.image ?? ""}
                                        />
                                        <AvatarFallback>
                                          {order.client.name?.substring(0, 2)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="space-y-1">
                                        <h3 className="font-bold">
                                          {order.client.name}
                                        </h3>
                                        <p>{order.client.email}</p>
                                        <p>{order.client.phone}</p>
                                        <div className="flex items-center space-x-2 pt-2">
                                          <Link
                                            href={`https://wa.me/${order.client.phone}`}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <Button
                                              variant="secondary"
                                              size="icon"
                                              className=" rounded-full"
                                            >
                                              <RiWhatsappFill className="h-5 w-5 fill-current" />
                                            </Button>
                                          </Link>
                                          <Link
                                            href={`tel:${order.client.phone}`}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <Button
                                              variant="secondary"
                                              size="icon"
                                              className=" rounded-full"
                                            >
                                              <PiPhoneCallFill className="h-5 w-5 fill-current" />
                                            </Button>
                                          </Link>
                                          <Link
                                            href={`mailto:${order.client.email}`}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <Button
                                              variant="secondary"
                                              size="icon"
                                              className=" rounded-full"
                                            >
                                              <TbMailFilled className="h-5 w-5 fill-current" />
                                            </Button>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
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
                              <Button variant="secondary">Confirmer</Button>
                              <Button variant="ghost">Rejeter</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="confirmed">
                      <div></div>
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
