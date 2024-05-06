import { LatestArticles } from "@/components/latest-articles";
import { Mdx } from "@/components/mdx";
import { NotFound } from "@/components/not-found";
import { ShareButtonsBar } from "@/components/share-buttons-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { siteConfig } from "@/lib/data/site";
import prisma from "@/lib/prisma";
import { absoluteUrl, getHSLColor } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";
import { NoPremiumMessage } from "@/components/no-premium-message";
import { NoSubscriberMessage } from "@/components/no-subscriber-message";
import { ArticleHeader } from "@/components/article-header";
import { ArticleFooter } from "@/components/article-footer";

const getArticle = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: { slug, published: true, blocked: false },
    include: { author: {}, tags: { include: { tag: {} } } },
  });
  return article;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
  const keywords = article?.tags.map((tag) => {
    return tag.tag.name;
  });
  if (article) {
    return {
      title: article.title,
      description: article.description,
      keywords: [...keywords!, "avantage"],
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        url: absoluteUrl(article.slug),
        images: [
          {
            url: article.imageUrl,
            width: 1200,
            height: 630,
            alt: siteConfig.name,
          },
        ],
      },
    };
  } else {
    return {};
  }
}
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  const session = await auth();
  if (!article) {
    return <NotFound />;
  }

  if (article.visibility === "subscriber_only" && !session) {
    return (
      <div className=" max-w-screen-md mx-auto pt-6 md:pt-12">
        <ArticleHeader article={article} />
        <NoSubscriberMessage />
      </div>
    );
  }

  if (article.visibility === "premium_only") {
    return (
      <div className=" max-w-screen-md mx-auto pt-6 md:pt-12">
        <ArticleHeader article={article} />
        <NoPremiumMessage />
      </div>
    );
  }

  return (
    <div>
      <div className=" max-w-screen-md mx-auto pt-6 md:pt-12">
        <ArticleHeader article={article} />
        <div className="px-6 lg:px-0 py-6 bg-background rounded-b-md">
          <Suspense>
            <Mdx content={article.markdown} />
          </Suspense>
        </div>
        <ArticleFooter article={article} />
        <LatestArticles />
      </div>
    </div>
  );
}
