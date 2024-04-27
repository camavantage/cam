import { deleteArticle } from "@/actions/ws/articles/delete-article";
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
import { ArticleType } from "@/lib/types";
import { SetStateAction, useState, Dispatch } from "react";

type DrawerDeleteArticleProps = {
  article?: ArticleType | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const DrawerDeleteArticle: React.FC<DrawerDeleteArticleProps> = ({
  article,
  loading,
  setLoading,
}) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { toast } = useToast();
  const handleDelete = async () => {
    if (article?.id) {
      setOpenDelete(false);
      setLoading(true);
      await deleteArticle({
        articleId: article.id,
        redirectToArticles: true,
      }).catch(() => {
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
              Voulez-vous supprimer l&apos;: {article?.title}?
            </DrawerTitle>
            <DrawerDescription>
              Si oui, assurez-vous que la suppression est nécessaire et justifiée. Noter que cette
              opération est irréversible.
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
