import { LanguageType } from "../types";

type LanguageOption = {
  label: string;
  value: LanguageType;
};

export const languages: Readonly<LanguageOption[]> = [
  { label: "Français", value: "fr" },
  { label: "English", value: "en" },
];
