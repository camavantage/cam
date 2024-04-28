import { MainNavItem } from "@/lib/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "À propos",
      href: "/about",
    },
    {
      title: "Astuces et Recettes",
      href: "/articles",
    },
    {
      title: "Formations",
      href: "/courses",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
};
