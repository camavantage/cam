import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ws/", "/setup/", "/member/", "/login/"],
    },
    sitemap: "https://cam-avantage.com/sitemap.xml",
    host: "https://cam-avantage.com/",
  };
}
