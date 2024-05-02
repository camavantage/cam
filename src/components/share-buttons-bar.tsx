"use client";
import { BiShareAlt } from "react-icons/bi";
import {
  EmailShare,
  FacebookShare,
  TwitterShare,
  WhatsappShare,
  LinkedinShare,
} from "react-share-kit";
type ShareButtonsBarProps = {
  slug: string;
  title?: string;
  content?: string;
};
export function ShareButtonsBar({
  slug,
  title,
  content,
}: ShareButtonsBarProps) {
  const hostname = window.location.hostname;
  const url = hostname + "/" + slug;
  return (
    <div className="flex space-x-2">
      <span className=" font-bold">
        Partager <BiShareAlt className=" inline ml-3 h-[1.2rem] w-[1.2rem]" />
      </span>
      <div className="flex-1"/>
      <EmailShare url={url} title={title} size={32} />
      <FacebookShare url={url} title={title} size={32} />
      <TwitterShare url={url} title={title} size={32} />
      <LinkedinShare url={url} title={title} size={32} />
      <WhatsappShare url={url} title={title} size={32} />
    </div>
  );
}
