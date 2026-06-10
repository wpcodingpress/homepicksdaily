import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variants: Record<string, string> = {
  primary: "bg-[#F5811F] text-white hover:bg-[#FF7043] active:bg-[#E06B0A]",
  secondary: "bg-[#0F1923] text-white hover:bg-[#252536]",
  outline: "border-2 border-[#F5811F] text-[#F5811F] hover:bg-[#F5811F] hover:text-white",
  ghost: "text-[#6B7280] hover:text-[#0F1923] hover:bg-gray-100",
};

const sizes: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({ children, variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all focus-visible:outline-2 focus-visible:outline-[#F5811F] focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
