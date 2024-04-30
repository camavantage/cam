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
import Image from "next/image";
import Link from "next/link";
import { GoTrophy } from "react-icons/go";
import { PiStudent } from "react-icons/pi";
import { RxSun } from "react-icons/rx";
import { IoBookOutline } from "react-icons/io5";
import LogoIcon from "@/components/icons/logoIcon";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 max-w-5xl mx-auto px-4 pb-12 lg:pb-20">
        <div className="">
          <Image
            src="/assets/images/enseignant-benjamin.jpg"
            className=""
            alt="Benjamin avantage"
            height={512}
            width={512}
          />
        </div>
        <div className="md:pt-32">
          <h4 className="font-bold text-2xl">Fondateur</h4>
          <p className=" text-muted-foreground mt-2">
            Un véritable ambassadeur de la boulangerie-pâtisserie en République
            Démocratique du Congo. Son parcours inspirant témoigne de la
            puissance des rêves et de la joie de partager sa passion avec le
            monde.
          </p>
          <div className="flex space-x-2 my-5">
            <Image
              src="/assets/images/benjamin-avantage.jpg"
              alt="Benjamin Katembo Kamala"
              height={244}
              width={244}
              className="h-12 w-12 rounded-full border-2 border-cam-yellow-900"
            />
            <div>
              <h6 className="font-bold">Benjamin Katembo Kamala</h6>
              <p className=" text-muted-foreground">Fondateur et CEO</p>
            </div>
          </div>
          <div className={`grid grid-cols-2 gap-2 md:gap-6 mt-8  `}>
            <div className={`flex items-center space-x-3 `}>
              <IoBookOutline className="h-10 w-10  text-cam-green-800 " />
              <div>
                <h6 className="text-xl font-bold text-cam-yellow-900">6</h6>
                <p className="flex-1 text-sm text-muted-foreground">
                  Formations
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 `}>
              <PiStudent className="h-10 w-10 text-cam-green-800 " />
              <div>
                <h6 className="text-xl font-bold text-cam-yellow-900">78</h6>
                <p className="flex-1 text-sm text-muted-foreground">
                  Etudiants
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 `}>
              <RxSun className="h-10 w-10  text-cam-green-800" />
              <div>
                <h6 className="text-xl font-bold text-cam-yellow-900">18</h6>
                <p className="flex-1 text-sm text-muted-foreground">
                  Entrepreneurs
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 `}>
              <GoTrophy className="h-10 w-10  text-cam-green-800" />
              <div>
                <h6 className="text-xl font-bold">1</h6>
                <p className="flex-1 text-sm text-muted-foreground ">
                  Prix d&apos;excelence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  Dès son plus jeune âge, Benjamin Kamala a été attiré par le
                  monde magique de la boulangerie-pâtisserie. À l&apos;âge de 10
                  ans, il passait ses après-midis après l&apos;école dans la
                  petite pâtisserie de son grand frère, s&apos;imprégnant des
                  secrets de cet art délicieux.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Avec des mains pleines de farine et le cœur rempli de passion,
                  Benjamin apprenait les rudiments du métier, plongeant les
                  gâteaux dans des bains de sirop, dorant les croissants
                  d&apos;une touche dorée appétissante. Chaque geste était une
                  leçon, chaque création une œuvre d&apos;art comestible.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  En 2014, à l&apos;âge de 15 ans, Benjamin décide de se
                  professionnaliser. Pendant les grandes vacances d&apos;été, il
                  s&apos;envole pour Kigali, au Rwanda, où il s&apos;immerge
                  pendant deux mois dans l&apos;univers d&apos;une
                  boulangerie-pâtisserie locale. Là, il aiguise ses compétences,
                  découvre de nouvelles techniques et affine son savoir-faire.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  De retour à Goma, Benjamin poursuit ses études, obtenant son
                  diplôme en nutrition en 2017. Mais sa passion pour la
                  boulangerie-pâtisserie ne faiblit jamais. Dès lors, il se
                  consacre pleinement à son métier, y insufflant tout son talent
                  et sa créativité.
                </p>
              </div>
              <div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  En 2020, mû par le désir de partager ses connaissances et
                  d&apos;inspirer la prochaine génération de
                  boulangers-pâtissiers, Benjamin crée un centre
                  d&apos;apprentissage unique. Dans ce havre de gourmandise, il
                  transmet ses secrets de fabrication, initie les apprentis aux
                  techniques de charcuterie et leur enseigne les subtilités de
                  la transformation des fruits.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Son dévouement et son expertise ne passent pas inaperçus. En
                  2022, Benjamin reçoit une distinction prestigieuse de
                  l&apos;École Nationale de Formation Professionnelle (ENFP),
                  consacrant son statut de grand formateur en
                  boulangerie-pâtisserie.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Aujourd&apos;hui, Benjamin Kamala est un véritable ambassadeur
                  de la boulangerie-pâtisserie en République Démocratique du
                  Congo. Son parcours inspirant témoigne de la puissance des
                  rêves et de la joie de partager sa passion avec le monde.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Sa boulangerie-pâtisserie est une ode à la gourmandise, où
                  chaque création est une symphonie de saveurs et de textures.
                  Benjamin Kamala est un artiste culinaire, un maître
                  boulanger-pâtissier qui transforme la vie en un délicieux
                  chef-d&apos;œuvre.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>
      <div className="grid md:grid-cols-2  max-w-6xl mx-auto pt-8 pb-10 md:py-10 px-4">
        <div className="flex flex-col justify-end md:px-20 md:pb-10">
          <small className="font-bold text-2xl">Notre logo</small>
          <p className="mb-10 text-base">
            Au centre du logo, se trouve un A stylisé, représentant la première
            lettre du mot Avantage ou Apprentissage ou encore Académie. Ce A est dessiné de
            manière moderne et élégante, évoquant à la fois la tradition et
            l&apos;innovation
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <LogoIcon className="h-16 w-16 md:h-20 md:w-20 text-cam-green-800 inline-block" />
            <div className="border-2 h-16 border-cam-green-800" />
            <div>
              <small className="text-xs">CAM/AVANTAGE</small>
              <p className=" font-medium">
                <span className=" ">C</span>entre d&apos;
                <span className=" ">A</span>pprentisage et des{" "}
                <span className=" ">M</span>étiers <span className=" ">A</span>
                vantage
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center relative mt-6">
          <Image
            src="/assets/images/cam-image-home-illustration.jpg"
            alt="Avantage illustration image"
            height={512}
            width={512}
            className={`h-64 w-64 md:h-96 rounded-full md:w-96`}
          />
        </div>
      </div>
    </main>
  );
}
