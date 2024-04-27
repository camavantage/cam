import type { Metadata } from "next";
import { Alata } from "next/font/google";
import "@/styles/globals.css";
import "@blocknote/react/style.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthWrapper } from "@/components/auth-wrapper";
import { getAppSetup } from "@/actions/ws/setup";

const alata = Alata({ weight: "400", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const app = await getAppSetup();
  if (app) {
    return {
      title: app.title,
      description: app.description,
    };
  } else {
    return {
      title: "Mlibre | Le Média libre d'accès",
      description: "Média en accès libre",
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
      <body className={alata.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthWrapper>
            {children}
            <Toaster />
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
