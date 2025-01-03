import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDate } from "@/lib/utils";
import { CiLock } from "react-icons/ci";
import Balancer from "react-wrap-balancer";
import { PageHeaderDescription } from "./page-header";

const getLastArticles = async (number?: number) => {
  const articles = await prisma.article.findMany({
    where: { published: true, blocked: false },
    include: { author: {} },
    orderBy: { updatedAt: "desc" },
    take: number ?? 6,
  });
  return articles;
};
export async function LatestArticles() {
  const articles = await getLastArticles();
  return (
    <section className="max-w-5xl mx-auto pt-12 px-6 md:px-0">
      <Card className=" border-none shadow-none rounded-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle className=" font-bold text-2xl text-center">
            Récemment dans recettes et astuces
          </CardTitle>
          <CardDescription className=" flex justify-center">
            <PageHeaderDescription>
              Que vous soyez novice en cuisine ou chef confirmé, vous trouverez
              ici l&apos;inspiration nécessaire pour épater vos convives et
              éveiller vos papilles.
            </PageHeaderDescription>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="">
            {articles.map((article) => (
              <Link key={article.id} href={`/${article.slug}`}>
                <Card className=" border-none shadow-none">
                  <CardHeader className="px-0"></CardHeader>
                  <CardContent className="px-0">
                    <div className=" flex flex-col md:flex-row md:space-x-6 space-y-6 ">
                      <div className="h-52 w-full  md:h-52 md:w-96">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          height={1000}
                          width={1000}
                          className=" object-cover w-full h-full rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h1 className=" text-2xl font-bold">{article.title}</h1>
                        <div className="flex space-x-3 my-6">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`${article.author?.image}`} />
                            <AvatarFallback className=" uppercase">
                              {article.author?.name?.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className=" font-semibold">
                              {article.author?.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              {article.visibility !== "public" && (
                                <CiLock className="inline bg-ws-background text-muted-foreground p-[2px] rounded" />
                              )}
                              <p className=" text-muted-foreground">
                                {formatDate(article.updatedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
