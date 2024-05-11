"use client";

import { subscriberUser } from "@/actions/subscriber-user";
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
  NewSubscriberSchemaType,
  newSubscriberSchema,
} from "@/lib/zod/subscriber";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const RegisterFormDrawer = () => {
  const [showPWD, setShowPWD] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const pathname = usePathname();

  const form = useForm<NewSubscriberSchemaType>({
    resolver: zodResolver(newSubscriberSchema),
    defaultValues: {},
  });

  const onSubmit = async (formData: NewSubscriberSchemaType) => {
    setLoading(true);
    setOpenForm(false);
    await subscriberUser({ ...formData }, pathname).catch(() => {
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

  return (
    <Drawer open={openForm} onOpenChange={setOpenForm}>
      {/* <DrawerTrigger asChild> */}
      <LoadingButton
        loading={loading}
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          setOpenForm(true);
        }}
        className=" rounded-full w-fit"
        size="sm"
      >
        S&apos;inscrire
      </LoadingButton>
      {/* </DrawerTrigger> */}
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Inscription</DrawerTitle>
                <DrawerDescription>
                  Remplir le formulaire ci-après pour débloquer l&apos;accès au
                  contenu réservé aux membres
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
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
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
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
                            type="tel"
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
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative flex">
                            <Input
                              {...field}
                              type={showPWD ? "text" : "password"}
                              placeholder=""
                              disabled={loading}
                              className={cn("w-full font-black pr-12")}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              disabled={loading}
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
              </div>
              <DrawerFooter>
                <LoadingButton
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  className="w-full"
                >
                  S&apos;inscrire
                </LoadingButton>
                <DrawerClose asChild>
                  <Button variant="outline" disabled={loading}>
                    Annuler
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
