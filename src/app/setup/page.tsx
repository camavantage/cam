import { getAppSetup } from "@/actions/ws/setup";
import { SetupForm } from "@/components/setup/setup-form";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const app = await getAppSetup();
  if (app) {
    redirect("/ws");
  }
  return (
    <div className=" bg-ws-background">
      <SetupForm />
    </div>
  );
}
