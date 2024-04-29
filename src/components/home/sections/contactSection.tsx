"use client";
import Image from "next/image";
import s from "@/styles/Home.module.scss";
import { RiWhatsappFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

const formData = z.object({
  email: z
    .string({ required_error: "L'adresse mail est obligatoire" })
    .email({ message: "Email invalide" }),
});

const ContactSection: React.FC = () => {
  const form = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
  });
  const onSubmit = (data: z.infer<typeof formData>) => {};
  return (
    <PageHeader>
      <PageHeaderHeading>Abonnez-vous à notre newsletter</PageHeaderHeading>
      <PageHeaderDescription>
      Pour ne rien
                    rater, inscrivez-vous à notre newsletter par e-mail et débloquez l&apos;accès au
        contenu réservé aux membres et aux mises à jour exclusives.
      </PageHeaderDescription>
      <PageActions>
        <Form {...form}>
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
                      />
                      <Button
                        type="submit"
                        className={cn(
                          "absolute bg-transparent right-0 rounded-l-none rounded-r-full "
                        )}
                        variant="outline"
                      >
                        S&apos;inscrire
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </PageActions>
    </PageHeader>
  );
};

export default ContactSection;
