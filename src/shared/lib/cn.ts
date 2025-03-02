import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...css: ClassValue[]) => {
  return twMerge(clsx(css));
};

export { cn };
