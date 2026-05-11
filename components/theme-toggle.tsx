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
      className="relative inline-flex h-8 w-14 items-center rounded-sm border border-line/60 bg-paper/40 p-1 backdrop-blur-xl transition"
    >
      <span
        className="absolute h-6 w-6 rounded-sm bg-accent transition-transform duration-300"
        style={{ transform: theme === "dark" ? "translateX(1.5rem)" : "translateX(0)" }}
      />
      <Sun className="relative z-10 h-3.5 w-3.5 flex-1 text-ink" />
      <Moon className="relative z-10 h-3.5 w-3.5 flex-1 text-black" />
    </button>
  );
}
