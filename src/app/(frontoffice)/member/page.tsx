import { EditPasswordForm } from "@/components/edit-password";
import { EditProfileForm } from "@/components/edit-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatDate, formatElapsedTime, formatMoney } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Espace membre",
};

const getMember = async (clientId?: string) => {
  if (typeof clientId === "string") {
    const orders = await prisma.user.findFirst({
      where: { id: clientId },
      include: {
        articleOrders: { include: { article: { include: { author: {} } } } },
      },
    });
    return orders;
  }
};

export type Profile = Prisma.PromiseReturnType<typeof getMember>;

const getFreeArticles = async () => {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
      blocked: false,
      visibility: { not: "premium_only" },
    },
    include: { author: { select: { name: true } } },
  });
  return articles;
};

export default async function MemberPage() {
  const session = await auth();
  const user = await getMember(session?.user.id);
  const freeArticles = await getFreeArticles();

  if (!session) {
    return undefined;
  }
  return (
    <main className="">
      <div className="max-w-screen-md mx-auto py-12 px-6 md:px-0">
        <h1 className=" text-2xl font-bold">Mon compte</h1>
        <div className="flex space-x-4 pt-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback className=" font-bold">
              {user?.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className=" font-bold">{user?.name}</h3>
            <p className="text-muted-foreground">
              @{user?.username}{" "}
              <span className="inline-flex items-center py-1 text-sm font-medium ">
                | Abonné depuis {formatDate(`${user?.createdAt}`)}
              </span>
            </p>
            <div className="flex space-x-3 ">
              <Suspense>
                <EditProfileForm user={user} />
              </Suspense>
              <Suspense>
                <EditPasswordForm user={user}/>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-md mx-auto pb-12 px-6 md:px-0">
        <h1 className=" text-2xl font-bold">Mes cours</h1>
        <Card className=" border-none shadow-none">
          <CardContent className="pt-3 px-0">
            <Tabs defaultValue="premium" className="pt-2">
              <TabsList className=" w-full justify-start px-0 bg-transparent">
                <TabsTrigger value="premium" className="flex space-x-2">
                  <Badge>{user?.articleOrders?.length}</Badge>
                  <span>Payants</span>
                </TabsTrigger>
                <TabsTrigger value="free" className="flex space-x-2">
                  <Badge>
                    {freeArticles?.length > 99 ? "99+" : freeArticles?.length}
                  </Badge>
                  <span>Gratuits</span>
                </TabsTrigger>
              </TabsList>
              <div>
                <TabsContent value="premium">
                  <div className="pt-6">
                    {user?.articleOrders?.map((order) => (
                      <Link
                        href={`/${order.article.slug}`}
                        key={order.articleId + order.clientId}
                        className="flex space-x-4 py-4 border-b"
                      >
                        <div className="w-12 h-12">
                          {order.article?.imageUrl && (
                            <Image
                              src={order.article?.imageUrl}
                              alt=""
                              className="object-cover w-full h-full rounded-md"
                              height={64}
                              width={64}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold">
                            {order.article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {order.article.author?.name}
                          </p>
                        </div>
                        <div className=" flex flex-col items-end">
                          <h3 className=" text-sm font-semibold">
                            {formatMoney(order.price)}{" "}
                            {order.status === "confirmed"
                              ? "accès confirmée✅"
                              : "accès en attente⏳"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {formatElapsedTime(order.createdAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="free">
                  <div className="pt-6">
                    {freeArticles?.map((article) => (
                      <Link
                        href={`/${article.slug}`}
                        key={article.id}
                        className="flex space-x-4 py-4 border-b"
                      >
                        <div className="w-12 h-12">
                          {article?.imageUrl && (
                            <Image
                              src={article?.imageUrl}
                              alt=""
                              className="object-cover w-full h-full rounded-md"
                              height={64}
                              width={64}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {article.author?.name}
                          </p>
                        </div>
                        <div className=" flex flex-col items-end">
                          <h3 className=" text-sm font-semibold">
                            Accès gratuit🎁
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(article.updatedAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
