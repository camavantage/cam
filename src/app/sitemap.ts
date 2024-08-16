import { siteConfig } from "@/lib/data/site";
import prisma from "@/lib/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    where: { blocked: false, published: true },
  });
  const tags = await prisma.tag.findMany({
    where: { published: true },
  });

  const articlesRoutes = articles.map(({ slug, createdAt, updatedAt }) => ({
    url: `${siteConfig.url}${slug}`,
    lastModified: new Date(updatedAt ?? createdAt).toUTCString(),
  }));

  const tagsRoutes = tags.map(({ slug, createdAt, updatedAt }) => ({
    url: `${siteConfig.url}t/${slug}`,
    lastModified: new Date(updatedAt ?? createdAt).toUTCString(),
  }));

  const routes = [
    {
      pathname: "",
    },
    {
      pathname: "articles",
    },
    { pathname: "tags" },
    {
      pathname: "courses",
    },
    {
      pathname: "about",
    },
    {
      pathname: "contact",
    },
  ].map((route) => ({
    url: `${siteConfig.url}${route.pathname}`,
    lastModified: new Date().toUTCString(),
  }));

  return [...routes, ...articlesRoutes, ...tagsRoutes];
}
