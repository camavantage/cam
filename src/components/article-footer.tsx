import { Article } from "@/app/(backoffice)/ws/articles/[articleId]/page";
import { Badge } from "./ui/badge";
import { getHSLColor } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Suspense } from "react";
import { ShareButtonsBar } from "./share-buttons-bar";

type ArticleFooterProps = {
  article: Article;
};

export function ArticleFooter({ article }: ArticleFooterProps) {
  return (
    <>
      <div className=" px-6 lg:px-0">
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
      <div className=" mt-2 py-6 px-6 md:px-0">
        <div className="flex items-end">
          <Avatar className=" h-20 w-20">
            <AvatarImage className="" src={`${article?.author?.image}`} />
            <AvatarFallback className="uppercase">
              {article?.author?.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1" />
        </div>

        <div className=" mt-6">
          <h3 className=" text-2xl font-bold left-[30px]">
            {article?.author?.name}
          </h3>
          <p className=" text-muted-foreground text-base">
            {article?.author?.bio}
          </p>
        </div>
      </div>
      <div className="px-6 lg:px-0 pt-6">
        <Suspense>
          <ShareButtonsBar
            slug={article?.slug ?? ""}
            title={article?.title}
            content={article?.description}
          />
        </Suspense>
      </div>
    </>
  );
}
