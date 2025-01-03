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
import { cn, formatElapsedTime, formatMoney } from "@/lib/utils";
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
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { UserType } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { checkUsername } from "@/actions/ws/users/check-username";
import { AiOutlineLoading } from "react-icons/ai";
import { TbCircleCheckFilled } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import { updateUser } from "@/actions/ws/users/update-user";
import { DrawerDeleteUser } from "./drawer-delete";
import { DrawerChangePassword } from "./drawer-password";
import { roles } from "@/lib/data/roles";
import { EditUserFormSchemaType, editUserformSchema } from "@/lib/zod/users";
import Image from "next/image";
import { DialogProfileImage } from "../dialog-profile-image";
import { AcceptOrder, CancelConfirmedOrder, RejectOrder } from "@/components/order-controler";
import { ContactHoverCard } from "@/components/contact-hover-card";
import { User } from "@/app/(backoffice)/ws/users/[username]/page";

type EditUserFormProps = {
  user: User;
};

export default function EditUserForm({ user }: EditUserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [editUsername, setEditUsername] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<"free" | "used">();
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    user?.image ?? ""
  );
  const { toast } = useToast();

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
      role: user?.role,
      blocked: user?.blocked,
      verified: user?.verified,
    },
  });

  async function onSubmit(values: EditUserFormSchemaType) {
    setLoading(true);
    const user = await updateUser(values).catch(() => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });
    if (user) {
      toast({
        title: "Enregistré",
        description: "Les modifications ont été bien enregistrer",
      });
      setLoading(false);
      router.replace(`/ws/users/${user.username}`);
    }
  }
  useEffect(() => {
    form.setValue("image", currentImageUrl);
  }, [currentImageUrl, form]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={cn(" bg-ws-background min-h-screen")}>
          <div className=" h-16 px-3 flex items-center gap-x-5">
            <div>
              <h1 className="text-sm font-bold">Compte: {user?.name}</h1>
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

          <div className="grid grid-cols-1 lg:grid-cols-6 max-w-screen-lg mx-auto min-w-60">
            <div className=" col-span-2 bg-background lg:rounded-lg">
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
                                      if (
                                        username &&
                                        username !== user?.username
                                      ) {
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
                                <Input
                                  {...field}
                                  type="hidden"
                                  placeholder=""
                                />
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
                                disabled={loading || user?.role === "owner"}
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
                      <div className="flex flex-col justify-center rounded-lg border p-3  space-y-2">
                        <FormLabel>Sécurité</FormLabel>
                        <DrawerChangePassword
                          user={user}
                          loading={loading}
                          setLoading={setLoading}
                        />
                      </div>
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
                                disabled={loading || user?.role === "owner"}
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
                                disabled={loading || user?.role === "owner"}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Zone dangereuse</CardTitle>
                    <CardDescription>
                      Soyez conscient de ce que vous pouvez faire ici. La
                      suppression d&apos;un compte peut occasioner une perte de
                      contenus
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col justify-center rounded-lg border p-3  space-y-2">
                      <FormLabel className="">Suppression</FormLabel>
                      <FormDescription>
                        En supprimant ce compte, vous acceptez perdre tout
                        contenu qui lui est lié. Noter que cette opération est
                        irréversible.
                      </FormDescription>
                      <DrawerDeleteUser
                        user={user}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
            <div className=" col-span-4">
              <ScrollArea className=" lg:h-[calc(100vh-66px)] pl-6 py-6 bg-ws-background">
                <h1 className=" text-2xl font-bold">
                  Commandes d&apos;articles
                </h1>
                {user?.articleOrders.map((order) => (
                  <div
                    key={order.articleId + order.clientId}
                    className="flex space-x-4 py-4 px-4 lg:px-6 border-b bg-background"
                  >
                    <div className="w-12 h-12">
                      {order.article?.imageUrl && (
                        <Image
                          src={order.article?.imageUrl}
                          alt=""
                          className="object-cover w-full h-full rounded-md"
                          height={64}
                          width={64}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">
                        {order.article.title}
                      </h3>
                      {/* <p className="text-sm text-muted-foreground">
                        <ContactHoverCard user={user} />
                      </p> */}
                    </div>
                    <div className=" flex flex-col items-end">
                      <h3 className=" text-sm font-semibold">
                        {formatMoney(order.price)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatElapsedTime(order.createdAt)}
                      </p>
                    </div>
                    {order.status === "pending" ? (
                      <div className="flex space-x-2">
                        <AcceptOrder
                          clientId={order.clientId}
                          articleId={order.articleId}
                          price={order.price}
                        />
                        <RejectOrder
                          clientId={order.clientId}
                          articleId={order.articleId}
                        />
                      </div>
                    ) : (<div>
                      <CancelConfirmedOrder
                        articleId={order.articleId}
                        clientId={order.clientId}
                      />
                    </div>)}
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
