import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Nous sommes un Centre d'Apprentisage et des Métiers Avantage. Une école privé déclarée au ministère de la formation professionnelle",
  keywords: [
    "contact avantage",
    "cam/avanatge",
    "centre de formation",
    "formation professionnelle",
    "Benjamin Kamala",
  ],
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader>
        <PageHeaderHeading>Nous contacter</PageHeaderHeading>
        <PageHeaderDescription>
          Pour nous contacter, vous pouvez nous adresser un e-mail à
          l&apos;adresse suivante:{" "}
          <Link href="mailto:contact@cam-avantage.com" className=" text-blue-400">
            contact@cam-avantage.com
          </Link>
          . Vous pouvez également nous contacter  sur whatsapp et Facebook. Nous
          vous répondrons dans les plus brefs délais.
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
    </main>
  );
}
