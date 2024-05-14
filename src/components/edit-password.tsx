"use client";

import { changeUserPassword } from "@/actions/ws/users/change-password";
import { Profile } from "@/app/(frontoffice)/member/page";
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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  EditPasswordformSchemaType,
  editPasswordformSchema,
} from "@/lib/zod/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type DrawerChangePasswordProps = {
  user: Profile;
};

export const EditPasswordForm: React.FC<DrawerChangePasswordProps> = ({
  user,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showOldPWD, setShowOldPWD] = useState<boolean>(false);
  const [showNewPWD, setShowNewPWD] = useState<boolean>(false);
  const [showConfirmPWD, setShowConfirmPWD] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<EditPasswordformSchemaType>({
    resolver: zodResolver(editPasswordformSchema),
    defaultValues: {},
  });

  const onSubmit = async (formData: EditPasswordformSchemaType) => {
    if (user?.id) {
      setOpenDelete(false);
      setLoading(true);
      const updatedUser = await changeUserPassword({
        ...formData,
        userId: user.id,
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
      if (updatedUser) {
        toast({
          title: "Modifié",
          variant: "success",
          description: "Le mot de passe a été bien modifié",
        });
        setLoading(false);
        form.reset();
      }
    }
  };

  return (
    <Drawer open={openDelete} onOpenChange={setOpenDelete}>
      <LoadingButton
        loading={loading}
        disabled={loading}
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          setOpenDelete(true);
        }}
        className=" w-fit rounded-full"
        size="sm"
      >
        Sécurité
      </LoadingButton>

      <DrawerContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Sécurité du compte</DrawerTitle>
                <DrawerDescription>
                  Vous pouvez changer votre mot de passe ici
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
                <div>
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Mot de passe actuel</FormLabel>
                        <FormControl>
                          <div className="relative flex">
                            <Input
                              {...field}
                              type={showOldPWD ? "text" : "password"}
                              placeholder=""
                              className={cn("w-full font-black pr-12")}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className=" absolute right-0 rounded-l-none"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowOldPWD((prev) => !prev);
                              }}
                            >
                              {showOldPWD ? (
                                <EyeOffIcon className="text-muted-foreground" />
                              ) : (
                                <EyeIcon className=" text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative flex">
                            <Input
                              {...field}
                              type={showNewPWD ? "text" : "password"}
                              placeholder=""
                              className={cn("w-full font-black pr-12")}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className=" absolute right-0 rounded-l-none"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowNewPWD((prev) => !prev);
                              }}
                            >
                              {showNewPWD ? (
                                <EyeOffIcon className="text-muted-foreground" />
                              ) : (
                                <EyeIcon className=" text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Confirmer le mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative flex">
                            <Input
                              {...field}
                              type={showConfirmPWD ? "text" : "password"}
                              placeholder=""
                              className={cn("w-full font-black pr-12")}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className=" absolute right-0 rounded-l-none"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowConfirmPWD((prev) => !prev);
                              }}
                            >
                              {showConfirmPWD ? (
                                <EyeOffIcon className="text-muted-foreground" />
                              ) : (
                                <EyeIcon className=" text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button type="submit">Changer</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Annuler</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
