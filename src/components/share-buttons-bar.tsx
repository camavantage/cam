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
    <div className="flex space-x-2 border-y py-2 my-6">
      <span className="font-bold">
        Partager <BiShareAlt className=" inline ml-3 h-[1.2rem] w-[1.2rem]" />
      </span>
      <div className="flex-1" />
      <EmailShare url={url} title={title} size={32} round />
      <FacebookShare url={url} title={title} size={32} round />
      <TwitterShare url={url} title={title} size={32} round />
      <LinkedinShare url={url} title={title} size={32} round />
      <WhatsappShare url={url} title={title} size={32} round />
    </div>
  );
}
