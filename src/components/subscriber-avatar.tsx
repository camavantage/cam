"use client";
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
import React from "react";
import { Button } from "./ui/button";

export function SubscriberAvatar() {
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

  if (!session) {
    return <LoginFormDrawer />;
  }
  return (
    <DropdownMenu>
      <TooltipWrap content="Compte" side="right">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
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
  );
}
