import { NewArticleForm } from "@/components/ws/articles/new-form";
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

export default async function WSNewArticlePage() {
  const authors = await getAuthors();
  const tags = await getTags();
  return (
    <>
      <NewArticleForm authors={authors} tags={tags} />
    </>
  );
}
