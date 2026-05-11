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
    "group inline-flex min-h-10 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40",
    variant === "primary" && "border border-accent/80 bg-accent text-black shadow-none hover:bg-accent/90",
    variant === "secondary" && "border border-line/70 bg-paper/30 text-ink backdrop-blur-xl hover:border-accent/50 hover:bg-accent/10",
    variant === "ghost" && "text-ink hover:bg-ink/5 dark:hover:bg-white/5",
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
