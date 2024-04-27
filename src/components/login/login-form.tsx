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
import { SignInSchemaType, signInSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { LoadingButton } from "../ui/loading-button";
import { Separator } from "../ui/separator";
import { ColoredGoogleIcon } from "./colored-google-icon";
import { useSearchParams } from "next/navigation";
import { signWithCredentials } from "@/actions/auth";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPWD, setShowPWD] = useState<boolean>();
  const { toast } = useToast();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {},
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  async function onSubmit(values: SignInSchemaType) {
    setLoading(true);
    await signWithCredentials({ ...values, callbackUrl }).catch(() => {
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 min-h-screen flex justify-center items-center"
        >
          <Card className="shadow-none bg-transparent w-[330px] mx-auto ">
            <CardHeader className="">
              <CardTitle className="">Authentification</CardTitle>
              <CardDescription>
                Entrez votre email et mot de passe ci-dessous pour vous
                connecter à votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className=" space-y-4">
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
                <LoadingButton
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  className="w-full"
                >
                  Connecter
                </LoadingButton>
                <Separator />
                <Button
                  disabled={loading}
                  type="submit"
                  variant="ghost"
                  className="w-full"
                >
                  <ColoredGoogleIcon className="inline h-[1.2rem] w-[1.2rem] mr-2" />{" "}
                  Continuer avec Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};
