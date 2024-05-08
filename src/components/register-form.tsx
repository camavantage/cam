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
import {
  ChangePasswordformSchemaType,
  changePasswordformSchema,
} from "@/lib/zod/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const RegisterFormDrawer = () => {
  const [showPWD, setShowPWD] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {},
  });

  const onSubmit = async (formData: SignInSchemaType) => {
   
  };

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
                <DrawerTitle>Inscription</DrawerTitle>
                <DrawerDescription>
                  Remplir le formulaire ci-après pour débloquer l&apos;accès au
                  contenu réservé aux membres
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4"></div>
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
