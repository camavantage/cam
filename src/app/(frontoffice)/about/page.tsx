import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

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
    <main>
      <PageHeader>
        <Link
          href="/docs/changelog"
          className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium"
        >
          {/* <Blocks className="h-4 w-4" />{" "}
      <Separator className="mx-2 h-4" orientation="vertical" />{" "} */}
          <span>CAM/AVANTAGE</span>
          {/* <ArrowRightIcon className="ml-1 h-4 w-4" /> */}
        </Link>
        <PageHeaderHeading>Qui sommes-nous?</PageHeaderHeading>
        <PageHeaderDescription>
          Nous sommes un Centre d&apos;Apprentisage et des Métiers Avantage. Une
          école privé déclarée au ministère de la formation professionnelle,
          fondé par passion à 2020 par Benjamin Kamala. Aujourd&apos;hui,
          CAM/AVANTAGE est partenaire Officiel du groupe des centres
          professionnels en République démocratique du Congo.
        </PageHeaderDescription>
        <PageActions>
          <Button className="rounded-full">Une histoire de passion</Button>
        </PageActions>
      </PageHeader>
      <article>
        <p>
          Dès son plus jeune âge, Benjamin Kamala a été attiré par le monde
          magique de la boulangerie-pâtisserie. À l&apos;âge de 10 ans, il passait
          ses après-midis après l&apos;école dans la petite pâtisserie de son grand
          frère, s&apos;imprégnant des secrets de cet art délicieux.
        </p>
        <p>
          Avec des mains pleines de farine et le cœur rempli de passion,
          Benjamin apprenait les rudiments du métier, plongeant les gâteaux dans
          des bains de sirop, dorant les croissants d&apos;une touche dorée
          appétissante. Chaque geste était une leçon, chaque création une œuvre
          d&apos;art comestible.
        </p>
        <p>
          En 2014, à l&apos;âge de 15 ans, Benjamin décide de se professionnaliser.
          Pendant les grandes vacances d&apos;été, il s&apos;envole pour Kigali, au
          Rwanda, où il s&apos;immerge pendant deux mois dans l&apos;univers d&apos;une
          boulangerie-pâtisserie locale. Là, il aiguise ses compétences,
          découvre de nouvelles techniques et affine son savoir-faire.
        </p>
        <p>
          De retour à Goma, Benjamin poursuit ses études, obtenant son diplôme
          en nutrition en 2017. Mais sa passion pour la boulangerie-pâtisserie
          ne faiblit jamais. Dès lors, il se consacre pleinement à son métier, y
          insufflant tout son talent et sa créativité.
        </p>
        <p>
          En 2020, mû par le désir de partager ses connaissances et d&apos;inspirer
          la prochaine génération de boulangers-pâtissiers, Benjamin crée un
          centre d&apos;apprentissage unique. Dans ce havre de gourmandise, il
          transmet ses secrets de fabrication, initie les apprentis aux
          techniques de charcuterie et leur enseigne les subtilités de la
          transformation des fruits.
        </p>
        <p>
          Son dévouement et son expertise ne passent pas inaperçus. En 2022,
          Benjamin reçoit une distinction prestigieuse de l&apos;École Nationale de
          Formation Professionnelle (ENFP), consacrant son statut de grand
          formateur en boulangerie-pâtisserie.
        </p>
        <p>
          Aujourd&apos;hui, Benjamin Kamala est un véritable ambassadeur de la
          boulangerie-pâtisserie en République Démocratique du Congo. Son
          parcours inspirant témoigne de la puissance des rêves et de la joie de
          partager sa passion avec le monde.
        </p>
        <p>
          Sa boulangerie-pâtisserie est une ode à la gourmandise, où chaque
          création est une symphonie de saveurs et de textures. Benjamin Kamala
          est un artiste culinaire, un maître boulanger-pâtissier qui transforme
          la vie en un délicieux chef-d&apos;œuvre.
        </p>
      </article>
    </main>
  );
}
