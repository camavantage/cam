import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "@blocknote/react/style.css";
import { Toaster } from "@/components/ui/toaster";
import { getAppSetup } from "@/actions/ws/setup";
import { siteConfig } from "@/lib/data/site";
import "./globals.css";
import { Providers } from "@/components/providers";

const karla = Karla({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const app = await getAppSetup();
  if (app) {
    return {
      title: app.title,
      description: app.description,
    };
  } else {
    return {
      title: siteConfig.name,
      description: siteConfig.description,
      keywords: [
        "Mlibre",
        "mlibre.org",
        "Média libre",
        "Média en accès libre",
        "Média independant",
        "information libre",
      ],
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={karla.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
