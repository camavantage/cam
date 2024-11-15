import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchTagBar } from "@/components/ws/tags/search-bar";
import prisma from "@/lib/prisma";
import { absoluteUrl, cn, getHSLColor } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

const getTags = async (q?: string) => {
  const tags = await prisma.tag.findMany({
    where: {
      published: true,
      verified: true,
      name: { contains: q, mode: "insensitive" },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      _count: true,
    },
    orderBy: { name: "asc" },
  });
  return tags;
};

export const metadata: Metadata = {
  title: "Tags",
  description:
    "Que vous soyez novice en cuisine ou chef confirmé, vous trouverez ici l'inspiration nécessaire pour épater vos convives et éveiller vos papilles. Des recettes revisitées aux créations originales, notre blog vous accompagne dans toutes vos aventures culinaires",
  keywords: [
    "avantage",
    "cam/avanatge",
    "centre de formation",
    "formation professionnelle",
    "Benjamin Kamala",
    "Logo avantage",
  ],
  openGraph: {
    title: "Tags - Avantage",
    description:
      "Que vous soyez novice en cuisine ou chef confirmé, vous trouverez ici l'inspiration nécessaire pour épater vos convives et éveiller vos papilles. Des recettes revisitées aux créations originales, notre blog vous accompagne dans toutes vos aventures culinaires",
    type: "website",
    url: absoluteUrl("tags"),
  },
};

export default async function TagsPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const tags = await getTags(searchParams.q);
  return (
    <Suspense>
    <div className=" bg-ws-background max-w-screen-xl mx-auto">
      <div className="h-16 flex items-center px-3 space-x-4">
        <h1 className=" font-bold">Tags</h1>
        <div className="flex-1" />
        <SearchTagBar />
      </div>
      
        <div className="p-6">
          <div className={cn("pb-2", searchParams.q ? "block" : "hidden")}>
            <h1 className="text-sm">
              Résultats de recherche pour {searchParams.q}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/t/${tag.slug}`}>
                <Card className="border-none shadow-none hover:shadow">
                  <CardHeader>
                    <CardTitle>
                      <span
                        className={cn()}
                        style={{ color: getHSLColor(tag.name) }}
                      >
                        #
                      </span>
                      {tag.name}
                    </CardTitle>
                    <CardDescription>
                      {tag._count.articles} article(s)
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div
            className={cn(
              " p-6  justify-center items-center text-sm text-muted-foreground",
              tags.length === 0 ? "flex" : "hidden"
            )}
          >
            {searchParams.q ? (
              <p className="text-center text-sm text-muted-foreground">
                Aucun résultat ne correspond à cette requête
              </p>
            ) : (
              <p className="">Pas de tags disponibles.</p>
            )}
          </div>
        </div>
    </div>
    </Suspense>
  );
}
