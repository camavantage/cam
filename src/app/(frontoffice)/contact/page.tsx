import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";
import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Vous pouvez nous adresser un e-mail à l'adresse suivante: contact@cam-avantage.com. Vous pouvez également nous contacter sur whatsapp et Facebook.",
  keywords: [
    "contact avantage",
    "cam/avanatge",
    "centre de formation",
    "formation professionnelle",
    "Benjamin Kamala",
  ],
  openGraph: {
    title: "Contact - Avantage",
    description:
      "Vous pouvez nous adresser un e-mail à l'adresse suivante: contact@cam-avantage.com. Vous pouvez également nous contacter sur whatsapp et Facebook.",
    type: "article",
    url: absoluteUrl("contact"),
  },
};


export default function ContactPage() {
  return (
    <main>
      <div className=" max-w-5xl mx-auto px-6 lg:px-0">
        <PageHeader>
          <PageHeaderHeading>Nous contacter</PageHeaderHeading>
          <PageHeaderDescription>
            Pour nous contacter, vous pouvez nous adresser un e-mail à
            l&apos;adresse suivante:{" "}
            <Link
              href="mailto:contact@cam-avantage.com"
              className=" text-blue-400"
            >
              contact@cam-avantage.com
            </Link>
            . Vous pouvez également nous contacter sur Whatsapp et Facebook.
            Nous vous répondrons dans les plus brefs délais.
          </PageHeaderDescription>
          <PageActions>
            <Link href={siteConfig.links.whatsapp}>
              <Button className=" rounded-full bg-[#128c7e]">Whatsapp</Button>
            </Link>
            <Link href={siteConfig.links.facebook}>
              <Button className=" rounded-full bg-[#3b5998]">Facebook</Button>
            </Link>
          </PageActions>
        </PageHeader>
      </div>
    </main>
  );
}
