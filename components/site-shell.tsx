"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/providers/query-provider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/leader-dashboard");

  return (
    <ThemeProvider>
      <QueryProvider>
        {isDashboard ? null : <Navbar />}
        {children}
        {isDashboard ? null : <Footer />}
      </QueryProvider>
    </ThemeProvider>
  );
}
