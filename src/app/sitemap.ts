import { siteConfig } from "@/lib/data/site";
import prisma from "@/lib/prisma";

export default async function sitemap() {
  const articles = await prisma.article.findMany({
    where: { blocked: false, published: true },
  });
  const tags = await prisma.tag.findMany({
    where: { published: true },
  });

  const articlesRoutes = articles.map(
    ({ title, description, slug, createdAt, updatedAt }) => ({
      title: title,
      url: `${siteConfig.url}/${slug}`,
      description: description,
      lastModified: new Date(updatedAt ?? createdAt).toUTCString(),
    })
  );

  const tagsRoutes = tags.map(
    ({ name, description, slug, createdAt, updatedAt }) => ({
      title: name,
      url: `${siteConfig.url}/t/${slug}`,
      description: description,
      lastModified: new Date(updatedAt ?? createdAt).toUTCString(),
    })
  );

  const routes = [
    {
      title: siteConfig.name,
      pathname: "",
      description: siteConfig.description,
    },
    {
      title: "Recettes et Astuces",
      pathname: "articles",
      description:
        "Que vous soyez novice en cuisine ou chef confirmé, vous trouverez ici l'inspiration nécessaire pour épater vos convives et éveiller vos papilles. Des recettes revisitées aux créations originales, notre blog vous accompagne dans toutes vos aventures culinaires",
    },
    { title: "Tags", pathname: "tags", description: "" },
    {
      title: "Formations",
      pathname: "courses",
      description:
        "Apprenez un métier essentiel à votre rythme avec nos formations en ligne accessibles partout et tout le temps ou directement dans nos locaux",
    },
    {
      title: "Qui sommes-nous?",
      pathname: "about",
      description:
        "Nous sommes un Centre d'Apprentisage et des Métiers Avantage. Une école privé déclarée au ministère de la formation professionnelle",
    },
    {
      title: "Contact - Avantage",
      pathname: "contact",
      description:
        "Vous pouvez nous adresser un e-mail à l'adresse suivante: contact@cam-avantage.com. Vous pouvez également nous contacter sur whatsapp et Facebook.",
    },
  ].map((route) => ({
    title: route.title,
    url: `${siteConfig.url}/${route.pathname}`,
    description: route.description,
    lastModified: new Date().toUTCString(),
  }));

  return [...routes, ...articlesRoutes, ...tagsRoutes];
}
