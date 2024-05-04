import { NotFound } from "@/components/not-found";
import EditUserForm from "@/components/ws/users/edit-form";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

const getUser = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (user) {
    const { password, ...userWhithoutPassword } = user;
    return userWhithoutPassword;
  }
};

export default async function WSUserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);
  if (!user) {
    return <NotFound />;
  }
  return (
    <>
      <Suspense>
        <EditUserForm user={user} />
      </Suspense>
    </>
  );
}
