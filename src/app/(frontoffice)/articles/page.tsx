import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchArticleBar } from "@/components/ws/articles/search-bar";
import prisma from "@/lib/prisma";
import { cn, getHSLColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const getArticles = async (searchParams?: {
  q?: string;
  published?: string;
  blocked?: string;
}) => {
  "use server";

  // get all published articles

  const articles = await prisma.article.findMany({
    where: {
      AND: [
        { published: true },
        { blocked: false },
        {
          OR: [
            { title: { contains: searchParams?.q, mode: "insensitive" } },
            {
              description: { contains: searchParams?.q, mode: "insensitive" },
            },
            {
              author: {
                name: { contains: searchParams?.q, mode: "insensitive" },
              },
            },
            {
              AND: [
                {
                  OR: [
                    {
                      tags: {
                        some: {
                          tag: {
                            name: {
                              contains: searchParams?.q,
                              mode: "insensitive",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    include: {
      author: {},
      tags: { include: { tag: {} } },
    },
    orderBy: { updatedAt: "desc" },
  });
  return articles;
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { published: string; blocked: string; q: string };
}) {
  const articles = await getArticles({
    published: searchParams.published,
    blocked: searchParams.blocked,
    q: searchParams.q,
  });
  return (
    <div className=" max-w-screen-lg mx-auto px-6 lg:px-0">
      <PageHeader>
        <PageHeaderHeading>Recettes et Astuces</PageHeaderHeading>
        <PageHeaderDescription>
          Que vous soyez novice en cuisine ou chef confirmé, vous trouverez ici
          l&apos;inspiration nécessaire pour épater vos convives et éveiller vos
          papilles. Des recettes revisitées aux créations originales, notre blog
          vous accompagne dans toutes vos aventures culinaires. Rejoignez-nous
          pour un voyage gourmand où la passion pour la bonne cuisine se décline
          à chaque bouchée.
        </PageHeaderDescription>
      </PageHeader>
      <div className="h-16 flex items-center space-x-4">
        <h1 className=" font-bold flex-1">Articles</h1>
        <div className="flex-1" />
        <Suspense>
          <SearchArticleBar />
        </Suspense>
      </div>
      {/* {articles.length > 0 && (
        <Link href={`/${articles[0].slug}`}>
          <div className="bg-background">
            <div className=" h-80 relative flex justify-center items-center">
              <Image
                src={articles[0].imageUrl}
                alt={articles[0].title}
                className=" object-cover w-full h-full"
                height={1000}
                width={1000}
              />
              <div className=" p-4 absolute left-6 right-6 bg-white bg-opacity-25">
                <p className="text-background text-3xl font-semibold text-center">
                  {articles[0].title}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex space-x-3">
                <Avatar>
                  <AvatarImage src={`${articles[0].author?.image}`} />
                  <AvatarFallback className=" uppercase">
                    {articles[0].author?.name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className=" font-semibold text-sm">
                    {articles[0].author?.name}
                  </h3>
                  <p className=" text-xs text-muted-foreground">
                    {articles[0].updatedAt.toDateString()}
                  </p>
                </div>
              </div>
              <div className="pt-3 md:pl-[52px]">
                <h1 className=" text-3xl font-semibold">{articles[0].title}</h1>
                <div className="flex">
                  {articles[0].tags.map((tag) => (
                    <p
                      key={tag.tagId}
                      className="mr-3 text-muted-foreground lowercase text-sm"
                    >
                      <span style={{ color: getHSLColor(tag.tag.name) }}>
                        #
                      </span>
                      {tag.tag.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )} */}
      <div className="p-6">
        <div className={cn("pb-2", searchParams.q ? "block" : "hidden")}>
          <h1 className="text-sm">
            Résultats de recherche pour {searchParams.q}
          </h1>
        </div>
        <div className=" grid grid-cols-1 gap-3">
          {articles.map((article) => (
            <Link href={`/${article.slug}`} key={article.id}>
              <div className="flex lg:px-6 bg-background rounded-md hover:shadow-sm">
                <div className="flex-1">
                  <div className="flex space-x-3">
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
                  <div className="flex pt-3 md:pl-[52px]">
                    <div className="flex-1">
                      <h1 className=" text-3xl font-semibold">
                        {article.title}
                      </h1>
                      <div className="flex">
                        {article.tags.map((tag) => (
                          <p
                            key={tag.tagId}
                            className="mr-3 text-muted-foreground lowercase text-sm"
                          >
                            <span style={{ color: getHSLColor(tag.tag.name) }}>
                              #
                            </span>
                            {tag.tag.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className=" w-20 h-20">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        height={1000}
                        width={1000}
                        className=" object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div
          className={cn(
            " p-6  justify-center items-center text-sm text-muted-foreground",
            articles.length === 0 ? "flex" : "hidden"
          )}
        >
          {searchParams.q ? (
            <p className="text-center text-sm text-muted-foreground">
              Aucun résultat ne correspond à cette requête
            </p>
          ) : (
            <p className="">Pas d&apos;articles disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
