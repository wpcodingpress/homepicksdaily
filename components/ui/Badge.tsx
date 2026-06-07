import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "sale" | "new" | "outofstock" | "default";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  sale: "bg-brand-orange-500 text-white",
  new: "bg-brand-blue-500 text-white",
  outofstock: "bg-ink-light text-white",
  default: "bg-surface-muted text-ink-muted",
};

export default function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
