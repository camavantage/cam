import { getAppSetup } from "@/actions/ws/setup";
import { LoginForm } from "@/components/ws/login-form";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {
  const app = await getAppSetup();
  if (!app) {
    redirect("/setup");
  }
  return (
    <div className=" bg-ws-background">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
