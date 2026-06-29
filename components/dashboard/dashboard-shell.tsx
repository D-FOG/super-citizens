"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, PanelLeftClose, PanelLeftOpen, Shield } from "lucide-react";
import { useState } from "react";
import { generalNavItems, leaderNavItems } from "@/constants/dashboard";
import { useDashboardStore } from "@/store/use-dashboard-store";
import { cn } from "@/lib/utils";

export function DashboardShell({ children, mode = "general" }: { children: React.ReactNode; mode?: "general" | "leader" }) {
  const pathname = usePathname();
  const role = useDashboardStore((state) => state.role);
  const navItems = mode === "leader" ? leaderNavItems : generalNavItems;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-hero-grid bg-[length:96px_96px] bg-fixed">
      <div className={cn("mx-auto grid min-h-screen w-full max-w-[1560px] min-w-0 gap-0 transition-[grid-template-columns] duration-300", collapsed ? "lg:grid-cols-[5.75rem_1fr]" : "lg:grid-cols-[18rem_1fr]")}>
        <aside className="sticky top-0 z-30 flex h-auto max-h-screen w-full min-w-0 flex-col overflow-x-hidden border-b border-line/60 bg-paper/72 p-4 backdrop-blur-2xl lg:h-screen lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className={cn("flex min-w-0 items-center gap-3", collapsed && "lg:justify-center")}>
              <span className="grid h-9 w-9 place-items-center rounded-sm border border-accent/50 bg-accent text-xs font-black text-black">SC</span>
              <span className={cn("min-w-0", collapsed && "lg:hidden")}>
                <span className="block text-sm font-black uppercase">Supersite Citizens</span>
                <span className="block text-[11px] font-semibold text-muted">Operating dashboard</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="hidden h-9 w-9 place-items-center rounded-sm border border-line/60 bg-paper/35 text-muted transition hover:border-accent/50 hover:text-ink lg:grid"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>

          <Link
            href={mode === "leader" ? "/dashboard" : "/leader-dashboard"}
            className={cn(
              "mt-5 hidden rounded-sm border border-line/60 px-3 py-2 text-xs font-black text-muted transition hover:border-accent/50 hover:text-ink sm:inline-flex lg:flex lg:w-full lg:items-center",
              collapsed ? "lg:justify-center" : "lg:justify-between"
            )}
            title={mode === "leader" ? "General Dashboard" : "Leader Dashboard"}
          >
            <span className={cn(collapsed && "lg:hidden")}>{mode === "leader" ? "General Dashboard" : "Leader Dashboard"}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <nav className="mt-5 flex w-full min-w-0 gap-2 overflow-x-auto pb-1 lg:grid lg:flex-1 lg:content-start lg:overflow-x-hidden lg:overflow-y-auto lg:pr-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-sm border border-transparent px-3 py-3 text-sm font-bold text-muted transition hover:border-line/60 hover:bg-ink/5 hover:text-ink dark:hover:bg-white/5 lg:min-w-0 lg:shrink",
                  collapsed && "lg:justify-center lg:px-0",
                  pathname === item.href && "border-accent/30 bg-accent/10 text-ink"
                )}
                title={item.label}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className={cn("mt-5 hidden rounded-sm border border-line/60 bg-paper/35 p-4 backdrop-blur-xl lg:block", collapsed && "lg:hidden")}>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-muted">
              <Shield className="h-4 w-4 text-accent" />
              Signed in role
            </div>
            <p className="mt-3 rounded-sm border border-line/60 bg-paper/60 px-3 py-3 text-sm font-bold text-ink">{role}</p>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-6 sm:px-6 lg:px-9 lg:py-8">{children}</section>
      </div>
    </main>
  );
}

export function DashboardHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="mb-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="editorial-heading mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{text}</p>
      </div>
    </header>
  );
}

export function GlassPanel({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("cinematic-panel glass-line overflow-hidden rounded-md p-5 sm:p-6", className)}>
      {children}
    </section>
  );
}

export function PanelTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="eyebrow text-muted">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black">{title}</h2>
    </div>
  );
}

export function DataTable({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-line/60">
      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
        <thead className="bg-ink/5 text-xs uppercase text-muted dark:bg-white/5">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-black">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-line/50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top font-semibold text-muted">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-sm bg-line/50">
      <div className="h-full bg-accent transition-all duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}

export function SkeletonBlock({ className = "h-28" }: { className?: string }) {
  return <div className={cn("skeleton rounded-md", className)} />;
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-sm border border-dashed border-line/70 p-6 text-center">
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}
