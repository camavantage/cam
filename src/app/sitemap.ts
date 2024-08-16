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
      link: `${siteConfig.url}${slug}`,
      desciption: description,
      lastModified: new Date(updatedAt ?? createdAt).toUTCString(),
    })
  );

  const tagsRoutes = tags.map(
    ({ name, description, slug, createdAt, updatedAt }) => ({
      title: name,
      link: `${siteConfig.url}t/${slug}`,
      description: description,
      lastModified: new Date(updatedAt ?? createdAt).toUTCString(),
    })
  );

  const routes = ["", "articles", "tags", "courses", "about", "contact"].map(
    (route) => ({
      link: `${siteConfig.url}${route}`,
      lastModified: new Date().toUTCString(),
    })
  );

  return [...routes, ...articlesRoutes, ...tagsRoutes];
}
