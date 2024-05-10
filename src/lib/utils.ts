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
import { readingTime } from "reading-time-estimator";
import { init } from '@paralleldrive/cuid2';

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

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("fr", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMoney(input?: number | null) {
  if (typeof input === "number") {
    const money = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "USD",
    }).format(input);
    return money;
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.PUBLIC_APP_URL}${path}`
}

export function readingTimeEstimator(content: string) {
  const result = readingTime(content, 238, "fr");
  return result.text;
}


export const createUsername = init({
  random: Math.random,
  length: 10,
});

export function formatElapsedTime(givenDate: string | number | Date): string {
  // Convertir la date donnée en objet Date si elle n'est pas déjà en Date
  const date = typeof givenDate === 'string' || typeof givenDate === 'number' ? new Date(givenDate) : givenDate;

  // Date actuelle
  const currentDate = new Date();

  // Calcul de la différence en millisecondes
  const timeDifference = currentDate.getTime() - date.getTime();

  // Convertir la différence en minutes, heures, jours, mois et années
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.436875); // en moyenne
  const years = Math.floor(months / 12);

  // Retourner le temps écoulé formaté
  if (years > 0) {
      return `il y a ${years} an${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
      return `il y a ${months} mois`;
  } else if (days > 0) {
      return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
      return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
      return `il y a ${minutes} min`;
  }
}


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
      return "Inconnu";
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
