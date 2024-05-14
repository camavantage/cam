"use client";

import { Button } from "@/components/ui/button";
import { DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogProfileImage } from "./ws/dialog-profile-image";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";
import { TbCircleCheckFilled } from "react-icons/tb";
import { AutosizeTextarea } from "./ui/autosize-textarea";
import { EditUserFormSchemaType, editUserformSchema } from "@/lib/zod/users";
import { checkUsername } from "@/actions/ws/users/check-username";
import { IoIosCloseCircle } from "react-icons/io";
import { updateProfile } from "@/actions/update-profile";
import { Profile } from "@/app/(frontoffice)/member/page";
import { useSession } from "next-auth/react";
import { ScrollArea } from "./ui/scroll-area";

type EditProfileFormProps = {
  user: Profile;
};

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ user }) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editUsername, setEditUsername] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<"free" | "used">();
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    user?.image ?? ""
  );
  const { toast } = useToast();
  const { update } = useSession();

  const form = useForm<EditUserFormSchemaType>({
    resolver: zodResolver(editUserformSchema),
    defaultValues: {
      id: user?.id,
      username: `${user?.username}`,
      email: user?.email,
      name: user?.name ?? undefined,
      phone: user?.phone ?? undefined,
      image: user?.image ?? undefined,
      bio: `${user?.bio}`,
    },
  });

  const onSubmit = async (formData: EditUserFormSchemaType) => {
    setLoading(true);
    setOpenForm(false);
    const userProfile = await updateProfile(formData).catch(() => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });
    if (userProfile) {
      update({ ...userProfile });
      toast({
        title: "Enregisté",
        description: "Les modifications ont été bien enregistrer",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setValue("image", currentImageUrl);
  }, [currentImageUrl, form]);

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <LoadingButton
        loading={loading}
        disabled={loading}
        variant="secondary"
        onClick={(e) => {
          e.preventDefault();
          setOpenForm(true);
        }}
        className=" rounded-full w-fit"
        size="sm"
      >
        Modifier le profil
      </LoadingButton>

      <DialogContent  className="max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="">
              <DialogHeader>
                <DialogTitle className="">Profil</DialogTitle>
                <DrawerDescription></DrawerDescription>
              </DialogHeader>
              <ScrollArea className=" h-[calc(100vh-7rem)] pb-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl className="">
                          <Input type="hidden" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end space-x-3 rounded-lg ">
                    {currentImageUrl && (
                      <div className="w-16 h-16 rounded-full">
                        <Image
                          src={currentImageUrl}
                          alt=""
                          className="object-cover w-full h-full rounded-full"
                          height={64}
                          width={64}
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-0.5">
                      <DialogProfileImage
                        currentImageUrl={currentImageUrl}
                        setCurrentImageUrl={setCurrentImageUrl}
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className=" ">
                          <FormLabel>
                            Identifiant{" "}
                            <span className=" text-muted-foreground">
                              (Nom d&apos;utilisateur
                            </span>
                            )
                          </FormLabel>
                          <FormControl>
                            <div className="relative flex">
                              <Input
                                {...field}
                                placeholder=""
                                disabled={!editUsername || loading}
                                className={cn("w-full font-black pr-12")}
                                onChange={async (e) => {
                                  field.onChange(e);
                                  setCheckingUsername(true);
                                  setCheckingStatus(undefined);
                                  const username = await checkUsername(
                                    e.target.value
                                  );
                                  if (username && username !== user?.username) {
                                    setCheckingUsername(false);
                                    setCheckingStatus("used");
                                  } else {
                                    setCheckingUsername(false);
                                    setCheckingStatus("free");
                                  }
                                }}
                              />

                              {checkingUsername && (
                                <AiOutlineLoading className="absolute right-12 top-[10px] animate-spin h-[1.2rem] w-[1.2rem]" />
                              )}
                              {checkingStatus === "free" && (
                                <TbCircleCheckFilled className="absolute right-12 top-[10px] h-[1.2rem] w-[1.2rem] text-green-400" />
                              )}
                              {checkingStatus === "used" && (
                                <IoIosCloseCircle className="absolute right-12 top-[10px] h-[1.2rem] w-[1.2rem] text-red-400" />
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                disabled={loading}
                                size="icon"
                                className=" absolute right-0 rounded-l-none"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditUsername((prev) => !prev);
                                }}
                              >
                                <Edit className=" text-muted-foreground" />
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
                      name="email"
                      render={({ field }) => (
                        <FormItem className=" ">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative flex">
                              <Input
                                {...field}
                                disabled={!editEmail || loading}
                                type="email"
                                placeholder=""
                                className={cn("w-full font-black")}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={loading}
                                className=" absolute right-0 rounded-l-none"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditEmail((prev) => !prev);
                                }}
                              >
                                <Edit className=" text-muted-foreground" />
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem className=" ">
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              type="tel"
                              placeholder=""
                              className={cn("w-full font-black")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem className=" ">
                          <FormControl>
                            <Input {...field} type="hidden" placeholder="" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className=" ">
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder=""
                              disabled={loading}
                              className={cn("w-full font-black")}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem className=" ">
                          <FormLabel>
                            Biographie{" "}
                            <FormDescription className=" inline">
                              (Optionel)
                            </FormDescription>
                          </FormLabel>
                          <FormControl>
                            <AutosizeTextarea
                              {...field}
                              disabled={loading}
                              className="text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <LoadingButton
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  className="w-full"
                >
                  Sauvegarder
                </LoadingButton>
                
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
