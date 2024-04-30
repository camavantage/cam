import { LogoWithtext } from "@/components/header/logo-with-text";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutSection: React.FC = () => {
  return (
    <div className={`max-w-5xl mx-auto`}>
      <PageHeader>
        <LogoWithtext className="h-20 w-20 " />
        <PageHeaderHeading className="">Qui sommes-nous?</PageHeaderHeading>
        <PageHeaderDescription className="">
          Nous sommes un centre d&apos;apprentisage et des Métiers. Un
          établissement privé déclaré au ministère de la formation
          professionnelle. Partenaire Officiel du groupe des centres
          professionnels en République démocratique du Congo.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/about">
            <Button className="rounded-full">En savoir plus</Button>
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  );
};

export default AboutSection;
