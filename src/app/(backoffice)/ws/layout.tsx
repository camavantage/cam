import { WSLeftSideMenuBar } from "@/components/ws/left-side-menu-bar";
import prisma from "@/lib/prisma";
const getGeneralSettings = async () => {
  const generalSettings = await prisma.app.findFirst();
  return generalSettings;
};
export default async function WSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const generalSettings = await getGeneralSettings();
  return (
    <div className="  h-screen flex  2xl:border 2xl:rounded-xl">
      <WSLeftSideMenuBar generalSettings={generalSettings} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
