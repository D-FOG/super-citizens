import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { navItems } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="border-t border-line/70 py-12">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.2fr_1fr_.8fr]">
        <div>
          <h2 className="text-2xl font-black">Supersite Citizens</h2>
          <p className="mt-2 max-w-sm text-sm font-semibold text-muted">Your Result Shows It.</p>
          <p className="mt-6 max-w-md text-sm text-muted">Raising people. Building systems. Expanding the Kingdom.</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {navItems.slice(0, 10).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-muted transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-5 lg:items-end">
          <ThemeToggle />
          <div className="flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, index) => (
              <a key={index} href="#" className="grid h-10 w-10 place-items-center rounded-md border border-line/70" aria-label="Social link">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted">Copyright 2026 Supersite Citizens.</p>
        </div>
      </div>
    </footer>
  );
}
