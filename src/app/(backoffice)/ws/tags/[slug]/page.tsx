import { EditTagForm } from "@/components/ws/tags/edit-form";
import prisma from "@/lib/prisma";

const getTag = async (slug: string) => {
  const tag = await prisma.tag.findFirst({ where: { slug } });
  return tag;
};

export default async function WSTagPage({
  params,
}: {
  params: { slug: string };
}) {
  const tag = await getTag(params.slug);

  return (
    <>
      <EditTagForm tag={tag} />
    </>
  );
}
