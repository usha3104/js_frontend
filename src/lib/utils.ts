import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  M2I_ADMIN: "M2I_ADMIN",
  COLLEGE_ADMIN: "COLLEGE_ADMIN",
  MENTOR: "MENTOR",
  STUDENT: "STUDENT",
  COMPANY: "COMPANY",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
