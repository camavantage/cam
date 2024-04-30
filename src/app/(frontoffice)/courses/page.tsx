import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function CoursesPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 lg:px-0">
      <PageHeader>
        <PageHeaderHeading>Les formations adaptées</PageHeaderHeading>
        <PageHeaderDescription className=" text-muted-foreground">
          Apprenez un métier essentiel à votre rythme avec nos formations en
          ligne accessibles partout et tout le temps ou directement dans nos
          locaux. Vous pouvez suivre une formation en apprentissage 100% théorie
          en ligne et 100% pratique en entreprise
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
