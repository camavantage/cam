import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  AppStatusType,
  ArticleTagType,
  RoleType,
  TagType,
  UserType,
} from "./types";
import { z } from "zod";
import { MultiSelectorOptionType } from "@/components/ui/multiple-selector";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Phone validation Regex
export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// username validation Regex
export const usernameRegex = new RegExp(/^[0-9A-Za-z]{3,15}$/);

// generate hslColor
const getHashOfString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};

const generateHSL = (name: string) => {
  const hRange = [0, 360];
  const sRange = [50, 75];
  const lRange = [25, 60];
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);
  return [h, s, l];
};

export const getHSLColor = (name: string) => {
  const hsl = generateHSL(name);

  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

// Format slug
export function formatSlug(text: string) {
  const chaineSansAccents = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const chaineSansSpeciaux = chaineSansAccents.replace(/[^\w\s-]/g, "");

  const chaineSansEspacesApostrophes = chaineSansSpeciaux.replace(
    /[\s']/g,
    "-"
  );

  const chaineMinuscules = chaineSansEspacesApostrophes.toLowerCase();

  return chaineMinuscules;
}

// Role name from value
export function roleLabel(role: RoleType) {
  switch (role) {
    case "subscriber":
      return "Abonné";
      break;
    case "author":
      return "Auteur";
      break;
    case "editor":
      return "Éditeur";
      break;
    case "admin":
      return "Admin";
      break;
      case "owner":
      return "Owner";
      break;
    default:
      break;
  }
}

// App status description from status value
export function appStatusDescription(status: AppStatusType) {
  switch (status) {
    case "online":
      return "Le site web est accessible et fonctionne correctement";
      break;
    case "maintenance":
      return "Le site web est en cours de maintenance et n'est pas accessible aux utilisateurs";
      break;
    case "offline":
      return "Le site web est temporairement inaccessible ou indisponible";
      break;
    default:
      return "Inconnu"
      break;
  }
}

// authors as Select options
export function authorsAsOptions(authors?: UserType[]) {
  if (authors) {
    const options = authors.map((option) => {
      return { label: `${option.name}`, value: option.id };
    });
    return options;
  } else {
    return [];
  }
}

// tags as MultiSelect options
export const tagOptionSchema = z.object({
  // tag option schema validation
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export function tagsAsOptions(tags?: TagType[]) {
  let options: MultiSelectorOptionType[] = [];
  if (tags) {
    tags.forEach((tag) => {
      options.push({ label: tag.name, value: tag.id });
    });
    return options;
  } else {
    return [];
  }
}

export function articleTagsAsOptions(tags?: ArticleTagType[]) {
  let options: MultiSelectorOptionType[] = [];
  if (tags) {
    tags.forEach((tag) => {
      options.push({ label: `${tag.tag?.name}`, value: tag.tagId });
    });
    return options;
  } else {
    return [];
  }
}
