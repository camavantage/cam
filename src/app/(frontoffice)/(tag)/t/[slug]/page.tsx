import { NotFound } from "@/components/not-found";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { absoluteUrl, formatDate, readingTimeEstimator } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CiLock } from "react-icons/ci";

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tag = await getTag(params.slug);

  if (tag) {
    return {
      title: `${tag.name} - Avantage`,
      description: tag.description,
      keywords: [tag.name,"avantage"],
      openGraph: {
        title: tag.name,
        description: tag.description ?? "",
        type: "website",
        url: absoluteUrl(`t/${tag.slug}`),
        images: [
          {
            url: tag.imageUrl ?? "",
            width: 1200,
            height: 630,
            alt: tag.name,
          },
        ],
      },
    };
  } else {
    return {};
  }
}

export default async function TagPage({
  params,
}: {
  params: { slug: string };
}) {
  const tag = await getTag(params.slug);
  if (!tag) {
    return <NotFound />;
  }
  return (
    <div>
      <div className="max-w-screen-md mx-auto py-12 px-6 md:px-0">
        {/* <Card className="border-none shadow-none">
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
        </Card> */}
        <PageHeader>
          {tag.imageUrl && (
            <div className=" w-32 h-32">
              <Image
                src={tag.imageUrl}
                alt={tag.name}
                height={512}
                width={512}
                className=" object-cover w-full h-full rounded-full"
              />
            </div>
          )}
          <PageHeaderHeading>{tag.name}</PageHeaderHeading>
          <PageHeaderDescription>{tag.description}</PageHeaderDescription>
          <Link
            href={`/t/${tag.slug}`}
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium uppercase"
          >
            <span>{tag.articles.length} article(s)</span>
          </Link>
        </PageHeader>
      </div>
      <div className="max-w-5xl mx-auto px-6 md:px-0">
        {tag.articles.map((article) => (
          <Link key={article.tagId} href={`/${article.article.slug}`}>
            <Card className=" border-none shadow-none">
              <CardHeader></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 ">
                  <div className="h-52 w-full  md:h-52 md:w-96">
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
                        <CiLock className="inline bg-ws-background p-1 rounded" /> {readingTimeEstimator(article.article.content)} -{" "}
                          {formatDate(article.article.updatedAt)}
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
    </div>
  );
}
