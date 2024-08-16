import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "@blocknote/react/style.css";
import { Toaster } from "@/components/ui/toaster";
import { getAppSetup } from "@/actions/ws/setup";
import { siteConfig } from "@/lib/data/site";
import "@/styles/globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Providers } from "@/components/providers";

const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const app = await getAppSetup();
  if (app) {
    return {
      title: app.title,
      description: app.description,
      manifest: "/manifest.json",
      keywords: [
        "cam",
        "avantage",
        "cam-avantage",
        "cam-avantage.com",
        "CAM/AVANTAGE",
        "Benjamin",
        "Centre de formation avantage",
      ],
    };
  } else {
    return {
      title: siteConfig.name,
      description: siteConfig.description,
      manifest: "/manifest.json",
      keywords: [
        "cam",
        "avantage",
        "cam-avantage",
        "cam-avantage.com",
        "CAM/AVANTAGE",
        "Benjamin",
        "Centre de formation avantage",
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
      <body className={josefinSans.className}>
        <NextTopLoader color="#B6D300" showSpinner={false} />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
