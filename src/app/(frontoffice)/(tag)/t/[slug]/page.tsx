import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const getTag = async (slug: string) => {
  const tag = await prisma.tag.findUnique({
    where: { slug, published: true },
    include: {
      articles: {
        where: { article: { published: true, blocked: false } },
        include: { article: { include: { author: {} } } },
      },
    },
  });
  return tag;
};

export default async function TagPage({
  params,
}: {
  params: { slug: string };
}) {
  const tag = await getTag(params.slug);
  if (!tag) {
    return "Not found";
  }
  return (
    <div>
      <div className="max-w-screen-md mx-auto py-12 px-6 md:px-0">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>{tag.name}</CardTitle>
            <CardDescription>
              <Badge className="mr-2" variant="secondary">
                {tag.articles.length}
              </Badge>
              Articles portent ce tag (étiquette)
            </CardDescription>
          </CardHeader>
          <CardContent>{tag.description}</CardContent>
        </Card>
      </div>
      <div className="max-w-screen-md mx-auto px-6 md:px-0">
        {tag.articles.map((article) => (
          <Link key={article.tagId} href={`/${article.article.slug}`}>
            <Card className=" border-none shadow-none">
              <CardHeader></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 ">
                  <div className="h-52 w-full  md:h-52 md:w-52">
                    <Image
                      src={article.article.imageUrl}
                      alt={article.article.title}
                      height={1000}
                      width={1000}
                      className=" object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className=" text-3xl font-semibold">
                      {article.article.title}
                    </h1>
                    <div className="flex space-x-3 my-6">
                      <Avatar>
                        <AvatarImage src={`${article.article.author?.image}`} />
                        <AvatarFallback className=" uppercase">
                          {article.article.author?.name?.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className=" font-semibold text-sm">
                          {article.article.author?.name}
                        </h3>
                        <p className=" text-xs text-muted-foreground">
                          {article.article.updatedAt.toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>{" "}
    </div>
  );
}
