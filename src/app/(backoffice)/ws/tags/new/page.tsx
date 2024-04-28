import { NewTagForm } from "@/components/ws/tags/new-form";
import prisma from "@/lib/prisma";

const getRecentTags = async () => {
  const tags = await prisma.tag.findMany({
    orderBy: { updatedAt: "desc" },
    take: 10,
  });
  return tags;
};

export default async function WSNewTagPage() {
  const tags = await getRecentTags();
  return (
    <>
      <NewTagForm recentTags={tags} />
    </>
  );
}
