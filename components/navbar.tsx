"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line/60 bg-paper/75 shadow-soft backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-sm font-black text-black shadow-glow">SC</span>
          <span className="leading-none">
            <span className="block text-sm font-black uppercase tracking-[.18em]">Supersite</span>
            <span className="block text-[11px] font-semibold text-muted">Your Result Shows It.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.slice(0, 9).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-xs font-bold text-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10",
                pathname === item.href && "text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          <Button href="/join" className="min-h-10 px-4 py-2">Join</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-md border border-line/70 bg-paper/60 xl:hidden"
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "fixed bottom-0 right-0 top-20 w-full max-w-sm border-l border-line/70 bg-paper/95 p-5 shadow-soft backdrop-blur-xl transition-transform duration-300 xl:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-black uppercase tracking-[.16em]">Menu</span>
          <ThemeToggle />
        </div>
        <div className="grid gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md border border-line/60 px-4 py-3 text-sm font-bold">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
