import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "sale" | "featured" | "outofstock" | "default";
  className?: string;
}

const variants: Record<string, string> = {
  sale: "bg-[#FF5722] text-white",
  featured: "bg-[#00BCD4] text-white",
  outofstock: "bg-gray-500 text-white",
  default: "bg-gray-100 text-[#6B7280]",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
