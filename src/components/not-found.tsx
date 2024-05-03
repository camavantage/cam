import { cn } from "@/lib/utils";

export function NotFound() {
  return (
    <div
      className={cn(
        " p-6  justify-center items-center text-sm text-muted-foreground"
      )}
    >
      <p className="">404 | Page non trouvée</p>
    </div>
  );
}
