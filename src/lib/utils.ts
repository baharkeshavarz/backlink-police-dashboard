import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeCapital = (label: string) => {
  return label[0].toUpperCase() + label.slice(1);
};
