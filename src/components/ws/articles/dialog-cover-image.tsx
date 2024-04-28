import { uploadFile } from "@/actions/ws/upload-file";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

const formSchema = z.object({
  imageUrl: z.string().url({
    message: "L'URL de l'image n'est pas valide",
  }),
});
type DialogCoverImageProps = {
  currentImageUrl: string;
  setCurrentImageUrl: Dispatch<SetStateAction<string>>;
};

export const DialogCoverImage: React.FC<DialogCoverImageProps> = ({
  currentImageUrl,
  setCurrentImageUrl,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const formImageUrl = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: currentImageUrl,
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setCurrentImageUrl(formData.imageUrl);
    setOpenDialog(false);
    formImageUrl.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <LoadingButton
          loading={uploading}
          disabled={uploading}
          variant="secondary"
        >
          {currentImageUrl ? "Remplacer l'image" : "Image de couvertue"}
        </LoadingButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-ws-background">
        <Form {...formImageUrl}>
          <form className="space-y-8">
            <DialogHeader>
              <DialogTitle>Image de couverture</DialogTitle>
              <DialogDescription>
                Choisissez une image accrocheuse et pertinente qui résume le
                sujet de l&apos;article tout en suscitant la curiosité.
                Assurez-vous qu&apos;elle renforce le message de votre article
                et invite les lecteurs à plonger dans son contenu
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Tabs defaultValue="link" className="w-full ">
                <TabsList className=" bg-transparent px-0">
                  <TabsTrigger
                    value="link"
                    className=" shadow-none"
                    disabled={uploading}
                  >
                    Lien
                  </TabsTrigger>
                  <TabsTrigger value="upload">Téléverser</TabsTrigger>
                </TabsList>
                <TabsContent value="link">
                  <div>
                    <FormField
                      control={formImageUrl.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem className=" ">
                          {/* <FormLabel>Adresse de l&apos;image</FormLabel> */}
                          <FormControl>
                            <Input
                              {...field}
                              type="url"
                              className=" bg-transparent"
                              placeholder="Coller l'URL de l'image ici"
                              onChange={(e) => {
                                field.onChange(e);
                                formImageUrl.trigger("imageUrl");
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="upload">
                  <div>
                    <Input
                      type="file"
                      className=" bg-transparent"
                      placeholder="Coller l'URL de l'image ici"
                      onChange={async (e) => {
                        if (e.target.files) {
                          setUploading(true);
                          setOpenDialog(false);
                          const url = await uploadFile(e.target.files[0]).catch(
                            () => {
                              toast({
                                title: "Echec",
                                variant: "destructive",
                                description: (
                                  <div>
                                    Une erreur s&apos;est produite lors du
                                    téléversement de l&apos;image. Veuillez
                                    réessayer!
                                  </div>
                                ),
                              });
                              setUploading(false);
                              setOpenDialog(true);
                            }
                          );
                          if (url) {
                            setCurrentImageUrl(url);
                            formImageUrl.reset();
                            setUploading(false);
                          }
                        }
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter className=" justify-end ">
              <DialogClose asChild>
                <Button type="button" variant="ghost" disabled={uploading}>
                  Annuler
                </Button>
              </DialogClose>
              <LoadingButton
                type="button"
                loading={uploading}
                disabled={uploading}
                onClick={(e) => {
                  e.preventDefault();
                  formImageUrl.trigger();
                  if (formImageUrl.formState.isValid) {
                    onSubmit(formImageUrl.getValues());
                  }
                }}
              >
                Insérer
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
