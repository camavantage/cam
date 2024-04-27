import { TooltipWrap } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TagCard } from "@/components/ws/tags/card";
import { SearchTagBar } from "@/components/ws/tags/search-bar";
import prisma from "@/lib/prisma";
import { TagType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";

const getTags = async (q?: string) => {
  let tags: TagType[] = [];
  if (q) {
    tags = await prisma.tag.findMany({
      where: { name: { contains: q, mode:"insensitive" } },
      orderBy:{name:"asc"}
    });
  } else {
    tags = await prisma.tag.findMany({ orderBy: { updatedAt: "desc" } });
  }

  return tags;
};

export default async function WSTagsPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const tags = await getTags(searchParams.q);
  return (
    <div className=" bg-ws-background">
      <div className="h-16 flex items-center px-3 space-x-4">
        <h1 className=" font-bold">Tags</h1>

        <div className="flex-1" />
        <SearchTagBar />

        <TooltipWrap content="Créer une tag">
          <Link href="/ws/tags/new">
            <Button variant="outline" className=" bg-transparent">
              <HiPlus className="h-[1.2rem] w-[1.2rem] mr-2" />
              <span>Créer</span>
            </Button>
          </Link>
        </TooltipWrap>
      </div>
      <ScrollArea className=" h-[calc(100vh-64px)]">
        <div className="p-6">
          <div className={cn("pb-2", searchParams.q ? "block" : "hidden")}>
            <h1 className="text-sm">Résultats de recherche pour {searchParams.q}</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tags.map((tag) => (
              <TagCard key={tag.id} tag={tag}  withDescription withActions className=" border-none"/>
            ))}
          </div>
          <div
            className={cn(
              " h-[calc(100vh-192px)] p-6  justify-center items-center text-sm text-muted-foreground",
              tags.length === 0 ? "flex" : "hidden"
            )}
          >
            {searchParams.q ? (
              <p className="text-center text-sm text-muted-foreground">
                Aucun résultat ne correspond à cette requête
              </p>
            ) : (
              <p className="">
                Pas de tags disponibles.
                <Link href="/ws/tags/new">
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
