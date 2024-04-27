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
import {
  authorsAsOptions,
  cn,
  tagsAsOptions,
  articleTagsAsOptions,
} from "@/lib/utils";
import { GrClose } from "react-icons/gr";
import { useRouter, useSearchParams } from "next/navigation";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import MultipleSelector from "@/components/ui/multiple-selector";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { RxCaretSort, RxCheck } from "react-icons/rx";
import { LoadingButton } from "@/components/ui/loading-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { ArticleType, TagType, UserType } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { DrawerDeleteArticle } from "./drawer-delete";
import { updateArticle } from "@/actions/ws/articles/update-article";
import Image from "next/image";
import { DialogCoverImage } from "./dialog-cover-image";
import { uploadFile } from "@/actions/ws/upload-file";
import {
  EditArticleFormSchemaType,
  editArticleFormSchema,
} from "@/lib/zod/articles";

type EditArticleFormProps = {
  article?: ArticleType | null;
  tags?: TagType[];
  authors?: UserType[];
};

export const EditArticleForm: React.FC<EditArticleFormProps> = ({
  tags,
  authors,
  article,
}) => {
  const router = useRouter();
  const editor = useCreateBlockNote({
    uploadFile: async (file: File) => {
      return await uploadFile(file);
    },
  });
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [AUTHORS_AS_OPTIONS] = useState(authorsAsOptions(authors));
  const [TAGS_AS_OPTIONS] = useState(tagsAsOptions(tags));
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    `${article?.imageUrl}`
  );

  const form = useForm<EditArticleFormSchemaType>({
    resolver: zodResolver(editArticleFormSchema),
    defaultValues: {
      id: article?.id,
      title: article?.title,
      description: article?.description,
      content: article?.content,
      markdown: article?.markdown,
      imageUrl: article?.imageUrl,
      tags: articleTagsAsOptions(article?.tags),
      customTags: [],
      published: article?.published,
      authorId: `${article?.authorId}`,
      verified: article?.verified,
      commentable: article?.commentable,
      blocked: article?.blocked,
    },
  });

  async function onSubmit(values: EditArticleFormSchemaType) {
    setLoading(true);
    const article = await updateArticle(values).catch(() => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });

    if (article) {
      toast({
        title: "Enregisté",
        description: "Les modifications ont été bien enregistrer",
      });
      setLoading(false);
    }
  }

  function notifyCreatedArticle(newCreationMsg: string | null) {
    if (newCreationMsg === "success") {
      toast({
        title: "Créé",
        description: "L'article a été bien créer",
      });
      router.replace(`/ws/articles/${article?.id}`);
    }
  }

  useEffect(() => {
    notifyCreatedArticle(searchParams.get("new"));
  }, []);

  useEffect(() => {
    async function loadInitialHTMLContent() {
      if (article) {
        const blocks = await editor.tryParseHTMLToBlocks(article?.content);
        editor.replaceBlocks(editor.document, blocks);
      }
    }
    loadInitialHTMLContent();
  }, [editor, article]);

  useEffect(() => {
    form.setValue("imageUrl", currentImageUrl);
  }, [currentImageUrl, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={cn(" bg-ws-background min-h-screen")}>
          <div className=" h-16 px-3 flex items-center gap-x-5">
            <div>
              <h1 className="text-sm font-bold">L&apos;article</h1>
            </div>
            <div className="flex-1" />
            <div className="flex items-center space-x-3 py-2 rounded-md">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row space-x-2 items-center rounded-lg border px-3 py-1">
                    <FormLabel>Publié</FormLabel>
                    <FormControl className="p-0 m-0">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
                  router.push("/ws/articles");
                }}
              >
                <GrClose className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </TooltipWrap>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 max-w-screen-lg mx-auto min-w-60 bg-background lg:rounded-lg">
            <div className=" col-span-4">
              <ScrollArea className=" lg:h-[calc(100vh-66px)]">
                <Card className=" border-none shadow-none">
                  <CardHeader className="pt-0"></CardHeader>
                  <CardContent>
                    <div className="pb-4 space-y-4">
                      <DialogCoverImage
                        currentImageUrl={currentImageUrl}
                        setCurrentImageUrl={setCurrentImageUrl}
                      />
                      {currentImageUrl && (
                        <div className=" h-52">
                          <Image
                            className=" object-cover w-full h-full"
                            src={currentImageUrl}
                            alt=""
                            height={1000}
                            width={1000}
                          />
                        </div>
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl className="">
                            <Input type="hidden" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className=" ">
                          <FormControl>
                            <AutosizeTextarea
                              {...field}
                              placeholder="Titre de l'article"
                              className={cn(
                                " min-h-[58px] h-full w-full resize-none border-none bg-transparent text-4xl font-black text-primary"
                              )}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                          <FormItem className=" ">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Id du tag"
                                className={cn()}
                                type="hidden"
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
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <MultipleSelector
                                value={field.value}
                                onChange={field.onChange}
                                options={TAGS_AS_OPTIONS}
                                placeholder="Ajouter les tags ..."
                                emptyIndicator={
                                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                    Aucun résultat trouvé.
                                  </p>
                                }
                                className="border-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <BlockNoteView
                        editor={editor}
                        theme={theme === "dark" ? "dark" : "light"}
                        onChange={async () => {
                          // Converts the editor's contents from Block objects to HTML and store to content formfield.
                          const html = await editor.blocksToHTMLLossy(
                            editor.document
                          );
                          form.setValue("content", html);

                          // Converts the editor's contents from Block objects to Markdown and store to markdown formfield.
                          const markdown = await editor.blocksToMarkdownLossy(
                            editor.document
                          );
                          form.setValue("markdown", markdown);
                        }}
                      />
                      {/* Hidden HTML content field */}
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl className="">
                              <Input type="hidden" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {/* Hidden Markdown content field */}
                      <FormField
                        control={form.control}
                        name="markdown"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl className="">
                              <Input type="hidden" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
            <div className=" col-span-2 lg:border-l">
              <ScrollArea className=" lg:h-[calc(100vh-66px)] ">
                <Card className=" border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Méta-données</CardTitle>
                    <CardDescription>
                      Informations qui détaillent le contenu de l&apos;article
                      et son contexte, mais qui ne seront pas affichées
                      directement sur la page de l&apos;article.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className=" space-y-4 flex flex-col ">
                      <div className="">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem className=" ">
                              <FormLabel>
                                Description{" "}
                                <FormDescription className=" inline">
                                  (Extrait pertinent de l&apos;article)
                                </FormDescription>
                              </FormLabel>

                              <FormControl>
                                <AutosizeTextarea
                                  {...field}
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
                          name="authorId"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Auteur de l&apos;article</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? AUTHORS_AS_OPTIONS.find(
                                            (author) =>
                                              author.value === field.value
                                          )?.label
                                        : "Sélectionner l'auteur"}
                                      <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput
                                      placeholder="Rechercher un auteur..."
                                      className="h-9"
                                    />

                                    <CommandEmpty>
                                      Aucun auteur trouvé
                                    </CommandEmpty>

                                    <CommandGroup>
                                      <CommandList>
                                        {AUTHORS_AS_OPTIONS.map((author) => (
                                          <CommandItem
                                            value={author.label}
                                            key={author.value}
                                            onSelect={() => {
                                              form.setValue(
                                                "authorId",
                                                author.value
                                              );
                                            }}
                                          >
                                            {author.label}
                                            <RxCheck
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                author.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandList>
                                    </CommandGroup>
                                  </Command>
                                </PopoverContent>
                              </Popover>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="customTags"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>Tag(s) personnalisé(s)</FormLabel>
                              <FormControl>
                                <MultipleSelector
                                  value={field.value}
                                  onChange={field.onChange}
                                  defaultOptions={[]}
                                  creatable
                                  creatableText="Créer"
                                  placeholder="Entrer un tag ici..."
                                  emptyIndicator={
                                    <p className="text-center leading-10 text-gray-600 dark:text-gray-400">
                                      Saissir le tag
                                    </p>
                                  }
                                  className=""
                                />
                              </FormControl>
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
                        name="commentable"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ">
                            <div className="space-y-0.5">
                              <FormLabel>Commentaires</FormLabel>
                              <FormDescription>
                                L&apos;article peut-il recevoir des
                                commentaires?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="verified"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ">
                            <div className="space-y-0.5">
                              <FormLabel>Vérification</FormLabel>
                              <FormDescription>
                                L&apos;article est-il vérifié et conforme à la
                                ligne éditoriale?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
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
                                Bloquez l&apos;article s&apos;il contient de
                                fausses informations ou viole la ligne
                                éditoriale
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
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
                      Attention : Supprimer un article peut impacter la
                      cohérence et le référencement. Veuillez réfléchir à cette
                      décision. Si vous avez des doutes, veuillez en discuter
                      avec l&apos;équipe éditoriale ou les responsables avant de
                      procéder
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col justify-center rounded-lg border p-3  space-y-2">
                      <FormLabel>Suppression</FormLabel>
                      <FormDescription>
                        Assurez-vous que la suppression est nécessaire et
                        justifiée
                      </FormDescription>
                      <DrawerDeleteArticle
                        article={article}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
