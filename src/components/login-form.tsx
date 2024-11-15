"use client";
import { signInAsASubscriber } from "@/actions/auth";
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
import { SignInSchemaType, signInSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const LoginFormDrawer = () => {
  const [showPWD, setShowPWD] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams=useSearchParams()

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {},
  });

  const onSubmit = async (formData: SignInSchemaType) => {
    setLoading(true);
    setOpenForm(false)
    await signInAsASubscriber({ ...formData }, pathname).catch(() => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });
    router.refresh()
  };

  function notifyConnectedUser(message: string | null) {
    if (message === "true") {
      toast({
        title: "✅Connecté",
        description: "Vous êtes maintenant connecté",
      });
      router.replace(pathname);
    }
  }

  useEffect(() => {
    notifyConnectedUser(searchParams.get("connected"));
  }, []);

  return (
    <Drawer open={openForm} onOpenChange={setOpenForm}>
      {/* <DrawerTrigger asChild> */}
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
        Se connecter
      </LoadingButton>
      {/* </DrawerTrigger> */}
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Authentification</DrawerTitle>
                <DrawerDescription>
                  Entrez votre email et mot de passe ci-dessous pour vous
                  connecter à votre compte
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <FormLabel>Adresse mail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="nom@exemple.com"
                          disabled={loading}
                          className={cn("w-full font-black")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                            className=" absolute right-0 rounded-l-none hover:bg-transparent"
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
              <DrawerFooter>
                <LoadingButton
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  className="w-full"
                >
                  Connecter
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
