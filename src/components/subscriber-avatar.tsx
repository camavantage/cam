"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LiaUserSolid } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";
import { LoginFormDrawer } from "./login-form";
import React from "react";
import { Button } from "./ui/button";
import { RegisterFormDrawer } from "./register-form";

import { logOut } from "@/actions/auth";

export function SubscriberAvatar() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const signOut = async () => {
    setLoading(true);
    await logOut(pathname).catch((e) => {
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

  if (status === "loading") {
    return undefined;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex space-x-2 ">
        <RegisterFormDrawer /> <LoginFormDrawer />
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex space-x-2 pr-0 rounded-full">
          <span className="">Mon compte</span>
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback className=" uppercase bg-foreground text-background">
              {session?.user?.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push(
              session?.user.role === "subscriber" ||
                session?.user.role === "author" ||
                session?.user.role === "editor"
                ? `/member`
                : "/ws"
            );
          }}
          disabled={loading}
        >
          <LiaUserSolid className="mr-2 " />
          Espace membre
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} disabled={loading}>
          <FiLogOut className="mr-2" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
