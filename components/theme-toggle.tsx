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
      className="relative h-8 w-14 rounded-sm border border-line/60 bg-paper/40 p-1 backdrop-blur-xl transition"
    >
      <span
        className="absolute left-1 top-1 h-6 w-6 rounded-sm bg-accent transition-transform duration-300"
        style={{ transform: theme === "dark" ? "translateX(1.5rem)" : "translateX(0)" }}
      />
      <span className="absolute left-1 top-1 z-10 grid h-6 w-6 place-items-center">
        <Sun className="h-3.5 w-3.5 text-ink" />
      </span>
      <span className="absolute right-1 top-1 z-10 grid h-6 w-6 place-items-center">
        <Moon className="h-3.5 w-3.5 text-black" />
      </span>
    </button>
  );
}
