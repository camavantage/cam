import { changeUserPassword } from "@/actions/ws/users/change-password";
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
import { UserType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ChangePasswordformSchemaType,
  changePasswordformSchema,
} from "@/lib/zod/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { SetStateAction, useState, Dispatch } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type DrawerChangePasswordProps = {
  user?: UserType | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const DrawerChangePassword: React.FC<DrawerChangePasswordProps> = ({
  user,
  loading,
  setLoading,
}) => {
  const [showPWD, setShowPWD] = useState<boolean>(false);
  const [showConfirmPWD, setShowConfirmPWD] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { toast } = useToast();

  const formPWD = useForm<ChangePasswordformSchemaType>({
    resolver: zodResolver(changePasswordformSchema),
    defaultValues: {},
  });

  const onSubmit = async (formData: ChangePasswordformSchemaType) => {
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
        formPWD.reset();
      }
    }
  };

  return (
    <Drawer open={openDelete} onOpenChange={setOpenDelete}>
      {/* <DrawerTrigger asChild> */}
      <LoadingButton
        loading={loading}
        disabled={loading}
        variant="secondary"
        onClick={(e) => {
          e.preventDefault();
          setOpenDelete(true);
        }}
        className=" w-fit"
        size="sm"
      >
        Changer le mot de passe
      </LoadingButton>
      {/* </DrawerTrigger> */}
      <DrawerContent>
        <Form {...formPWD}>
          <form className="space-y-8">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>
                  Changer le mot de passe de {user?.name}
                </DrawerTitle>
                <DrawerDescription>
                  Vous avez le pouvoir de changer le mot de passe des
                  utilisateurs
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
                <div>
                  <FormField
                    control={formPWD.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative flex">
                            <Input
                              {...field}
                              type={showPWD ? "text" : "password"}
                              placeholder=""
                              className={cn("w-full font-black pr-12")}
                              onChange={(e) => {
                                field.onChange(e);
                                formPWD.trigger("newPassword");
                              }}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className=" absolute right-0 rounded-l-none"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowPWD((prev) => !prev);
                              }}
                            >
                              {showPWD ? (
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
                    control={formPWD.control}
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
                              onChange={(e) => {
                                field.onChange(e);
                                formPWD.trigger("confirmNewPassword");
                              }}
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
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    formPWD.trigger();
                    if (formPWD.formState.isValid) {
                      onSubmit(formPWD.getValues());
                    }
                  }}
                >
                  Changer
                </Button>
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
