"use client";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import {
  NewNewsletterContactSchemaType,
  newNewsletterContactSchema,
} from "@/lib/zod/newsletter";
import { createNewletterContact } from "@/actions/ws/newsletter";
import { useState } from "react";
import { LoadingButton } from "./ui/loading-button";
import { useToast } from "./ui/use-toast";
import { RegisterFormDrawer } from "./register-form";
import { LoginFormDrawer } from "./login-form";

export const NewsletterSection: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  // const [subscribed, setSubscribed] = useState(false);
  // const { toast } = useToast();
  // const form = useForm<NewNewsletterContactSchemaType>({
  //   resolver: zodResolver(newNewsletterContactSchema),
  // });
  // const onSubmit = async (formData: NewNewsletterContactSchemaType) => {
  //   setLoading(true);
  //   const data = await createNewletterContact(formData).catch(() => {
  //     toast({
  //       title: "Echec",
  //       variant: "destructive",
  //       description: (
  //         <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
  //       ),
  //     });
  //     setLoading(false);
  //   });
  //   if (data) {
  //     toast({
  //       title: "Inscription effectuée",
  //       description: (
  //         <div>Vous êtes maintenant inscrit à notre newsletter📨🎉🔥</div>
  //       ),
  //     });
  //     setLoading(false);
  //     setSubscribed(true);
  //   }
  // };
  return (
    <PageHeader>
      <PageHeaderHeading>Abonnez-vous!</PageHeaderHeading>
      <PageHeaderDescription className="">
        Connectez-vous à votre compte ou inscrivez-vous pour avoir accès au
        contenu réservé aux membres et aux mises à jour exclusives.
        S&apos;inscrire c&apos;est gratuit🎁🎉 et sans engagement.
      </PageHeaderDescription>
      <PageActions>
        <RegisterFormDrawer />
        <span>ou</span>
        <LoginFormDrawer />
      </PageActions>
    </PageHeader>
  );
  {
    /* <Form {...form}>
          <form
            className="relative mt-2 w-[300px]"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        {...field}
                        type="email"
                        placeholder="Votre adresse mail"
                        className="flex-1 pr-12 rounded-full"
                        disabled={loading}
                      />
                      <LoadingButton
                        type="submit"
                        className={cn(
                          "absolute bg-transparent right-0 rounded-l-none rounded-r-full "
                        )}
                        variant="outline"
                        loading={loading}
                        disabled={loading}
                      >
                        S&apos;inscrire
                      </LoadingButton>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form> */
  }
};

// <PageHeader>
//   <PageHeaderHeading>Félicitation🎉</PageHeaderHeading>
//   <PageHeaderDescription>
//     Vous êtes maintenant inscrit à notre newsletter📨🎉🔥
//   </PageHeaderDescription>
// </PageHeader>
