'use client'
import { ModeToggle } from "@/components/mode-toggle";
import { FiHome, FiUsers } from "react-icons/fi";
import { UserAvatar } from "@/components/ws/user-avatar";
import { Separator } from "@/components/ui/separator";
import { WSMenu } from "./menu";
import { WSMenuItemType } from "./menu-item";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { BiBookContent } from "react-icons/bi";
import { TiTags } from "react-icons/ti";
import { SettingsSheet } from "./settings";
import { AppType } from "@/lib/types";
import { Logo } from "../header/logo";

const menuItems: WSMenuItemType[] = [
  {
    key: "dashboard",
    label: "Dashbord",
    href: "/ws",
    icon: <FiHome className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    key: "articles",
    label: "Articles",
    href: "/ws/articles",
    icon: <BiBookContent className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    key: "tags",
    label: "Tags",
    href: "/ws/tags",
    icon: <TiTags className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    key: "users",
    label: "Membres",
    href: "/ws/users",
    icon: <FiUsers className="h-[1.2rem] w-[1.2rem]" />,
  },
];

type WSLeftSideMenuBarProps={
  generalSettings:AppType | null
}
export const WSLeftSideMenuBar:React.FC<WSLeftSideMenuBarProps>=({generalSettings})=> {
  const {theme}=useTheme()
  return (
    <aside className="h-full flex flex-col items-center p-3 border-r">
      <Link href="/ws">
        <Button variant="link">
          <Logo className="w-[1.2rem] h-[1.2rem]"/>
        </Button>
      </Link>
      <Separator className="my-3" />
      <WSMenu items={menuItems} />
      <div className="flex-1" />
      <nav className="flex flex-col gap-y-3">
        <ModeToggle />
        <Separator />
        {/* <WSMenuItem
          item={{
            key: "settings",
            label: "Paramètres",
            icon: <PiGear className="h-[1.2rem] w-[1.2rem]" />,
            href: "/ws/settings",
          }}
        /> */}
        <SettingsSheet generalSettings={generalSettings}/>
        <UserAvatar />
      </nav>
    </aside>
  );
}
