import { deleteTag } from "@/actions/ws/tags/delete-tag";
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
import { TagType } from "@/lib/types";
import { SetStateAction, useState, Dispatch } from "react";

type DrawerDeleteTagProps = {
  tag?: TagType | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const DrawerDeleteTag: React.FC<DrawerDeleteTagProps> = ({
  tag,
  loading,
  setLoading,
}) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { toast } = useToast();
  const handleDelete = async () => {
    if (tag?.id) {
      setLoading(true);
      await deleteTag({ tagId: tag?.id, redirectToTags: true }).catch(() => {
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
            <DrawerTitle>Voulez-vous supprimer #{tag?.name}?</DrawerTitle>
            <DrawerDescription>
              Si oui, assurez-vous que la suppression est nécessaire et justifiée. ce tag sera retiré de tout contenu qui l&apos;utilise.
              Noter que cette opération est irréversible.
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
