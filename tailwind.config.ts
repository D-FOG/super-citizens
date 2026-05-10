import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "hsl(var(--ink))",
        paper: "hsl(var(--paper))",
        muted: "hsl(var(--muted))",
        line: "hsl(var(--line))",
        accent: "hsl(var(--accent))",
        royal: "hsl(var(--royal))",
        gold: "hsl(var(--gold))"
      },
      boxShadow: {
        glow: "0 0 45px hsl(var(--accent) / 0.24)",
        soft: "0 24px 90px hsl(220 30% 4% / 0.18)"
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(hsl(var(--line) / .16) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line) / .16) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
