"use client";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { languages } from "@/lib/data/languages";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { LoadingButton } from "../ui/loading-button";
import { SetupSchemaType, setupSchema } from "@/lib/zod/setup";
import { setup } from "@/actions/ws/setup";

export const SetupForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPWD, setShowPWD] = useState<boolean>(false);
  const [showConfirmPWD, setShowConfirmPWD] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<SetupSchemaType>({
    resolver: zodResolver(setupSchema),
    defaultValues: {},
  });

  async function onSubmit(values: SetupSchemaType) {
    setLoading(true);
    await setup(values).catch(() => {
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="space-y-4 h-screen flex justify-center items-center py-6">
            <Card className="shadow-none  w-[360px] mx-auto ">
              <CardHeader className="">
                <CardTitle className="">Configuration du site</CardTitle>
                <CardDescription>
                  Pour commencer, rassurer vous avoir défini les variables
                  d&apos;environnement (informations sensibles) et autres
                  configurations spécifiques à l&apos;environnement.
                  Principalement{" "}
                  <pre className="inline text-blue-400">
                    <code>DATABASE_URL</code>
                  </pre>{" "}
                  et{" "}
                  <pre className="inline text-blue-400">
                    <code>AUTH_SECRET</code>
                  </pre>
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <div className=" space-y-4">
                  <Card className="shadow-none border-none bg-transparent">
                    <CardHeader className="px-0">
                      <CardTitle className="text-lg font-semibold text-foreground leading-3">
                        Title & Description
                      </CardTitle>
                      <CardDescription>
                        Les détails pour identifier votre site web sur internet
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className=" ">
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="title"
                                placeholder=""
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
                        name="description"
                        render={({ field }) => (
                          <FormItem className=" ">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <AutosizeTextarea
                                {...field}
                                className="text-muted-foreground"
                                disabled={loading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  <Card className="shadow-none border-none bg-transparent ">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-lg font-semibold text-foreground leading-3">
                        Langue de publication
                      </CardTitle>
                      <CardDescription>
                        Définir la langue de vos publications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div>
                        <FormField
                          control={form.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Langue</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={loading}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une langue" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {languages.map((lang) => (
                                    <SelectItem
                                      key={lang.value}
                                      value={lang.value}
                                    >
                                      {lang.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-none border-none bg-transparent ">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-lg font-semibold text-foreground leading-3">
                        Administrateur
                      </CardTitle>
                      <CardDescription>
                        L&apos;utilisateur principal ou peut-être le
                        propriétaire du site
                      </CardDescription>
                    </CardHeader>
                    <CardContent className=" space-y-2 px-0">
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
                                  />
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
                    </CardContent>
                  </Card>
                  <LoadingButton
                    loading={loading}
                    disabled={loading}
                    type="submit"
                    className="w-full"
                  >
                    Appliquer
                  </LoadingButton>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </form>
      </Form>
    </div>
  );
};
