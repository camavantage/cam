

import { LogoWithtext } from "@/components/header/logo-with-text";
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import s from "@/styles/Home.module.scss";
import Link from "next/link";

const AboutSection: React.FC = () => {
  return (
    <div className={`max-w-5xl mx-auto py-12 md:py-20 px-4`}>
      <div
        // className={`p-4 md:p-8 text-sm md:text-base ${s.about} flex flex-col items-center rounded-3xl`}
      >
        {/* <div className="flex justify-center items-center border-2 border-cam-green-800 rounded-full"> */}
          <LogoWithtext className="h-14 w-14 " />
        {/* </div> */}
        <PageHeader>
          <PageHeaderHeading>Une école reconnue</PageHeaderHeading>
          <PageHeaderDescription>CAM/AVANTAGE est un établissement privé déclaré au ministère de la
          formation professionnelle. Partenaire Officiel du groupe des centres
          professionnels en RDC certification de mérite.</PageHeaderDescription>
          <PageActions>
            <Link href="/about">
            <Button className="rounded-full">En savoir plus</Button>
            </Link>
          </PageActions>
        </PageHeader>

        {/* <h1 className="font-bold text-center text-xl mt-2">Une école reconnue</h1>
        <p className="text-center max-w-xl mt-2">
          CAM/AVANTAGE est un établissement privé déclaré au ministère de la
          formation professionnelle. Partenaire Officiel du groupe des centres
          professionnels en RDC certification de mérite.
        </p> */}
      </div>
    </div>
  );
};

export default AboutSection;
