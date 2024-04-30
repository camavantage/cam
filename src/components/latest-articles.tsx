import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
  const articles = await getLastArticles(6);
  return (
    <section>
      <div className="max-w-screen-md mx-auto px-6 md:px-0">
        {articles.map((article) => (
          <Link key={article.id} href={`/${article.slug}`}>
            <Card className=" border-none shadow-none">
              <CardHeader></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 ">
                  <div className="h-52 w-full  md:h-52 md:w-52">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      height={1000}
                      width={1000}
                      className=" object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className=" text-3xl font-semibold">{article.title}</h1>
                    <div className="flex space-x-3 my-6">
                      <Avatar>
                        <AvatarImage src={`${article.author?.image}`} />
                        <AvatarFallback className=" uppercase">
                          {article.author?.name?.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className=" font-semibold text-sm">
                          {article.author?.name}
                        </h3>
                        <p className=" text-xs text-muted-foreground">
                          {article.updatedAt.toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
