import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

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
          l&apos;adresse suivante: contact@cam-avantage.com. Nous vous
          répondrons dans les plus brefs délais.
        </PageHeaderDescription>
        <PageActions>
          <Button>Whatsapp</Button> <Button>Facebook</Button>
        </PageActions>
      </PageHeader>
    </main>
  );
}
