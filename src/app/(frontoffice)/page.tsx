import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
    <main className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl">Mlibre</h1>
      <p className=" text-xs text-foreground ">Le Média libre d&apos;accès</p>
    </main>
    </Suspense>
  );
}
