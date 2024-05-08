import Link from "next/link";
import { siteConfig } from "@/lib/data/site";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";
import { SearchArticleBar } from "./ws/articles/search-bar";
import { BsFacebook } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import React, { Suspense } from "react";
import { UserAvatar } from "./ws/user-avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { logOut } from "@/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TooltipWrap } from "./tooltip-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LiaUserSolid } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";
import { LoginFormDrawer } from "./login-form";

export function SiteHeader() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const signOut = async () => {
    setLoading(true);
    await logOut().catch((e) => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-6">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <Suspense>
              <SearchArticleBar />
            </Suspense> */}
            {session ? (
              <DropdownMenu>
                <TooltipWrap content="Compte" side="right">
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Avatar>
                        <AvatarImage src={session?.user?.image || ""} />
                        <AvatarFallback className=" uppercase bg-foreground text-background">
                          {session?.user?.name?.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipWrap>
                <DropdownMenuContent align="end" className="">
                  <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/account`);
                    }}
                    disabled={loading}
                  >
                    <LiaUserSolid className="mr-2 " />
                    Mon compte
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} disabled={loading}>
                    <FiLogOut className="mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>
                <LoginFormDrawer />
              </div>
            )}
          </div>
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <BsFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
            <Link
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <RiWhatsappFill className="h-5 w-5 fill-current" />
                <span className="sr-only">Whatsapp</span>
              </Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
