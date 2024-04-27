"use client";

import Link from "next/link";
import { TooltipWrap } from "../tooltip-wrapper";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export type WSMenuItemType = {
  key: string | number;
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type Props = {
  item: WSMenuItemType;
};
export function WSMenuItem({ item }: Props) {
  const pathname = usePathname();
  return (
    <Link key={item.key} href={item.href} className={cn(pathname === item.href && " bg-muted"," rounded-md hover:bg-muted")}>
      <TooltipWrap content={item.label} side="right">
        <Button
          variant="ghost"
          size="icon"
          className={cn( "relative")}
        >
          {item.icon}
          <span
            className={cn(
              pathname === item.href ? "block" : "hidden",
              "absolute left-0 bg-primary h-[calc(100%-50%)] w-[3px] rounded"
            )}
          />
        </Button>
      </TooltipWrap>
    </Link>
  );
}
