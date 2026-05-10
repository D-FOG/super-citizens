import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
};

export function Button({ href, children, variant = "primary", type = "button", className }: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-accent/60",
    variant === "primary" && "bg-accent text-black shadow-glow hover:brightness-110",
    variant === "secondary" && "border border-line/80 bg-paper/55 text-ink backdrop-blur hover:border-accent/60 hover:bg-accent/10",
    variant === "ghost" && "text-ink hover:bg-ink/5 dark:hover:bg-white/10",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {variant !== "ghost" ? <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {content}
    </button>
  );
}
