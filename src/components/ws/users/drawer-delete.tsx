import { deleteUser } from "@/actions/ws/users/delete-user";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/use-toast";
import { UserType } from "@/lib/types";
import { SetStateAction, useState, Dispatch } from "react";

type DrawerDeleteUserProps = {
  user?: UserType | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const DrawerDeleteUser: React.FC<DrawerDeleteUserProps> = ({
  user,
  loading,
  setLoading,
}) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { toast } = useToast();
  const handleDelete = async () => {
    if (user?.id) {
      setOpenDelete(false);
      setLoading(true);
      await deleteUser({ userId: user.id, redirectToUsers: true }).catch(() => {
        toast({
          title: "Echec",
          variant: "destructive",
          description: (
            <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
          ),
        });
        setLoading(false);
      });
    }
  };

  return (
    <Drawer open={openDelete} onOpenChange={setOpenDelete}>
      {/* <DrawerTrigger asChild> */}
      <LoadingButton
        loading={loading}
        disabled={loading}
        variant="destructive"
        onClick={(e) => {
          e.preventDefault();
          setOpenDelete(true);
        }}
        size="sm"
      >
        Supprimer
      </LoadingButton>
      {/* </DrawerTrigger> */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              Voulez-vous supprimer le compte {user?.name}?
            </DrawerTitle>
            <DrawerDescription>
              En supprimant ce compte, vous acceptez perdre tout contenu qui lui
              est lié. Noter que cette opération est irréversible.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="destructive" onClick={handleDelete}>
              Oui
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Non</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
