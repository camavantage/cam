"use client";

import { deleteUser } from "@/actions/ws/users/delete-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { UserType } from "@/lib/types";
import { getHSLColor, roleLabel } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { RxStarFilled } from "react-icons/rx";

type UserCardProps = {
  user: UserType;
};
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { toast } = useToast();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setOpenDelete(false);
    setLoading(true);
    const deletedTag = await deleteUser({ userId: user.id }).catch(() => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });
    if (deletedTag) {
      toast({
        title: "Supprimé",
        variant: "success",
        description: "Le compte a été bien supprimer",
      });
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5 bg-background rounded-lg">
      <div className="flex flex-1 space-x-4">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback
            className=" uppercase"
            style={{ color: getHSLColor(`${user.name}`) }}
          >
            {user?.name?.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/ws/users/${user.username}`}>
            <h3 className="font-semibold leading-none tracking-tight">
              {user.name}{" "}
              {user.verified && (
                <RxStarFilled className=" inline text-blue-400" />
              )}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">
            @{user.username}{" "}
            <Badge variant="secondary" className="mr-1">
              {roleLabel(user.role)}
            </Badge>
            {user.blocked && <Badge variant="destructive">Bloqué</Badge>}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:items-end py-4 md:py-0 pl-14 md:pl-0">
        <Link href={`/ws/users/${user.username}`}>
          <h3 className="text-sm text-muted-foreground leading-none tracking-tight">
            {user.phone ?? ""}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground"> {user.email}</p>
      </div>
      <div className="flex justify-end items-end space-x-3">
        <Link href={`/ws/users/${user.username}`}>
          <Button variant="secondary" size="sm" disabled={loading}>
            Modifier
          </Button>
        </Link>
        <Popover open={openDelete} onOpenChange={setOpenDelete}>
          <PopoverTrigger disabled={loading}>
            <LoadingButton
              variant="ghost"
              size="sm"
              loading={loading}
              type="button"
            >
              Supprimer
            </LoadingButton>
          </PopoverTrigger>
          <PopoverContent className=" border-none">
            <div>
              <h3 className="text-sm font-semibold">
                Voulez-vous supprimer @{user.name}?
              </h3>
              <p className=" text-sm opacity-90">
                Si oui, cet utisateur perdra son compte et tout son contenu.
                Noter que cette opération est irréversible.
              </p>
            </div>
            <div className="flex justify-end space-x-3 mt-3">
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Oui
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setOpenDelete(false);
                }}
              >
                Non
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
