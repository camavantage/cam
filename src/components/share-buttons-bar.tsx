"use client";
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
      <EmailShare url={url} title={title} size={24}/>
      <FacebookShare url={url} title={title} size={24}/>
      <TwitterShare url={url} title={title} size={24}/>
      <LinkedinShare url={url} title={title} size={24}/>
      <WhatsappShare url={url} title={title} size={24}/>
    </div>
  );
}
