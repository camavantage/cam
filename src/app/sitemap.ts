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
      desciption: description,
      lastModified: updatedAt ?? createdAt,
    })
  );

  const tagsRoutes = tags.map(
    ({ name, description, slug, createdAt, updatedAt }) => ({
      title: name,
      url: `${siteConfig.url}/t/${slug}`,
      description: description,
      lastModified: updatedAt ?? createdAt,
    })
  );

  const routes = [
    "",
    "/articles",
    "/tags",
    "/courses",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...articlesRoutes, ...tagsRoutes];
}
