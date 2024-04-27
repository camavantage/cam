import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Qui sommes-nous?",
  description:
    "Mavoix.cd demeure une organisation, un média à but non lucratif qui prone la liberté d'expression comme un droit humain",
  keywords: [
    "mavoix",
    "mavoix.cd",
    "Ma voix",
    "Média libre",
    "Média en accès libre",
    "Média independant",
    "information libre",
    "RDC",
    "DRC",
    "Congo",
  ],
};

export default function AboutPage() {
  return (
    <Suspense>
      <main>Ici c&apos; mlibre</main>
    </Suspense>
  );
}
