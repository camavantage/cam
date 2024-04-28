"use client";
import { TooltipWrap } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoadingButton } from "@/components/ui/loading-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { createUser } from "@/actions/ws/users/create-user";
import { useToast } from "@/components/ui/use-toast";
import { checkUsername } from "@/actions/ws/users/check-username";
import { AiOutlineLoading } from "react-icons/ai";
import { TbCircleCheckFilled } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import { roles } from "@/lib/data/roles";
import { NewUserformSchemaType, newUserformSchema } from "@/lib/zod/users";

export default function NewUserForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPWD, setShowPWD] = useState<boolean>(false);
  const [showConfirmPWD, setShowConfirmPWD] = useState<boolean>(false);
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<"free" | "used">();
  const { toast } = useToast();

  const form = useForm<NewUserformSchemaType>({
    resolver: zodResolver(newUserformSchema),
    defaultValues: {
      bio: "",
      role: "subscriber",
      blocked: false,
      verified: true,
    },
  });

  async function onSubmit(values: NewUserformSchemaType) {
    setLoading(true);
    await createUser(values).catch(() => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={cn(" bg-ws-background min-h-screen")}>
          <div className=" h-16 px-3 flex items-center gap-x-5">
            <div>
              <h1 className="text-sm font-bold">Nouveau compte</h1>
            </div>
            <div className="flex-1" />

            <TooltipWrap content="Enregister les modifications">
              <LoadingButton
                type="submit"
                variant="default"
                loading={loading}
                disabled={loading}
                className=""
              >
                Enregistrer
              </LoadingButton>
            </TooltipWrap>
            <TooltipWrap content="Fermer l'éditeur">
              <Button
                variant="ghost"
                className=""
                size="icon"
                type="button"
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
              >
                <GrClose className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </TooltipWrap>
          </div>

          <div className="grid grid-cols-1  lg:grid-cols-6 max-w-screen-lg mx-auto min-w-60 ">
            <div className=" col-span-2 lg:rounded-lg bg-background">
              <ScrollArea className=" lg:h-[calc(100vh-66px)] ">
                <Card className=" border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Compte</CardTitle>
                    <CardDescription>
                      Profil personnel pour chaque membre (Abonné, Auteur,
                      Éditeur, Contributeur, Administrateur, etc.)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className=" space-y-4 flex flex-col  ">
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
                                    disabled={loading}
                                    className={cn("w-full font-black pr-12")}
                                    onChange={async (e) => {
                                      field.onChange(e);
                                      setCheckingUsername(true);
                                      setCheckingStatus(undefined);
                                      const username = await checkUsername(
                                        e.target.value
                                      );
                                      if (username) {
                                        setCheckingUsername(false);
                                        setCheckingStatus("used");
                                      } else {
                                        setCheckingUsername(false);
                                        setCheckingStatus("free");
                                      }
                                    }}
                                  />

                                  {checkingUsername && (
                                    <AiOutlineLoading className="absolute right-3 top-[10px] animate-spin h-[1.2rem] w-[1.2rem]" />
                                  )}
                                  {checkingStatus === "free" && (
                                    <TbCircleCheckFilled className="absolute right-3 top-[10px] h-[1.2rem] w-[1.2rem] text-green-400" />
                                  )}
                                  {checkingStatus === "used" && (
                                    <IoIosCloseCircle className="absolute right-3 top-[10px] h-[1.2rem] w-[1.2rem] text-red-400" />
                                  )}
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
                                      <EyeIcon className=" text-foreground" />
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
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem className=" ">
                              <FormLabel>Confirmer le mot de passe</FormLabel>
                              <FormControl>
                                <div className="relative flex">
                                  <Input
                                    {...field}
                                    type={showConfirmPWD ? "text" : "password"}
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

                      <div>
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rôle</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={loading}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un rôle" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {roles.map((role) => (
                                    <SelectItem
                                      key={role.value}
                                      value={role.value}
                                    >
                                      {role.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Zone de contrôles</CardTitle>
                    <CardDescription>
                      L&apos;équipe de fact-checking, a pour rôle principal de
                      vérifier la véracité des informations, déclarations ou
                      affirmations publiées
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="verified"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ">
                            <div className="space-y-0.5">
                              <FormLabel>Vérification</FormLabel>
                              <FormDescription>
                                Le compte est-il vérifié et conforme?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={loading}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="blocked"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ">
                            <div className="space-y-0.5">
                              <FormLabel>Blocage</FormLabel>
                              <FormDescription>
                                Bloquez le compte s&apos;il a publié de fausses
                                informations ou violé la ligne éditoriale
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled
                                aria-readonly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
            <div className=" col-span-4">
              <ScrollArea className=" lg:h-[calc(100vh-66px)] pl-6 py-6 bg-ws-background"></ScrollArea>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
