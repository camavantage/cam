import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Formations",
  description:
    "Apprenez un métier essentiel à votre rythme avec nos formations en ligne accessibles partout et tout le temps ou directement dans nos locaux",
  keywords: [
    "avantage",
    "cam/avanatge",
    "centre de formation",
    "formation professionnelle",
    "Benjamin Kamala",
    "Logo avantage",
  ],
  openGraph: {
    title: "Formations - Avantage",
    description:
      "Apprenez un métier essentiel à votre rythme avec nos formations en ligne accessibles partout et tout le temps ou directement dans nos locaux",
    type: "website",
    url: absoluteUrl("courses"),
  },
};
export default function CoursesPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 lg:px-0">
      <PageHeader>
        <PageHeaderHeading>Les formations adaptées</PageHeaderHeading>
        <PageHeaderDescription className=" ">
          Apprenez un métier essentiel à votre rythme avec nos formations en
          ligne accessibles partout et tout le temps ou directement dans nos
          locaux. Vous pouvez suivre une formation en apprentissage 100% théorie
          en ligne et 100% pratique en entreprise
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
