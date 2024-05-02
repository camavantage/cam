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
    <div className="flex">
      <EmailShare url={url} title={title} />
      <FacebookShare url={url} title={title} />
      <TwitterShare url={url} title={title} />
      <LinkedinShare url={url} title={title} />
      <WhatsappShare url={url} title={title} />
    </div>
  );
}
