"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative inline-flex h-10 w-[4.25rem] items-center rounded-full border border-line/70 bg-paper/70 p-1 shadow-soft backdrop-blur transition"
    >
      <span
        className="absolute h-8 w-8 rounded-full bg-accent shadow-glow transition-transform duration-300"
        style={{ transform: theme === "dark" ? "translateX(1.75rem)" : "translateX(0)" }}
      />
      <Sun className="relative z-10 h-4 w-4 flex-1 text-ink" />
      <Moon className="relative z-10 h-4 w-4 flex-1 text-black" />
    </button>
  );
}
