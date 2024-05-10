'use client'
import { useState } from "react";
import { LoadingButton } from "./ui/loading-button";

export function AcceptOrder() {
  const [loading, setLoading] = useState<boolean>(false);
  return <LoadingButton variant="secondary">Confirmer</LoadingButton>;
}

export function RejectOrder() {
  const [loading, setLoading] = useState<boolean>(false);
  return <LoadingButton variant="ghost">Rejeter</LoadingButton>;
}
