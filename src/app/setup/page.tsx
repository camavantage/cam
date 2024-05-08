import { getAppSetup } from "@/actions/ws/setup";
import { SetupForm } from "@/components/ws/setup/setup-form";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SetupPage() {
  const app = await getAppSetup();
  if (!app) {
    return (
      <div className=" bg-ws-background">
        <Suspense>
          <SetupForm />
        </Suspense>
      </div>
    );
  }
  redirect("/ws");
}
