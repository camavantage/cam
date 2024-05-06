import { VisibilityType } from "../types";

type VisibilityOption = {
  label: string;
  value: VisibilityType;
};

export const visibilities: Readonly<[string, ...VisibilityType[]]> = [
  "public",
  "subscriber_only",
  "premium_only",
];

export const visibilitiesAsOptions: Readonly<VisibilityOption[]> = [
  { label: "Public", value: "public" },
  { label: "Abonnés", value: "subscriber_only" },
  { label: "Prémium", value: "premium_only" },
];
