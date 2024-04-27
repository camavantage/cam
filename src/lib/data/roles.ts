import { RoleType } from "../types";

type RoleOption = {
  label: string;
  value: RoleType;
};

export const roles: Readonly<RoleOption[]> = [
  { label: "Abonné", value: "subscriber" },
  { label: "Auteur", value: "author" },
  { label: "Éditeur", value: "editor" },
  { label: "Administrateur", value: "admin" },
  { label: "Owner", value: "owner" },
];
