import he from "he";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { WCAttribute } from "./types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function decodeHtml(str: string): string {
  return he.decode(str);
}

export function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "Price unavailable";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

export function truncateTitle(title: string, maxLength = 60): string {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength).trim() + "\u2026";
}

export function seoTitle(title: string): string {
  return truncateTitle(title, 55) + " | HomePicksDaily";
}

export function extractMinPrice(priceHtml: string): string {
  const matches = priceHtml.match(/[\d.]+/g);
  if (!matches || matches.length === 0) return "0";
  return matches[0];
}

export function getCustomerAttributes(
  attributes: WCAttribute[]
): WCAttribute[] {
  return attributes.filter(
    (attr) =>
      attr.slug !== "pa_ships-from" && attr.name !== "Ships From"
  );
}
