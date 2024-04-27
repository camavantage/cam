"use client";
import { TooltipWrap } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoadingButton } from "@/components/ui/loading-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import NewUserForm from "@/components/ws/users/new-form";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Le format de l'adresse mail n'est pas valide" }),
  password: z.string().min(6, {
    message: "Le mot de passe doit comporter au moins 6 caractères.",
  }),

  name: z
    .string()
    .min(4, {
      message: "Le nom doit comporter au moins 4 caractères.",
    })
    .trim(),
  bio: z.string().max(255, {
    message: "La description doit comporter au max 255 caractères.",
  }),
  role: z.enum(["subscriber", "author", "editor", "admin", "owner"]),
  blocked: z.boolean(),
  verified: z.boolean(),
});

type RoleOption = {
  label: string;
  value: "subscriber" | "author" | "editor" | "admin" | "owner";
};

const roles: RoleOption[] = [
  { label: "Abonné", value: "subscriber" },
  { label: "Auteur", value: "author" },
  { label: "Éditeur", value: "editor" },
  { label: "Administrateur", value: "admin" },
  //   { label: "Owner", value: "owner" },
];

export default function WSNewUserPage() {
  return (
    <>
      <NewUserForm />
    </>
  );
}
