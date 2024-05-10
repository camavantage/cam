"use client";

import { formatMoney } from "@/lib/utils";
import { LoadingButton } from "./ui/loading-button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { createArticleOrder } from "@/actions/order-article";
import { usePathname } from "next/navigation";

type UnlockPremiumArticleProps = {
  price: number | null;
  clientId: string;
  articleId: string;
};
export function UnlockPremiumArticle({
  price,
  clientId,
  articleId,
}: UnlockPremiumArticleProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const pathname = usePathname();

  return (
    <LoadingButton
      className="rounded-full"
      disabled={loading}
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await createArticleOrder(
          {
            clientId,
            articleId,
            price: Number(price),
          },
          pathname
        ).catch((e) => {
          toast({
            title: "Echec",
            variant: "destructive",
            description: (
              <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
            ),
          });
          setLoading(false);
        });
      }}
    >
      Déverrouiller à {formatMoney(price)}
    </LoadingButton>
  );
}
