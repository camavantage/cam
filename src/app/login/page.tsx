import { getAppSetup } from "@/actions/ws/setup";
import { LoginForm } from "@/components/login/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const app = await getAppSetup();
  if (!app) {
    redirect("/setup");
  }
  return (
    <div className=" bg-ws-background">
      <LoginForm />
    </div>
  );
}
