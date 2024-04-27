"use client";
import { deleteArticle } from "@/actions/ws/articles/delete-article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { ArticleType } from "@/lib/types";
import { getHSLColor } from "@/lib/utils";
import { LucideExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type ArticleCardProps = {
  article: ArticleType;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { toast } = useToast();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setOpenDelete(false);
    setLoading(true);
    const deletedArticle = await deleteArticle({ articleId: article.id }).catch(
      () => {
        toast({
          title: "Echec",
          variant: "destructive",
          description: (
            <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
          ),
        });
        setLoading(false);
      }
    );
    if (deletedArticle) {
      toast({
        title: "Supprimé",
        description: "L'article a été bien supprimer",
      });
      setLoading(false);
    }
  };
  {
    /* <img src={article.imageUrl} className="w-12 h-12" /> */
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 p-5 bg-background rounded-lg">
      <div className="flex lg:col-span-2 space-x-4 ">
        <div className="w-12 h-12">
          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt=""
              className="object-cover w-full h-full rounded-md"
              height={64}
              width={64}
            />
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex space-x-1">
            <h3 className="font-semibold  tracking-tight">
              <Link href={`/ws/articles/${article.id}`}>
                <span>{article.title}</span>
              </Link>{" "}
              <Link
                href={`/${article.slug}`}
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <LucideExternalLink className=" inline h-[1.2rem] w-[1.2rem]" />
              </Link>
            </h3>
          </div>

          <div className="">
            {article.tags?.map((tag) => (
              <Badge key={tag.tagId} variant="secondary" className="mr-[2px]">
                <span style={{ color: getHSLColor(`${tag.tag?.name}`) }}>
                  #
                </span>
                {tag.tag?.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:items-end py-4 md:py-0 pr-[4px] ">
        {article.blocked ? (
          <Badge variant="destructive" className="w-fit">
            Bloqué
          </Badge>
        ) : article.published ? (
          <Badge className="w-fit">Publié</Badge>
        ) : (
          <Badge className="w-fit">En attente de plublication</Badge>
        )}

        <h3 className="text-sm font-semibold text-muted-foreground">
          {article?.author?.name ?? ""}
        </h3>
      </div>
      <div className="md:pl-1">
        <p className="text-sm text-muted-foreground">
          {article?.updatedAt.toLocaleString("fr") ?? ""}
        </p>
      </div>
      <div className="flex justify-end items-end space-x-3">
        <Link href={`/ws/articles/${article.id}`}>
          <Button variant="secondary" size="sm" disabled={loading}>
            Modifier
          </Button>
        </Link>
        <Popover open={openDelete} onOpenChange={setOpenDelete}>
          <PopoverTrigger disabled={loading}>
            <LoadingButton
              variant="ghost"
              size="sm"
              loading={loading}
              type="button"
            >
              Supprimer
            </LoadingButton>
          </PopoverTrigger>
          <PopoverContent className=" border-none">
            <div>
              <h3 className="text-sm font-semibold">
                Voulez-vous supprimer: {article.title}?
              </h3>
              <p className=" text-sm opacity-90">
                Si oui, assurez-vous que la suppression est nécessaire et
                justifiée. Noter que cette opération est irréversible.
              </p>
            </div>
            <div className="flex justify-end space-x-3 mt-3">
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Oui
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setOpenDelete(false);
                }}
              >
                Non
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
