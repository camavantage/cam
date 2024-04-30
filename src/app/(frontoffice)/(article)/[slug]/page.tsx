// import { Mdx } from "@/components/mdx";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { cn, getHSLColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { BiShareAlt } from "react-icons/bi";
import Balancer from "react-wrap-balancer";

const getArticle = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: { slug, published: true, blocked: false },
    include: { author: {}, tags: { include: { tag: {} } } },
  });
  return article;
};
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  if (!article) {
    return <div>not found</div>;
  }
  return (
    <div>
      <div className=" max-w-screen-md mx-auto pt-6 md:pt-12">
        <div className="px-6 md:px-0">
          <div>
            <div className="space-y-2">
              <h1
                className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}
              >
                {article.title}
              </h1>
              {article.description && (
                <p className="text-lg text-muted-foreground">
                  <Balancer>{article.description}</Balancer>
                </p>
              )}
            </div>
            {article.tags && (
              <div className="flex items-center space-x-2 pt-4">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag.tagId}
                    variant="outline"
                    className="lowercase "
                  >
                    <span style={{ color: getHSLColor(tag.tag.name) }}>#</span>
                    {tag.tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-3 py-3 my-6 ">
            <Avatar className=" h-12 w-12">
              <AvatarImage src={`${article.author?.image}`} />
              <AvatarFallback className=" uppercase ">
                {article.author?.name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className=" font-semibold">{article.author?.name}</h3>
              <p className=" text-muted-foreground">
                {article.updatedAt.toDateString()}
              </p>
            </div>
            <Button className=" rounded-full">
              Partager <BiShareAlt className="ml-3 h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
        <div className="h-auto w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            height={1000}
            width={1000}
            className=" object-cover w-full h-full"
          />
        </div>
        <div className="p-6 bg-background rounded-b-md">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          {/* <Mdx code={article.markdown}/> */}
        </div>
        {article.tags && (
          <div className="flex items-center space-x-2 pt-4">
            {article.tags.map((tag) => (
              <Badge key={tag.tagId} variant="outline" className="lowercase ">
                <span style={{ color: getHSLColor(tag.tag.name) }}>#</span>
                {tag.tag.name}
              </Badge>
            ))}
          </div>
        )}
        <div className=" mt-2 py-6 px-6 md:px-0">
          <div className="flex items-end">
            <Avatar className=" h-20 w-20">
              <AvatarImage className="" src={`${article.author?.image}`} />
              <AvatarFallback className="uppercase">
                {article.author?.name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1" />
            {/* <Link href={`https://wa.me/${article.author?.phone}`}> */}
            <Button className=" rounded-full">
              Partager <BiShareAlt className="ml-3 h-[1.2rem] w-[1.2rem]" />
            </Button>
            {/* </Link> */}
          </div>
          <div className=" mt-6">
            <h3 className=" text-2xl font-bold left-[30px]">
              {article.author?.name}
            </h3>
            <p className=" text-muted-foreground text-base">
              {article.author?.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
