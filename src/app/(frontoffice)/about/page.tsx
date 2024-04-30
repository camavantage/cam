import SloganSection from "@/components/home/sections/sloganSection";
import TeacherSection from "@/components/home/sections/teacherSection";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Qui sommes-nous?",
  description:
    "Centre d'Apprentisage et des Métiers Avantage. Une école privé déclarée au ministère de la formation professionnelle,fondé par passion à 2020 par Benjamin Kamala.",
  keywords: [
    "avantage",
    "cam/avanatge",
    "centre de formation",
    "formation professionnelle",
    "Benjamin Kamala",
    "DRC",
    "Congo",
  ],
};

export default function AboutPage() {
  return (
    <main className=" scroll-smooth">
      <div className="">
        <PageHeader className="max-w-5xl mx-auto px-6 lg:px-0">
          <Link
            href="/about"
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium"
          >
            <span>CAM/AVANTAGE</span>
          </Link>
          <PageHeaderHeading>Qui sommes-nous?</PageHeaderHeading>
          <PageHeaderDescription className="">
            Nous sommes un Centre d&apos;Apprentisage et des Métiers Avantage.
            Une école privé déclarée au ministère de la formation
            professionnelle, fondé par passion à 2020 par Benjamin Kamala.
            Aujourd&apos;hui, CAM/AVANTAGE est partenaire Officiel du groupe de
            centres professionnels en République démocratique du Congo.
          </PageHeaderDescription>
          <PageActions>
            <Link href="/about#story">
              <Button className="rounded-full">Histoire de passion</Button>
            </Link>
          </PageActions>
        </PageHeader>
      </div>
      <TeacherSection />
      {/* <div className="bg-ws-background">
        <SloganSection />
      </div> */}
      <article id="story" className="max-w-5xl mx-auto py-4 px-6 lg:px-0">
        <Card className=" border-none shadow-none rounded-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className=" font-bold text-2xl">
              Histoire de passion
            </CardTitle>
            <CardDescription className=" leading-3 text-base">
              Benjamin Kamala & CAM/AVANTAGE
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 text-muted-foreground text-justify">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Dès son plus jeune âge, Benjamin Kamala a été attiré par le monde
              magique de la boulangerie-pâtisserie. À l&apos;âge de 10 ans, il
              passait ses après-midis après l&apos;école dans la petite
              pâtisserie de son grand frère, s&apos;imprégnant des secrets de
              cet art délicieux.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Avec des mains pleines de farine et le cœur rempli de passion,
              Benjamin apprenait les rudiments du métier, plongeant les gâteaux
              dans des bains de sirop, dorant les croissants d&apos;une touche
              dorée appétissante. Chaque geste était une leçon, chaque création
              une œuvre d&apos;art comestible.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              En 2014, à l&apos;âge de 15 ans, Benjamin décide de se
              professionnaliser. Pendant les grandes vacances d&apos;été, il
              s&apos;envole pour Kigali, au Rwanda, où il s&apos;immerge pendant
              deux mois dans l&apos;univers d&apos;une boulangerie-pâtisserie
              locale. Là, il aiguise ses compétences, découvre de nouvelles
              techniques et affine son savoir-faire.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              De retour à Goma, Benjamin poursuit ses études, obtenant son
              diplôme en nutrition en 2017. Mais sa passion pour la
              boulangerie-pâtisserie ne faiblit jamais. Dès lors, il se consacre
              pleinement à son métier, y insufflant tout son talent et sa
              créativité.
            </p>
            </div>
            <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              En 2020, mû par le désir de partager ses connaissances et
              d&apos;inspirer la prochaine génération de boulangers-pâtissiers,
              Benjamin crée un centre d&apos;apprentissage unique. Dans ce havre
              de gourmandise, il transmet ses secrets de fabrication, initie les
              apprentis aux techniques de charcuterie et leur enseigne les
              subtilités de la transformation des fruits.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Son dévouement et son expertise ne passent pas inaperçus. En 2022,
              Benjamin reçoit une distinction prestigieuse de l&apos;École
              Nationale de Formation Professionnelle (ENFP), consacrant son
              statut de grand formateur en boulangerie-pâtisserie.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Aujourd&apos;hui, Benjamin Kamala est un véritable ambassadeur de
              la boulangerie-pâtisserie en République Démocratique du Congo. Son
              parcours inspirant témoigne de la puissance des rêves et de la
              joie de partager sa passion avec le monde.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Sa boulangerie-pâtisserie est une ode à la gourmandise, où chaque
              création est une symphonie de saveurs et de textures. Benjamin
              Kamala est un artiste culinaire, un maître boulanger-pâtissier qui
              transforme la vie en un délicieux chef-d&apos;œuvre.
            </p>
            </div>
            </div>
          </CardContent>
        </Card>
      </article>
    </main>
  );
}
