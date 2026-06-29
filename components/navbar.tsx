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
        scrolled ? "border-b border-line/50 bg-paper/70 backdrop-blur-2xl" : "bg-transparent"
      )}
    >
      <nav className="section-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-sm border border-accent/50 bg-accent text-xs font-black text-black">SC</span>
          <span className="leading-none">
            <span className="block text-sm font-black uppercase">Supersite</span>
            <span className="block text-[11px] font-semibold text-muted">Your Result Shows It.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {navItems.slice(0, 9).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-sm px-2.5 py-2 text-[11px] font-black uppercase text-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/5",
                pathname === item.href && "bg-ink/5 text-ink dark:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          <Button href="/login" variant="secondary" className="min-h-9 px-4 py-2">Sign In</Button>
          <Button href="/join" className="min-h-9 px-4 py-2">Join</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-sm border border-line/60 bg-paper/40 backdrop-blur-xl xl:hidden"
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "fixed bottom-0 right-0 top-16 w-full max-w-sm border-l border-line/60 bg-paper/90 p-5 backdrop-blur-2xl transition-transform duration-300 xl:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-black uppercase">Menu</span>
          <ThemeToggle />
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button href="/login" variant="secondary" className="min-h-11">Sign In</Button>
            <Button href="/join" className="min-h-11">Join</Button>
          </div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-sm border border-line/50 bg-paper/30 px-4 py-3 text-sm font-black">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
