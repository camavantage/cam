import { UserType } from "@/lib/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { RiWhatsappFill } from "react-icons/ri";
import { PiPhoneCallFill } from "react-icons/pi";
import { TbMailFilled } from "react-icons/tb";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type ContactHoverCardProps = {
  user: UserType;
};
export function ContactHoverCard({ user }: ContactHoverCardProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge variant="outline">Contacts</Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback className=" uppercase">
              {user.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-bold">{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <div className="flex items-center space-x-2 pt-2">
              <Link
                href={`https://wa.me/${user.phone}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className=" rounded-full"
                >
                  <RiWhatsappFill className="h-5 w-5 fill-current" />
                </Button>
              </Link>
              <Link href={`tel:${user.phone}`} target="_blank" rel="noreferrer">
                <Button
                  variant="secondary"
                  size="icon"
                  className=" rounded-full"
                >
                  <PiPhoneCallFill className="h-5 w-5 fill-current" />
                </Button>
              </Link>
              <Link
                href={`mailto:${user.email}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className=" rounded-full"
                >
                  <TbMailFilled className="h-5 w-5 fill-current" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
