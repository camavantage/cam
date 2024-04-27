import { cn } from "@/lib/utils";
import { WSMenuItem, WSMenuItemType } from "./menu-item";

type Props = {
  items?: WSMenuItemType[];
  direction?: "vertical" | "horizontal";
};
export function WSMenu({ items, direction = "vertical" }: Props) {
  return (
    <nav
      className={cn(
        direction === "vertical" ? "flex flex-col gap-y-3" : "flex gap-x-3"
      )}
    >
      {items?.map((menu) => (
        <WSMenuItem key={menu.key} item={menu} />
      ))}
    </nav>
  );
}
