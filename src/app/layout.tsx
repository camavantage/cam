import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "@blocknote/react/style.css";
import { Toaster } from "@/components/ui/toaster";
import { getAppSetup } from "@/actions/ws/setup";
import { siteConfig } from "@/lib/data/site";
import "./globals.css";
import { Providers } from "@/components/providers";

const be_Vietnam_Pro = Be_Vietnam_Pro({ weight: "400" });

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
      <body className={be_Vietnam_Pro.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
