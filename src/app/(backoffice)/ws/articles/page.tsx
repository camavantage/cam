import { TooltipWrap } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArticleCard } from "@/components/ws/articles/card";
import { SearchArticleBar } from "@/components/ws/articles/search-bar";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LiaEdit } from "react-icons/lia";

const getArticles = async (searchParams?: {
  q?: string;
  published?: string;
  blocked?: string;
}) => {
  "use server";
  // get all blocked articles
  if (searchParams?.blocked === "true") {
    const articles = await prisma.article.findMany({
      where: {
        AND: [
          { blocked: true },
          {
            OR: [
              { title: { contains: searchParams.q, mode: "insensitive" } },
              {
                description: { contains: searchParams.q, mode: "insensitive" },
              },
              {
                author: {
                  name: { contains: searchParams.q, mode: "insensitive" },
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
  }

  // get all published articles
  if (searchParams?.published === "true") {
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
  }

  //get all unpublished articles
  if (searchParams?.published === "false") {
    const articles = await prisma.article.findMany({
      where: {
        AND: [
          { published: false },
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
  }

  // get all articles
  const articles = await prisma.article.findMany({
    where: {
      AND: [
        {
          OR: [
            { title: { contains: searchParams?.q, mode: "insensitive" } },
            { description: { contains: searchParams?.q, mode: "insensitive" } },
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
    <div className=" bg-ws-background">
      <div className="h-16 flex items-center px-3 space-x-4">
        <h1 className=" font-bold flex-1">Articles</h1>
        <div className="flex-1" />
        <SearchArticleBar />
        <TooltipWrap content="Écrire un article">
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
          <div className=" flex w-full justify-start pb-4 text-base text-muted-foreground">
            <Link href="/ws/articles">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  !searchParams.blocked &&
                    typeof searchParams.published === "undefined" &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                Tous
              </Button>
            </Link>
            <Link href="/ws/articles?published=true">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  searchParams.published === "true" &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                Publiés
              </Button>
            </Link>
            <Link href="/ws/articles?published=false">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  searchParams.published === "false" &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                En attente
              </Button>
            </Link>

            <Link href="/ws/articles?blocked=true">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  searchParams.blocked === "true" &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                Bloqués
              </Button>
            </Link>
          </div>
          <div className={cn("pb-2", searchParams.q ? "block" : "hidden")}>
            <h1 className="text-sm">
              Résultats de recherche pour {searchParams.q}
            </h1>
          </div>
          <div className=" grid grid-cols-1 gap-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div
            className={cn(
              " h-[calc(100vh-192px)] p-6  justify-center items-center text-sm text-muted-foreground",
              articles.length === 0 ? "flex" : "hidden"
            )}
          >
            {searchParams.q ? (
              <p className="text-center text-sm text-muted-foreground">
                Aucun résultat ne correspond à cette requête
              </p>
            ) : (
              <p className="">
                Pas d&apos;articles disponibles.
                <Link href="/ws/articles/new">
                  <Button variant="ghost" className="text-primary">
                    Créer
                  </Button>
                </Link>
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
