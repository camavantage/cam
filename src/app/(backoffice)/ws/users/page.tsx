import { TooltipWrap } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCard } from "@/components/ws/users/card";
import { SearchUserBar } from "@/components/ws/users/search-bar";
import prisma from "@/lib/prisma";
import { RoleType } from "@/lib/types";
import { cn, roleLabel } from "@/lib/utils";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";

const getUsers = async (role?: RoleType, q?: string) => {
  "use server";
  if (role) {
    const users = await prisma.user
      .findMany({
        where: {
          AND: [
            { role: role },
            {
              OR: [
                { name: { contains: q,mode:"insensitive" } },
                { email: { contains: q,mode:"insensitive" } },
                { username: { contains: q,mode:"insensitive" } },
              ],
            },
          ],
        },
        orderBy: { updatedAt: "desc" },
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return users;
  } else {
    const users = await prisma.user
      .findMany({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: q,mode:"insensitive" } },
                { email: { contains: q,mode:"insensitive" } },
                { username: { contains: q,mode:"insensitive" } },
              ],
            },
          ],
        },
        orderBy: { updatedAt: "desc" },
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return users;
  }
};

export default async function WSUsersPage({
  searchParams,
}: {
  searchParams: { role: RoleType; q: string };
}) {
  const users = await getUsers(searchParams.role, searchParams.q);
  return (
    <div className=" bg-ws-background">
      <div className="h-16 flex items-center px-3 space-x-4">
        <h1 className=" font-bold">Membres</h1>
        <div className="flex-1" />
        <SearchUserBar />
        <TooltipWrap content="Créer un compte">
          <Link href="/ws/users/new">
            <Button variant="outline" className=" bg-transparent">
              <HiPlus className="h-[1.2rem] w-[1.2rem] mr-2" />
              <span>Créer</span>
            </Button>
          </Link>
        </TooltipWrap>
      </div>
      <ScrollArea className=" h-[calc(100vh-64px)]">
        <div className="px-6 pb-6">
          <div className=" flex w-full justify-start pb-4 text-base text-muted-foreground">
            <Link href="/ws/users">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  !searchParams.role &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                Tous
              </Button>
            </Link>
            <Link href="/ws/users?role=subscriber">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  searchParams.role === "subscriber" &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                Abonnés
              </Button>
            </Link>
            <Link href="/ws/users?role=author">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  searchParams.role === "author" &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                Auteurs
              </Button>
            </Link>
            <Link href="/ws/users?role=editor">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  searchParams.role === "editor" &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                Éditeurs
              </Button>
            </Link>
            <Link href="/ws/users?role=admin">
              <Button
                variant={"ghost"}
                size="sm"
                className={cn(
                  searchParams.role === "admin" &&
                    "text-primary bg-background hover:bg-background"
                )}
              >
                Administrateurs
              </Button>
            </Link>
          </div>
          <div className={cn("pb-2", searchParams.q ? "block" : "hidden")}>
            <h1 className="text-sm">
              Résultats de recherche pour {searchParams.q}
            </h1>
          </div>
          <div className=" grid grid-cols-1 gap-3">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
          <div
            className={cn(
              " h-[calc(100vh-192px)] p-6  justify-center items-center text-sm text-muted-foreground",
              users.length === 0 ? "flex" : "hidden"
            )}
          >
            {searchParams.q ? (
              <p className="text-center text-sm text-muted-foreground">
                Aucun résultat ne correspond à cette requête
              </p>
            ) : (
              <p className="">
                Pas des comptes {roleLabel(searchParams.role)} disponibles.
                <Link href="/ws/users/new">
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
