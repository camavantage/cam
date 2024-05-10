"use client";
import { useState } from "react";
import { LoadingButton } from "./ui/loading-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { useToast } from "./ui/use-toast";
import {
  confirmOrderArticle,
  rejectOrderArticle,
} from "@/actions/order-article";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const acceptOrderSchema = z.object({
  price: z.number(),
});

type AcceptOrderProps = {
  clientId: string;
  articleId: string;
  price: number;
};

export function AcceptOrder({ clientId, articleId, price }: AcceptOrderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof acceptOrderSchema>>({
    resolver: zodResolver(acceptOrderSchema),
    defaultValues: { price: price },
  });

  const onSubmit = async (formData: z.infer<typeof acceptOrderSchema>) => {
    setLoading(true);
    setOpen(false);
    await confirmOrderArticle({
      clientId,
      articleId,
      price: formData.price,
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
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <LoadingButton
        loading={loading}
        disabled={loading}
        onClick={() => {
          setOpen(true);
        }}
      >
        Confirmer
      </LoadingButton>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Confirmation</DrawerTitle>
                <DrawerDescription>
                  Rassurez-vous que le client utilisateur a déjà payé pour
                  l&apos;article.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
                <div>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem
                        className={cn(
                          "relative flex items-center space-x-1 h-10 rounded-lg bg-background"
                        )}
                      >
                        <FormLabel className=" absolute top-4 right-2 mb-0">
                          USD
                        </FormLabel>
                        <FormControl className="">
                          <Input
                            type="number"
                            {...field}
                            step={0.01}
                            placeholder="0.00"
                            className="font-bold pr-10"
                            onChange={(e) => {
                              field.onChange(e);
                              form.setValue(
                                "price",
                                parseFloat(e.target.value)
                              );
                            }}
                          />
                        </FormControl>
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
                  Confirmer
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
}

export const messageSchema = z
  .object({
    message: z.string({ required_error: "Ecrire rejeter est obligatoire" }),
  })
  .refine((data) => data.message === "rejeter", {
    path: ["message"],
    message: "",
  });

type RejectOrderProps = {
  clientId: string;
  articleId: string;
};

export function RejectOrder({ clientId, articleId }: RejectOrderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {},
  });

  const onSubmit = async (formData: z.infer<typeof messageSchema>) => {
    setLoading(true);
    setOpen(false);
    await rejectOrderArticle({ clientId, articleId }).catch(() => {
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
    <Drawer open={open} onOpenChange={setOpen}>
      <LoadingButton
        variant="secondary"
        loading={loading}
        disabled={loading}
        onClick={() => {
          setOpen(true);
        }}
      >
        Rejeter
      </LoadingButton>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Réjection</DrawerTitle>
                <DrawerDescription>
                  Pour une raison valable vous allez rejeter cette demande. Celà
                  entraine une suppression définitive de la commande.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
                <div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Ecrire: &quot;rejeter&quot;</FormLabel>
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
              </div>
              <DrawerFooter>
                <LoadingButton
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  className="w-full"
                >
                  Rejeter
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
}
