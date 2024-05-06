import { cn, formatDate, getHSLColor, readingTimeEstimator } from "@/lib/utils";
import { Badge } from "./ui/badge";
import Balancer from "react-wrap-balancer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ShareButtonsBar } from "./share-buttons-bar";
import { Suspense } from "react";
import Image from "next/image";
import { Article } from "@/app/(backoffice)/ws/articles/[articleId]/page";
import { CiLock } from "react-icons/ci";

type ArticleHeaderProps = {
  article: Article;
};

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <>
      <div className="px-6 md:px-0">
        <div>
          <div className="space-y-2">
            <h1
              className={cn(
                "scroll-m-20 text-2xl md:text-4xl font-bold tracking-tight"
              )}
            >
              {article?.title}
            </h1>
            {article?.description && (
              <p className="text-lg text-muted-foreground">
                <Balancer>{article.description}</Balancer>
              </p>
            )}
          </div>
          {article?.tags && (
            <div className="flex items-center space-x-2 pt-4">
              {article.tags.map((tag) => (
                <Badge key={tag.tagId} variant="outline" className="lowercase ">
                  <span style={{ color: getHSLColor(tag.tag.name) }}>#</span>
                  {tag.tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex space-x-3 py-3 my-6 ">
          <Avatar className=" h-12 w-12">
            <AvatarImage src={`${article?.author?.image}`} />
            <AvatarFallback className=" uppercase ">
              {article?.author?.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className=" font-semibold">{article?.author?.name}</h3>
            <div className="flex items-center space-x-1">
              {article?.visibility !== "public" && (
                <CiLock className="inline bg-ws-background text-muted-foreground p-[2px] rounded" />
              )}
              <p className=" text-muted-foreground">
                {readingTimeEstimator(article?.markdown ?? "")} -{" "}
                {formatDate(article?.updatedAt ?? "")}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <Suspense>
            <ShareButtonsBar
              slug={article?.slug ?? ""}
              title={article?.title}
              content={article?.content}
            />
          </Suspense>
        </div>
      </div>
      <div className="h-auto w-full">
        <Image
          src={article?.imageUrl ?? ""}
          alt={article?.title ?? ""}
          height={1000}
          width={1000}
          className=" object-cover w-full h-full"
        />
      </div>
    </>
  );
}
