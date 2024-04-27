import { EditArticleForm } from "@/components/ws/articles/edit-form";
import prisma from "@/lib/prisma";

const getTags = async () => {
  const tags = await prisma.tag.findMany({
    where: { published: true },
  });
  return tags;
};

const getAuthors = async () => {
  const authors = await prisma.user.findMany({
    where: { role: {not:"subscriber"}, blocked:false },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      verified: true,
      blocked: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return authors;
};

const getArticle = async (articleId: string) => {
  
  const article = await prisma.article
    .findUnique({
      where: { id:articleId },
      include: { author: {},tags:{include:{tag:{}}} },
    })
    .catch((e) => {
      throw new Error(e.message);
    });

  return article;
};

export default async function WSArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const authors = await getAuthors();
  const tags = await getTags();
  const article = await getArticle(params.articleId);
  return (
    <>
      <EditArticleForm article={article} tags={tags} authors={authors} />
    </>
  );
}
