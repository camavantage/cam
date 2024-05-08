"use client";
import { useEffect, useState } from "react";
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
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const url = window.location.href;
    setUrl(url);
  });
  return (
    <div className="flex items-center space-x-2 py-3">
      <span className="font-bold">
        Partager :
      </span>
      <div className="flex-1" />
      
      <EmailShare url={url} title={title} content={content} size={32} round />
      <FacebookShare
        url={url}
        title={title}
        content={content}
        size={32}
        round
      />
      <TwitterShare url={url} title={title} content={content} size={32} round />
      <LinkedinShare
        url={url}
        title={title}
        content={content}
        size={32}
        round
      />
      <WhatsappShare
        url={url}
        title={title}
        content={content}
        size={32}
        round
      />
    </div>
  );
}
